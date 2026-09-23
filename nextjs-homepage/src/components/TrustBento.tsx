"use client";

import React from "react";
import AnimatedText from "./AnimatedText";
import { Lock, Clock, ShieldCheck, Globe } from "lucide-react";

export default function TrustBento() {
  const logos = [
    "Pixel Forge",
    "Mosaic Digital",
    "Vanguard Creative",
    "Nova Studio",
    "Apex Agency",
    "Clarity Co.",
  ];

  return (
    <section className="py-16 sm:py-20 border-t border-b border-[#E7E7EA] bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <AnimatedText
            text="TRUSTED BY 500+ AGENCIES WORLDWIDE"
            mode="word"
            className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#6B7280] uppercase"
          />
        </div>

        {/* 2-Column Split: 500+ Agencies in Left Half alone, 4 Security Cards in Right 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Left Half (6 cols): 500+ Agencies + Copy + Logos */}
          <div className="lg:col-span-6 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#3F72AF] font-bold">
                TRUSTED WORLDWIDE
              </span>
              <div className="mt-2.5 sm:mt-3 flex items-baseline gap-2">
                <span className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A]">
                  500+
                </span>
                <span className="text-base sm:text-lg text-[#64748B] font-semibold">agencies</span>
              </div>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-md">
                500+ agencies run leads, projects, and invoicing on Eidoncore every day.
              </p>
            </div>

            {/* Client Logos Grid */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#F1F5F9] grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 sm:gap-y-4 gap-x-4 sm:gap-x-6">
              {logos.map((logo) => (
                <span
                  key={logo}
                  className="text-xs sm:text-sm font-semibold tracking-wide text-[#64748B] hover:text-[#0F172A] transition-colors select-none"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>

          {/* Right Half (6 cols): 2x2 Grid of 4 Security & Reliability Tiles */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            
            {/* 1. 256-bit Encryption */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-all shadow-2xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center mb-3 sm:mb-4">
                <Lock size={17} className="text-[#3F72AF]" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#0F172A]">256-bit Encryption</h4>
                <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                  Data encrypted in transit and at rest, always.
                </p>
              </div>
            </div>

            {/* 2. 99.9% Uptime SLA */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-all shadow-2xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center mb-3 sm:mb-4">
                <Clock size={17} className="text-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#0F172A]">99.9% Uptime SLA</h4>
                <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                  Sustained over the trailing 90 days.
                </p>
              </div>
            </div>

            {/* 3. SOC 2 Ready */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-all shadow-2xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center mb-3 sm:mb-4">
                <ShieldCheck size={17} className="text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#0F172A]">SOC 2 Ready</h4>
                <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                  Type II audit currently in progress.
                </p>
              </div>
            </div>

            {/* 4. GDPR Compliant */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-all shadow-2xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center mb-3 sm:mb-4">
                <Globe size={17} className="text-purple-600" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#0F172A]">GDPR Compliant</h4>
                <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                  Full EU and UK data residency support.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
