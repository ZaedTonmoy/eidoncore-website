"use client";

import React from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  MoreHorizontal,
  Plus,
  Users,
  Flag,
  CheckSquare,
  LayoutGrid,
  List,
  Kanban,
  Sparkles,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Play,
  Check,
  Paperclip,
  MessageSquare,
  Tag,
  Eye,
  Shield,
  Globe,
} from "lucide-react";
import BlendMockupCard from "@/components/BlendMockupCard";

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
  // Only apply custom Eidoncore focused cards on /projects
  if (moduleName.toLowerCase() === "projects") {
    // =========================================================================
    // FEATURE 01: Real-Time Budget Burndown (Eidoncore Real Project Card)
    // =========================================================================
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* True Linear Radial Spotlight */}
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-[420px] h-[220px] pointer-events-none rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 35%, rgba(63, 114, 175, 0.14) 0%, rgba(63, 114, 175, 0.04) 50%, transparent 80%)",
            }}
          />

          {/* Wrapped in BlendMockupCard for smooth light theme edge blending */}
          <BlendMockupCard className="bg-white p-4 sm:p-6 rounded-2xl w-full min-w-0">
            {/* Eidoncore Real App Toolbar */}
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-4 min-w-0">
              <div className="flex items-center gap-2 bg-[#F8FAFC] border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-500 w-44 sm:w-56 min-w-0">
                <Search size={13} className="text-slate-400 shrink-0" />
                <span className="truncate">Search projects...</span>
                <kbd className="ml-auto font-mono text-[10px] bg-white border border-slate-200 px-1 rounded text-slate-400 shrink-0">
                  /
                </kbd>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/70 text-slate-600">
                  <span className="p-1 bg-white rounded shadow-2xs text-[#3F72AF]">
                    <LayoutGrid size={13} />
                  </span>
                  <span className="p-1 text-slate-400">
                    <List size={13} />
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1.5 bg-[#3F72AF] text-white rounded-lg text-xs font-semibold shadow-xs">
                  <Plus size={13} />
                  <span className="hidden sm:inline">New Project</span>
                  <kbd className="hidden sm:inline font-mono text-[9px] bg-blue-700/60 px-1 rounded">n</kbd>
                </div>
              </div>
            </div>

            {/* Eidoncore Project Card 1: Alpha Website Redesign */}
            <div className="bg-white rounded-xl border border-blue-200/90 shadow-xs p-4 sm:p-5 relative mb-3">
              {/* Card Top: Checkbox, Status Pill, Three-dots */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white" />
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#3F72AF] border border-blue-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F72AF]" />
                    In Progress
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                    On Track
                  </span>
                </div>
                <MoreHorizontal size={16} className="text-slate-400 cursor-default" />
              </div>

              {/* Project Badge & Title */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#EAB308] text-white font-bold flex items-center justify-center shrink-0 text-sm shadow-2xs">
                  A
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug truncate">
                    Alpha Website Redesign
                  </h4>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium">
                    Alpha Corp
                  </span>
                </div>
              </div>

              {/* Progress Gauge & Stats */}
              <div className="flex items-center gap-4 py-3 border-t border-slate-100">
                {/* SVG Progress Ring 75% */}
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      stroke="#3F72AF"
                      strokeWidth="4"
                      strokeDasharray={113}
                      strokeDashoffset={113 * (1 - 0.75)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-slate-900">75%</span>
                </div>
                <div className="text-xs text-slate-500 space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Calendar size={13} className="text-slate-400 shrink-0" />
                    <span>Due in 14 days (Q3 Target)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock size={13} className="text-slate-400 shrink-0" />
                    <span>184.5h logged • 14/18 deliverables</span>
                  </div>
                </div>
              </div>

              {/* Eidoncore Signature 3-Column Financial Box */}
              <div className="mt-2.5 p-2.5 sm:p-3 bg-[#F1F5F9]/80 rounded-xl grid grid-cols-3 text-center border border-slate-200/50">
                <div className="min-w-0">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    INVOICED
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 block truncate">
                    $18,450
                  </span>
                </div>
                <div className="border-x border-slate-200/70 min-w-0">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    PAID
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-600 mt-0.5 block truncate">
                    $12,500
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    DUE
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#3F72AF] mt-0.5 block truncate">
                    $5,950
                  </span>
                </div>
              </div>

              {/* Team Assignees Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center -space-x-1.5">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-2xs">
                    AR
                  </span>
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-2xs">
                    ER
                  </span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-[9.5px] flex items-center justify-center border-2 border-white">
                    +2
                  </span>
                </div>
                <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                  Budget Margin: +36.5%
                </span>
              </div>
            </div>

            {/* Second Peeking Eidoncore Card (Beta Mobile App) dissolving downward */}
            <div
              className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-4 opacity-70"
              style={{
                maskImage:
                  "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#0284C7] text-white font-bold flex items-center justify-center text-xs">
                  B
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Beta Mobile App</h5>
                  <span className="text-[10px] text-slate-400">Beta Inc • 4 milestones</span>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 02: Milestone Management (Eidoncore Gated Milestones & Tasks)
    // =========================================================================
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* True Linear Radial Spotlight */}
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-[420px] h-[220px] pointer-events-none rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 35%, rgba(99, 102, 241, 0.14) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 80%)",
            }}
          />

          {/* Wrapped in BlendMockupCard for smooth light theme edge blending */}
          <BlendMockupCard className="bg-white p-4 sm:p-6 rounded-2xl w-full min-w-0">
            {/* Header: Project Milestone Overview */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4 min-w-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#0284C7] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                  B
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    Beta Mobile App — Production Handover
                  </h4>
                  <span className="text-[11px] text-slate-500 block truncate">
                    3 of 4 Milestones Reached (75%)
                  </span>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-[#3F72AF] bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-200/80 shrink-0">
                Gated Billing
              </span>
            </div>

            {/* Eidoncore Real Milestone Rows */}
            <div className="flex flex-col gap-2.5 pb-2">
              {/* Phase 1 */}
              <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-slate-200/70 gap-2 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={13} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-slate-900 block truncate">
                      Phase 1: Architecture & UX
                    </span>
                    <span className="text-[10.5px] text-slate-500 font-mono block truncate">
                      14 deliverables signed off
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 block mb-0.5">
                    Approved ✓
                  </span>
                  <span className="text-[9.5px] font-mono text-slate-500">Inv #1040 Paid ($5K)</span>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-slate-200/70 gap-2 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={13} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-slate-900 block truncate">
                      Phase 2: Database & Core APIs
                    </span>
                    <span className="text-[10.5px] text-slate-500 font-mono block truncate">
                      Tenant isolation verified
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 block mb-0.5">
                    Approved ✓
                  </span>
                  <span className="text-[9.5px] font-mono text-slate-500">Inv #1041 Paid ($7.5K)</span>
                </div>
              </div>

              {/* Phase 3 - In Review / Active */}
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#3F72AF]/50 shadow-2xs gap-2 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-5 h-5 rounded-md bg-blue-50 text-[#3F72AF] border border-blue-200 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#3F72AF] animate-ping" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      Phase 3: Production Handover
                    </span>
                    <span className="text-[10.5px] text-[#3F72AF] font-mono font-medium block truncate">
                      Client review in progress (92%)
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#3F72AF] border border-blue-200 block mb-0.5">
                    Sign-off Pending
                  </span>
                  <span className="text-[9.5px] font-mono text-slate-900 font-semibold">
                    Auto-Inv #1042 ($8K)
                  </span>
                </div>
              </div>

              {/* Phase 4 - Fading Down */}
              <div
                className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-slate-200/70 opacity-60 gap-2 min-w-0"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-5 h-5 rounded-md bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center shrink-0">
                    <Clock size={12} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-slate-600 block truncate">
                      Phase 4: Store Submission & SLA
                    </span>
                    <span className="text-[10.5px] text-slate-400 font-mono block truncate">
                      Gated behind Phase 3 sign-off
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  Scheduled
                </span>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 03: Team Bandwidth & Billable Timers (Eidoncore Live Ledger)
    // =========================================================================
    if (featureIndex === "03") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* True Linear Radial Spotlight */}
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-[420px] h-[220px] pointer-events-none rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 35%, rgba(16, 185, 129, 0.14) 0%, rgba(16, 185, 129, 0.04) 50%, transparent 80%)",
            }}
          />

          {/* Wrapped in BlendMockupCard for smooth light theme edge blending */}
          <BlendMockupCard className="bg-white p-4 sm:p-6 rounded-2xl w-full min-w-0">
            {/* Header: Live Stopwatch Overview */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4 min-w-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock size={16} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    Live Team Bandwidth & Timers
                  </h4>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span>3 active stopwatch sessions</span>
                  </span>
                </div>
              </div>
              <span className="text-[10px] sm:text-[10.5px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200 shrink-0">
                100% Billable
              </span>
            </div>

            {/* Active Stopwatch Ledger */}
            <div className="flex flex-col gap-2.5 pb-2">
              {/* Member 1: Alex Rivera */}
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-200/70 flex items-center justify-between gap-2 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    AR
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 truncate">Alex Rivera</span>
                      <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">• Lead Dev</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block truncate">
                      Multi-tenant API & auth routing
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-900 text-white rounded font-mono text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>03:42:15</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#3F72AF] font-semibold mt-0.5 block">
                    $165/hr • Billable
                  </span>
                </div>
              </div>

              {/* Member 2: Elena Ruiz */}
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-200/70 flex items-center justify-between gap-2 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                    ER
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 truncate">Elena Ruiz</span>
                      <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">• Product Designer</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block truncate">
                      Figma tokens & client portal QA
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-900 text-white rounded font-mono text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>02:18:40</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#3F72AF] font-semibold mt-0.5 block">
                    $140/hr • Billable
                  </span>
                </div>
              </div>

              {/* Member 3: Marcus Vance (Fading Down) */}
              <div
                className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-200/70 flex items-center justify-between gap-2 opacity-60 min-w-0"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                    MV
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-slate-800 block truncate">
                      Marcus Vance
                    </span>
                    <span className="text-[11px] text-slate-400 block truncate">
                      QA test coverage & bug bash
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono font-semibold text-slate-900 block">
                    6.5 hrs
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-semibold block">
                    $975 logged
                  </span>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }
  }

  // Only apply custom Eidoncore focused cards on /tasks
  if (moduleName.toLowerCase() === "tasks") {
    // =========================================================================
    // FEATURE 01: Flexible Views That Adapt to Your Flow (Kanban Column & Cards)
    // =========================================================================
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* True Linear Radial Spotlight */}
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-[420px] h-[220px] pointer-events-none rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 35%, rgba(63, 114, 175, 0.14) 0%, rgba(63, 114, 175, 0.04) 50%, transparent 80%)",
            }}
          />

          {/* Wrapped in BlendMockupCard for smooth light theme edge blending */}
          <BlendMockupCard className="bg-white p-4 sm:p-6 rounded-2xl w-full min-w-0">
            {/* Eidoncore App Header Bar */}
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-4 min-w-0">
              <div className="flex items-center gap-2 bg-[#F8FAFC] border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-500 w-44 sm:w-56 min-w-0">
                <Search size={13} className="text-slate-400 shrink-0" />
                <span className="truncate">Search tasks...</span>
                <kbd className="ml-auto font-mono text-[10px] bg-white border border-slate-200 px-1 rounded text-slate-400 shrink-0">
                  /
                </kbd>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/70 text-slate-600">
                  <span className="p-1 bg-white rounded shadow-2xs text-[#3F72AF]">
                    <Kanban size={13} />
                  </span>
                  <span className="p-1 text-slate-400">
                    <List size={13} />
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1.5 bg-[#3F72AF] text-white rounded-lg text-xs font-semibold shadow-xs">
                  <Plus size={13} />
                  <span className="hidden sm:inline">New task</span>
                  <kbd className="hidden sm:inline font-mono text-[9px] bg-blue-700/60 px-1 rounded">n</kbd>
                </div>
              </div>
            </div>

            {/* Sub-header / Filter strip */}
            <div className="flex items-center justify-between pb-3 text-xs border-b border-slate-100/80 mb-3.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 bg-slate-100/80 px-2 py-0.5 rounded">All tasks</span>
                <span className="text-slate-500 text-[11px] font-mono">103 tasks in view</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-medium text-emerald-700">98% completion rate</span>
              </div>
            </div>

            {/* Kanban Board Focused Columns: To Do & In Progress */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5">
              {/* Column 1: TO DO (2) */}
              <div className="bg-[#F8FAFC] border border-slate-200/70 rounded-xl p-3 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 pb-1 border-b border-slate-200/50">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span className="tracking-wide">TO DO</span>
                    <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full">2</span>
                  </div>
                  <Plus size={12} className="text-slate-400 hover:text-slate-700 cursor-default" />
                </div>

                {/* Card 1: Move Sdarr Site (Urgent, Active Card) */}
                <div className="bg-white rounded-xl border border-blue-200/90 shadow-2xs p-3 relative flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-1">
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      Move Sdarr Site
                    </h5>
                    <MoreHorizontal size={13} className="text-slate-400 shrink-0" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 flex items-center gap-1">
                      <Flag size={9} /> Urgent
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                      Internal Tasks
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[9px] flex items-center justify-center">
                        ST
                      </div>
                      <span className="text-slate-600 font-medium">Sakib Tanoy</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[9.5px]">Due Friday</span>
                  </div>
                </div>

                {/* Card 2: Task Ultron */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-1">
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      Task Ultron
                    </h5>
                    <MoreHorizontal size={13} className="text-slate-400 shrink-0" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                      <Flag size={9} /> Medium
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                      Internal Tasks
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                    <span>Unassigned</span>
                    <span className="font-mono text-[9.5px]">Estimate: 4h</span>
                  </div>
                </div>
              </div>

              {/* Column 2: DONE (101) */}
              <div className="bg-[#F8FAFC] border border-slate-200/70 rounded-xl p-3 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 pb-1 border-b border-slate-200/50">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="tracking-wide">DONE</span>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">101</span>
                  </div>
                  <CheckCircle2 size={12} className="text-emerald-600" />
                </div>

                {/* Card 1: TCT Task */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs flex flex-col gap-2 opacity-90">
                  <div className="flex items-start justify-between gap-1">
                    <h5 className="text-xs font-bold text-slate-900 leading-snug flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                      TCT Task
                    </h5>
                    <span className="text-[9.5px] font-mono text-slate-400">Mar 25</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      Medium
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                      Internal Tasks
                    </span>
                  </div>
                </div>

                {/* Card 2: Maintenance March */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs flex flex-col gap-2 opacity-90">
                  <div className="flex items-start justify-between gap-1">
                    <h5 className="text-xs font-bold text-slate-900 leading-snug flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                      Maintenance March
                    </h5>
                    <span className="text-[9.5px] font-mono text-slate-400">Mar 30</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-600 border border-red-200">
                      Urgent
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                      Website Maintenance
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Peeking Row: AI Copilot Prompt fading downward */}
            <div
              className="bg-[#F8FAFC] rounded-xl border border-slate-200/80 p-3 flex items-center justify-between opacity-75"
              style={{
                maskImage:
                  "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles size={13} className="text-[#3F72AF] shrink-0" />
                <span className="text-xs font-semibold text-slate-800 truncate">
                  Task Copilot: 2 active tasks, 0 overdue
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#3F72AF] bg-blue-50 px-2 py-0.5 rounded font-semibold border border-blue-200 shrink-0">
                Plan My Day
              </span>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 02: Granular Subtasks for Intricate Deliverables (Table & Checklists)
    // =========================================================================
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* True Linear Radial Spotlight */}
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-[420px] h-[220px] pointer-events-none rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 35%, rgba(99, 102, 241, 0.14) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 80%)",
            }}
          />

          {/* Wrapped in BlendMockupCard for smooth light theme edge blending */}
          <BlendMockupCard className="bg-white p-4 sm:p-6 rounded-2xl w-full min-w-0">
            {/* Header: Dense List & Subtask Filter */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4 min-w-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0 shadow-2xs">
                  <CheckSquare size={16} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    Active Work • List & Subtask View
                  </h4>
                  <span className="text-[11px] text-slate-500 block truncate">
                    2 tasks in TO DO • 101 completed
                  </span>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-[#3F72AF] bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-200/80 shrink-0">
                Table View
              </span>
            </div>

            {/* Structured Table Container */}
            <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs mb-2.5">
              {/* Group Header: TO DO (2) */}
              <div className="bg-[#F8FAFC] px-3 py-2 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-900">
                <div className="flex items-center gap-2">
                  <ChevronDown size={14} className="text-slate-500" />
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full font-mono text-[10px] font-bold">
                    TO DO
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">2 tasks</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Sorted by Priority</span>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 bg-[#FAFAFA] border-b border-slate-200 text-[10px] font-mono uppercase text-slate-500 py-1.5 px-3">
                <span className="col-span-5 font-bold">TASK</span>
                <span className="col-span-2 font-bold">PRIORITY</span>
                <span className="col-span-2 font-bold">HEALTH</span>
                <span className="col-span-3 font-bold text-right">ASSIGNEE</span>
              </div>

              {/* Row 1: Move Sdarr Site with Subtasks Checklist preview */}
              <div className="p-3 border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
                <div className="grid grid-cols-12 items-center text-xs">
                  <div className="col-span-5 flex items-center gap-2 min-w-0 pr-1">
                    <div className="w-3.5 h-3.5 rounded border border-slate-300 flex items-center justify-center shrink-0 bg-white" />
                    <span className="font-bold text-slate-900 truncate">Move Sdarr Site</span>
                  </div>
                  <div className="col-span-2">
                    <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-red-50 text-red-600 border border-red-200 inline-flex items-center gap-1">
                      <Flag size={8} /> Urgent
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9.5px] font-medium">
                      ● On Track
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center justify-end gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-slate-900 text-white text-[8px] font-bold flex items-center justify-center shrink-0">
                      ST
                    </div>
                    <span className="text-[11px] text-slate-700 font-medium truncate">Sakib Tanoy</span>
                  </div>
                </div>

                {/* Subtask Checklist Nested Breakdown */}
                <div className="mt-2.5 ml-5 pl-3 border-l-2 border-indigo-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                      <span className="line-through text-slate-400">Export database & media assets</span>
                    </div>
                    <span className="text-[9.5px] font-mono text-emerald-600 font-semibold">Done</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-700 font-medium">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm border-2 border-indigo-500 bg-white shrink-0" />
                      <span>Configure VPS NGINX & SSL certificates</span>
                    </div>
                    <span className="text-[9.5px] font-mono text-indigo-600 font-semibold">In Progress</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm border border-slate-300 bg-white shrink-0" />
                      <span>Update Cloudflare DNS records & SLA verify</span>
                    </div>
                    <span className="text-[9.5px] font-mono text-slate-400">Pending</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Task Ultron */}
              <div className="p-3 border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
                <div className="grid grid-cols-12 items-center text-xs">
                  <div className="col-span-5 flex items-center gap-2 min-w-0 pr-1">
                    <div className="w-3.5 h-3.5 rounded border border-slate-300 flex items-center justify-center shrink-0 bg-white" />
                    <span className="font-semibold text-slate-900 truncate">Task Ultron</span>
                  </div>
                  <div className="col-span-2">
                    <span className="px-1.5 py-0.5 rounded text-[9.5px] font-medium bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1">
                      <Flag size={8} /> Medium
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9.5px] font-medium">
                      ● On Track
                    </span>
                  </div>
                  <div className="col-span-3 text-right text-[11px] text-slate-400">
                    Unassigned
                  </div>
                </div>
              </div>
            </div>

            {/* Peeking Collapsed Group fading down */}
            <div
              className="bg-[#F8FAFC] rounded-xl border border-slate-200/70 p-2.5 flex items-center justify-between opacity-60"
              style={{
                maskImage:
                  "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
              }}
            >
              <div className="flex items-center gap-2">
                <ChevronRight size={13} className="text-slate-400" />
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-mono text-[10px] font-bold">
                  DONE
                </span>
                <span className="text-[11px] font-mono text-slate-500">101 tasks</span>
              </div>
              <span className="text-[10px] text-slate-400">All deliverables signed off</span>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 03: Integrated Timers & Task Drawer (Live Stopwatch & Credentials)
    // =========================================================================
    if (featureIndex === "03") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* True Linear Radial Spotlight */}
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-[420px] h-[220px] pointer-events-none rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 35%, rgba(16, 185, 129, 0.14) 0%, rgba(16, 185, 129, 0.04) 50%, transparent 80%)",
            }}
          />

          {/* Wrapped in BlendMockupCard for smooth light theme edge blending */}
          <BlendMockupCard className="bg-white p-4 sm:p-6 rounded-2xl w-full min-w-0">
            {/* Header: Task Drawer Top Bar */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-3.5 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] font-medium text-slate-500">Internal Tasks</span>
                <span className="text-slate-300">›</span>
                <span className="text-[11px] font-bold text-slate-900 truncate">
                  listView Sdarr Website
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-[#3F72AF] font-bold border border-blue-200">
                  Drawer View
                </span>
              </div>
            </div>

            {/* Task Title & Action Strip */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <h4 className="text-base font-bold text-slate-900 leading-snug truncate">
                  Move Sdarr Site
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#3F72AF] border border-blue-200">
                    TO DO
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 flex items-center gap-1">
                    <Flag size={9} /> Urgent
                  </span>
                </div>
              </div>

              {/* Integrated Stopwatch Component */}
              <div className="bg-[#0F172A] text-white p-2 sm:px-3 sm:py-2 rounded-xl flex items-center gap-2 shadow-xs shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div className="text-right">
                  <span className="font-mono text-xs font-bold block leading-none">01:48:22</span>
                  <span className="text-[9px] text-emerald-400 font-mono font-medium block mt-0.5">
                    100% Billable
                  </span>
                </div>
              </div>
            </div>

            {/* Meta Properties Grid */}
            <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#F8FAFC] rounded-xl border border-slate-200/70 text-xs mb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Assignee</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-4 h-4 rounded-full bg-slate-900 text-white font-bold text-[8px] flex items-center justify-center">
                    ST
                  </div>
                  <span className="font-semibold text-slate-800 text-[11.5px]">Sakib Tanoy</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Time Logged</span>
                <span className="font-mono font-bold text-emerald-600 text-[11.5px] block mt-0.5">
                  1h 48m ($247.50)
                </span>
              </div>
            </div>

            {/* Attached Credentials & Internal Notes */}
            <div className="bg-[#F8FAFC] rounded-xl border border-slate-200/80 p-3 mb-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 mb-2">
                <div className="flex items-center gap-1.5">
                  <Shield size={12} className="text-[#3F72AF]" />
                  <span className="text-[11px] font-bold text-slate-800">
                    Vault Credentials (Internal Only)
                  </span>
                </div>
                <span className="text-[9.5px] font-mono text-slate-400">Encrypted</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-mono text-[10px]">Server:</span>
                  <span className="font-mono text-slate-800 font-medium">fs-bonde.easywp.com:22</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-mono text-[10px]">Username:</span>
                  <span className="font-mono text-slate-800 font-medium">sdarr-studios-252caf</span>
                </div>
              </div>
            </div>

            {/* Live Activity & Comments preview fading down */}
            <div
              className="bg-white rounded-xl border border-slate-200/80 p-3 flex items-center justify-between opacity-70"
              style={{
                maskImage:
                  "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <MessageSquare size={13} className="text-slate-400 shrink-0" />
                <span className="text-xs text-slate-700 truncate">
                  <strong className="text-slate-900 font-semibold">Zaed Tonmoy:</strong> DNS change kora lagbe
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 shrink-0">Just now</span>
            </div>
          </BlendMockupCard>
        </div>
      );
    }
  }

  // Fallback for any other module if ever called with image
  if (image) {
    return (
      <div className="relative w-full max-w-xl group">
        <BlendMockupCard className="bg-white rounded-2xl w-full min-w-0 overflow-hidden">
          <img src={image} alt={title} className="w-full h-auto object-cover" />
        </BlendMockupCard>
      </div>
    );
  }

  return null;
}
