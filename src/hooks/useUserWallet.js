// src/hooks/useUserWallet.js
import { useState, useEffect, useCallback } from "react";

// Helper: robustly extract address string from different response formats
function parseAddress(account) {
  if (!account) return null;
  if (typeof account === "string") return account;
  // Handle object format { address: "..." } or { account: "..." }
  return account.address || account.account || account.id || null;
}

export function useUserWallet() {
  const [address, setAddress] = useState(null);
  const [status, setStatus] = useState("initializing"); // 'initializing' | 'idle' | 'connecting' | 'connected'
  const [isInstalled, setIsInstalled] = useState(true);
  const [error, setError] = useState(null);

  // 1️⃣ Internal: Handle what happens when accounts change
  const handleAccountsChanged = useCallback((accounts) => {
    const newAddress = Array.isArray(accounts) && accounts.length > 0 
      ? parseAddress(accounts[0]) 
      : null;

    if (newAddress) {
      setAddress(newAddress);
      setStatus("connected");
      setError(null);
    } else {
      setAddress(null);
      setStatus("idle");
    }
  }, []);

  // 2️⃣ Setup: Detect Wallet & Restore Session
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      // Small delay to allow extension to inject itself
      if (typeof window === "undefined") return;
      
      // Retry getting provider for 500ms (fixes race conditions)
      let provider = window.WeilWallet;
      if (!provider) {
        await new Promise(r => setTimeout(r, 100));
        provider = window.WeilWallet;
      }

      if (!provider) {
        if (mounted) {
          setIsInstalled(false);
          setStatus("idle");
        }
        return;
      }

      // 🤫 Silent Check: See if we are ALREADY connected (no popup)
      try {
        const accounts = await provider.request({ method: "weil_accounts" });
        if (mounted) handleAccountsChanged(accounts);
      } catch (err) {
        console.warn("Silent login check failed", err);
        if (mounted) setStatus("idle");
      }

      // 👂 Event Listener: Update if user swaps accounts in extension
      if (typeof provider.on === "function") {
        provider.on("accountsChanged", handleAccountsChanged);
      }
    };

    init();

    // Cleanup listener
    return () => {
      mounted = false;
      if (window.WeilWallet && typeof window.WeilWallet.off === "function") {
        window.WeilWallet.off("accountsChanged", handleAccountsChanged);
      }
    };
  }, [handleAccountsChanged]);

  // 3️⃣ Action: Trigger the Popup
  const connect = async () => {
    if (!isInstalled) return;
    setStatus("connecting");
    setError(null);

    try {
      const accounts = await window.WeilWallet.request({ 
        method: "weil_requestAccounts" // This triggers the popup
      });
      handleAccountsChanged(accounts);
    } catch (err) {
      console.error(err);
      setStatus("idle");
      // Handle user rejection specifically
      if (err.code === 4001 || err.message?.includes("rejected")) {
        setError("Connection rejected by user.");
      } else {
        setError("Failed to connect wallet.");
      }
    }
  };

  const disconnect = () => {
    setAddress(null);
    setStatus("idle");
  };

  return { 
    address, 
    status, 
    isInstalled, 
    error, 
    connect, 
    disconnect 
  };
}