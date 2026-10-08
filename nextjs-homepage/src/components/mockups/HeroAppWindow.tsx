"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FolderKanban,
  CheckSquare,
  MessageSquare,
  Ticket,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Send,
  Building2,
  Users,
  FileText,
  DollarSign,
  Settings,
  ChevronDown,
  RotateCw,
  Lock,
  Maximize2,
  X,
  History,
  CheckCircle2,
  HelpCircle,
  Flag,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Moon,
  Zap,
  Tag,
  Paperclip,
  Check,
  LayoutDashboard,
  Boxes,
  Receipt,
  Wallet,
  BarChart3,
  Inbox,
  Bug,
  Bell,
  SlidersHorizontal,
  ChevronLeft,
  Columns3,
  List,
  Kanban,
  LayoutGrid,
  Table,
  AlertTriangle,
  Activity,
  Plus,
  RefreshCw,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react";

export default function HeroAppWindow() {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "projects" | "tasks" | "tickets" | "messages"
  >("dashboard");
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isDateFiltered, setIsDateFiltered] = useState(false);
  const [copilotQuery, setCopilotQuery] = useState("");
  const [copilotSubmitted, setCopilotSubmitted] = useState(false);
  const [taskViewMode, setTaskViewMode] = useState<"list" | "board">("list");
  const [projectViewMode, setProjectViewMode] = useState<"cards" | "table">("cards");
  const [selectedDay, setSelectedDay] = useState(4);
  const [activeWorkTab, setActiveWorkTab] = useState<"all" | "today" | "overdue" | "review">("all");
  const [activeTaskTab, setActiveTaskTab] = useState<"all" | "overdue" | "today" | "week">("all");
  const [activeProjectTab, setActiveProjectTab] = useState<"all" | "active" | "attention" | "delivered">("all");

  const [cursorPos, setCursorPos] = useState({ x: 260, y: 180, visible: true });
  const [cursorClicked, setCursorClicked] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isCancelledRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Refs for virtual tour navigation
  const navProjectsRef = useRef<HTMLButtonElement>(null);
  const navTasksRef = useRef<HTMLButtonElement>(null);
  const navTicketsRef = useRef<HTMLButtonElement>(null);
  const navDashboardRef = useRef<HTMLButtonElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const copilotToggleRef = useRef<HTMLButtonElement>(null);
  const copilotChipRef = useRef<HTMLButtonElement>(null);
  const copilotSendRef = useRef<HTMLButtonElement>(null);
  const copilotCloseRef = useRef<HTMLButtonElement>(null);
  const taskRowRef = useRef<HTMLTableRowElement>(null);
  const filterDateBtnRef = useRef<HTMLButtonElement>(null);
  const clearFilterBtnRef = useRef<HTMLButtonElement>(null);
  const taskBoardToggleRef = useRef<HTMLButtonElement>(null);
  const taskCardRef = useRef<HTMLDivElement>(null);
  const projectCardRef = useRef<HTMLDivElement>(null);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        if (!isCancelledRef.current) resolve();
      }, ms);
      timeoutsRef.current.push(timer);
    });

  const moveTo = async (
    targetRef: React.RefObject<HTMLElement | null>,
    offsetXRatio = 0.5,
    offsetYRatio = 0.5
  ) => {
    if (isCancelledRef.current || !targetRef.current || !containerRef.current) return;

    await sleep(60);
    if (isCancelledRef.current || !targetRef.current || !containerRef.current) return;

    const cRect = containerRef.current.getBoundingClientRect();
    const tRect = targetRef.current.getBoundingClientRect();

    const x = tRect.left - cRect.left + tRect.width * offsetXRatio - 2;
    const y = tRect.top - cRect.top + tRect.height * offsetYRatio - 2;

    setCursorPos({ x, y, visible: true });
    await sleep(900);
  };

  const click = async () => {
    if (isCancelledRef.current) return;
    setCursorClicked(true);
    await sleep(180);
    setCursorClicked(false);
    await sleep(120);
  };

  const startTour = async () => {
    isCancelledRef.current = false;
    clearTimeouts();
    setCopilotOpen(false);
    setCommandPaletteOpen(false);
    setIsDateFiltered(false);
    setCopilotSubmitted(false);
    setCopilotQuery("");
    setTaskViewMode("list");
    setCurrentView("dashboard");

    setCursorPos({ x: 340, y: 160, visible: true });
    // Initial pause on Dashboard before first click
    await sleep(4000);

    while (!isCancelledRef.current) {
      // Step 1: In Dashboard -> Move cursor to Search bar (Command Palette)
      await moveTo(searchBarRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCommandPaletteOpen(true);
      await sleep(3500);

      // Close Command Palette
      setCommandPaletteOpen(false);
      await sleep(800);

      // Step 2: In Dashboard -> Move cursor to AI Copilot button in top bar
      await moveTo(copilotToggleRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotOpen(true);
      await sleep(4000);

      // Step 3: Hover over suggested prompt chip inside the Copilot popup
      await moveTo(copilotChipRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotQuery("Find blockers, unfinished checklist items and the next tasks to prioritize.");
      await sleep(3500);

      // Step 4: Click Copilot send button
      await moveTo(copilotSendRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotSubmitted(true);
      await sleep(4500);

      // Step 5: Close Copilot popup via 'X' close button
      await moveTo(copilotCloseRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotOpen(false);
      await sleep(3000);

      // Step 6: Pause and admire Mission Control Dashboard
      await sleep(4000);

      // Step 9: Move to sidebar "Projects" and click
      await moveTo(navProjectsRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("projects");
      await sleep(4500);

      // Step 10: Hover an active project card
      await moveTo(projectCardRef, 0.5, 0.4);
      if (isCancelledRef.current) break;
      await sleep(3500);

      // Step 11: Move to sidebar "Tasks" and click
      await moveTo(navTasksRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("tasks");
      setTaskViewMode("list");
      await sleep(4000);

      // Step 12: In Tasks -> Click the "Board" view toggle
      await moveTo(taskBoardToggleRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setTaskViewMode("board");
      await sleep(4000);

      // Step 13: In Board -> Hover active task card
      await moveTo(taskCardRef, 0.5, 0.4);
      if (isCancelledRef.current) break;
      await sleep(3500);

      // Step 14: Switch back to Dashboard to loop
      await moveTo(navDashboardRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("dashboard");
      setCopilotSubmitted(false);
      setCopilotQuery("");
      await sleep(4500);
    }
  };

  useEffect(() => {
    if (copilotOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [copilotOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      startTour();
    }, 800);

    return () => {
      isCancelledRef.current = true;
      clearTimeout(timer);
      clearTimeouts();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-xl overflow-hidden font-sans select-none text-[#0F172A]"
      style={{ minHeight: "780px" }}
    >
      {/* 1. TOP BROWSER / OS CHROME BAR */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-[#E2E8F0] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]/80 border border-[#DC2626]/40" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80 border border-[#D97706]/40" />
          <div className="w-3 h-3 rounded-full bg-[#10B981]/80 border border-[#059669]/40" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-sm sm:max-w-md mx-4">
          <div className="flex items-center justify-center gap-2 px-3 py-1 bg-[#F1F5F9] rounded-lg text-xs text-[#64748B] border border-[#E2E8F0]">
            <Lock size={11} className="text-emerald-500 shrink-0" />
            <span className="text-[#0F172A] font-medium shrink-0">app.eidoncore.com</span>
            <span className="text-[#2563EB] shrink-0">/{currentView}</span>
            <button
              onClick={() => {
                isCancelledRef.current = true;
                setTimeout(startTour, 100);
              }}
              title="Restart automated tour"
              className="text-[#94A3B8] hover:text-[#0F172A] transition-colors ml-2 shrink-0"
            >
              <RotateCw size={11} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 hidden sm:inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE WORKSPACE
          </span>
        </div>
      </div>

      {/* Mobile Horizontal Navigation Tabs */}
      <div className="shrink-0 md:hidden flex items-center gap-1 overflow-x-auto no-scrollbar p-2 bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-medium">
        <button
          onClick={() => setCurrentView("dashboard")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "dashboard" ? "bg-[#0F172A] text-white" : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setCurrentView("projects")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "projects" ? "bg-[#0F172A] text-white" : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setCurrentView("tasks")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "tasks" ? "bg-[#0F172A] text-white" : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          Tasks
        </button>
        <button
          onClick={() => setCurrentView("tickets")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "tickets" ? "bg-[#0F172A] text-white" : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          Tickets
        </button>
        <button
          onClick={() => setCurrentView("messages")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "messages" ? "bg-[#0F172A] text-white" : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          Messages
        </button>
      </div>

      {/* 2. MAIN APPLICATION WORKSPACE (Sidebar + Content View) */}
      <div className="flex h-[740px] relative overflow-hidden bg-[#F8FAFC]">
        
        {/* LEFT AUTHENTIC SIDEBAR (Matching screenshots 01, 03, 11, 19, 27) */}
        <aside className="w-[200px] shrink-0 border-r border-[#E2E8F0] bg-white p-3 hidden md:flex flex-col justify-between select-none">
          <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
            
            {/* Workspace Selector (Screenshot 01) */}
            <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded-md bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12c3-4 6-4 9 0s6 4 9 0" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-xs font-bold text-[#0F172A] truncate">Aetheris Creative St...</span>
                </div>
              </div>
              <ChevronLeft size={13} className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer shrink-0" />
            </div>

            {/* NAVIGATION GROUP */}
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold px-2">
                NAVIGATION
              </span>

              <nav className="flex flex-col gap-0.5">
                <button
                  ref={navDashboardRef}
                  onClick={() => setCurrentView("dashboard")}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    currentView === "dashboard"
                      ? "bg-[#F1F5F9] text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <LayoutDashboard size={14} className={currentView === "dashboard" ? "text-[#0F172A]" : "text-[#64748B]"} />
                  <span>Dashboard</span>
                </button>

                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <Building2 size={14} className="text-[#64748B]" />
                  <span>Organizations</span>
                </div>

                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <FileText size={14} className="text-[#64748B]" />
                  <span>Proposals</span>
                </div>

                <button
                  ref={navProjectsRef}
                  onClick={() => setCurrentView("projects")}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    currentView === "projects"
                      ? "bg-[#F1F5F9] text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FolderKanban size={14} className={currentView === "projects" ? "text-[#0F172A]" : "text-[#64748B]"} />
                    <span>Projects</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] bg-slate-100 px-1 rounded">21</span>
                </button>

                <button
                  ref={navTasksRef}
                  onClick={() => setCurrentView("tasks")}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    currentView === "tasks"
                      ? "bg-[#F1F5F9] text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckSquare size={14} className={currentView === "tasks" ? "text-[#0F172A]" : "text-[#64748B]"} />
                    <span>Tasks</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] bg-slate-100 px-1 rounded">2</span>
                </button>

                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <Boxes size={14} className="text-[#64748B]" />
                    <span>Offerings</span>
                  </div>
                  <ChevronRight size={11} className="text-[#94A3B8]" />
                </div>

                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <Users size={14} className="text-[#64748B]" />
                  <span>Team</span>
                </div>

                <button
                  onClick={() => setCurrentView("messages")}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    currentView === "messages"
                      ? "bg-[#F1F5F9] text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <MessageSquare size={14} className={currentView === "messages" ? "text-[#0F172A]" : "text-[#64748B]"} />
                  <span>Messages</span>
                </button>

                <button
                  ref={navTicketsRef}
                  onClick={() => setCurrentView("tickets")}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    currentView === "tickets"
                      ? "bg-[#F1F5F9] text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <Ticket size={14} className={currentView === "tickets" ? "text-[#0F172A]" : "text-[#64748B]"} />
                  <span>Tickets</span>
                </button>
              </nav>
            </div>

            {/* FINANCE GROUP */}
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold px-2">
                FINANCE
              </span>
              <nav className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <Receipt size={14} className="text-[#64748B]" />
                  <span>Invoices</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <Wallet size={14} className="text-[#64748B]" />
                  <span>Expenses</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <BarChart3 size={14} className="text-[#64748B]" />
                  <span>Reports</span>
                </div>
              </nav>
            </div>

            {/* TOOLS GROUP */}
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold px-2">
                TOOLS
              </span>
              <nav className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <Inbox size={14} className="text-[#64748B]" />
                  <span>Capture inbox</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <FileText size={14} className="text-[#64748B]" />
                  <span>Intake Forms</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <Bug size={14} className="text-[#64748B]" />
                  <span>Bug Reports</span>
                </div>
              </nav>
            </div>

          </div>

          {/* Bottom user badge (Screenshot 01) */}
          <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-400 text-white flex items-center justify-center font-bold text-[10px] shrink-0 border border-slate-200 shadow-2xs">
                JV
              </div>
              <div className="leading-tight">
                <span className="font-semibold block text-[#0F172A]">Julian Vance</span>
                <span className="text-[9.5px] text-[#64748B]">Executive</span>
              </div>
            </div>
            <Settings size={13} className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer" />
          </div>
        </aside>

        {/* MAIN CONTENT PANE (Scrollable) */}
        <main
          className={`flex-1 min-w-0 flex flex-col bg-[#F8FAFC] no-scrollbar relative ${
            copilotOpen ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          
          {/* TOP APP HEADER (Matching screenshots 01, 03, 11, 19, 27) */}
          <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#F8FAFC]/95 backdrop-blur-sm border-b border-[#E2E8F0]">
            
            {/* View Title */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                {currentView === "dashboard" && <LayoutDashboard size={13} />}
                {currentView === "projects" && <FolderKanban size={13} />}
                {currentView === "tasks" && <CheckSquare size={13} />}
                {currentView === "tickets" && <Ticket size={13} />}
                {currentView === "messages" && <MessageSquare size={13} />}
              </div>
              <h2 className="text-sm font-bold text-[#0F172A] tracking-tight capitalize">
                {currentView === "dashboard" ? "Dashboard" : currentView}
              </h2>
            </div>

            {/* Center Search Bar */}
            <div
              ref={searchBarRef}
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1 bg-white border border-[#E2E8F0] rounded-lg text-[#64748B] text-xs flex-1 max-w-[320px] shadow-2xs mx-2 cursor-pointer hover:border-slate-300 transition-colors"
            >
              <Search size={12} className="text-[#94A3B8]" />
              <span className="text-[11px] text-[#94A3B8] flex-1 truncate">Search or jump to...</span>
              <kbd className="text-[9px] bg-slate-100 border border-slate-200 px-1 rounded text-[#64748B] font-mono">
                ⌘K
              </kbd>
            </div>

            {/* Right Quick Actions (Matching Screenshot 1) */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Get started progress capsule */}
              <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-full text-xs font-medium text-[#0F172A] shadow-2xs">
                <div className="w-4 h-4 rounded-full border-2 border-emerald-500 flex items-center justify-center shrink-0">
                  <Check size={9} className="text-emerald-600 stroke-[3]" />
                </div>
                <span className="text-[11.5px] font-semibold text-[#0F172A]">Get started</span>
                <span className="text-[10.5px] font-mono text-[#64748B]">11/17</span>
              </div>

              {/* AI Copilot Button */}
              <button
                ref={copilotToggleRef}
                onClick={() => setCopilotOpen(!copilotOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border shadow-2xs ${
                  copilotOpen
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE] hover:bg-blue-100/70"
                }`}
              >
                <Sparkles size={12} className={copilotOpen ? "text-amber-400" : "text-[#2563EB]"} />
                <span className="hidden sm:inline">AI Copilot</span>
                <kbd className={`text-[9px] px-1 rounded font-mono ${
                  copilotOpen ? "bg-white/20 text-white" : "bg-white text-[#2563EB] border border-blue-200"
                }`}>
                  ⌘J
                </kbd>
              </button>

              <div className="p-1 text-[#64748B] hover:text-[#0F172A] cursor-pointer">
                <Settings size={14} />
              </div>

              <div className="relative p-1 text-[#64748B] hover:text-[#0F172A] cursor-pointer">
                <Bell size={14} />
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-blue-600 text-white rounded-full text-[8.5px] flex items-center justify-center font-bold">
                  1
                </span>
              </div>

              <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-400 text-white flex items-center justify-center font-bold text-[9px] shrink-0 border border-slate-200">
                  JV
                </div>
                <span className="text-xs font-semibold text-[#0F172A] hidden sm:inline">Julian Vance</span>
                <ChevronDown size={11} className="text-[#94A3B8]" />
              </div>
            </div>
          </header>

          {/* VIEW 1: MISSION CONTROL EXECUTIVE DASHBOARD */}
          {currentView === "dashboard" && (
            <div className="p-4 sm:p-5 flex flex-col gap-6 animate-fadeIn pb-12">
              
              {/* ========================================================= */}
              {/* 1. MISSION CONTROL: EXECUTIVE WORKSPACE COCKPIT (ORIGINAL DASHBOARD) */}
              {/* ========================================================= */}
              <div className="bg-[#0E1118] border border-[#232733] rounded-[22px] p-5 text-white shadow-2xl relative overflow-hidden select-none">
                {/* Row 1: Header Breadcrumb & Status Pill */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  {/* Left: Executive Workspace Path */}
                  <div className="flex items-center gap-2 text-[10.5px] font-mono tracking-wider">
                    <Activity size={13} className="text-[#38BDF8] shrink-0" strokeWidth={2.5} />
                    <span className="text-[#38BDF8] font-bold uppercase">EXECUTIVE WORKSPACE</span>
                    <span className="text-[#64748B] font-semibold">/</span>
                    <span className="text-[#94A3B8] font-medium uppercase">AETHERIS CREATIVE STUDIO</span>
                  </div>

                  {/* Right: Consolidated Alert Pill */}
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B1419] border border-[#482028] text-[10px] font-mono shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                    <span className="text-[#F87171] font-bold">1 CRITICAL</span>
                    <span className="text-[#64748B]">·</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                    <span className="text-[#FBBF24] font-bold">1 CAUTION</span>
                    <span className="text-[#94A3B8] text-[9.5px] ml-1 font-normal">as of 12:49 AM</span>
                    <span className="text-[#64748B]">·</span>
                    <span className="text-[#94A3B8] text-[9.5px] font-normal">changed 12:48 AM</span>
                  </div>
                </div>

                {/* Row 2: Secondary Controls (Live & Motion on) */}
                <div className="flex items-center gap-2 pt-3">
                  {/* Live Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1F18] border border-[#143B2C] text-[10px] text-[#34D399] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="font-semibold">Live</span>
                  </div>

                  {/* Motion on Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121B2A] border border-[#1E2E44] text-[10px] text-slate-300 font-mono">
                    <span className="flex items-end gap-[2px] h-2.5 mr-0.5">
                      <span className="w-[2px] h-2.5 bg-slate-300 rounded-2xs" />
                      <span className="w-[2px] h-1.5 bg-slate-400 rounded-2xs" />
                      <span className="w-[2px] h-2 bg-slate-300 rounded-2xs" />
                    </span>
                    <span>Motion on</span>
                  </div>
                </div>

                {/* Row 3: Cockpit Heading & Clocks */}
                <div className="pt-3 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white leading-tight">
                      Mission Control
                    </h3>
                    <p className="mt-1 text-[11px] text-[#94A3B8] max-w-xl leading-normal">
                      <strong className="text-white font-semibold">Good Morning, Julian.</strong> Revenue, delivery and priorities at a glance.
                    </p>
                  </div>

                  {/* Right Clocks & Window Progress */}
                  <div className="flex items-center gap-5 sm:gap-6 font-mono text-slate-400 text-xs shrink-0 pt-1 lg:pt-0">
                    {/* Local Clock */}
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-wider text-[#64748B]">LOCAL · GMT+6</span>
                      <span className="text-[19px] sm:text-[20px] font-bold text-white tracking-wide mt-0.5">00:49:52</span>
                    </div>

                    {/* UTC Clock */}
                    <div className="flex flex-col border-l border-[#282C35] pl-5 sm:pl-6">
                      <span className="text-[8px] uppercase tracking-wider text-[#64748B]">UTC</span>
                      <span className="text-[19px] sm:text-[20px] font-bold text-slate-200 tracking-wide mt-0.5">18:49:52</span>
                    </div>

                    {/* Window UTC Progress */}
                    <div className="flex flex-col border-l border-[#282C35] pl-5 sm:pl-6">
                      <div className="flex items-center justify-between gap-3 text-[8px] uppercase tracking-wider">
                        <span className="text-[#64748B]">WINDOW · UTC</span>
                        <span className="text-[#94A3B8] font-semibold">Day 8 of 31</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <span className="text-[12px] font-bold text-white">This Month</span>
                        <span className="text-[9.5px] text-[#64748B]">Oct 1 – 31, 2026</span>
                      </div>
                      {/* Segment progress bar: exactly 31 day segments */}
                      <div className="flex gap-[2px] mt-1.5">
                        {[...Array(31)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-[4px] w-[4px] rounded-[1px] ${
                              i < 7
                                ? "bg-[#34363C]"
                                : i === 7
                                ? "bg-[#818CF8]"
                                : "bg-[#1A1D24]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 4: Unified 5-Column Dashboard Table (12-Column Grid) */}
                <div className="rounded-xl border border-[#2B313A] overflow-hidden grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#282C32] text-xs">
                  
                  {/* Column 1: FINANCE (span 3) */}
                  <div className="md:col-span-3 bg-[#311B21] flex flex-col justify-between relative">
                    {/* Top colored stripe */}
                    <div className="h-[2px] w-full bg-[#EF4444]" />
                    <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Dot + Title */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                          FINANCE
                        </div>
                        {/* Stacked status text */}
                        <div className="text-[9px] font-mono font-bold text-[#F87171] uppercase tracking-wider mt-0.5">
                          CRITICAL
                        </div>

                        {/* Dual Stats */}
                        <div className="flex items-baseline justify-between mt-3 gap-1">
                          <div>
                            <div className="text-[22px] sm:text-[24px] font-black text-white leading-none font-sans">$40,900</div>
                            <div className="text-[9px] text-[#34D399] font-semibold font-mono mt-1">↑ 529%</div>
                            <div className="text-[9px] text-[#94A3B8] mt-0.5">Revenue this period</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-[20px] sm:text-[22px] font-black text-white leading-none font-sans">$4,800</div>
                            <div className="text-[9px] text-[#94A3B8] mt-2">Overdue</div>
                          </div>
                        </div>

                        {/* Sparkline */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-[8.5px] text-[#94A3B8] font-mono mb-1">
                            <span>Revenue trend</span>
                            <span>6 months</span>
                          </div>
                          <svg className="w-full h-4 overflow-visible" viewBox="0 0 100 16" preserveAspectRatio="none">
                            <path
                              d="M 0,13 Q 45,13 75,11 T 96,4"
                              fill="none"
                              stroke="#64748B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <circle cx="96" cy="4" r="2.5" fill="#38BDF8" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Alert Cell */}
                    <div className="border-t border-[#282C32] px-3.5 py-2.5 text-[9.5px] font-medium text-[#F87171] flex items-center gap-1.5">
                      <AlertTriangle size={11} className="shrink-0 text-[#F87171]" />
                      <span className="truncate">1 Overdue Invoice</span>
                    </div>
                  </div>

                  {/* Column 2: DELIVERY (span 3) */}
                  <div className="md:col-span-3 bg-[#28231D] flex flex-col justify-between relative">
                    {/* Top colored stripe */}
                    <div className="h-[2px] w-full bg-[#F59E0B]" />
                    <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Dot + Title */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                          DELIVERY
                        </div>
                        {/* Stacked status text */}
                        <div className="text-[9px] font-mono font-bold text-[#FBBF24] uppercase tracking-wider mt-0.5">
                          CAUTION
                        </div>

                        {/* Dual Stats */}
                        <div className="flex items-baseline justify-between mt-3 gap-1">
                          <div>
                            <div className="text-[22px] sm:text-[24px] font-black text-white leading-none font-sans">3</div>
                            <div className="text-[9px] text-[#94A3B8] mt-1.5">Active projects</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-[22px] sm:text-[24px] font-black text-white leading-none font-sans">5</div>
                            <div className="text-[9px] text-[#94A3B8] mt-1.5">Tasks due this week</div>
                          </div>
                        </div>

                        {/* Completed 14 days histogram */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-[8.5px] text-[#94A3B8] font-mono mb-1">
                            <span>Completed</span>
                            <span>14 days</span>
                          </div>
                          <div className="flex items-end h-5 gap-[2px]">
                            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0].map((val, idx) => (
                              <div
                                key={idx}
                                className={`flex-1 rounded-[1.5px] ${
                                  val > 0 ? "bg-[#64748B]" : "bg-[#1E232B]"
                                }`}
                                style={{ height: val > 0 ? "18px" : "2px" }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Alert Cell */}
                    <div className="border-t border-[#282C32] px-3.5 py-2.5 text-[9.5px] font-medium text-[#FBBF24] flex items-center gap-1.5">
                      <HelpCircle size={11} className="shrink-0 text-[#FBBF24]" />
                      <span className="truncate">8 Tasks Due Within 72h</span>
                    </div>
                  </div>

                  {/* Column 3: CLIENTS (span 2) */}
                  <div className="md:col-span-2 bg-[#181A1F] flex flex-col justify-between">
                    <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Dot + Title */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          CLIENTS
                        </div>
                        {/* Stacked status text */}
                        <div className="text-[9px] font-mono font-bold text-[#34D399] uppercase tracking-wider mt-0.5">
                          NOMINAL
                        </div>

                        {/* Single Stat */}
                        <div className="mt-3">
                          <div className="text-[22px] sm:text-[24px] font-black text-white leading-none font-sans">4</div>
                          <div className="text-[9px] text-[#94A3B8] mt-1.5">Active organizations</div>
                        </div>

                        {/* CRM stages bar */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-[8.5px] text-[#94A3B8] font-mono mb-1.5">
                            <span>CRM stages</span>
                            <span className="text-slate-300">Lead → Active</span>
                          </div>
                          <div className="w-full bg-[#3B82F6] h-[3px] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status Cell */}
                    <div className="border-t border-[#282C32] px-3.5 py-2.5 text-[9.5px] text-[#94A3B8] truncate">
                      No open proposals
                    </div>
                  </div>

                  {/* Column 4: SUPPORT (span 2) */}
                  <div className="md:col-span-2 bg-[#181A1F] flex flex-col justify-between">
                    <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Dot + Title */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          SUPPORT
                        </div>
                        {/* Stacked status text */}
                        <div className="text-[9px] font-mono font-bold text-[#34D399] uppercase tracking-wider mt-0.5">
                          NOMINAL
                        </div>

                        {/* Single Stat */}
                        <div className="mt-3">
                          <div className="text-[22px] sm:text-[24px] font-black text-white leading-none font-sans">2</div>
                          <div className="text-[9px] text-[#94A3B8] mt-1.5">Open tickets</div>
                        </div>

                        {/* Opened & Resolved 14 days */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-[8.5px] text-[#94A3B8] font-mono mb-1">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-[#475569] rounded-2xs inline-block" /> Opened
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-2xs inline-block" /> Resolved
                            </span>
                          </div>
                          <div className="text-[8px] text-[#64748B] font-mono mb-1">14 days</div>
                          <div className="flex items-end h-3 gap-2">
                            <div className="w-2 bg-[#475569] h-2.5 rounded-2xs" />
                            <div className="w-2 bg-[#94A3B8] h-2.5 rounded-2xs" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status Cell */}
                    <div className="border-t border-[#282C32] px-3.5 py-2.5 text-[9.5px] text-[#94A3B8] truncate">
                      No SLA breaches today
                    </div>
                  </div>

                  {/* Column 5: AUTOMATION (span 2) */}
                  <div className="md:col-span-2 bg-[#181A1F] flex flex-col justify-between">
                    <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Dot + Title */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          AUTOMATION
                        </div>
                        {/* Stacked status text */}
                        <div className="text-[9px] font-mono font-bold text-[#34D399] uppercase tracking-wider mt-0.5">
                          NOMINAL
                        </div>

                        {/* Single Stat */}
                        <div className="mt-3">
                          <div className="text-[22px] sm:text-[24px] font-black text-white leading-none font-sans">0</div>
                          <div className="text-[9px] text-[#94A3B8] mt-1.5">Failing automations</div>
                        </div>

                        {/* Spacer to match height */}
                        <div className="mt-4 pt-5" />
                      </div>
                    </div>

                    {/* Bottom Status Cell */}
                    <div className="border-t border-[#282C32] px-3.5 py-2.5 text-[9.5px] text-[#94A3B8] truncate font-mono">
                      Latest runs · last 7 days
                    </div>
                  </div>

                </div>
              </div>

              {/* ========================================================= */}
              {/* TIME WINDOW FILTER BAR (SCREENSHOT media_1791487671015.png) */}
              {/* ========================================================= */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                {/* Left Tabs */}
                <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl border border-slate-200/70">
                  <button className="px-3.5 py-1 bg-white font-bold text-[#0F172A] rounded-lg shadow-2xs border border-slate-200/40 text-xs">
                    Overview
                  </button>
                  <button className="px-3 py-1 text-[#64748B] hover:text-[#0F172A] font-medium rounded-lg transition-colors text-xs">
                    Delivery
                  </button>
                  <button className="px-3 py-1 text-[#64748B] hover:text-[#0F172A] font-medium rounded-lg transition-colors text-xs">
                    Activity
                  </button>
                </div>

                {/* Right Time Window Selector */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                  <button className="px-3 py-1 bg-white border border-[#E2E8F0] font-bold text-[#0F172A] rounded-lg shadow-2xs whitespace-nowrap text-xs">
                    This Month
                  </button>
                  <button className="px-2.5 py-1 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap text-xs font-medium">
                    Last Month
                  </button>
                  <button className="px-2.5 py-1 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap text-xs font-medium">
                    Last 30 Days
                  </button>
                  <button className="px-2.5 py-1 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap text-xs font-medium">
                    This Quarter
                  </button>
                  <button className="px-2.5 py-1 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap text-xs font-medium">
                    This Year
                  </button>
                  <button className="px-2.5 py-1 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap text-xs font-medium">
                    Lifetime
                  </button>
                  <button className="px-2.5 py-1 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap text-xs font-medium">
                    Custom
                  </button>
                  <button className="p-1.5 bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] rounded-lg shadow-2xs transition-colors ml-0.5">
                    <RotateCw size={12} />
                  </button>
                </div>
              </div>

              {/* ========================================================= */}
              {/* 2. SECTION: FIN FINANCE (SCREENSHOT media_1791487671015.png) */}
              {/* ========================================================= */}
              <div className="flex flex-col gap-3">
                {/* Section Header */}
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-[#0F172A] text-white font-mono text-[9px] rounded font-bold uppercase tracking-wider">
                    FIN
                  </span>
                  <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
                    Finance
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    This Month · Oct 1 – 31, 2026
                  </span>
                  <div className="h-px bg-slate-200/80 flex-1 ml-1" />
                </div>

                {/* 2 Side-by-Side Main Cards Layout matching screenshot media_1791487671015.png */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  
                  {/* LEFT CARD: PFD 1 Total Revenue + Chart + REVENUE BY SOURCE Table (lg:col-span-8) */}
                  <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                            PFD 1
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A]">Total revenue</h4>
                            <span className="text-[10px] text-[#64748B]">All recognized revenue channels</span>
                          </div>
                        </div>
                        <button className="text-xs font-semibold text-[#0F172A] hover:text-blue-600 flex items-center gap-1.5 border border-[#E2E8F0] px-3 py-1 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors">
                          <span>View breakdown</span>
                          <ArrowRight size={11} />
                        </button>
                      </div>

                      {/* Top Half: Left Numbers & Right Area Chart */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3">
                        
                        {/* Left Numbers Column */}
                        <div className="md:col-span-5 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block font-semibold">
                              THIS MONTH · OCT 1 – 31, 2026
                            </span>
                            <div className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-0.5 font-sans">
                              $40,900
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 text-xs">
                              <span className="px-1.5 py-0.5 bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] rounded font-bold text-[10px] font-mono">
                                ↑ 529%
                              </span>
                              <span className="text-[#64748B] text-[11px]">vs. previous period <b className="text-[#0F172A] font-semibold font-mono">$6,500</b></span>
                            </div>

                            {/* Pacing vs prior period */}
                            <div className="pt-2.5 mt-2.5 border-t border-slate-100">
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="font-mono text-[#64748B] uppercase tracking-wider font-semibold">PACING VS PRIOR PERIOD</span>
                                <span className="font-mono font-black text-[#0F172A] text-xs">6.3×</span>
                              </div>
                              <div className="relative w-full h-2 bg-blue-50 border border-blue-200/60 rounded-full mt-1.5 overflow-hidden flex items-center px-0.5">
                                <div className="bg-[#2563EB] h-1.5 w-[76%] rounded-full" />
                              </div>
                              <div className="flex items-center justify-between text-[9px] text-[#64748B] font-mono mt-1">
                                <span>Prior $6,500</span>
                                <span>Now $40,900</span>
                              </div>
                            </div>

                            {/* Projection */}
                            <div className="pt-2.5 mt-2.5 border-t border-slate-100">
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 font-mono">
                                <span>::</span>
                                <span>PROJECTION</span>
                              </div>
                              <div className="text-xs font-bold text-[#0F172A] mt-0.5">
                                At current pace ≈ $158,488 by Oct 31
                              </div>
                              <span className="text-[10px] text-[#64748B] block mt-0.5 leading-snug">
                                $40,900 over 8 of 31 days (UTC), linear pace
                              </span>

                              <div className="flex items-center justify-between text-[9px] text-[#64748B] font-mono mt-2">
                                <span>WINDOW ELAPSED</span>
                                <span className="font-bold text-[#0F172A]">Day 8 of 31</span>
                              </div>
                              {/* Segment tracker (31 segments for October: 8 blue, 23 light grey) */}
                              <div className="flex gap-[1.5px] mt-1">
                                {[...Array(31)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`h-[4px] flex-1 rounded-[1px] ${
                                      i < 8 ? "bg-[#2563EB]" : "bg-slate-200"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Revenue Transactions & Average Transaction */}
                          <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-slate-100">
                            <div>
                              <span className="text-[8.5px] font-mono uppercase text-[#64748B] font-semibold tracking-wider block">
                                REVENUE TRANSACTIONS
                              </span>
                              <span className="text-xl font-black text-[#0F172A] mt-0.5 block font-sans">5</span>
                            </div>
                            <div>
                              <span className="text-[8.5px] font-mono uppercase text-[#64748B] font-semibold tracking-wider block">
                                AVERAGE TRANSACTION
                              </span>
                              <span className="text-xl font-black text-[#0F172A] mt-0.5 block font-mono font-bold">$8,180</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Area Chart with Trajectory and Labels */}
                        <div className="md:col-span-7 flex flex-col justify-between pl-0 md:pl-2">
                          <div className="flex items-center justify-between text-[11px] pb-1">
                            <div className="flex items-center gap-2.5">
                              <span className="flex items-center gap-1.5 text-[#0F172A] font-semibold text-xs">
                                <span className="w-2.5 h-0.5 bg-blue-600 rounded-full" /> Revenue trend <span className="text-[10px] text-[#64748B] font-normal">Last 6 months</span>
                              </span>
                              <span className="flex items-center gap-1.5 text-blue-600 font-mono text-[10.5px]">
                                <span className="w-2.5 h-0.5 border-t border-dashed border-blue-600" /> Projection
                              </span>
                            </div>
                            <div className="flex items-center border border-[#E2E8F0] rounded-lg p-0.5 bg-slate-50">
                              <button className="px-1.5 py-0.5 bg-white text-[#0F172A] rounded shadow-2xs">
                                <TrendingUp size={11} />
                              </button>
                              <button className="px-1.5 py-0.5 text-[#64748B] hover:text-[#0F172A]">
                                <BarChart3 size={11} />
                              </button>
                            </div>
                          </div>

                          {/* Interactive Area Chart SVG */}
                          <div className="relative h-56 w-full mt-2">
                            {/* Horizontal guide lines with labels */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9.5px] font-mono text-[#94A3B8]">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-0.5">
                                <span>$200K</span>
                              </div>
                              <div className="flex items-center justify-between border-b border-slate-100 pb-0.5">
                                <span>$150K</span>
                              </div>
                              <div className="flex items-center justify-between border-b border-slate-100 pb-0.5">
                                <span>$100K</span>
                              </div>
                              <div className="flex items-center justify-between border-b border-slate-100 pb-0.5">
                                <span>$50K</span>
                              </div>
                              <div className="flex items-center justify-between border-b border-slate-100 pb-0.5">
                                <span>$0</span>
                              </div>
                            </div>

                            <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 310 180">
                              <defs>
                                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.30" />
                                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
                                </linearGradient>
                              </defs>

                              {/* Smooth Filled Gradient Area */}
                              <path
                                d="M 24 154 C 45 154, 55 125, 74 125 C 95 125, 105 125, 124 125 C 145 125, 155 120, 174 120 C 195 120, 205 120, 224 120 C 245 120, 260 114, 280 114 L 280 154 L 24 154 Z"
                                fill="url(#areaGradient)"
                              />

                              {/* Smooth Historical Curve Line */}
                              <path
                                d="M 24 154 C 45 154, 55 125, 74 125 C 95 125, 105 125, 124 125 C 145 125, 155 120, 174 120 C 195 120, 205 120, 224 120 C 245 120, 260 114, 280 114"
                                fill="none"
                                stroke="#2563EB"
                                strokeWidth="2.5"
                              />

                              {/* Historical Points */}
                              <circle cx="24" cy="154" r="3.2" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                              <circle cx="74" cy="125" r="3.2" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                              <circle cx="124" cy="125" r="3.2" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                              <circle cx="174" cy="120" r="3.2" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                              <circle cx="224" cy="120" r="3.2" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                              <circle cx="280" cy="114" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />

                              {/* Label above Oct ($40,900) */}
                              <text x="280" y="104" textAnchor="end" fontSize="10.5" fontWeight="bold" fill="#0F172A" fontFamily="sans-serif">
                                $40,900
                              </text>

                              {/* Dashed projection line straight up to $158,488 */}
                              <line
                                x1="280"
                                y1="114"
                                x2="280"
                                y2="35"
                                stroke="#2563EB"
                                strokeWidth="1.5"
                                strokeDasharray="3 3"
                              />
                              <circle cx="280" cy="35" r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />

                              {/* Label above projection point: ≈ $158,488 */}
                              <text x="275" y="30" textAnchor="end" fontSize="10.5" fontWeight="bold" fill="#0F172A" fontFamily="sans-serif">
                                ≈ $158,488
                              </text>

                              {/* X Axis Month Labels */}
                              <text x="24" y="174" textAnchor="middle" fontSize="9" fill="#64748B" fontFamily="sans-serif">May</text>
                              <text x="74" y="174" textAnchor="middle" fontSize="9" fill="#64748B" fontFamily="sans-serif">Jun</text>
                              <text x="124" y="174" textAnchor="middle" fontSize="9" fill="#64748B" fontFamily="sans-serif">Jul</text>
                              <text x="174" y="174" textAnchor="middle" fontSize="9" fill="#64748B" fontFamily="sans-serif">Aug</text>
                              <text x="224" y="174" textAnchor="middle" fontSize="9" fill="#64748B" fontFamily="sans-serif">Sep</text>
                              <text x="280" y="174" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#0F172A" fontFamily="sans-serif">Oct</text>
                            </svg>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Bottom Half of Left Card: REVENUE BY SOURCE Table */}
                    <div className="pt-5 mt-5 border-t border-slate-100">
                      <div className="flex items-center justify-between pb-2.5">
                        <span className="text-[10px] font-mono uppercase text-[#64748B] font-bold tracking-wider">
                          REVENUE BY SOURCE
                        </span>
                        <span className="text-[10px] font-mono text-[#64748B]">
                          This Month vs. previous period
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#F8FAFC] border-y border-[#E2E8F0] text-[9.5px] font-mono uppercase text-[#64748B]">
                            <tr>
                              <th className="py-2 px-2.5 font-semibold">SOURCE</th>
                              <th className="py-2 px-2.5 font-semibold text-right">THIS PERIOD</th>
                              <th className="py-2 px-2.5 font-semibold text-right">PREVIOUS</th>
                              <th className="py-2 px-2.5 font-semibold text-center">CHANGE</th>
                              <th className="py-2 px-2.5 font-semibold text-right">TXN</th>
                              <th className="py-2 px-2.5 font-semibold">SHARE</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#F1F5F9] text-xs">
                            <tr>
                              <td className="py-2.5 px-2.5 font-medium text-[#0F172A]">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-2xs bg-blue-600 shrink-0" />
                                  <span>Paid invoices</span>
                                </div>
                              </td>
                              <td className="py-2.5 px-2.5 font-bold text-[#0F172A] font-mono text-right">$40,900</td>
                              <td className="py-2.5 px-2.5 text-[#64748B] font-mono text-right">$6,500</td>
                              <td className="py-2.5 px-2.5 text-center">
                                <span className="px-1.5 py-0.5 bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] rounded text-[10px] font-mono font-bold">
                                  ↑ 529%
                                </span>
                              </td>
                              <td className="py-2.5 px-2.5 text-[#0F172A] font-mono text-right">5</td>
                              <td className="py-2.5 px-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-600 h-full w-full rounded-full" />
                                  </div>
                                  <span className="font-mono text-[10px] text-[#64748B]">100%</span>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2.5 px-2.5 text-[#64748B]">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-2xs bg-amber-500 shrink-0" />
                                  <span>Subscription renewals</span>
                                </div>
                              </td>
                              <td className="py-2.5 px-2.5 text-[#64748B] font-mono text-right">$0</td>
                              <td className="py-2.5 px-2.5 text-[#64748B] font-mono text-right">$0</td>
                              <td className="py-2.5 px-2.5 text-[#94A3B8] text-center font-mono">—</td>
                              <td className="py-2.5 px-2.5 text-[#64748B] font-mono text-right">0</td>
                              <td className="py-2.5 px-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-slate-100 h-1.5 rounded-full" />
                                  <span className="text-[10px] font-mono text-[#94A3B8]">0%</span>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2.5 px-2.5 text-[#64748B]">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-2xs bg-emerald-500 shrink-0" />
                                  <span>Catalog & cart</span>
                                </div>
                              </td>
                              <td className="py-2.5 px-2.5 text-[#64748B] font-mono text-right">$0</td>
                              <td className="py-2.5 px-2.5 text-[#64748B] font-mono text-right">$0</td>
                              <td className="py-2.5 px-2.5 text-[#94A3B8] text-center font-mono">—</td>
                              <td className="py-2.5 px-2.5 text-[#64748B] font-mono text-right">0</td>
                              <td className="py-2.5 px-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-slate-100 h-1.5 rounded-full" />
                                  <span className="text-[10px] font-mono text-[#94A3B8]">0%</span>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2.5 px-2.5 text-[#64748B]">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-2xs bg-amber-600 shrink-0" />
                                  <span>Quota & add-on top-ups</span>
                                </div>
                              </td>
                              <td className="py-2.5 px-2.5 text-[#64748B] font-mono text-right">$0</td>
                              <td className="py-2.5 px-2.5 text-[#64748B] font-mono text-right">$0</td>
                              <td className="py-2.5 px-2.5 text-[#94A3B8] text-center font-mono">—</td>
                              <td className="py-2.5 px-2.5 text-[#64748B] font-mono text-right">0</td>
                              <td className="py-2.5 px-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-slate-100 h-1.5 rounded-full" />
                                  <span className="text-[10px] font-mono text-[#94A3B8]">0%</span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT CARD: PFD 2 Monthly Recurring Revenue + RENEWAL WATCH (lg:col-span-4) */}
                  <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                            PFD 2
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A]">Monthly recurring revenue</h4>
                            <span className="text-[10px] text-[#64748B]">Normalized monthly revenue</span>
                          </div>
                        </div>
                        <ArrowRight size={13} className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer" />
                      </div>

                      {/* Donut Meter & MRR Headline */}
                      <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                        {/* Radial Gauge Meter */}
                        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            {/* Radial tick marks */}
                            {[...Array(20)].map((_, i) => {
                              const angle = (i * 360) / 20;
                              return (
                                <line
                                  key={i}
                                  x1="50"
                                  y1="6"
                                  x2="50"
                                  y2="10"
                                  stroke="#CBD5E1"
                                  strokeWidth="1.25"
                                  transform={`rotate(${angle} 50 50)`}
                                />
                              );
                            })}
                            <circle cx="50" cy="50" r="32" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                            <circle
                              cx="50"
                              cy="50"
                              r="32"
                              fill="none"
                              stroke="#2563EB"
                              strokeWidth="6"
                              strokeDasharray="201"
                              strokeDashoffset="50"
                              strokeLinecap="round"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-2xl font-black text-[#0F172A] leading-none">2</span>
                            <span className="text-[8px] font-mono font-bold text-[#64748B] tracking-wider mt-0.5">
                              STREAMS
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono text-[#64748B] font-semibold">MRR</span>
                          <div className="text-2xl sm:text-3xl font-black text-[#0F172A] leading-none mt-0.5">
                            $6,500<span className="text-xs font-normal text-[#64748B]">/mo</span>
                          </div>
                          <div className="mt-2 text-[10px] text-[#64748B]">
                            <span className="block font-mono uppercase text-[9px] text-[#94A3B8]">ANNUALIZED RUN RATE</span>
                            <span className="font-bold text-[#0F172A] text-sm font-mono">$78,000</span>
                            <span className="text-[9px] text-[#94A3B8] ml-1">MRR × 12</span>
                          </div>
                        </div>
                      </div>

                      {/* Stream Breakdown Rows */}
                      <div className="flex flex-col gap-2 pt-3 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-2xs bg-blue-600 shrink-0" />
                            <span className="text-[#0F172A] font-medium">Monthly</span>
                            <span className="text-[10px] text-[#64748B]">1 stream · billed monthly</span>
                          </div>
                          <div className="flex items-center gap-2 font-mono">
                            <span className="font-bold text-[#0F172A]">$6,500</span>
                            <span className="text-[10px] text-[#64748B]">100%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[#64748B]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-2xs bg-orange-600 shrink-0" />
                            <span>Quarterly</span>
                            <span className="text-[10px] text-[#94A3B8]">0 streams · ÷ 3</span>
                          </div>
                          <div className="flex items-center gap-2 font-mono">
                            <span>$0</span>
                            <span className="text-[10px]">0%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[#64748B]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-2xs bg-emerald-500 shrink-0" />
                            <span>Yearly</span>
                            <span className="text-[10px] text-[#94A3B8]">0 streams · ÷ 12</span>
                          </div>
                          <div className="flex items-center gap-2 font-mono">
                            <span>$0</span>
                            <span className="text-[10px]">0%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[#64748B]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-2xs bg-amber-600 shrink-0" />
                            <span>Recurring invoices</span>
                            <span className="text-[10px] text-[#94A3B8]">1 stream · normalized</span>
                          </div>
                          <div className="flex items-center gap-2 font-mono">
                            <span>$0</span>
                            <span className="text-[10px]">0%</span>
                          </div>
                        </div>
                      </div>

                      {/* Streams Cells Indicator */}
                      <div className="pt-3 mt-3 border-t border-slate-100 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[10px] text-[#64748B] font-mono">
                          <span>STREAMS · 1 CELL = 1 STREAM</span>
                          <span>2 streams</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-2xs bg-blue-600 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-2xs bg-orange-500 inline-block" />
                        </div>
                      </div>

                      {/* RENEWAL WATCH (Inside Right Card) */}
                      <div className="pt-4 mt-3 border-t border-slate-100">
                        <div className="flex items-center justify-between pb-2.5">
                          <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider font-bold">
                            RENEWAL WATCH
                          </span>
                          <span className="text-[10px] text-[#64748B] font-mono">
                            Next renewal
                          </span>
                        </div>

                        <div className="flex flex-col gap-2.5 text-xs">
                          {/* Renewal Item 1 */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-baseline gap-2.5 min-w-0">
                              <span className="text-xs font-bold text-[#0F172A] font-mono shrink-0">Oct 31</span>
                              <div className="min-w-0">
                                <span className="font-bold text-[#0F172A] block text-xs">Nebula Health</span>
                                <span className="text-[10px] text-[#64748B] block truncate">
                                  Dedicated Senior Product Design Reta...
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-bold font-mono text-[#0F172A] shrink-0">
                              $6,500
                            </span>
                          </div>

                          {/* Renewal Item 2 */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-baseline gap-2.5 min-w-0">
                              <span className="text-xs font-bold text-[#0F172A] font-mono shrink-0">Oct 31</span>
                              <div className="min-w-0">
                                <span className="font-bold text-[#0F172A] block text-xs">Nebula Health</span>
                                <span className="text-[10px] text-[#64748B] block truncate">
                                  Nebula Health - Monthly Design Retainer - M...
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-bold font-mono text-[#64748B] shrink-0">
                              $0
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mt-4">
                      <span className="text-[11px] text-[#64748B]">
                        Avg. per stream <b className="text-[#0F172A] font-mono font-bold">$3,250</b>
                      </span>
                      <button className="text-[11px] font-semibold text-[#0F172A] hover:text-blue-600 border border-[#E2E8F0] px-3 py-1.5 rounded-lg transition-colors shadow-2xs hover:bg-slate-50">
                        Explore recurring revenue →
                      </button>
                    </div>

                  </div>

                </div>
              </div>

              {/* Receivables & Cash Flow Row (Screenshot 2) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  
                  {/* FIN 3 Receivables */}
                  <div className="lg:col-span-6 bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                            FIN 3
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A]">Receivables</h4>
                            <span className="text-[10px] text-[#64748B]">Current balances, grouped by due date</span>
                          </div>
                        </div>
                        <ArrowRight size={13} className="text-[#94A3B8]" />
                      </div>

                      {/* Outstanding & Overdue Cards */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                          <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold tracking-wider">
                            OUTSTANDING
                          </span>
                          <div className="text-2xl font-black text-[#0F172A] mt-1">$23,500</div>
                          <div className="flex items-center justify-between text-[10px] text-[#64748B] mt-1">
                            <span>Invoices: 3</span>
                            <ArrowRight size={10} />
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-red-50/60 border border-red-200/80 flex flex-col justify-between">
                          <span className="text-[9.5px] font-mono uppercase text-red-600 font-bold tracking-wider">
                            OVERDUE
                          </span>
                          <div className="text-2xl font-black text-red-600 mt-1">$4,800</div>
                          <div className="flex items-center justify-between text-[10px] text-red-500 mt-1">
                            <span>Invoices: 1</span>
                            <ArrowRight size={10} />
                          </div>
                        </div>
                      </div>

                      {/* AGING Bar */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center justify-between text-[10px] pb-1.5">
                          <span className="font-mono text-[#64748B] uppercase tracking-wider font-semibold">AGING</span>
                          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded text-[9.5px]">
                            <span className="px-1.5 py-0.2 bg-white rounded font-bold text-[#0F172A] shadow-2xs">Outstanding</span>
                            <span className="px-1.5 py-0.2 text-[#64748B]">Overdue</span>
                          </div>
                        </div>

                        {/* Visual Aging Bar */}
                        <div className="w-full bg-blue-600 h-2 rounded-full overflow-hidden mt-1" />

                        <div className="flex flex-col gap-1.5 mt-2.5 text-xs">
                          <div className="flex items-center justify-between text-[#64748B]">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-2xs bg-amber-500" />
                              <span>Due within 7 days</span>
                            </span>
                            <span className="font-mono text-[11px]">$0 <span className="text-[#94A3B8]">0%</span></span>
                          </div>
                          <div className="flex items-center justify-between text-[#0F172A] font-medium">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-2xs bg-blue-600" />
                              <span>Due later</span>
                            </span>
                            <span className="font-mono text-[11px] font-bold">$23,500 <span className="text-[#64748B]">100%</span></span>
                          </div>
                          <div className="flex items-center justify-between text-[#64748B]">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-2xs bg-red-500" />
                              <span>Open invoices past due</span>
                            </span>
                            <span className="font-mono text-[11px]">$0 <span className="text-[#94A3B8]">0%</span></span>
                          </div>
                        </div>
                      </div>

                      {/* Incoming Next 14 Days */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold tracking-wider block mb-2">
                          INCOMING · NEXT 14 DAYS
                        </span>
                        <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#0F172A]">INV-2026-0009</span>
                            <span className="text-[#64748B]">Solari Logistics</span>
                          </div>
                          <div className="flex items-center gap-3 font-mono">
                            <span className="text-[#64748B] text-[11px]">Oct 16</span>
                            <span className="font-bold text-[#0F172A]">$14,500</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[11px] text-[#64748B] flex items-center justify-between mt-3">
                      <span className="flex items-center gap-1.5 hover:text-[#0F172A] cursor-pointer">
                        <FileText size={12} />
                        <span>No drafts to review →</span>
                      </span>
                    </div>
                  </div>

                  {/* FIN 4 Cash Flow */}
                  <div className="lg:col-span-6 bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                            FIN 4
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A]">Cash flow</h4>
                            <span className="text-[10px] text-[#64748B]">Invoiced vs collected · last 6 months</span>
                          </div>
                        </div>
                      </div>

                      {/* Metrics 3 Columns */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold">COLLECTED</span>
                          <div className="text-xl sm:text-2xl font-black text-[#0F172A] mt-0.5">$113,900</div>
                        </div>
                        <div>
                          <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold">INVOICED</span>
                          <div className="text-xl sm:text-2xl font-black text-[#0F172A] mt-0.5">$148,700</div>
                        </div>
                        <div>
                          <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold">COLLECTION RATE</span>
                          <div className="text-xl sm:text-2xl font-black text-[#0F172A] mt-0.5">77%</div>
                        </div>
                      </div>

                      {/* Bar Chart comparing Invoiced vs Collected */}
                      <div className="pt-3">
                        <div className="flex items-center gap-4 text-[10px] font-mono text-[#64748B] mb-3">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-2xs bg-slate-300" /> Invoiced
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-2xs bg-blue-600" /> Collected
                          </span>
                        </div>

                        {/* Chart Grid */}
                        <div className="h-44 w-full flex items-end justify-between gap-2 pt-4 px-2">
                          {[
                            { m: "May", inv: 18500, col: 0, invH: 28, colH: 0 },
                            { m: "Jun", inv: 18500, col: 18500, invH: 28, colH: 28 },
                            { m: "Jul", inv: 21000, col: 18500, invH: 34, colH: 28 },
                            { m: "Aug", inv: 19800, col: 21000, invH: 32, colH: 34 },
                            { m: "Sep", inv: 27500, col: 21500, invH: 46, colH: 36 },
                            { m: "Oct", inv: 43400, col: 34400, invH: 78, colH: 60, current: true },
                          ].map((item) => (
                            <div key={item.m} className="flex-1 flex flex-col items-center gap-1.5">
                              <div className="w-full flex items-end justify-center gap-1 h-32">
                                <div
                                  className={`w-3.5 rounded-t-2xs ${
                                    item.current ? "bg-slate-300" : "bg-slate-200"
                                  }`}
                                  style={{ height: `${item.invH}%` }}
                                />
                                <div
                                  className={`w-3.5 rounded-t-2xs ${
                                    item.current ? "bg-blue-600 shadow-xs" : "bg-blue-500"
                                  }`}
                                  style={{ height: `${item.colH}%` }}
                                />
                              </div>
                              <span className={`text-[10px] font-mono ${
                                item.current ? "font-bold text-[#0F172A]" : "text-[#64748B]"
                              }`}>
                                {item.m}
                              </span>
                              <div className="flex flex-col text-[8.5px] font-mono text-center text-[#94A3B8] leading-tight">
                                <span className={item.current ? "font-bold text-blue-600" : ""}>${(item.col/1000).toFixed(0)}k</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[10px] text-[#94A3B8] flex items-center gap-1 mt-3">
                      <HelpCircle size={11} />
                      <span>Invoiced by issue date (excluding draft, scheduled and void) · collected by payment date.</span>
                    </div>
                  </div>

                </div>

              {/* ========================================================= */}
              {/* 3. SECTION: SYS CAUTIONS & INSTRUMENTS (SCREENSHOT 2 & 3) */}
              {/* ========================================================= */}
              <div className="flex flex-col gap-4">
                {/* Section Header */}
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-[#0F172A] text-white font-mono text-[9px] rounded font-bold uppercase">
                    SYS
                  </span>
                  <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
                    Cautions & instruments
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    Live alerts and calibrated business ratios
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  
                  {/* Master Caution (Screenshot 3) */}
                  <div className="lg:col-span-6 bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                            CAUT
                          </span>
                          <h4 className="text-xs font-bold text-[#0F172A]">Master caution</h4>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                            4
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
                            View all 4 priorities
                          </span>
                          <RotateCw size={11} className="text-[#94A3B8]" />
                        </div>
                      </div>

                      {/* 3 Tabs: CRITICAL 1, CAUTION 1, ADVISORY 2 */}
                      <div className="grid grid-cols-3 gap-2 pt-1 pb-3">
                        <div className="p-2 rounded-xl bg-red-50 border border-red-200 text-center flex flex-col items-center">
                          <span className="text-[9px] font-mono font-bold text-red-700 uppercase flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> CRITICAL
                          </span>
                          <span className="text-lg font-black text-red-600 leading-tight mt-0.5">1</span>
                        </div>
                        <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-center flex flex-col items-center">
                          <span className="text-[9px] font-mono font-bold text-amber-700 uppercase flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> CAUTION
                          </span>
                          <span className="text-lg font-black text-amber-600 leading-tight mt-0.5">1</span>
                        </div>
                        <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-center flex flex-col items-center">
                          <span className="text-[9px] font-mono font-bold text-blue-700 uppercase flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> ADVISORY
                          </span>
                          <span className="text-lg font-black text-blue-600 leading-tight mt-0.5">2</span>
                        </div>
                      </div>

                      {/* Alert Items List */}
                      <div className="flex flex-col gap-2 pt-1">
                        {/* Alert 1 */}
                        <div className="p-3 bg-red-50/60 border border-red-200/80 rounded-xl flex items-center justify-between text-xs">
                          <div className="flex items-start gap-2.5">
                            <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                              <AlertTriangle size={13} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[9.5px] font-bold text-red-700 uppercase">FIN</span>
                                <span className="font-bold text-[#0F172A]">1 Overdue Invoice</span>
                              </div>
                              <span className="text-[11px] text-[#64748B] block mt-0.5">$4,800 total overdue</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
                              Review →
                            </span>
                            <X size={12} className="text-[#94A3B8] cursor-pointer" />
                          </div>
                        </div>

                        {/* Alert 2 */}
                        <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl flex items-center justify-between text-xs">
                          <div className="flex items-start gap-2.5">
                            <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                              <Clock size={13} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[9.5px] font-bold text-amber-700 uppercase">DLV</span>
                                <span className="font-bold text-[#0F172A]">8 Tasks Due Within 72h</span>
                              </div>
                              <span className="text-[11px] text-[#64748B] block mt-0.5">
                                Sprint deliverables approaching deadlines this week.
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
                              Review →
                            </span>
                            <X size={12} className="text-[#94A3B8] cursor-pointer" />
                          </div>
                        </div>

                        {/* Alert 3 */}
                        <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl flex items-center justify-between text-xs">
                          <div className="flex items-start gap-2.5">
                            <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                              <HelpCircle size={13} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[9.5px] font-bold text-blue-700 uppercase">SUP</span>
                                <span className="font-bold text-[#0F172A]">2 Active Support Tickets</span>
                              </div>
                              <span className="text-[11px] text-[#64748B] block mt-0.5">
                                Tickets currently awaiting review or replies from the team.
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
                              Review →
                            </span>
                            <X size={12} className="text-[#94A3B8] cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[10px] text-[#94A3B8] mt-3">
                      Alerts refresh every minute. Hidden items return after 24 hours.
                    </div>
                  </div>

                  {/* Business Instruments (3 Gauges) (Screenshot 3) */}
                  <div className="lg:col-span-6 bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                            INST
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A]">Business instruments</h4>
                            <span className="text-[10px] text-[#64748B]">
                              Calibrated 0–100 ratios from real counts — never targets or forecasts
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 3 Semi-Circular Speedometer Gauges */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        
                        {/* Gauge 1: Balance not past due (83%) */}
                        <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl flex flex-col items-center justify-between text-center">
                          <div className="w-full flex items-center justify-between text-[11px] font-semibold text-[#0F172A]">
                            <span className="truncate">Balance not past due</span>
                            <ArrowRight size={11} className="text-[#94A3B8]" />
                          </div>

                          {/* Semi-circle Gauge Meter */}
                          <div className="relative w-32 h-20 flex items-center justify-center my-1">
                            <svg className="w-full h-full" viewBox="0 0 100 60">
                              {/* Background arc */}
                              <path
                                d="M 15 50 A 35 35 0 0 1 85 50"
                                fill="none"
                                stroke="#E2E8F0"
                                strokeWidth="6"
                                strokeLinecap="round"
                              />
                              {/* Filled arc (83% of 180 deg) */}
                              <path
                                d="M 15 50 A 35 35 0 0 1 80 32"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="6"
                                strokeLinecap="round"
                              />
                              {/* Needle */}
                              <line
                                x1="50"
                                y1="50"
                                x2="76"
                                y2="34"
                                stroke="#0F172A"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                              <circle cx="50" cy="50" r="3.5" fill="#0F172A" />
                              <text x="12" y="58" fontSize="6" fill="#94A3B8" fontFamily="monospace">0</text>
                              <text x="46" y="22" fontSize="6" fill="#94A3B8" fontFamily="monospace">50</text>
                              <text x="80" y="58" fontSize="6" fill="#94A3B8" fontFamily="monospace">100</text>
                            </svg>
                          </div>

                          <div className="text-xl font-black text-[#0F172A] leading-none">83%</div>
                          <span className="text-[9.5px] text-[#64748B] mt-1 leading-tight">
                            Share of unpaid balance that is not past due.
                          </span>
                          <div className="mt-2 pt-2 border-t border-slate-200/80 w-full flex items-center justify-between text-[10px] text-[#64748B]">
                            <span>Past-due balance</span>
                            <span className="font-mono font-bold text-amber-600">$4,800</span>
                          </div>
                        </div>

                        {/* Gauge 2: Projects on track (100%) */}
                        <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl flex flex-col items-center justify-between text-center">
                          <div className="w-full flex items-center justify-between text-[11px] font-semibold text-[#0F172A]">
                            <span className="truncate">Projects on track</span>
                            <ArrowRight size={11} className="text-[#94A3B8]" />
                          </div>

                          {/* Semi-circle Gauge Meter */}
                          <div className="relative w-32 h-20 flex items-center justify-center my-1">
                            <svg className="w-full h-full" viewBox="0 0 100 60">
                              <path
                                d="M 15 50 A 35 35 0 0 1 85 50"
                                fill="none"
                                stroke="#E2E8F0"
                                strokeWidth="6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M 15 50 A 35 35 0 0 1 85 50"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="6"
                                strokeLinecap="round"
                              />
                              <line
                                x1="50"
                                y1="50"
                                x2="82"
                                y2="50"
                                stroke="#0F172A"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                              <circle cx="50" cy="50" r="3.5" fill="#0F172A" />
                              <text x="12" y="58" fontSize="6" fill="#94A3B8" fontFamily="monospace">0</text>
                              <text x="46" y="22" fontSize="6" fill="#94A3B8" fontFamily="monospace">50</text>
                              <text x="80" y="58" fontSize="6" fill="#94A3B8" fontFamily="monospace">100</text>
                            </svg>
                          </div>

                          <div className="text-xl font-black text-[#0F172A] leading-none">100%</div>
                          <span className="text-[9.5px] text-[#64748B] mt-1 leading-tight">
                            3 of 3 projects are on <b className="text-emerald-600 font-semibold">track</b>.
                          </span>
                          <div className="mt-2 pt-2 border-t border-slate-200/80 w-full flex items-center justify-between text-[10px] text-[#64748B]">
                            <span>At risk / Off track</span>
                            <span className="font-mono font-bold text-[#0F172A]">0 / 0</span>
                          </div>
                        </div>

                        {/* Gauge 3: Acceptance rate (100%) */}
                        <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl flex flex-col items-center justify-between text-center">
                          <div className="w-full flex items-center justify-between text-[11px] font-semibold text-[#0F172A]">
                            <span className="truncate">Acceptance rate</span>
                            <ArrowRight size={11} className="text-[#94A3B8]" />
                          </div>

                          {/* Semi-circle Gauge Meter */}
                          <div className="relative w-32 h-20 flex items-center justify-center my-1">
                            <svg className="w-full h-full" viewBox="0 0 100 60">
                              <path
                                d="M 15 50 A 35 35 0 0 1 85 50"
                                fill="none"
                                stroke="#E2E8F0"
                                strokeWidth="6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M 15 50 A 35 35 0 0 1 85 50"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="6"
                                strokeLinecap="round"
                              />
                              <line
                                x1="50"
                                y1="50"
                                x2="82"
                                y2="50"
                                stroke="#0F172A"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                              <circle cx="50" cy="50" r="3.5" fill="#0F172A" />
                              <text x="12" y="58" fontSize="6" fill="#94A3B8" fontFamily="monospace">0</text>
                              <text x="46" y="22" fontSize="6" fill="#94A3B8" fontFamily="monospace">50</text>
                              <text x="80" y="58" fontSize="6" fill="#94A3B8" fontFamily="monospace">100</text>
                            </svg>
                          </div>

                          <div className="text-xl font-black text-[#0F172A] leading-none">100%</div>
                          <span className="text-[9.5px] text-[#64748B] mt-1 leading-tight">
                            Accepted proposals as a share of accepted and declined proposals.
                          </span>
                          <div className="mt-2 pt-2 border-t border-slate-200/80 w-full flex items-center justify-between text-[10px] text-[#64748B]">
                            <span>Awaiting decision</span>
                            <span className="font-mono font-bold text-[#0F172A]">0</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[10px] text-[#94A3B8] mt-3">
                      Instruments reflect actual system performance in the designated cycle.
                    </div>
                  </div>

                </div>
              </div>

              {/* ========================================================= */}
              {/* 4. SECTION: DLV DELIVERY TELEMETRY (SCREENSHOT 3 & 4) */}
              {/* ========================================================= */}
              <div className="flex flex-col gap-4">
                {/* Section Header */}
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-[#0F172A] text-white font-mono text-[9px] rounded font-bold uppercase">
                    DLV
                  </span>
                  <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
                    Delivery telemetry
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    Schedule, status and follow-up
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  
                  {/* DLV 1 Flight Plan (Gantt Schedule) */}
                  <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                            DLV 1
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A]">Flight plan</h4>
                            <span className="text-[10px] text-[#64748B]">Active projects by schedule · bar fill = completed tasks</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs">
                            <button className="px-2.5 py-0.5 bg-white font-semibold text-[#0F172A] rounded shadow-2xs">
                              Schedule
                            </button>
                            <button className="px-2.5 py-0.5 text-[#64748B] hover:text-[#0F172A]">
                              Risk
                            </button>
                          </div>

                          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                            <span>All projects</span>
                            <ArrowRight size={11} />
                          </button>
                        </div>
                      </div>

                      {/* Status Summary Bar */}
                      <div className="flex items-center justify-between text-xs py-2 border-y border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>On track <b className="font-mono">3</b></span>
                          </span>
                          <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>At risk <b className="font-mono">0</b></span>
                          </span>
                          <span className="flex items-center gap-1.5 text-red-600 font-medium">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <span>Off track <b className="font-mono">0</b></span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-full rounded-full" />
                          </div>
                          <span className="text-[11px] text-[#64748B] font-mono">3 in progress</span>
                        </div>
                      </div>

                      {/* Timeline Header with Today Marker */}
                      <div className="relative pt-4">
                        <div className="grid grid-cols-9 text-[9.5px] font-mono text-[#94A3B8] uppercase text-center pb-2 border-b border-slate-100">
                          <span>MAY</span>
                          <span>JUN</span>
                          <span>JUL</span>
                          <span>AUG</span>
                          <span>SEP</span>
                          <span className="font-bold text-[#0F172A] relative">
                            OCT
                            {/* Today Tag */}
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full whitespace-nowrap shadow-2xs z-20">
                              Today · Oct 8
                            </div>
                          </span>
                          <span>NOV</span>
                          <span>DEC</span>
                          <span>JAN</span>
                        </div>

                        {/* Vertical Today line */}
                        <div className="absolute top-8 bottom-0 left-[61.1%] w-[1.5px] bg-[#0F172A] z-10 pointer-events-none" />

                        {/* Projects Gantt Rows */}
                        <div className="flex flex-col gap-4 pt-3 text-xs">
                          
                          {/* Project 1 */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="w-48 shrink-0">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                <span className="font-bold text-[#0F172A] truncate">Kroma Mobile SDK & Mercha...</span>
                              </div>
                              <span className="text-[10px] text-[#64748B] block ml-3.5">Kroma Fintech</span>
                            </div>

                            {/* Gantt Bar */}
                            <div className="flex-1 relative h-4 bg-transparent flex items-center">
                              <div className="absolute left-[33%] w-[33%] h-3.5 rounded-full bg-blue-100 flex overflow-hidden">
                                <div className="bg-blue-600 h-full w-[45%] rounded-full" />
                              </div>
                            </div>

                            <div className="text-right shrink-0 w-20 font-mono text-[11px]">
                              <span className="font-bold text-[#0F172A]">45%</span>
                              <span className="text-[9.5px] text-[#94A3B8] ml-1">Oct 26</span>
                            </div>
                          </div>

                          {/* Project 2 */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="w-48 shrink-0">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                <span className="font-bold text-[#0F172A] truncate">Nebula Telehealth 2.0 Core P...</span>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] text-[#64748B] ml-3.5">
                                <span>Nebula Health</span>
                                <span>·</span>
                                <span className="text-amber-600 font-medium">1 late</span>
                              </div>
                            </div>

                            <div className="flex-1 relative h-4 bg-transparent flex items-center">
                              <div className="absolute left-[11%] w-[55%] h-3.5 rounded-full bg-blue-100 flex overflow-hidden">
                                <div className="bg-blue-600 h-full w-[38%] rounded-full" />
                              </div>
                            </div>

                            <div className="text-right shrink-0 w-20 font-mono text-[11px]">
                              <span className="font-bold text-[#0F172A]">38%</span>
                              <span className="text-[9.5px] text-[#94A3B8] ml-1">Nov 20</span>
                            </div>
                          </div>

                          {/* Project 3 */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="w-48 shrink-0">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                <span className="font-bold text-[#0F172A] truncate">Solari Fleet Telematics Contr...</span>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] text-[#64748B] ml-3.5">
                                <span>Solari Logistics</span>
                                <span>·</span>
                                <span className="text-amber-600 font-medium">1 late</span>
                              </div>
                            </div>

                            <div className="flex-1 relative h-4 bg-transparent flex items-center">
                              <div className="absolute left-[33%] w-[44%] h-3.5 rounded-full bg-blue-100 flex overflow-hidden">
                                <div className="bg-blue-600 h-full w-[33%] rounded-full" />
                              </div>
                            </div>

                            <div className="text-right shrink-0 w-20 font-mono text-[11px]">
                              <span className="font-bold text-[#0F172A]">33%</span>
                              <span className="text-[9.5px] text-[#94A3B8] ml-1">Dec 5</span>
                            </div>
                          </div>

                          {/* Project 4 */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="w-48 shrink-0">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                                <span className="font-bold text-[#0F172A] truncate">Arcturus Brand Identity & We...</span>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] text-[#64748B] ml-3.5">
                                <span>Arcturus Robotics</span>
                                <span>·</span>
                                <span className="text-amber-600 font-medium">1 late</span>
                              </div>
                            </div>

                            <div className="flex-1 relative h-4 bg-transparent flex items-center">
                              <div className="absolute left-[55%] w-[33%] h-3.5 rounded-full bg-blue-100 flex overflow-hidden">
                                <div className="bg-blue-600 h-full w-[14%] rounded-full" />
                              </div>
                            </div>

                            <div className="text-right shrink-0 w-20 font-mono text-[11px]">
                              <span className="font-bold text-[#0F172A]">14%</span>
                              <span className="text-[9.5px] text-[#94A3B8] ml-1">Jan 4</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[10.5px] text-[#64748B] flex items-center gap-1.5 mt-3">
                      <HelpCircle size={11} className="text-[#94A3B8]" />
                      <span>1 project that is not in progress has no health score.</span>
                    </div>
                  </div>

                  {/* DLV 2 Work in motion & Overdue follow-up */}
                  <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                            DLV 2
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A]">Work in motion</h4>
                            <span className="text-[10px] text-[#64748B]">To do, in progress and in review</span>
                          </div>
                        </div>
                        <ArrowRight size={13} className="text-[#94A3B8]" />
                      </div>

                      {/* 28 Tracked Tasks Breakdown */}
                      <div className="pt-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-[#0F172A]">28</span>
                          <span className="text-xs text-[#64748B]">Tracked tasks</span>
                        </div>

                        {/* 3 Status Columns Histogram */}
                        <div className="flex items-end justify-between gap-3 h-28 pt-4 px-3 border-b border-slate-100 pb-2">
                          <div className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-xs font-bold text-[#0F172A]">12</span>
                            <div className="w-full bg-slate-300 h-16 rounded-t-md" />
                            <span className="text-[10.5px] text-[#64748B] mt-1 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> To do
                            </span>
                          </div>

                          <div className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-xs font-bold text-[#0F172A]">11</span>
                            <div className="w-full bg-blue-600 h-14 rounded-t-md shadow-xs" />
                            <span className="text-[10.5px] text-[#64748B] mt-1 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> In progress
                            </span>
                          </div>

                          <div className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-xs font-bold text-[#0F172A]">5</span>
                            <div className="w-full bg-indigo-900 h-8 rounded-t-md" />
                            <span className="text-[10.5px] text-[#64748B] mt-1 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-900" /> In review
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* OVERDUE FOLLOW-UP */}
                      <div className="pt-4">
                        <div className="flex items-center justify-between pb-2">
                          <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider font-semibold">
                            OVERDUE FOLLOW-UP
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-mono text-[9.5px] font-bold border border-amber-200">
                            ● 3 overdue
                          </span>
                        </div>

                        <div className="flex flex-col gap-2 pt-1 text-xs">
                          {/* Item 1 */}
                          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[#0F172A] truncate text-[11.5px]">
                                HIPAA compliance audit trail viewer for clinic adm...
                              </span>
                              <span className="text-[9.5px] font-mono font-bold text-red-600 shrink-0 ml-1">
                                Oct 8
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-[#64748B]">
                              <span>Nebula Telehealth 2.0 Core Platform</span>
                              <span>·</span>
                              <span className="text-[#0F172A] font-medium">Marcus Brody</span>
                            </div>
                          </div>

                          {/* Item 2 */}
                          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[#0F172A] truncate text-[11.5px]">
                                Automated geofence exit push notification latenc...
                              </span>
                              <span className="text-[9.5px] font-mono font-bold text-red-600 shrink-0 ml-1">
                                Oct 8
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-[#64748B]">
                              <span>Solari Fleet Telematics Control Room</span>
                              <span>·</span>
                              <span className="text-[#0F172A] font-medium">Sophia Lin</span>
                            </div>
                          </div>

                          {/* Item 3 */}
                          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[#0F172A] truncate text-[11.5px]">
                                Robot emergency stop (E-STOP) physical button ...
                              </span>
                              <span className="text-[9.5px] font-mono font-bold text-red-600 shrink-0 ml-1">
                                Oct 8
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-[#64748B]">
                              <span>Arcturus Brand Identity & Web Launch</span>
                              <span>·</span>
                              <span className="text-[#0F172A] font-medium">Liam Gallagher</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-right mt-3">
                      <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">
                        View all tasks →
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* ========================================================= */}
              {/* 5. SECTION: CRW CREW & THROUGHPUT (SCREENSHOT 4 & 5) */}
              {/* ========================================================= */}
              <div className="flex flex-col gap-4">
                {/* Section Header */}
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-[#0F172A] text-white font-mono text-[9px] rounded font-bold uppercase">
                    CRW
                  </span>
                  <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
                    Crew & throughput
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    Last 14 days · Sep 25 – Oct 8
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  
                  {/* CRW 1 Crew load heatmap */}
                  <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                            CRW 1
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A]">Crew load</h4>
                            <span className="text-[10px] text-[#64748B]">Hours logged per person · last 14 days</span>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-1 text-[9.5px] font-mono text-[#64748B]">
                          <span>0 h</span>
                          <span className="w-2.5 h-2.5 bg-slate-100 rounded-2xs" />
                          <span className="w-2.5 h-2.5 bg-blue-100 rounded-2xs" />
                          <span className="w-2.5 h-2.5 bg-blue-300 rounded-2xs" />
                          <span className="w-2.5 h-2.5 bg-blue-500 rounded-2xs" />
                          <span className="w-2.5 h-2.5 bg-blue-700 rounded-2xs" />
                          <span>8 h+</span>
                        </div>
                      </div>

                      {/* Heatmap Matrix Table */}
                      <div className="pt-2">
                        {/* Days header */}
                        <div className="flex items-center justify-between text-[9px] font-mono text-[#94A3B8] pb-1.5 border-b border-slate-100">
                          <span className="w-32 uppercase">CREW</span>
                          <div className="flex-1 flex justify-around max-w-sm px-2">
                            <span>F<br />25</span>
                            <span>S<br />26</span>
                            <span>S<br />27</span>
                            <span>M<br />28</span>
                            <span>T<br />29</span>
                            <span>W<br />30</span>
                            <span>T<br />1</span>
                            <span>F<br />2</span>
                            <span>S<br />3</span>
                            <span>S<br />4</span>
                            <span className="text-[#0F172A] font-bold">M<br />5</span>
                            <span>T<br />6</span>
                            <span>W<br />7</span>
                            <span className="text-white bg-[#0F172A] px-1 rounded font-bold">T<br />8</span>
                          </div>
                          <span className="w-16 text-right uppercase">HOURS</span>
                          <span className="w-28 text-right uppercase">OPEN TASKS</span>
                        </div>

                        {/* Member Rows */}
                        <div className="flex flex-col gap-3 pt-3 text-xs">
                          
                          {/* Amara Okafor */}
                          <div className="flex items-center justify-between">
                            <div className="w-32 flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                                AO
                              </div>
                              <span className="font-semibold text-[#0F172A] truncate">Amara Okafor</span>
                            </div>

                            {/* Heatmap cells */}
                            <div className="flex-1 flex justify-around max-w-sm px-2">
                              {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0].map((v, i) => (
                                <div
                                  key={i}
                                  className={`w-3.5 h-5 rounded-2xs ${
                                    v === 8 ? "bg-blue-600" : "bg-slate-100"
                                  }`}
                                />
                              ))}
                            </div>

                            <span className="w-16 text-right font-mono font-bold text-[#0F172A]">
                              15<span className="text-[10px] text-[#64748B] font-normal">h</span>
                            </span>

                            <div className="w-28 text-right flex items-center justify-end gap-2 font-mono">
                              <div className="w-10 bg-blue-600 h-1.5 rounded-full" />
                              <span className="font-bold text-[#0F172A]">10</span>
                            </div>
                          </div>

                          {/* Liam Gallagher */}
                          <div className="flex items-center justify-between">
                            <div className="w-32 flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                                LG
                              </div>
                              <span className="font-semibold text-[#0F172A] truncate">Liam Gallagher</span>
                            </div>

                            <div className="flex-1 flex justify-around max-w-sm px-2">
                              {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0].map((v, i) => (
                                <div
                                  key={i}
                                  className={`w-3.5 h-5 rounded-2xs ${
                                    v === 8 ? "bg-blue-600" : "bg-slate-100"
                                  }`}
                                />
                              ))}
                            </div>

                            <span className="w-16 text-right font-mono font-bold text-[#0F172A]">
                              14<span className="text-[10px] text-[#64748B] font-normal">h</span>
                            </span>

                            <div className="w-28 text-right flex items-center justify-end gap-2 font-mono">
                              <div className="w-6 bg-blue-600 h-1.5 rounded-full" />
                              <span className="font-bold text-[#0F172A]">6</span>
                              <span className="text-[9px] px-1 bg-amber-50 text-amber-700 border border-amber-200 rounded font-bold">1 late</span>
                            </div>
                          </div>

                          {/* Chloe Bennett */}
                          <div className="flex items-center justify-between">
                            <div className="w-32 flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                                CB
                              </div>
                              <span className="font-semibold text-[#0F172A] truncate">Chloe Bennett</span>
                            </div>

                            <div className="flex-1 flex justify-around max-w-sm px-2">
                              {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0].map((v, i) => (
                                <div
                                  key={i}
                                  className={`w-3.5 h-5 rounded-2xs ${
                                    v === 8 ? "bg-blue-600" : "bg-slate-100"
                                  }`}
                                />
                              ))}
                            </div>

                            <span className="w-16 text-right font-mono font-bold text-[#0F172A]">
                              9.5<span className="text-[10px] text-[#64748B] font-normal">h</span>
                            </span>

                            <div className="w-28 text-right flex items-center justify-end gap-2 font-mono">
                              <div className="w-6 bg-blue-600 h-1.5 rounded-full" />
                              <span className="font-bold text-[#0F172A]">6</span>
                            </div>
                          </div>

                        </div>

                        {/* ALL CREW Summary row */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                          <span className="w-32 text-[10px] font-mono text-[#64748B] uppercase">ALL CREW</span>
                          <div className="flex-1 flex justify-around max-w-sm px-2">
                            <div className="w-3.5 h-5 bg-blue-400 rounded-2xs ml-auto mr-12" />
                          </div>
                          <span className="w-16 text-right font-mono font-black text-[#0F172A]">
                            38.5<span className="text-[10px] text-[#64748B] font-normal">h</span>
                          </span>
                          <span className="w-28 text-right text-[10.5px] font-mono text-[#64748B]">
                            28 tracked · 3 late
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[10px] text-[#94A3B8] font-mono mt-3">
                      CAPACITY ALLOCATION · BALANCED
                    </div>
                  </div>

                  {/* CRW 2 Throughput bar chart */}
                  <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                            CRW 2
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A]">Throughput</h4>
                            <span className="text-[10px] text-[#64748B]">Tasks created vs completed · last 14 days</span>
                          </div>
                        </div>
                      </div>

                      {/* 3 Metrics: Completed, Created, Net Backlog */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold">COMPLETED</span>
                          <div className="text-2xl font-black text-[#0F172A] mt-0.5">10</div>
                        </div>
                        <div>
                          <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold">CREATED</span>
                          <div className="text-2xl font-black text-[#0F172A] mt-0.5">24</div>
                        </div>
                        <div>
                          <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold">NET BACKLOG</span>
                          <div className="text-2xl font-black text-[#0F172A] mt-0.5">+14</div>
                          <span className="text-[8.5px] text-[#94A3B8] block">Created – completed</span>
                        </div>
                      </div>

                      {/* Throughput 14-day Bar Chart */}
                      <div className="pt-3">
                        <div className="flex items-center gap-3 text-[10px] font-mono text-[#64748B] mb-2">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-2xs bg-slate-300" /> Created
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-2xs bg-blue-600" /> Completed
                          </span>
                        </div>

                        {/* Chart Bars */}
                        <div className="h-32 w-full flex items-end justify-between gap-1 pt-4 px-1">
                          {[
                            { d: "25", c: 0, comp: 0 },
                            { d: "26", c: 0, comp: 0 },
                            { d: "27", c: 0, comp: 0 },
                            { d: "28", c: 1, comp: 0 },
                            { d: "29", c: 0, comp: 0 },
                            { d: "30", c: 1, comp: 0 },
                            { d: "1", c: 2, comp: 0 },
                            { d: "2", c: 3, comp: 0 },
                            { d: "3", c: 4, comp: 0 },
                            { d: "4", c: 4, comp: 0 },
                            { d: "Today", c: 10, comp: 8, current: true },
                          ].map((b, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                              <div className="w-full flex items-end justify-center h-24">
                                <div
                                  className={`w-2 rounded-t-2xs ${
                                    b.current ? "bg-blue-600" : "bg-slate-300"
                                  }`}
                                  style={{ height: `${b.c * 9}%` }}
                                />
                              </div>
                              <span className={`text-[8.5px] font-mono ${
                                b.current ? "font-bold text-[#0F172A]" : "text-[#94A3B8]"
                              }`}>
                                {b.d}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[10px] text-[#94A3B8] flex items-center gap-1 mt-3">
                      <HelpCircle size={11} />
                      <span>Weekends are included; zero days stay visible.</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* ========================================================= */}
              {/* 6. SECTION: COM CLIENTS & SUPPORT (SCREENSHOT 5) */}
              {/* ========================================================= */}
              <div className="flex flex-col gap-4">
                {/* Section Header */}
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-[#0F172A] text-white font-mono text-[9px] rounded font-bold uppercase">
                    COM
                  </span>
                  <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
                    Clients & support
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    Tickets, proposals and relationship health
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  
                  {/* COM 1 Support comms */}
                  <div className="lg:col-span-6 bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                            COM 1
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A]">Support comms</h4>
                            <span className="text-[10px] text-[#64748B]">Ticket traffic · last 14 days</span>
                          </div>
                        </div>
                        <ArrowRight size={13} className="text-[#94A3B8]" />
                      </div>

                      {/* 3 Metrics */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold">OPEN TICKETS</span>
                          <div className="text-2xl font-black text-[#0F172A] mt-0.5">2</div>
                        </div>
                        <div>
                          <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold">SLA BREACHES TODAY</span>
                          <div className="text-2xl font-black text-[#0F172A] mt-0.5">0</div>
                        </div>
                        <div>
                          <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold">OVERDUE TICKETS</span>
                          <div className="text-2xl font-black text-[#0F172A] mt-0.5">0</div>
                        </div>
                      </div>

                      {/* Support Traffic 14 days Bar Chart */}
                      <div className="pt-3">
                        <div className="flex items-center gap-4 text-[10px] font-mono text-[#64748B] mb-2">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-2xs bg-slate-300" /> Opened <b className="text-[#0F172A]">2</b>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-2xs bg-blue-600" /> Resolved <b className="text-[#0F172A]">0</b>
                          </span>
                        </div>

                        {/* Chart */}
                        <div className="h-28 w-full flex items-end justify-between gap-1 pt-4 px-2">
                          {[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0].map((v, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center">
                              <div className="w-full flex items-end justify-center h-20">
                                <div
                                  className={`w-2.5 rounded-t-2xs ${
                                    v > 0 ? "bg-slate-300" : "bg-slate-100"
                                  }`}
                                  style={{ height: v > 0 ? "45px" : "3px" }}
                                />
                              </div>
                              <span className="text-[8px] font-mono text-[#94A3B8] mt-1">—</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[10px] text-emerald-600 font-mono mt-3 flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      <span>ALL OPEN TICKETS WITHIN TARGET RESPONSE WINDOW</span>
                    </div>
                  </div>

                  {/* COM 2 Client pipeline */}
                  <div className="lg:col-span-6 bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                            COM 2
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A]">Client pipeline</h4>
                            <span className="text-[10px] text-[#64748B]">Proposals awaiting decision, CRM stages and relationship health</span>
                          </div>
                        </div>

                        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                          <span>Organizations</span>
                          <ArrowRight size={11} />
                        </button>
                      </div>

                      {/* Top Metrics Row */}
                      <div className="grid grid-cols-2 gap-3 pt-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold">AWAITING DECISION</span>
                          <div className="text-2xl font-black text-[#0F172A] mt-0.5">0</div>
                          <span className="text-[10.5px] text-blue-600 hover:underline cursor-pointer block mt-0.5 font-medium">
                            Proposals →
                          </span>
                        </div>
                        <div>
                          <span className="text-[9.5px] font-mono uppercase text-[#64748B] font-semibold">PIPELINE VALUE</span>
                          <div className="text-2xl font-black text-[#0F172A] mt-0.5">$0</div>
                          <span className="text-[10px] text-[#64748B] block mt-0.5">
                            Sent and viewed proposals
                          </span>
                        </div>
                      </div>

                      {/* CRM Stages & Acceptance Rate */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {/* Left: Acceptance Rate Progress Bar */}
                        <div>
                          <div className="flex items-center justify-between text-[10.5px]">
                            <span className="font-mono text-[#64748B] uppercase tracking-wider font-semibold">
                              ACCEPTANCE RATE
                            </span>
                            <span className="font-mono font-bold text-[#0F172A] text-sm">100%</span>
                          </div>
                          <div className="w-full bg-blue-600 h-2 rounded-full mt-2" />
                          <div className="flex items-center justify-between text-[9px] font-mono text-[#94A3B8] mt-1.5">
                            <span>0</span>
                            <span>50</span>
                            <span>100</span>
                          </div>
                          <span className="text-[10px] text-[#64748B] block mt-2">
                            Accepted proposals as a share of accepted and declined proposals.
                          </span>
                        </div>

                        {/* Right: CRM Stages */}
                        <div>
                          <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider font-semibold block mb-2">
                            CRM STAGES
                          </span>
                          <div className="flex flex-col gap-1.5 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[#64748B] text-[11px]">Lead</span>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-slate-100 h-1.5 rounded-full" />
                                <span className="font-mono font-bold text-[#0F172A]">0</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-[#64748B] text-[11px]">Contacted</span>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-slate-100 h-1.5 rounded-full" />
                                <span className="font-mono font-bold text-[#0F172A]">0</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-[#64748B] text-[11px]">Proposal Sent</span>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-slate-100 h-1.5 rounded-full" />
                                <span className="font-mono font-bold text-[#0F172A]">0</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-[#0F172A] font-semibold text-[11px]">Active</span>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-blue-600 h-1.5 rounded-full" />
                                <span className="font-mono font-bold text-[#0F172A]">4</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-[#64748B] text-[11px]">Conversion rate</span>
                            <span className="font-mono font-black text-emerald-600 text-sm">100%</span>
                          </div>
                          <span className="text-[9.5px] text-[#94A3B8] block mt-0.5">
                            Active ÷ all organizations in a pipeline stage.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[10px] text-[#94A3B8] font-mono mt-3">
                      ORGANIZATIONS CRM PIPELINE · HEALTHY
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom status line */}
              <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-4 border-t border-slate-200/80">
                <span className="flex items-center gap-1.5">
                  <Clock size={11} /> Automatically refreshed every minute · Mission Control live telemetry
                </span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                  <RotateCw size={11} /> Refresh
                </span>
              </div>

            </div>
          )}

          {/* VIEW 2: PROJECTS PORTFOLIO (100% IDENTICAL TO SCREENSHOT 11) */}
          {currentView === "projects" && (
            <div className="p-4 sm:p-5 flex flex-col gap-4 animate-fadeIn">
              
              {/* Top 4 Metrics Cards - Continuous card container with dividers */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0] overflow-hidden">
                {/* 1. Active Delivery */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-[#64748B] font-semibold tracking-wider">ACTIVE DELIVERY</span>
                      <span className="text-[9.5px] font-medium text-emerald-700 bg-[#E8FAF0] px-2 py-0.5 rounded-full border border-[#B7F4D0] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> All on track
                      </span>
                    </div>
                    <div className="mt-2.5 flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-[#0F172A] leading-none">11</span>
                      <span className="text-xs text-[#64748B]">in delivery</span>
                    </div>
                    {/* Multi-segment bar */}
                    <div className="h-1.5 w-full bg-slate-100 rounded-full flex overflow-hidden mt-3">
                      <div className="w-[32%] bg-[#64748B]" />
                      <div className="w-[45%] bg-[#2563EB]" />
                      <div className="w-[8%] bg-[#EAB308]" />
                      <div className="w-[5%] bg-[#10B981]" />
                      <div className="w-[10%] bg-[#F43F5E]" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] text-[#64748B] mt-2.5 pt-1">
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]" /> Not Started <b className="text-[#0F172A]">6</b></span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" /> In Progress <b className="text-[#0F172A]">11</b></span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" /> In Review <b className="text-[#0F172A]">0</b></span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" /> On Hold <b className="text-[#0F172A]">2</b></span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Completed <b className="text-[#0F172A]">1</b></span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E]" /> Cancelled <b className="text-[#0F172A]">1</b></span>
                    </div>
                  </div>
                  <div className="pt-2 text-[9.5px] text-[#64748B] border-t border-slate-100 mt-2 font-medium">
                    <b>21 projects</b> · 5% delivered
                  </div>
                </div>

                {/* 2. Delivered */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10.5px] text-[#64748B] font-medium flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-600" /> Delivered
                    </span>
                    <div className="mt-2.5">
                      <span className="text-3xl font-extrabold text-[#0F172A] leading-none">1</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
                      <div className="w-[5%] bg-emerald-500 h-full rounded-full" />
                    </div>
                  </div>
                  <div className="pt-2 text-[9.5px] text-[#64748B] border-t border-slate-100 mt-2">
                    5% of the portfolio
                  </div>
                </div>

                {/* 3. Operational Stability */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10.5px] text-[#64748B] font-medium flex items-center gap-1.5">
                      <Clock size={13} className="text-blue-600" /> Operational stability
                    </span>
                    <div className="mt-2.5">
                      <span className="text-3xl font-extrabold text-[#0F172A] leading-none">100%</span>
                    </div>
                    <div className="h-1.5 w-full bg-blue-600 rounded-full mt-3" />
                  </div>
                  <div className="pt-2 text-[9.5px] text-[#64748B] border-t border-slate-100 mt-2">
                    21 of 21 projects clear of risk
                  </div>
                </div>

                {/* 4. Needs Attention */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10.5px] text-[#64748B] font-medium flex items-center gap-1.5">
                      <AlertTriangle size={13} className="text-slate-400" /> Needs Attention
                    </span>
                    <div className="mt-2.5">
                      <span className="text-3xl font-extrabold text-[#0F172A] leading-none">0</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3" />
                  </div>
                  <div className="pt-2 text-[9.5px] text-[#64748B] border-t border-slate-100 mt-2">
                    No delivery risks flagged
                  </div>
                </div>
              </div>

              {/* AI Delivery Insight Banner */}
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                    <Sparkles size={13} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#0F172A]">Delivery insight</span>
                      <span className="text-[9.5px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                        ● All on track
                      </span>
                    </div>
                    <span className="text-[10.5px] text-[#64748B]">
                      <b>11 active</b> of 21 projects, 1 delivered. No delivery risks flagged right now.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-[10.5px] font-normal text-[#475569]">
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-slate-50 cursor-pointer flex items-center gap-1 text-slate-700">
                    <AlertTriangle size={11} className="text-amber-500" /> Roadblock audit
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-slate-50 cursor-pointer flex items-center gap-1 text-slate-700">
                    <CheckSquare size={11} className="text-slate-500" /> Task velocity
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-slate-50 cursor-pointer flex items-center gap-1 text-slate-700">
                    <ArrowRight size={11} className="text-slate-500" /> Milestone catch-up
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-slate-50 cursor-pointer flex items-center gap-1 font-medium text-slate-800">
                    <Sparkles size={11} className="text-slate-700" /> Delivery briefing <ChevronDown size={10} className="text-slate-400" />
                  </span>
                </div>
              </div>

              {/* Toolbar & Filters (100% Matching Screenshot media_1791148622900.png) */}
              <div className="flex items-center justify-between gap-2 pt-1 border-b border-[#E2E8F0] pb-2 text-xs overflow-x-auto no-scrollbar">
                {/* Left Tabs */}
                <div className="flex items-center gap-4 shrink-0">
                  <button
                    onClick={() => setActiveProjectTab("all")}
                    className={`pb-1.5 -mb-2 font-semibold transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap text-xs ${
                      activeProjectTab === "all" ? "border-blue-600 text-[#0F172A]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span>All Projects</span>
                    <span className="font-mono text-[9.5px] px-1.5 py-0.2 rounded-full bg-[#EFF6FF] text-[#2563EB] font-semibold">21</span>
                  </button>
                  <button
                    onClick={() => setActiveProjectTab("active")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap text-xs ${
                      activeProjectTab === "active" ? "border-blue-600 text-[#0F172A]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span>Active delivery</span>
                    <span className="font-mono text-[9.5px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-medium">11</span>
                  </button>
                  <button
                    onClick={() => setActiveProjectTab("attention")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 whitespace-nowrap text-xs ${
                      activeProjectTab === "attention" ? "border-blue-600 text-[#0F172A]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    Needs Attention
                  </button>
                  <button
                    onClick={() => setActiveProjectTab("delivered")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 flex items-center gap-1 whitespace-nowrap text-xs ${
                      activeProjectTab === "delivered" ? "border-blue-600 text-[#0F172A]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span>Delivered</span>
                  </button>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Search Capsule */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#E2E8F0] rounded-full text-xs text-[#64748B] shadow-2xs">
                    <Search size={12} className="text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8]">Search projects...</span>
                    <kbd className="text-[9px] font-mono bg-[#F1F5F9] text-slate-500 px-1 rounded">/</kbd>
                  </div>

                  {/* 3 Tool Icons in Capsule Border Container */}
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-full text-slate-400">
                    <button className="hover:text-slate-700 transition-colors">
                      <CheckCircle2 size={13} />
                    </button>
                    <button className="hover:text-slate-700 transition-colors">
                      <Flag size={13} />
                    </button>
                    <button className="hover:text-slate-700 transition-colors">
                      <Users size={13} />
                    </button>
                  </div>

                  {/* Segmented View Mode: Icon-Only [Cards/Grid | Table | Board] */}
                  <div className="flex items-center bg-[#F1F5F9] border border-[#E2E8F0] rounded-full p-0.5 text-xs text-[#64748B]">
                    <button
                      onClick={() => setProjectViewMode("cards")}
                      className={`p-1 rounded-full transition-colors ${
                        projectViewMode === "cards" ? "bg-white text-[#0F172A] shadow-xs" : "hover:text-slate-900"
                      }`}
                      title="Cards View"
                    >
                      <LayoutGrid size={13} />
                    </button>
                    <button
                      onClick={() => setProjectViewMode("table")}
                      className={`p-1 rounded-full transition-colors ${
                        projectViewMode === "table" ? "bg-white text-[#0F172A] shadow-xs" : "hover:text-slate-900"
                      }`}
                      title="Table View"
                    >
                      <List size={13} />
                    </button>
                    <button
                      className="p-1 rounded-full transition-colors hover:text-slate-900"
                      title="Board View"
                    >
                      <Table size={13} />
                    </button>
                  </div>

                  {/* Primary CTA Button */}
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold flex items-center gap-1 shadow-xs whitespace-nowrap">
                    <Plus size={13} /> New project <kbd className="text-[9px] bg-blue-700 px-1 rounded ml-0.5 font-normal">n</kbd>
                  </button>
                </div>
              </div>

              {/* 8 Projects Cards Grid (4 cols x 2 rows) - Clean refined typography and weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    ref: projectCardRef,
                    init: "SA",
                    color: "bg-blue-600 text-white",
                    client: "Apex Architecture",
                    title: "Apex Architecture — Custom Website & Portfolio",
                    status: "Not Started",
                    health: "On Track",
                    tasksLabel: "No tasks yet",
                    progress: 0,
                    openTasks: 0,
                    lateTasks: 0,
                    activity: "25d ago",
                    activityColor: "text-red-500",
                    avatar: "TS",
                    date: "No deadline",
                  },
                  {
                    init: "CC",
                    color: "bg-emerald-600 text-white",
                    client: "Creative Core LLC",
                    title: "Enterprise E-Commerce Platform Rebrand",
                    status: "Not Started",
                    health: "On Track",
                    tasksLabel: "No tasks yet",
                    progress: 0,
                    openTasks: 0,
                    lateTasks: 0,
                    activity: "25d ago",
                    activityColor: "text-red-500",
                    avatar: "AM",
                    date: "No deadline",
                  },
                  {
                    init: "CU",
                    color: "bg-teal-600 text-white",
                    client: "CloudScale Unit",
                    title: "SaaS Infrastructure & Design System",
                    status: "Not Started",
                    health: "On Track",
                    tasksLabel: "No tasks yet",
                    progress: 0,
                    openTasks: 0,
                    lateTasks: 0,
                    activity: "25d ago",
                    activityColor: "text-red-500",
                    avatar: "AM",
                    date: "No deadline",
                  },
                  {
                    init: "WM",
                    color: "bg-indigo-600 text-white",
                    client: "Wave Media LLC",
                    title: "Website Maintenance Retainer & SLA",
                    status: "Completed",
                    health: "On Track",
                    tasksLabel: "2/2 tasks",
                    progress: 100,
                    openTasks: 0,
                    lateTasks: 0,
                    activity: "13d ago",
                    activityColor: "text-red-500",
                    avatar: "TS",
                    date: "Apr 29",
                  },
                  {
                    init: "RH",
                    color: "bg-rose-600 text-white",
                    client: "Riviera Homes",
                    title: "Dedicated Cloud VPS Hosting & Backups",
                    status: "Not Started",
                    health: "On Track",
                    tasksLabel: "No tasks yet",
                    progress: 0,
                    openTasks: 0,
                    lateTasks: 0,
                    activity: "43d ago",
                    activityColor: "text-red-500",
                    avatar: "AM",
                    date: "No deadline",
                  },
                  {
                    init: "WS",
                    color: "bg-red-600 text-white",
                    client: "WebCraft Studios",
                    title: "Headless WordPress & Next.js Migration",
                    status: "Not Started",
                    health: "On Track",
                    tasksLabel: "No tasks yet",
                    progress: 0,
                    openTasks: 0,
                    lateTasks: 0,
                    activity: "159d ago",
                    activityColor: "text-red-500",
                    avatar: "AM",
                    date: "No deadline",
                  },
                  {
                    init: "SO",
                    color: "bg-emerald-600 text-white",
                    client: "Skyline Media",
                    title: "Client Portal & Analytics Dashboard",
                    status: "In Progress",
                    health: "On Track",
                    tasksLabel: "7/7 tasks",
                    progress: 100,
                    openTasks: 0,
                    lateTasks: 0,
                    activity: "Today",
                    activityColor: "text-emerald-500",
                    avatar: "TS",
                    date: "No deadline",
                  },
                  {
                    init: "ZT",
                    color: "bg-amber-600 text-white",
                    client: "Zenith Tech",
                    title: "Mobile Application QA & Testing Suite",
                    status: "On Hold",
                    health: "On Track",
                    tasksLabel: "No tasks yet",
                    progress: 0,
                    openTasks: 0,
                    lateTasks: 0,
                    activity: "161d ago",
                    activityColor: "text-red-500",
                    avatar: "AM",
                    date: "No deadline",
                  },
                ].map((proj, idx) => (
                  <div
                    key={idx}
                    ref={proj.ref}
                    className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between gap-2.5 min-h-[190px]"
                  >
                    <div className="flex flex-col gap-2">
                      {/* Avatar + Client & Title */}
                      <div className="flex items-start gap-2">
                        <div className={`w-7 h-7 rounded-full ${proj.color} font-medium text-[11px] flex items-center justify-center shrink-0`}>
                          {proj.init}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] text-[#64748B] block truncate leading-tight">{proj.client}</span>
                          <h4 className="text-[11.5px] font-semibold text-[#0F172A] leading-snug line-clamp-2 mt-0.5">
                            {proj.title}
                          </h4>
                        </div>
                      </div>

                      {/* Status + Health + Flag row */}
                      <div className="flex items-center gap-1.5 text-[9px]">
                        <span className={`px-1.5 py-0.5 rounded border font-medium ${
                          proj.status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          proj.status === "In Progress" ? "bg-blue-50 text-blue-700 border-blue-200" :
                          proj.status === "On Hold" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-slate-50 text-slate-600 border-slate-200"
                        }`}>
                          ● {proj.status}
                        </span>
                        <span className="px-1.5 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                          ● {proj.health}
                        </span>
                        <Flag size={10} className="text-slate-300 ml-auto" />
                      </div>

                      {/* Progress bar */}
                      <div className="flex flex-col gap-0.5 pt-0.5">
                        <div className="flex items-center justify-between text-[9.5px] text-[#64748B]">
                          <span>{proj.tasksLabel}</span>
                          <span className="font-mono text-[9.5px] font-medium text-[#0F172A]">{proj.progress}%</span>
                        </div>
                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${proj.progress === 100 ? "bg-[#16A34A]" : "bg-blue-600"}`}
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Inner mini-metrics box */}
                      <div className="p-1.5 bg-[#F8FAFC] border border-[#F1F5F9] rounded-lg grid grid-cols-3 gap-1 text-[8.5px] font-mono">
                        <div>
                          <span className="text-[#94A3B8] block text-[7.5px] uppercase">OPEN TASKS</span>
                          <span className="font-medium text-[#0F172A]">{proj.openTasks}</span>
                        </div>
                        <div>
                          <span className="text-[#94A3B8] block text-[7.5px] uppercase">LATE TASKS</span>
                          <span className="font-medium text-[#0F172A]">{proj.lateTasks}</span>
                        </div>
                        <div>
                          <span className="text-[#94A3B8] block text-[7.5px] uppercase">ACTIVITY</span>
                          <span className="font-normal text-[#0F172A] flex items-center gap-0.5 truncate">
                            <span className={`text-[5px] ${proj.activityColor}`}>●</span>
                            <span>{proj.activity}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Avatar + Due Date */}
                    <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] text-[#64748B]">
                      <div className="w-4 h-4 rounded-full bg-slate-700 text-white text-[7.5px] font-semibold flex items-center justify-center">
                        {proj.avatar}
                      </div>
                      <span className="font-mono text-[8.5px] text-[#94A3B8] flex items-center gap-1">
                        <Calendar size={9} /> {proj.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* VIEW 3: TASKS (100% IDENTICAL TO SCREENSHOT 19 & 20) */}
          {currentView === "tasks" && (
            <div className="p-4 sm:p-5 flex flex-col gap-4 animate-fadeIn">
              
              {/* Top 4 Metrics Cards - Continuous card container matching screenshot */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0] overflow-hidden">
                {/* 1. Active Work - 4 open tasks with 96% green bar */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#64748B] font-semibold tracking-wider">ACTIVE WORK</span>
                    <div className="mt-2.5 flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-[#0F172A] leading-none">4</span>
                      <span className="text-xs text-[#64748B]">open tasks</span>
                    </div>
                    {/* Segmented bar: 4% grey (open) and 96% emerald green (completed) */}
                    <div className="h-1.5 w-full bg-slate-100 rounded-full flex overflow-hidden mt-3">
                      <div className="w-[4%] bg-slate-400" />
                      <div className="w-[96%] bg-emerald-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] text-[#64748B] mt-2.5 pt-1">
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]" /> To Do <b className="text-[#0F172A]">2</b></span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" /> In Progress <b className="text-[#0F172A]">0</b></span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" /> In Review <b className="text-[#0F172A]">0</b></span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Done <b className="text-[#0F172A]">101</b></span>
                    </div>
                  </div>
                  <div className="pt-2 text-[9px] text-[#64748B] border-t border-slate-100 mt-2 font-medium">
                    <b>103 tasks in view</b> · 1 done this week · 96% completion rate · avg 627h to complete
                  </div>
                </div>

                {/* 2. Overdue */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10.5px] text-[#64748B] font-medium flex items-center gap-1.5">
                      <AlertTriangle size={13} className="text-slate-400" /> Overdue
                    </span>
                    <div className="mt-2.5">
                      <span className="text-3xl font-extrabold text-[#0F172A] leading-none">0</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3" />
                  </div>
                  <div className="pt-2 text-[9.5px] text-[#64748B] border-t border-slate-100 mt-2">
                    Nothing past due
                  </div>
                </div>

                {/* 3. Due Today */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10.5px] text-[#64748B] font-medium flex items-center gap-1.5">
                      <Clock size={13} className="text-amber-500" /> Due Today
                    </span>
                    <div className="mt-2.5">
                      <span className="text-3xl font-extrabold text-[#0F172A] leading-none">0</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3" />
                  </div>
                  <div className="pt-2 text-[9.5px] text-[#64748B] border-t border-slate-100 mt-2">
                    Open and due today
                  </div>
                </div>

                {/* 4. Due This Week */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10.5px] text-[#64748B] font-medium flex items-center gap-1.5">
                      <Calendar size={13} className="text-blue-500" /> Due This Week
                    </span>
                    <div className="mt-2.5">
                      <span className="text-3xl font-extrabold text-[#0F172A] leading-none">0</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3" />
                  </div>
                  <div className="pt-2 text-[9.5px] text-[#64748B] border-t border-slate-100 mt-2">
                    Open and due by the end of the week
                  </div>
                </div>
              </div>

              {/* Task Copilot Banner matching screenshot */}
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                    <Sparkles size={13} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#0F172A] block">Task Copilot</span>
                    <span className="text-[10.5px] text-[#64748B]">
                      <b>4 active tasks</b>: 0 overdue and 0 due today. 1 task completed this week.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-[10.5px] font-normal text-[#475569]">
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-slate-50 cursor-pointer flex items-center gap-1 text-slate-700">
                    <Zap size={11} className="text-blue-600" /> Plan my day
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-slate-50 cursor-pointer flex items-center gap-1 text-slate-700">
                    <Sparkles size={11} className="text-blue-600" /> Unblock overdue work
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-slate-50 cursor-pointer flex items-center gap-1 text-slate-700">
                    <TrendingUp size={11} className="text-blue-600" /> Summarize this week
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-slate-50 cursor-pointer flex items-center gap-1 font-medium text-slate-800">
                    <Sparkles size={11} className="text-slate-700" /> Workload briefing <ChevronDown size={10} className="text-slate-400" />
                  </span>
                </div>
              </div>

              {/* Toolbar & Filters (100% Matching Screenshot media_1791148582154.png) */}
              <div className="flex items-center justify-between gap-2 pt-1 border-b border-[#E2E8F0] pb-2 text-xs overflow-x-auto no-scrollbar">
                {/* Left Tabs */}
                <div className="flex items-center gap-4 shrink-0">
                  <button
                    onClick={() => setActiveTaskTab("all")}
                    className={`pb-1.5 -mb-2 font-semibold transition-colors border-b-2 whitespace-nowrap text-xs ${
                      activeTaskTab === "all" ? "border-blue-600 text-[#0F172A]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    All tasks
                  </button>
                  <button
                    onClick={() => setActiveTaskTab("overdue")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap text-xs ${
                      activeTaskTab === "overdue" ? "border-blue-600 text-[#0F172A]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span>Overdue</span>
                    <span className="font-mono text-[9.5px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-medium">0</span>
                  </button>
                  <button
                    onClick={() => setActiveTaskTab("today")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap text-xs ${
                      activeTaskTab === "today" ? "border-blue-600 text-[#0F172A]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span>Due Today</span>
                    <span className="font-mono text-[9.5px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-medium">0</span>
                  </button>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Search Capsule */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#E2E8F0] rounded-full text-xs text-[#64748B] shadow-2xs">
                    <Search size={12} className="text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8]">Search tasks...</span>
                    <kbd className="text-[9px] font-mono bg-[#F1F5F9] text-slate-500 px-1 rounded">/</kbd>
                  </div>

                  {/* 4 Tool Icons in Capsule Border Container */}
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-full text-slate-400">
                    <button className="hover:text-slate-700 transition-colors">
                      <CheckCircle2 size={13} />
                    </button>
                    <button className="hover:text-slate-700 transition-colors">
                      <Flag size={13} />
                    </button>
                    <button className="hover:text-slate-700 transition-colors">
                      <AlertTriangle size={13} />
                    </button>
                    <button className="hover:text-slate-700 transition-colors">
                      <FolderKanban size={13} />
                    </button>
                  </div>

                  {/* My Tasks Switch */}
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                    <div className="w-7 h-4 bg-slate-200 rounded-full p-0.5 cursor-pointer flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full shadow-xs" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 whitespace-nowrap">My Tasks</span>
                  </div>

                  {/* Filter Sliders Button */}
                  <button className="p-1 text-slate-400 hover:text-slate-700 transition-colors">
                    <SlidersHorizontal size={14} />
                  </button>

                  {/* Segmented View Mode: Icon-Only [List | Grid/Board | Users/Workload] */}
                  <div className="flex items-center bg-[#F1F5F9] border border-[#E2E8F0] rounded-full p-0.5 text-xs text-[#64748B]">
                    <button
                      onClick={() => setTaskViewMode("list")}
                      className={`p-1 rounded-full transition-colors ${
                        taskViewMode === "list" ? "bg-white text-[#0F172A] shadow-xs" : "hover:text-slate-900"
                      }`}
                      title="List View"
                    >
                      <List size={13} />
                    </button>
                    <button
                      ref={taskBoardToggleRef}
                      onClick={() => setTaskViewMode("board")}
                      className={`p-1 rounded-full transition-colors ${
                        taskViewMode === "board" ? "bg-white text-[#0F172A] shadow-xs" : "hover:text-slate-900"
                      }`}
                      title="Board View"
                    >
                      <LayoutGrid size={13} />
                    </button>
                    <button
                      className="p-1 rounded-full transition-colors hover:text-slate-900"
                      title="Workload View"
                    >
                      <Users size={13} />
                    </button>
                  </div>

                  {/* Primary CTA Button */}
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold flex items-center gap-1 shadow-xs whitespace-nowrap">
                    <Plus size={13} /> New task <kbd className="text-[9px] bg-blue-700 px-1 rounded ml-0.5 font-normal">n</kbd>
                  </button>
                </div>
              </div>

              {/* TASK VIEW MODE: LIST (Screenshot 19) */}
              {taskViewMode === "list" && (
                <div className="flex flex-col gap-3">
                  {/* GROUP: TO DO (2) */}
                  <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
                    <div className="bg-[#F8FAFC] px-3 py-2 border-b border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#0F172A]">
                      <div className="flex items-center gap-2">
                        <ChevronDown size={14} className="text-[#64748B]" />
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full font-mono text-[10px]">
                          TO DO
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">2</span>
                      </div>
                    </div>

                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAFAFA] border-b border-[#E2E8F0] text-[10px] font-mono uppercase text-[#64748B]">
                        <tr>
                          <th className="py-2 px-3">TASK</th>
                          <th className="py-2 px-3">PRIORITY</th>
                          <th className="py-2 px-3">HEALTH</th>
                          <th className="py-2 px-3">ASSIGNEE</th>
                          <th className="py-2 px-3">DUE DATE</th>
                          <th className="py-2 px-3">PROJECT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F5F9] text-[11.5px]">
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 hover:border-blue-500 cursor-pointer" />
                              <span className="font-semibold">Deploy Client Portal Custom Domain SSL</span>
                              <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                                <Paperclip size={10} /> 1
                              </span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-red-600 font-medium flex items-center gap-1 font-mono text-[10.5px]">
                              <Flag size={10} /> Urgent
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium">
                              ● On Track
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-slate-800 text-white text-[8px] font-bold flex items-center justify-center">
                                AM
                              </div>
                              <span className="text-[#475569]">Alex Miller</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[#94A3B8]">—</td>
                          <td className="py-2.5 px-3">
                            <span className="text-blue-600 font-medium flex items-center gap-1">
                              ● Client Onboarding
                            </span>
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 hover:border-blue-500 cursor-pointer" />
                              <span className="font-semibold">Brand Identity Guidelines & Asset Library</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-amber-600 font-medium flex items-center gap-1 font-mono text-[10.5px]">
                              <Flag size={10} /> Medium
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium">
                              ● On Track
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-[#94A3B8]">Unassigned</td>
                          <td className="py-2.5 px-3 font-mono text-[#94A3B8]">—</td>
                          <td className="py-2.5 px-3 text-[#94A3B8]">—</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="p-2 border-t border-slate-100 bg-[#FAFAFA]">
                      <button className="text-[11px] font-medium text-[#64748B] hover:text-[#0F172A] flex items-center gap-1">
                        <Plus size={11} /> Add task
                      </button>
                    </div>
                  </div>

                  {/* GROUP: IN PROGRESS (0) */}
                  <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-2xs flex items-center justify-between text-xs text-[#64748B]">
                    <div className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-[#94A3B8]" />
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-mono text-[10px]">
                        🕒 IN PROGRESS
                      </span>
                      <span className="text-[11px] font-mono text-[#94A3B8]">0</span>
                    </div>
                    <span className="text-[11px] text-[#94A3B8]">No tasks</span>
                  </div>

                  {/* GROUP: IN REVIEW (0) */}
                  <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-2xs flex items-center justify-between text-xs text-[#64748B]">
                    <div className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-[#94A3B8]" />
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-mono text-[10px]">
                        🕒 IN REVIEW
                      </span>
                      <span className="text-[11px] font-mono text-[#94A3B8]">0</span>
                    </div>
                    <span className="text-[11px] text-[#94A3B8]">No tasks</span>
                  </div>

                  {/* GROUP: DONE (101) */}
                  <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-2xs flex items-center justify-between text-xs text-[#64748B]">
                    <div className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-[#94A3B8]" />
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-mono text-[10px]">
                        ✓ DONE
                      </span>
                      <span className="text-[11px] font-mono text-[#94A3B8]">101</span>
                    </div>
                    <span className="text-[11px] text-[#94A3B8]">101 completed tasks</span>
                  </div>
                </div>
              )}

              {/* TASK VIEW MODE: KANBAN BOARD (100% IDENTICAL TO CROPPED SCREENSHOTS) */}
              {taskViewMode === "board" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 animate-fadeIn">
                  {/* Column 1: TO DO (2) */}
                  <div className="bg-[#EEF2F6]/60 border border-[#E2E8F0] border-t-2 border-t-slate-300 rounded-2xl p-2.5 flex flex-col gap-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs pb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full border border-slate-300 bg-white font-mono text-[10px] font-medium text-slate-700 flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full border border-slate-400" />
                          TO DO
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">2</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MoreHorizontal size={13} className="hover:text-slate-600 cursor-pointer" />
                        <Plus size={13} className="hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Card 1: Task Ultron */}
                    <div
                      ref={taskCardRef}
                      className="p-3 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow flex flex-col gap-2.5"
                    >
                      <h4 className="font-semibold text-xs text-[#0F172A] leading-tight">
                        Task Ultron
                      </h4>
                      <div className="flex items-center gap-2 text-[10.5px]">
                        <span className="text-amber-600 font-medium flex items-center gap-1">
                          <Flag size={11} /> Medium
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 font-mono text-[9.5px] flex items-center gap-1">
                          <Calendar size={10} className="text-slate-400" /> Oct 15
                        </span>
                      </div>
                      {/* Subtask checklist progress bar */}
                      <div className="flex items-center gap-2 text-slate-400 pt-0.5">
                        <CheckSquare size={12} className="text-slate-500 shrink-0" />
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full w-1/2" />
                        </div>
                        <span className="font-mono text-[10px] text-slate-500 shrink-0">1/2</span>
                      </div>
                      {/* Card footer: avatar, attachments/check count & arrow */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8.5px] font-medium shrink-0">
                          AM
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                            <CheckSquare size={11} className="text-slate-400" /> 3
                          </span>
                          <ArrowRight size={12} className="text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Kroma Mobile SDK & Merchant Tools */}
                    <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow flex flex-col gap-2.5">
                      <h4 className="font-semibold text-xs text-[#0F172A] leading-tight">
                        Kroma Mobile SDK & Merchant Tools
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10.5px]">
                        <span className="text-red-600 font-medium flex items-center gap-1">
                          <Flag size={11} /> Urgent
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-600 font-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>Internal Tasks</span>
                      </div>
                      {/* Card footer: avatar, attachments count & arrow */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8.5px] font-medium shrink-0">
                          AM
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                            <Paperclip size={11} className="text-slate-400" /> 1
                          </span>
                          <ArrowRight size={12} className="text-slate-400" />
                        </div>
                      </div>
                    </div>

                    <button className="py-2 text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 text-left px-1">
                      <Plus size={12} /> Add task
                    </button>
                  </div>

                  {/* Column 2: IN PROGRESS (0) */}
                  <div className="bg-[#EEF2F6]/60 border border-[#E2E8F0] border-t-2 border-t-blue-500 rounded-2xl p-2.5 flex flex-col justify-between min-h-[300px]">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between text-xs pb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full border border-blue-200 bg-blue-50/80 font-mono text-[10px] font-medium text-blue-700 flex items-center gap-1">
                            <Clock size={10} className="text-blue-600" />
                            IN PROGRESS
                          </span>
                          <span className="text-[11px] font-mono text-[#64748B]">0</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MoreHorizontal size={13} className="hover:text-slate-600 cursor-pointer" />
                          <Plus size={13} className="hover:text-slate-600 cursor-pointer" />
                        </div>
                      </div>

                      <div className="py-14 text-center text-xs text-slate-400">
                        Drop tasks here
                      </div>
                    </div>

                    <button className="py-2 text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 text-left px-1">
                      <Plus size={12} /> Add task
                    </button>
                  </div>

                  {/* Column 3: IN REVIEW (0) */}
                  <div className="bg-[#EEF2F6]/60 border border-[#E2E8F0] border-t-2 border-t-amber-500 rounded-2xl p-2.5 flex flex-col justify-between min-h-[300px]">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between text-xs pb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full border border-amber-200 bg-amber-50/80 font-mono text-[10px] font-medium text-amber-700 flex items-center gap-1">
                            <Clock size={10} className="text-amber-600" />
                            IN REVIEW
                          </span>
                          <span className="text-[11px] font-mono text-[#64748B]">0</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MoreHorizontal size={13} className="hover:text-slate-600 cursor-pointer" />
                          <Plus size={13} className="hover:text-slate-600 cursor-pointer" />
                        </div>
                      </div>

                      <div className="py-14 text-center text-xs text-slate-400">
                        Drop tasks here
                      </div>
                    </div>

                    <button className="py-2 text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 text-left px-1">
                      <Plus size={12} /> Add task
                    </button>
                  </div>

                  {/* Column 4: DONE (101) */}
                  <div className="bg-[#EEF2F6]/60 border border-[#E2E8F0] border-t-2 border-t-emerald-500 rounded-2xl p-2.5 flex flex-col gap-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs pb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 font-mono text-[10px] font-medium text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-emerald-600" />
                          DONE
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">101</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MoreHorizontal size={13} className="hover:text-slate-600 cursor-pointer" />
                        <Plus size={13} className="hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Card 1: TCT Task */}
                    <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow flex flex-col gap-2.5">
                      <h4 className="font-semibold text-xs text-[#0F172A] leading-tight">
                        TCT Task
                      </h4>
                      <div className="flex items-center gap-2 text-[10.5px]">
                        <span className="text-amber-600 font-medium flex items-center gap-1">
                          <Flag size={11} /> Medium
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 font-mono text-[9.5px] flex items-center gap-1">
                          <Calendar size={10} className="text-slate-400" /> Mar 25
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-600 font-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>Internal Tasks</span>
                      </div>
                      {/* Footer */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8.5px] font-medium shrink-0">
                          AM
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                            <Paperclip size={11} className="text-slate-400" /> 1
                          </span>
                          <ArrowRight size={12} className="text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Maintenance March */}
                    <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow flex flex-col gap-2.5">
                      <h4 className="font-semibold text-xs text-[#0F172A] leading-tight">
                        Maintenance March
                      </h4>
                      <div className="flex items-center gap-2 text-[10.5px]">
                        <span className="text-red-600 font-medium flex items-center gap-1">
                          <Flag size={11} /> Urgent
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 font-mono text-[9.5px] flex items-center gap-1">
                          <Calendar size={10} className="text-slate-400" /> Mar 30
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-600 font-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                        <span>Website Maintenance</span>
                      </div>
                      {/* Footer */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8.5px] font-medium shrink-0">
                          AM
                        </div>
                        <ArrowRight size={12} className="text-slate-400" />
                      </div>
                    </div>

                    {/* Card 3: AI connector Test */}
                    <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow flex flex-col gap-2.5">
                      <h4 className="font-semibold text-xs text-[#0F172A] leading-tight">
                        AI connector Test
                      </h4>
                      <div className="flex items-center gap-2 text-[10.5px]">
                        <span className="text-amber-600 font-medium flex items-center gap-1">
                          <Flag size={11} /> Medium
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 font-mono text-[9.5px] flex items-center gap-1">
                          <Calendar size={10} className="text-slate-400" /> Apr 17
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-600 font-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>Internal Tasks</span>
                      </div>
                      {/* Footer */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8.5px] font-medium shrink-0">
                          AM
                        </div>
                        <ArrowRight size={12} className="text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* VIEW 4: TICKETS (100% IDENTICAL TO SCREENSHOT 27) */}
          {currentView === "tickets" && (
            <div className="p-4 sm:p-5 flex flex-col gap-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap text-xs">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-[#64748B]">
                    <Search size={11} className="text-[#94A3B8]" />
                    <span className="text-[10.5px]">Search tickets... /</span>
                  </div>

                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg font-bold text-[#0F172A] shadow-xs">
                    All statuses
                  </span>
                  <span className="px-2.5 py-1 text-[#64748B] hover:bg-slate-100 rounded-lg cursor-pointer">
                    ● Open
                  </span>
                  <span className="px-2.5 py-1 text-[#64748B] hover:bg-slate-100 rounded-lg cursor-pointer">
                    ● In Progress
                  </span>
                  <span className="px-2.5 py-1 text-[#64748B] hover:bg-slate-100 rounded-lg cursor-pointer">
                    ● Waiting on Client
                  </span>
                  <span className="px-2.5 py-1 text-[#64748B] hover:bg-slate-100 rounded-lg cursor-pointer">
                    ● Closed
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white border border-[#E2E8F0] rounded-lg p-0.5 text-xs text-[#64748B]">
                    <span className="px-2 py-1 rounded bg-slate-100 font-bold text-[#0F172A]">List</span>
                    <span className="px-2 py-1 rounded">Board</span>
                    <span className="px-2 py-1 rounded">SLA</span>
                  </div>
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1">
                    <Plus size={12} /> New Ticket <kbd className="text-[9px] bg-blue-700 px-1 rounded ml-1">n</kbd>
                  </button>
                </div>
              </div>

              {/* Tickets Data Table */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-mono uppercase text-[#64748B]">
                    <tr>
                      <th className="py-2.5 px-3">ID</th>
                      <th className="py-2.5 px-3">TITLE</th>
                      <th className="py-2.5 px-3">ORGANIZATIONS</th>
                      <th className="py-2.5 px-3">STATUS</th>
                      <th className="py-2.5 px-3">PRIORITY</th>
                      <th className="py-2.5 px-3">ASSIGNEE</th>
                      <th className="py-2.5 px-3">REPLIES</th>
                      <th className="py-2.5 px-3 text-right">UPDATED</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9] text-[11.5px]">
                    {[
                      { id: "TKT-29", title: "Apex Architecture DNS Propagation", org: "Apex Studio", status: "Closed", priority: "High", priorityColor: "text-orange-600", replies: 4, updated: "5d ago" },
                      { id: "TKT-28", title: "Client Portal Login Authentication", org: "Creative Core", status: "Closed", priority: "High", priorityColor: "text-orange-600", replies: 4, updated: "6d ago" },
                      { id: "TKT-24", title: "API Webhook Retry Failure Alert", org: "CloudScale", status: "In Progress", priority: "Critical", priorityColor: "text-red-600 font-bold", replies: 16, updated: "Sep 16" },
                      { id: "TKT-22", title: "Design Assets Update Request", org: "Zenith Brand", status: "Waiting on Client", priority: "Low", priorityColor: "text-slate-500", replies: 2, updated: "Sep 9" },
                      { id: "TKT-20", title: "Billing Cycle Invoice Adjustment", org: "Wave Media", status: "Closed", priority: "Urgent", priorityColor: "text-red-600 font-bold", replies: 2, updated: "Sep 9" },
                    ].map((tkt) => (
                      <tr key={tkt.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-mono text-[10.5px] text-[#64748B]">{tkt.id}</td>
                        <td className="py-2.5 px-3 font-semibold text-[#0F172A]">
                          {tkt.title} <span className="text-[9.5px] font-normal text-[#64748B] bg-slate-100 px-1 py-0.2 rounded ml-1">Support</span>
                        </td>
                        <td className="py-2.5 px-3 text-[#475569]">{tkt.org}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                            tkt.status === "Closed" ? "bg-slate-100 text-slate-600 border-slate-200" :
                            tkt.status === "In Progress" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            "bg-purple-50 text-purple-700 border-purple-200"
                          }`}>
                            {tkt.status}
                          </span>
                        </td>
                        <td className={`py-2.5 px-3 font-mono text-[10.5px] ${tkt.priorityColor}`}>
                          <Flag size={9} className="inline mr-1" /> {tkt.priority}
                        </td>
                        <td className="py-2.5 px-3 text-[#94A3B8]">Unassigned</td>
                        <td className="py-2.5 px-3 font-mono text-[#64748B]">💬 {tkt.replies}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-[#94A3B8]">{tkt.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 5: MESSAGES (Screenshot 26) */}
          {currentView === "messages" && (
            <div className="flex-1 flex overflow-hidden animate-fadeIn bg-white border-t border-[#E2E8F0]">
              {/* Channels Sidebar */}
              <div className="w-[210px] border-r border-[#E2E8F0] p-3 flex flex-col gap-3 shrink-0 bg-[#F8FAFC]">
                <div className="px-2 py-1 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#94A3B8]">
                  Search channels...
                </div>
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-[9.5px] font-mono text-[#94A3B8] uppercase font-bold px-1">PROJECTS</span>
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 font-bold text-[#0F172A] flex items-center justify-between">
                    <span className="truncate"># Internal Tasks</span>
                    <span className="text-[9px] font-mono text-blue-600">3d</span>
                  </div>
                  <div className="p-1.5 rounded-lg text-[#64748B] hover:bg-slate-100 truncate cursor-pointer">
                    # Apex Studio Website
                  </div>
                  <div className="p-1.5 rounded-lg text-[#64748B] hover:bg-slate-100 truncate cursor-pointer">
                    # Website Maintenance
                  </div>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 flex flex-col justify-between p-4 bg-white">
                <div className="flex flex-col gap-3 overflow-y-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="font-bold text-xs text-[#0F172A]"># Internal Tasks</h4>
                      <span className="text-[10px] text-[#64748B]">Project · 2 members</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      AM
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="font-bold text-[#0F172A]">Alex Miller</span>
                        <span className="text-[9.5px] text-[#94A3B8]">03:46 PM (pinned)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-100 text-xs text-[#0F172A] leading-relaxed max-w-md">
                        Welcome to the workspace! Let&apos;s keep all client deliverable updates synced right here.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      JL
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="font-bold text-[#0F172A]">Jordan Lee</span>
                        <span className="text-[9.5px] text-[#94A3B8]">04:12 PM</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-100 text-xs text-[#0F172A] leading-relaxed max-w-md">
                        Verified the custom domain SSL certificates. Everything is resolving correctly and ready for review.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8]">Type a message... (@ to mention, / for tools)</span>
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Send size={11} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floating bottom-right chat bubble icon (matching screenshot 03) */}
          <button
            onClick={() => setCopilotOpen(!copilotOpen)}
            className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 z-20"
          >
            <MessageSquare size={16} />
          </button>

          {/* 3. AUTHENTIC AI COPILOT POPUP DRAWER (100% MATCHING SCREENSHOT 01) */}
          {copilotOpen && (
            <>
              {/* Translucent backdrop overlay */}
              <div
                onClick={() => setCopilotOpen(false)}
                onWheel={(e) => e.preventDefault()}
                onTouchMove={(e) => e.preventDefault()}
                className="absolute inset-0 bg-slate-900/10 backdrop-blur-[0.5px] z-30 transition-opacity animate-fadeIn touch-none overscroll-none"
              />

              {/* Slide-over Popup Drawer */}
              <aside 
                className="absolute top-0 right-0 bottom-0 w-full sm:w-[380px] max-w-full bg-white border-l border-[#E2E8F0] shadow-2xl z-40 flex flex-col justify-between select-none animate-in slide-in-from-right duration-250 overscroll-contain"
                onWheel={(e) => e.stopPropagation()}
              >
                <div 
                  className="p-4 flex flex-col gap-3.5 overflow-y-auto no-scrollbar overscroll-contain"
                  onWheel={(e) => e.stopPropagation()}
                >
                  
                  {/* Popup Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
                        <Sparkles size={14} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A] leading-none">AI Copilot</h4>
                        <span className="text-[10px] text-[#64748B]">Project Manager</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <History size={13} className="hover:text-slate-700 cursor-pointer" />
                      <Maximize2 size={13} className="hover:text-slate-700 cursor-pointer" />
                      <button
                        ref={copilotCloseRef}
                        onClick={() => setCopilotOpen(false)}
                        className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Greeting & Scope (Screenshot 01) */}
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A]">
                      Good evening, Julian
                    </h3>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      Ask about Dashboard or anything else you can access.
                    </p>
                  </div>

                  {/* SUGGESTED Section */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9.5px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">
                      SUGGESTED
                    </span>

                    <button
                      onClick={() => {
                        setCopilotQuery("What can you help me with using my current access?");
                      }}
                      className="text-left p-2.5 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200/80 rounded-xl text-[11px] text-[#334155] transition-colors leading-snug flex items-start gap-2"
                    >
                      <MessageSquare size={13} className="text-[#94A3B8] shrink-0 mt-0.5" />
                      <span>What can you help me with using my current access?</span>
                    </button>

                    <button
                      ref={copilotChipRef}
                      onClick={() => {
                        setCopilotQuery("Find blockers, unfinished checklist items and the next tasks to prioritize.");
                      }}
                      className="text-left p-2.5 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200/80 rounded-xl text-[11px] text-[#334155] transition-colors leading-snug flex items-start gap-2"
                    >
                      <MessageSquare size={13} className="text-[#94A3B8] shrink-0 mt-0.5" />
                      <span>Find blockers, unfinished checklist items and the next tasks to prioritize.</span>
                    </button>

                    <button
                      onClick={() => {
                        setCopilotQuery("Review project progress, milestones, approvals and missing deliverables.");
                      }}
                      className="text-left p-2.5 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200/80 rounded-xl text-[11px] text-[#334155] transition-colors leading-snug flex items-start gap-2"
                    >
                      <MessageSquare size={13} className="text-[#94A3B8] shrink-0 mt-0.5" />
                      <span>Review project progress, milestones, approvals and missing deliverables.</span>
                    </button>
                  </div>

                  {/* DRAFT WITH AI Grid (2x2) */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9.5px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">
                      DRAFT WITH AI
                    </span>

                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="p-2 bg-[#F8FAFC] border border-slate-200/80 rounded-xl flex flex-col gap-0.5 hover:bg-slate-100 cursor-pointer">
                        <span className="font-bold text-[11px] text-[#0F172A] flex items-center gap-1">
                          <CheckSquare size={10} className="text-blue-600" /> Task breakdown
                        </span>
                        <span className="text-[9.5px] text-[#64748B]">Plan a task with checklist</span>
                      </div>

                      <div className="p-2 bg-[#F8FAFC] border border-slate-200/80 rounded-xl flex flex-col gap-0.5 hover:bg-slate-100 cursor-pointer">
                        <span className="font-bold text-[11px] text-[#0F172A] flex items-center gap-1">
                          <Ticket size={10} className="text-indigo-600" /> Ticket triage
                        </span>
                        <span className="text-[9.5px] text-[#64748B]">Classify and draft a reply</span>
                      </div>

                      <div className="p-2 bg-[#F8FAFC] border border-slate-200/80 rounded-xl flex flex-col gap-0.5 hover:bg-slate-100 cursor-pointer">
                        <span className="font-bold text-[11px] text-[#0F172A] flex items-center gap-1">
                          <MessageSquare size={10} className="text-emerald-600" /> Polish message
                        </span>
                        <span className="text-[9.5px] text-[#64748B]">Rewrite in the right tone</span>
                      </div>

                      <div className="p-2 bg-[#F8FAFC] border border-slate-200/80 rounded-xl flex flex-col gap-0.5 hover:bg-slate-100 cursor-pointer">
                        <span className="font-bold text-[11px] text-[#0F172A] flex items-center gap-1">
                          <FileText size={10} className="text-amber-600" /> Proposal draft
                        </span>
                        <span className="text-[9.5px] text-[#64748B]">Scope, items and pricing</span>
                      </div>
                    </div>
                  </div>

                  {/* RECENT Section */}
                  <div className="flex flex-col gap-1 pt-1 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">RECENT</span>
                      <span className="text-blue-600 hover:underline cursor-pointer">View all</span>
                    </div>
                    <div className="flex items-center justify-between text-[10.5px] text-[#475569] py-0.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <History size={11} className="text-[#94A3B8]" />
                        <span className="truncate">can you create task?</span>
                      </div>
                      <span className="text-[9.5px] text-[#94A3B8] shrink-0 font-mono">3 days ago</span>
                    </div>
                    <div className="flex items-center justify-between text-[10.5px] text-[#475569] py-0.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <History size={11} className="text-[#94A3B8]" />
                        <span className="truncate">can you create these 3 tasks? under internal tasks...</span>
                      </div>
                      <span className="text-[9.5px] text-[#94A3B8] shrink-0 font-mono">3 days ago</span>
                    </div>
                  </div>

                  {/* Security & Access Notice */}
                  <div className="flex flex-col gap-1 text-[9.5px] text-[#64748B] pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={11} className="text-emerald-600" />
                      <span>Answers use only records your role can access, and cite their sources.</span>
                    </span>
                    <span className="text-blue-600 font-medium cursor-pointer pl-3.5">
                      Available areas (16)
                    </span>
                  </div>

                  {/* Simulated Response */}
                  {copilotSubmitted && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-[#0F172A] flex flex-col gap-1.5 animate-fadeIn">
                      <div className="flex items-center gap-1 text-emerald-800 font-bold text-[10.5px]">
                        <Check size={12} />
                        <span>Workspace Status Summary:</span>
                      </div>
                      <span className="text-[10px] text-slate-700 leading-relaxed">
                        • 11 projects on schedule with 0 delivery risks flagged<br />
                        • Priority: 1 overdue invoice ($4,800) and 8 tasks due within 72h<br />
                        • 0 overdue items requiring escalation
                      </span>
                    </div>
                  )}

                </div>

                {/* Copilot Bottom Input Box */}
                <div className="p-3.5 bg-white border-t border-[#E2E8F0] flex flex-col gap-2">
                  <div className="flex items-center gap-2 p-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                    <input
                      type="text"
                      value={copilotQuery}
                      onChange={(e) => setCopilotQuery(e.target.value)}
                      placeholder="Ask about your work, or type / for tools"
                      className="flex-1 bg-transparent border-none outline-none text-xs text-[#0F172A] placeholder-[#94A3B8]"
                    />
                    <button
                      ref={copilotSendRef}
                      onClick={() => {
                        if (copilotQuery.trim()) {
                          setCopilotSubmitted(true);
                        }
                      }}
                      className="w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-2xs shrink-0"
                    >
                      <ArrowRight size={12} className="-rotate-90" />
                    </button>
                  </div>
                  <span className="text-[9px] text-[#94A3B8] leading-tight text-center">
                    Enter to send · Shift+Enter for a new line · / for tools · ↑ to edit last question
                  </span>
                </div>
              </aside>
            </>
          )}

          {/* 4. COMMAND PALETTE MODAL (Screenshot 02) */}
          {commandPaletteOpen && (
            <>
              <div
                onClick={() => setCommandPaletteOpen(false)}
                className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] z-40 transition-opacity animate-fadeIn"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[540px] bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] z-50 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 select-none">
                {/* Search input header */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E2E8F0]">
                  <Search size={16} className="text-[#94A3B8]" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search or type a command..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-[#0F172A] placeholder-[#94A3B8]"
                  />
                  <kbd className="text-[10px] bg-[#F1F5F9] text-[#64748B] px-1.5 py-0.5 rounded font-mono border border-slate-200">
                    esc
                  </kbd>
                </div>

                {/* Navigation Group */}
                <div className="p-2 flex flex-col gap-0.5 max-h-[360px] overflow-y-auto no-scrollbar">
                  <span className="text-[9.5px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold px-3 py-1.5">
                    NAVIGATION
                  </span>

                  {[
                    { label: "Dashboard", view: "dashboard" as const, icon: LayoutDashboard, active: true },
                    { label: "Projects", view: "projects" as const, icon: FolderKanban },
                    { label: "Tasks", view: "tasks" as const, icon: CheckSquare },
                    { label: "Settings", icon: Settings },
                    { label: "Organizations", icon: Building2 },
                    { label: "Services", icon: Boxes },
                    { label: "Digital Assets", icon: Boxes },
                    { label: "Proposals", icon: FileText },
                    { label: "Invoices", icon: Receipt },
                    { label: "Team", icon: Users },
                    { label: "Messages", view: "messages" as const, icon: MessageSquare },
                    { label: "Reports", icon: BarChart3 },
                    { label: "Intake Forms", icon: FileText },
                    { label: "Bug Reports", icon: Bug },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          if (item.view) {
                            setCurrentView(item.view);
                          }
                          setCommandPaletteOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                          item.active
                            ? "bg-[#F1F5F9] text-[#0F172A] font-semibold"
                            : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={14} className={item.active ? "text-[#0F172A]" : "text-[#64748B]"} />
                          <span>{item.label}</span>
                        </div>
                        {item.active && (
                          <span className="text-[11px] text-[#94A3B8] font-mono">↵</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Modal Footer */}
                <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center gap-4 text-[10.5px] text-[#64748B] font-mono">
                  <span className="flex items-center gap-1">
                    <span className="bg-white border border-slate-200 px-1 rounded shadow-2xs">↑</span>
                    <span className="bg-white border border-slate-200 px-1 rounded shadow-2xs">↓</span>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="bg-white border border-slate-200 px-1.5 rounded shadow-2xs">↵</span>
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="bg-white border border-slate-200 px-1.5 rounded shadow-2xs">esc</span>
                    close
                  </span>
                </div>
              </div>
            </>
          )}

        </main>
      </div>

      {/* 4. REALISTIC ANIMATED VIRTUAL CURSOR */}
      {cursorPos.visible && (
        <div
          className="absolute z-50 pointer-events-none transition-all duration-700 ease-out flex items-center justify-center"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: cursorClicked ? "scale(0.85)" : "scale(1)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
          >
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill="#0F172A"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>

          {cursorClicked && (
            <span className="absolute -inset-1 rounded-full bg-blue-500/30 animate-ping" />
          )}
        </div>
      )}

    </div>
  );
}
