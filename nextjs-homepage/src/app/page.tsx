"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBento from "@/components/TrustBento";
import FeaturesBento from "@/components/FeaturesBento";
import HowItWorks from "@/components/HowItWorks";
import LiveLoopSection from "@/components/LiveLoopSection";
import WhyEidoncore from "@/components/WhyEidoncore";
import CompareSection from "@/components/CompareSection";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      {/* 1. NAVBAR WITH MULTI-PAGE SUBMENUS */}
      <Navbar />

      <main className="flex-1">
        {/* 2. HERO WITH INTERACTIVE DASHBOARD & CURSOR SIMULATION */}
        <Hero />

        {/* 3. TRUSTED BY 500+ AGENCIES WORLDWIDE & SECURITY BENTO */}
        <TrustBento />

        {/* 4. PLATFORM MODULES BENTO WITH EXPLORE ALL MODULES */}
        <FeaturesBento />

        {/* 5. HOW IT WORKS INTERACTIVE TABS & DEVICE SCREEN */}
        <HowItWorks />

        {/* 6. LIVE LOOP: BUILT AS A LOOP, NOT A FUNNEL (CIRCLING ANIMATION) */}
        <LiveLoopSection />

        {/* 7. WHY EIDONCORE: STICKY STACKING CARDS (01/04 TO 04/04) */}
        <WhyEidoncore />

        {/* 8. REPLACE YOUR ENTIRE TOOL STACK COMPARISON */}
        <CompareSection />

        {/* 9. TRANSPARENT PRICING WITH MONTHLY/ANNUAL TOGGLE */}
        <PricingSection />

        {/* 10. TESTIMONIALS CAROUSEL (5 SLIDES + AVATAR NAVIGATION) */}
        <Testimonials />

        {/* 11. FREQUENTLY ASKED QUESTIONS */}
        <FAQSection />

        {/* 12. PRE-FOOTER NEWSLETTER CAPSULE + OBSIDIAN CTA */}
        <CTA />
      </main>

      {/* 13. FOOTER (#F8FAFC) */}
      <Footer />
    </div>
  );
}
