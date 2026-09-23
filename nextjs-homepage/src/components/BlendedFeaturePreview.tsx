"use client";

import React from "react";
import AnimatedImage from "./AnimatedImage";
import { CheckCircle2, TrendingUp, Clock, DollarSign, Flag } from "lucide-react";

interface BlendedFeaturePreviewProps {
  image: string;
  title: string;
  isReverse?: boolean;
  moduleName: string;
  featureIndex: string;
  customOverlay?: React.ReactNode;
}

export default function BlendedFeaturePreview({
  image,
  title,
  isReverse = false,
  moduleName,
  featureIndex,
  customOverlay,
}: BlendedFeaturePreviewProps) {
  // Built-in contextual floating cards tailored for features
  const renderFloatingOverlay = () => {
    if (customOverlay) return customOverlay;

    if (moduleName.toLowerCase() === "projects") {
      if (featureIndex === "01") {
        return (
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 z-20 bg-white/95 backdrop-blur-md border border-[#E2E8F0] rounded-xl p-2.5 sm:p-3.5 shadow-[0_12px_30px_-6px_rgba(15,23,42,0.12),0_4px_6px_-2px_rgba(15,23,42,0.04)] max-w-[210px] sm:max-w-[270px] transition-transform duration-300 group-hover:-translate-y-1">
            <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
              <span className="text-[10.5px] sm:text-[11px] font-semibold text-[#0F172A] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                Budget Health
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                On Track
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#0F172A] mb-1 sm:mb-1.5 flex items-baseline gap-1">
              $18,450
              <span className="text-[#64748B] font-normal text-[10px] sm:text-[10.5px]">/ $22,000 cap</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1 sm:mb-1.5">
              <div className="w-[84%] h-full bg-[#3F72AF] rounded-full transition-all duration-1000" />
            </div>
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#64748B] font-mono">
              <span>84% consumed</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                <TrendingUp size={10} /> +16%
              </span>
            </div>
          </div>
        );
      }

      if (featureIndex === "02") {
        return (
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 z-20 bg-white/95 backdrop-blur-md border border-[#E2E8F0] rounded-xl p-2.5 sm:p-3.5 shadow-[0_12px_30px_-6px_rgba(15,23,42,0.12),0_4px_6px_-2px_rgba(15,23,42,0.04)] max-w-[210px] sm:max-w-[270px] transition-transform duration-300 group-hover:-translate-y-1">
            <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
              <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-semibold text-[#0F172A]">
                <Flag size={11} className="text-[#3F72AF]" />
                <span>Phase 3 Milestone</span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-[#3F72AF] border border-blue-200">
                100% Done
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#334155] mb-1.5 sm:mb-2 font-medium">
              <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
              <span>Client signed off deliverables</span>
            </div>
            <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9.5px] sm:text-[10px]">
              <span className="text-[#64748B]">Automated:</span>
              <span className="font-mono text-[#0F172A] font-semibold">Invoice #1042 released</span>
            </div>
          </div>
        );
      }

      if (featureIndex === "03") {
        return (
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 z-20 bg-white/95 backdrop-blur-md border border-[#E2E8F0] rounded-xl p-2.5 sm:p-3.5 shadow-[0_12px_30px_-6px_rgba(15,23,42,0.12),0_4px_6px_-2px_rgba(15,23,42,0.04)] max-w-[210px] sm:max-w-[270px] transition-transform duration-300 group-hover:-translate-y-1">
            <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10.5px] sm:text-[11px] font-semibold text-[#0F172A]">Active Timer</span>
              </div>
              <span className="text-[9.5px] sm:text-[10.5px] font-mono bg-[#0F172A] text-white px-1.5 sm:px-2 py-0.5 rounded font-semibold tracking-wider">
                03:42:15
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#334155] font-medium mb-1 sm:mb-1.5">
              <span>Lead Architect</span>
              <span className="text-[#3F72AF] font-mono font-bold">$165/hr</span>
            </div>
            <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] sm:text-[10px] text-[#64748B] font-mono">
              <span>Session Logged</span>
              <span className="text-emerald-600 font-semibold">Billable ✓</span>
            </div>
          </div>
        );
      }
    }

    // Generic fallback overlay for other modules if enabled
    return (
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 bg-white/95 backdrop-blur-md border border-[#E2E8F0] rounded-xl p-3 shadow-[0_12px_30px_-6px_rgba(15,23,42,0.12)] max-w-[230px] transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-semibold text-[#0F172A]">{title}</span>
          <span className="text-[9.5px] font-mono font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            Active
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#64748B] font-mono">
          <span>Synced with Workspace</span>
          <span className="text-[#3F72AF] font-semibold">Real-time</span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative rounded-2xl sm:rounded-3xl border border-[#E2E8F0] bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC] to-white p-3 sm:p-5 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden group">
      {/* Ambient subtle spotlight glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[340px] h-[220px] bg-gradient-to-b from-[#3F72AF]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Clean minimal browser top bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]/70 mb-3 relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
        </div>
        <div className="px-2.5 py-0.5 rounded-md bg-white/90 border border-[#E2E8F0] text-[10px] font-mono text-[#64748B] shadow-2xs flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>app.eidoncore.com/{moduleName.toLowerCase().replace(/\s+/g, "-")}</span>
        </div>
        <div className="w-8" />
      </div>

      {/* Main Visual Display with Linear-Style Bottom Blend */}
      <div className="relative rounded-xl overflow-hidden bg-white border border-[#E2E8F0]/80">
        {/* Soft Masked Image */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 50%, rgba(0,0,0,0.6) 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 50%, rgba(0,0,0,0.6) 75%, transparent 100%)",
          }}
        >
          <AnimatedImage
            src={image}
            alt={title}
            origin={isReverse ? "top-left" : "top-right"}
            className="w-full bg-white"
            imgClassName="w-full h-auto object-cover object-top group-hover:scale-[1.015] transition-transform duration-700"
          />
        </div>

        {/* Bottom soft gradient dissolve to seamlessly melt into the container */}
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

        {/* Elevated Floating Detail Card (Linear signature depth) */}
        {renderFloatingOverlay()}
      </div>
    </div>
  );
}
