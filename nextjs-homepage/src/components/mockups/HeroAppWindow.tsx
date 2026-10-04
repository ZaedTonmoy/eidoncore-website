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
  AlertTriangle,
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
  const copilotToggleRef = useRef<HTMLButtonElement>(null);
  const copilotChipRef = useRef<HTMLButtonElement>(null);
  const copilotSendRef = useRef<HTMLButtonElement>(null);
  const copilotCloseRef = useRef<HTMLButtonElement>(null);
  const taskRowRef = useRef<HTMLTableRowElement>(null);
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
    setCopilotSubmitted(false);
    setCopilotQuery("");
    setTaskViewMode("list");
    setCurrentView("dashboard");

    setCursorPos({ x: 340, y: 160, visible: true });
    // Initial pause on Dashboard before first click
    await sleep(5000);

    while (!isCancelledRef.current) {
      // Step 1: In Dashboard -> Move cursor to AI Copilot button in top bar
      await moveTo(copilotToggleRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotOpen(true);
      // Wait at least 5s after opening copilot
      await sleep(5000);

      // Step 2: Hover over suggested prompt chip inside the Copilot popup
      await moveTo(copilotChipRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotQuery("Find blockers, unfinished checklist items and the next tasks to prioritize.");
      // Wait at least 5s after choosing prompt
      await sleep(5000);

      // Step 3: Click Copilot send button
      await moveTo(copilotSendRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotSubmitted(true);
      // Wait at least 5s for user to read AI Copilot response
      await sleep(5500);

      // Step 4: Close Copilot popup via 'X' close button
      await moveTo(copilotCloseRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotOpen(false);
      // Wait at least 5s after closing copilot to view Dashboard
      await sleep(5000);

      // Step 5: In Dashboard -> Hover the urgent task row in priorities table
      await moveTo(taskRowRef, 0.35, 0.5);
      if (isCancelledRef.current) break;
      await sleep(5000);

      // Step 6: Move to sidebar "Projects" and click
      await moveTo(navProjectsRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("projects");
      // Wait at least 5s on Projects view
      await sleep(5000);

      // Step 7: Hover an active project card
      await moveTo(projectCardRef, 0.5, 0.4);
      if (isCancelledRef.current) break;
      await sleep(5000);

      // Step 8: Move to sidebar "Tasks" and click
      await moveTo(navTasksRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("tasks");
      setTaskViewMode("list");
      // Wait at least 5s on Tasks List view
      await sleep(5000);

      // Step 9: In Tasks -> Click the "Board" view toggle
      await moveTo(taskBoardToggleRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setTaskViewMode("board");
      // Wait at least 5s on Tasks Kanban Board view
      await sleep(5000);

      // Step 10: In Board -> Hover active task card
      await moveTo(taskCardRef, 0.5, 0.4);
      if (isCancelledRef.current) break;
      await sleep(5000);

      // Step 11: Switch back to Dashboard to loop
      await moveTo(navDashboardRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("dashboard");
      setCopilotSubmitted(false);
      setCopilotQuery("");
      // Wait at least 5s on Dashboard before repeating cycle
      await sleep(5000);
    }
  };

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
            
            {/* Workspace Selector */}
            <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded bg-[#0F172A] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  ⚡
                </div>
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-xs font-bold text-[#0F172A] truncate">Creative Studio LLC</span>
                  <ChevronDown size={12} className="text-[#94A3B8] shrink-0" />
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

          {/* Bottom user badge */}
          <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                AM
              </div>
              <div className="leading-tight">
                <span className="font-semibold block text-[#0F172A]">Alex Miller</span>
                <span className="text-[9.5px] text-[#64748B]">Owner</span>
              </div>
            </div>
            <Settings size={13} className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer" />
          </div>
        </aside>

        {/* MAIN CONTENT PANE (Scrollable) */}
        <main className="flex-1 min-w-0 flex flex-col bg-[#F8FAFC] overflow-y-auto no-scrollbar relative">
          
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
                {currentView === "dashboard" ? "My Day" : currentView}
              </h2>
            </div>

            {/* Center Search Bar */}
            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#E2E8F0] rounded-lg text-[#64748B] text-xs flex-1 max-w-[320px] shadow-2xs mx-2">
              <Search size={12} className="text-[#94A3B8]" />
              <span className="text-[11px] text-[#94A3B8] flex-1 truncate">Search or jump to...</span>
              <kbd className="text-[9px] bg-slate-100 border border-slate-200 px-1 rounded text-[#64748B] font-mono">
                ⌘K
              </kbd>
            </div>

            {/* Right Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
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
                <span className="absolute top-0 right-0 w-3 h-3 bg-blue-600 text-white rounded-full text-[8px] flex items-center justify-center font-bold">
                  9
                </span>
              </div>

              <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200">
                <div className="w-5 h-5 rounded-full bg-slate-800 text-white text-[9px] font-bold flex items-center justify-center">
                  AM
                </div>
                <span className="text-xs font-semibold text-[#0F172A] hidden sm:inline">Alex Miller</span>
                <ChevronDown size={11} className="text-[#94A3B8]" />
              </div>
            </div>
          </header>

          {/* VIEW 1: MY DAY / FLIGHT DECK (100% IDENTICAL TO SCREENSHOT 01 & 03) */}
          {currentView === "dashboard" && (
            <div className="p-4 sm:p-5 flex flex-col gap-4 animate-fadeIn">
              
              {/* DARK FLIGHT DECK HERO CONTAINER */}
              <div className="bg-[#0D1524] border border-[#1E293B] rounded-2xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden">
                {/* Header Line */}
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

                {/* Greeting */}
                <div className="pt-4 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Good evening, Alex
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-400 max-w-xl">
                      A clear view of what needs you next. Pick up your work, plan the week, and keep your team moving.
                    </p>
                  </div>
                  <div className="hidden lg:flex flex-col items-end font-mono text-slate-400 text-xs">
                    <span className="text-[9.5px] uppercase tracking-wider text-slate-500">LOCAL · GMT-4</span>
                    <span className="text-sm font-bold text-slate-200">10:23:41</span>
                  </div>
                </div>

                {/* Prime Focus Card */}
                <div className="bg-[#131E32]/90 border border-[#243552] rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
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
                    <span className="text-[11px] text-red-400 font-medium flex items-center gap-1 bg-red-950/60 px-2 py-1 rounded-md border border-red-900/60 font-mono font-bold">
                      <Flag size={10} />
                      <span>URGENT</span>
                    </span>
                  </div>
                </div>

                {/* 4 Bottom Metric Columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      DUE TODAY
                    </span>
                    <span className="text-2xl font-bold text-white">0</span>
                    <span className="text-[10px] text-slate-400">On today&apos;s agenda</span>
                  </div>

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

                  <div className="flex flex-col gap-0.5 border-l border-slate-800/80 pl-3">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      NEXT 7 DAYS
                    </span>
                    <span className="text-2xl font-bold text-white">0</span>
                    <span className="text-[10px] text-slate-400">Upcoming deadlines</span>
                  </div>

                  <div className="flex flex-col gap-0.5 border-l border-slate-800/80 pl-3">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      COMPLETED
                    </span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-white">1</span>
                      <span className="text-[10px] text-slate-400">In the past 7 days</span>
                    </div>
                    <div className="flex items-center gap-1 pt-1">
                      <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 w-3/4 rounded-full" />
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">4 in last 14d</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* 2-COLUMN MAIN DASHBOARD SECTION (Left: Launch Window + Priorities; Right: Work in Motion + Recent + Updates) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* LEFT MAIN COLUMN (8 cols) */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                  
                  {/* 7-DAY LAUNCH WINDOW */}
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs">
                    <div className="flex items-center justify-between pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                          WIN
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-[#0F172A]">7-day launch window</h4>
                          <span className="text-[10px] text-[#64748B]">Select a day to focus · America/New_York</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
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
                            className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-center ${
                              isSelected
                                ? "bg-white border-blue-500 ring-2 ring-blue-500/10 shadow-xs"
                                : "bg-[#FAFAFA] border-[#E5E7EB] hover:bg-slate-50"
                            }`}
                          >
                            <span className={`text-[9px] font-bold tracking-wider ${
                              isSelected ? "text-blue-600 font-mono" : "text-[#64748B]"
                            }`}>
                              {day.label}
                            </span>
                            <span className="text-sm font-extrabold text-[#0F172A] mt-0.5">
                              {day.date}
                            </span>
                            <div className="w-1 h-2.5 bg-slate-200 rounded-full mt-1" />
                            <span className="text-[9.5px] text-[#94A3B8] mt-0.5 font-mono">
                              {day.tasks}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* YOUR PRIORITIES TABLE SECTION */}
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

                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#64748B] max-w-[200px]">
                        <Search size={11} className="text-[#94A3B8]" />
                        <span className="text-[10.5px] text-[#94A3B8] truncate">Search assigned tasks...</span>
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
                            ref={taskRowRef}
                            className="hover:bg-slate-50/80 transition-colors"
                          >
                            <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                <span className="font-semibold text-[#0F172A]">Deploy Client Portal Custom Domain SSL</span>
                                <span className="text-[9.5px] font-mono text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200 font-bold flex items-center gap-1 shrink-0">
                                  <Flag size={9} /> URGENT
                                </span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-[#475569]">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                <span>Client Onboarding</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0F6] text-[#334155] text-[11px] font-medium leading-none">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#64748B]" />
                                To do
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right text-[#94A3B8] text-[11px] leading-tight">
                              <div>No</div>
                              <div>deadline</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-1">
                      <span>1–1 of 1 tasks</span>
                    </div>
                  </div>

                  {/* YOUR WORK ACROSS PROJECTS */}
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                          MSN
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-[#0F172A]">Your work across projects</h4>
                          <span className="text-[10px] text-[#64748B]">Your assignments and progress. Choose a project to focus your queue.</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setCurrentView("projects")}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                      >
                        <span>All projects</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-[#0F172A] block">Internal Tasks</span>
                          <span className="text-[10px] text-[#64748B]">1 active task</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-24 sm:w-32 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full w-[91%] rounded-full" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-[#0F172A]">91%</span>
                        <span className="text-[10px] text-[#64748B] hidden sm:inline">10 of 11 completed</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN (4 cols) - Work in Motion, Recently Finished, Latest Updates */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  
                  {/* WORK IN MOTION (Radial Gauge Donut Chart) */}
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                        LOAD
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A]">Work in motion</h4>
                        <span className="text-[10px] text-[#64748B]">Your active assignments, by status.</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-around py-3 border-t border-slate-100">
                      {/* Donut Chart representation */}
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                          <circle
                            cx="18"
                            cy="18"
                            r="14"
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="3"
                            strokeDasharray="88 88"
                            strokeDashoffset="0"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center text-center">
                          <span className="text-base font-extrabold text-[#0F172A] leading-none">1</span>
                          <span className="text-[8px] font-mono text-[#64748B] uppercase tracking-wider">ACTIVE</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-[#475569]">To do</span>
                          <span className="font-bold text-[#0F172A] ml-2">1</span>
                          <span className="text-[10px] text-[#94A3B8] font-mono">100%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RECENTLY FINISHED */}
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                        LOG
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A]">Recently finished</h4>
                        <span className="text-[10px] text-[#64748B]">1 task completed in the past 7 days.</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100 text-xs">
                      <div className="text-[10px] font-mono text-[#64748B] leading-tight">
                        <span className="block font-bold">16:37</span>
                        <span>Sep 28</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0">
                        <Check size={11} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-[#0F172A] block truncate">Client Portal Beta Review</span>
                        <span className="text-[10px] text-[#64748B]">Apex Studio Website</span>
                      </div>
                    </div>
                  </div>

                  {/* LATEST UPDATES */}
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] rounded font-bold uppercase">
                        COM
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A]">Your latest updates</h4>
                        <span className="text-[10px] text-[#64748B]">Unread updates from the past 7 days.</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-4 text-center border-t border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-1.5">
                        <Bell size={14} />
                      </div>
                      <span className="text-xs font-bold text-[#0F172A]">You&apos;re up to date</span>
                      <span className="text-[10.5px] text-[#64748B] max-w-[200px] mt-0.5">
                        Replies, mentions, and changes to your work will appear here.
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-right">
                      <span className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">
                        All notifications →
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom status line */}
              <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-2">
                <span className="flex items-center gap-1.5">
                  <Clock size={11} /> Automatically refreshed every minute
                </span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                  <RefreshCw size={11} /> Refresh
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

              {/* Toolbar & Filter Bar - Underline tabs & icon tools matching screenshot */}
              {/* Action Toolbar */}
              <div className="flex items-center justify-between gap-1.5 pt-1 border-b border-[#E2E8F0] pb-2 text-xs">
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveProjectTab("all")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 flex items-center gap-1 whitespace-nowrap text-[11px] ${
                      activeProjectTab === "all" ? "border-blue-600 text-[#0F172A] font-semibold" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span>All Projects</span>
                    <span className="font-mono text-[9px] px-1.5 py-0.2 rounded-full bg-[#EFF6FF] text-[#2563EB] font-semibold">21</span>
                  </button>
                  <button
                    onClick={() => setActiveProjectTab("active")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 flex items-center gap-1 whitespace-nowrap text-[11px] ${
                      activeProjectTab === "active" ? "border-blue-600 text-[#0F172A] font-semibold" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span>Active</span>
                    <span className="font-mono text-[8.5px] px-1 py-0.2 rounded-full bg-slate-100 text-slate-700 font-medium">11</span>
                  </button>
                  <button
                    onClick={() => setActiveProjectTab("attention")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 whitespace-nowrap text-[11px] ${
                      activeProjectTab === "attention" ? "border-blue-600 text-[#0F172A] font-semibold" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    Attention
                  </button>
                  <button
                    onClick={() => setActiveProjectTab("delivered")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 flex items-center gap-1 whitespace-nowrap text-[11px] ${
                      activeProjectTab === "delivered" ? "border-blue-600 text-[#0F172A] font-semibold" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span>Delivered</span>
                    <span className="font-mono text-[8.5px] px-1 py-0.2 rounded-full bg-slate-100 text-slate-700 font-medium">1</span>
                  </button>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Search */}
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white border border-[#E2E8F0] rounded-full text-[#64748B]">
                    <Search size={10} className="text-[#94A3B8]" />
                    <span className="text-[9.5px] text-[#94A3B8]">Search...</span>
                    <kbd className="text-[8px] font-mono bg-[#F1F5F9] text-slate-500 px-1 rounded">/</kbd>
                  </div>

                  {/* Icon tools: Check, Flag */}
                  <div className="flex items-center gap-0.5 text-slate-400">
                    <button className="p-0.5 hover:text-slate-700 transition-colors">
                      <CheckCircle2 size={13} />
                    </button>
                    <button className="p-0.5 hover:text-slate-700 transition-colors">
                      <Flag size={13} />
                    </button>
                  </div>

                  {/* Segmented view pill toggle */}
                  <div className="flex items-center bg-[#F1F5F9] border border-[#E2E8F0] rounded-full p-0.5 text-[#64748B]">
                    <button
                      onClick={() => setProjectViewMode("cards")}
                      className={`px-1.5 py-0.5 rounded-full transition-colors flex items-center gap-0.5 text-[9.5px] ${
                        projectViewMode === "cards" ? "bg-white font-medium text-[#0F172A] shadow-xs" : "hover:text-slate-900"
                      }`}
                    >
                      <Columns3 size={9.5} /> Cards
                    </button>
                    <button
                      onClick={() => setProjectViewMode("table")}
                      className={`px-1.5 py-0.5 rounded-full transition-colors flex items-center gap-0.5 text-[9.5px] ${
                        projectViewMode === "table" ? "bg-white font-medium text-[#0F172A] shadow-xs" : "hover:text-slate-900"
                      }`}
                    >
                      <List size={9.5} /> Table
                    </button>
                    <button className="px-1.5 py-0.5 rounded-full transition-colors flex items-center gap-0.5 text-[9.5px] hover:text-slate-900">
                      <Kanban size={9.5} /> Board
                    </button>
                  </div>

                  <button className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-[10px] font-medium flex items-center gap-1 shadow-xs whitespace-nowrap">
                    <Plus size={10} /> New project <kbd className="text-[7.5px] bg-blue-700 px-1 rounded">n</kbd>
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

              {/* Toolbar & Filters (Matching Screenshot) */}
              <div className="flex items-center justify-between gap-1.5 pt-1 border-b border-[#E2E8F0] pb-2 text-xs">
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveTaskTab("all")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 whitespace-nowrap text-[11px] ${
                      activeTaskTab === "all" ? "border-blue-600 text-[#0F172A] font-semibold" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    All tasks
                  </button>
                  <button
                    onClick={() => setActiveTaskTab("overdue")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 flex items-center gap-1 whitespace-nowrap text-[11px] ${
                      activeTaskTab === "overdue" ? "border-blue-600 text-[#0F172A] font-semibold" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span>Overdue</span>
                    <span className="font-mono text-[8.5px] px-1 py-0.2 rounded-full bg-slate-100 text-slate-700 font-medium">0</span>
                  </button>
                  <button
                    onClick={() => setActiveTaskTab("today")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 flex items-center gap-1 whitespace-nowrap text-[11px] ${
                      activeTaskTab === "today" ? "border-blue-600 text-[#0F172A] font-semibold" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span>Today</span>
                    <span className="font-mono text-[8.5px] px-1 py-0.2 rounded-full bg-slate-100 text-slate-700 font-medium">0</span>
                  </button>
                  <button
                    onClick={() => setActiveTaskTab("week")}
                    className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 flex items-center gap-1 whitespace-nowrap text-[11px] ${
                      activeTaskTab === "week" ? "border-blue-600 text-[#0F172A] font-semibold" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span>This Week</span>
                    <span className="font-mono text-[8.5px] px-1 py-0.2 rounded-full bg-slate-100 text-slate-700 font-medium">0</span>
                  </button>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Search */}
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white border border-[#E2E8F0] rounded-full text-[#64748B]">
                    <Search size={10} className="text-[#94A3B8]" />
                    <span className="text-[9.5px] text-[#94A3B8]">Search...</span>
                    <kbd className="text-[8px] font-mono bg-[#F1F5F9] text-slate-500 px-1 rounded">/</kbd>
                  </div>

                  {/* Icon tools: Check, Flag */}
                  <div className="flex items-center gap-0.5 text-slate-400">
                    <button className="p-0.5 hover:text-slate-700 transition-colors">
                      <CheckCircle2 size={13} />
                    </button>
                    <button className="p-0.5 hover:text-slate-700 transition-colors">
                      <Flag size={13} />
                    </button>
                  </div>

                  {/* My Tasks Switch */}
                  <div className="flex items-center gap-1 text-[#64748B]">
                    <div className="w-5 h-3 bg-slate-200 rounded-full p-0.5 cursor-pointer flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full shadow-xs" />
                    </div>
                    <span className="text-[9.5px] font-medium text-slate-700 whitespace-nowrap">My Tasks</span>
                  </div>

                  {/* View Switcher: List | Board | Workload */}
                  <div className="flex items-center bg-[#F1F5F9] border border-[#E2E8F0] rounded-full p-0.5 text-[#64748B]">
                    <button
                      onClick={() => setTaskViewMode("list")}
                      className={`px-1.5 py-0.5 rounded-full transition-colors flex items-center gap-0.5 text-[9.5px] ${
                        taskViewMode === "list" ? "bg-white font-medium text-[#0F172A] shadow-xs" : "hover:text-slate-900"
                      }`}
                    >
                      <List size={9.5} /> List
                    </button>
                    <button
                      ref={taskBoardToggleRef}
                      onClick={() => setTaskViewMode("board")}
                      className={`px-1.5 py-0.5 rounded-full transition-colors flex items-center gap-0.5 text-[9.5px] ${
                        taskViewMode === "board" ? "bg-white font-medium text-[#0F172A] shadow-xs" : "hover:text-slate-900"
                      }`}
                    >
                      <Kanban size={9.5} /> Board
                    </button>
                    <button className="px-1.5 py-0.5 rounded-full transition-colors flex items-center gap-0.5 text-[9.5px] hover:text-slate-900">
                      <Users size={9.5} /> Workload
                    </button>
                  </div>

                  <button className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-[10px] font-medium flex items-center gap-1 shadow-xs whitespace-nowrap">
                    <Plus size={10} /> New task <kbd className="text-[7.5px] bg-blue-700 px-1 rounded">n</kbd>
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

                    {/* Card 2: Move Sdarr Site */}
                    <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow flex flex-col gap-2.5">
                      <h4 className="font-semibold text-xs text-[#0F172A] leading-tight">
                        Move Sdarr Site
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
                className="absolute inset-0 bg-slate-900/10 backdrop-blur-[0.5px] z-30 transition-opacity animate-fadeIn"
              />

              {/* Slide-over Popup Drawer */}
              <aside className="absolute top-0 right-0 bottom-0 w-full sm:w-[380px] max-w-full bg-white border-l border-[#E2E8F0] shadow-2xl z-40 flex flex-col justify-between select-none animate-in slide-in-from-right duration-250">
                <div className="p-4 flex flex-col gap-3.5 overflow-y-auto no-scrollbar">
                  
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

                  {/* Greeting & Scope */}
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
                        • Next immediate priority: Deploy Client Portal SSL (urgent)<br />
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
