// src/components/WalletConnectBtn.js
import { useUserWallet } from "@/hooks/useUserWallet";

export default function WalletConnectBtn({ onAddressChange }) {
  const { address, status, isInstalled, error, connect, disconnect } = useUserWallet();

  // UX 1: Wallet Not Installed -> Show Download Link
  if (!isInstalled) {
    return (
      <a 
        href="https://chrome.google.com/webstore/detail/weil-wallet" // Replace with actual link
        target="_blank" 
        rel="noopener noreferrer"
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm font-medium"
      >
        Install Weil Wallet
      </a>
    );
  }

  // UX 2: Initializing (checking if already logged in)
  if (status === "initializing") {
    return (
      <button disabled className="px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-wait text-sm">
        Loading...
      </button>
    );
  }

  // UX 3: Connected -> Show Address & Disconnect
  if (status === "connected" && address) {
    return (
      <div className="flex items-center gap-3 bg-white border border-green-200 px-3 py-1.5 rounded-full shadow-sm">
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase text-green-600 font-bold tracking-wider">Connected</span>
          <span className="font-mono text-sm font-medium text-gray-800">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <button 
          onClick={disconnect}
          className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 transition"
          title="Disconnect"
        >
          ✕
        </button>
      </div>
    );
  }

  // UX 4: Disconnected / Error -> Show Connect Button
  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={connect}
        disabled={status === "connecting"}
        className="px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 active:transform active:scale-95 transition disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "connecting" ? "Requesting..." : "Connect Wallet"}
      </button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}