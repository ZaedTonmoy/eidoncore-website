"use client";

import React from "react";
import {
  Lightbulb,
  Flag,
  Clock,
  Calendar,
  Code2,
  Cloud,
  CheckCircle2,
  SlidersHorizontal,
  DollarSign,
  TrendingUp,
} from "lucide-react";

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
  // Only apply custom Linear-style porcelain preview on /projects
  if (moduleName.toLowerCase() === "projects") {
    // =========================================================================
    // FEATURE 01: Real-Time Budget Burndown (Linear Document Style)
    // =========================================================================
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* Subtle ambient light glow behind card */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[340px] h-[180px] bg-gradient-to-b from-[#3F72AF]/6 to-transparent blur-3xl pointer-events-none rounded-full" />

          {/* Linear Porcelain Surface */}
          <div className="relative rounded-2xl bg-[#FCFDFF] border border-[#E7E9EE] shadow-[0_2px_4px_rgba(15,23,42,0.02),0_12px_28px_-8px_rgba(15,23,42,0.06)] p-5 sm:p-7 overflow-hidden w-full min-w-0">
            {/* Top View Switcher (Linear signature pill tabs) */}
            <div className="flex items-center justify-between pb-5 border-b border-[#F0F2F6] mb-5">
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900 text-white shadow-2xs">
                  Overview
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-default">
                  Activity
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-default hidden sm:inline">
                  Customers
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-default">
                  Issues
                </span>
              </div>
              <button
                type="button"
                aria-label="Filter"
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <SlidersHorizontal size={14} />
              </button>
            </div>

            {/* Glowing Icon Tile */}
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20 flex items-center justify-center mb-3.5 shadow-2xs">
              <Lightbulb size={18} strokeWidth={2.2} />
            </div>

            {/* Document Title */}
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 mb-4">
              Vehicle intelligence
            </h3>

            {/* Linear Inline Metadata Properties */}
            <div className="flex flex-col gap-2.5 pb-5 border-b border-[#F0F2F6]">
              {/* Row 1: Properties */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap">
                <span className="text-slate-400 font-medium w-16 sm:w-20 shrink-0">
                  Properties
                </span>
                {/* Status */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 font-medium border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Active
                </span>
                {/* Lead */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200/60">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-800 text-[9px] text-white flex items-center justify-center font-bold">
                    N
                  </span>
                  nan
                </span>
                {/* Target Date */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px] border border-slate-200/60">
                  <Calendar size={11} className="text-slate-400" />
                  Q3 2026
                </span>
              </div>

              {/* Row 2: Resources & Budget */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap">
                <span className="text-slate-400 font-medium w-16 sm:w-20 shrink-0">
                  Resources
                </span>
                {/* Code Tag */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-700 font-medium border border-cyan-500/20">
                  <Code2 size={12} className="text-cyan-600" />
                  Prediction model design
                </span>
                {/* Cloud Tag */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-600/10 text-amber-800 font-medium border border-amber-600/20">
                  <Cloud size={12} className="text-amber-600" />
                  Evals
                </span>
                {/* Live Budget Ratio */}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 font-mono text-[11px] font-semibold border border-emerald-500/20">
                  <TrendingUp size={11} />
                  $18.4k / $25k
                </span>
              </div>
            </div>

            {/* Document Spec & Prose Content (Softly melting downward) */}
            <div
              className="pt-4 relative"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 50%, rgba(0,0,0,0.3) 78%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 50%, rgba(0,0,0,0.3) 78%, transparent 100%)",
              }}
            >
              <h4 className="text-sm font-medium text-slate-800 mb-2">
                Prediction and decision-making systems
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span>Implement contextual memory & multi-tenant isolation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span>Automated 80% budget cap warning threshold trigger</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <span className="mt-0.5">•</span>
                  <span>Model latency benchmarking across edge inference nodes</span>
                </li>
              </ul>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FCFDFF] via-[#FCFDFF]/80 to-transparent pointer-events-none" />
          </div>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 02: Milestone Management (Linear Document Style)
    // =========================================================================
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* Ambient Glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[340px] h-[180px] bg-gradient-to-b from-indigo-500/6 to-transparent blur-3xl pointer-events-none rounded-full" />

          {/* Linear Porcelain Surface */}
          <div className="relative rounded-2xl bg-[#FCFDFF] border border-[#E7E9EE] shadow-[0_2px_4px_rgba(15,23,42,0.02),0_12px_28px_-8px_rgba(15,23,42,0.06)] p-5 sm:p-7 overflow-hidden w-full min-w-0">
            {/* Top View Switcher */}
            <div className="flex items-center justify-between pb-5 border-b border-[#F0F2F6] mb-5">
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900 text-white shadow-2xs">
                  Milestones
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-default">
                  Roadmap
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-default hidden sm:inline">
                  Approvals
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-default">
                  Audit
                </span>
              </div>
              <button
                type="button"
                aria-label="Filter"
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <SlidersHorizontal size={14} />
              </button>
            </div>

            {/* Glowing Icon Tile */}
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 flex items-center justify-center mb-3.5 shadow-2xs">
              <Flag size={18} strokeWidth={2.2} />
            </div>

            {/* Document Title */}
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 mb-4">
              Beta Mobile App — Production Handover
            </h3>

            {/* Linear Inline Metadata Properties */}
            <div className="flex flex-col gap-2.5 pb-5 border-b border-[#F0F2F6]">
              {/* Row 1: Status & Assignee */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap">
                <span className="text-slate-400 font-medium w-16 sm:w-20 shrink-0">
                  Properties
                </span>
                {/* Progress Pill */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-700 font-medium border border-blue-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  3 of 4 Milestones Reached
                </span>
                {/* Lead */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200/60">
                  <span className="w-3.5 h-3.5 rounded-full bg-indigo-600 text-[9px] text-white flex items-center justify-center font-bold">
                    E
                  </span>
                  elena
                </span>
                {/* Deadline */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px] border border-slate-200/60">
                  <Calendar size={11} className="text-slate-400" />
                  Sept 30, 2026
                </span>
              </div>

              {/* Row 2: Gated Billing */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap">
                <span className="text-slate-400 font-medium w-16 sm:w-20 shrink-0">
                  Billing
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-700 font-medium border border-cyan-500/20">
                  Gated Milestone Release
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 font-mono text-[11px] font-semibold border border-emerald-500/20">
                  Auto-Inv #1042 ($8,000)
                </span>
              </div>
            </div>

            {/* Phased Milestones (Fading down cleanly) */}
            <div
              className="pt-4 relative"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 50%, rgba(0,0,0,0.3) 78%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 50%, rgba(0,0,0,0.3) 78%, transparent 100%)",
              }}
            >
              <h4 className="text-sm font-medium text-slate-800 mb-2.5">
                Phase sign-offs & deliverable checklist
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
                <li className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>Phase 1: Architecture & UX spec</span>
                  </span>
                  <span className="font-mono text-[10.5px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 shrink-0">
                    Approved (Inv #1040 Paid)
                  </span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>Phase 2: Database & Core APIs</span>
                  </span>
                  <span className="font-mono text-[10.5px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 shrink-0">
                    Approved (Inv #1041 Paid)
                  </span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-medium text-slate-900">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-blue-500 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                    </span>
                    <span>Phase 3: Production Handover</span>
                  </span>
                  <span className="font-mono text-[10.5px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60 shrink-0">
                    Review in progress (92%)
                  </span>
                </li>
                <li className="flex items-center justify-between gap-2 text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border border-slate-300 shrink-0" />
                    <span>Phase 4: Store Submission & SLA</span>
                  </span>
                  <span className="font-mono text-[10.5px] text-slate-400 shrink-0">
                    Scheduled
                  </span>
                </li>
              </ul>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FCFDFF] via-[#FCFDFF]/80 to-transparent pointer-events-none" />
          </div>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 03: Team Bandwidth & Billable Timers (Linear Document Style)
    // =========================================================================
    if (featureIndex === "03") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* Ambient Glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[340px] h-[180px] bg-gradient-to-b from-emerald-500/6 to-transparent blur-3xl pointer-events-none rounded-full" />

          {/* Linear Porcelain Surface */}
          <div className="relative rounded-2xl bg-[#FCFDFF] border border-[#E7E9EE] shadow-[0_2px_4px_rgba(15,23,42,0.02),0_12px_28px_-8px_rgba(15,23,42,0.06)] p-5 sm:p-7 overflow-hidden w-full min-w-0">
            {/* Top View Switcher */}
            <div className="flex items-center justify-between pb-5 border-b border-[#F0F2F6] mb-5">
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900 text-white shadow-2xs">
                  Bandwidth
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-default">
                  Timesheets
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-default hidden sm:inline">
                  Specialists
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-default">
                  Audit
                </span>
              </div>
              <button
                type="button"
                aria-label="Filter"
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <SlidersHorizontal size={14} />
              </button>
            </div>

            {/* Glowing Icon Tile */}
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center mb-3.5 shadow-2xs">
              <Clock size={18} strokeWidth={2.2} />
            </div>

            {/* Document Title */}
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 mb-4">
              Engineering & Design Allocation
            </h3>

            {/* Linear Inline Metadata Properties */}
            <div className="flex flex-col gap-2.5 pb-5 border-b border-[#F0F2F6]">
              {/* Row 1: Active Timers */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap">
                <span className="text-slate-400 font-medium w-16 sm:w-20 shrink-0">
                  Properties
                </span>
                {/* Active Sessions */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 font-medium border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  3 Active Sessions
                </span>
                {/* Billable Ratio */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-700 font-medium border border-blue-500/20">
                  100% Billable
                </span>
                {/* Average Rate */}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px] border border-slate-200/60">
                  Blended $155/hr
                </span>
              </div>

              {/* Row 2: Sprints */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap">
                <span className="text-slate-400 font-medium w-16 sm:w-20 shrink-0">
                  Resources
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-700 font-medium border border-cyan-500/20">
                  Backend Architecture
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-700 font-medium border border-indigo-500/20">
                  Design Tokens
                </span>
              </div>
            </div>

            {/* Live Stopwatch List (Linear Document Style, melting downward) */}
            <div
              className="pt-4 relative"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 50%, rgba(0,0,0,0.3) 78%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 50%, rgba(0,0,0,0.3) 78%, transparent 100%)",
              }}
            >
              <h4 className="text-sm font-medium text-slate-800 mb-2.5">
                Active stopwatch ledger & allocations
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
                {/* Member 1 */}
                <li className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                      AR
                    </span>
                    <span className="font-medium text-slate-900 truncate">Alex Rivera</span>
                    <span className="text-[11px] text-slate-400 truncate hidden sm:inline">
                      • Schema routing
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white font-mono text-[10.5px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      03:42:15
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">$165/hr</span>
                  </div>
                </li>

                {/* Member 2 */}
                <li className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                      ER
                    </span>
                    <span className="font-medium text-slate-900 truncate">Elena Ruiz</span>
                    <span className="text-[11px] text-slate-400 truncate hidden sm:inline">
                      • Component audit
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white font-mono text-[10.5px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      02:18:40
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">$140/hr</span>
                  </div>
                </li>

                {/* Member 3 */}
                <li className="flex items-center justify-between gap-2 text-slate-400">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                      MV
                    </span>
                    <span className="truncate">Marcus Vance</span>
                    <span className="text-[11px] truncate hidden sm:inline">• Test suite</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[10.5px]">6.5 hrs logged</span>
                    <span className="font-mono text-[10px] text-emerald-600">$975</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FCFDFF] via-[#FCFDFF]/80 to-transparent pointer-events-none" />
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
