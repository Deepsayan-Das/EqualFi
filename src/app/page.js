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


export default function Home() {
  useLenis();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#f2f4f8]">
      <CustomScrollbar />
      <CursorFollower />
      <Navbar/>
      <Hero/>
      <AboutUs/>
      <HowItWorks/>
      <WalletConnectBtn />
      <FeaturesSection/>
      
    </div>
  );
}
