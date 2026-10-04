"use client";

import React, { useState, useEffect } from "react";
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
  ArrowRight,
  Activity,
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
  // Live animated state for Tasks features
  const [activeTaskView, setActiveTaskView] = useState<"board" | "list">("board");
  const [checklistChecked, setChecklistChecked] = useState(false);
  const [subtaskChecked, setSubtaskChecked] = useState(false);
  const [subtask3Checked, setSubtask3Checked] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Live timer tick effect
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev >= 59 ? 10 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Automated gentle checking/unchecking cycle for interactive preview feel
  useEffect(() => {
    const cycle = setInterval(() => {
      setChecklistChecked((prev) => !prev);
      setTimeout(() => {
        setSubtaskChecked((prev) => !prev);
      }, 1500);
      setTimeout(() => {
        setSubtask3Checked((prev) => !prev);
      }, 3000);
    }, 5000);
    return () => clearInterval(cycle);
  }, []);

  // Automated gentle switching between Board and List view for Feature 01
  useEffect(() => {
    const viewInterval = setInterval(() => {
      setActiveTaskView((prev) => (prev === "board" ? "list" : "board"));
    }, 4000);
    return () => clearInterval(viewInterval);
  }, []);
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
    // FEATURE 01: Flexible Views That Adapt to Your Flow (Authentic Kanban & Card)
    // Matches screenshot media_1791139510552.png & media_1791139519845.png 100%
    // =========================================================================
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-4 sm:p-5 rounded-2xl w-full min-w-0">
            {/* Top Navigation Bar: Search, Filters & View Toggle */}
            <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-100 mb-3.5 min-w-0">
              <div className="flex items-center gap-2 bg-[#F8FAFC] border border-slate-200/90 rounded-lg px-2.5 py-1.5 text-xs text-slate-500 w-44 sm:w-52 min-w-0">
                <Search size={13} className="text-slate-400 shrink-0" />
                <span className="truncate">Search tasks...</span>
                <kbd className="ml-auto font-mono text-[10px] bg-white border border-slate-200 px-1 rounded text-slate-400 shrink-0">
                  /
                </kbd>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* View switcher: List vs Board */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-xs">
                  <span className="flex items-center gap-1 px-2 py-1 text-slate-500 cursor-default">
                    <List size={12} />
                    <span className="hidden sm:inline">List</span>
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 bg-white rounded-md shadow-2xs text-[#0F172A] font-bold">
                    <Kanban size={12} className="text-[#3F72AF]" />
                    <span className="hidden sm:inline">Board</span>
                  </span>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1.5 bg-[#1D63ED] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs">
                  <Plus size={13} />
                  <span className="hidden sm:inline">New task</span>
                  <kbd className="hidden sm:inline font-mono text-[9px] bg-blue-800/60 px-1 rounded">n</kbd>
                </div>
              </div>
            </div>

            {/* Sub-header Filter Tabs */}
            <div className="flex items-center justify-between pb-3 text-xs mb-3 text-slate-600">
              <div className="flex items-center gap-1 text-[11.5px]">
                <span className="font-bold text-[#0F172A] pb-1 border-b-2 border-[#1D63ED] px-1">
                  All tasks
                </span>
                <span className="px-2 py-0.5 text-slate-500 hover:text-slate-900">
                  Overdue <span className="font-mono text-[10px] bg-slate-100 px-1 rounded-full text-slate-600 ml-0.5">0</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-slate-500">
                  Due Today <span className="font-mono text-[10px] bg-slate-100 px-1 rounded-full text-slate-600 ml-0.5">0</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-slate-500">
                  Due This Week <span className="font-mono text-[10px] bg-slate-100 px-1 rounded-full text-slate-600 ml-0.5">0</span>
                </span>
              </div>
            </div>

            {/* Focused Authentic Kanban Column & Card Structure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5">
              {/* COLUMN 1: TO DO (2) */}
              <div className="bg-[#EEF1F5]/80 border border-slate-200/80 rounded-2xl p-2.5 sm:p-3 flex flex-col gap-2.5">
                {/* Column Pill Header */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200/90 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
                    <span className="w-2.5 h-2.5 rounded-full border-2 border-slate-400" />
                    <span className="tracking-wide text-[11px]">TO DO</span>
                    <span className="font-mono text-[11px] text-slate-400 ml-0.5">2</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <MoreHorizontal size={14} className="hover:text-slate-600 cursor-default" />
                    <Plus size={14} className="hover:text-slate-600 cursor-default" />
                  </div>
                </div>

                {/* EXACT CARD 1: Dummy Agency Task */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 flex flex-col gap-2.5">
                  <h4 className="text-sm font-bold text-[#0B0B0F] tracking-tight">
                    Refactor Auth Middleware
                  </h4>

                  {/* Priority & Date Tags */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#D97706]">
                      <Flag size={12} strokeWidth={2.2} /> Medium
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-slate-200 text-xs text-slate-700 bg-white font-medium">
                      <Calendar size={11} className="text-slate-400" /> Oct 15
                    </span>
                  </div>

                  {/* Progress Bar & Subtask fraction: 1/2 */}
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <CheckSquare size={13} className="text-slate-400 shrink-0" />
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2563EB] rounded-full w-1/2" />
                    </div>
                    <span className="font-mono text-xs text-slate-500 font-semibold shrink-0">
                      1/2
                    </span>
                  </div>

                  {/* Card Footer: Assignee Avatar, Checklist badge, Arrow */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center border border-slate-200 shadow-2xs">
                      AM
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-500">
                      <span className="flex items-center gap-1 font-mono text-xs font-semibold">
                        <CheckSquare size={12} className="text-slate-400" /> 3
                      </span>
                      <ArrowRight size={13} className="text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* CARD 2: Dummy Agency Task */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 flex flex-col gap-2.5">
                  <h4 className="text-sm font-bold text-[#0B0B0F] tracking-tight">
                    API Endpoint Rate Limiting
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#DC2626]">
                      <Flag size={12} strokeWidth={2.5} /> Urgent
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Core Platform</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center border border-slate-200 shadow-2xs">
                      SJ
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Paperclip size={12} />
                      <span className="font-mono text-xs">1</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>

                {/* + Add task button */}
                <button className="text-xs text-slate-500 hover:text-slate-800 font-medium py-1 px-2 text-left flex items-center gap-1">
                  <Plus size={13} /> Add task
                </button>
              </div>

              {/* COLUMN 2: DONE (101) */}
              <div className="bg-[#EEF1F5]/80 border border-slate-200/80 rounded-2xl p-2.5 sm:p-3 flex flex-col gap-2.5">
                {/* Column Pill Header */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200/90 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
                    <CheckCircle2 size={13} className="text-emerald-600 fill-emerald-100" />
                    <span className="tracking-wide text-[11px]">DONE</span>
                    <span className="font-mono text-[11px] text-slate-400 ml-0.5">101</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <MoreHorizontal size={14} className="hover:text-slate-600 cursor-default" />
                    <Plus size={14} className="hover:text-slate-600 cursor-default" />
                  </div>
                </div>

                {/* DONE CARD 1: Dummy Agency Task */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 flex flex-col gap-2.5 opacity-90">
                  <h4 className="text-sm font-bold text-[#0B0B0F] tracking-tight">
                    Design System Tokens Audit
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#D97706]">
                      <Flag size={12} strokeWidth={2.2} /> Medium
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-slate-200 text-xs text-slate-700 bg-white font-medium">
                      <Calendar size={11} className="text-slate-400" /> Mar 25
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Design Systems</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center border border-slate-200 shadow-2xs">
                      AM
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Paperclip size={12} />
                      <span className="font-mono text-xs">1</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>

                {/* DONE CARD 2: Dummy Agency Task (Fading Down) */}
                <div
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 flex flex-col gap-2 opacity-70"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 95%)",
                  }}
                >
                  <h4 className="text-sm font-bold text-[#0B0B0F] tracking-tight">
                    Database Index Optimization
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#DC2626]">
                      <Flag size={12} strokeWidth={2.5} /> Urgent
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-slate-200 text-xs text-slate-700 bg-white font-medium">
                      <Calendar size={11} className="text-slate-400" /> Mar 30
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 02: Granular Subtasks for Intricate Deliverables (Checklists & Subtasks)
    // Matches screenshot media_1791139525719.png 100% (Clean focus on Checklist & Subtasks)
    // =========================================================================
    if (featureIndex === "02") {
      const checklistDone = checklistChecked ? 2 : 1;
      const checklistPercent = checklistChecked ? 100 : 50;
      const subtasksDoneCount = 1 + (subtaskChecked ? 1 : 0) + (subtask3Checked ? 1 : 0);

      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-4 sm:p-6 rounded-2xl w-full min-w-0">
            {/* Granular Checklist & Subtasks Detail (100% Matching media_1791139525719.png) */}
            <div className="space-y-6">
              {/* CHECKLIST CONTAINER */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckSquare size={16} className="text-[#0B0B0F]" />
                    <h5 className="text-sm font-bold text-[#0B0B0F]">Checklist</h5>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-xs font-semibold transition-all">
                      {checklistDone}/2
                    </span>
                    {/* Small Green Progress Capsule */}
                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#16A34A] rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${checklistPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Big Green Progress Bar with 50% / 100% Indicator */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#16A34A] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${checklistPercent}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-700 shrink-0 transition-all">
                    {checklistPercent}%
                  </span>
                </div>

                {/* Checklist Item 1 (Checked / Strikethrough) */}
                <div className="flex items-center gap-2.5 py-1.5 text-xs text-slate-400">
                  <div className="w-4 h-4 rounded bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span className="line-through font-medium">Verify OAuth redirect callback URLs</span>
                </div>

                {/* Checklist Item 2 (Animated Toggling) */}
                <div
                  onClick={() => setChecklistChecked(!checklistChecked)}
                  className="flex items-center gap-2.5 py-1.5 text-xs text-slate-800 cursor-pointer group/item select-none"
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                      checklistChecked
                        ? "bg-[#2563EB] text-white"
                        : "border-2 border-slate-400 bg-white group-hover/item:border-blue-500"
                    }`}
                  >
                    {checklistChecked && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span
                    className={`font-medium transition-colors ${
                      checklistChecked ? "line-through text-slate-400" : "text-slate-800"
                    }`}
                  >
                    Configure JWT expiration headers
                  </span>
                </div>

                {/* Add item input row with + button */}
                <div className="mt-2.5 flex items-center gap-2">
                  <div className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-400">
                    Add item...
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-[#94A3B8]/40 hover:bg-[#94A3B8]/60 text-white flex items-center justify-center shrink-0">
                    <Plus size={14} />
                  </div>
                </div>
              </div>

              {/* SUBTASKS CONTAINER (100% Matching Screenshot 4) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <CheckSquare size={16} className="text-[#0B0B0F]" />
                    <h5 className="text-sm font-bold text-[#0B0B0F]">Subtasks</h5>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-xs font-semibold transition-all">
                      {subtasksDoneCount}/3
                    </span>
                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#16A34A] rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(subtasksDoneCount / 3) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button className="flex items-center gap-1 text-xs font-medium text-[#2563EB] hover:text-blue-800">
                    <Sparkles size={13} className="animate-pulse" />
                    <span>AI breakdown</span>
                  </button>
                </div>

                {/* Subtask Nested Card Box */}
                <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white divide-y divide-slate-100 shadow-2xs">
                  {/* Subtask 1: Done */}
                  <div className="p-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 text-xs">
                      <div className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <ChevronRight size={13} className="text-slate-400" />
                      <span className="line-through text-slate-500 font-medium">Generate database schema migration</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200 text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" /> Done
                    </span>
                  </div>

                  {/* Subtask 2: Animated toggle */}
                  <div
                    onClick={() => setSubtaskChecked(!subtaskChecked)}
                    className="p-3 flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-50/70 transition-colors select-none"
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          subtaskChecked
                            ? "bg-[#16A34A] text-white shadow-2xs"
                            : "border-2 border-slate-300 bg-white"
                        }`}
                      >
                        {subtaskChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <ChevronRight size={13} className="text-slate-400" />
                      <span
                        className={`font-medium transition-all ${
                          subtaskChecked ? "line-through text-slate-400" : "text-slate-800"
                        }`}
                      >
                        Execute end-to-end integration tests
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-colors ${
                        subtaskChecked
                          ? "bg-emerald-50 text-[#16A34A] border-emerald-200 font-bold"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          subtaskChecked ? "bg-[#16A34A]" : "bg-slate-400"
                        }`}
                      />
                      {subtaskChecked ? "Done" : "To Do"}
                    </span>
                  </div>

                  {/* Subtask 3: Animated toggle */}
                  <div
                    onClick={() => setSubtask3Checked(!subtask3Checked)}
                    className="p-3 flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-50/70 transition-colors select-none"
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          subtask3Checked
                            ? "bg-[#16A34A] text-white shadow-2xs"
                            : "border-2 border-slate-300 bg-white"
                        }`}
                      >
                        {subtask3Checked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <ChevronRight size={13} className="text-slate-400" />
                      <span
                        className={`font-medium transition-all ${
                          subtask3Checked ? "line-through text-slate-400" : "text-slate-800"
                        }`}
                      >
                        Deploy artifact to staging preview
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-colors ${
                        subtask3Checked
                          ? "bg-emerald-50 text-[#16A34A] border-emerald-200 font-bold"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          subtask3Checked ? "bg-[#16A34A]" : "bg-slate-400"
                        }`}
                      />
                      {subtask3Checked ? "Done" : "To Do"}
                    </span>
                  </div>

                  {/* Add a subtask row */}
                  <div className="p-3 flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <div className="w-5 h-5 rounded-full border border-dashed border-slate-300 flex items-center justify-center shrink-0">
                      <Plus size={11} className="text-slate-400" />
                    </div>
                    <span>Add a subtask...</span>
                  </div>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 03: Never Lose a Billable Minute (Task Drawer & Stopwatch Timer)
    // Matches screenshot media_1791139523756.png 100% (With Live Running Timer)
    // =========================================================================
    if (featureIndex === "03") {
      const formattedSeconds = String(timerSeconds).padStart(2, "0");

      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-4 sm:p-6 rounded-2xl w-full min-w-0">
            {/* Drawer Header Tabs (Comments vs Activity) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4 min-w-0">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
                  <span className="w-2 h-2 rounded-full border-2 border-slate-400" />
                  <span>TO DO</span>
                  <ChevronDown size={12} className="text-slate-400 ml-0.5" />
                </div>
                <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-slate-200 text-xs text-slate-600 bg-white hover:bg-slate-50 font-medium">
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                  <span>Mark complete</span>
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="text-slate-400 hover:text-slate-700 flex items-center gap-1 cursor-default">
                  <MessageSquare size={13} /> Comments
                </span>
                <span className="text-[#0F172A] border-b-2 border-[#1D63ED] pb-3 -mb-3 flex items-center gap-1">
                  <Activity size={13} className="text-[#1D63ED]" /> Activity
                </span>
              </div>
            </div>

            {/* Task Title & Meta Fields */}
            <h3 className="text-xl font-bold text-[#0B0B0F] tracking-tight mb-3">
              Refactor Auth Middleware
            </h3>

            {/* Meta Properties Grid (100% Matching Screenshot 3) */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Users size={13} className="text-slate-400" /> Assignee
                </span>
                <span className="text-slate-800 font-medium">Alex Morgan</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Calendar size={13} className="text-slate-400" /> Due Date
                </span>
                <span className="text-slate-800 font-medium">Oct 15, 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Flag size={13} className="text-[#D97706]" /> Priority
                </span>
                <span className="text-[#D97706] font-semibold">Medium</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Clock size={13} className="text-slate-400" /> Estimate
                </span>
                <span className="font-mono text-slate-800">4.5 h</span>
              </div>
            </div>

            {/* FLOATING STOPWATCH WIDGET (With Live Active Timer & Pause/Resume Control) */}
            <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs relative">
              {/* Header: Radio dot & "This task" */}
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isTimerRunning ? 'bg-[#2563EB] ring-4 ring-blue-100 animate-pulse' : 'bg-slate-400 ring-4 ring-slate-100'}`} />
                  <span className="text-xs font-bold text-slate-800">This task</span>
                </div>
                <span className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-default">—</span>
              </div>

              {/* Big Stopwatch Digits: 00:00:10 (Live updating seconds) */}
              <div className="py-2 text-center">
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#0B0B0F] tracking-tight">
                  00:00:{formattedSeconds}
                </span>
              </div>

              {/* Add description input */}
              <div className="px-3 py-1.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-400 mb-3 text-left">
                + Add description...
              </div>

              {/* Pause & Stop Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold shadow-2xs transition-colors ${
                    isTimerRunning
                      ? "border-slate-200 hover:bg-slate-50 text-slate-700"
                      : "bg-blue-50 border-blue-200 text-blue-700"
                  }`}
                >
                  <span className="w-1 h-3 bg-current inline-block rounded-xs" />
                  <span className="w-1 h-3 bg-current inline-block rounded-xs" />
                  <span>{isTimerRunning ? "Pause" : "Resume"}</span>
                </button>
                <button
                  onClick={() => {
                    setTimerSeconds(0);
                    setIsTimerRunning(false);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-bold text-[#DC2626] shadow-2xs transition-colors"
                >
                  <div className="w-2.5 h-2.5 rounded-xs border-2 border-[#DC2626]" />
                  <span>Stop</span>
                </button>
              </div>
            </div>

            {/* Time Tracking Drawer Summary Row */}
            <div className="mt-3 grid grid-cols-2 gap-2 p-2.5 bg-[#F8FAFC] rounded-xl border border-slate-200/60 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-mono">My Logged</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block font-mono">
                  0h {Math.floor(timerSeconds / 60)}m
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-mono">My Billable</span>
                <span className="font-bold text-emerald-600 text-xs mt-0.5 block font-mono">
                  0h {Math.floor(timerSeconds / 60)}m
                </span>
              </div>
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
