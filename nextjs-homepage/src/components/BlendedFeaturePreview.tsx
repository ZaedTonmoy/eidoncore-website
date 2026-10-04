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
  DollarSign,
  Timer,
  Info,
  Folder,
  Lock,
  Send,
  ThumbsUp,
  Reply,
  Smile,
  Bot,
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

  // Automated gentle switching between Board and List view for Feature 01 with realistic cursor click
  const [cursorTarget, setCursorTarget] = useState<"list" | "board" | null>(null);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const viewInterval = setInterval(() => {
      const nextView = activeTaskView === "board" ? "list" : "board";
      // First show cursor moving to target tab
      setCursorTarget(nextView);
      // Then trigger click effect
      setTimeout(() => {
        setIsClicking(true);
        setTimeout(() => {
          setIsClicking(false);
          setActiveTaskView(nextView);
          // Hide cursor after click
          setTimeout(() => {
            setCursorTarget(null);
          }, 600);
        }, 250);
      }, 500);
    }, 4500);
    return () => clearInterval(viewInterval);
  }, [activeTaskView]);
  // State for Projects Feature 01 (Budget configuration & AI Diagnostic)
  const [selectedBudget, setSelectedBudget] = useState<"Hourly" | "Fixed" | "Retainer">("Hourly");
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [diagnosticDone, setDiagnosticDone] = useState(false);

  const handleRunDiagnostic = () => {
    setIsDiagnosticRunning(true);
    setTimeout(() => {
      setIsDiagnosticRunning(false);
      setDiagnosticDone(true);
      setTimeout(() => setDiagnosticDone(false), 3000);
    }, 1200);
  };

  // State for Projects Feature 03 (Billable Time Tracker)
  const [projectTimerRunning, setProjectTimerRunning] = useState(false);
  const [projectTimerSeconds, setProjectTimerSeconds] = useState(0);

  useEffect(() => {
    if (!projectTimerRunning) return;
    const interval = setInterval(() => {
      setProjectTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [projectTimerRunning]);

  const formatProjectTime = (totalSeconds: number) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  // Only apply custom Eidoncore focused cards on /projects
  if (moduleName.toLowerCase() === "projects") {
    // =========================================================================
    // =========================================================================
    // FEATURE 01: Real-Time Budget Burndown (Combined Budget Setup, Progress & AI Diagnostic)
    // =========================================================================
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* Wrapped in BlendMockupCard for smooth light theme edge blending */}
          <BlendMockupCard className="bg-white p-4 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5">
            {/* SCREENSHOT 1: Budget Configuration Bar */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-4 shadow-2xs relative">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                {/* Left: Icon & Title */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200/60">
                    <DollarSign size={16} className="text-slate-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900 tracking-tight">Budget</span>
                </div>

                {/* Right: Inputs & Dropdown */}
                <div className="flex items-end gap-2.5 sm:gap-3">
                  {/* Budget Type Selector with open menu */}
                  <div className="relative">
                    <div className="h-9 px-3 bg-white border border-blue-400 rounded-lg text-xs font-normal text-slate-800 flex items-center justify-between gap-2 shadow-2xs min-w-[90px] sm:min-w-[96px] ring-2 ring-blue-500/10">
                      <span>{selectedBudget}</span>
                      <ChevronDown size={14} className="text-slate-400 shrink-0" />
                    </div>

                    {/* Popover Dropdown matching Screenshot 1 exactly positioned overlapping the trigger */}
                    <div className="absolute top-0 right-0 z-30 w-44 bg-[#555860] backdrop-blur-md rounded-xl p-1.5 shadow-2xl text-white text-xs border border-white/10 animate-in fade-in zoom-in-95 duration-150">
                      <button
                        type="button"
                        onClick={() => setSelectedBudget("Hourly")}
                        className="w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors text-slate-200 text-xs font-normal"
                      >
                        <span className="w-3 text-xs" />
                        <span>None</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedBudget("Fixed")}
                        className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors text-xs ${
                          selectedBudget === "Fixed" ? "text-white font-medium bg-white/10" : "text-slate-200 hover:bg-white/10"
                        }`}
                      >
                        <span className="w-3 text-xs font-bold">{selectedBudget === "Fixed" ? "✓" : ""}</span>
                        <span>Fixed</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedBudget("Hourly")}
                        className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors text-xs ${
                          selectedBudget === "Hourly" ? "bg-[#0070F3] text-white font-medium shadow-xs" : "text-slate-200 hover:bg-white/10"
                        }`}
                      >
                        <span className="w-3 text-xs font-bold">{selectedBudget === "Hourly" ? "✓" : ""}</span>
                        <span>Hourly</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedBudget("Retainer")}
                        className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors text-xs ${
                          selectedBudget === "Retainer" ? "bg-[#0070F3] text-white font-medium" : "text-slate-200 hover:bg-white/10"
                        }`}
                      >
                        <span className="w-3 text-xs font-bold">{selectedBudget === "Retainer" ? "✓" : ""}</span>
                        <span>Retainer</span>
                      </button>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="flex flex-col">
                    <span className="text-[11px] font-normal text-slate-500 mb-1">Amount</span>
                    <div className="h-9 w-24 sm:w-36 px-3 bg-white border border-slate-200 rounded-lg text-xs font-normal text-slate-800 flex items-center shadow-2xs">
                      100
                    </div>
                  </div>

                  {/* Currency Input */}
                  <div className="flex flex-col">
                    <span className="text-[11px] font-normal text-slate-500 mb-1">Currency</span>
                    <div className="h-9 px-3 min-w-[76px] sm:min-w-[84px] bg-white border border-slate-200 rounded-lg text-xs font-normal text-slate-800 flex items-center justify-between gap-2 shadow-2xs">
                      <span>USD</span>
                      <ChevronDown size={14} className="text-slate-400 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SCREENSHOT 2: TASK PROGRESS Card */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-bold text-[11px] uppercase tracking-wider text-slate-500">TASK PROGRESS</span>
                <span className="text-slate-400 font-medium">10/11 tasks</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2.5">
                91%
              </div>
              {/* Progress Track */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#2563EB] h-2 rounded-full transition-all duration-700 ease-out"
                  style={{ width: "91%" }}
                />
              </div>
            </div>

            {/* 3 Metric Cards Grid (Hours Logged, Team, Files & Docs) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {/* Card 1: Hours Logged */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                    <Clock size={13} />
                  </div>
                  <span className="text-xs font-medium text-slate-600">Hours Logged</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  2.7h
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  of 35h budget
                </div>
              </div>

              {/* Card 2: Team */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                    <Users size={13} />
                  </div>
                  <span className="text-xs font-medium text-slate-600">Team</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  2
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  PM: Alex M.
                </div>
              </div>

              {/* Card 3: Files & Docs */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100">
                    <Paperclip size={13} />
                  </div>
                  <span className="text-xs font-medium text-slate-600">Files & Docs</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  0
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  0 files, 0 docs
                </div>
              </div>
            </div>

            {/* SCREENSHOT 2 (Bottom): AI Delivery Health & Velocity Diagnostic */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shrink-0">
                  <Sparkles size={14} className={isDiagnosticRunning ? "animate-spin" : ""} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-900">
                  AI Delivery Health & Velocity Diagnostic
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Velocity: Ahead / On Track
                </span>
              </div>

              <button
                type="button"
                onClick={handleRunDiagnostic}
                disabled={isDiagnosticRunning}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-semibold border border-slate-200 shadow-2xs transition-all active:scale-95 shrink-0"
              >
                <Sparkles size={12} className={isDiagnosticRunning ? "text-blue-600 animate-spin" : "text-slate-500"} />
                <span>{isDiagnosticRunning ? "Analyzing..." : diagnosticDone ? "Updated ✓" : "Run AI Diagnostic"}</span>
              </button>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 02: Milestone Management (Authentic Eidoncore Milestones Timeline & Cards)
    // Matches screenshot media_1791143193949.png 100%
    // =========================================================================
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* Wrapped in BlendMockupCard for smooth light theme edge blending */}
          <BlendMockupCard className="bg-white p-4 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5">
            {/* Top Milestones Header */}
            <div className="flex items-center justify-between gap-2 pb-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Milestones</h3>
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold flex items-center justify-center border border-slate-200/60">
                  3
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium ml-1">
                  <CheckCircle2 size={13} className="text-slate-400" />
                  0/3 Completed
                </span>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#2563EB] text-white rounded-lg text-xs font-semibold shadow-xs hover:bg-blue-700 transition-colors"
              >
                <Plus size={13} />
                <span>Add Milestone</span>
              </button>
            </div>

            {/* Horizontal Timeline Track Card */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs relative">
              <div className="relative flex items-center justify-between">
                {/* Horizontal Bar */}
                <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />

                {/* Step 1 Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-[#2563EB] text-[#2563EB] font-bold text-xs flex items-center justify-center shadow-xs">
                    1
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 mt-1.5 absolute -bottom-5 whitespace-nowrap">
                    Oct 10
                  </span>
                </div>

                {/* Step 2 Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-400 text-slate-600 font-medium text-xs flex items-center justify-center shadow-xs">
                    2
                  </div>
                </div>

                {/* Step 3 Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-400 text-slate-600 font-medium text-xs flex items-center justify-center shadow-xs">
                    3
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 mt-1.5 absolute -bottom-5 whitespace-nowrap">
                    Oct 30
                  </span>
                </div>
              </div>
              <div className="h-4" /> {/* Spacer for labels */}
            </div>

            {/* Milestones Vertical List with Connecting Left Line */}
            <div className="relative flex flex-col gap-3 pl-8 sm:pl-9">
              {/* Vertical Connecting Guide Line */}
              <div className="absolute left-3 sm:left-3.5 top-5 bottom-8 w-px bg-slate-200 -z-0" />

              {/* Milestone 1 Card */}
              <div className="relative">
                {/* Circle Badge on the vertical line */}
                <div className="absolute -left-8 sm:-left-9 top-4 w-6 h-6 rounded-full bg-white border-2 border-[#2563EB] text-[#2563EB] font-bold text-xs flex items-center justify-center shadow-xs z-10">
                  1
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs">
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">Core Architecture & UX</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Design tokens, user journey flows & initial client review</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 pt-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 shadow-2xs">
                      <span>In Progress</span>
                      <ChevronDown size={12} className="text-slate-400" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar size={13} className="text-slate-400" />
                      <span>Due: Oct 10</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <List size={13} className="text-slate-400" />
                      <span>4 tasks</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone 2 Card */}
              <div className="relative">
                {/* Circle Badge on the vertical line */}
                <div className="absolute -left-8 sm:-left-9 top-4 w-6 h-6 rounded-full bg-white border border-slate-400 text-slate-600 font-medium text-xs flex items-center justify-center shadow-xs z-10">
                  2
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs">
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">API Integration & Database</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Authentication endpoints, webhooks & storage pipeline</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 pt-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 shadow-2xs">
                      <span>Not Started</span>
                      <ChevronDown size={12} className="text-slate-400" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar size={13} className="text-slate-400" />
                      <span>Due: Oct 17</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <List size={13} className="text-slate-400" />
                      <span>6 tasks</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone 3 Card */}
              <div className="relative">
                {/* Circle Badge on the vertical line */}
                <div className="absolute -left-8 sm:-left-9 top-4 w-6 h-6 rounded-full bg-white border border-slate-400 text-slate-600 font-medium text-xs flex items-center justify-center shadow-xs z-10">
                  3
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs">
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">Production Handover & QA</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Staging tests, client sign-off & DNS launch checklist</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 pt-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 shadow-2xs">
                      <span>Not Started</span>
                      <ChevronDown size={12} className="text-slate-400" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar size={13} className="text-slate-400" />
                      <span>Due: Oct 30</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <List size={13} className="text-slate-400" />
                      <span>3 tasks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 03: Team Bandwidth & Billable Timers (Authentic Time Tracker & Table)
    // Matches screenshot media_1791143196054.png 100%
    // =========================================================================
    if (featureIndex === "03") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          {/* Wrapped in BlendMockupCard for smooth light theme edge blending */}
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5">
            {/* Top Bar: Time Tracker with Live Counter & Start/Stop Timer */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#2563EB] border border-blue-100">
                  <Timer size={16} />
                </div>
                <span className="text-sm font-bold text-slate-900 tracking-tight">Time Tracker</span>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="font-mono text-base sm:text-lg font-bold text-slate-600 tracking-wider">
                  {formatProjectTime(projectTimerSeconds)}
                </span>
                <button
                  type="button"
                  onClick={() => setProjectTimerRunning((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all shadow-xs active:scale-95 ${
                    projectTimerRunning ? "bg-amber-600 hover:bg-amber-700" : "bg-[#2563EB] hover:bg-blue-700"
                  }`}
                >
                  <Play size={11} className={projectTimerRunning ? "" : "fill-current"} />
                  <span>{projectTimerRunning ? "Stop Timer" : "Start Timer"}</span>
                </button>
              </div>
            </div>

            {/* 3 Metric Cards Grid (My Hours, Billable, Non-Billable) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {/* Card 1: My Hours */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-blue-500" />
                    <span className="text-xs font-medium text-slate-600">My Hours</span>
                  </div>
                  <Info size={12} className="text-slate-300" />
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  59.3h
                </div>
              </div>

              {/* Card 2: Billable */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[10px] font-bold">
                    $
                  </div>
                  <span className="text-xs font-medium text-slate-600">Billable</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  59.3h
                </div>
              </div>

              {/* Card 3: Non-Billable */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs">
                <div className="flex items-center gap-1.5 mb-2">
                  <Timer size={13} className="text-slate-400" />
                  <span className="text-xs font-medium text-slate-600">Non-Billable</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  0.0h
                </div>
              </div>
            </div>

            {/* Time Entries Table Section */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
              {/* Table Top Header */}
              <div className="p-3 sm:p-3.5 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Timer size={14} className="text-slate-500" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Time Entries</h4>
                  <Info size={12} className="text-slate-300 ml-0.5" />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#2563EB] text-white rounded-lg text-xs font-semibold shadow-xs hover:bg-blue-700 transition-colors"
                >
                  <Plus size={12} />
                  <span>Log Time</span>
                </button>
              </div>

              {/* Table Header Columns */}
              <div className="grid grid-cols-12 px-3 sm:px-3.5 py-2 bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <div className="col-span-4 sm:col-span-3">WHO</div>
                <div className="col-span-2 text-center sm:text-left">DURATION</div>
                <div className="hidden sm:block sm:col-span-4">TASK</div>
                <div className="col-span-3 sm:col-span-2 text-center">BILLABLE</div>
                <div className="col-span-3 sm:col-span-1 text-right">DATE</div>
              </div>

              {/* Rows matching Screenshot 2 (Dummy names & tasks) */}
              <div className="divide-y divide-slate-100 text-xs">
                {/* Row 1 */}
                <div className="grid grid-cols-12 px-3 sm:px-3.5 py-2.5 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="col-span-4 sm:col-span-3 flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] font-bold text-[9px] flex items-center justify-center shrink-0">
                      AM
                    </span>
                    <span className="font-medium text-slate-800 truncate">Alex Miller</span>
                  </div>
                  <div className="col-span-2 font-bold text-slate-900 text-center sm:text-left">
                    1h 30m
                  </div>
                  <div className="hidden sm:block sm:col-span-4 text-slate-600 truncate">
                    Google Search Console & SEO QA
                  </div>
                  <div className="col-span-3 sm:col-span-2 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      Yes
                    </span>
                  </div>
                  <div className="col-span-3 sm:col-span-1 text-right text-slate-400 text-[11px]">
                    Sep 2
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-12 px-3 sm:px-3.5 py-2.5 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="col-span-4 sm:col-span-3 flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] font-bold text-[9px] flex items-center justify-center shrink-0">
                      AM
                    </span>
                    <span className="font-medium text-slate-800 truncate">Alex Miller</span>
                  </div>
                  <div className="col-span-2 font-bold text-slate-900 text-center sm:text-left">
                    1h
                  </div>
                  <div className="hidden sm:block sm:col-span-4 text-slate-600 truncate">
                    Duplicate footer responsive module fix
                  </div>
                  <div className="col-span-3 sm:col-span-2 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      Yes
                    </span>
                  </div>
                  <div className="col-span-3 sm:col-span-1 text-right text-slate-400 text-[11px]">
                    Sep 30
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-12 px-3 sm:px-3.5 py-2.5 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="col-span-4 sm:col-span-3 flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                      ER
                    </span>
                    <span className="font-medium text-slate-800 truncate">Elena Reed</span>
                  </div>
                  <div className="col-span-2 font-bold text-slate-900 text-center sm:text-left">
                    1h 30m
                  </div>
                  <div className="hidden sm:block sm:col-span-4 text-slate-600 truncate">
                    Client authorization request header
                  </div>
                  <div className="col-span-3 sm:col-span-2 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      Yes
                    </span>
                  </div>
                  <div className="col-span-3 sm:col-span-1 text-right text-slate-400 text-[11px]">
                    Sep 16
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-12 px-3 sm:px-3.5 py-2.5 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="col-span-4 sm:col-span-3 flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                      SL
                    </span>
                    <span className="font-medium text-slate-800 truncate">Sarah Lin</span>
                  </div>
                  <div className="col-span-2 font-bold text-slate-900 text-center sm:text-left">
                    1h 20m
                  </div>
                  <div className="hidden sm:block sm:col-span-4 text-slate-600 truncate">
                    FAQ Accordion & search filter indexing
                  </div>
                  <div className="col-span-3 sm:col-span-2 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      Yes
                    </span>
                  </div>
                  <div className="col-span-3 sm:col-span-1 text-right text-slate-400 text-[11px]">
                    Aug 31
                  </div>
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
    // Matches screenshot media_1791139510552.png & media_1791139546429.png 100%
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
                {/* View switcher: List vs Board (Animated / Interactive) */}
                <div className="relative flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-xs">
                  <button
                    onClick={() => setActiveTaskView("list")}
                    className={`relative z-10 flex items-center gap-1 px-2.5 py-1 rounded-md transition-all duration-200 ${
                      activeTaskView === "list"
                        ? "bg-white shadow-2xs text-[#0F172A] font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <List size={12} className={activeTaskView === "list" ? "text-[#3F72AF]" : ""} />
                    <span className="hidden sm:inline">List</span>
                  </button>
                  <button
                    onClick={() => setActiveTaskView("board")}
                    className={`relative z-10 flex items-center gap-1 px-2.5 py-1 rounded-md transition-all duration-200 ${
                      activeTaskView === "board"
                        ? "bg-white shadow-2xs text-[#0F172A] font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Kanban size={12} className={activeTaskView === "board" ? "text-[#3F72AF]" : ""} />
                    <span className="hidden sm:inline">Board</span>
                  </button>

                  {/* Realistic Animated Floating Click Cursor */}
                  {cursorTarget && (
                    <div
                      className={`pointer-events-none absolute z-30 transition-all duration-300 ease-out flex items-center ${
                        cursorTarget === "list"
                          ? "left-3 top-2.5"
                          : "left-[58px] sm:left-[62px] top-2.5"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 text-slate-900 drop-shadow-md transition-transform duration-150 ${
                          isClicking ? "scale-75 translate-y-0.5" : "scale-100"
                        }`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
                      </svg>
                      {isClicking && (
                        <span className="absolute -inset-1 rounded-full bg-blue-500/30 animate-ping" />
                      )}
                    </div>
                  )}
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

            {/* TOGGLE VIEW: BOARD vs LIST with Same Height & Smooth Transition Animation */}
            <div className="relative min-h-[460px] sm:min-h-[440px] mb-2.5 overflow-hidden">
              {/* BOARD / KANBAN VIEW (100% Matching media_1791139510552.png) */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all duration-500 ease-in-out ${
                  activeTaskView === "board"
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-[0.98] pointer-events-none absolute inset-0"
                }`}
              >
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

                  {/* CARD 1: Refactor Auth Middleware */}
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

                  {/* CARD 2: API Endpoint Rate Limiting */}
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

                  {/* DONE CARD 1: Design System Tokens Audit */}
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

                  {/* DONE CARD 2: Database Index Optimization */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 flex flex-col gap-2.5 opacity-90">
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
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Core Platform</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* LIST VIEW (100% Matching media_1791139546429.png) */}
              <div
                className={`space-y-3 transition-all duration-500 ease-in-out ${
                  activeTaskView === "list"
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-[0.98] pointer-events-none absolute inset-0"
                }`}
              >
                {/* TO DO SECTION */}
                <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-2xs">
                  {/* Section Bar */}
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#F8FAFC] border-b border-slate-200/80">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
                      <span className="w-2 h-2 rounded-full border-2 border-slate-400" />
                      <span className="text-[11px]">TO DO</span>
                      <span className="font-mono text-[11px] text-slate-400">2</span>
                    </div>
                    <button className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-2 px-3.5 py-1.5 bg-[#F1F5F9]/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <div className="col-span-5">Task</div>
                    <div className="col-span-2">Priority</div>
                    <div className="col-span-2 hidden sm:block">Assignee</div>
                    <div className="col-span-3 text-right sm:text-left">Project</div>
                  </div>

                  {/* List Row 1 */}
                  <div className="grid grid-cols-12 gap-2 px-3.5 py-2.5 items-center border-b border-slate-100 hover:bg-slate-50/70 transition-colors text-xs">
                    <div className="col-span-5 flex items-center gap-2 min-w-0">
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                      <span className="font-semibold text-slate-900 truncate">
                        API Endpoint Rate Limiting
                      </span>
                      <Paperclip size={11} className="text-slate-400 shrink-0 hidden sm:inline" />
                    </div>
                    <div className="col-span-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626]">
                        <Flag size={10} strokeWidth={2.5} /> Urgent
                      </span>
                    </div>
                    <div className="col-span-2 hidden sm:flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                        SJ
                      </div>
                      <span className="text-slate-700 truncate text-[11px]">Sarah J.</span>
                    </div>
                    <div className="col-span-3 text-right sm:text-left flex items-center gap-1 text-[11px] text-slate-600 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="truncate">Core Platform</span>
                    </div>
                  </div>

                  {/* List Row 2 */}
                  <div className="grid grid-cols-12 gap-2 px-3.5 py-2.5 items-center hover:bg-slate-50/70 transition-colors text-xs">
                    <div className="col-span-5 flex items-center gap-2 min-w-0">
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                      <span className="font-semibold text-slate-900 truncate">
                        Refactor Auth Middleware
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">1/2</span>
                    </div>
                    <div className="col-span-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#D97706]">
                        <Flag size={10} strokeWidth={2.2} /> Medium
                      </span>
                    </div>
                    <div className="col-span-2 hidden sm:flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                        AM
                      </div>
                      <span className="text-slate-700 truncate text-[11px]">Alex M.</span>
                    </div>
                    <div className="col-span-3 text-right sm:text-left flex items-center gap-1 text-[11px] text-slate-600 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="truncate">Auth Flow</span>
                    </div>
                  </div>
                </div>

                {/* DONE SECTION */}
                <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-2xs">
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#F8FAFC] border-b border-slate-200/80">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
                      <CheckCircle2 size={12} className="text-emerald-600 fill-emerald-100" />
                      <span className="text-[11px]">DONE</span>
                      <span className="font-mono text-[11px] text-slate-400">101</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 px-3.5 py-2.5 items-center text-xs opacity-80">
                    <div className="col-span-5 flex items-center gap-2 min-w-0">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Check size={9} strokeWidth={3} />
                      </div>
                      <span className="font-medium text-slate-500 line-through truncate">
                        Design System Tokens Audit
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#D97706]">
                        <Flag size={10} strokeWidth={2.2} /> Medium
                      </span>
                    </div>
                    <div className="col-span-2 hidden sm:flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                        AM
                      </div>
                      <span className="text-slate-500 truncate text-[11px]">Alex M.</span>
                    </div>
                    <div className="col-span-3 text-right sm:text-left flex items-center gap-1 text-[11px] text-slate-500 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                      <span className="truncate">Design System</span>
                    </div>
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
                      : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  {isTimerRunning ? (
                    <span className="flex items-center gap-0.5">
                      <span className="w-1 h-3 bg-current inline-block rounded-xs" />
                      <span className="w-1 h-3 bg-current inline-block rounded-xs" />
                    </span>
                  ) : (
                    <Play size={13} className="fill-current" />
                  )}
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
