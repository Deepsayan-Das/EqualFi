'use client'
import AboutUs from "@/components/AboutUs";
import LoginSignupPage from "@/components/Auth";
import FeaturesSection from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/Howitworks";
import { CursorFollower } from "@/components/ui/CustomCursor";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import Navbar from "@/components/ui/Navbar";
import { useLenis } from "@/hooks/useLenis";
import ConnectWalletButton from "@/components/WalletConnectBtn";
import Image from "next/image";
import WalletConnectBtn from "@/components/WalletConnectBtn";
import Script from "next/script";


export default function Home() {
  useLenis();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#f2f4f8]">
      

<Script
  id="equalfi-structured-data"
  type="application/ld+json"
  strategy="afterInteractive"
>
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EqualFi",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description:
      "EqualFi is a fintech platform for fair and intelligent financial management.",
  })}
</Script>

      <CustomScrollbar />
      <CursorFollower />
      <Navbar/>
      <Hero/>
      <AboutUs/>
      <HowItWorks/>
      {/* <WalletConnectBtn /> */}
      <FeaturesSection/>
      
    </div>
  );
}
