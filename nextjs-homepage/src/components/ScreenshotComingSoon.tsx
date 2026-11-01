"use client";

import React from "react";
import Link from "next/link";
import { Camera, Sparkles, ArrowRight, Lock, CheckCircle2, Shield, Eye } from "lucide-react";

interface ScreenshotComingSoonProps {
  moduleName: string;
  featureTitle: string;
  featureIndex?: string;
  className?: string;
}

export default function ScreenshotComingSoon({
  moduleName,
  featureTitle,
  featureIndex = "01",
  className = "",
}: ScreenshotComingSoonProps) {
  const slug = moduleName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className={`relative w-full max-w-xl group min-w-0 select-none ${className}`}>
      {/* Outer App Window Shell */}
      <div className="relative rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 sm:p-5 shadow-xs overflow-hidden flex flex-col">
        {/* Top App Window Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
            <div className="flex items-center gap-1.5 ml-2 px-2.5 py-0.5 bg-white border border-[#CBD5E1] rounded-md text-[10px] font-mono text-[#64748B] shadow-2xs">
              <Lock size={10} className="text-[#94A3B8]" />
              <span>app.eidoncore.com/{slug}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50/90 border border-amber-200/80 rounded-full text-[10.5px] font-mono font-semibold text-amber-700 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Screenshot Staging</span>
          </div>
        </div>

        {/* Card Body with Architectural Wireframe & Blueprint Canvas */}
        <div className="relative rounded-xl border border-[#CBD5E1]/80 bg-white p-4 sm:p-6 overflow-hidden flex flex-col justify-between min-h-[340px] sm:min-h-[380px] shadow-2xs">
          {/* Subtle Blueprint Dot Grid in Background */}
          <div
            className="absolute inset-0 opacity-[0.45] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Simulated Interface Skeleton Lines (Background Layer) */}
          <div className="absolute inset-0 p-5 flex flex-col gap-3.5 opacity-30 pointer-events-none">
            {/* Header row skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 bg-slate-200 rounded-md" />
              <div className="flex gap-2">
                <div className="h-4 w-16 bg-slate-200 rounded-md" />
                <div className="h-4 w-20 bg-indigo-200 rounded-md" />
              </div>
            </div>

            {/* 3 Metric cards skeleton */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="h-14 bg-slate-100 rounded-lg border border-slate-200/60 p-2 flex flex-col justify-between">
                <div className="h-2 w-10 bg-slate-200 rounded" />
                <div className="h-4 w-14 bg-slate-300 rounded" />
              </div>
              <div className="h-14 bg-slate-100 rounded-lg border border-slate-200/60 p-2 flex flex-col justify-between">
                <div className="h-2 w-10 bg-slate-200 rounded" />
                <div className="h-4 w-14 bg-slate-300 rounded" />
              </div>
              <div className="h-14 bg-slate-100 rounded-lg border border-slate-200/60 p-2 flex flex-col justify-between">
                <div className="h-2 w-10 bg-slate-200 rounded" />
                <div className="h-4 w-14 bg-slate-300 rounded" />
              </div>
            </div>

            {/* Table skeleton */}
            <div className="flex-1 bg-slate-50/70 rounded-lg border border-slate-200/60 p-2.5 flex flex-col gap-2">
              <div className="h-3 w-full bg-slate-200/80 rounded" />
              <div className="h-3 w-4/5 bg-slate-200/60 rounded" />
              <div className="h-3 w-3/4 bg-slate-200/60 rounded" />
              <div className="h-3 w-5/6 bg-slate-200/60 rounded" />
            </div>
          </div>

          {/* Centerpiece Frosted Floating Teaser Card */}
          <div className="relative z-10 my-auto bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-xl rounded-2xl p-5 sm:p-7 flex flex-col items-center text-center gap-3 max-w-[420px] mx-auto animate-in fade-in duration-300">
            {/* Camera / Staging Icon Badge */}
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#EEF2FF] to-[#E0E7FF] border border-[#C7D2FE] text-[#4F46E5] flex items-center justify-center shadow-2xs">
                <Camera size={22} className="stroke-[2.2]" />
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-2xs">
                <Sparkles size={8} className="text-white" />
              </span>
            </div>

            {/* Status Pill Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] text-[10px] font-mono font-bold tracking-wider uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
              <span>Screenshots to be Added</span>
            </div>

            {/* Feature Title */}
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
                {featureTitle}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#64748B] mt-1 leading-relaxed max-w-xs mx-auto">
                The authentic interface capture for this <span className="font-semibold text-[#334155]">{moduleName}</span> view is currently being prepared for the live platform showcase.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-[#F1F5F9] my-0.5" />

            {/* Meta Information & Live Walkthrough Link */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 w-full text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold">
                <CheckCircle2 size={11} className="text-emerald-600" />
                <span>Feature Active in v2.4</span>
              </div>

              <Link
                href="/demo"
                className="text-[#3F72AF] hover:text-[#112D4E] font-semibold flex items-center gap-1 text-[11px] group transition-colors"
              >
                <span>Request live demo</span>
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bottom Bar Indicator */}
          <div className="relative z-10 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-[#64748B] font-mono">
            <span>MODULE: {moduleName.toUpperCase()}</span>
            <span>VIEW: 0{featureIndex} / CAPTURE PENDING</span>
          </div>
        </div>
      </div>
    </div>
  );
}
