"use client";

import React from "react";
import { CheckCircle2, TrendingUp, Clock, Flag } from "lucide-react";

interface BlendedFeaturePreviewProps {
  image?: string;
  title: string;
  isReverse?: boolean;
  moduleName: string;
  featureIndex: string;
}

export default function BlendedFeaturePreview({
  image,
  title,
  moduleName,
  featureIndex,
}: BlendedFeaturePreviewProps) {
  if (moduleName.toLowerCase() === "projects") {
    // Feature 01: Real-Time Budget Burndown
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* Subtle ambient spotlight glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[320px] h-[160px] bg-gradient-to-b from-[#3F72AF]/8 to-transparent blur-2xl pointer-events-none rounded-full" />

          {/* Focused Content Card */}
          <div className="relative rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_12px_36px_-12px_rgba(15,23,42,0.08),0_1px_3px_rgba(15,23,42,0.03)] p-3.5 sm:p-6 overflow-hidden w-full min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-[#F1F5F9] relative z-10 min-w-0">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-[#0F172A] tracking-tight truncate">
                    Alpha Website Redesign
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#64748B] bg-[#F8FAFC] px-1.5 py-0.5 rounded border border-[#E2E8F0] shrink-0">
                    Acme Corp
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 block truncate">
                  Fixed-Price Project • Q3 Delivery
                </span>
              </div>
              <div className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] sm:text-[11px] font-semibold shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>On Track</span>
              </div>
            </div>

            {/* Burndown KPI Grid */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 py-3 sm:py-4 border-b border-[#F1F5F9] relative z-10 min-w-0">
              <div className="p-2 sm:p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]/70 min-w-0 text-center sm:text-left">
                <span className="text-[8.5px] sm:text-[10px] font-mono uppercase tracking-wider text-[#64748B] block truncate">
                  Spent
                </span>
                <span className="text-[13px] sm:text-lg font-bold text-[#0F172A] mt-0.5 block truncate">
                  $18,450
                </span>
                <span className="text-[8.5px] sm:text-[10px] font-mono text-emerald-600 mt-0.5 block font-medium truncate">
                  74% cap
                </span>
              </div>
              <div className="p-2 sm:p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]/70 min-w-0 text-center sm:text-left">
                <span className="text-[8.5px] sm:text-[10px] font-mono uppercase tracking-wider text-[#64748B] block truncate">
                  Cap
                </span>
                <span className="text-[13px] sm:text-lg font-bold text-[#0F172A] mt-0.5 block truncate">
                  $25,000
                </span>
                <span className="text-[8.5px] sm:text-[10px] font-mono text-[#64748B] mt-0.5 block font-medium truncate">
                  $6.5k left
                </span>
              </div>
              <div className="p-2 sm:p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]/70 min-w-0 text-center sm:text-left">
                <span className="text-[8.5px] sm:text-[10px] font-mono uppercase tracking-wider text-[#64748B] block truncate">
                  Margin
                </span>
                <span className="text-[13px] sm:text-lg font-bold text-emerald-600 mt-0.5 block truncate">
                  36.5%
                </span>
                <span className="text-[8.5px] sm:text-[10px] font-mono text-emerald-600 mt-0.5 block font-medium flex items-center justify-center sm:justify-start gap-0.5 truncate">
                  <TrendingUp size={9} className="shrink-0" /> +$9.1k
                </span>
              </div>
            </div>

            {/* Visual Multi-Segment Burndown Bar */}
            <div className="py-3 sm:py-4 relative z-10 min-w-0">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#0F172A]">Burndown Velocity</span>
                <span className="font-mono text-[10px] sm:text-[11px] text-[#64748B]">184.5 / 250 hrs</span>
              </div>
              <div className="w-full h-2 sm:h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-[#3F72AF] rounded-l-full" style={{ width: "48%" }} title="Design & UX (120 hrs)" />
                <div className="h-full bg-indigo-500" style={{ width: "26%" }} title="Frontend Dev (64.5 hrs)" />
                <div className="h-full bg-slate-200" style={{ width: "26%" }} title="Remaining Buffer (65.5 hrs)" />
              </div>
              <div className="flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[10.5px] text-[#64748B] font-mono mt-2.5 flex-wrap">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#3F72AF]" />Design (48%)</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />Dev (26%)</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-200" />Buffer (26%)</span>
              </div>
            </div>

            {/* Recent Deliverable Activity with Linear Bottom Fade */}
            <div
              className="pt-1 flex flex-col gap-2 relative z-10"
              style={{
                maskImage: "linear-gradient(to bottom, black 55%, rgba(0,0,0,0.4) 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 55%, rgba(0,0,0,0.4) 80%, transparent 100%)",
              }}
            >
              <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]/70 text-xs gap-2 min-w-0">
                <span className="text-[#334155] font-medium truncate">Sprint 2: Component Library & Design Tokens</span>
                <span className="font-mono text-[9.5px] sm:text-[10.5px] text-emerald-600 font-semibold shrink-0">Under Budget by 6h</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]/70 text-xs gap-2 min-w-0">
                <span className="text-[#334155] font-medium truncate">Sprint 3: API Architecture & Auth Gating</span>
                <span className="font-mono text-[9.5px] sm:text-[10.5px] text-[#3F72AF] font-semibold shrink-0">In Progress (78%)</span>
              </div>
            </div>

            {/* Bottom Soft Dissolve Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          </div>
        </div>
      );
    }

    // Feature 02: Break Complex Work Into Clear Milestones
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* Subtle ambient spotlight glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[320px] h-[160px] bg-gradient-to-b from-[#3F72AF]/8 to-transparent blur-2xl pointer-events-none rounded-full" />

          {/* Focused Content Card */}
          <div className="relative rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_12px_36px_-12px_rgba(15,23,42,0.08),0_1px_3px_rgba(15,23,42,0.03)] p-3.5 sm:p-6 overflow-hidden w-full min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-[#F1F5F9] relative z-10 min-w-0">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#3F72AF]/10 text-[#3F72AF] flex items-center justify-center border border-[#3F72AF]/20 shrink-0">
                  <Flag size={14} />
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-[#0F172A] tracking-tight block truncate">
                    Beta Mobile App — Q3 Delivery
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#64748B] block truncate">3 of 4 Milestones Reached (75%)</span>
                </div>
              </div>
              <span className="text-[9.5px] sm:text-[10.5px] font-mono text-[#3F72AF] bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-200 shrink-0">
                Gated Delivery
              </span>
            </div>

            {/* Milestone List (Linear-style with status tags and invoice release triggers) */}
            <div className="flex flex-col gap-2.5 py-4 relative z-10">
              {/* Milestone 1 */}
              <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]/80 gap-2 min-w-0">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={13} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-[#0F172A] block truncate">Phase 1: Architecture & UX</span>
                    <span className="text-[10px] text-[#64748B] font-mono block truncate">14 deliverables signed off</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[9.5px] sm:text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 block mb-0.5">
                    Approved ✓
                  </span>
                  <span className="text-[9.5px] font-mono text-[#64748B]">Inv #1040 Paid ($5K)</span>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]/80 gap-2 min-w-0">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={13} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-[#0F172A] block truncate">Phase 2: Database & Core APIs</span>
                    <span className="text-[10px] text-[#64748B] font-mono block truncate">Tenant isolation verified</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[9.5px] sm:text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 block mb-0.5">
                    Approved ✓
                  </span>
                  <span className="text-[9.5px] font-mono text-[#64748B]">Inv #1041 Paid ($7.5K)</span>
                </div>
              </div>

              {/* Milestone 3 - Active / In Review */}
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#3F72AF]/40 shadow-xs relative gap-2 min-w-0">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-blue-50 text-[#3F72AF] border border-blue-200 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#3F72AF] animate-ping" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#0F172A] block truncate">Phase 3: Production Handover</span>
                    <span className="text-[10px] text-[#3F72AF] font-mono font-medium block truncate">Client review in progress (92%)</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[9.5px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#3F72AF] border border-blue-200 block mb-0.5">
                    Sign-off Pending
                  </span>
                  <span className="text-[9.5px] font-mono text-[#0F172A] font-semibold">Auto-Inv #1042 ($8K)</span>
                </div>
              </div>

              {/* Milestone 4 - Fading out with Linear mask */}
              <div
                className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]/80 opacity-60 gap-2 min-w-0"
                style={{
                  maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                }}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center shrink-0">
                    <Clock size={13} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-[#64748B] block truncate">Phase 4: Store Submission & SLA</span>
                    <span className="text-[10px] text-[#94A3B8] font-mono block truncate">Gated behind Phase 3 sign-off</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#64748B] bg-slate-100 px-2 py-0.5 rounded shrink-0">
                  Scheduled
                </span>
              </div>
            </div>

            {/* Bottom Soft Dissolve Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          </div>
        </div>
      );
    }

    // Feature 03: Team Bandwidth & Billable Timers
    if (featureIndex === "03") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* Subtle ambient spotlight glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[320px] h-[160px] bg-gradient-to-b from-[#3F72AF]/8 to-transparent blur-2xl pointer-events-none rounded-full" />

          {/* Focused Content Card */}
          <div className="relative rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_12px_36px_-12px_rgba(15,23,42,0.08),0_1px_3px_rgba(15,23,42,0.03)] p-3.5 sm:p-6 overflow-hidden w-full min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-[#F1F5F9] relative z-10 min-w-0">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0">
                  <Clock size={14} />
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-[#0F172A] tracking-tight block truncate">
                    Live Team Bandwidth
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#64748B] flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="truncate">3 active stopwatch sessions</span>
                  </span>
                </div>
              </div>
              <span className="text-[9.5px] sm:text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200 shrink-0">
                100% Billable
              </span>
            </div>

            {/* Active Timers List */}
            <div className="flex flex-col gap-2.5 py-4 relative z-10">
              {/* Member 1 - Active Live Timer */}
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    AR
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#0F172A]">Alex Rivera</span>
                      <span className="text-[10px] font-mono text-[#64748B] hidden sm:inline">Lead Architect</span>
                    </div>
                    <span className="text-[11px] text-[#475569] font-medium block truncate">
                      Multi-tenant schema & API routing
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-900 text-white rounded font-mono text-[10.5px] sm:text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>03:42:15</span>
                  </div>
                  <span className="text-[9.5px] font-mono text-[#3F72AF] font-semibold mt-0.5 block">
                    $165/hr • Billable
                  </span>
                </div>
              </div>

              {/* Member 2 - Active Live Timer */}
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                    ER
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#0F172A]">Elena Ruiz</span>
                      <span className="text-[10px] font-mono text-[#64748B] hidden sm:inline">Product Designer</span>
                    </div>
                    <span className="text-[11px] text-[#475569] font-medium block truncate">
                      Figma tokens & component audit
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-900 text-white rounded font-mono text-[10.5px] sm:text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>02:18:40</span>
                  </div>
                  <span className="text-[9.5px] font-mono text-[#3F72AF] font-semibold mt-0.5 block">
                    $140/hr • Billable
                  </span>
                </div>
              </div>

              {/* Member 3 - Logged Session (Fading out with Linear mask) */}
              <div
                className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]/80 flex items-center justify-between gap-2 opacity-60"
                style={{
                  maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                }}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center shrink-0">
                    MV
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#0F172A]">Marcus Vance</span>
                      <span className="text-[10px] font-mono text-[#64748B] hidden sm:inline">Frontend Dev</span>
                    </div>
                    <span className="text-[11px] text-[#64748B] block truncate">
                      QA bug bash & test coverage
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10.5px] font-mono font-semibold text-[#0F172A]">6.5 hrs</span>
                  <span className="text-[9.5px] font-mono text-emerald-600 font-semibold block">
                    $975 logged
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Soft Dissolve Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          </div>
        </div>
      );
    }
  }

  // Fallback for any other module if ever called with image
  if (image) {
    return (
      <div className="relative w-full max-w-xl group">
        <div className="relative rounded-2xl bg-white border border-[#E2E8F0] shadow-sm overflow-hidden">
          <img src={image} alt={title} className="w-full h-auto object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </div>
      </div>
    );
  }

  return null;
}

