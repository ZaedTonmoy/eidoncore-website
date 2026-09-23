"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Sparkles,
  Layers,
  FolderKanban,
  CheckCircle2,
  Receipt,
  MessageSquare,
  Ticket,
  Lock,
  ArrowRight,
  X,
  Check,
  Send,
  Plus,
  RotateCw,
} from "lucide-react";

export type ViewType = "dashboard" | "projects" | "tasks" | "messages" | "tickets";

export default function HeroAppWindow() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotQuery, setCopilotQuery] = useState("");
  const [copilotSubmitted, setCopilotSubmitted] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 300, y: 150, visible: true });
  const [cursorClicked, setCursorClicked] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
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

  const moveCursor = (
    targetRef: React.RefObject<HTMLElement | null>,
    callback?: () => void,
    dwellMs = 1200
  ) => {
    if (!targetRef.current || !containerRef.current) {
      if (callback) callback();
      return;
    }
    const cRect = containerRef.current.getBoundingClientRect();
    const tRect = targetRef.current.getBoundingClientRect();

    const x = tRect.left - cRect.left + tRect.width / 2;
    const y = tRect.top - cRect.top + tRect.height / 2;

    setCursorPos({ x, y, visible: true });

    const t = setTimeout(() => {
      setCursorClicked(true);
      setTimeout(() => setCursorClicked(false), 240);
      if (callback) callback();
    }, dwellMs);
    timeoutsRef.current.push(t);
  };

  const runSimulation = () => {
    clearTimeouts();
    setCopilotOpen(false);
    setCopilotSubmitted(false);
    setCopilotQuery("");
    setCurrentView("dashboard");
    setCursorPos({ x: 300, y: 150, visible: true });

    // Step 1: Dwell on Dashboard -> move to "Open task board" button (T = 2.0s)
    timeoutsRef.current.push(
      setTimeout(() => {
        moveCursor(openBoardBtnRef, () => {
          setCurrentView("tasks");
        }, 1100);
      }, 2000)
    );

    // Step 2: In Tasks -> hover task card (T = 5.2s)
    timeoutsRef.current.push(
      setTimeout(() => {
        moveCursor(taskCardRef, () => {}, 1000);
      }, 5200)
    );

    // Step 3: Move to Projects in sidebar (T = 8.5s)
    timeoutsRef.current.push(
      setTimeout(() => {
        moveCursor(navProjectsRef, () => {
          setCurrentView("projects");
        }, 1100);
      }, 8500)
    );

    // Step 4: Move to AI Copilot in topbar (T = 12.0s)
    timeoutsRef.current.push(
      setTimeout(() => {
        moveCursor(copilotTriggerRef, () => {
          setCopilotOpen(true);
        }, 1100);
      }, 12000)
    );

    // Step 5: Inside Copilot -> click chip (T = 14.8s)
    timeoutsRef.current.push(
      setTimeout(() => {
        moveCursor(copilotChipRef, () => {
          setCopilotQuery("Summarize weekly project progress & blockers across active clients");
        }, 1000);
      }, 14800)
    );

    // Step 6: Submit prompt (T = 17.5s)
    timeoutsRef.current.push(
      setTimeout(() => {
        moveCursor(copilotSubmitRef, () => {
          setCopilotSubmitted(true);
        }, 1000);
      }, 17500)
    );

    // Step 7: Close Copilot modal (T = 22.0s)
    timeoutsRef.current.push(
      setTimeout(() => {
        moveCursor(copilotCloseRef, () => {
          setCopilotOpen(false);
          setCopilotSubmitted(false);
          setCopilotQuery("");
        }, 1100);
      }, 22000)
    );

    // Step 8: Move to Tickets in sidebar (T = 24.8s)
    timeoutsRef.current.push(
      setTimeout(() => {
        moveCursor(navTicketsRef, () => {
          setCurrentView("tickets");
        }, 1100);
      }, 24800)
    );

    // Step 9: Move to Messages in sidebar (T = 29.0s)
    timeoutsRef.current.push(
      setTimeout(() => {
        moveCursor(navMessagesRef, () => {
          setCurrentView("messages");
        }, 1100);
      }, 29000)
    );

    // Step 10: Return to Dashboard (T = 33.5s)
    timeoutsRef.current.push(
      setTimeout(() => {
        moveCursor(navDashboardRef, () => {
          setCurrentView("dashboard");
        }, 1100);
      }, 33500)
    );

    // Step 11: Repeat cycle (T = 37.0s)
    timeoutsRef.current.push(
      setTimeout(() => {
        runSimulation();
      }, 37000)
    );
  };

  useEffect(() => {
    const initTimer = setTimeout(runSimulation, 800);
    return () => {
      clearTimeout(initTimer);
      clearTimeouts();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#FFFFFF] border border-[#E7E7EA] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.07)] overflow-hidden transition-all duration-300"
    >
      {/* 1. Browser Chrome / Window Header */}
      <div className="h-10 sm:h-11 bg-[#F9F9FB] border-b border-[#E7E7EA] px-3 sm:px-4 flex items-center justify-between select-none">
        {/* Window dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E7E7EA] rounded-md text-[10.5px] sm:text-[11.5px] font-mono text-[#6B6F76] shadow-2xs max-w-[200px] sm:max-w-[340px] truncate justify-between">
          <div className="flex items-center gap-1.5 truncate">
            <Lock size={10} className="text-emerald-500 shrink-0" />
            <span className="text-[#0B0B0F] font-medium truncate">app.eidoncore.com</span>
            <span className="text-[#3F72AF] hidden sm:inline">/{currentView}</span>
          </div>
          <button
            onClick={runSimulation}
            title="Restart automated simulation"
            className="text-[#6B6F76]/70 hover:text-[#0B0B0F] transition-colors ml-1"
          >
            <RotateCw size={10} />
          </button>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-emerald-50 border border-emerald-200/60 rounded-full text-[10px] sm:text-[11px] font-medium text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden xs:inline">Live</span> Sync
          </span>
        </div>
      </div>

      {/* Mobile Horizontal Navigation Tabs (Visible on < md screens) */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto no-scrollbar p-2 bg-[#FAFAFA] border-b border-[#E7E7EA] text-[11px] font-medium">
        <button
          onClick={() => setCurrentView("dashboard")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "dashboard"
              ? "bg-[#3F72AF] text-white"
              : "text-[#6B6F76] hover:bg-neutral-100"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setCurrentView("projects")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors flex items-center gap-1 ${
            currentView === "projects"
              ? "bg-[#3F72AF] text-white"
              : "text-[#6B6F76] hover:bg-neutral-100"
          }`}
        >
          <span>Projects</span>
          <span className="text-[9px] bg-white/20 px-1 rounded">11</span>
        </button>
        <button
          onClick={() => setCurrentView("tasks")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors flex items-center gap-1 ${
            currentView === "tasks"
              ? "bg-[#3F72AF] text-white"
              : "text-[#6B6F76] hover:bg-neutral-100"
          }`}
        >
          <span>Tasks</span>
          <span className="text-[9px] bg-white/20 px-1 rounded">24</span>
        </button>
        <button
          onClick={() => setCurrentView("messages")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "messages"
              ? "bg-[#3F72AF] text-white"
              : "text-[#6B6F76] hover:bg-neutral-100"
          }`}
        >
          Messages
        </button>
        <button
          onClick={() => setCurrentView("tickets")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors flex items-center gap-1 ${
            currentView === "tickets"
              ? "bg-[#3F72AF] text-white"
              : "text-[#6B6F76] hover:bg-neutral-100"
          }`}
        >
          <span>Tickets</span>
          <span className="text-[9px] bg-amber-400 text-amber-950 px-1 rounded font-bold">3</span>
        </button>
      </div>

      {/* 2. Dashboard Shell: Sidebar + Main Canvas */}
      <div className="grid grid-cols-12 min-h-[460px] sm:min-h-[500px] text-xs">
        
        {/* Desktop Sidebar Navigation (Hidden on < md) */}
        <aside className="hidden md:flex md:col-span-3 lg:col-span-2.5 border-r border-[#E7E7EA] bg-[#FAFAFA] p-3 flex-col justify-between select-none">
          <div className="flex flex-col gap-3">
            
            {/* Workspace Brand Header */}
            <div className="flex items-center justify-between px-2.5 py-1.5 bg-white border border-[#E7E7EA] rounded-lg shadow-2xs">
              <div className="flex items-center gap-2 truncate">
                <span className="w-4 h-4 rounded bg-[#0F172A] text-white flex items-center justify-center text-[9px] font-bold">
                  S
                </span>
                <span className="font-semibold text-[#0B0B0F] truncate text-[11.5px]">
                  Studio Nine
                </span>
              </div>
              <span className="text-[9.5px] font-mono text-[#3F72AF] font-bold">PRO</span>
            </div>

            {/* Navigation Buttons */}
            <nav className="flex flex-col gap-0.5">
              <button
                ref={navDashboardRef}
                onClick={() => setCurrentView("dashboard")}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11.5px] font-medium transition-colors text-left ${
                  currentView === "dashboard"
                    ? "bg-[#3F72AF]/10 text-[#3F72AF]"
                    : "text-[#6B6F76] hover:bg-neutral-100 hover:text-[#0B0B0F]"
                }`}
              >
                <Layers size={13} />
                <span>Dashboard</span>
              </button>

              <button
                ref={navProjectsRef}
                onClick={() => setCurrentView("projects")}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11.5px] font-medium transition-colors text-left ${
                  currentView === "projects"
                    ? "bg-[#3F72AF]/10 text-[#3F72AF]"
                    : "text-[#6B6F76] hover:bg-neutral-100 hover:text-[#0B0B0F]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FolderKanban size={13} />
                  <span>Projects</span>
                </div>
                <span className="text-[10px] font-mono bg-neutral-200/70 px-1 rounded text-[#0B0B0F]">
                  11
                </span>
              </button>

              <button
                ref={navTasksRef}
                onClick={() => setCurrentView("tasks")}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11.5px] font-medium transition-colors text-left ${
                  currentView === "tasks"
                    ? "bg-[#3F72AF]/10 text-[#3F72AF]"
                    : "text-[#6B6F76] hover:bg-neutral-100 hover:text-[#0B0B0F]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} />
                  <span>Tasks</span>
                </div>
                <span className="text-[10px] font-mono bg-neutral-200/70 px-1 rounded text-[#0B0B0F]">
                  24
                </span>
              </button>

              <button
                ref={navMessagesRef}
                onClick={() => setCurrentView("messages")}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11.5px] font-medium transition-colors text-left ${
                  currentView === "messages"
                    ? "bg-[#3F72AF]/10 text-[#3F72AF]"
                    : "text-[#6B6F76] hover:bg-neutral-100 hover:text-[#0B0B0F]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare size={13} />
                  <span>Messages</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#3F72AF]" />
              </button>

              <button
                ref={navTicketsRef}
                onClick={() => setCurrentView("tickets")}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11.5px] font-medium transition-colors text-left ${
                  currentView === "tickets"
                    ? "bg-[#3F72AF]/10 text-[#3F72AF]"
                    : "text-[#6B6F76] hover:bg-neutral-100 hover:text-[#0B0B0F]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Ticket size={13} />
                  <span>Tickets</span>
                </div>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-1 rounded font-semibold">
                  3
                </span>
              </button>
            </nav>

            {/* Finance & Tools */}
            <div>
              <span className="px-2.5 text-[9.5px] font-mono text-[#6B6F76] uppercase tracking-wider font-semibold">
                Finance
              </span>
              <nav className="mt-1 flex flex-col gap-0.5">
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11.5px] text-[#6B6F76] hover:bg-neutral-100 hover:text-[#0B0B0F] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Receipt size={13} />
                    <span>Invoices</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium">Auto-sync</span>
                </div>
              </nav>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E7E7EA] flex items-center justify-between px-1">
            <span className="text-[10.5px] text-[#6B6F76]">Plan: Pro Trial</span>
            <span className="text-[10.5px] font-mono text-[#3F72AF] font-bold">14d left</span>
          </div>
        </aside>

        {/* Main Content Canvas (Full 12-cols on mobile, 9/9.5 cols on desktop) */}
        <main className="col-span-12 md:col-span-9 lg:col-span-9.5 p-3.5 sm:p-6 flex flex-col gap-4 sm:gap-5 bg-white relative">
          
          {/* Canvas Top Bar */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E7E7EA]">
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[#0B0B0F] tracking-tight capitalize truncate">
                {currentView === "dashboard" ? "Command Center" : currentView}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#6B6F76] truncate hidden xs:block">
                {currentView === "dashboard" && "Active projects, billing, and team workload"}
                {currentView === "projects" && "11 active projects across client accounts"}
                {currentView === "tasks" && "Kanban board & delivery pipelines"}
                {currentView === "messages" && "Client portal communications"}
                {currentView === "tickets" && "Support tickets & SLA monitoring"}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] border border-[#E7E7EA] rounded-lg text-[#6B6F76] text-xs">
                <Search size={12} />
                <span className="text-[11px]">Search...</span>
                <kbd className="text-[9px] bg-white border border-[#E7E7EA] px-1 rounded text-[#0B0B0F]">
                  ⌘K
                </kbd>
              </div>

              <button
                ref={copilotTriggerRef}
                onClick={() => setCopilotOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-[#3F72AF] text-white rounded-lg text-[11px] sm:text-xs font-semibold hover:bg-[#325d91] transition-colors shadow-2xs"
              >
                <Sparkles size={11} />
                <span>AI Copilot</span>
                <kbd className="text-[9px] bg-white/20 px-1 rounded text-white ml-0.5 hidden sm:inline">
                  ⌘J
                </kbd>
              </button>
            </div>
          </div>

          {/* VIEW 1: DASHBOARD */}
          {currentView === "dashboard" && (
            <div className="flex flex-col gap-3.5 sm:gap-4 animate-fadeIn">
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="p-2.5 sm:p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl flex flex-col gap-0.5">
                  <span className="text-[9px] sm:text-[10px] text-[#6B6F76] uppercase tracking-wider font-mono truncate">
                    Active Projects
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg sm:text-xl font-bold text-[#0B0B0F]">11</span>
                    <span className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold">+2</span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl flex flex-col gap-0.5">
                  <span className="text-[9px] sm:text-[10px] text-[#6B6F76] uppercase tracking-wider font-mono truncate">
                    Invoiced
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg sm:text-xl font-bold text-[#0B0B0F]">$48.2k</span>
                    <span className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold">92%</span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl flex flex-col gap-0.5">
                  <span className="text-[9px] sm:text-[10px] text-[#6B6F76] uppercase tracking-wider font-mono truncate">
                    Open Tickets
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg sm:text-xl font-bold text-[#0B0B0F]">3</span>
                    <span className="text-[9px] sm:text-[10px] text-[#6B6F76] font-mono">18m</span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl flex flex-col gap-0.5">
                  <span className="text-[9px] sm:text-[10px] text-[#6B6F76] uppercase tracking-wider font-mono truncate">
                    Automations
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg sm:text-xl font-bold text-[#3F72AF]">1,280</span>
                    <span className="text-[9px] sm:text-[10px] text-[#3F72AF] font-semibold">99.8%</span>
                  </div>
                </div>
              </div>

              {/* Priority Milestone Action Card */}
              <div className="p-3.5 sm:p-5 border border-[#E7E7EA] rounded-xl bg-white shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] sm:text-[10px] font-mono text-[#3F72AF] bg-[#3F72AF]/10 px-2 py-0.5 rounded font-bold">
                      ACTIVE SPRINT
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#6B6F76]">Apex Rebrand & Client Portal</span>
                  </div>
                  <h4 className="mt-1 text-xs sm:text-sm font-semibold text-[#0B0B0F] leading-snug">
                    Sprint Review: 18 tasks remaining across design and client sign-off
                  </h4>
                </div>

                <button
                  ref={openBoardBtnRef}
                  onClick={() => setCurrentView("tasks")}
                  className="w-full sm:w-auto px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shrink-0 transition-colors shadow-xs"
                >
                  <span>Open task board</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              {/* Delivery Table Snippet */}
              <div className="border border-[#E7E7EA] rounded-xl overflow-hidden bg-white">
                <div className="px-3 sm:px-4 py-2 bg-[#FAFAFA] border-b border-[#E7E7EA] flex items-center justify-between">
                  <span className="text-[10px] sm:text-[10.5px] font-bold text-[#0B0B0F] uppercase tracking-wider font-mono">
                    Live Client Accounts
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-[#3F72AF] font-semibold">All Systems Green</span>
                </div>
                <div className="divide-y divide-[#E7E7EA] text-xs">
                  <div className="p-2.5 sm:p-3 flex items-center justify-between hover:bg-neutral-50 gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-semibold text-[#0B0B0F] truncate text-[11px] sm:text-xs">Apex Global — Brand Identity</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600 shrink-0">88%</span>
                  </div>
                  <div className="p-2.5 sm:p-3 flex items-center justify-between hover:bg-neutral-50 gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <span className="font-semibold text-[#0B0B0F] truncate text-[11px] sm:text-xs">Mosaic Labs — Mobile Redesign</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#3F72AF] shrink-0">65%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: TASKS KANBAN */}
          {currentView === "tasks" && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {/* Column 1: To Do */}
                <div className="p-2.5 sm:p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0B0B0F]">
                    <span>TO DO (3)</span>
                    <Plus size={12} className="text-[#6B6F76]" />
                  </div>
                  <div className="p-2 bg-white border border-[#E7E7EA] rounded-lg shadow-2xs flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded w-max">
                      DESIGN
                    </span>
                    <span className="font-medium text-[#0B0B0F] text-xs leading-snug">
                      Export SVG vector assets for client approval
                    </span>
                    <span className="text-[9.5px] text-[#6B6F76]">Apex Rebrand • Sara K.</span>
                  </div>
                </div>

                {/* Column 2: In Progress */}
                <div className="p-2.5 sm:p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#3F72AF]">
                    <span>IN PROGRESS (4)</span>
                    <span className="w-2 h-2 rounded-full bg-[#3F72AF]" />
                  </div>
                  <div
                    ref={taskCardRef}
                    className="p-2 bg-white border border-[#3F72AF]/50 rounded-lg shadow-xs flex flex-col gap-1"
                  >
                    <span className="text-[9px] font-mono text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded w-max">
                      FRONTEND
                    </span>
                    <span className="font-semibold text-[#0B0B0F] text-xs leading-snug">
                      Wire white-label portal domain DNS
                    </span>
                    <div className="flex items-center justify-between text-[9.5px] text-[#6B6F76] mt-1 pt-1 border-t border-[#E7E7EA]">
                      <span>Due today</span>
                      <span className="font-mono text-emerald-600 font-bold">Active</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Done */}
                <div className="p-2.5 sm:p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>DONE (7)</span>
                    <Check size={13} className="text-emerald-600" />
                  </div>
                  <div className="p-2 bg-white border border-[#E7E7EA] rounded-lg shadow-2xs opacity-85">
                    <span className="text-[9px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded w-max">
                      INVOICING
                    </span>
                    <p className="font-medium text-[#0B0B0F] text-xs line-through text-[#6B6F76] mt-0.5 leading-snug">
                      Retainer deposit collected via Stripe ($6,500)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: PROJECTS */}
          {currentView === "projects" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-fadeIn">
              <div className="p-3.5 sm:p-4 border border-[#3F72AF]/40 rounded-xl bg-white shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                      ACTIVE RETAINER
                    </span>
                    <span className="text-xs font-mono text-[#6B6F76]">$12k / mo</span>
                  </div>
                  <h4 className="mt-2 text-xs sm:text-sm font-bold text-[#0B0B0F]">
                    Apex Global — Digital Ecosystem Rebrand
                  </h4>
                  <p className="mt-1 text-[11px] text-[#6B6F76]">
                    Complete agency scope: brand identity, client portal, custom CMS.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#E7E7EA] flex items-center justify-between text-[11px]">
                  <span className="text-[#6B6F76]">Sprint: 96%</span>
                  <span className="font-mono text-[#3F72AF] font-bold">Milestone 3/4</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 border border-[#E7E7EA] rounded-xl bg-white shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">
                      FIXED PROJECT
                    </span>
                    <span className="text-xs font-mono text-[#6B6F76]">$18,500</span>
                  </div>
                  <h4 className="mt-2 text-xs sm:text-sm font-bold text-[#0B0B0F]">
                    Mosaic Labs — iOS & Android App
                  </h4>
                  <p className="mt-1 text-[11px] text-[#6B6F76]">
                    Design tokens, Figma handoff, and component library delivery.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#E7E7EA] flex items-center justify-between text-[11px]">
                  <span className="text-[#6B6F76]">Sprint: 91%</span>
                  <span className="font-mono text-emerald-600 font-bold">Ready</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: MESSAGES */}
          {currentView === "messages" && (
            <div className="border border-[#E7E7EA] rounded-xl overflow-hidden bg-white animate-fadeIn">
              <div className="p-2.5 sm:p-3 bg-[#FAFAFA] border-b border-[#E7E7EA] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-[#0B0B0F] text-xs">#client-apex-global</span>
                </div>
                <span className="text-[9.5px] text-[#6B6F76] font-mono">Encrypted</span>
              </div>
              <div className="p-3 sm:p-4 flex flex-col gap-2.5 min-h-[160px]">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                    A
                  </div>
                  <div className="bg-[#F4F4F6] p-2 rounded-xl rounded-tl-none max-w-xs text-[11.5px]">
                    <span className="font-bold text-[10px] text-[#0B0B0F] block">Alex (Client)</span>
                    <p className="text-[#0B0B0F]">
                      Love the portal preview! Can we approve the retainer milestone today?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 self-end">
                  <div className="bg-[#3F72AF] text-white p-2 rounded-xl rounded-tr-none max-w-xs text-[11.5px]">
                    <span className="font-bold text-[10px] text-white/90 block">Studio Nine</span>
                    <p className="text-white">
                      Yes! Invoice INV-402 is in your portal with 1-click Stripe checkout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 5: TICKETS */}
          {currentView === "tickets" && (
            <div className="border border-[#E7E7EA] rounded-xl overflow-hidden bg-white animate-fadeIn">
              <div className="px-3 sm:px-4 py-2 bg-[#FAFAFA] border-b border-[#E7E7EA] flex items-center justify-between">
                <span className="font-bold text-[#0B0B0F] text-xs">Support Queue</span>
                <span className="text-[9.5px] font-mono text-emerald-600">SLA 100%</span>
              </div>
              <div className="divide-y divide-[#E7E7EA] text-xs">
                <div className="p-2.5 sm:p-3 flex items-center justify-between hover:bg-neutral-50 gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[#3F72AF] font-bold text-[10.5px]">#1081</span>
                    <span className="font-medium text-[#0B0B0F] truncate text-[11px] sm:text-xs">Update custom DNS CNAME for portal</span>
                  </div>
                  <span className="px-1.5 py-0.5 bg-amber-50 text-amber-800 rounded font-mono text-[9px] shrink-0">In Progress</span>
                </div>
                <div className="p-2.5 sm:p-3 flex items-center justify-between hover:bg-neutral-50 gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[#3F72AF] font-bold text-[10.5px]">#1082</span>
                    <span className="font-medium text-[#0B0B0F] truncate text-[11px] sm:text-xs">Add new billing contact to account</span>
                  </div>
                  <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded font-mono text-[9px] shrink-0">Resolved</span>
                </div>
              </div>
            </div>
          )}

          {/* AI COPILOT MODAL (⌘J) */}
          {copilotOpen && (
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-50 flex items-center justify-center p-3 animate-fadeIn">
              <div className="w-[94%] sm:max-w-lg bg-white border border-[#E7E7EA] rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col gap-3.5">
                <div className="flex items-center justify-between border-b border-[#E7E7EA] pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-[#3F72AF] text-white flex items-center justify-center">
                      <Sparkles size={11} />
                    </div>
                    <span className="font-bold text-[#0B0B0F] text-xs sm:text-sm">Eidoncore AI Copilot</span>
                    <span className="text-[9px] font-mono text-[#3F72AF] bg-[#3F72AF]/10 px-1.5 py-0.2 rounded">19 Modules</span>
                  </div>
                  <button
                    ref={copilotCloseRef}
                    onClick={() => {
                      setCopilotOpen(false);
                      setCopilotSubmitted(false);
                      setCopilotQuery("");
                    }}
                    className="text-[#6B6F76] hover:text-[#0B0B0F] p-1 rounded hover:bg-neutral-100"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    ref={copilotChipRef}
                    onClick={() => {
                      setCopilotQuery("Summarize weekly project progress & blockers across active clients");
                    }}
                    className="px-2 py-0.5 bg-neutral-100 hover:bg-[#3F72AF]/10 hover:text-[#3F72AF] text-[#0B0B0F] rounded-full text-[10px] sm:text-[11px] font-medium transition-colors"
                  >
                    ✨ Summarize weekly progress
                  </button>
                  <button
                    onClick={() => setCopilotQuery("Analyze monthly budget burn across top 3 clients")}
                    className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-[#0B0B0F] rounded-full text-[10px] sm:text-[11px] font-medium transition-colors"
                  >
                    📊 Analyze budget
                  </button>
                </div>

                {/* Input bar */}
                <div className="flex items-center gap-2 p-1.5 bg-[#FAFAFA] border border-[#CBD5E1] rounded-xl">
                  <input
                    type="text"
                    value={copilotQuery}
                    onChange={(e) => setCopilotQuery(e.target.value)}
                    placeholder="Ask assistant to update tasks, invoices..."
                    className="w-full text-xs text-[#0B0B0F] bg-transparent outline-none px-1"
                  />
                  <button
                    ref={copilotSubmitRef}
                    onClick={() => setCopilotSubmitted(true)}
                    className="p-1.5 bg-[#3F72AF] hover:bg-[#325d91] text-white rounded-lg transition-colors shrink-0"
                  >
                    <Send size={11} />
                  </button>
                </div>

                {/* Response Area */}
                {copilotSubmitted && (
                  <div className="p-2.5 sm:p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-[#0F172A] flex flex-col gap-1 animate-fadeIn">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[10.5px]">
                      <Check size={12} />
                      <span>Workspace Summary Generated:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#334155] m-0">
                      • <strong>Apex Global</strong>: Milestone 3 on track, 88% tasks complete.<br />
                      • <strong>Cash Flow</strong>: $48,250 collected this month, 92% SLA.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIRTUAL ANIMATED CURSOR (Hidden on mobile touch screens for clean touch ergonomics) */}
          {cursorPos.visible && (
            <div
              style={{
                transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
                transition: "transform 1.05s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              className="hidden md:block absolute pointer-events-none z-50 transition-opacity duration-300"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className={`filter drop-shadow-md transition-transform duration-150 ${
                  cursorClicked ? "scale-90" : "scale-100"
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
          )}

        </main>
      </div>
    </div>
  );
}
