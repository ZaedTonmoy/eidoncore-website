"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import Statement from "@/components/Statement";
import Pillars from "@/components/Pillars";
import FeatureSection from "@/components/FeatureSection";
import Changelog from "@/components/Changelog";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

// Mockup components for the 4 Feature Sections
import IntakeMockup from "@/components/mockups/IntakeMockup";
import PlanningMockup from "@/components/mockups/PlanningMockup";
import AiAutomationsMockup from "@/components/mockups/AiAutomationsMockup";
import BuildShipMockup from "@/components/mockups/BuildShipMockup";

import { siteContent } from "@/content/site-content";

export default function Home() {
  const [intakeSec, planningSec, aiSec, buildSec] = siteContent.featureSections;

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col">
      {/* 1. NAVBAR */}
      <Navbar />

      <main className="flex-1">
        {/* 2. HERO */}
        <Hero />

        {/* 3. LOGO STRIP */}
        <LogoStrip />

        {/* 4. BIG STATEMENT */}
        <Statement />

        {/* 5. THREE FEATURE COLUMNS */}
        <Pillars />

        {/* 6. FOUR FEATURE SECTIONS */}
        {/* a) Intake and integrations */}
        <FeatureSection
          id={intakeSec.id}
          title={intakeSec.title}
          description={intakeSec.description}
          learnMoreHref={intakeSec.learnMoreHref}
          features={intakeSec.features}
          mockup={<IntakeMockup />}
        />

        {/* b) Planning and monitoring */}
        <FeatureSection
          id={planningSec.id}
          title={planningSec.title}
          description={planningSec.description}
          learnMoreHref={planningSec.learnMoreHref}
          features={planningSec.features}
          mockup={<PlanningMockup />}
        />

        {/* c) AI and automations */}
        <FeatureSection
          id={aiSec.id}
          title={aiSec.title}
          description={aiSec.description}
          learnMoreHref={aiSec.learnMoreHref}
          features={aiSec.features}
          mockup={<AiAutomationsMockup />}
        />

        {/* d) Build, review, and ship */}
        <FeatureSection
          id={buildSec.id}
          title={buildSec.title}
          description={buildSec.description}
          learnMoreHref={buildSec.learnMoreHref}
          features={buildSec.features}
          mockup={<BuildShipMockup />}
        />

        {/* 7. CHANGELOG */}
        <Changelog />

        {/* 8. TESTIMONIALS */}
        <Testimonials />

        {/* 9. FINAL CALL TO ACTION */}
        <CTA />
      </main>

      {/* 10. FOOTER */}
      <Footer />
    </div>
  );
}
