"use client";

import React, { useState, useEffect } from "react";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedText from "./AnimatedText";
import SectionBadge from "./SectionBadge";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AgencyProfileMockup,
  BrandingDomainsMockup,
  TeamDirectoryMockup,
  MissionControlMockup,
} from "./mockups/HowItWorksMockups";

interface StepTab {
  id: number;
  num: string;
  title: string;
  desc: string;
  url: string;
}

const STEPS: StepTab[] = [
  {
    id: 0,
    num: "01",
    title: "Create your workspace",
    desc: "Pick your agency name and get a live URL in under a minute.",
    url: "aetheris.eidoncore.com/settings/agency",
  },
  {
    id: 1,
    num: "02",
    title: "Customize & brand",
    desc: "Logo, colors, email, and payments - or go full white-label.",
    url: "aetheris.eidoncore.com/settings/branding",
  },
  {
    id: 2,
    num: "03",
    title: "Invite your team",
    desc: "Owners, admins, project managers - role-based, from day one.",
    url: "aetheris.eidoncore.com/team/directory",
  },
  {
    id: 3,
    num: "04",
    title: "Start delivering",
    desc: "Add a client, spin up a project, send the first invoice.",
    url: "aetheris.eidoncore.com/workspace/mission-control",
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance through the steps every 6s unless hovered or reduced motion is requested
  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => {
      setActiveTab((prev) => (prev + 1) % STEPS.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [isPaused, activeTab]);

  // Render the inner panel content for each step matching the authentic platform screens
  const renderPanelContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <AgencyProfileMockup />;
      case 1:
        return <BrandingDomainsMockup />;
      case 2:
        return <TeamDirectoryMockup />;
      case 3:
      default:
        return <MissionControlMockup />;
    }
  };

  // Reusable Browser Device Window mockup with authentic macOS styling
  const renderDeviceWindow = (stepIndex: number, isMobile = false) => {
    const currentUrl = STEPS[stepIndex]?.url || STEPS[0].url;

    return (
      <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_16px_45px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col h-full ring-1 ring-black/5">
        {/* Device Topbar: 3 dots + single line responsive URL bar */}
        <div className="h-10 bg-[#F8FAFC] border-b border-[#E2E8F0] px-3 sm:px-4 flex items-center justify-between gap-2 shrink-0 select-none">
          {/* 3 dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/40" />
          </div>

          {/* Single-line address bar */}
          <div className="flex-1 min-w-0 max-w-[260px] sm:max-w-[340px] mx-1 sm:mx-auto">
            <div className="px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md text-[10px] sm:text-[11px] font-mono text-[#64748B] shadow-2xs flex items-center justify-center gap-1.5 whitespace-nowrap overflow-hidden">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">{currentUrl}</span>
            </div>
          </div>

          {/* Step indicator */}
          <span className="shrink-0 text-[10px] font-mono text-[#4F46E5] bg-[#EEF2FF] border border-[#E0E7FF] px-2 py-0.5 rounded-full font-semibold">
            Step {stepIndex + 1}/4
          </span>
        </div>

        {/* Panel Content Area */}
        <div
          className={`flex-1 flex flex-col bg-white relative overflow-hidden ${
            isMobile ? "h-[450px] sm:h-[490px]" : "min-h-[520px] lg:h-[580px] xl:h-[610px]"
          }`}
        >
          {isMobile ? (
            <div className="h-full flex flex-col">{renderPanelContent(stepIndex)}</div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`tab-${stepIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full h-full flex flex-col"
              >
                {renderPanelContent(stepIndex)}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#F8FAFC] border-t border-b border-[#E7E7EA]">
      <div className="max-w-[1280px] xl:max-w-[1340px] mx-auto px-4 sm:px-6">
        
        {/* Section Head */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <SectionBadge text="How It Works" />
          <AnimatedHeading
            as="h2"
            text="Up and Running in Minutes"
            className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#0F172A] leading-[1.1] justify-center"
          />
          <AnimatedText
            text="Get your agency workspace live in four simple steps."
            mode="word"
            className="mt-4 text-[#6B6F76] text-base sm:text-lg leading-relaxed justify-center"
          />
        </div>

        {/* MOBILE VIEW (< lg): Accordion style where each tab directly contains its corresponding dashboard mockup */}
        <div className="flex flex-col gap-3 lg:hidden">
          {STEPS.map((step) => {
            const isActive = activeTab === step.id;
            return (
              <div key={`mobile-tab-${step.id}`} className="flex flex-col gap-2.5">
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveTab(step.id)}
                  className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-center ${
                    isActive
                      ? "bg-white border-[#3F72AF] shadow-xs"
                      : "bg-[#F1F5F9] border-[#E7E7EA] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                          isActive
                            ? "bg-[#3F72AF]/10 text-[#2F5F96]"
                            : "bg-neutral-200/60 text-[#52565E]"
                        }`}
                      >
                        {step.num}
                      </span>
                      <h3
                        className={`text-sm sm:text-base font-semibold tracking-tight transition-colors ${
                          isActive ? "text-[#0B0B0F]" : "text-[#6B6F76]"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={`text-[#6B6F76] transition-transform duration-300 ${
                        isActive ? "rotate-180 text-[#3F72AF]" : ""
                      }`}
                    />
                  </div>

                  <p className="mt-1.5 text-xs sm:text-[13px] text-[#6B6F76] leading-relaxed pl-8">
                    {step.desc}
                  </p>

                  {/* Active Progress Bar at bottom */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100">
                      <div className="h-full bg-[#3F72AF] animate-[progress_6s_linear]" />
                    </div>
                  )}
                </button>

                {/* Corresponding Dashboard Screen shown directly after the active tab on mobile */}
                {isActive && (
                  <div className="mb-2.5">
                    {renderDeviceWindow(step.id, true)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DESKTOP VIEW (lg:): Compact Tabs on Left (col-span-4), Wide Mockup on Right (col-span-8) */}
        <div
          className="hidden lg:grid lg:grid-cols-12 gap-6 xl:gap-8 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left: 4 Interactive Step Tabs (col-span-4 gives more room to the mockup) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-2.5">
            {STEPS.map((step) => {
              const isActive = activeTab === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTab(step.id)}
                  className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group flex-1 flex flex-col justify-center ${
                    isActive
                      ? "bg-white border-[#3F72AF] shadow-xs"
                      : "bg-[#F1F5F9] border-[#E7E7EA] hover:bg-white hover:border-[#0B0B0F]/20"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                        isActive
                          ? "bg-[#3F72AF]/10 text-[#2F5F96]"
                          : "bg-neutral-200/60 text-[#52565E]"
                      }`}
                    >
                      {step.num}
                    </span>
                    <h3
                      className={`text-sm sm:text-[15px] font-semibold tracking-tight transition-colors ${
                        isActive ? "text-[#0B0B0F]" : "text-[#6B6F76] group-hover:text-[#0B0B0F]"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-1.5 text-xs text-[#6B6F76] leading-relaxed pl-8">
                    {step.desc}
                  </p>

                  {/* Active Progress Bar at bottom */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100">
                      <div
                        className={
                          isPaused
                            ? "h-full bg-[#3F72AF]/40"
                            : "h-full bg-[#3F72AF] animate-[progress_6s_linear]"
                        }
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Mockup Browser Device Screen (col-span-8 gives spacious, immersive canvas) */}
          <div className="lg:col-span-8 flex flex-col h-full min-h-[520px] lg:h-[580px] xl:h-[610px]">
            {renderDeviceWindow(activeTab, false)}
          </div>
        </div>

      </div>
    </section>
  );
}
