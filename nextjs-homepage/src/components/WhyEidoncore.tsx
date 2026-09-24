"use client";

import React from "react";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedText from "./AnimatedText";
import SectionBadge from "./SectionBadge";
import { LayoutGrid, Palette, ShieldCheck, Cpu, Check, ArrowRight } from "lucide-react";

interface DiffCard {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const CARDS: DiffCard[] = [
  {
    num: "01 / 04",
    title: "All-In-One Platform",
    desc: "Projects, tasks, CRM, invoicing, services, automations, reporting, and a client portal - all in a single app. No more switching between 5 different tools and losing context.",
    icon: <LayoutGrid size={20} className="text-[#3F72AF]" />,
  },
  {
    num: "02 / 04",
    title: "Full White-Label",
    desc: "Custom logo, colors, fonts, email templates, and even your own domain. Enterprise plans remove all Eidoncore branding - your clients see only your brand.",
    icon: <Palette size={20} className="text-purple-600" />,
  },
  {
    num: "03 / 04",
    title: "Multi-Tenant by Design",
    desc: "Built from day one for agencies managing multiple clients, projects, and teams. Complete data isolation, per-agency settings, and role-based access at every level.",
    icon: <ShieldCheck size={20} className="text-emerald-600" />,
  },
  {
    num: "04 / 04",
    title: "AI-Native Workspace",
    desc: "Connect Claude, Cursor, or any MCP-compatible AI assistant to manage your workspace. Role-based access, OAuth 2.1 security, and 111+ tools across 19 modules.",
    icon: <Cpu size={20} className="text-blue-600" />,
  },
];

export default function WhyEidoncore() {
  const highlights = [
    "Replaces 6+ disjointed subscriptions",
    "100% white-label client portals & custom domains",
    "Autonomous AI workflows via MCP & OAuth 2.1",
    "Complete agency tenant isolation from day one",
  ];

  return (
    <section id="why-eidoncore" className="py-20 md:py-32 bg-white border-b border-[#E7E7EA]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Split Grid: Left = Sticky Header & Highlights, Right = Stacking Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Title, Description & Highlights */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start flex flex-col items-start">
            <SectionBadge text="Why Eidoncore" />

            <AnimatedHeading
              as="h2"
              text="What Makes Us Different"
              className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#0F172A] leading-[1.08] text-left"
            />

            <AnimatedText
              text="Other tools solve one problem. Eidoncore solves all of them - without compromise."
              mode="line"
              className="mt-4 text-[#64748B] text-base sm:text-lg leading-relaxed text-left"
            />

            {/* Value Highlights List */}
            <div className="mt-6 sm:mt-8 flex flex-col gap-2.5 sm:gap-3 w-full border-t border-[#F1F5F9] pt-6">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#334155]">
                  <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Link to Features */}
            <a
              href="https://eidoncore.com/features/"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#3F72AF]/40 rounded-full text-xs font-semibold text-[#0F172A] hover:text-[#3F72AF] transition-colors group shadow-2xs"
            >
              <span>Explore all platform modules</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Right Column: Cards (Stacking sticky on desktop, clean spaced cards on mobile) */}
          <div className="lg:col-span-7 relative flex flex-col pb-8 lg:pb-0">
            {CARDS.map((card, idx) => (
              <div
                key={card.num}
                style={{
                  ["--i" as any]: idx,
                  zIndex: 10 + idx,
                } as React.CSSProperties}
                className="sticky-stack-card relative bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-9 mb-4 sm:mb-6 lg:mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
                  <span className="font-mono text-xs font-bold text-[#3F72AF] tracking-wider">
                    {card.num}
                  </span>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shadow-2xs">
                    {card.icon}
                  </div>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                  {card.title}
                </h3>

                <p className="mt-2.5 sm:mt-3 text-xs sm:text-[15px] text-[#64748B] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
            {/* Desktop spacer to ensure all 4 cards have ample scroll track to stack and remain visible */}
            <div className="hidden lg:block h-72 xl:h-80" aria-hidden="true" />
          </div>

        </div>

      </div>
    </section>
  );
}
