import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  // This component handles the exchange of the OAuth token for a Clerk session
  return (
    <div className="min-h-screen bg-[#010514] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#78a0ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#a0b0d0] font-medium">Finalizing secure connection...</p>
        {/* This is the magic component that creates the user in your dashboard */}
        <AuthenticateWithRedirectCallback />
      </div>
    </div>
  );
}