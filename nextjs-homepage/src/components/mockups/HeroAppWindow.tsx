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
  Send,
  Plus,
  RotateCw,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Paperclip,
  AlertTriangle,
  Pause,
  Link2,
  Calendar,
  MoreHorizontal,
  CheckCircle2,
  ListFilter,
  Columns,
  Smile,
  Undo2,
  SlidersHorizontal,
} from "lucide-react";

export type ViewType = "dashboard" | "projects" | "tasks" | "messages" | "tickets";

export default function HeroAppWindow() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotQuery, setCopilotQuery] = useState("");
  const [copilotSubmitted, setCopilotSubmitted] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 380, y: 160, visible: true });
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
  const copilotTriggerRef = useRef<HTMLButtonElement>(null);
  const copilotChipRef = useRef<HTMLButtonElement>(null);
  const copilotSubmitRef = useRef<HTMLButtonElement>(null);
  const copilotCloseRef = useRef<HTMLButtonElement>(null);
  const taskCardRef = useRef<HTMLDivElement>(null);

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

    // Small delay to ensure any dynamic layout shift has stabilized
    await sleep(60);
    if (isCancelledRef.current || !targetRef.current || !containerRef.current) return;

    const cRect = containerRef.current.getBoundingClientRect();
    const tRect = targetRef.current.getBoundingClientRect();

    // Calculate exact target coordinate relative to the outer containerRef
    const x = tRect.left - cRect.left + tRect.width * offsetXRatio - 3;
    const y = tRect.top - cRect.top + tRect.height * offsetYRatio - 3;

    setCursorPos({ x, y, visible: true });

    // Wait for the smooth glide transition to complete (850ms) + settle dwell (200ms)
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
    setCopilotOpen(false);
    setCopilotSubmitted(false);
    setCopilotQuery("");
    setCurrentView("dashboard");

    setCursorPos({ x: 380, y: 160, visible: true });
    await sleep(1400);

    while (!isCancelledRef.current) {
      // Step 1: In Dashboard -> Move to "Open task board" button
      await moveTo(openBoardBtnRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("tasks");
      await sleep(1600);

      // Step 2: In Tasks -> Hover active task card
      await moveTo(taskCardRef, 0.4, 0.4);
      await sleep(1400);

      // Step 3: Move to Projects in sidebar
      await moveTo(navProjectsRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("projects");
      await sleep(2000);

      // Step 4: Move to AI Copilot in topbar
      await moveTo(copilotTriggerRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotOpen(true);
      await sleep(1200);

      // Step 5: Inside Copilot -> Click chip
      await moveTo(copilotChipRef, 0.35, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotQuery("Review project progress, milestones, approvals and missing deliverables.");
      await sleep(1100);

      // Step 6: Click "Ask Assistant"
      await moveTo(copilotSubmitRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotSubmitted(true);
      await sleep(2800);

      // Step 7: Close Copilot modal
      await moveTo(copilotCloseRef, 0.5, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCopilotOpen(false);
      setCopilotSubmitted(false);
      setCopilotQuery("");
      await sleep(1200);

      // Step 8: Move to Tickets in sidebar
      await moveTo(navTicketsRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("tickets");
      await sleep(2200);

      // Step 9: Move to Messages in sidebar
      await moveTo(navMessagesRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("messages");
      await sleep(2200);

      // Step 10: Return to Dashboard
      await moveTo(navDashboardRef, 0.45, 0.5);
      if (isCancelledRef.current) break;
      await click();
      setCurrentView("dashboard");
      await sleep(3000);
    }
  };

  useEffect(() => {
    isCancelledRef.current = false;
    const initTimer = setTimeout(startTour, 600);
    return () => {
      isCancelledRef.current = true;
      clearTimeout(initTimer);
      clearTimeouts();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-h-[80vh] md:max-h-none flex flex-col bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl shadow-[0_16px_50px_rgba(15,23,42,0.08)] overflow-hidden transition-all duration-300"
    >
      {/* 1. Browser Window Header (Only 3 dots [red yellow green] + responsive URL bar with mobile overflow) */}
      <div className="h-10 sm:h-11 shrink-0 bg-[#F8FAFC] border-b border-[#E2E8F0] px-3 sm:px-4 flex items-center justify-between gap-3 select-none">
        {/* 3 dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/40" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/40" />
        </div>

        {/* URL Bar: Single line on mobile with horizontal overflow */}
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

        {/* Spacer to balance dots */}
        <div className="w-9 shrink-0" />
      </div>

      {/* Mobile Horizontal Navigation Tabs (Visible on < md screens) */}
      <div className="shrink-0 md:hidden flex items-center gap-1 overflow-x-auto no-scrollbar p-2 bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-medium">
        <button
          onClick={() => setCurrentView("dashboard")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "dashboard"
              ? "bg-[#2563EB] text-white"
              : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setCurrentView("projects")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors flex items-center gap-1 ${
            currentView === "projects"
              ? "bg-[#2563EB] text-white"
              : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          <span>Projects</span>
          <span className="text-[9px] bg-white/20 px-1 rounded">21</span>
        </button>
        <button
          onClick={() => setCurrentView("tasks")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors flex items-center gap-1 ${
            currentView === "tasks"
              ? "bg-[#2563EB] text-white"
              : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          <span>Tasks</span>
          <span className="text-[9px] bg-white/20 px-1 rounded">3</span>
        </button>
        <button
          onClick={() => setCurrentView("messages")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "messages"
              ? "bg-[#2563EB] text-white"
              : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          Messages
        </button>
        <button
          onClick={() => setCurrentView("tickets")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors flex items-center gap-1 ${
            currentView === "tickets"
              ? "bg-[#2563EB] text-white"
              : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          <span>Tickets</span>
          <span className="text-[9px] bg-blue-100 text-blue-800 px-1 rounded font-bold">9</span>
        </button>
      </div>

      {/* 2. Eidoncore App Shell: Sidebar + Content Canvas */}
      <div className="flex-1 flex min-h-0 md:min-h-[560px] text-xs overflow-hidden">
        
        {/* Desktop App Sidebar Navigation (Less wide, proportional matching real app) */}
        <aside className="hidden md:flex w-[190px] lg:w-[205px] shrink-0 border-r border-[#E2E8F0] bg-[#FFFFFF] p-2.5 flex-col justify-between select-none">
          <div className="flex flex-col gap-3">
            
            {/* Workspace Brand Header */}
            <div className="flex items-center justify-between px-2 py-1.5 text-[#0F172A]">
              <div className="flex items-center gap-2 truncate">
                <span className="w-5 h-5 rounded-md bg-[#0F172A] text-white flex items-center justify-center font-bold text-[10px]">
                  E
                </span>
                <span className="font-bold text-[#0F172A] truncate text-[12px] tracking-tight">
                  EidonCore Agency
                </span>
              </div>
              <ChevronLeft size={14} className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer" />
            </div>

            {/* Navigation Buttons */}
            <nav className="flex flex-col gap-0.5">
              <button
                ref={navDashboardRef}
                onClick={() => setCurrentView("dashboard")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-colors text-left ${
                  currentView === "dashboard"
                    ? "bg-[#EDF2F7] text-[#1E40AF]"
                    : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                }`}
              >
                <LayoutDashboard size={14} className={currentView === "dashboard" ? "text-[#2563EB]" : "text-[#64748B]"} />
                <span>Dashboard</span>
              </button>

              <div className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] cursor-pointer">
                <Building size={14} className="text-[#64748B]" />
                <span>Organizations</span>
              </div>

              <div className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] cursor-pointer">
                <FileText size={14} className="text-[#64748B]" />
                <span>Proposals</span>
              </div>

              <button
                ref={navProjectsRef}
                onClick={() => setCurrentView("projects")}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-colors text-left ${
                  currentView === "projects"
                    ? "bg-[#EDF2F7] text-[#1E40AF]"
                    : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FolderKanban size={14} className={currentView === "projects" ? "text-[#2563EB]" : "text-[#64748B]"} />
                  <span>Projects</span>
                </div>
                <span className="text-[10px] font-mono bg-slate-200/70 px-1 rounded text-[#0F172A]">
                  21
                </span>
              </button>

              <button
                ref={navTasksRef}
                onClick={() => setCurrentView("tasks")}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-colors text-left ${
                  currentView === "tasks"
                    ? "bg-[#EDF2F7] text-[#1E40AF]"
                    : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare size={14} className={currentView === "tasks" ? "text-[#2563EB]" : "text-[#64748B]"} />
                  <span>Tasks</span>
                </div>
                <span className="text-[10px] font-mono bg-slate-200/70 px-1 rounded text-[#0F172A]">
                  3
                </span>
              </button>

              <div className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <Package size={14} className="text-[#64748B]" />
                  <span>Offerings</span>
                </div>
                <ChevronRight size={12} className="text-[#94A3B8]" />
              </div>

              <div className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] cursor-pointer">
                <Users size={14} className="text-[#64748B]" />
                <span>Team</span>
              </div>

              <button
                ref={navMessagesRef}
                onClick={() => setCurrentView("messages")}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-colors text-left ${
                  currentView === "messages"
                    ? "bg-[#EDF2F7] text-[#1E40AF]"
                    : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare size={14} className={currentView === "messages" ? "text-[#2563EB]" : "text-[#64748B]"} />
                  <span>Messages</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              </button>

              <button
                ref={navTicketsRef}
                onClick={() => setCurrentView("tickets")}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-colors text-left ${
                  currentView === "tickets"
                    ? "bg-[#EDF2F7] text-[#1E40AF]"
                    : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Ticket size={14} className={currentView === "tickets" ? "text-[#2563EB]" : "text-[#64748B]"} />
                  <span>Tickets</span>
                </div>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1 rounded font-semibold">
                  9
                </span>
              </button>
            </nav>

            {/* FINANCE Section */}
            <div className="pt-2 border-t border-[#F1F5F9]">
              <span className="px-2.5 text-[9.5px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">
                Finance
              </span>
              <nav className="mt-1 flex flex-col gap-0.5">
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11.5px] text-[#64748B] hover:bg-slate-50 cursor-pointer">
                  <Receipt size={14} />
                  <span>Invoices</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11.5px] text-[#64748B] hover:bg-slate-50 cursor-pointer">
                  <CreditCard size={14} />
                  <span>Expenses</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11.5px] text-[#64748B] hover:bg-slate-50 cursor-pointer">
                  <BarChart3 size={14} />
                  <span>Reports</span>
                </div>
              </nav>
            </div>

            {/* TOOLS Section */}
            <div className="pt-2 border-t border-[#F1F5F9]">
              <span className="px-2.5 text-[9.5px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">
                Tools
              </span>
              <nav className="mt-1 flex flex-col gap-0.5">
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11.5px] text-[#64748B] hover:bg-slate-50 cursor-pointer">
                  <FileSpreadsheet size={14} />
                  <span>Intake Forms</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11.5px] text-[#64748B] hover:bg-slate-50 cursor-pointer">
                  <Bug size={14} />
                  <span>Bug Reports</span>
                </div>
              </nav>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between px-1">
            <span className="text-[10px] text-[#94A3B8]">EidonCore v2.4</span>
            <span className="text-[10px] font-mono text-[#2563EB] font-bold">All Systems Active</span>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 min-w-0 p-3.5 sm:p-5 flex flex-col gap-4 bg-[#F8FAFC]/50 relative overflow-y-auto no-scrollbar">
          
          {/* Top Bar inside App Canvas */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2 min-w-0">
              {currentView === "dashboard" && <LayoutDashboard size={17} className="text-[#0F172A]" />}
              {currentView === "projects" && <FolderKanban size={17} className="text-[#0F172A]" />}
              {currentView === "tasks" && <CheckSquare size={17} className="text-[#0F172A]" />}
              {currentView === "messages" && <MessageSquare size={17} className="text-[#0F172A]" />}
              {currentView === "tickets" && <Ticket size={17} className="text-[#0F172A]" />}
              
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight capitalize truncate">
                {currentView === "dashboard" ? "My day" : currentView}
              </h3>
            </div>

            {/* Middle Search Bar */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-[#64748B] text-xs flex-1 max-w-[280px]">
              <Search size={12} className="text-[#94A3B8]" />
              <span className="text-[11px] text-[#94A3B8] flex-1">Search or jump to...</span>
              <kbd className="text-[9px] bg-slate-100 border border-slate-200 px-1 py-0.2 rounded text-[#64748B]">
                ⌘K
              </kbd>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <button
                ref={copilotTriggerRef}
                onClick={() => setCopilotOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-[#2563EB] rounded-lg text-[11px] font-semibold hover:bg-blue-100/70 transition-colors shadow-2xs"
              >
                <Sparkles size={11} className="text-[#2563EB]" />
                <span>+ AI Copilot</span>
                <kbd className="text-[9px] bg-white border border-blue-200 px-1 rounded text-[#2563EB] hidden sm:inline">
                  ⌘J
                </kbd>
              </button>

              <button className="p-1.5 text-[#64748B] hover:text-[#0F172A] rounded-lg hover:bg-slate-100 transition-colors">
                <Settings size={15} />
              </button>

              <button className="relative p-1.5 text-[#64748B] hover:text-[#0F172A] rounded-lg hover:bg-slate-100 transition-colors">
                <Bell size={15} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>

              <div className="flex items-center gap-1.5 pl-1 cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold text-[10px]">
                  AM
                </div>
                <span className="text-[11px] font-medium text-[#0F172A] hidden lg:inline">Alex Morgan</span>
                <ChevronDown size={11} className="text-[#94A3B8]" />
              </div>
            </div>
          </div>

          {/* VIEW 1: DASHBOARD ("My day") */}
          {currentView === "dashboard" && (
            <div className="flex flex-col gap-3.5 sm:gap-4 animate-fadeIn">
              
              {/* Row 1: Greeting Cockpit Card (Left) + Upcoming Milestone Card (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
                
                {/* Left: Personal Cockpit Greeting */}
                <div className="lg:col-span-8 p-4 sm:p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#2563EB] uppercase tracking-wider font-semibold">
                      <Sparkles size={11} />
                      <span>YOUR PERSONAL COCKPIT</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
                      Good morning, Alex
                    </h4>
                    <p className="text-[11px] text-[#64748B] leading-relaxed max-w-lg">
                      A clear view of what needs your attention today, upcoming milestones, and AI recommendations to keep your team moving forward.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100/80">
                    <button
                      ref={openBoardBtnRef}
                      onClick={() => setCurrentView("tasks")}
                      className="px-3.5 py-1.5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shrink-0 transition-colors shadow-xs"
                    >
                      <span>Open task board</span>
                      <ArrowRight size={12} />
                    </button>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      Monday, September 21, 2026
                    </span>
                  </div>
                </div>

                {/* Right: Upcoming Milestone Card */}
                <div className="lg:col-span-4 p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-[#2563EB] uppercase tracking-wider font-semibold">
                      UPCOMING MILESTONE
                    </span>
                    <button
                      onClick={() => setCurrentView("projects")}
                      className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"
                    >
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] font-bold text-[#0F172A] truncate">
                      Maintenance March
                    </span>
                    <span className="text-[10px] text-[#64748B] flex items-center gap-1">
                      <Calendar size={11} className="text-[#94A3B8]" />
                      <span>Due Mar 30, 2026</span>
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#64748B]">Sprint progress</span>
                      <span className="font-bold text-[#0F172A]">85%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
                    </div>
                  </div>
                </div>

              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[10px] text-[#64748B] font-medium">Due today</span>
                  <span className="text-xl font-bold text-[#0F172A]">0</span>
                  <span className="text-[9.5px] text-[#94A3B8]">On today&apos;s agenda</span>
                </div>

                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[10px] text-[#64748B] font-medium">Overdue</span>
                  <span className="text-xl font-bold text-red-500">2</span>
                  <span className="text-[9.5px] text-red-400">Past deadline</span>
                </div>

                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[10px] text-[#64748B] font-medium">In review</span>
                  <span className="text-xl font-bold text-[#0F172A]">1</span>
                  <span className="text-[9.5px] text-[#94A3B8]">Pending approval</span>
                </div>

                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[10px] text-[#64748B] font-medium">Completed</span>
                  <span className="text-xl font-bold text-emerald-600">2</span>
                  <span className="text-[9.5px] text-emerald-600 font-medium">In the past 7 days</span>
                </div>
              </div>

              {/* Your Priorities Section + Execution Widget */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
                
                {/* Left: Priorities List */}
                <div className="lg:col-span-8 p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9] flex-wrap gap-2">
                    <div>
                      <h5 className="font-bold text-[#0F172A] text-xs">Your priorities</h5>
                      <span className="text-[10px] text-[#64748B]">Everything assigned to you that requires action</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px]">
                      <span className="px-2 py-0.5 bg-[#EDF2F7] text-[#1E40AF] rounded font-semibold">All work 2</span>
                      <span className="px-2 py-0.5 text-[#64748B]">Today 0</span>
                      <span className="px-2 py-0.5 text-red-600 bg-red-50 rounded font-medium">Overdue 2</span>
                      <span className="px-2 py-0.5 text-[#64748B]">In review 1</span>
                    </div>
                  </div>

                  {/* Search inside priorities */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-50 border border-slate-200/70 rounded-lg text-[#64748B] text-[11px]">
                    <Search size={11} className="text-[#94A3B8]" />
                    <span className="text-[#94A3B8] flex-1">Search your assigned tasks...</span>
                    <kbd className="text-[9px] bg-white border border-slate-200 px-1 rounded text-[#94A3B8]">/</kbd>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="p-2.5 border border-red-100 bg-red-50/30 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        <div className="truncate">
                          <span className="font-semibold text-[#0F172A] text-[11px] block truncate">Client Portal Domain DNS &amp; SSL</span>
                          <span className="text-[9.5px] text-[#64748B]">Starlight Pay • Due Oct 12, 2026</span>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-700 font-mono text-[9px] rounded font-semibold shrink-0">Overdue</span>
                    </div>

                    <div className="p-2.5 border border-amber-100 bg-amber-50/30 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <div className="truncate">
                          <span className="font-semibold text-[#0F172A] text-[11px] block truncate">Design System Token Review</span>
                          <span className="text-[9.5px] text-[#64748B]">Acme Corp Rebrand • Due Oct 18, 2026</span>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 font-mono text-[9px] rounded font-semibold shrink-0">In Review</span>
                    </div>
                  </div>
                </div>

                {/* Right: Execution Widget */}
                <div className="lg:col-span-4 p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-[#0F172A] text-xs">Execution</h5>
                      <span className="text-sm font-bold text-[#0F172A]">2</span>
                    </div>
                    <span className="text-[10px] text-[#64748B]">Task assignments, by status.</span>

                    <div className="mt-3 flex flex-col gap-2">
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                        <div className="w-1/2 h-full bg-blue-500" title="In Progress: 1" />
                        <div className="w-1/2 h-full bg-indigo-500" title="In Review: 1" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#64748B]">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span>1 In progress (50%)</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-500" />
                          <span>1 In review (50%)</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F1F5F9] flex items-center gap-2 text-[10.5px]">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check size={11} className="stroke-[3]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#0F172A] text-[10.5px]">Recently finished</span>
                      <span className="text-[#64748B] text-[9.5px]">2 tasks completed in the past 7 days.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* VIEW 2: PROJECTS */}
          {currentView === "projects" && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              {/* 6 Metric Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-1 shadow-2xs">
                  <div className="flex items-center justify-between text-[#64748B]">
                    <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">TOTAL PROJECTS</span>
                    <FolderKanban size={11} />
                  </div>
                  <span className="text-lg font-bold text-[#0F172A]">21</span>
                  <span className="text-[9px] text-[#2563EB] font-medium flex items-center gap-0.5">All projects →</span>
                </div>

                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-1 shadow-2xs">
                  <div className="flex items-center justify-between text-[#64748B]">
                    <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">ACTIVE</span>
                    <Link2 size={11} className="text-blue-500" />
                  </div>
                  <span className="text-lg font-bold text-[#2563EB]">11</span>
                  <span className="text-[9px] text-[#64748B] flex items-center gap-0.5">In progress →</span>
                </div>

                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-1 shadow-2xs">
                  <div className="flex items-center justify-between text-[#64748B]">
                    <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">COMPLETED</span>
                    <CheckCircle2 size={11} className="text-emerald-500" />
                  </div>
                  <span className="text-lg font-bold text-emerald-600">1</span>
                  <span className="text-[9px] text-[#64748B] flex items-center gap-0.5">Delivered →</span>
                </div>

                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-1 shadow-2xs">
                  <div className="flex items-center justify-between text-[#64748B]">
                    <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">OVERDUE</span>
                    <AlertTriangle size={11} className="text-red-500" />
                  </div>
                  <span className="text-lg font-bold text-red-500">0</span>
                  <span className="text-[9px] text-[#64748B] flex items-center gap-0.5">Past deadline →</span>
                </div>

                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-1 shadow-2xs">
                  <div className="flex items-center justify-between text-[#64748B]">
                    <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">ON HOLD</span>
                    <Pause size={11} className="text-amber-500" />
                  </div>
                  <span className="text-lg font-bold text-amber-600">2</span>
                  <span className="text-[9px] text-[#64748B] flex items-center gap-0.5">On hold →</span>
                </div>

                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-1 shadow-2xs">
                  <div className="flex items-center justify-between text-[#64748B]">
                    <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">AT RISK</span>
                    <AlertTriangle size={11} className="text-amber-500" />
                  </div>
                  <span className="text-lg font-bold text-[#0F172A]">0</span>
                  <span className="text-[9px] text-[#64748B] flex items-center gap-0.5">Needs attention →</span>
                </div>
              </div>

              {/* Filter bar */}
              <div className="flex items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md text-[11px] text-[#64748B]">
                    <Search size={11} />
                    <span>Search projects... /</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[#64748B]">
                    <button className="p-1 hover:bg-slate-100 rounded"><Check size={12} /></button>
                    <button className="p-1 hover:bg-slate-100 rounded"><ListFilter size={12} /></button>
                    <button className="p-1 bg-slate-200 text-[#0F172A] rounded"><Columns size={12} /></button>
                  </div>
                </div>

                <button className="px-3 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-2xs">
                  <Plus size={11} />
                  <span>New Project</span>
                </button>
              </div>

              {/* Project Cards 3x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                
                {/* Project 1 */}
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="text-[#2563EB] font-medium">In Progress</span>
                      </div>
                      <MoreHorizontal size={12} className="text-[#94A3B8]" />
                    </div>
                    <div className="flex items-start gap-2 mt-2">
                      <div className="w-6 h-6 rounded bg-blue-50 text-[#2563EB] font-bold text-[9px] flex items-center justify-center shrink-0">
                        AC
                      </div>
                      <div>
                        <h6 className="font-bold text-[#0F172A] text-xs leading-snug">
                          Acme Corp — Global Rebrand &amp; Design System
                        </h6>
                        <span className="text-[10px] text-[#64748B]">Acme Corporation</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[10px] text-[#64748B]">
                    <span>68% (12/18 tasks)</span>
                    <span className="flex items-center gap-1"><Calendar size={10} /> Oct 28, 2026</span>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="text-[#2563EB] font-medium">In Progress</span>
                      </div>
                      <MoreHorizontal size={12} className="text-[#94A3B8]" />
                    </div>
                    <div className="flex items-start gap-2 mt-2">
                      <div className="w-6 h-6 rounded bg-slate-100 text-[#0F172A] font-bold text-[9px] flex items-center justify-center shrink-0">
                        SP
                      </div>
                      <div>
                        <h6 className="font-bold text-[#0F172A] text-xs leading-snug">
                          Fintech Mobile App &amp; Customer Portal
                        </h6>
                        <span className="text-[10px] text-[#64748B]">Starlight Pay</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[10px] text-[#64748B]">
                    <span>85% (17/20 tasks)</span>
                    <span className="flex items-center gap-1"><Calendar size={10} /> Nov 04, 2026</span>
                  </div>
                </div>

                {/* Project 3 */}
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-amber-800 font-medium">In Review</span>
                      </div>
                      <MoreHorizontal size={12} className="text-[#94A3B8]" />
                    </div>
                    <div className="flex items-start gap-2 mt-2">
                      <div className="w-6 h-6 rounded bg-purple-50 text-purple-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                        HA
                      </div>
                      <div>
                        <h6 className="font-bold text-[#0F172A] text-xs leading-snug">
                          SaaS Marketing Website &amp; 3D Assets
                        </h6>
                        <span className="text-[10px] text-[#64748B]">HyperScale AI</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[10px] text-[#64748B]">
                    <span>42% (8/19 tasks)</span>
                    <span className="flex items-center gap-1"><Calendar size={10} /> Nov 15, 2026</span>
                  </div>
                </div>

                {/* Project 4 */}
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-emerald-700 font-medium">Completed</span>
                      </div>
                      <MoreHorizontal size={12} className="text-[#94A3B8]" />
                    </div>
                    <div className="flex items-start gap-2 mt-2">
                      <div className="w-6 h-6 rounded bg-emerald-50 text-emerald-800 font-bold text-[9px] flex items-center justify-center shrink-0">
                        LR
                      </div>
                      <div>
                        <h6 className="font-bold text-[#0F172A] text-xs leading-snug">
                          E-Commerce Headless Storefront Migration
                        </h6>
                        <span className="text-[10px] text-[#64748B]">Lumina Retail</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[10px]">
                    <span className="font-bold text-emerald-600">100% (24/24)</span>
                    <span className="text-emerald-600 flex items-center gap-1"><Calendar size={10} /> Delivered</span>
                  </div>
                </div>

                {/* Project 5 */}
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span className="text-[#64748B] font-medium">Planning</span>
                      </div>
                      <MoreHorizontal size={12} className="text-[#94A3B8]" />
                    </div>
                    <div className="flex items-start gap-2 mt-2">
                      <div className="w-6 h-6 rounded bg-slate-100 text-[#0F172A] font-bold text-[9px] flex items-center justify-center shrink-0">
                        VL
                      </div>
                      <div>
                        <h6 className="font-bold text-[#0F172A] text-xs leading-snug">
                          Enterprise Cloud Infrastructure Setup
                        </h6>
                        <span className="text-[10px] text-[#64748B]">Vortex Labs</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[10px] text-[#64748B]">
                    <span>15% (3/20 tasks)</span>
                    <span className="flex items-center gap-1"><Calendar size={10} /> Dec 02, 2026</span>
                  </div>
                </div>

                {/* Project 6 */}
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="text-[#2563EB] font-medium">In Progress</span>
                      </div>
                      <MoreHorizontal size={12} className="text-[#94A3B8]" />
                    </div>
                    <div className="flex items-start gap-2 mt-2">
                      <div className="w-6 h-6 rounded bg-slate-100 text-[#0F172A] font-bold text-[9px] flex items-center justify-center shrink-0">
                        OM
                      </div>
                      <div>
                        <h6 className="font-bold text-[#0F172A] text-xs leading-snug">
                          Brand Strategy &amp; Video Campaign
                        </h6>
                        <span className="text-[10px] text-[#64748B]">Oasis Media</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[10px] text-[#64748B]">
                    <span>55% (11/20 tasks)</span>
                    <span className="flex items-center gap-1"><Calendar size={10} /> Dec 10, 2026</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* VIEW 3: TASKS KANBAN */}
          {currentView === "tasks" && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              
              {/* 7 Metric Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[9px] font-mono text-[#64748B] font-semibold">ACTIVE</span>
                  <span className="text-base font-bold text-[#0F172A]">3</span>
                </div>
                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[9px] font-mono text-red-500 font-semibold">OVERDUE</span>
                  <span className="text-base font-bold text-red-500">2</span>
                </div>
                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[9px] font-mono text-[#64748B] font-semibold">DUE TODAY</span>
                  <span className="text-base font-bold text-[#0F172A]">0</span>
                </div>
                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[9px] font-mono text-[#64748B] font-semibold">DUE THIS WEEK</span>
                  <span className="text-base font-bold text-[#0F172A]">0</span>
                </div>
                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[9px] font-mono text-emerald-600 font-semibold">DONE THIS WEEK</span>
                  <span className="text-base font-bold text-emerald-600">2</span>
                </div>
                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[9px] font-mono text-[#64748B] font-semibold">AVG COMPLETION</span>
                  <span className="text-base font-bold text-[#0F172A]">590h</span>
                </div>
                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-0.5 shadow-2xs">
                  <span className="text-[9px] font-mono text-[#64748B] font-semibold">COMPLETION RATE</span>
                  <span className="text-base font-bold text-emerald-600">97%</span>
                </div>
              </div>

              {/* Action and View Switcher Bar */}
              <div className="flex items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md text-[11px] text-[#64748B]">
                    <Search size={11} />
                    <span>Search tasks... /</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white border border-[#E2E8F0] rounded-md text-[11px] text-[#64748B]">
                    <SlidersHorizontal size={11} />
                    <span>My Tasks</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10.5px]">
                    <span className="px-2 py-0.5 text-[#64748B] cursor-pointer">List view</span>
                    <span className="px-2 py-0.5 bg-[#2563EB] text-white rounded font-medium shadow-2xs">Board</span>
                    <span className="px-2 py-0.5 text-[#64748B] cursor-pointer hidden sm:inline">Workload</span>
                  </div>
                  <button className="px-3 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-2xs">
                    <Plus size={11} />
                    <span>New Task</span>
                  </button>
                </div>
              </div>

              {/* 4 Kanban Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                
                {/* Column 1: To Do */}
                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] pb-1 border-b border-[#F1F5F9]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full border border-slate-400" />
                      <span>To Do</span>
                      <span className="text-[10px] text-[#94A3B8] font-normal">1</span>
                    </div>
                    <Plus size={12} className="text-[#94A3B8]" />
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-[#E2E8F0] rounded-lg shadow-2xs flex flex-col gap-1.5">
                    <span className="font-semibold text-[#0F172A] text-xs">Audit design tokens for WCAG AA</span>
                    <span className="text-[10px] text-[#64748B]">Acme Corp Rebrand</span>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[9.5px]">
                      <span className="text-[#64748B]">Progress: 0%</span>
                      <div className="w-4 h-4 rounded-full bg-slate-700 text-white text-[8px] flex items-center justify-center font-bold">
                        ER
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: In Progress */}
                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#D97706] pb-1 border-b border-[#F1F5F9]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>In Progress</span>
                      <span className="text-[10px] text-[#94A3B8] font-normal">1</span>
                    </div>
                    <Plus size={12} className="text-[#94A3B8]" />
                  </div>
                  <div
                    ref={taskCardRef}
                    className="p-2.5 bg-white border border-blue-400 rounded-lg shadow-xs flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#0F172A] text-xs">Configure portal SSL &amp; CNAME</span>
                      <span className="px-1 py-0.2 bg-red-100 text-red-700 font-mono text-[9px] rounded font-semibold">Overdue</span>
                    </div>
                    <span className="text-[10px] text-red-500 font-mono flex items-center gap-1">
                      <Calendar size={10} /> Oct 12, 2026
                    </span>
                    <span className="text-[10px] text-[#64748B]">Starlight Pay</span>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[9.5px]">
                      <span className="text-[#64748B]">Progress: 60%</span>
                      <div className="w-4 h-4 rounded-full bg-blue-700 text-white text-[8px] flex items-center justify-center font-bold">
                        AM
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: In Review */}
                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#E11D48] pb-1 border-b border-[#F1F5F9]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <span>In Review</span>
                      <span className="text-[10px] text-[#94A3B8] font-normal">1</span>
                    </div>
                    <Plus size={12} className="text-[#94A3B8]" />
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-[#E2E8F0] rounded-lg shadow-2xs flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#0F172A] text-xs">Figma component library handoff</span>
                      <span className="px-1 py-0.2 bg-red-100 text-red-700 font-mono text-[9px] rounded font-semibold">Overdue</span>
                    </div>
                    <span className="text-[10px] text-red-500 font-mono flex items-center gap-1">
                      <Calendar size={10} /> Oct 18, 2026
                    </span>
                    <span className="text-[10px] text-[#64748B]">Acme Corp Rebrand</span>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[9.5px]">
                      <span className="text-[#64748B]">Progress: 90%</span>
                      <div className="w-4 h-4 rounded-full bg-slate-700 text-white text-[8px] flex items-center justify-center font-bold">
                        SC
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 4: Done */}
                <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-700 pb-1 border-b border-[#F1F5F9]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Done</span>
                      <span className="text-[10px] text-[#94A3B8] font-normal">92</span>
                    </div>
                    <Plus size={12} className="text-[#94A3B8]" />
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-[#E2E8F0] rounded-lg shadow-2xs flex flex-col gap-1 opacity-90">
                    <span className="font-medium text-[#0F172A] text-xs">Milestone 2 sign-off &amp; invoice</span>
                    <span className="text-[9.5px] text-[#64748B] flex items-center gap-1">
                      <Calendar size={10} /> Oct 02, 2026 • Vortex Labs
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-[#E2E8F0] rounded-lg shadow-2xs flex flex-col gap-1 opacity-90">
                    <span className="font-medium text-[#0F172A] text-xs">Automate SLA escalation rules</span>
                    <span className="text-[9.5px] text-[#64748B] flex items-center gap-1">
                      <Calendar size={10} /> Oct 08, 2026 • Internal Workflows
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* VIEW 4: MESSAGES */}
          {currentView === "messages" && (
            <div className="grid grid-cols-1 md:grid-cols-3 border border-[#E2E8F0] rounded-xl overflow-hidden bg-white shadow-2xs animate-fadeIn min-h-[360px]">
              
              {/* Channel list */}
              <div className="border-r border-[#E2E8F0] bg-slate-50/60 p-3 flex flex-col gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md text-[11px] text-[#64748B]">
                  <Search size={11} />
                  <span>Search or start a new DM...</span>
                </div>

                <div className="flex flex-col gap-1 text-[11px]">
                  <span className="text-[9.5px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold px-1">
                    Projects
                  </span>
                  <div className="flex items-center justify-between px-2 py-1.5 bg-[#EDF2F7] text-[#1E40AF] rounded-lg font-medium">
                    <div className="flex items-center gap-2">
                      <FolderKanban size={13} className="text-[#2563EB]" />
                      <span>Acme Corp Rebrand</span>
                    </div>
                    <span className="text-[9.5px] text-[#64748B]">2m ago</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-1 text-[#64748B] hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FolderKanban size={13} />
                      <span className="truncate">Starlight Pay Mobile</span>
                    </div>
                    <span className="text-[9.5px] text-[#94A3B8]">1h ago</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-1 text-[#64748B] hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FolderKanban size={13} />
                      <span>HyperScale AI</span>
                    </div>
                    <span className="text-[9px] bg-blue-100 text-blue-700 px-1 rounded">New</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-[11px] pt-2 border-t border-slate-200">
                  <span className="text-[9.5px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold px-1">
                    Organizations
                  </span>
                  <div className="flex items-center justify-between px-2 py-1 text-[#64748B] hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Building size={13} />
                      <span>Acme Corporation</span>
                    </div>
                    <span className="text-[9.5px] text-emerald-600 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-1 text-[#64748B] hover:bg-slate-100 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Building size={13} />
                      <span>Lumina Retail</span>
                    </div>
                    <span className="text-[9px] bg-blue-100 text-blue-700 px-1 rounded">New</span>
                  </div>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="md:col-span-2 flex flex-col justify-between bg-white">
                <div className="p-3 border-b border-[#E2E8F0] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderKanban size={14} className="text-[#2563EB]" />
                    <span className="font-bold text-[#0F172A] text-xs">Acme Corp Rebrand</span>
                  </div>
                  <span className="text-[10px] text-[#64748B]">All project members</span>
                </div>

                <div className="p-3.5 flex flex-col gap-3 max-h-[260px] overflow-y-auto text-[11.5px]">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                      MV
                    </div>
                    <div>
                      <span className="font-bold text-[10.5px] text-[#0F172A]">Marcus Vance (Client Lead) <span className="font-normal text-[9.5px] text-[#94A3B8]">02:14 PM</span></span>
                      <p className="bg-slate-100 p-2 rounded-xl rounded-tl-none text-[#0F172A] mt-0.5">
                        Hey team, the design token handoff looks fantastic! Did you push the portal DNS update?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 self-end text-right">
                    <div>
                      <span className="font-bold text-[10.5px] text-[#0F172A]">Alex Morgan (Agency Lead) <span className="font-normal text-[9.5px] text-[#94A3B8]">02:15 PM</span></span>
                      <p className="bg-[#2563EB] text-white p-2 rounded-xl rounded-tr-none mt-0.5 text-left">
                        Thanks Marcus! Yes, the custom CNAME is live with auto-renewing SSL active. Check your portal link.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                      MV
                    </div>
                    <div>
                      <span className="font-bold text-[10.5px] text-[#0F172A]">Marcus Vance <span className="font-normal text-[9.5px] text-[#94A3B8]">02:16 PM</span></span>
                      <div className="bg-slate-100 p-2 rounded-xl rounded-tl-none text-[#0F172A] mt-0.5 relative group">
                        Verified on our end — loads lightning fast. Milestone 2 approved!
                        <div className="mt-1 flex items-center gap-1 text-[10px]">
                          <span className="px-1 py-0.2 bg-white border border-slate-200 rounded flex items-center gap-0.5"><Smile size={10} /> 🚀</span>
                          <span className="px-1 py-0.2 bg-white border border-slate-200 rounded flex items-center gap-0.5"><Undo2 size={10} /> 👍</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message input */}
                <div className="p-2.5 border-t border-[#E2E8F0] flex items-center gap-2">
                  <button className="text-[#94A3B8] hover:text-[#0F172A]"><Paperclip size={14} /></button>
                  <button className="text-[#2563EB]"><Sparkles size={14} /></button>
                  <input
                    type="text"
                    placeholder="Type a message... (@ to mention, / to search)"
                    className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none"
                  />
                  <button className="p-1.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors">
                    <Send size={12} />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* VIEW 5: TICKETS */}
          {currentView === "tickets" && (
            <div className="flex flex-col gap-2.5 border border-[#E2E8F0] rounded-xl overflow-hidden bg-white shadow-2xs animate-fadeIn">
              
              {/* Header filter row */}
              <div className="p-2.5 bg-slate-50/70 border-b border-[#E2E8F0] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md text-[11px] text-[#64748B]">
                    <Search size={11} />
                    <span>Search tickets... /</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[#64748B]">
                    <button className="p-1 hover:bg-slate-100 rounded"><Check size={12} /></button>
                    <button className="p-1 hover:bg-slate-100 rounded"><ListFilter size={12} /></button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#64748B] flex items-center gap-1 cursor-pointer">
                    <Settings size={11} /> SLA
                  </span>
                  <button className="px-2.5 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-2xs">
                    <Plus size={11} />
                    <span>New Ticket</span>
                  </button>
                </div>
              </div>

              {/* Tickets Table */}
              <div className="overflow-x-auto text-[11px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] bg-slate-50/50 text-[#64748B] font-medium text-[10px]">
                      <th className="py-2 px-3">ID</th>
                      <th className="py-2 px-3">Title</th>
                      <th className="py-2 px-3 hidden sm:table-cell">Organizations</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3 hidden md:table-cell">Priority</th>
                      <th className="py-2 px-3 hidden lg:table-cell">Assignee</th>
                      <th className="py-2 px-3 text-right">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2 px-3 font-mono text-[#2563EB] font-bold">TKT-1081</td>
                      <td className="py-2 px-3 font-semibold text-[#0F172A]">Update custom CNAME DNS for client portal</td>
                      <td className="py-2 px-3 text-[#64748B] hidden sm:table-cell">Acme Corporation</td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9.5px] font-medium bg-blue-50 text-blue-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Open
                        </span>
                      </td>
                      <td className="py-2 px-3 hidden md:table-cell">
                        <span className="text-amber-600 font-medium">● High</span>
                      </td>
                      <td className="py-2 px-3 text-[#0F172A] hidden lg:table-cell">Alex Morgan</td>
                      <td className="py-2 px-3 text-right text-[#64748B] font-mono text-[10px]">5m ago</td>
                    </tr>

                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2 px-3 font-mono text-[#2563EB] font-bold">TKT-1080</td>
                      <td className="py-2 px-3 font-semibold text-[#0F172A]">Configure automated Stripe billing webhook</td>
                      <td className="py-2 px-3 text-[#64748B] hidden sm:table-cell">Starlight Pay</td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9.5px] font-medium bg-emerald-50 text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Resolved
                        </span>
                      </td>
                      <td className="py-2 px-3 hidden md:table-cell">
                        <span className="text-amber-600 font-medium">● High</span>
                      </td>
                      <td className="py-2 px-3 text-[#0F172A] hidden lg:table-cell">Marcus Vance</td>
                      <td className="py-2 px-3 text-right text-[#64748B] font-mono text-[10px]">2h ago</td>
                    </tr>

                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2 px-3 font-mono text-[#2563EB] font-bold">TKT-1078</td>
                      <td className="py-2 px-3 font-semibold text-[#0F172A]">Add team member permissions for Q4 campaign</td>
                      <td className="py-2 px-3 text-[#64748B] hidden sm:table-cell">HyperScale AI</td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9.5px] font-medium bg-amber-50 text-amber-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> In Progress
                        </span>
                      </td>
                      <td className="py-2 px-3 hidden md:table-cell">
                        <span className="text-red-600 font-bold">● Critical</span>
                      </td>
                      <td className="py-2 px-3 text-[#0F172A] hidden lg:table-cell">Sarah Chen</td>
                      <td className="py-2 px-3 text-right text-[#64748B] font-mono text-[10px]">4h ago</td>
                    </tr>

                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2 px-3 font-mono text-[#2563EB] font-bold">TKT-1075</td>
                      <td className="py-2 px-3 font-semibold text-[#0F172A]">Client asset approval for billboard campaign</td>
                      <td className="py-2 px-3 text-[#64748B] hidden sm:table-cell">Lumina Retail</td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9.5px] font-medium bg-purple-50 text-purple-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Waiting on Client
                        </span>
                      </td>
                      <td className="py-2 px-3 hidden md:table-cell">
                        <span className="text-yellow-600 font-medium">● Low</span>
                      </td>
                      <td className="py-2 px-3 text-[#0F172A] hidden lg:table-cell">Alex Morgan</td>
                      <td className="py-2 px-3 text-right text-[#64748B] font-mono text-[10px]">1d ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* AI COPILOT MODAL */}
          {copilotOpen && (
            <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] z-50 flex items-center justify-center p-3 animate-fadeIn">
              <div className="w-[96%] sm:max-w-xl max-h-[90%] overflow-y-auto no-scrollbar bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col gap-3">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-purple-600 font-bold text-sm">✦ EidonCore AI Copilot</span>
                    <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded uppercase">
                      PROJECT MANAGER
                    </span>
                    <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded uppercase flex items-center gap-1">
                      ⚡ GOOGLE GEMINI
                    </span>
                  </div>
                  <button
                    ref={copilotCloseRef}
                    onClick={() => {
                      setCopilotOpen(false);
                      setCopilotSubmitted(false);
                      setCopilotQuery("");
                    }}
                    className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded hover:bg-slate-100"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Copilot Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 text-[11px] font-medium">
                  <span className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200/80 rounded-full font-semibold">
                    ✦ Copilot Q&amp;A
                  </span>
                  <span className="px-2.5 py-1 text-[#64748B] hover:bg-slate-100 rounded-full">
                    ☑ Task Generator
                  </span>
                  <span className="px-2.5 py-1 text-[#64748B] hover:bg-slate-100 rounded-full hidden sm:inline">
                    ⚙ Ticket Triage
                  </span>
                  <span className="px-2.5 py-1 text-[#64748B] hover:bg-slate-100 rounded-full hidden sm:inline">
                    ✍ Polish Message
                  </span>
                </div>

                {/* Scoped Context helper */}
                <div className="p-2.5 bg-slate-50 border border-slate-200/70 rounded-xl text-[11px] text-[#64748B] flex flex-col gap-0.5">
                  <span className="font-semibold text-[#0F172A]">Helping with Dashboard</span>
                  <span>Answers use only the workspace information available to your role.</span>
                  <span className="text-[10px] text-[#2563EB] cursor-pointer mt-0.5">▸ Available areas (16)</span>
                </div>

                {/* Prompt Section */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10.5px] font-semibold text-[#0F172A]">
                    Ask EidonCore AI (Scoped to your role &amp; permissions)
                  </span>
                  <div className="border border-slate-300 rounded-xl p-2.5 bg-white shadow-2xs">
                    <textarea
                      rows={2}
                      value={copilotQuery}
                      onChange={(e) => setCopilotQuery(e.target.value)}
                      placeholder="e.g., What tasks are pending for next sprint? Or summarize our project scope..."
                      className="w-full text-xs text-[#0F172A] bg-transparent outline-none resize-none placeholder:text-[#94A3B8]"
                    />
                  </div>
                </div>

                {/* Chips */}
                <div className="flex flex-col gap-1">
                  <button
                    ref={copilotChipRef}
                    onClick={() => {
                      setCopilotQuery("Review project progress, milestones, approvals and missing deliverables.");
                    }}
                    className="text-left px-2.5 py-1 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-[#0F172A] border border-slate-200 rounded-lg text-[10.5px] transition-colors"
                  >
                    • Review project progress, milestones, approvals and missing deliverables.
                  </button>
                  <button
                    onClick={() => {
                      setCopilotQuery("Find blockers, unfinished checklist items and the next tasks to prioritize.");
                    }}
                    className="text-left px-2.5 py-1 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-[#0F172A] border border-slate-200 rounded-lg text-[10.5px] transition-colors hidden sm:block"
                  >
                    • Find blockers, unfinished checklist items and the next tasks to prioritize.
                  </button>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-[#94A3B8]">
                  <span>Enter ↵ to send • Shift+Enter for new line</span>
                  <button
                    ref={copilotSubmitRef}
                    onClick={() => setCopilotSubmitted(true)}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-xs flex items-center gap-1.5 text-xs transition-colors"
                  >
                    <Sparkles size={12} />
                    <span>Ask Assistant</span>
                  </button>
                </div>

                {/* Response Area */}
                {copilotSubmitted && (
                  <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-[#0F172A] flex flex-col gap-1 animate-fadeIn">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px]">
                      <Check size={12} />
                      <span>Workspace Analysis Complete:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#334155] m-0">
                      • <strong>Projects</strong>: 11 active projects. Acme Corp milestone review approved, DNS propagation verified.<br />
                      • <strong>Tasks</strong>: 2 items in flight (Portal SSL setup &amp; Figma token handoff).
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* VIRTUAL ANIMATED CURSOR (Mounted directly at root of container for pixel-perfect coordinates) */}
      {cursorPos.visible && (
        <div
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
            transition: "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="hidden md:block absolute top-0 left-0 pointer-events-none z-[120]"
        >
          <div className="relative">
            {/* Click ripple animation on click */}
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
