"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Sparkles,
  LayoutDashboard,
  Building,
  FileText,
  FolderKanban,
  CheckSquare,
  Package,
  Users,
  MessageSquare,
  Ticket,
  Receipt,
  CreditCard,
  BarChart3,
  FileSpreadsheet,
  Bug,
  Lock,
  ArrowRight,
  X,
  Check,
  RotateCw,
  Settings,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Moon,
  Clock,
  History,
  Maximize2,
  Send,
  Flag,
  Calendar,
  CheckCircle2,
} from "lucide-react";

export type ViewType = "dashboard" | "projects" | "tasks" | "messages" | "tickets";

export default function HeroAppWindow() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [copilotOpen, setCopilotOpen] = useState(true); // Open by default matching screenshot 01!
  const [copilotQuery, setCopilotQuery] = useState("");
  const [copilotSubmitted, setCopilotSubmitted] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(4); // Oct 4
  const [activeWorkTab, setActiveWorkTab] = useState<string>("all");
  const [cursorPos, setCursorPos] = useState({ x: 420, y: 220, visible: true });
  const [cursorClicked, setCursorClicked] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isCancelledRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Interactive targets for virtual cursor
  const openBoardBtnRef = useRef<HTMLButtonElement>(null);
  const navProjectsRef = useRef<HTMLButtonElement>(null);
  const navTasksRef = useRef<HTMLButtonElement>(null);
  const navTicketsRef = useRef<HTMLButtonElement>(null);
  const navMessagesRef = useRef<HTMLButtonElement>(null);
  const navDashboardRef = useRef<HTMLButtonElement>(null);
  const copilotToggleRef = useRef<HTMLButtonElement>(null);
  const copilotChipRef = useRef<HTMLButtonElement>(null);
  const copilotSendRef = useRef<HTMLButtonElement>(null);
  const taskCardRef = useRef<HTMLTableRowElement>(null);

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

    const x = tRect.left - cRect.left + tRect.width * offsetXRatio - 3;
    const y = tRect.top - cRect.top + tRect.height * offsetYRatio - 3;

    setCursorPos({ x, y, visible: true });
    await sleep(950);
  };

  const click = async () => {
    if (isCancelledRef.current) return;
    setCursorClicked(true);
    await sleep(180);
    setCursorClicked(false);
    await sleep(100);
  };

  const startTour = async () => {
    isCancelledRef.current = false;
    clearTimeouts();
    setCopilotOpen(true);
    setCopilotSubmitted(false);
    setCopilotQuery("");
    setCurrentView("dashboard");

    setCursorPos({ x: 380, y: 220, visible: true });
    await sleep(1400);

    while (!isCancelledRef.current) {
      // Step 1: In Dashboard -> Move cursor over AI Copilot prompt chip
      await moveTo(copilotChipRef, 0.4, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotQuery("Review project progress, milestones, approvals and missing deliverables.");
      await sleep(1200);

      // Step 2: Click Copilot send
      await moveTo(copilotSendRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotSubmitted(true);
      await sleep(2800);

      // Step 3: Click "Open task board" in Priorities
      await moveTo(openBoardBtnRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("tasks");
      setCopilotOpen(false);
      await sleep(2000);

      // Step 4: In Tasks -> Hover active task card
      await moveTo(taskCardRef, 0.4, 0.4);
      await sleep(1600);

      // Step 5: Move to Projects in sidebar
      await moveTo(navProjectsRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("projects");
      await sleep(2200);

      // Step 6: Move to Tickets in sidebar
      await moveTo(navTicketsRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("tickets");
      await sleep(2200);

      // Step 7: Move to Messages in sidebar
      await moveTo(navMessagesRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("messages");
      await sleep(2200);

      // Step 8: Return to Dashboard
      await moveTo(navDashboardRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("dashboard");
      setCopilotOpen(true);
      setCopilotSubmitted(false);
      setCopilotQuery("");
      await sleep(3000);
    }
  };

  useEffect(() => {
    isCancelledRef.current = false;
    const initTimer = setTimeout(startTour, 800);
    return () => {
      isCancelledRef.current = true;
      clearTimeout(initTimer);
      clearTimeouts();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.09)] overflow-hidden transition-all duration-300"
    >
      {/* 1. Browser Window Header */}
      <div className="h-10 sm:h-11 shrink-0 bg-[#F8FAFC] border-b border-[#E2E8F0] px-3 sm:px-4 flex items-center justify-between gap-3 select-none">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/40" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/40" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 max-w-[420px] mx-auto min-w-0">
          <div className="flex items-center justify-between gap-1.5 px-3 py-1 bg-white border border-[#E2E8F0] rounded-lg text-[11px] sm:text-[12px] font-mono text-[#64748B] shadow-2xs overflow-x-auto whitespace-nowrap no-scrollbar">
            <div className="flex items-center gap-1.5 shrink-0">
              <Lock size={11} className="text-emerald-500 shrink-0" />
              <span className="text-[#0F172A] font-medium shrink-0">app.eidoncore.com</span>
              <span className="text-[#2563EB] shrink-0">/{currentView}</span>
            </div>
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

        <div className="w-9 shrink-0" />
      </div>

      {/* Mobile Horizontal Navigation Tabs */}
      <div className="shrink-0 md:hidden flex items-center gap-1 overflow-x-auto no-scrollbar p-2 bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-medium">
        <button
          onClick={() => setCurrentView("dashboard")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "dashboard" ? "bg-[#0F172A] text-white" : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          My Day
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
          onClick={() => setCurrentView("messages")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "messages" ? "bg-[#0F172A] text-white" : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          Messages
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
          onClick={() => setCopilotOpen(!copilotOpen)}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            copilotOpen ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-700"
          }`}
        >
          AI Copilot
        </button>
      </div>

      {/* 2. Eidoncore App Shell: Sidebar + Content Canvas + AI Copilot Drawer */}
      <div className="flex-1 flex min-h-0 md:min-h-[620px] text-xs overflow-hidden bg-[#F3F4F6]">
        
        {/* Desktop Left Sidebar Navigation */}
        <aside className="hidden md:flex w-[190px] lg:w-[215px] shrink-0 border-r border-[#E5E7EB] bg-[#FFFFFF] p-3 flex-col justify-between select-none">
          <div className="flex flex-col gap-3">
            
            {/* Workspace Brand Header */}
            <div className="flex items-center justify-between px-2 py-1.5 text-[#0F172A]">
              <div className="flex items-center gap-2 truncate">
                <span className="w-5 h-5 rounded-md bg-[#0F172A] text-white flex items-center justify-center font-bold text-[10px]">
                  C
                </span>
                <span className="font-bold text-[#0F172A] truncate text-[12px] tracking-tight">
                  Creative Studio LLC
                </span>
              </div>
              <ChevronLeft size={14} className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer" />
            </div>

            {/* NAVIGATION Group */}
            <div>
              <span className="px-2 text-[9.5px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">
                NAVIGATION
              </span>
              <nav className="mt-1 flex flex-col gap-0.5">
                <button
                  ref={navDashboardRef}
                  onClick={() => setCurrentView("dashboard")}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-colors text-left ${
                    currentView === "dashboard"
                      ? "bg-slate-100 text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <LayoutDashboard size={14} className={currentView === "dashboard" ? "text-[#0F172A]" : "text-[#64748B]"} />
                  <span>Dashboard</span>
                </button>

                <div className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <Building size={14} className="text-[#64748B]" />
                  <span>Organizations</span>
                </div>

                <div className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <FileText size={14} className="text-[#64748B]" />
                  <span>Proposals</span>
                </div>

                <button
                  ref={navProjectsRef}
                  onClick={() => setCurrentView("projects")}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-colors text-left ${
                    currentView === "projects"
                      ? "bg-slate-100 text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <FolderKanban size={14} className={currentView === "projects" ? "text-[#0F172A]" : "text-[#64748B]"} />
                  <span>Projects</span>
                </button>

                <button
                  ref={navTasksRef}
                  onClick={() => setCurrentView("tasks")}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-colors text-left ${
                    currentView === "tasks"
                      ? "bg-slate-100 text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <CheckSquare size={14} className={currentView === "tasks" ? "text-[#0F172A]" : "text-[#64748B]"} />
                  <span>Tasks</span>
                </button>

                <div className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-[#64748B]" />
                    <span>Offerings</span>
                  </div>
                  <ChevronRight size={12} className="text-[#94A3B8]" />
                </div>

                <div className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <Users size={14} className="text-[#64748B]" />
                  <span>Team</span>
                </div>

                <button
                  ref={navMessagesRef}
                  onClick={() => setCurrentView("messages")}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-colors text-left ${
                    currentView === "messages"
                      ? "bg-slate-100 text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <MessageSquare size={14} className={currentView === "messages" ? "text-[#0F172A]" : "text-[#64748B]"} />
                  <span>Messages</span>
                </button>

                <button
                  ref={navTicketsRef}
                  onClick={() => setCurrentView("tickets")}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-colors text-left ${
                    currentView === "tickets"
                      ? "bg-slate-100 text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <Ticket size={14} className={currentView === "tickets" ? "text-[#0F172A]" : "text-[#64748B]"} />
                  <span>Tickets</span>
                </button>
              </nav>
            </div>

            {/* FINANCE Group */}
            <div>
              <span className="px-2 text-[9.5px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">
                FINANCE
              </span>
              <nav className="mt-1 flex flex-col gap-0.5">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <Receipt size={14} className="text-[#64748B]" />
                  <span>Invoices</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <CreditCard size={14} className="text-[#64748B]" />
                  <span>Expenses</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <BarChart3 size={14} className="text-[#64748B]" />
                  <span>Reports</span>
                </div>
              </nav>
            </div>

            {/* TOOLS Group */}
            <div>
              <span className="px-2 text-[9.5px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">
                TOOLS
              </span>
              <nav className="mt-1 flex flex-col gap-0.5">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <FileSpreadsheet size={14} className="text-[#64748B]" />
                  <span>Capture inbox</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <FileText size={14} className="text-[#64748B]" />
                  <span>Intake Forms</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] text-[#475569] hover:bg-slate-50 cursor-pointer">
                  <Bug size={14} className="text-[#64748B]" />
                  <span>Bug Reports</span>
                </div>
              </nav>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between px-1 text-[10px] text-[#94A3B8]">
            <span>Workspace</span>
            <span className="font-mono text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Connected
            </span>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-3 sm:p-4.5 flex flex-col gap-3.5 bg-[#F9FAFB] relative overflow-y-auto no-scrollbar">
          
          {/* Top Header inside Main Content */}
          <div className="flex items-center justify-between gap-3 pb-1 select-none">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <LayoutDashboard size={13} />
              </div>
              <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
                My Day
              </h3>
            </div>

            {/* Global Search Bar */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-[#64748B] text-xs flex-1 max-w-[360px] shadow-2xs">
              <Search size={13} className="text-[#94A3B8]" />
              <span className="text-[11px] text-[#94A3B8] flex-1">Search or jump to...</span>
              <kbd className="text-[9px] bg-slate-100 border border-slate-200 px-1 py-0.2 rounded text-[#64748B]">
                ⌘K
              </kbd>
            </div>

            {/* AI Copilot Toggle Button (Top Right) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                ref={copilotToggleRef}
                onClick={() => setCopilotOpen(!copilotOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border shadow-2xs ${
                  copilotOpen
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-white text-[#0F172A] border-[#E2E8F0] hover:bg-slate-50"
                }`}
              >
                <Sparkles size={12} className={copilotOpen ? "text-amber-400" : "text-indigo-600"} />
                <span>AI Copilot</span>
                <kbd className={`text-[9px] px-1 rounded hidden sm:inline ${
                  copilotOpen ? "bg-white/20 text-white" : "bg-slate-100 text-[#64748B]"
                }`}>
                  ⌘J
                </kbd>
              </button>
            </div>
          </div>

          {/* VIEW 1: FLIGHT DECK (100% IDENTICAL TO SCREENSHOT 01) */}
          {currentView === "dashboard" && (
            <div className="flex flex-col gap-3.5 animate-fadeIn">
              
              {/* 1. DARK FLIGHT DECK HERO CONTAINER */}
              <div className="bg-[#0D1524] border border-[#1E293B] rounded-2xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden">
                
                {/* Flight Deck Header Line */}
                <div className="flex items-center justify-between pb-3 text-xs border-b border-slate-800/80">
                  <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
                    <Moon size={12} className="text-slate-300" />
                    <span className="uppercase tracking-wider font-semibold text-slate-300">YOUR FLIGHT DECK</span>
                    <span>/</span>
                    <span className="text-slate-400">SUNDAY, OCTOBER 4</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-900/80 border border-slate-800 px-2 py-0.5 rounded-full font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live</span>
                      <span className="text-slate-500">Synced 22:22</span>
                    </div>
                    <button
                      onClick={() => setCurrentView("tasks")}
                      className="hidden sm:flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
                    >
                      <CheckSquare size={11} />
                      <span>Open task board</span>
                    </button>
                  </div>
                </div>

                {/* Greeting & Subtitle */}
                <div className="pt-4 pb-4">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Good evening, Alex
                  </h2>
                  <p className="mt-1 text-xs sm:text-[13px] text-slate-400 max-w-xl leading-relaxed">
                    A clear view of what needs you next. Pick up your work, plan the week, and keep your team moving.
                  </p>
                </div>

                {/* Prime Focus Card: "YOUR NEXT TASK" */}
                <div className="bg-[#131E32]/90 border border-[#243552] rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <span className="px-2 py-0.5 bg-[#1E293B] text-slate-300 font-mono text-[9px] rounded font-bold uppercase tracking-wider border border-slate-700/80 shrink-0">
                      PRIME
                    </span>
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                        YOUR NEXT TASK
                      </span>
                      <h4 className="text-sm font-bold text-white tracking-tight truncate">
                        Deploy Client Portal Custom Domain SSL
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-300 flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700/60">
                      <FolderKanban size={11} className="text-slate-400" />
                      <span>Client Onboarding</span>
                    </span>
                    <span className="text-[11px] text-slate-300 flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span>To do</span>
                    </span>
                    <span className="text-[11px] text-red-400 font-medium flex items-center gap-1 bg-red-950/60 px-2 py-1 rounded-md border border-red-900/60">
                      <Flag size={11} />
                      <span>URGENT</span>
                    </span>
                  </div>
                </div>

                {/* 4 Bottom Metric Columns with divider */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                  {/* Due Today */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      DUE TODAY
                    </span>
                    <span className="text-2xl font-bold text-white">0</span>
                    <span className="text-[10px] text-slate-400">On today&apos;s agenda</span>
                  </div>

                  {/* Overdue */}
                  <div className="flex flex-col gap-0.5 border-l border-slate-800/80 pl-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        OVERDUE
                      </span>
                      <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                        NOMINAL
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-white">0</span>
                    <span className="text-[10px] text-slate-400">All on schedule</span>
                  </div>

                  {/* Next 7 Days */}
                  <div className="flex flex-col gap-0.5 border-l border-slate-800/80 pl-3">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      NEXT 7 DAYS
                    </span>
                    <span className="text-2xl font-bold text-white">0</span>
                    <span className="text-[10px] text-slate-400">Upcoming deadlines</span>
                  </div>

                  {/* Completed */}
                  <div className="flex flex-col gap-0.5 border-l border-slate-800/80 pl-3">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      COMPLETED
                    </span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-white">1</span>
                      <span className="text-[10px] text-slate-400">In the past 7 days</span>
                    </div>
                    {/* Sparkline simulation */}
                    <div className="flex items-center gap-1 pt-1">
                      <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 w-3/4 rounded-full" />
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">4 in last 14d</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* 2. 7-DAY LAUNCH WINDOW (CALENDAR FOCUS SELECTOR) */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs">
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                      WIN
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A]">7-day launch window</h4>
                      <span className="text-[10px] text-[#64748B]">Select a day to focus • Asia/Dhaka</span>
                    </div>
                  </div>
                </div>

                {/* Days Grid: Today 4, Mon 5, Tue 6, Wed 7, Thu 8, Fri 9, Sat 10 */}
                <div className="grid grid-cols-7 gap-2">
                  {[
                    { label: "TODAY", date: 4, tasks: 0 },
                    { label: "MON", date: 5, tasks: 0 },
                    { label: "TUE", date: 6, tasks: 0 },
                    { label: "WED", date: 7, tasks: 0 },
                    { label: "THU", date: 8, tasks: 0 },
                    { label: "FRI", date: 9, tasks: 0 },
                    { label: "SAT", date: 10, tasks: 0 },
                  ].map((day) => {
                    const isSelected = selectedDay === day.date;
                    return (
                      <button
                        key={day.date}
                        onClick={() => setSelectedDay(day.date)}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all text-center ${
                          isSelected
                            ? "bg-white border-blue-500 ring-2 ring-blue-500/10 shadow-xs"
                            : "bg-[#FAFAFA] border-[#E5E7EB] hover:bg-slate-50"
                        }`}
                      >
                        <span className={`text-[9.5px] font-bold tracking-wider ${
                          isSelected ? "text-blue-600 font-mono" : "text-[#64748B]"
                        }`}>
                          {day.label}
                        </span>
                        <span className="text-base font-extrabold text-[#0F172A] mt-1">
                          {day.date}
                        </span>
                        <div className="w-1 h-3 bg-slate-200 rounded-full mt-1.5" />
                        <span className="text-[10px] text-[#94A3B8] mt-1 font-mono">
                          {day.tasks}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. YOUR PRIORITIES TABLE SECTION */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs flex flex-col gap-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                      QUE
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A]">Your priorities</h4>
                      <span className="text-[10px] text-[#64748B]">Everything assigned to you, with space to focus on what matters now.</span>
                    </div>
                  </div>

                  <button
                    ref={openBoardBtnRef}
                    onClick={() => setCurrentView("tasks")}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                  >
                    <span>Open task board</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                {/* Filter Pills + Search Input */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-[11px] font-medium">
                    <button
                      onClick={() => setActiveWorkTab("all")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeWorkTab === "all"
                          ? "bg-slate-100 text-[#0F172A] font-semibold"
                          : "text-[#64748B] hover:bg-slate-50"
                      }`}
                    >
                      All work <span className="text-[10px] font-mono ml-0.5">1</span>
                    </button>
                    <button
                      onClick={() => setActiveWorkTab("today")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeWorkTab === "today"
                          ? "bg-slate-100 text-[#0F172A] font-semibold"
                          : "text-[#64748B] hover:bg-slate-50"
                      }`}
                    >
                      Today <span className="text-[10px] font-mono ml-0.5">0</span>
                    </button>
                    <button
                      onClick={() => setActiveWorkTab("overdue")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeWorkTab === "overdue"
                          ? "bg-slate-100 text-[#0F172A] font-semibold"
                          : "text-[#64748B] hover:bg-slate-50"
                      }`}
                    >
                      Overdue <span className="text-[10px] font-mono ml-0.5">0</span>
                    </button>
                    <button
                      onClick={() => setActiveWorkTab("review")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeWorkTab === "review"
                          ? "bg-slate-100 text-[#0F172A] font-semibold"
                          : "text-[#64748B] hover:bg-slate-50"
                      }`}
                    >
                      In review <span className="text-[10px] font-mono ml-0.5">0</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-lg text-xs w-full sm:w-64">
                    <Search size={11} className="text-[#94A3B8]" />
                    <input
                      type="text"
                      placeholder="Search your assigned tasks..."
                      className="text-[11px] text-[#0F172A] placeholder:text-[#94A3B8] bg-transparent outline-none flex-1"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="border border-[#E5E7EB] rounded-xl overflow-hidden mt-1">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[10px] font-mono uppercase text-[#64748B] tracking-wider">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold">TASK</th>
                        <th className="py-2.5 px-3 font-semibold">PROJECT</th>
                        <th className="py-2.5 px-3 font-semibold">STATUS</th>
                        <th className="py-2.5 px-3 font-semibold text-right">DUE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB] bg-white text-[11.5px]">
                      <tr
                        ref={taskCardRef}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="py-3 px-3 font-medium text-[#0F172A]">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            <span className="font-semibold text-[#0F172A]">Deploy Client Portal Custom Domain SSL</span>
                            <span className="text-[9.5px] font-mono text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200 font-bold flex items-center gap-1 shrink-0">
                              <Flag size={9} /> URGENT
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-[#475569]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span>Client Onboarding</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#475569] bg-slate-100 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            To do
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right text-[#94A3B8] font-mono text-[10.5px]">
                          No deadline
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-1">
                  <span>1–1 of 1 tasks</span>
                </div>
              </div>

            </div>
          )}

          {/* VIEW 2: PROJECTS */}
          {currentView === "projects" && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[10px] text-[#64748B] font-mono uppercase">ACTIVE DELIVERY</span>
                  <span className="text-xl font-bold text-[#0F172A]">11 in delivery</span>
                  <span className="text-[10px] text-emerald-600 font-medium">All on track</span>
                </div>
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[10px] text-[#64748B] font-mono uppercase">PORTFOLIO</span>
                  <span className="text-xl font-bold text-[#0F172A]">21 projects</span>
                  <span className="text-[10px] text-[#64748B]">5% delivered</span>
                </div>
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[10px] text-[#64748B] font-mono uppercase">IN PROGRESS</span>
                  <span className="text-xl font-bold text-blue-600">11</span>
                  <span className="text-[10px] text-[#64748B]">Active sprint work</span>
                </div>
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[10px] text-[#64748B] font-mono uppercase">ON HOLD</span>
                  <span className="text-xl font-bold text-amber-600">2</span>
                  <span className="text-[10px] text-[#64748B]">Awaiting client assets</span>
                </div>
              </div>

              {/* Projects List Card */}
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="font-bold text-[#0F172A] text-xs">Active Projects Portfolio</h4>
                  <span className="text-[11px] text-blue-600 font-semibold cursor-pointer">View archived →</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                        SA
                      </div>
                      <div>
                        <span className="font-bold text-[#0F172A] text-xs block">Studio Architecture Redesign</span>
                        <span className="text-[11px] text-[#64748B]">Living With Lolo • Custom Website &amp; Portfolio</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-semibold text-[10px]">
                      On Track
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                        IT
                      </div>
                      <div>
                        <span className="font-bold text-[#0F172A] text-xs block">Internal Operations &amp; Client Migration</span>
                        <span className="text-[11px] text-[#64748B]">Creative Studio LLC • Task Migration &amp; DNS</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-semibold text-[10px]">
                      In Progress
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: TASKS KANBAN */}
          {currentView === "tasks" && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xs">Active Work</h4>
                  <span className="text-[10px] text-[#64748B]">103 tasks in view • 98% completion rate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded">Board</span>
                  <span className="px-2 py-0.5 text-slate-500 text-[10px] rounded">List</span>
                </div>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* TO DO */}
                <div className="p-3 bg-slate-100/70 border border-slate-200/80 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      TO DO (2)
                    </span>
                    <Plus size={13} className="text-[#64748B] cursor-pointer" />
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
                    <span className="font-semibold text-xs text-[#0F172A] block">Move Client Portal DNS</span>
                    <span className="text-[10px] text-[#64748B] mt-0.5 block">Internal Tasks • Urgent</span>
                  </div>
                </div>

                {/* IN PROGRESS */}
                <div className="p-3 bg-slate-100/70 border border-slate-200/80 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      IN PROGRESS (1)
                    </span>
                    <Plus size={13} className="text-[#64748B] cursor-pointer" />
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
                    <span className="font-semibold text-xs text-[#0F172A] block">Task Automation Pipeline</span>
                    <span className="text-[10px] text-amber-600 mt-0.5 block font-medium">Medium Priority</span>
                  </div>
                </div>

                {/* DONE */}
                <div className="p-3 bg-slate-100/70 border border-slate-200/80 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      DONE (101)
                    </span>
                    <Plus size={13} className="text-[#64748B] cursor-pointer" />
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs opacity-75">
                    <span className="font-semibold text-xs text-[#0F172A] line-through block">Website Wireframes Handed Off</span>
                    <span className="text-[10px] text-emerald-600 mt-0.5 block font-medium">Completed yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: MESSAGES */}
          {currentView === "messages" && (
            <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs flex flex-col gap-3 animate-fadeIn">
              <h4 className="font-bold text-[#0F172A] text-xs">Project Channels &amp; DMs</h4>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                    #
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#0F172A] block"># client-website-maintenance</span>
                    <span className="text-[11px] text-[#64748B]">Alex Morgan: All staging checks passed, ready for production DNS</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#94A3B8]">12m ago</span>
              </div>
            </div>
          )}

          {/* VIEW 5: TICKETS */}
          {currentView === "tickets" && (
            <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs flex flex-col gap-3 animate-fadeIn">
              <h4 className="font-bold text-[#0F172A] text-xs">Support Queue (29 Tickets)</h4>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-blue-600 font-bold text-xs">TKT-29</span>
                  <span className="font-semibold text-xs text-[#0F172A]">Stripe Webhook Server Relocation to Dedicated IP</span>
                </div>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[10px] font-semibold">
                  In Progress
                </span>
              </div>
            </div>
          )}

        </main>

        {/* 3. RIGHT SIDEBAR: AUTHENTIC AI COPILOT DRAWER (MATCHING SCREENSHOT 01) */}
        {copilotOpen && (
          <aside className="w-[310px] lg:w-[340px] shrink-0 border-l border-[#E2E8F0] bg-[#FFFFFF] p-3.5 flex flex-col justify-between select-none animate-fadeIn">
            <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
                    <Sparkles size={13} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A] leading-none">AI Copilot</h4>
                    <span className="text-[10px] text-[#64748B]">Project Manager</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <History size={13} className="hover:text-slate-700 cursor-pointer" />
                  <Maximize2 size={13} className="hover:text-slate-700 cursor-pointer" />
                  <X
                    size={14}
                    className="hover:text-slate-700 cursor-pointer"
                    onClick={() => setCopilotOpen(false)}
                  />
                </div>
              </div>

              {/* Greeting */}
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  Good evening, Alex
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
                  ref={copilotChipRef}
                  onClick={() => {
                    setCopilotQuery("Review project progress, milestones, approvals and missing deliverables.");
                  }}
                  className="text-left p-2 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200/80 rounded-xl text-[11px] text-[#334155] transition-colors leading-snug flex items-start gap-2"
                >
                  <MessageSquare size={13} className="text-[#94A3B8] shrink-0 mt-0.5" />
                  <span>Review project progress, milestones, approvals and missing deliverables.</span>
                </button>

                <button
                  onClick={() => {
                    setCopilotQuery("Find blockers, unfinished checklist items and the next tasks to prioritize.");
                  }}
                  className="text-left p-2 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200/80 rounded-xl text-[11px] text-[#334155] transition-colors leading-snug flex items-start gap-2"
                >
                  <MessageSquare size={13} className="text-[#94A3B8] shrink-0 mt-0.5" />
                  <span>Find blockers, unfinished checklist items and the next tasks to prioritize.</span>
                </button>
              </div>

              {/* DRAFT WITH AI Grid */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9.5px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">
                  DRAFT WITH AI
                </span>

                <div className="grid grid-cols-2 gap-1.5">
                  <div className="p-2 bg-[#F8FAFC] border border-slate-200/80 rounded-xl flex flex-col gap-0.5 hover:bg-slate-100 cursor-pointer">
                    <span className="font-bold text-[11px] text-[#0F172A]">Task breakdown</span>
                    <span className="text-[9.5px] text-[#64748B]">Plan a task with a checklist</span>
                  </div>

                  <div className="p-2 bg-[#F8FAFC] border border-slate-200/80 rounded-xl flex flex-col gap-0.5 hover:bg-slate-100 cursor-pointer">
                    <span className="font-bold text-[11px] text-[#0F172A]">Ticket triage</span>
                    <span className="text-[9.5px] text-[#64748B]">Classify and draft a reply</span>
                  </div>

                  <div className="p-2 bg-[#F8FAFC] border border-slate-200/80 rounded-xl flex flex-col gap-0.5 hover:bg-slate-100 cursor-pointer">
                    <span className="font-bold text-[11px] text-[#0F172A]">Polish message</span>
                    <span className="text-[9.5px] text-[#64748B]">Rewrite in the right tone</span>
                  </div>

                  <div className="p-2 bg-[#F8FAFC] border border-slate-200/80 rounded-xl flex flex-col gap-0.5 hover:bg-slate-100 cursor-pointer">
                    <span className="font-bold text-[11px] text-[#0F172A]">Proposal draft</span>
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
                    <span className="truncate">Can you create task?</span>
                  </div>
                  <span className="text-[9.5px] text-[#94A3B8] shrink-0">3d ago</span>
                </div>
                <div className="flex items-center justify-between text-[10.5px] text-[#475569] py-0.5">
                  <div className="flex items-center gap-1.5 truncate">
                    <History size={11} className="text-[#94A3B8]" />
                    <span className="truncate">Create 3 client migration tasks...</span>
                  </div>
                  <span className="text-[9.5px] text-[#94A3B8] shrink-0">3d ago</span>
                </div>
              </div>

              {/* Security & Access Notice */}
              <div className="flex flex-col gap-1 text-[9.5px] text-[#64748B] pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-600" />
                  <span>Answers use only records your role can access.</span>
                </span>
                <span className="text-blue-600 font-medium cursor-pointer pl-3.5">
                  Available areas (16)
                </span>
              </div>

              {/* Copilot Submitted Result Simulation */}
              {copilotSubmitted && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-[#0F172A] flex flex-col gap-1 animate-fadeIn">
                  <div className="flex items-center gap-1 text-emerald-800 font-bold text-[10px]">
                    <Check size={11} />
                    <span>Workspace Analysis Complete:</span>
                  </div>
                  <span className="text-[10px] text-slate-700 leading-snug">
                    • 11 projects on schedule<br />
                    • 0 blockers detected<br />
                    • Ready to deploy custom domain SSL
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Prompt Input */}
            <div className="pt-2 border-t border-slate-100">
              <div className="p-2 border border-slate-200 rounded-xl bg-[#F8FAFC] flex flex-col gap-1.5 focus-within:border-slate-400 transition-colors">
                <textarea
                  rows={2}
                  value={copilotQuery}
                  onChange={(e) => setCopilotQuery(e.target.value)}
                  placeholder="Ask about your work, or type / for tools"
                  className="w-full text-xs text-[#0F172A] bg-transparent outline-none resize-none placeholder:text-[#94A3B8]"
                />
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-[#94A3B8] font-mono">/ tools</span>
                  <button
                    ref={copilotSendRef}
                    onClick={() => setCopilotSubmitted(true)}
                    className="w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-2xs"
                  >
                    <Send size={11} />
                  </button>
                </div>
              </div>
              <span className="text-[9px] text-[#94A3B8] block text-center mt-1">
                Enter to send • Shift+Enter for new line
              </span>
            </div>

          </aside>
        )}

      </div>

      {/* VIRTUAL ANIMATED CURSOR */}
      {cursorPos.visible && (
        <div
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
            transition: "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="hidden md:block absolute top-0 left-0 pointer-events-none z-[120]"
        >
          <div className="relative">
            {cursorClicked && (
              <span className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-blue-500/30 border-2 border-blue-600 animate-ping pointer-events-none" />
            )}

            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className={`filter drop-shadow-md transition-transform duration-100 ${
                cursorClicked ? "scale-90 translate-y-0.5" : "scale-100"
              }`}
            >
              <path
                d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                fill="#0F172A"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}

    </div>
  );
}
