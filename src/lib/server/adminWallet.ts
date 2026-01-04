// src/lib/server/adminWallet.ts
import { WeilWallet } from '@weilliptic/weil-sdk';

// 🛡️ SECURITY BARRIER
if (typeof window !== 'undefined') {
  throw new Error("CRITICAL SECURITY RISK: Admin wallet imported on client!");
}

export function getAdminWallet() {
  const privateKey = process.env.ADMIN_PRIVATE_KEY;
  const sentinel = process.env.WEIL_SENTINEL_URL;

  if (!privateKey || !sentinel) {
    throw new Error("Missing Admin Credentials in .env.local");
  }

  // Initialize the Wallet that will SIGN the transactions
  return new WeilWallet({
    privateKey,
    sentinelEndpoint: sentinel,
  });
}