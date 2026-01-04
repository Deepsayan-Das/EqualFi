// src/lib/weilliptic/walletClient.js
import { WeilWalletConnection } from "@weilliptic/weil-sdk";

export function createWeilWalletConnection() {
  if (typeof window === "undefined") {
    throw new Error("Browser only");
  }

  if (!window.WeilWallet) {
    throw new Error("WEIL_WALLET_NOT_INSTALLED");
  }

  return new WeilWalletConnection({
    walletProvider: window.WeilWallet,
  });
}
