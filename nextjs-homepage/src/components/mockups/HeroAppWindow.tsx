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
  Circle,
  AlertCircle,
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
  Box,
  Package,
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
  Star,
  Briefcase,
  Share2,
  Download,
  FileEdit,
  Folder,
  Pin,
  CornerDownRight,
  Info,
  UserPlus,
  Edit3,
} from "lucide-react";

export interface ChatMessageItem {
  id: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  isEdited?: boolean;
  isPinned?: boolean;
  isInternalNote?: boolean;
  replyTo?: {
    senderName: string;
    textSnippet: string;
  };
  text: string;
  reactions?: { emoji: string; count: number }[];
  readBy?: string[];
  dateDivider?: string;
}

export interface ChatChannelItem {
  id: string;
  type: "project" | "org" | "dm";
  title: string;
  fullTitle: string;
  subtitle: string;
  snippet: string;
  time: string;
  membersCount?: number;
  membersAvatars?: string[];
  avatar?: string;
  hasUnreadDot?: boolean;
  messages: ChatMessageItem[];
}

export default function HeroAppWindow() {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "organizations" | "proposals" | "projects" | "tasks" | "offerings-services" | "offerings-products" | "team" | "tickets" | "messages"
  >("dashboard");
  const [isOfferingsExpanded, setIsOfferingsExpanded] = useState(false);
  const [offeringsSearch, setOfferingsSearch] = useState("");
  const [offeringsFilter, setOfferingsFilter] = useState<"all" | "wp">("all");
  const [teamSearch, setTeamSearch] = useState("");
  const [activeTeamTab, setActiveTeamTab] = useState<"directory" | "workload" | "capacity" | "invitations">("directory");
  const [teamViewMode, setTeamViewMode] = useState<"grid" | "list">("grid");
  const [activeChatId, setActiveChatId] = useState<string>("arcturus-org");
  const [chatSearch, setChatSearch] = useState("");
  const [chatInputText, setChatInputText] = useState("");
  const [isInternalNoteMode, setIsInternalNoteMode] = useState(false);
  const [newChatMessages, setNewChatMessages] = useState<Record<string, ChatMessageItem[]>>({});
  const [activeOrgTab, setActiveOrgTab] = useState<"all" | "active" | "leads" | "at_risk">("all");
  const [activeProposalTab, setActiveProposalTab] = useState<"all" | "active" | "awaiting" | "won" | "attention">("all");
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isDateFiltered, setIsDateFiltered] = useState(false);
  const [copilotQuery, setCopilotQuery] = useState("");
  const [copilotSubmitted, setCopilotSubmitted] = useState(false);
  const [taskViewMode, setTaskViewMode] = useState<"list" | "board" | "workload">("board");
  const [projectViewMode, setProjectViewMode] = useState<"cards" | "table" | "board">("cards");
  const [selectedDay, setSelectedDay] = useState(4);
  const [activeWorkTab, setActiveWorkTab] = useState<"all" | "today" | "overdue" | "review">("all");
  const [activeTaskTab, setActiveTaskTab] = useState<"all" | "overdue" | "today" | "week">("all");
  const [activeProjectTab, setActiveProjectTab] = useState<"all" | "active" | "attention" | "delivered">("all");
  const [ticketViewMode, setTicketViewMode] = useState<"list" | "board" | "sla">("board");
  const [ticketStatusFilter, setTicketStatusFilter] = useState<string>("all");
  const [ticketSearch, setTicketSearch] = useState<string>("");

  const [cursorPos, setCursorPos] = useState({ x: 260, y: 180, visible: false });
  const [cursorClicked, setCursorClicked] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isCancelledRef = useRef(true);
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
    // Automated tour disabled for testing
    isCancelledRef.current = true;
    clearTimeouts();

    return () => {
      isCancelledRef.current = true;
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
            <span className="text-[#2563EB] shrink-0">
              {currentView === "offerings-services"
                ? "/catalog/offerings/services"
                : currentView === "offerings-products"
                ? "/catalog/offerings/digital-products"
                : `/${currentView}`}
            </span>
            <button
              onClick={() => {
                isCancelledRef.current = true;
                clearTimeouts();
                setCurrentView("dashboard");
                setCopilotOpen(false);
                setCommandPaletteOpen(false);
              }}
              title="Reset view"
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
          onClick={() => setCurrentView("organizations")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "organizations" ? "bg-[#0F172A] text-white" : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          Organizations
        </button>
        <button
          onClick={() => setCurrentView("proposals")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "proposals" ? "bg-[#0F172A] text-white" : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          Proposals
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
          onClick={() => {
            setIsOfferingsExpanded(true);
            setCurrentView("offerings-services");
          }}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "offerings-services" || currentView === "offerings-products"
              ? "bg-[#0F172A] text-white"
              : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          Offerings
        </button>
        <button
          onClick={() => setCurrentView("team")}
          className={`px-3 py-1 rounded-md shrink-0 transition-colors ${
            currentView === "team" ? "bg-[#0F172A] text-white" : "text-[#64748B] hover:bg-slate-100"
          }`}
        >
          Team
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

                <button
                  onClick={() => setCurrentView("organizations")}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    currentView === "organizations"
                      ? "bg-[#F1F5F9] text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users size={14} className={currentView === "organizations" ? "text-[#0F172A]" : "text-[#64748B]"} />
                    <span>Organizations</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] bg-slate-100 px-1 rounded">4</span>
                </button>

                <button
                  onClick={() => setCurrentView("proposals")}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    currentView === "proposals"
                      ? "bg-[#F1F5F9] text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText size={14} className={currentView === "proposals" ? "text-[#0F172A]" : "text-[#64748B]"} />
                    <span>Proposals</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] bg-slate-100 px-1 rounded">5</span>
                </button>

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

                {/* OFFERINGS EXPANDABLE MENU */}
                <div className="flex flex-col">
                  <button
                    onClick={() => {
                      const nextExpanded = !isOfferingsExpanded;
                      setIsOfferingsExpanded(nextExpanded);
                      if (nextExpanded && currentView !== "offerings-services" && currentView !== "offerings-products") {
                        setCurrentView("offerings-services");
                      }
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                      currentView === "offerings-services" || currentView === "offerings-products"
                        ? "text-[#0F172A] font-semibold"
                        : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Boxes
                        size={14}
                        className={
                          currentView === "offerings-services" || currentView === "offerings-products"
                            ? "text-[#0F172A]"
                            : "text-[#64748B]"
                        }
                      />
                      <span>Offerings</span>
                    </div>
                    {isOfferingsExpanded ? (
                      <ChevronDown size={11} className="text-[#94A3B8]" />
                    ) : (
                      <ChevronRight size={11} className="text-[#94A3B8]" />
                    )}
                  </button>

                  {/* 2 SUBMENU ITEMS: SERVICES & PRODUCTS */}
                  {isOfferingsExpanded && (
                    <div className="flex flex-col gap-0.5 pl-6 pr-1 py-0.5 animate-fadeIn">
                      <button
                        onClick={() => setCurrentView("offerings-services")}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left ${
                          currentView === "offerings-services"
                            ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#E2E8F0] font-semibold text-[#0F172A]"
                            : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                        }`}
                      >
                        <Box
                          size={13}
                          className={currentView === "offerings-services" ? "text-[#0F172A]" : "text-[#94A3B8]"}
                        />
                        <span>Services</span>
                      </button>

                      <button
                        onClick={() => setCurrentView("offerings-products")}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left ${
                          currentView === "offerings-products"
                            ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#E2E8F0] font-semibold text-[#0F172A]"
                            : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                        }`}
                      >
                        <Package
                          size={13}
                          className={currentView === "offerings-products" ? "text-[#0F172A]" : "text-[#94A3B8]"}
                        />
                        <span>Products</span>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setCurrentView("team")}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    currentView === "team"
                      ? "bg-[#F1F5F9] text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users size={14} className={currentView === "team" ? "text-[#0F172A]" : "text-[#64748B]"} />
                    <span>Team</span>
                  </div>
                </button>

                <button
                  onClick={() => setCurrentView("messages")}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    currentView === "messages"
                      ? "bg-[#F1F5F9] text-[#0F172A] font-semibold"
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare size={14} className={currentView === "messages" ? "text-[#0F172A]" : "text-[#64748B]"} />
                    <span>Messages</span>
                  </div>
                  <span className="text-[10px] font-bold text-white bg-[#3B82F6] px-1.5 py-0.2 rounded-full">2</span>
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
                {currentView === "organizations" && <Users size={13} />}
                {currentView === "proposals" && <FileText size={13} />}
                {currentView === "projects" && <FolderKanban size={13} />}
                {currentView === "tasks" && <CheckSquare size={13} />}
                {(currentView === "offerings-services" || currentView === "offerings-products") && <Box size={13} />}
                {currentView === "team" && <Users size={13} />}
                {currentView === "tickets" && <Ticket size={13} />}
                {currentView === "messages" && <MessageSquare size={13} />}
              </div>
              <h2 className="text-sm font-bold text-[#0F172A] tracking-tight capitalize">
                {currentView === "dashboard"
                  ? "Dashboard"
                  : currentView === "offerings-services" || currentView === "offerings-products"
                  ? "Offerings"
                  : currentView === "messages"
                  ? "Messaging"
                  : currentView === "team"
                  ? "Team"
                  : currentView}
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
                  3
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

          {/* VIEW: ORGANIZATIONS (100% IDENTICAL TO SCREENSHOT media_1791653417628_396ed35c.png) */}
          {currentView === "organizations" && (
            <div className="p-4 sm:p-5 flex flex-col gap-4 animate-fadeIn pb-12">
              
              {/* Top 4 Metrics Cards - Continuous card container with dividers */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0] overflow-hidden">
                {/* 1. Total Accounts */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#64748B] font-semibold tracking-wider">
                      TOTAL ACCOUNTS
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight mt-1 font-sans">
                      4
                    </div>
                    {/* Thick Green Bar */}
                    <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden mt-3 mb-2 flex">
                      <div className="bg-[#10B981] h-full rounded-full" style={{ width: "65%" }} />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#0F172A] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Active <span className="font-bold">4</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-1">
                    4 active clients · 100% conversion
                  </div>
                </div>

                {/* 2. Pipeline leads */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                      <Tag size={13} className="text-blue-500" />
                      <span>Pipeline leads</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight mt-1 font-sans">
                      0
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-3 mb-2" />
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-1">
                    0 contacted · 0 proposal sent
                  </div>
                </div>

                {/* 3. Pipeline forecast */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                      <DollarSign size={13} className="text-indigo-500" />
                      <span>Pipeline forecast</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1 font-sans">
                      <span className="text-sm font-semibold text-[#64748B]">$</span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight">0</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-3 mb-2" />
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-1">
                    Expected value weighted by deal probability
                  </div>
                </div>

                {/* 4. Attention needed */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                      <AlertTriangle size={13} className="text-slate-400" />
                      <span>Attention needed</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight mt-1 font-sans">
                      0
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-3 mb-2" />
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-1">
                    No accounts flagged
                  </div>
                </div>
              </div>

              {/* CRM insight Banner */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 sm:px-4 sm:py-3 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Sparkles size={13} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-[#0F172A]">CRM insight</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] text-[10px] font-medium inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy book
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      4 accounts in your book, 4 active at a <strong className="text-[#0F172A] font-semibold">100% conversion rate</strong>. No account is flagged at risk right now.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                  <button className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs transition-colors">
                    <AlertTriangle size={11} className="text-[#64748B]" />
                    <span>Scan churn signals</span>
                  </button>
                  <button className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs transition-colors">
                    <Clock size={11} className="text-[#64748B]" />
                    <span>Re-engage inactive</span>
                  </button>
                  <button className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs transition-colors">
                    <Tag size={11} className="text-[#64748B]" />
                    <span>Pipeline next steps</span>
                  </button>
                  <button className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#0F172A] hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs transition-colors">
                    <Sparkles size={11} className="text-[#2563EB]" />
                    <span>CRM briefing</span>
                    <ChevronDown size={11} className="text-[#94A3B8]" />
                  </button>
                </div>
              </div>

              {/* Filter & Action Toolbar */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  {/* Left Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setActiveOrgTab("all")}
                      className={`px-3 py-1 font-bold text-xs whitespace-nowrap transition-colors ${
                        activeOrgTab === "all"
                          ? "text-[#0F172A] border-b-2 border-blue-600 font-bold"
                          : "text-[#64748B] hover:text-[#0F172A]"
                      }`}
                    >
                      All <span className="font-mono font-bold ml-0.5">4</span>
                    </button>
                    <button
                      onClick={() => setActiveOrgTab("active")}
                      className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        activeOrgTab === "active"
                          ? "bg-slate-100 text-[#0F172A] font-semibold"
                          : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
                      }`}
                    >
                      <Star size={11} className="text-[#94A3B8]" />
                      <span>Active</span>
                      <span className="font-mono text-[10px] bg-slate-100 text-[#64748B] px-1 rounded">4</span>
                    </button>
                    <button
                      onClick={() => setActiveOrgTab("leads")}
                      className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        activeOrgTab === "leads"
                          ? "bg-slate-100 text-[#0F172A] font-semibold"
                          : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
                      }`}
                    >
                      <Tag size={11} className="text-[#94A3B8]" />
                      <span>Leads</span>
                      <span className="font-mono text-[10px] bg-slate-100 text-[#64748B] px-1 rounded">0</span>
                    </button>
                    <button
                      onClick={() => setActiveOrgTab("at_risk")}
                      className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        activeOrgTab === "at_risk"
                          ? "bg-slate-100 text-[#0F172A] font-semibold"
                          : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
                      }`}
                    >
                      <AlertTriangle size={11} className="text-[#94A3B8]" />
                      <span>At Risk</span>
                      <span className="font-mono text-[10px] bg-slate-100 text-[#64748B] px-1 rounded">0</span>
                    </button>
                  </div>

                  {/* Right Tools */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#64748B] shadow-2xs w-48 sm:w-56">
                      <Search size={12} className="text-[#94A3B8]" />
                      <input
                        type="text"
                        placeholder="Search organizations..."
                        className="bg-transparent border-none outline-none text-xs text-[#0F172A] w-full placeholder:text-[#94A3B8]"
                        readOnly
                      />
                      <kbd className="text-[9px] bg-slate-100 border border-slate-200 px-1 rounded text-[#94A3B8] font-mono">
                        /
                      </kbd>
                    </div>

                    <div className="flex items-center gap-1 text-[#64748B]">
                      <button className="p-1.5 hover:text-[#0F172A] border border-[#E2E8F0] bg-white rounded-lg shadow-2xs hover:bg-slate-50 transition-colors">
                        <CheckCircle2 size={13} />
                      </button>
                      <button className="p-1.5 hover:text-[#0F172A] border border-[#E2E8F0] bg-white rounded-lg shadow-2xs hover:bg-slate-50 transition-colors">
                        <Flag size={13} />
                      </button>
                      <button className="p-1.5 hover:text-[#0F172A] border border-[#E2E8F0] bg-white rounded-lg shadow-2xs hover:bg-slate-50 transition-colors">
                        <Briefcase size={13} />
                      </button>
                      <button className="p-1.5 hover:text-[#0F172A] border border-[#E2E8F0] bg-white rounded-lg shadow-2xs hover:bg-slate-50 transition-colors">
                        <LayoutGrid size={13} />
                      </button>
                      <button className="p-1.5 hover:text-[#0F172A] border border-[#E2E8F0] bg-white rounded-lg shadow-2xs hover:bg-slate-50 transition-colors">
                        <SlidersHorizontal size={13} />
                      </button>
                    </div>

                    {/* View Switchers */}
                    <div className="flex items-center border border-[#E2E8F0] rounded-lg p-0.5 bg-slate-50 shadow-2xs">
                      <button className="p-1 bg-white text-[#0F172A] rounded shadow-2xs">
                        <List size={12} />
                      </button>
                      <button className="p-1 text-[#64748B] hover:text-[#0F172A]">
                        <Kanban size={12} />
                      </button>
                      <button className="p-1 text-[#64748B] hover:text-[#0F172A]">
                        <LayoutGrid size={12} />
                      </button>
                    </div>

                    {/* Primary New Action */}
                    <button className="px-3 py-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors">
                      <Plus size={13} />
                      <span>Organization</span>
                      <kbd className="text-[9px] bg-white/20 px-1 rounded font-mono">N</kbd>
                    </button>
                  </div>
                </div>

                {/* Sub utilities under toolbar */}
                <div className="flex items-center justify-end gap-3 text-[#94A3B8] text-xs pt-0.5 pb-1">
                  <Download size={13} className="hover:text-[#0F172A] cursor-pointer transition-colors" />
                  <Share2 size={13} className="hover:text-[#0F172A] cursor-pointer transition-colors" />
                  <MoreHorizontal size={13} className="hover:text-[#0F172A] cursor-pointer transition-colors" />
                  <Tag size={13} className="hover:text-[#0F172A] cursor-pointer transition-colors" />
                </div>
              </div>

              {/* Organizations Table */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-mono uppercase text-[#64748B]">
                      <tr>
                        <th className="py-2.5 px-3 w-10">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                        </th>
                        <th className="py-2.5 px-3 font-semibold">ORGANIZATION</th>
                        <th className="py-2.5 px-3 font-semibold">STATUS</th>
                        <th className="py-2.5 px-3 font-semibold">HEALTH</th>
                        <th className="py-2.5 px-3 font-semibold">ACCOUNT MANAGER</th>
                        <th className="py-2.5 px-3 font-semibold text-right">AMOUNT</th>
                        <th className="py-2.5 px-3 font-semibold text-right">UNPAID</th>
                        <th className="py-2.5 px-3 font-semibold text-right">LAST ACTIVITY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {/* Row 1: Nebula Health */}
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                              NH
                            </div>
                            <div>
                              <div className="font-bold text-xs text-[#0F172A]">Nebula Health</div>
                              <div className="text-[11px] text-[#64748B]">Dr. Alexander Hayes</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] text-[10.5px] font-medium inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#0F172A] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-bold text-[9px] flex items-center justify-center font-mono shrink-0">
                              MB
                            </div>
                            <span className="text-xs text-[#0F172A] font-medium">Marcus Brody</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] text-[#64748B] font-mono mr-1">USD</span>
                          <span className="font-bold font-mono text-[#0F172A] text-xs">59,500.00</span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] text-[#64748B] font-mono mr-1">USD</span>
                          <span className="font-mono text-[#64748B] text-xs">0.00</span>
                        </td>
                        <td className="py-3 px-3 text-right text-[11px] text-[#94A3B8]">
                          No activity
                        </td>
                      </tr>

                      {/* Row 2: Kroma Fintech */}
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                              KF
                            </div>
                            <div>
                              <div className="font-bold text-xs text-[#0F172A]">Kroma Fintech</div>
                              <div className="text-[11px] text-[#64748B]">Tariq Mansour</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] text-[10.5px] font-medium inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#0F172A] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-bold text-[9px] flex items-center justify-center font-mono shrink-0">
                              MB
                            </div>
                            <span className="text-xs text-[#0F172A] font-medium">Marcus Brody</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] text-[#64748B] font-mono mr-1">USD</span>
                          <span className="font-bold font-mono text-[#0F172A] text-xs">21,700.00</span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="inline-flex items-center gap-1 text-amber-700 font-bold font-mono text-xs">
                            <AlertTriangle size={11} className="text-amber-600" />
                            <span className="text-[10px] text-[#64748B] font-normal">USD</span>
                            11,300.00
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right text-[11px] text-[#94A3B8]">
                          No activity
                        </td>
                      </tr>

                      {/* Row 3: Solari Logistics */}
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                              SL
                            </div>
                            <div>
                              <div className="font-bold text-xs text-[#0F172A]">Solari Logistics</div>
                              <div className="text-[11px] text-[#64748B]">David Solari</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] text-[10.5px] font-medium inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#0F172A] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-bold text-[9px] flex items-center justify-center font-mono shrink-0">
                              MB
                            </div>
                            <span className="text-xs text-[#0F172A] font-medium">Marcus Brody</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] text-[#64748B] font-mono mr-1">USD</span>
                          <span className="font-bold font-mono text-[#0F172A] text-xs">14,500.00</span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] text-[#64748B] font-mono mr-1">USD</span>
                          <span className="font-bold font-mono text-[#0F172A] text-xs">17,000.00</span>
                        </td>
                        <td className="py-3 px-3 text-right text-[11px] text-[#94A3B8]">
                          No activity
                        </td>
                      </tr>

                      {/* Row 4: Arcturus Robotics */}
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                              AR
                            </div>
                            <div>
                              <div className="font-bold text-xs text-[#0F172A]">Arcturus Robotics</div>
                              <div className="text-[11px] text-[#64748B]">Evelyn Thorne</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] text-[10.5px] font-medium inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#0F172A] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-bold text-[9px] flex items-center justify-center font-mono shrink-0">
                              MB
                            </div>
                            <span className="text-xs text-[#0F172A] font-medium">Marcus Brody</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] text-[#64748B] font-mono mr-1">USD</span>
                          <span className="font-bold font-mono text-[#0F172A] text-xs">24,700.00</span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] text-[#64748B] font-mono mr-1">USD</span>
                          <span className="font-mono text-[#64748B] text-xs">0.00</span>
                        </td>
                        <td className="py-3 px-3 text-right text-[11px] text-[#94A3B8]">
                          No activity
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table Footer */}
              <div className="text-[11px] text-[#64748B] font-mono pt-1">
                <span className="font-bold text-[#0F172A]">4</span> of 4 organizations
              </div>
            </div>
          )}

          {/* VIEW: PROPOSALS (100% IDENTICAL TO SCREENSHOT media_1791653473044_ca986589.png) */}
          {currentView === "proposals" && (
            <div className="p-4 sm:p-5 flex flex-col gap-4 animate-fadeIn pb-12">
              
              {/* Top 4 Metrics Cards - Continuous card container with dividers */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0] overflow-hidden">
                {/* 1. Pipeline Value */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#64748B] font-semibold tracking-wider">
                      PIPELINE VALUE
                    </span>
                    <div className="flex items-baseline gap-1 mt-1 font-sans">
                      <span className="text-sm font-semibold text-[#64748B]">$</span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight">168,500</span>
                      <span className="text-sm font-semibold text-[#64748B]">.00</span>
                    </div>
                    {/* Multi-segment / Filled progress bar */}
                    <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden mt-3 mb-2 flex">
                      <div className="bg-[#10B981] h-full rounded-full" style={{ width: "77%" }} />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-medium text-[#64748B] mt-1">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Draft <b className="text-[#0F172A]">1</b>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Sent <b className="text-[#0F172A]">0</b>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Accepted <b className="text-[#0F172A]">4</b>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Declined <b className="text-[#0F172A]">0</b>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700" /> Expired <b className="text-[#0F172A]">0</b>
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-2">
                    5 proposals · 1 in flight
                  </div>
                </div>

                {/* 2. Won Revenue */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                      <CheckCircle2 size={13} className="text-emerald-500" />
                      <span>Won Revenue</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1 font-sans">
                      <span className="text-sm font-semibold text-[#64748B]">$</span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight">130,500</span>
                      <span className="text-sm font-semibold text-[#64748B]">.00</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-3 mb-2 overflow-hidden">
                      <div className="bg-[#10B981] h-full w-full rounded-full" />
                    </div>
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-1">
                    4 won · 100% win rate
                  </div>
                </div>

                {/* 3. Awaiting decision */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                      <Clock size={13} className="text-blue-500" />
                      <span>Awaiting decision</span>
                    </div>
                    <div className="text-3xl font-extrabold text-[#0F172A] leading-tight mt-1 font-sans">
                      0
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-3 mb-2" />
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-1">
                    Sent or viewed by the client
                  </div>
                </div>

                {/* 4. Needs Attention */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                      <AlertTriangle size={13} className="text-slate-400" />
                      <span>Needs Attention</span>
                    </div>
                    <div className="text-3xl font-extrabold text-[#0F172A] leading-tight mt-1 font-sans">
                      0
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-3 mb-2" />
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-1">
                    0 expired · 0 declined
                  </div>
                </div>
              </div>

              {/* Pipeline insight Banner */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 sm:px-4 sm:py-3 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Sparkles size={13} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-[#0F172A]">Pipeline insight</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] text-[10px] font-medium inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Strong close rate
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      5 proposals tracked, 4 won at a <strong className="text-[#0F172A] font-semibold">100% win rate</strong>. Nothing is waiting on a client right now.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                  <button className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs transition-colors">
                    <Send size={11} className="text-[#64748B]" />
                    <span>Follow-up plan</span>
                  </button>
                  <button className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs transition-colors">
                    <TrendingUp size={11} className="text-[#64748B]" />
                    <span>Improve win rate</span>
                  </button>
                  <button className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs transition-colors">
                    <FileEdit size={11} className="text-[#64748B]" />
                    <span>Draft a scope</span>
                  </button>
                  <button className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#0F172A] hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs transition-colors">
                    <Sparkles size={11} className="text-[#2563EB]" />
                    <span>Pipeline briefing</span>
                    <ChevronDown size={11} className="text-[#94A3B8]" />
                  </button>
                </div>
              </div>

              {/* Filter & Action Toolbar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
                {/* Left Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => setActiveProposalTab("all")}
                    className={`px-3 py-1 font-bold text-xs whitespace-nowrap transition-colors ${
                      activeProposalTab === "all"
                        ? "text-[#0F172A] border-b-2 border-blue-600 font-bold"
                        : "text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    All <span className="font-mono font-bold ml-0.5">5</span>
                  </button>
                  <button
                    onClick={() => setActiveProposalTab("active")}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeProposalTab === "active"
                        ? "bg-slate-100 text-[#0F172A] font-semibold"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
                    }`}
                  >
                    <span>Active pipeline</span>
                    <span className="font-mono text-[10px] bg-slate-100 text-[#64748B] px-1 rounded">1</span>
                  </button>
                  <button
                    onClick={() => setActiveProposalTab("awaiting")}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeProposalTab === "awaiting"
                        ? "bg-slate-100 text-[#0F172A] font-semibold"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
                    }`}
                  >
                    <span>Awaiting client</span>
                    <span className="font-mono text-[10px] bg-slate-100 text-[#64748B] px-1 rounded">0</span>
                  </button>
                  <button
                    onClick={() => setActiveProposalTab("won")}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeProposalTab === "won"
                        ? "bg-slate-100 text-[#0F172A] font-semibold"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
                    }`}
                  >
                    <span>Won</span>
                    <span className="font-mono text-[10px] bg-slate-100 text-[#64748B] px-1 rounded">4</span>
                  </button>
                  <button
                    onClick={() => setActiveProposalTab("attention")}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeProposalTab === "attention"
                        ? "bg-slate-100 text-[#0F172A] font-semibold"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
                    }`}
                  >
                    <span>Needs Attention</span>
                    <span className="font-mono text-[10px] bg-slate-100 text-[#64748B] px-1 rounded">0</span>
                  </button>
                </div>

                {/* Right Tools */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#64748B] shadow-2xs w-48 sm:w-56">
                    <Search size={12} className="text-[#94A3B8]" />
                    <input
                      type="text"
                      placeholder="Search proposals..."
                      className="bg-transparent border-none outline-none text-xs text-[#0F172A] w-full placeholder:text-[#94A3B8]"
                      readOnly
                    />
                    <kbd className="text-[9px] bg-slate-100 border border-slate-200 px-1 rounded text-[#94A3B8] font-mono">
                      /
                    </kbd>
                  </div>

                  <div className="flex items-center gap-1 text-[#64748B]">
                    <button className="p-1.5 hover:text-[#0F172A] border border-[#E2E8F0] bg-white rounded-lg shadow-2xs hover:bg-slate-50 transition-colors">
                      <CheckCircle2 size={13} />
                    </button>
                    <button className="p-1.5 hover:text-[#0F172A] border border-[#E2E8F0] bg-white rounded-lg shadow-2xs hover:bg-slate-50 transition-colors">
                      <LayoutGrid size={13} />
                    </button>
                  </div>

                  {/* View Switchers */}
                  <div className="flex items-center border border-[#E2E8F0] rounded-lg p-0.5 bg-slate-50 shadow-2xs">
                    <button className="p-1 bg-white text-[#0F172A] rounded shadow-2xs">
                      <List size={12} />
                    </button>
                    <button className="p-1 text-[#64748B] hover:text-[#0F172A]">
                      <LayoutGrid size={12} />
                    </button>
                    <button className="p-1 text-[#64748B] hover:text-[#0F172A]">
                      <Calendar size={12} />
                    </button>
                  </div>

                  {/* Primary New Action */}
                  <button className="px-3 py-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors">
                    <Plus size={13} />
                    <span>New Proposal</span>
                    <kbd className="text-[9px] bg-white/20 px-1 rounded font-mono">N</kbd>
                  </button>
                </div>
              </div>

              {/* Proposals Table */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-mono uppercase text-[#64748B]">
                      <tr>
                        <th className="py-2.5 px-3 w-10">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                        </th>
                        <th className="py-2.5 px-3 font-semibold">PROPOSALS</th>
                        <th className="py-2.5 px-3 font-semibold">STATUS</th>
                        <th className="py-2.5 px-3 font-semibold text-right">TOTAL</th>
                        <th className="py-2.5 px-3 font-semibold text-center">EXPIRY DATE</th>
                        <th className="py-2.5 px-3 font-semibold">CREATED BY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {/* Row 1: AI-Driven Telemetry Analytics Engine */}
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                              NH
                            </div>
                            <div>
                              <div className="font-bold text-xs text-[#0F172A]">AI-Driven Telemetry Analytics Engine</div>
                              <div className="text-[11px] text-[#64748B] font-mono">PROP-2026-005 · Nebula Health</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10.5px] font-medium inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Draft
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] text-[#64748B] font-mono mr-1">USD</span>
                          <span className="font-bold font-mono text-[#0F172A] text-xs">38,000.00</span>
                        </td>
                        <td className="py-3 px-3 text-center text-[11px] text-[#94A3B8] font-mono">
                          —
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[9px] flex items-center justify-center font-mono shrink-0">
                              JV
                            </div>
                            <span className="text-xs text-[#0F172A] font-medium">Julian Vance</span>
                          </div>
                        </td>
                      </tr>

                      {/* Row 2: Warehouse Fleet Orchestration Web Application */}
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                              AR
                            </div>
                            <div>
                              <div className="font-bold text-xs text-[#0F172A]">Warehouse Fleet Orchestration Web Application</div>
                              <div className="text-[11px] text-[#64748B] font-mono">PROP-2026-004 · Arcturus Robotics</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] text-[10.5px] font-medium inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Accepted
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] text-[#64748B] font-mono mr-1">USD</span>
                          <span className="font-bold font-mono text-[#0F172A] text-xs">24,500.00</span>
                        </td>
                        <td className="py-3 px-3 text-center text-[11px] text-[#94A3B8] font-mono">
                          —
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[9px] flex items-center justify-center font-mono shrink-0">
                              JV
                            </div>
                            <span className="text-xs text-[#0F172A] font-medium">Julian Vance</span>
                          </div>
                        </td>
                      </tr>

                      {/* Row 3: Logistics Telematics Control Room UI */}
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                              SL
                            </div>
                            <div>
                              <div className="font-bold text-xs text-[#0F172A]">Logistics Telematics Control Room UI</div>
                              <div className="text-[11px] text-[#64748B] font-mono">PROP-2026-003 · Solari Logistics</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] text-[10.5px] font-medium inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Accepted
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] text-[#64748B] font-mono mr-1">USD</span>
                          <span className="font-bold font-mono text-[#0F172A] text-xs">29,000.00</span>
                        </td>
                        <td className="py-3 px-3 text-center text-[11px] text-[#94A3B8] font-mono">
                          —
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[9px] flex items-center justify-center font-mono shrink-0">
                              JV
                            </div>
                            <span className="text-xs text-[#0F172A] font-medium">Julian Vance</span>
                          </div>
                        </td>
                      </tr>

                      {/* Row 4: Next-Gen Mobile SDK & Developer Experience */}
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                              KF
                            </div>
                            <div>
                              <div className="font-bold text-xs text-[#0F172A]">Next-Gen Mobile SDK & Developer Experience</div>
                              <div className="text-[11px] text-[#64748B] font-mono">PROP-2026-002 · Kroma Fintech</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] text-[10.5px] font-medium inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Accepted
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] text-[#64748B] font-mono mr-1">USD</span>
                          <span className="font-bold font-mono text-[#0F172A] text-xs">32,000.00</span>
                        </td>
                        <td className="py-3 px-3 text-center text-[11px] text-[#94A3B8] font-mono">
                          —
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[9px] flex items-center justify-center font-mono shrink-0">
                              JV
                            </div>
                            <span className="text-xs text-[#0F172A] font-medium">Julian Vance</span>
                          </div>
                        </td>
                      </tr>

                      {/* Row 5: Enterprise Design System & Platform Revamp */}
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                              NH
                            </div>
                            <div>
                              <div className="font-bold text-xs text-[#0F172A]">Enterprise Design System & Platform Revamp</div>
                              <div className="text-[11px] text-[#64748B] font-mono">PROP-2026-001 · Nebula Health</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] text-[10.5px] font-medium inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Accepted
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] text-[#64748B] font-mono mr-1">USD</span>
                          <span className="font-bold font-mono text-[#0F172A] text-xs">45,000.00</span>
                        </td>
                        <td className="py-3 px-3 text-center text-[11px] text-[#94A3B8] font-mono">
                          —
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[9px] flex items-center justify-center font-mono shrink-0">
                              JV
                            </div>
                            <span className="text-xs text-[#0F172A] font-medium">Julian Vance</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table Footer */}
              <div className="text-[11px] text-[#64748B] font-mono pt-1">
                <span className="font-bold text-[#0F172A]">5</span> in view · <span className="text-[10px] text-[#64748B]">USD</span> <span className="font-bold text-[#0F172A]">168,500.00</span>
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

              {/* Toolbar & Filters (Fixed width tabs, horizontal scroll, fully visible right button) */}
              <div className="w-full overflow-x-auto no-scrollbar">
                <div className="flex items-center justify-between gap-4 min-w-[950px] pt-1 border-b border-[#E2E8F0] pb-2 text-xs">
                  {/* Left Tabs - Fixed Width */}
                  <div className="w-[370px] shrink-0 flex items-center gap-4">
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

                    {/* Segmented View Mode: [Card view | Table view | Board] */}
                    <div className="flex items-center bg-[#F1F5F9] border border-[#E2E8F0] rounded-full p-0.5 text-xs text-[#64748B]">
                      <button
                        onClick={() => setProjectViewMode("cards")}
                        className={`px-2.5 py-1 rounded-full transition-colors flex items-center gap-1.5 font-medium ${
                          projectViewMode === "cards" ? "bg-white text-[#0F172A] shadow-xs" : "hover:text-slate-900 text-[#64748B]"
                        }`}
                        title="Card view"
                      >
                        <LayoutGrid size={13} />
                        <span className="hidden sm:inline text-[11px]">Card view</span>
                      </button>
                      <button
                        onClick={() => setProjectViewMode("table")}
                        className={`px-2.5 py-1 rounded-full transition-colors flex items-center gap-1.5 font-medium ${
                          projectViewMode === "table" ? "bg-white text-[#0F172A] shadow-xs" : "hover:text-slate-900 text-[#64748B]"
                        }`}
                        title="Table view"
                      >
                        <List size={13} />
                        <span className="hidden sm:inline text-[11px]">Table view</span>
                      </button>
                      <button
                        onClick={() => setProjectViewMode("board")}
                        className={`px-2.5 py-1 rounded-full transition-colors flex items-center gap-1.5 font-medium ${
                          projectViewMode === "board" ? "bg-white text-[#0F172A] shadow-xs" : "hover:text-slate-900 text-[#64748B]"
                        }`}
                        title="Board"
                      >
                        <Kanban size={13} />
                        <span className="hidden sm:inline text-[11px]">Board</span>
                      </button>
                    </div>

                    {/* Primary CTA Button */}
                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold flex items-center gap-1 shadow-xs whitespace-nowrap shrink-0">
                      <Plus size={13} /> New project <kbd className="text-[9px] bg-blue-700 px-1 rounded ml-0.5 font-normal">n</kbd>
                    </button>
                  </div>
                </div>
              </div>

              {/* DYNAMIC PROJECTS VIEW CONTAINER (CARDS / TABLE / BOARD) */}
              {(() => {
                const allProjects = [
                  {
                    ref: projectCardRef,
                    init: "KF",
                    color: "bg-blue-600 text-white",
                    client: "Kroma Fintech",
                    title: "Kroma Mobile SDK & Merchant Gateway",
                    status: "In Progress",
                    health: "On Track",
                    tasksLabel: "5/11 tasks",
                    progress: 45,
                    openTasks: 6,
                    lateTasks: 0,
                    activity: "Today",
                    activityColor: "text-emerald-500",
                    avatar: "MB",
                    pmName: "Marcus Brody",
                    date: "Oct 26, 2026",
                  },
                  {
                    init: "NH",
                    color: "bg-indigo-600 text-white",
                    client: "Nebula Health",
                    title: "Nebula Telehealth 2.0 Core Platform",
                    status: "In Progress",
                    health: "On Track",
                    tasksLabel: "8/21 tasks",
                    progress: 38,
                    openTasks: 13,
                    lateTasks: 1,
                    activity: "Yesterday",
                    activityColor: "text-blue-500",
                    avatar: "MB",
                    pmName: "Marcus Brody",
                    date: "Nov 20, 2026",
                  },
                  {
                    init: "SL",
                    color: "bg-teal-600 text-white",
                    client: "Solari Logistics",
                    title: "Solari Fleet Telematics Control Room",
                    status: "In Progress",
                    health: "On Track",
                    tasksLabel: "4/12 tasks",
                    progress: 33,
                    openTasks: 8,
                    lateTasks: 1,
                    activity: "2d ago",
                    activityColor: "text-slate-400",
                    avatar: "SL",
                    pmName: "Sophia Lin",
                    date: "Dec 5, 2026",
                  },
                  {
                    init: "AR",
                    color: "bg-purple-600 text-white",
                    client: "Arcturus Robotics",
                    title: "Arcturus Brand Identity & Web Launch",
                    status: "In Progress",
                    health: "On Track",
                    tasksLabel: "1/7 tasks",
                    progress: 14,
                    openTasks: 6,
                    lateTasks: 1,
                    activity: "3d ago",
                    activityColor: "text-slate-400",
                    avatar: "JV",
                    pmName: "Julian Vance",
                    date: "Jan 4, 2027",
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
                    pmName: "Tanoy Sakib",
                    date: "No deadline",
                  },
                  {
                    init: "SA",
                    color: "bg-sky-600 text-white",
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
                    pmName: "Tanoy Sakib",
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
                    pmName: "Amara Okafor",
                    date: "No deadline",
                  },
                  {
                    init: "CU",
                    color: "bg-cyan-600 text-white",
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
                    pmName: "Amara Okafor",
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
                    pmName: "Tanoy Sakib",
                    date: "Apr 29, 2026",
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
                    pmName: "Amara Okafor",
                    date: "No deadline",
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
                    pmName: "Amara Okafor",
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
                    pmName: "Amara Okafor",
                    date: "No deadline",
                  },
                ];

                const filteredProjects = allProjects.filter((p) => {
                  if (activeProjectTab === "active") return p.status === "In Progress";
                  if (activeProjectTab === "attention") return p.lateTasks > 0;
                  if (activeProjectTab === "delivered") return p.status === "Completed";
                  return true;
                });

                {/* 1. CARDS VIEW */}
                if (projectViewMode === "cards") {
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-fadeIn">
                      {filteredProjects.map((proj, idx) => (
                        <div
                          key={idx}
                          ref={proj.ref}
                          className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between gap-2.5 min-h-[190px]"
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
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-slate-700 text-white text-[7.5px] font-semibold flex items-center justify-center">
                                {proj.avatar}
                              </div>
                              <span className="text-[10px] text-slate-600 truncate max-w-[80px]">{proj.pmName}</span>
                            </div>
                            <span className="font-mono text-[8.5px] text-[#94A3B8] flex items-center gap-1">
                              <Calendar size={9} /> {proj.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                {/* 2. TABLE / LIST VIEW */}
                if (projectViewMode === "table") {
                  return (
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-xs overflow-hidden animate-fadeIn">
                      <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[10.5px] font-mono text-[#64748B] uppercase tracking-wider select-none">
                              <th className="py-2.5 px-3 w-8">
                                <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer" />
                              </th>
                              <th className="py-2.5 px-3">Project</th>
                              <th className="py-2.5 px-3">Organization</th>
                              <th className="py-2.5 px-3">Status</th>
                              <th className="py-2.5 px-3">Health</th>
                              <th className="py-2.5 px-3">Progress</th>
                              <th className="py-2.5 px-3">Tasks</th>
                              <th className="py-2.5 px-3">Due Date</th>
                              <th className="py-2.5 px-3">Lead / PM</th>
                              <th className="py-2.5 px-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E2E8F0] text-xs">
                            {filteredProjects.map((proj, idx) => (
                              <tr key={idx} className="hover:bg-[#F8FAFC]/80 transition-colors group">
                                <td className="py-3 px-3">
                                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer" />
                                </td>
                                <td className="py-3 px-3">
                                  <div className="flex items-center gap-2.5 min-w-[220px]">
                                    <div className={`w-7 h-7 rounded-md ${proj.color} font-semibold text-[11px] flex items-center justify-center shrink-0`}>
                                      {proj.init}
                                    </div>
                                    <div className="min-w-0">
                                      <span className="font-semibold text-xs text-[#0F172A] hover:text-blue-600 cursor-pointer block truncate">
                                        {proj.title}
                                      </span>
                                      <span className="text-[10px] text-[#64748B] block">{proj.client}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-3 whitespace-nowrap">
                                  <span className="text-xs text-[#475569] font-medium">{proj.client}</span>
                                </td>
                                <td className="py-3 px-3 whitespace-nowrap">
                                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium flex items-center gap-1 w-fit ${
                                    proj.status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                    proj.status === "In Progress" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                    proj.status === "On Hold" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                    "bg-slate-50 text-slate-600 border-slate-200"
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      proj.status === "Completed" ? "bg-emerald-500" :
                                      proj.status === "In Progress" ? "bg-blue-500" :
                                      proj.status === "On Hold" ? "bg-amber-500" :
                                      "bg-slate-400"
                                    }`} />
                                    {proj.status}
                                  </span>
                                </td>
                                <td className="py-3 px-3 whitespace-nowrap">
                                  <span className="px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-medium flex items-center gap-1 w-fit">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    {proj.health}
                                  </span>
                                </td>
                                <td className="py-3 px-3 whitespace-nowrap">
                                  <div className="flex items-center gap-2 min-w-[100px]">
                                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full ${proj.progress === 100 ? "bg-emerald-600" : "bg-blue-600"}`}
                                        style={{ width: `${proj.progress}%` }}
                                      />
                                    </div>
                                    <span className="font-mono text-[11px] font-semibold text-[#0F172A]">{proj.progress}%</span>
                                  </div>
                                </td>
                                <td className="py-3 px-3 whitespace-nowrap">
                                  <span className="text-[11px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                                    {proj.tasksLabel}
                                  </span>
                                </td>
                                <td className="py-3 px-3 whitespace-nowrap">
                                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                                    <Calendar size={11} className="text-slate-400" />
                                    {proj.date}
                                  </span>
                                </td>
                                <td className="py-3 px-3 whitespace-nowrap">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8.5px] font-semibold shrink-0">
                                      {proj.avatar}
                                    </div>
                                    <span className="text-xs text-[#0F172A] font-medium">{proj.pmName}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-right whitespace-nowrap">
                                  <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors">
                                    <MoreHorizontal size={14} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B] font-mono">
                        <span>
                          Showing <b className="text-[#0F172A]">{filteredProjects.length}</b> of <b className="text-[#0F172A]">21</b> projects
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-emerald-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 100% on track
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }

                {/* 3. KANBAN BOARD VIEW */}
                if (projectViewMode === "board") {
                  const columns = [
                    {
                      id: "not_started",
                      title: "NOT STARTED",
                      count: 6,
                      borderAccent: "border-t-slate-400",
                      badgeStyle: "border-slate-300 bg-white text-slate-700",
                      dotColor: "bg-slate-400",
                      projects: allProjects.filter((p) => p.status === "Not Started"),
                    },
                    {
                      id: "in_progress",
                      title: "IN PROGRESS",
                      count: 11,
                      borderAccent: "border-t-blue-500",
                      badgeStyle: "border-blue-200 bg-blue-50 text-blue-700",
                      dotColor: "bg-blue-500",
                      projects: allProjects.filter((p) => p.status === "In Progress"),
                    },
                    {
                      id: "on_hold",
                      title: "ON HOLD",
                      count: 2,
                      borderAccent: "border-t-amber-500",
                      badgeStyle: "border-amber-200 bg-amber-50 text-amber-700",
                      dotColor: "bg-amber-500",
                      projects: allProjects.filter((p) => p.status === "On Hold"),
                    },
                    {
                      id: "completed",
                      title: "COMPLETED",
                      count: 1,
                      borderAccent: "border-t-emerald-500",
                      badgeStyle: "border-emerald-200 bg-emerald-50 text-emerald-700",
                      dotColor: "bg-emerald-500",
                      projects: allProjects.filter((p) => p.status === "Completed"),
                    },
                  ];

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 animate-fadeIn">
                      {columns.map((col) => (
                        <div
                          key={col.id}
                          className={`bg-[#EEF2F6]/60 border border-[#E2E8F0] border-t-2 ${col.borderAccent} rounded-2xl p-2.5 flex flex-col justify-between min-h-[380px] gap-2.5`}
                        >
                          <div className="flex flex-col gap-2.5">
                            {/* Column Header */}
                            <div className="flex items-center justify-between text-xs pb-1">
                              <div className="flex items-center gap-1.5">
                                <span className={`px-2 py-0.5 rounded-full border font-mono text-[10px] font-medium flex items-center gap-1 ${col.badgeStyle}`}>
                                  <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                                  {col.title}
                                </span>
                                <span className="text-[11px] font-mono text-[#64748B] font-semibold">{col.projects.length}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-400">
                                <MoreHorizontal size={13} className="hover:text-slate-600 cursor-pointer" />
                                <Plus size={13} className="hover:text-slate-600 cursor-pointer" />
                              </div>
                            </div>

                            {/* Cards in column */}
                            <div className="flex flex-col gap-2">
                              {col.projects.map((proj, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all flex flex-col gap-2 cursor-grab active:cursor-grabbing"
                                >
                                  {/* Client & Initial */}
                                  <div className="flex items-center justify-between gap-1">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                      <div className={`w-5 h-5 rounded ${proj.color} text-[9px] font-bold flex items-center justify-center shrink-0`}>
                                        {proj.init}
                                      </div>
                                      <span className="text-[10px] font-medium text-slate-500 truncate">{proj.client}</span>
                                    </div>
                                    <Flag size={11} className="text-slate-300 shrink-0" />
                                  </div>

                                  {/* Title */}
                                  <h4 className="font-semibold text-xs text-[#0F172A] leading-snug line-clamp-2">
                                    {proj.title}
                                  </h4>

                                  {/* Health & Tasks */}
                                  <div className="flex items-center justify-between text-[9px]">
                                    <span className="px-1.5 py-0.2 rounded border bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                                      ● {proj.health}
                                    </span>
                                    <span className="font-mono text-slate-500">{proj.tasksLabel}</span>
                                  </div>

                                  {/* Mini Progress */}
                                  {proj.progress > 0 && (
                                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full ${proj.progress === 100 ? "bg-emerald-600" : "bg-blue-600"}`}
                                        style={{ width: `${proj.progress}%` }}
                                      />
                                    </div>
                                  )}

                                  {/* Footer: PM + Deadline */}
                                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-[#64748B]">
                                    <div className="flex items-center gap-1">
                                      <div className="w-4 h-4 rounded-full bg-slate-800 text-white text-[7.5px] font-semibold flex items-center justify-center">
                                        {proj.avatar}
                                      </div>
                                      <span className="text-[9.5px] text-slate-600">{proj.pmName}</span>
                                    </div>
                                    <span className="font-mono text-[8.5px] text-[#94A3B8] flex items-center gap-1">
                                      <Calendar size={9} /> {proj.date}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Column Footer */}
                          <button className="py-1.5 text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 text-left px-1 mt-1 transition-colors">
                            <Plus size={12} /> Add project
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }

                return null;
              })()}

            </div>
          )}

          {/* VIEW 3: TASKS (100% IDENTICAL TO SCREENSHOT 19 & 20) */}
          {currentView === "tasks" && (
            <div className="p-4 sm:p-5 flex flex-col gap-4 animate-fadeIn">
              
              {/* Top 4 Metrics Cards - 100% Matching Screenshot media_1791657660395_dad34b59.png */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0] overflow-hidden">
                {/* 1. Active Work - 28 open tasks */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#64748B] font-semibold tracking-wider">ACTIVE WORK</span>
                    <div className="mt-2.5 flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-[#0F172A] leading-none">28</span>
                      <span className="text-xs text-[#64748B]">open tasks</span>
                    </div>
                    {/* Segmented bar: To Do (slate-400), In Progress (blue-600), In Review (amber-500), Done (emerald-500) */}
                    <div className="h-1.5 w-full bg-slate-100 rounded-full flex overflow-hidden mt-3">
                      <div className="w-[28%] bg-slate-400" />
                      <div className="w-[26%] bg-blue-600" />
                      <div className="w-[12%] bg-amber-500" />
                      <div className="w-[34%] bg-emerald-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] text-[#64748B] mt-2.5 pt-1">
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]" /> To Do <b className="text-[#0F172A]">12</b></span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" /> In Progress <b className="text-[#0F172A]">11</b></span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" /> In Review <b className="text-[#0F172A]">5</b></span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Done <b className="text-[#0F172A]">15</b></span>
                    </div>
                  </div>
                  <div className="pt-2 text-[9px] text-[#64748B] border-t border-slate-100 mt-2 font-medium">
                    <b>43 tasks in view</b> · 10 done this week · 35% completion rate · avg 232h to complete
                  </div>
                </div>

                {/* 2. Overdue */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10.5px] text-[#64748B] font-medium flex items-center gap-1.5">
                      <AlertTriangle size={13} className="text-rose-500" /> Overdue
                    </span>
                    <div className="mt-2.5">
                      <span className="text-3xl font-extrabold text-rose-600 leading-none">10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full w-[35%]" />
                    </div>
                  </div>
                  <div className="pt-2 text-[9.5px] text-[#64748B] border-t border-slate-100 mt-2">
                    Past due and still open
                  </div>
                </div>

                {/* 3. Due Today */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10.5px] text-[#64748B] font-medium flex items-center gap-1.5">
                      <Clock size={13} className="text-amber-500" /> Due Today
                    </span>
                    <div className="mt-2.5">
                      <span className="text-3xl font-extrabold text-[#0F172A] leading-none">3</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[15%]" />
                    </div>
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
                      <span className="text-3xl font-extrabold text-[#0F172A] leading-none">13</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-[45%]" />
                    </div>
                  </div>
                  <div className="pt-2 text-[9.5px] text-[#64748B] border-t border-slate-100 mt-2">
                    Open and due by the end of the week
                  </div>
                </div>
              </div>

              {/* Task Copilot Banner matching screenshot media_1791659938090_15532233.png */}
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                    <Sparkles size={13} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#0F172A]">Task Copilot</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-semibold flex items-center gap-1">
                        ● Needs Attention
                      </span>
                    </div>
                    <span className="text-[10.5px] text-[#64748B]">
                      <b>28 active tasks</b>: 10 overdue and 3 due today. Nothing completed yet this week.
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

              {/* Toolbar & Filters (Fixed width tabs, horizontal scroll, fully visible right button) */}
              <div className="w-full overflow-x-auto no-scrollbar">
                <div className="flex items-center justify-between gap-4 min-w-[950px] pt-1 border-b border-[#E2E8F0] pb-2 text-xs">
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
                      <span className="font-mono text-[9.5px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-medium">10</span>
                    </button>
                    <button
                      onClick={() => setActiveTaskTab("today")}
                      className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap text-xs ${
                        activeTaskTab === "today" ? "border-blue-600 text-[#0F172A]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                      }`}
                    >
                      <span>Due Today</span>
                      <span className="font-mono text-[9.5px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-medium">3</span>
                    </button>
                    <button
                      onClick={() => setActiveTaskTab("week")}
                      className={`pb-1.5 -mb-2 font-medium transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap text-xs ${
                        activeTaskTab === "week" ? "border-blue-600 text-[#0F172A]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                      }`}
                    >
                      <span>Due This Week</span>
                      <span className="font-mono text-[9.5px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-medium">13</span>
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
                        onClick={() => setTaskViewMode("workload")}
                        className={`p-1 rounded-full transition-colors ${
                          taskViewMode === "workload" ? "bg-white text-[#0F172A] shadow-xs" : "hover:text-slate-900"
                        }`}
                        title="Workload View"
                      >
                        <Users size={13} />
                      </button>
                    </div>

                    {/* Primary CTA Button */}
                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold flex items-center gap-1 shadow-xs whitespace-nowrap shrink-0">
                      <Plus size={13} /> New task <kbd className="text-[9px] bg-blue-700 px-1 rounded ml-0.5 font-normal">n</kbd>
                    </button>
                  </div>
                </div>
              </div>

              {/* TASK VIEW MODE: LIST (NO EMOJIS - LUCIDE ICONS ONLY) */}
              {taskViewMode === "list" && (
                <div className="flex flex-col gap-3">
                  {/* GROUP 1: TO DO (12) */}
                  <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
                    <div className="bg-[#F8FAFC] px-3 py-2 border-b border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#0F172A]">
                      <div className="flex items-center gap-2">
                        <ChevronDown size={14} className="text-[#64748B]" />
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full font-mono text-[10px] flex items-center gap-1">
                          <Circle size={10} className="text-slate-500" /> TO DO
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">12</span>
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
                              <span className="font-semibold">Driver hours of service (HOS) ELD remaining clock countdown</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-rose-600 font-medium flex items-center gap-1 font-mono text-[10.5px]">
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
                              <div className="w-4 h-4 rounded-full bg-amber-800 text-amber-100 text-[8px] font-bold flex items-center justify-center">
                                MB
                              </div>
                              <span className="text-[#475569]">Marcus Brody</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-amber-600 font-semibold">Today</td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-700 font-medium flex items-center gap-1">
                              ● Solari Fleet Telematics Control Room
                            </span>
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 hover:border-blue-500 cursor-pointer" />
                              <span className="font-semibold">Prescription PDF download formatting on mobile Safari</span>
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
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-teal-800 text-teal-100 text-[8px] font-bold flex items-center justify-center">
                                SL
                              </div>
                              <span className="text-[#475569]">Sarah Lin</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600">Oct 11</td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-700 font-medium flex items-center gap-1">
                              ● Nebula Telehealth 2.0 Core Platform
                            </span>
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 hover:border-blue-500 cursor-pointer" />
                              <span className="font-semibold">Dispute & chargeback upload documentation portal</span>
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
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-blue-800 text-blue-100 text-[8px] font-bold flex items-center justify-center">
                                DK
                              </div>
                              <span className="text-[#475569]">David Kim</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600">Oct 14</td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-700 font-medium flex items-center gap-1">
                              ● Kroma Mobile SDK & Merchant Portal
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="p-2 border-t border-slate-100 bg-[#FAFAFA]">
                      <button className="text-[11px] font-medium text-[#64748B] hover:text-[#0F172A] flex items-center gap-1">
                        <Plus size={11} /> Add task
                      </button>
                    </div>
                  </div>

                  {/* GROUP 2: IN PROGRESS (11) */}
                  <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
                    <div className="bg-[#F8FAFC] px-3 py-2 border-b border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#0F172A]">
                      <div className="flex items-center gap-2">
                        <ChevronDown size={14} className="text-[#64748B]" />
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-mono text-[10px] flex items-center gap-1">
                          <Clock size={10} className="text-blue-600" /> IN PROGRESS
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">11</span>
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
                              <span className="font-semibold">Update WebRTC audio level visualizer with high-contrast accessibility mode</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-orange-600 font-medium flex items-center gap-1 font-mono text-[10.5px]">
                              <Flag size={10} /> High
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium">
                              ● At Risk
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-purple-800 text-purple-100 text-[8px] font-bold flex items-center justify-center">
                                ER
                              </div>
                              <span className="text-[#475569]">Elena Rostova</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-rose-600 font-semibold">Oct 9 (Overdue)</td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-700 font-medium flex items-center gap-1">
                              ● Nebula Telehealth 2.0 Core Platform
                            </span>
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 hover:border-blue-500 cursor-pointer" />
                              <span className="font-semibold">Driver dispatch web app: offline map tiles caching with IndexedDB</span>
                              <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                                <Paperclip size={10} /> 1
                              </span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-orange-600 font-medium flex items-center gap-1 font-mono text-[10.5px]">
                              <Flag size={10} /> High
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium">
                              ● At Risk
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-amber-800 text-amber-100 text-[8px] font-bold flex items-center justify-center">
                                MB
                              </div>
                              <span className="text-[#475569]">Marcus Brody</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-rose-600 font-semibold">Oct 9 (Overdue)</td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-700 font-medium flex items-center gap-1">
                              ● Solari Fleet Telematics Control Room
                            </span>
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 hover:border-blue-500 cursor-pointer" />
                              <span className="font-semibold">Kroma Mobile SDK: Stripe merchant authentication flow</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-rose-600 font-medium flex items-center gap-1 font-mono text-[10.5px]">
                              <Flag size={10} /> Urgent
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium">
                              ● At Risk
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-indigo-800 text-indigo-100 text-[8px] font-bold flex items-center justify-center">
                                JV
                              </div>
                              <span className="text-[#475569]">Julian Vance</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-rose-600 font-semibold">Oct 10 (Overdue)</td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-700 font-medium flex items-center gap-1">
                              ● Kroma Mobile SDK & Merchant Portal
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="p-2 border-t border-slate-100 bg-[#FAFAFA]">
                      <button className="text-[11px] font-medium text-[#64748B] hover:text-[#0F172A] flex items-center gap-1">
                        <Plus size={11} /> Add task
                      </button>
                    </div>
                  </div>

                  {/* GROUP 3: IN REVIEW (5) */}
                  <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
                    <div className="bg-[#F8FAFC] px-3 py-2 border-b border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#0F172A]">
                      <div className="flex items-center gap-2">
                        <ChevronDown size={14} className="text-[#64748B]" />
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-mono text-[10px] flex items-center gap-1">
                          <Clock size={10} className="text-amber-600" /> IN REVIEW
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">5</span>
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
                              <span className="font-semibold">HIPAA compliance audit trail viewer for clinic administrators</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-rose-600 font-medium flex items-center gap-1 font-mono text-[10.5px]">
                              <Flag size={10} /> Urgent
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium">
                              ● Needs Attention
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-teal-800 text-teal-100 text-[8px] font-bold flex items-center justify-center">
                                SL
                              </div>
                              <span className="text-[#475569]">Sarah Lin</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-rose-600 font-semibold">Oct 7 (Overdue)</td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-700 font-medium flex items-center gap-1">
                              ● Nebula Telehealth 2.0 Core Platform
                            </span>
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 hover:border-blue-500 cursor-pointer" />
                              <span className="font-semibold">Automated geofence exit push notification latency audit</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-rose-600 font-medium flex items-center gap-1 font-mono text-[10.5px]">
                              <Flag size={10} /> Urgent
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium">
                              ● Needs Attention
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-amber-800 text-amber-100 text-[8px] font-bold flex items-center justify-center">
                                MB
                              </div>
                              <span className="text-[#475569]">Marcus Brody</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-rose-600 font-semibold">Oct 7 (Overdue)</td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-700 font-medium flex items-center gap-1">
                              ● Solari Fleet Telematics Control Room
                            </span>
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 hover:border-blue-500 cursor-pointer" />
                              <span className="font-semibold">Robot emergency stop (E-STOP) physical button telemetry integration</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-rose-600 font-medium flex items-center gap-1 font-mono text-[10.5px]">
                              <Flag size={10} /> Urgent
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium">
                              ● Needs Attention
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-slate-800 text-slate-100 text-[8px] font-bold flex items-center justify-center">
                                TK
                              </div>
                              <span className="text-[#475569]">Tariq Khan</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-rose-600 font-semibold">Oct 8 (Overdue)</td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-700 font-medium flex items-center gap-1">
                              ● Arcturus Autonomous AMR Platform
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="p-2 border-t border-slate-100 bg-[#FAFAFA]">
                      <button className="text-[11px] font-medium text-[#64748B] hover:text-[#0F172A] flex items-center gap-1">
                        <Plus size={11} /> Add task
                      </button>
                    </div>
                  </div>

                  {/* GROUP 4: DONE (15) */}
                  <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
                    <div className="bg-[#F8FAFC] px-3 py-2 border-b border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#0F172A]">
                      <div className="flex items-center gap-2">
                        <ChevronDown size={14} className="text-[#64748B]" />
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-mono text-[10px] flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-emerald-600" /> DONE
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">15</span>
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
                              <span className="font-semibold">Merchant checkout dark theme component library export</span>
                              <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                                <Paperclip size={10} /> 2
                              </span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-amber-600 font-medium flex items-center gap-1 font-mono text-[10.5px]">
                              <Flag size={10} /> Medium
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium">
                              ● Completed
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-blue-800 text-blue-100 text-[8px] font-bold flex items-center justify-center">
                                DK
                              </div>
                              <span className="text-[#475569]">David Kim</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600">Sep 27</td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-700 font-medium flex items-center gap-1">
                              ● Kroma Mobile SDK & Merchant Portal
                            </span>
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 hover:border-blue-500 cursor-pointer" />
                              <span className="font-semibold">High-contrast night mode color palette for truck in-cabin display</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-amber-600 font-medium flex items-center gap-1 font-mono text-[10.5px]">
                              <Flag size={10} /> Medium
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium">
                              ● Completed
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-amber-800 text-amber-100 text-[8px] font-bold flex items-center justify-center">
                                MB
                              </div>
                              <span className="text-[#475569]">Marcus Brody</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600">Sep 29</td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-700 font-medium flex items-center gap-1">
                              ● Solari Fleet Telematics Control Room
                            </span>
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 hover:border-blue-500 cursor-pointer" />
                              <span className="font-semibold">Design token audit: verify cross-platform typography hierarchy</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-600 font-medium flex items-center gap-1 font-mono text-[10.5px]">
                              <Flag size={10} /> Low
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium">
                              ● Completed
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-indigo-800 text-indigo-100 text-[8px] font-bold flex items-center justify-center">
                                JV
                              </div>
                              <span className="text-[#475569]">Julian Vance</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600">Sep 25</td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-700 font-medium flex items-center gap-1">
                              ● Kroma Mobile SDK & Merchant Portal
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="p-2 border-t border-slate-100 bg-[#FAFAFA]">
                      <button className="text-[11px] font-medium text-[#64748B] hover:text-[#0F172A] flex items-center gap-1">
                        <Plus size={11} /> Add task
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TASK VIEW MODE: KANBAN BOARD (100% IDENTICAL TO SCREENSHOT media_1791659862914_f71341ca.png & media_1791657660395_dad34b59.png) */}
              {taskViewMode === "board" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 animate-fadeIn">
                  {/* Column 1: TO DO (12) */}
                  <div className="bg-[#EEF2F6]/60 border border-[#E2E8F0] border-t-2 border-t-slate-400 rounded-2xl p-2.5 flex flex-col gap-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs pb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full border border-slate-300 bg-white font-mono text-[10px] font-medium text-slate-700 flex items-center gap-1">
                          <Circle size={10} className="text-slate-400" />
                          TO DO
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">12</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MoreHorizontal size={13} className="hover:text-slate-600 cursor-pointer" />
                        <Plus size={13} className="hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Card 1: Driver hours of service (HOS) ELD */}
                    <div
                      ref={taskCardRef}
                      className="p-3.5 pl-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden flex flex-col gap-2.5"
                    >
                      {/* Left Accent Inset Stripe */}
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-[#E05252] rounded-r-md" />
                      <h4 className="font-bold text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                        Driver hours of service (HOS) ELD remaining clock...
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 bg-[#EAFBF3] text-[#0D7A4D] rounded-lg text-[11px] font-medium">eld</span>
                        <span className="px-2.5 py-0.5 bg-[#EAFBF3] text-[#0D7A4D] rounded-lg text-[11px] font-medium">compliance</span>
                        <span className="px-2.5 py-0.5 bg-[#EAFBF3] text-[#0D7A4D] rounded-lg text-[11px] font-medium">timer</span>
                      </div>
                      {/* Priority & Due */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="text-[#DC2626] font-medium flex items-center gap-1.5">
                          <Flag size={13} className="text-[#DC2626]" /> Urgent
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FEF7E6] border border-[#FCD34D]/50 text-[#92400E] text-[11px] font-medium flex items-center gap-1">
                          <Clock size={12} className="text-[#92400E]" /> Today
                        </span>
                      </div>
                      {/* Project */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-normal truncate">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C] shrink-0" />
                        <span className="truncate">Solari Fleet Telematics Control Room</span>
                      </div>
                      {/* Divider */}
                      <div className="border-t border-[#F1F5F9] my-0.5" />
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <img
                          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
                          alt="Marcus Brody"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                        <ArrowRight size={14} className="text-[#94A3B8] hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Card 2: Prescription PDF download formatting */}
                    <div className="p-3.5 pl-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden flex flex-col gap-2.5">
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-[#F59E0B] rounded-r-md" />
                      <h4 className="font-bold text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                        Prescription PDF download formatting on mobile Safari
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 bg-[#F0EFFE] text-[#4338CA] rounded-lg text-[11px] font-medium">mobile</span>
                        <span className="px-2.5 py-0.5 bg-[#F0EFFE] text-[#4338CA] rounded-lg text-[11px] font-medium">safari</span>
                        <span className="px-2.5 py-0.5 bg-[#EAFBF3] text-[#0D7A4D] rounded-lg text-[11px] font-medium">pdf</span>
                      </div>
                      {/* Priority & Due */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="text-[#B45309] font-medium flex items-center gap-1.5">
                          <Flag size={13} className="text-[#B45309]" /> Medium
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[#475569] text-[11px] font-medium flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" /> Oct 11
                        </span>
                      </div>
                      {/* Project */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-normal truncate">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C] shrink-0" />
                        <span className="truncate">Nebula Telehealth 2.0 Core Platform</span>
                      </div>
                      <div className="border-t border-[#F1F5F9] my-0.5" />
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <img
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                          alt="Sophia Lin"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                        <ArrowRight size={14} className="text-[#94A3B8] hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Card 3: Dispute & chargeback upload */}
                    <div className="p-3.5 pl-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden flex flex-col gap-2.5">
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-[#F59E0B] rounded-r-md" />
                      <h4 className="font-bold text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                        Dispute & chargeback upload documentation portal
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 bg-[#F0EFFE] text-[#4338CA] rounded-lg text-[11px] font-medium">disputes</span>
                        <span className="px-2.5 py-0.5 bg-[#F0EFFE] text-[#4338CA] rounded-lg text-[11px] font-medium">chargebacks</span>
                        <span className="px-2.5 py-0.5 bg-[#E0F2FE] text-[#0369A1] rounded-lg text-[11px] font-medium">stripe</span>
                      </div>
                      {/* Priority & Due */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="text-[#B45309] font-medium flex items-center gap-1.5">
                          <Flag size={13} className="text-[#B45309]" /> Medium
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[#475569] text-[11px] font-medium flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" /> Oct 14
                        </span>
                      </div>
                      {/* Project */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-normal truncate">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
                        <span className="truncate">Kroma Mobile SDK & Merchant Portal</span>
                      </div>
                      <div className="border-t border-[#F1F5F9] my-0.5" />
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <img
                          src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80"
                          alt="David Kim"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                        <ArrowRight size={14} className="text-[#94A3B8] hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    <button className="py-2 text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 text-left px-1">
                      <Plus size={12} /> Add task
                    </button>
                  </div>

                  {/* Column 2: IN PROGRESS (11) */}
                  <div className="bg-[#EEF2F6]/60 border border-[#E2E8F0] border-t-2 border-t-blue-500 rounded-2xl p-2.5 flex flex-col gap-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs pb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full border border-blue-200 bg-blue-50/80 font-mono text-[10px] font-medium text-blue-700 flex items-center gap-1">
                          <Clock size={10} className="text-blue-600" />
                          IN PROGRESS
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">11</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MoreHorizontal size={13} className="hover:text-slate-600 cursor-pointer" />
                        <Plus size={13} className="hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Card 1: Update WebRTC audio level visualizer (Exact Match to media_1791659862914_f71341ca.png) */}
                    <div className="p-3.5 pl-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden flex flex-col gap-2.5">
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-[#E05252] rounded-r-md" />
                      <h4 className="font-bold text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                        Update WebRTC audio level visualizer with high-contrast...
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 bg-[#FEF7E6] text-[#8C6B1F] rounded-lg text-[11px] font-medium">webrtc</span>
                        <span className="px-2.5 py-0.5 bg-[#F0EFFE] text-[#4338CA] rounded-lg text-[11px] font-medium">frontend</span>
                        <span className="px-2.5 py-0.5 bg-[#EAFBF3] text-[#0D7A4D] rounded-lg text-[11px] font-medium">accessibility</span>
                      </div>
                      {/* Priority & Due */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="text-[#C2410C] font-medium flex items-center gap-1.5">
                          <Flag size={13} className="text-[#C2410C]" /> High
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FEECEC] border border-[#FCA5A5]/40 text-[#991B1B] text-[11.5px] font-medium flex items-center gap-1">
                          <AlertCircle size={12} strokeWidth={2.2} className="text-[#991B1B]" /> Oct 9
                        </span>
                      </div>
                      {/* Project */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-normal truncate">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C] shrink-0" />
                        <span className="truncate">Nebula Telehealth 2.0 Core Platform</span>
                      </div>
                      <div className="border-t border-[#F1F5F9] my-0.5" />
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                          alt="Amara Okafor"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                        <ArrowRight size={14} className="text-[#94A3B8] hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Card 2: Driver dispatch web app: offline map tiles */}
                    <div className="p-3.5 pl-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden flex flex-col gap-2.5">
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-[#F59E0B] rounded-r-md" />
                      <h4 className="font-bold text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                        Driver dispatch web app: offline map tiles caching with...
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 bg-[#EAFBF3] text-[#0D7A4D] rounded-lg text-[11px] font-medium">pwa</span>
                        <span className="px-2.5 py-0.5 bg-[#FEF7E6] text-[#8C6B1F] rounded-lg text-[11px] font-medium">offline</span>
                        <span className="px-2.5 py-0.5 bg-[#FEECEC] text-[#991B1B] rounded-lg text-[11px] font-medium">maps</span>
                      </div>
                      {/* Priority & Due */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="text-[#C2410C] font-medium flex items-center gap-1.5">
                          <Flag size={13} className="text-[#C2410C]" /> High
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FEECEC] border border-[#FCA5A5]/40 text-[#991B1B] text-[11.5px] font-medium flex items-center gap-1">
                          <AlertCircle size={12} strokeWidth={2.2} className="text-[#991B1B]" /> Oct 9
                        </span>
                      </div>
                      {/* Project */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-normal truncate">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C] shrink-0" />
                        <span className="truncate">Solari Fleet Telematics Control Room</span>
                      </div>
                      <div className="border-t border-[#F1F5F9] my-0.5" />
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <img
                          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
                          alt="Marcus Brody"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[11px] font-mono text-[#94A3B8]">
                            <Paperclip size={12} /> 1
                          </span>
                          <ArrowRight size={14} className="text-[#94A3B8] hover:text-slate-600 cursor-pointer" />
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Kroma Mobile SDK: Stripe merchant auth */}
                    <div className="p-3.5 pl-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden flex flex-col gap-2.5">
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-[#E05252] rounded-r-md" />
                      <h4 className="font-bold text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                        Kroma Mobile SDK: Stripe merchant authentication flow
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 bg-[#F0EFFE] text-[#4338CA] rounded-lg text-[11px] font-medium">mobile</span>
                        <span className="px-2.5 py-0.5 bg-[#E0F2FE] text-[#0369A1] rounded-lg text-[11px] font-medium">stripe</span>
                        <span className="px-2.5 py-0.5 bg-[#E0F2FE] text-[#0369A1] rounded-lg text-[11px] font-medium">sdk</span>
                      </div>
                      {/* Priority & Due */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="text-[#DC2626] font-medium flex items-center gap-1.5">
                          <Flag size={13} className="text-[#DC2626]" /> Urgent
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FEECEC] border border-[#FCA5A5]/40 text-[#991B1B] text-[11.5px] font-medium flex items-center gap-1">
                          <AlertCircle size={12} strokeWidth={2.2} className="text-[#991B1B]" /> Oct 10
                        </span>
                      </div>
                      {/* Project */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-normal truncate">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
                        <span className="truncate">Kroma Mobile SDK & Merchant Portal</span>
                      </div>
                      <div className="border-t border-[#F1F5F9] my-0.5" />
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
                          alt="Julian Vance"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                        <ArrowRight size={14} className="text-[#94A3B8] hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    <button className="py-2 text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 text-left px-1">
                      <Plus size={12} /> Add task
                    </button>
                  </div>

                  {/* Column 3: IN REVIEW (5) */}
                  <div className="bg-[#EEF2F6]/60 border border-[#E2E8F0] border-t-2 border-t-amber-500 rounded-2xl p-2.5 flex flex-col gap-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs pb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full border border-amber-200 bg-amber-50/80 font-mono text-[10px] font-medium text-amber-700 flex items-center gap-1">
                          <Clock size={10} className="text-amber-600" />
                          IN REVIEW
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">5</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MoreHorizontal size={13} className="hover:text-slate-600 cursor-pointer" />
                        <Plus size={13} className="hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Card 1: HIPAA compliance audit trail viewer */}
                    <div className="p-3.5 pl-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden flex flex-col gap-2.5">
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-[#E05252] rounded-r-md" />
                      <h4 className="font-bold text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                        HIPAA compliance audit trail viewer for clinic administrators
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 bg-[#FEECEC] text-[#991B1B] rounded-lg text-[11px] font-medium">hipaa</span>
                        <span className="px-2.5 py-0.5 bg-[#FEF7E6] text-[#8C6B1F] rounded-lg text-[11px] font-medium">audit</span>
                        <span className="px-2.5 py-0.5 bg-[#E0F2FE] text-[#0369A1] rounded-lg text-[11px] font-medium">security</span>
                      </div>
                      {/* Priority & Due */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="text-[#DC2626] font-medium flex items-center gap-1.5">
                          <Flag size={13} className="text-[#DC2626]" /> Urgent
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FEECEC] border border-[#FCA5A5]/40 text-[#991B1B] text-[11.5px] font-medium flex items-center gap-1">
                          <AlertCircle size={12} strokeWidth={2.2} className="text-[#991B1B]" /> Oct 7
                        </span>
                      </div>
                      {/* Project */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-normal truncate">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C] shrink-0" />
                        <span className="truncate">Nebula Telehealth 2.0 Core Platform</span>
                      </div>
                      <div className="border-t border-[#F1F5F9] my-0.5" />
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <img
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                          alt="Sophia Lin"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                        <ArrowRight size={14} className="text-[#94A3B8] hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Card 2: Automated geofence exit push notification */}
                    <div className="p-3.5 pl-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden flex flex-col gap-2.5">
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-[#E05252] rounded-r-md" />
                      <h4 className="font-bold text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                        Automated geofence exit push notification latency audit
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 bg-[#E0F2FE] text-[#0369A1] rounded-lg text-[11px] font-medium">geofence</span>
                        <span className="px-2.5 py-0.5 bg-[#EAFBF3] text-[#0D7A4D] rounded-lg text-[11px] font-medium">push</span>
                        <span className="px-2.5 py-0.5 bg-[#F0EFFE] text-[#4338CA] rounded-lg text-[11px] font-medium">performance</span>
                      </div>
                      {/* Priority & Due */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="text-[#DC2626] font-medium flex items-center gap-1.5">
                          <Flag size={13} className="text-[#DC2626]" /> Urgent
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FEECEC] border border-[#FCA5A5]/40 text-[#991B1B] text-[11.5px] font-medium flex items-center gap-1">
                          <AlertCircle size={12} strokeWidth={2.2} className="text-[#991B1B]" /> Oct 7
                        </span>
                      </div>
                      {/* Project */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-normal truncate">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C] shrink-0" />
                        <span className="truncate">Solari Fleet Telematics Control Room</span>
                      </div>
                      <div className="border-t border-[#F1F5F9] my-0.5" />
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <img
                          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
                          alt="Marcus Brody"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                        <ArrowRight size={14} className="text-[#94A3B8] hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Card 3: Robot emergency stop (E-STOP) telemetry */}
                    <div className="p-3.5 pl-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden flex flex-col gap-2.5">
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-[#E05252] rounded-r-md" />
                      <h4 className="font-bold text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                        Robot emergency stop (E-STOP) physical button telemetry integration
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-medium">hardware</span>
                        <span className="px-2.5 py-0.5 bg-[#FEECEC] text-[#991B1B] rounded-lg text-[11px] font-medium">safety</span>
                        <span className="px-2.5 py-0.5 bg-[#F0EFFE] text-[#4338CA] rounded-lg text-[11px] font-medium">robotics</span>
                      </div>
                      {/* Priority & Due */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="text-[#DC2626] font-medium flex items-center gap-1.5">
                          <Flag size={13} className="text-[#DC2626]" /> Urgent
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FEECEC] border border-[#FCA5A5]/40 text-[#991B1B] text-[11.5px] font-medium flex items-center gap-1">
                          <AlertCircle size={12} strokeWidth={2.2} className="text-[#991B1B]" /> Oct 8
                        </span>
                      </div>
                      {/* Project */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-normal truncate">
                        <span className="w-2 h-2 rounded-full bg-[#3B82F6] shrink-0" />
                        <span className="truncate">Arcturus Autonomous AMR Platform</span>
                      </div>
                      <div className="border-t border-[#F1F5F9] my-0.5" />
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <img
                          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80"
                          alt="Tariq Khan"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                        <ArrowRight size={14} className="text-[#94A3B8] hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    <button className="py-2 text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 text-left px-1">
                      <Plus size={12} /> Add task
                    </button>
                  </div>

                  {/* Column 4: DONE (15) */}
                  <div className="bg-[#EEF2F6]/60 border border-[#E2E8F0] border-t-2 border-t-emerald-500 rounded-2xl p-2.5 flex flex-col gap-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs pb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 font-mono text-[10px] font-medium text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-emerald-600" />
                          DONE
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">15</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MoreHorizontal size={13} className="hover:text-slate-600 cursor-pointer" />
                        <Plus size={13} className="hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Card 1: Merchant checkout dark theme */}
                    <div className="p-3.5 pl-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden flex flex-col gap-2.5">
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-[#10B981] rounded-r-md" />
                      <h4 className="font-bold text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                        Merchant checkout dark theme component library export
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 bg-[#E0F2FE] text-[#0369A1] rounded-lg text-[11px] font-medium">dark-mode</span>
                        <span className="px-2.5 py-0.5 bg-[#EAFBF3] text-[#0D7A4D] rounded-lg text-[11px] font-medium">components</span>
                      </div>
                      {/* Priority & Due */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="text-[#B45309] font-medium flex items-center gap-1.5">
                          <Flag size={13} className="text-[#B45309]" /> Medium
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[#475569] text-[11px] font-medium flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" /> Sep 27
                        </span>
                      </div>
                      {/* Project */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-normal truncate">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
                        <span className="truncate">Kroma Mobile SDK & Merchant Portal</span>
                      </div>
                      <div className="border-t border-[#F1F5F9] my-0.5" />
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <img
                          src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80"
                          alt="David Kim"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[11px] font-mono text-[#94A3B8]">
                            <Paperclip size={12} /> 2
                          </span>
                          <ArrowRight size={14} className="text-[#94A3B8] hover:text-slate-600 cursor-pointer" />
                        </div>
                      </div>
                    </div>

                    {/* Card 2: High-contrast night mode color palette */}
                    <div className="p-3.5 pl-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden flex flex-col gap-2.5">
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-[#10B981] rounded-r-md" />
                      <h4 className="font-bold text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                        High-contrast night mode color palette for truck in-cabin...
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 bg-[#E0F2FE] text-[#0369A1] rounded-lg text-[11px] font-medium">night-mode</span>
                        <span className="px-2.5 py-0.5 bg-[#FDF2F8] text-[#BE185D] rounded-lg text-[11px] font-medium">ui</span>
                      </div>
                      {/* Priority & Due */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="text-[#B45309] font-medium flex items-center gap-1.5">
                          <Flag size={13} className="text-[#B45309]" /> Medium
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[#475569] text-[11px] font-medium flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" /> Sep 29
                        </span>
                      </div>
                      {/* Project */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-normal truncate">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C] shrink-0" />
                        <span className="truncate">Solari Fleet Telematics Control Room</span>
                      </div>
                      <div className="border-t border-[#F1F5F9] my-0.5" />
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <img
                          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
                          alt="Marcus Brody"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                        <ArrowRight size={14} className="text-[#94A3B8] hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Card 3: Design token audit: verify typography hierarchy */}
                    <div className="p-3.5 pl-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs hover:shadow-sm transition-shadow relative overflow-hidden flex flex-col gap-2.5">
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-[#10B981] rounded-r-md" />
                      <h4 className="font-bold text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                        Design token audit: verify cross-platform typography hierarchy
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 bg-[#F0EFFE] text-[#4338CA] rounded-lg text-[11px] font-medium">tokens</span>
                        <span className="px-2.5 py-0.5 bg-[#FDF2F8] text-[#BE185D] rounded-lg text-[11px] font-medium">figma</span>
                        <span className="px-2.5 py-0.5 bg-[#EAFBF3] text-[#0D7A4D] rounded-lg text-[11px] font-medium">ui</span>
                      </div>
                      {/* Priority & Due */}
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="text-[#475569] font-medium flex items-center gap-1.5">
                          <Flag size={13} className="text-[#475569]" /> Low
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[#475569] text-[11px] font-medium flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" /> Sep 25
                        </span>
                      </div>
                      {/* Project */}
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-normal truncate">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
                        <span className="truncate">Kroma Mobile SDK & Merchant Portal</span>
                      </div>
                      <div className="border-t border-[#F1F5F9] my-0.5" />
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
                          alt="Julian Vance"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                        <ArrowRight size={14} className="text-[#94A3B8] hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>

                    <button className="py-2 text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 text-left px-1">
                      <Plus size={12} /> Add task
                    </button>
                  </div>
                </div>
              )}

              {/* TASK VIEW MODE: TEAM WORKLOAD (100% IDENTICAL TO SCREENSHOT media_1791659938090_15532233.png) */}
              {taskViewMode === "workload" && (
                <div className="flex flex-col gap-3.5 animate-fadeIn">
                  {/* Subheader matching screenshot */}
                  <div className="text-xs text-[#64748B]">
                    <span className="font-semibold text-[#0F172A]">8 teammates</span> · none overloaded · capacity is time logged this week against each teammate&apos;s weekly hours
                  </div>

                  {/* 3-Column Teammate Workload Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {[
                      {
                        name: "Chloe Bennett",
                        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
                        active: 6,
                        overdue: 0,
                        est: "66h",
                        logged: "0h",
                        capacityPct: 0,
                        loggedWeek: "0h logged of a 40h week",
                      },
                      {
                        name: "Amara Okafor",
                        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
                        active: 10,
                        overdue: 6,
                        est: "135.6h",
                        logged: "0h",
                        capacityPct: 0,
                        loggedWeek: "0h logged of a 40h week",
                      },
                      {
                        name: "Liam Gallagher",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
                        active: 6,
                        overdue: 2,
                        est: "54.4h",
                        logged: "0h",
                        capacityPct: 0,
                        loggedWeek: "0h logged of a 40h week",
                      },
                      {
                        name: "Dominic Sterling",
                        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
                        active: 0,
                        overdue: 0,
                        est: "0h",
                        logged: "0h",
                        capacityPct: 0,
                        loggedWeek: "0h logged of a 40h week",
                      },
                      {
                        name: "Sophia Lin",
                        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
                        active: 5,
                        overdue: 1,
                        est: "73h",
                        logged: "0h",
                        capacityPct: 0,
                        loggedWeek: "0h logged of a 40h week",
                      },
                      {
                        name: "Marcus Brody",
                        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
                        active: 1,
                        overdue: 1,
                        est: "20h",
                        logged: "0h",
                        capacityPct: 0,
                        loggedWeek: "0h logged of a 40h week",
                      },
                      {
                        name: "Julian Vance",
                        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                        active: 0,
                        overdue: 0,
                        est: "0h",
                        logged: "0h",
                        capacityPct: 0,
                        loggedWeek: "0h logged of a 40h week",
                      },
                      {
                        name: "Elena Rostova",
                        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
                        active: 0,
                        overdue: 0,
                        est: "0h",
                        logged: "0h",
                        capacityPct: 0,
                        loggedWeek: "0h logged of a 40h week",
                      },
                    ].map((teammate) => (
                      <div
                        key={teammate.name}
                        className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between gap-3.5"
                      >
                        {/* Header: Avatar, Name/Active & Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={teammate.avatar}
                              alt={teammate.name}
                              className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-100"
                            />
                            <div>
                              <h4 className="font-bold text-[13px] text-[#0F172A] leading-tight">
                                {teammate.name}
                              </h4>
                              <span className="text-[11px] text-[#64748B]">
                                {teammate.active} active · {teammate.overdue} overdue
                              </span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-[#EAFBF3] text-[#0D7A4D] border border-[#A7F3D0]/50 text-[10.5px] font-medium flex items-center gap-1.5 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A4D]" /> Has capacity
                          </span>
                        </div>

                        {/* Capacity Used Section */}
                        <div>
                          <div className="flex items-center justify-between text-xs text-[#64748B]">
                            <span>Capacity used this week</span>
                            <span className="font-bold text-[#0F172A]">{teammate.capacityPct}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden mt-1.5">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${teammate.capacityPct}%` }}
                            />
                          </div>
                          <div className="text-[11px] text-[#94A3B8] mt-1.5">
                            {teammate.loggedWeek}
                          </div>
                        </div>

                        {/* 4 Stat Boxes Grid */}
                        <div className="grid grid-cols-4 border border-[#E2E8F0] rounded-xl overflow-hidden divide-x divide-[#E2E8F0] bg-[#FAFAFA]/40">
                          <div className="p-2 text-center">
                            <span className="text-[9.5px] font-mono font-semibold uppercase text-[#64748B] block">ACTIVE</span>
                            <span className="text-sm font-bold text-[#0F172A] block mt-0.5">{teammate.active}</span>
                          </div>
                          <div className="p-2 text-center">
                            <span className="text-[9.5px] font-mono font-semibold uppercase text-[#64748B] block">OVERDUE</span>
                            <span className={`text-sm font-bold block mt-0.5 ${teammate.overdue > 0 ? "text-[#DC2626]" : "text-[#0F172A]"}`}>
                              {teammate.overdue}
                            </span>
                          </div>
                          <div className="p-2 text-center">
                            <span className="text-[9.5px] font-mono font-semibold uppercase text-[#64748B] block">EST.</span>
                            <span className="text-sm font-bold text-[#0F172A] block mt-0.5">{teammate.est}</span>
                          </div>
                          <div className="p-2 text-center">
                            <span className="text-[9.5px] font-mono font-semibold uppercase text-[#64748B] block">LOGGED</span>
                            <span className="text-sm font-bold text-[#0F172A] block mt-0.5">{teammate.logged}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* VIEW: OFFERINGS - SERVICES (100% IDENTICAL TO SCREENSHOT 23) */}
          {currentView === "offerings-services" && (() => {
            const allServices = [
              {
                id: "srv-1",
                title: "Business VPS Hosting",
                description: "Dedicated cloud VPS resources, isolated environment, and enterprise performance.",
                type: "Recurring",
                price: "$40",
                period: "/mo",
                bg: "bg-[#EBF5FF]",
                dotColor: "#BFDBFE",
                iconColor: "text-[#2563EB]",
                category: "all",
              },
              {
                id: "srv-2",
                title: "Small Managed Hosting",
                description: "High-speed cloud hosting with SSL, automated backups, and 99.9% uptime guarantee.",
                type: "Recurring",
                price: "$9.99",
                period: "/mo",
                bg: "bg-[#FFF4ED]",
                dotColor: "#FED7AA",
                iconColor: "text-[#EA580C]",
                category: "all",
              },
              {
                id: "srv-3",
                title: "Protect Package — Monthly",
                description: "Enterprise-grade security, real-time WAF threat defense, e-commerce checkout audits, full AI...",
                type: "Recurring",
                price: "$299",
                period: "/mo",
                bg: "bg-[#ECFDF5]",
                dotColor: "#A7F3D0",
                iconColor: "text-[#059669]",
                category: "all",
              },
              {
                id: "srv-4",
                title: "Essential Package — Monthly",
                description: "High-performance website care featuring daily cloud backups, Core Web Vitals speed optimizatio...",
                type: "Recurring",
                price: "$199",
                period: "/mo",
                bg: "bg-[#FEFCE8]",
                dotColor: "#FDE68A",
                iconColor: "text-[#D97706]",
                category: "all",
              },
              {
                id: "srv-5",
                title: "Maintain Package — Monthly",
                description: "Essential 24/7 uptime monitoring, proactive security scans, weekly cloud backups, automated safe...",
                type: "Recurring",
                price: "$99",
                period: "/mo",
                bg: "bg-[#FDF2F8]",
                dotColor: "#FBCFE8",
                iconColor: "text-[#DB2777]",
                category: "all",
              },
              {
                id: "srv-6",
                title: "test",
                description: "No description",
                isItalicDesc: true,
                type: "Hourly",
                price: "$0.50",
                period: "/mo",
                bg: "bg-[#F0FDF4]",
                dotColor: "#BBF7D0",
                iconColor: "text-[#16A34A]",
                category: "all",
              },
              {
                id: "srv-7",
                title: "Regular VPS Hosting",
                description: "Reliable shared VPS hosting with 2 vCPU, 4GB RAM, 80GB NVMe SSD, and 3TB bandwidth. Fully...",
                type: "Recurring",
                price: "$25",
                period: "/mo",
                isTechCube: true,
                category: "all",
              },
            ];

            const filteredServices = allServices.filter((s) => {
              if (offeringsFilter === "wp") return false;
              if (offeringsSearch) {
                return (
                  s.title.toLowerCase().includes(offeringsSearch.toLowerCase()) ||
                  s.description.toLowerCase().includes(offeringsSearch.toLowerCase())
                );
              }
              return true;
            });

            return (
              <div className="p-4 sm:p-5 flex flex-col gap-4 animate-fadeIn pb-12">
                {/* Header Subtitle */}
                <div>
                  <p className="text-xs text-[#64748B]">
                    Browse available services and digital products
                  </p>
                </div>

                {/* Offerings Tabs: All, Services, Digital Products */}
                <div className="flex items-center gap-6 border-b border-[#E2E8F0] text-xs">
                  <button
                    onClick={() => setCurrentView("offerings-services")}
                    className="pb-2.5 font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
                  >
                    All
                  </button>
                  <button
                    onClick={() => setCurrentView("offerings-services")}
                    className="pb-2.5 font-semibold text-[#0F172A] border-b-2 border-[#0F172A] -mb-px transition-colors"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => setCurrentView("offerings-products")}
                    className="pb-2.5 font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
                  >
                    Digital Products
                  </button>
                </div>

                {/* Search & Layout Tools */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] flex-1 max-w-sm shadow-2xs focus-within:border-blue-500 transition-colors">
                    <Search size={14} className="text-[#94A3B8] shrink-0" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={offeringsSearch}
                      onChange={(e) => setOfferingsSearch(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-xs text-[#0F172A] placeholder:text-[#94A3B8]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-[#64748B]">
                    <button className="p-2 bg-white border border-[#E2E8F0] rounded-lg hover:text-[#0F172A] hover:bg-slate-50 transition-colors shadow-2xs">
                      <SlidersHorizontal size={13} />
                    </button>
                    <button className="p-2 bg-slate-50 border border-[#E2E8F0] rounded-lg text-[#0F172A] shadow-2xs">
                      <LayoutGrid size={13} />
                    </button>
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setOfferingsFilter("all")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      offeringsFilter === "all"
                        ? "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]"
                        : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-slate-50"
                    }`}
                  >
                    All <span className="ml-1 font-semibold">{filteredServices.length}</span>
                  </button>
                  <button
                    onClick={() => setOfferingsFilter("wp")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      offeringsFilter === "wp"
                        ? "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]"
                        : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    WordPress Plugin <span className="text-[#94A3B8]">0</span>
                  </button>
                </div>

                {/* 4-Column Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                    >
                      {/* Top Banner */}
                      <div className="h-32 w-full relative overflow-hidden flex items-center justify-center">
                        {service.isTechCube ? (
                          <div className="w-full h-full bg-[#080E1E] relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.3)_0%,transparent_75%)]" />
                            <svg className="w-full h-full opacity-60 absolute inset-0" viewBox="0 0 240 120" fill="none">
                              <path d="M0 60h240M120 0v120M40 20l40 40M200 20l-40 40M40 100l40-40M200 100l-40-40" stroke="#0284C7" strokeWidth="0.5" strokeDasharray="3 3" />
                            </svg>
                            <div className="relative z-10 w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 backdrop-blur-xs flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                              <Box size={28} className="text-cyan-400 animate-pulse" />
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`w-full h-full ${service.bg} relative flex items-center justify-center`}
                            style={{
                              backgroundImage: `radial-gradient(${service.dotColor} 1.5px, transparent 1.5px)`,
                              backgroundSize: "14px 14px",
                            }}
                          >
                            <div className="w-11 h-11 rounded-full bg-white/70 border border-slate-200/50 flex items-center justify-center shadow-2xs">
                              <Box size={22} className={service.iconColor} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Body */}
                      <div className="p-4 flex flex-col flex-1 justify-between">
                        <div>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold inline-block ${
                              service.type === "Hourly"
                                ? "bg-[#ECFDF5] text-[#059669]"
                                : "bg-[#EFF6FF] text-[#2563EB]"
                            }`}
                          >
                            {service.type}
                          </span>
                          <h3 className="font-bold text-[13.5px] text-[#0F172A] mt-2 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </h3>
                          <p
                            className={`text-xs text-[#64748B] leading-relaxed line-clamp-2 min-h-[34px] ${
                              service.isItalicDesc ? "italic text-slate-400" : ""
                            }`}
                          >
                            {service.description}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-base font-extrabold text-[#0F172A]">
                              {service.price}
                            </span>
                            {service.period && (
                              <span className="text-xs text-[#64748B] font-normal">
                                {service.period}
                              </span>
                            )}
                          </div>
                          <button className="w-7 h-7 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:border-slate-400 transition-colors shadow-2xs">
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* VIEW: OFFERINGS - DIGITAL PRODUCTS (100% IDENTICAL TO SCREENSHOT 24) */}
          {currentView === "offerings-products" && (() => {
            const allProducts = [
              {
                id: "prod-1",
                title: "Rank Math Pro + WP Rocket",
                description: "Rank Math + WP Rocket:Unlock SEO Excellence & Peak Performance",
                type: "Recurring",
                price: "$8.99",
                period: "/mo",
                category: "wp",
                renderBanner: () => (
                  <div className="w-full h-full bg-[#38265E] relative overflow-hidden flex items-center justify-center p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-end gap-1 h-9">
                        <div className="w-2.5 h-4 bg-white/40 rounded-t-xs" />
                        <div className="w-2.5 h-6 bg-white/70 rounded-t-xs" />
                        <div className="w-2.5 h-8 bg-white rounded-t-xs relative">
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px]">▲</div>
                        </div>
                      </div>
                      <span className="text-white font-extrabold text-xl tracking-tight">RankMath</span>
                    </div>
                    <div className="absolute left-3 bottom-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-white/95 rounded-full text-[10px] font-medium text-[#0F172A] shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>WordPress Plugin</span>
                    </div>
                  </div>
                ),
              },
              {
                id: "prod-2",
                title: "Job Manager Pro Bundle",
                description: "Complete WP job board solution",
                type: "Recurring",
                price: "$119",
                period: "/yr",
                category: "wp",
                renderBanner: () => (
                  <div className="w-full h-full bg-[#FFDE31] relative overflow-hidden flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#1E1B4B] flex items-center justify-center shadow-md">
                      <span className="text-[#38BDF8] font-black text-2xl tracking-tighter">JM</span>
                    </div>
                    <div className="absolute left-3 bottom-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-white/95 rounded-full text-[10px] font-medium text-[#0F172A] shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>WordPress Plugin</span>
                    </div>
                  </div>
                ),
              },
              {
                id: "prod-3",
                title: "The Hub Theme",
                description: "Premium multi-purpose WP theme",
                type: "One-Time",
                price: "$45",
                period: "",
                category: "wp",
                renderBanner: () => (
                  <div
                    className="w-full h-full bg-[#EBF5FF] relative overflow-hidden flex items-center justify-center"
                    style={{
                      backgroundImage: "radial-gradient(#CBD5E1 1.5px, transparent 1.5px)",
                      backgroundSize: "14px 14px",
                    }}
                  >
                    <div className="w-11 h-11 rounded-full bg-white/70 border border-blue-200/50 flex items-center justify-center text-[#2563EB] shadow-2xs">
                      <Box size={20} />
                    </div>
                    <div className="absolute left-3 bottom-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-white/95 rounded-full text-[10px] font-medium text-[#0F172A] shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>WordPress Plugin</span>
                    </div>
                  </div>
                ),
              },
              {
                id: "prod-4",
                title: "SureDash Lifetime",
                description: "SureDash client portal — lifetime deal",
                type: "One-Time",
                price: "$49",
                period: "",
                category: "wp",
                renderBanner: () => (
                  <div className="w-full h-full bg-[#F8FAFC] relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                    <span className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tighter">SureD</span>
                    <div className="absolute left-3 bottom-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-white/95 rounded-full text-[10px] font-medium text-[#0F172A] shadow-xs border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>WordPress Plugin</span>
                    </div>
                  </div>
                ),
              },
              {
                id: "prod-5",
                title: "Sure Trigger",
                description: "WordPress automation — 1000+ app integrations",
                type: "Recurring",
                price: "$20",
                period: "/yr",
                category: "wp",
                renderBanner: () => (
                  <div className="w-full h-full bg-[#F8FAFC] relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                    <span className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tighter">SureD</span>
                    <div className="absolute left-3 bottom-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-white/95 rounded-full text-[10px] font-medium text-[#0F172A] shadow-xs border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>WordPress Plugin</span>
                    </div>
                  </div>
                ),
              },
              {
                id: "prod-6",
                title: "Elementor Advanced Plan",
                description: "Elementor Pro — 3 site license",
                type: "Recurring",
                price: "$75",
                period: "/yr",
                category: "wp",
                renderBanner: () => (
                  <div className="w-full h-full bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center gap-2 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-[#92003B] flex items-center justify-center gap-0.5 p-1 shrink-0">
                      <div className="w-1 h-3.5 bg-white rounded-xs" />
                      <div className="w-1 h-3.5 bg-white rounded-xs" />
                      <div className="w-1 h-3.5 bg-white rounded-xs" />
                    </div>
                    <span className="text-[#1E293B] font-bold text-xl tracking-tight">elementor</span>
                    <div className="absolute left-3 bottom-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-white/95 rounded-full text-[10px] font-medium text-[#0F172A] shadow-xs border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>WordPress Plugin</span>
                    </div>
                  </div>
                ),
              },
              {
                id: "prod-7",
                title: "Essential Addons for Elementor (Lifetime)",
                description: "Essential Addons — lifetime deal",
                type: "One-Time",
                price: "$49",
                period: "",
                category: "wp",
                renderBanner: () => (
                  <div className="w-full h-full bg-gradient-to-tr from-[#250E62] via-[#5B21B6] to-[#7C3AED] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute top-2 left-6 w-3 h-3 rounded-full bg-amber-400 blur-[1px] opacity-80" />
                    <div className="absolute bottom-4 right-8 w-4 h-4 rounded-full bg-orange-500 blur-[1px] opacity-80" />
                    <div className="absolute top-3 right-10 w-2.5 h-2.5 rounded-full bg-cyan-400 blur-[1px] opacity-80" />
                    <span className="text-white font-black text-3xl tracking-wider drop-shadow-md">EA.</span>
                    <div className="absolute left-3 bottom-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-white/95 rounded-full text-[10px] font-medium text-[#0F172A] shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>WordPress Plugin</span>
                    </div>
                  </div>
                ),
              },
              {
                id: "prod-8",
                title: "Sure Member Lifetime",
                description: "SureMember — lifetime deal",
                type: "One-Time",
                price: "$25",
                period: "",
                category: "wp",
                renderBanner: () => (
                  <div className="w-full h-full bg-[#1D4ED8] relative overflow-hidden flex items-center justify-center">
                    <svg className="w-14 h-14 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
                      <path d="M20 30 C 40 10, 60 10, 80 30 C 60 50, 40 50, 20 70 C 40 90, 60 90, 80 70" />
                    </svg>
                    <div className="absolute left-3 bottom-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-white/95 rounded-full text-[10px] font-medium text-[#0F172A] shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>WordPress Plugin</span>
                    </div>
                  </div>
                ),
              },
            ];

            const filteredProducts = allProducts.filter((p) => {
              if (offeringsSearch) {
                return (
                  p.title.toLowerCase().includes(offeringsSearch.toLowerCase()) ||
                  p.description.toLowerCase().includes(offeringsSearch.toLowerCase())
                );
              }
              return true;
            });

            return (
              <div className="p-4 sm:p-5 flex flex-col gap-4 animate-fadeIn pb-12">
                {/* Header Subtitle */}
                <div>
                  <p className="text-xs text-[#64748B]">
                    Browse available services and digital products
                  </p>
                </div>

                {/* Offerings Tabs: All, Services, Digital Products */}
                <div className="flex items-center gap-6 border-b border-[#E2E8F0] text-xs">
                  <button
                    onClick={() => setCurrentView("offerings-products")}
                    className="pb-2.5 font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
                  >
                    All
                  </button>
                  <button
                    onClick={() => setCurrentView("offerings-services")}
                    className="pb-2.5 font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => setCurrentView("offerings-products")}
                    className="pb-2.5 font-semibold text-[#0F172A] border-b-2 border-[#0F172A] -mb-px transition-colors"
                  >
                    Digital Products
                  </button>
                </div>

                {/* Search & Layout Tools */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] flex-1 max-w-sm shadow-2xs focus-within:border-blue-500 transition-colors">
                    <Search size={14} className="text-[#94A3B8]" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={offeringsSearch}
                      onChange={(e) => setOfferingsSearch(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-xs text-[#0F172A] placeholder:text-[#94A3B8]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-[#64748B]">
                    <button className="p-2 bg-white border border-[#E2E8F0] rounded-lg hover:text-[#0F172A] hover:bg-slate-50 transition-colors shadow-2xs">
                      <SlidersHorizontal size={13} />
                    </button>
                    <button className="p-2 bg-slate-50 border border-[#E2E8F0] rounded-lg text-[#0F172A] shadow-2xs">
                      <LayoutGrid size={13} />
                    </button>
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setOfferingsFilter("all")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      offeringsFilter === "all"
                        ? "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]"
                        : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-slate-50"
                    }`}
                  >
                    All <span className="ml-1 font-semibold">36</span>
                  </button>
                  <button
                    onClick={() => setOfferingsFilter("wp")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      offeringsFilter === "wp"
                        ? "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]"
                        : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    WordPress Plugin <span className="text-[#94A3B8]">36</span>
                  </button>
                </div>

                {/* 4-Column Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                    >
                      {/* Top Banner */}
                      <div className="h-32 w-full relative overflow-hidden flex items-center justify-center">
                        {prod.renderBanner()}
                      </div>

                      {/* Content Body */}
                      <div className="p-4 flex flex-col flex-1 justify-between">
                        <div>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold inline-block ${
                              prod.type === "One-Time"
                                ? "bg-[#ECFDF5] text-[#059669]"
                                : "bg-[#EFF6FF] text-[#2563EB]"
                            }`}
                          >
                            {prod.type}
                          </span>
                          <h3 className="font-bold text-[13.5px] text-[#0F172A] mt-2 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {prod.title}
                          </h3>
                          <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 min-h-[34px]">
                            {prod.description}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-base font-extrabold text-[#0F172A]">
                              {prod.price}
                            </span>
                            {prod.period && (
                              <span className="text-xs text-[#64748B] font-normal">
                                {prod.period}
                              </span>
                            )}
                          </div>
                          <button className="w-7 h-7 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:border-slate-400 transition-colors shadow-2xs">
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* VIEW: TEAM DIRECTORY (100% IDENTICAL TO SCREENSHOT media_1791663752064_77641ea0.png) */}
          {currentView === "team" && (() => {
            const teamMembers = [
              {
                id: "tm-1",
                name: "Amara Okafor",
                role: "Agency Member",
                email: "amara@aetheris.design",
                department: "Engineering",
                activeTasks: 10,
                overdueTasks: 4,
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
                status: "Active",
              },
              {
                id: "tm-2",
                name: "Chloe Bennett",
                role: "Agency Member",
                email: "chloe@aetheris.design",
                department: "Design",
                activeTasks: 6,
                overdueTasks: 0,
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
                status: "Active",
              },
              {
                id: "tm-3",
                name: "Dominic Sterling",
                role: "Accountant",
                email: "dominic@aetheris.desi...",
                department: "Finance",
                activeTasks: 0,
                overdueTasks: 0,
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
                status: "Active",
              },
              {
                id: "tm-4",
                name: "Elena Rostova",
                role: "Admin",
                email: "elena@aetheris.design",
                department: "Operations",
                activeTasks: 0,
                overdueTasks: 0,
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
                status: "Active",
              },
              {
                id: "tm-5",
                name: "Julian Vance",
                isYou: true,
                role: "Owner",
                email: "julian@aetheris.design",
                department: "Executive",
                activeTasks: 0,
                overdueTasks: 0,
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                status: "Active",
              },
              {
                id: "tm-6",
                name: "Liam Gallagher",
                role: "Agency Member",
                email: "liam@aetheris.design",
                department: "Design",
                activeTasks: 6,
                overdueTasks: 2,
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
                status: "Active",
              },
              {
                id: "tm-7",
                name: "Marcus Brody",
                role: "Project Manager",
                email: "marcus@aetheris.design",
                department: "Delivery",
                activeTasks: 1,
                overdueTasks: 1,
                avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
                status: "Active",
              },
              {
                id: "tm-8",
                name: "Sophia Lin",
                role: "Project Manager",
                email: "sophia@aetheris.design",
                department: "Delivery",
                activeTasks: 5,
                overdueTasks: 1,
                avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
                status: "Active",
              },
            ];

            const filteredTeam = teamMembers.filter((m) => {
              if (teamSearch) {
                return (
                  m.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
                  m.role.toLowerCase().includes(teamSearch.toLowerCase()) ||
                  m.department.toLowerCase().includes(teamSearch.toLowerCase())
                );
              }
              return true;
            });

            return (
              <div className="p-4 sm:p-6 flex flex-col gap-5 animate-fadeIn pb-12">
                {/* Header Subtitle Eyebrow and Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#94A3B8] font-semibold tracking-wider">
                      THE PEOPLE BEHIND THE WORK
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-0.5 tracking-tight">
                      Great work starts with your team.
                    </h2>
                    <p className="text-xs text-[#64748B] mt-1">
                      Find the right person, make room for focused work, and keep everyone moving together.
                    </p>
                  </div>

                  {/* Overlapping Team Avatars */}
                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <div className="flex -space-x-2">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                        alt="Amara"
                        className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
                        alt="Chloe"
                        className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                        alt="Liam"
                        className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
                        alt="Dominic"
                        className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      />
                    </div>
                    <span className="text-[10.5px] font-semibold text-[#64748B] bg-slate-100 px-1.5 py-0.5 rounded-full">
                      +4
                    </span>
                    <span className="text-xs font-semibold text-[#0F172A]">8 people</span>
                  </div>
                </div>

                {/* Team Navigation Tabs */}
                <div className="flex items-center justify-between border-b border-[#E2E8F0] gap-4">
                  <div className="flex items-center gap-6 text-xs overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setActiveTeamTab("directory")}
                      className={`pb-2.5 font-medium transition-colors whitespace-nowrap ${
                        activeTeamTab === "directory"
                          ? "font-semibold text-[#0F172A] border-b-2 border-[#0F172A] -mb-px"
                          : "text-[#64748B] hover:text-[#0F172A]"
                      }`}
                    >
                      Directory
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView("tasks");
                        setTaskViewMode("workload");
                      }}
                      className="pb-2.5 font-medium text-[#64748B] hover:text-[#0F172A] transition-colors whitespace-nowrap"
                    >
                      Workload
                    </button>
                    <button
                      onClick={() => setActiveTeamTab("capacity")}
                      className={`pb-2.5 font-medium transition-colors whitespace-nowrap ${
                        activeTeamTab === "capacity"
                          ? "font-semibold text-[#0F172A] border-b-2 border-[#0F172A] -mb-px"
                          : "text-[#64748B] hover:text-[#0F172A]"
                      }`}
                    >
                      Capacity & Timeline
                    </button>
                    <button
                      onClick={() => setActiveTeamTab("invitations")}
                      className={`pb-2.5 font-medium transition-colors whitespace-nowrap ${
                        activeTeamTab === "invitations"
                          ? "font-semibold text-[#0F172A] border-b-2 border-[#0F172A] -mb-px"
                          : "text-[#64748B] hover:text-[#0F172A]"
                      }`}
                    >
                      Invitations
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pb-2 shrink-0">
                    <button className="p-1.5 bg-white border border-[#E2E8F0] rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 transition-colors shadow-2xs">
                      <RotateCw size={13} />
                    </button>
                    <button className="px-3 py-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors">
                      <UserPlus size={13} />
                      <span>Invite member</span>
                    </button>
                  </div>
                </div>

                {/* 2-Column Main Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Left Column: Your people + Filter Bar + Cards Grid */}
                  <div className="lg:col-span-8 flex flex-col gap-4">
                    {/* Subtitle & Grid/List Toggle */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xs text-[#0F172A]">Your people</h3>
                        <p className="text-[11px] text-[#94A3B8]">A little more connected. A lot more in sync.</p>
                      </div>

                      <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-lg p-0.5">
                        <button
                          onClick={() => setTeamViewMode("grid")}
                          className={`p-1 rounded ${teamViewMode === "grid" ? "bg-slate-100 text-[#0F172A]" : "text-[#94A3B8]"}`}
                        >
                          <LayoutGrid size={13} />
                        </button>
                        <button
                          onClick={() => setTeamViewMode("list")}
                          className={`p-1 rounded ${teamViewMode === "list" ? "bg-slate-100 text-[#0F172A]" : "text-[#94A3B8]"}`}
                        >
                          <List size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Filter Controls Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] flex-1 max-w-xs shadow-2xs focus-within:border-indigo-500 transition-colors">
                          <Search size={13} className="text-[#94A3B8] shrink-0" />
                          <input
                            type="text"
                            placeholder="Search people, roles, or departments..."
                            value={teamSearch}
                            onChange={(e) => setTeamSearch(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-xs text-[#0F172A] placeholder:text-[#94A3B8]"
                          />
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#475569]">
                          <select className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#475569] outline-none shadow-2xs hover:bg-slate-50 cursor-pointer">
                            <option>All departments</option>
                            <option>Delivery</option>
                            <option>Design</option>
                            <option>Engineering</option>
                            <option>Finance</option>
                            <option>Operations</option>
                          </select>
                          <select className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#475569] outline-none shadow-2xs hover:bg-slate-50 cursor-pointer">
                            <option>All roles</option>
                            <option>Owner</option>
                            <option>Admin</option>
                            <option>Project Manager</option>
                            <option>Agency Member</option>
                            <option>Accountant</option>
                          </select>
                          <select className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#475569] outline-none shadow-2xs hover:bg-slate-50 cursor-pointer">
                            <option>All statuses</option>
                            <option>Active</option>
                            <option>Invited</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-[#64748B]">
                        <span>Showing {filteredTeam.length} of 8</span>
                        <div className="flex items-center gap-1 font-medium text-[#0F172A] cursor-pointer">
                          <span>Name A–Z</span>
                          <ChevronDown size={11} className="text-[#94A3B8]" />
                        </div>
                      </div>
                    </div>

                    {/* Member Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {filteredTeam.map((member) => (
                        <div
                          key={member.id}
                          className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow group"
                        >
                          <div>
                            {/* Avatar & Header */}
                            <div className="flex items-start justify-between gap-2">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-11 h-11 rounded-full object-cover shrink-0 border border-slate-100"
                              />
                              <span className="text-[11px] text-[#059669] font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                Active
                              </span>
                            </div>

                            {/* Name & Role */}
                            <div className="mt-2.5">
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-[13px] text-[#0F172A] group-hover:text-indigo-600 transition-colors">
                                  {member.name}
                                </h4>
                                {member.isYou && (
                                  <span className="px-1.5 py-0.2 rounded bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-semibold">
                                    You
                                  </span>
                                )}
                              </div>
                              <span className="px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] text-[10px] font-medium inline-block mt-1">
                                {member.role}
                              </span>
                            </div>

                            {/* Email & Department */}
                            <div className="mt-2 text-[11px] leading-tight">
                              <span className="text-[#94A3B8] block truncate">{member.email}</span>
                              <span className="text-[#64748B] font-medium block mt-1">{member.department}</span>
                            </div>
                          </div>

                          {/* Footer: Tasks count & overdue */}
                          <div className="border-t border-[#F1F5F9] pt-2.5 mt-3.5 flex items-center justify-between text-xs">
                            <span className="text-[#64748B]">
                              <b className="font-bold text-[#0F172A]">{member.activeTasks}</b> Active tasks
                            </span>
                            {member.overdueTasks > 0 && (
                              <span className="px-2 py-0.5 bg-[#FEF2F2] text-[#DC2626] border border-[#FEE2E2] rounded-md text-[10px] font-semibold flex items-center gap-1">
                                <AlertTriangle size={10} /> {member.overdueTasks} overdue
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Widgets */}
                  <div className="lg:col-span-4 flex flex-col gap-4">
                    {/* Widget 1: TEAM COPILOT */}
                    <div className="bg-white rounded-2xl border border-indigo-100 p-4 shadow-2xs">
                      <div className="flex items-center gap-1.5">
                        <Sparkles size={12} className="text-[#6366F1]" />
                        <span className="text-[10px] font-mono text-[#6366F1] font-bold uppercase tracking-wider">
                          TEAM COPILOT
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-[#0F172A] mt-1.5">
                        A little help, a better handoff.
                      </h4>
                      <p className="text-[11.5px] text-[#64748B] mt-1 leading-relaxed">
                        Use your team&apos;s available context to plan onboarding, clarify responsibilities, and prepare handoffs.
                      </p>

                      <div className="mt-3 flex flex-col gap-1.5">
                        <button className="w-full p-2.5 bg-slate-50 hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl text-xs font-medium text-[#0F172A] flex items-center justify-between transition-colors text-left group">
                          <span>Clarify team responsibilities</span>
                          <ArrowRight size={12} className="text-[#94A3B8] group-hover:text-indigo-600 transition-colors" />
                        </button>
                        <button className="w-full p-2.5 bg-slate-50 hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl text-xs font-medium text-[#0F172A] flex items-center justify-between transition-colors text-left group">
                          <span>Plan an onboarding checklist</span>
                          <ArrowRight size={12} className="text-[#94A3B8] group-hover:text-indigo-600 transition-colors" />
                        </button>
                        <button className="w-full p-2.5 bg-slate-50 hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl text-xs font-medium text-[#0F172A] flex items-center justify-between transition-colors text-left group">
                          <span>Prepare a handoff checklist</span>
                          <ArrowRight size={12} className="text-[#94A3B8] group-hover:text-indigo-600 transition-colors" />
                        </button>
                      </div>

                      <span className="text-[10px] text-[#94A3B8] mt-2.5 block">
                        Uses only information your role can access.
                      </span>
                    </div>

                    {/* Widget 2: WORTH A LOOK */}
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-2xs">
                      <span className="text-[10px] font-mono uppercase text-[#64748B] font-bold tracking-wider">
                        WORTH A LOOK
                      </span>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        A few small check-ins can make a big difference.
                      </p>

                      <div className="mt-3 flex flex-col gap-1.5">
                        <div className="p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs text-[#0F172A] cursor-pointer group">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                            <span className="font-medium">4 people with overdue work</span>
                          </div>
                          <ArrowRight size={12} className="text-[#94A3B8] group-hover:text-[#0F172A]" />
                        </div>

                        <div className="p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs text-[#0F172A] cursor-pointer group">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                            <span className="font-medium">1 person with 10+ tasks</span>
                          </div>
                          <ArrowRight size={12} className="text-[#94A3B8] group-hover:text-[#0F172A]" />
                        </div>
                      </div>

                      <p className="text-[10px] text-[#94A3B8] leading-relaxed mt-3 pt-3 border-t border-[#F1F5F9]">
                        Active task counts are benchmarked against a 10-task reference point across all active projects. It reflects open task count, not calendar availability or total estimated effort.
                      </p>
                    </div>

                    {/* Widget 3: DEPARTMENTS */}
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-2xs">
                      <span className="text-[10px] font-mono uppercase text-[#64748B] font-bold tracking-wider">
                        DEPARTMENTS
                      </span>

                      <div className="mt-3 flex flex-col gap-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#475569] font-medium">Delivery</span>
                          <span className="text-[11px] font-bold text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded-full">2</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#475569] font-medium">Design</span>
                          <span className="text-[11px] font-bold text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded-full">2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* VIEW 4: TICKETS (100% IDENTICAL TO SCREENSHOT media_1791665430868_eab0b9be.png) */}
          {currentView === "tickets" && (() => {
            const allTickets = [
              {
                id: "TKT-105",
                priority: "Medium",
                title: "Assistance connecting Stripe Connect test account",
                type: "Question" as const,
                org: "Arcturus Robotics",
                status: "Open" as const,
                assigneeName: "Marcus Brody",
                assigneeAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
                replies: 1,
                updated: "5d ago",
              },
              {
                id: "TKT-104",
                priority: "Medium",
                title: "Driver GPS ping interval configuration in mobile view",
                type: "Change Request" as const,
                org: "Solari Logistics",
                status: "In Progress" as const,
                assigneeName: "Amara Okafor",
                assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
                replies: 1,
                updated: "5d ago",
              },
              {
                id: "TKT-29",
                priority: "High",
                title: "Apex Architecture DNS Propagation",
                type: "Bug" as const,
                org: "Apex Studio",
                status: "Closed" as const,
                assigneeName: "Dominic Sterling",
                assigneeAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
                replies: 4,
                updated: "5d ago",
              },
              {
                id: "TKT-28",
                priority: "High",
                title: "Client Portal Login Authentication",
                type: "Support" as const,
                org: "Creative Core",
                status: "Closed" as const,
                assigneeName: "Elena Rostova",
                assigneeAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
                replies: 4,
                updated: "6d ago",
              },
            ];

            const boardColumns = [
              { id: "Open", title: "Open", dotColor: "bg-[#3B82F6]" },
              { id: "Triaged", title: "Triaged", dotColor: "bg-[#06B6D4]" },
              { id: "In Progress", title: "In Progress", dotColor: "bg-[#F59E0B]" },
              { id: "Waiting on Client", title: "Waiting on Client", dotColor: "bg-[#8B5CF6]" },
              { id: "Resolved", title: "Resolved", dotColor: "bg-[#10B981]" },
              { id: "Closed", title: "Closed", dotColor: "bg-[#64748B]" },
            ];

            const filteredTickets = allTickets.filter((tkt) => {
              if (ticketStatusFilter !== "all" && tkt.status !== ticketStatusFilter) {
                return false;
              }
              if (ticketSearch.trim()) {
                const q = ticketSearch.toLowerCase();
                return (
                  tkt.id.toLowerCase().includes(q) ||
                  tkt.title.toLowerCase().includes(q) ||
                  tkt.org.toLowerCase().includes(q) ||
                  tkt.assigneeName.toLowerCase().includes(q)
                );
              }
              return true;
            });

            return (
              <div className="p-4 sm:p-5 flex flex-col gap-4 animate-fadeIn pb-12">
                {/* 1. TOP TOOLBAR */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left: Search input, Priority flag, Grid button */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#64748B] focus-within:border-indigo-400 focus-within:bg-white transition-colors w-52 sm:w-64 shadow-2xs">
                      <Search size={13} className="text-[#94A3B8] shrink-0" />
                      <input
                        type="text"
                        placeholder="Search tickets..."
                        value={ticketSearch}
                        onChange={(e) => setTicketSearch(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-xs text-[#0F172A] placeholder:text-[#94A3B8]"
                      />
                      <kbd className="text-[10px] text-[#94A3B8] font-mono bg-white border border-[#E2E8F0] px-1.5 py-0.2 rounded shadow-2xs">
                        /
                      </kbd>
                    </div>

                    <button
                      title="Filter by priority"
                      className="p-2 bg-white border border-[#E2E8F0] hover:bg-slate-50 rounded-xl text-[#64748B] hover:text-[#0F172A] shadow-2xs transition-colors"
                    >
                      <Flag size={13} />
                    </button>

                    <button
                      title="Group options"
                      className="p-2 bg-white border border-[#E2E8F0] hover:bg-slate-50 rounded-xl text-[#64748B] hover:text-[#0F172A] shadow-2xs transition-colors"
                    >
                      <LayoutGrid size={13} />
                    </button>
                  </div>

                  {/* Right: View switcher & New Ticket button */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center bg-[#F1F5F9] p-0.5 rounded-xl border border-[#E2E8F0] text-xs shadow-2xs">
                      <button
                        onClick={() => setTicketViewMode("list")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all ${
                          ticketViewMode === "list"
                            ? "bg-white text-[#0F172A] font-bold shadow-2xs border border-[#E2E8F0]"
                            : "text-[#64748B] hover:text-[#0F172A]"
                        }`}
                      >
                        <List size={13} /> List
                      </button>
                      <button
                        onClick={() => setTicketViewMode("board")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all ${
                          ticketViewMode === "board"
                            ? "bg-white text-[#0F172A] font-bold shadow-2xs border border-[#E2E8F0]"
                            : "text-[#64748B] hover:text-[#0F172A]"
                        }`}
                      >
                        <Kanban size={13} /> Board
                      </button>
                      <button
                        onClick={() => setTicketViewMode("sla")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all ${
                          ticketViewMode === "sla"
                            ? "bg-white text-[#0F172A] font-bold shadow-2xs border border-[#E2E8F0]"
                            : "text-[#64748B] hover:text-[#0F172A]"
                        }`}
                      >
                        <Clock size={13} /> SLA
                      </button>
                    </div>

                    <button className="px-3.5 py-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors">
                      <Plus size={13} /> New Ticket{" "}
                      <kbd className="text-[10px] bg-white/20 text-white font-mono px-1 py-0.2 rounded font-normal">
                        n
                      </kbd>
                    </button>
                  </div>
                </div>

                {/* 2. STATUS FILTER PILLS (Matching screenshot 100%) */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
                  <button
                    onClick={() => setTicketStatusFilter("all")}
                    className={`px-3 py-1 rounded-full text-xs transition-all shrink-0 ${
                      ticketStatusFilter === "all"
                        ? "bg-[#EEF2FF] text-[#4F46E5] font-semibold border border-[#C7D2FE]"
                        : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
                    }`}
                  >
                    All statuses
                  </button>

                  <button
                    onClick={() => setTicketStatusFilter(ticketStatusFilter === "Open" ? "all" : "Open")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all shrink-0 ${
                      ticketStatusFilter === "Open"
                        ? "bg-[#EEF2FF] text-[#4F46E5] font-semibold border border-[#C7D2FE]"
                        : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" /> Open
                  </button>

                  <button
                    onClick={() => setTicketStatusFilter(ticketStatusFilter === "Triaged" ? "all" : "Triaged")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all shrink-0 ${
                      ticketStatusFilter === "Triaged"
                        ? "bg-[#EEF2FF] text-[#4F46E5] font-semibold border border-[#C7D2FE]"
                        : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" /> Triaged
                  </button>

                  <button
                    onClick={() => setTicketStatusFilter(ticketStatusFilter === "In Progress" ? "all" : "In Progress")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all shrink-0 ${
                      ticketStatusFilter === "In Progress"
                        ? "bg-[#EEF2FF] text-[#4F46E5] font-semibold border border-[#C7D2FE]"
                        : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" /> In Progress
                  </button>

                  <button
                    onClick={() => setTicketStatusFilter(ticketStatusFilter === "Waiting on Client" ? "all" : "Waiting on Client")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all shrink-0 ${
                      ticketStatusFilter === "Waiting on Client"
                        ? "bg-[#EEF2FF] text-[#4F46E5] font-semibold border border-[#C7D2FE]"
                        : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" /> Waiting on Client
                  </button>

                  <button
                    onClick={() => setTicketStatusFilter(ticketStatusFilter === "Resolved" ? "all" : "Resolved")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all shrink-0 ${
                      ticketStatusFilter === "Resolved"
                        ? "bg-[#EEF2FF] text-[#4F46E5] font-semibold border border-[#C7D2FE]"
                        : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Resolved
                  </button>

                  <button
                    onClick={() => setTicketStatusFilter(ticketStatusFilter === "Closed" ? "all" : "Closed")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all shrink-0 ${
                      ticketStatusFilter === "Closed"
                        ? "bg-[#EEF2FF] text-[#4F46E5] font-semibold border border-[#C7D2FE]"
                        : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#64748B]" /> Closed
                  </button>
                </div>

                {/* 3. BOARD VIEW (Matching screenshot 100%) */}
                {ticketViewMode === "board" && (
                  <div className="overflow-x-auto pb-4 pt-1 no-scrollbar -mx-4 sm:-mx-5 px-4 sm:px-5">
                    <div className="flex gap-4 min-w-max items-start">
                      {boardColumns.map((col) => {
                        const colTickets = allTickets.filter((t) => {
                          if (t.status !== col.id) return false;
                          if (ticketSearch.trim()) {
                            const q = ticketSearch.toLowerCase();
                            return (
                              t.id.toLowerCase().includes(q) ||
                              t.title.toLowerCase().includes(q) ||
                              t.org.toLowerCase().includes(q) ||
                              t.assigneeName.toLowerCase().includes(q)
                            );
                          }
                          return true;
                        });

                        return (
                          <div
                            key={col.id}
                            className="w-[280px] shrink-0 bg-[#F1F5F9]/70 rounded-2xl p-3 flex flex-col gap-3 min-h-[540px] select-none"
                          >
                            {/* Column Header */}
                            <div className="flex items-center gap-2 px-1 py-0.5">
                              <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                              <span className="font-bold text-xs text-[#0F172A]">{col.title}</span>
                              <span className="text-[11px] font-semibold text-[#64748B] bg-[#E2E8F0]/70 px-1.5 py-0.2 rounded-full leading-none">
                                {colTickets.length}
                              </span>
                            </div>

                            {/* Column Cards or Empty State */}
                            {colTickets.length === 0 ? (
                              <div className="flex-1 flex items-center justify-center text-xs text-[#94A3B8] font-normal py-20 select-none">
                                No items yet
                              </div>
                            ) : (
                              <div className="flex flex-col gap-2.5">
                                {colTickets.map((tkt) => (
                                  <div
                                    key={tkt.id}
                                    className="bg-white rounded-xl p-3.5 border border-[#E2E8F0] shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all cursor-pointer flex flex-col gap-2.5"
                                  >
                                    {/* Line 1: Ticket ID & Priority Flag */}
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="font-mono text-[11px] text-[#64748B] font-semibold">
                                        {tkt.id}
                                      </span>
                                      <span className="flex items-center gap-1 text-[11px] text-[#64748B] font-medium">
                                        <Flag size={11} className="text-[#94A3B8]" /> {tkt.priority}
                                      </span>
                                    </div>

                                    {/* Line 2: Ticket Title */}
                                    <h4 className="font-bold text-xs sm:text-[13px] text-[#0F172A] leading-snug line-clamp-2">
                                      {tkt.title}
                                    </h4>

                                    {/* Line 3: Type Tag & Organization */}
                                    <div className="flex items-center gap-2 flex-wrap text-xs">
                                      {tkt.type === "Question" && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                                          <HelpCircle size={10} className="text-[#059669]" /> Question
                                        </span>
                                      )}
                                      {tkt.type === "Change Request" && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                                          <RefreshCw size={10} className="text-[#D97706]" /> Change Request
                                        </span>
                                      )}
                                      {tkt.type === "Bug" && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                                          <Bug size={10} className="text-[#DC2626]" /> Bug
                                        </span>
                                      )}
                                      {tkt.type === "Support" && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]">
                                          <HelpCircle size={10} className="text-[#475569]" /> Support
                                        </span>
                                      )}
                                      <span className="text-xs text-[#64748B]">{tkt.org}</span>
                                    </div>

                                    {/* Line 4: Assignee Avatar + Replies & Date */}
                                    <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-xs text-[#64748B]">
                                      <div className="flex items-center gap-1.5 min-w-0">
                                        {tkt.assigneeAvatar ? (
                                          <img
                                            src={tkt.assigneeAvatar}
                                            alt={tkt.assigneeName}
                                            className="w-5 h-5 rounded-full object-cover shrink-0 border border-slate-100"
                                          />
                                        ) : (
                                          <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[9px] flex items-center justify-center font-bold shrink-0">
                                            ?
                                          </div>
                                        )}
                                        <span className="text-xs text-[#475569] font-medium truncate">
                                          {tkt.assigneeName}
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-2 text-[11px] font-mono shrink-0">
                                        <span className="flex items-center gap-1">
                                          <MessageSquare size={11} className="text-[#94A3B8]" /> {tkt.replies}
                                        </span>
                                        <span>{tkt.updated}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. LIST VIEW */}
                {ticketViewMode === "list" && (
                  <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-mono uppercase text-[#64748B]">
                        <tr>
                          <th className="py-2.5 px-3">ID</th>
                          <th className="py-2.5 px-3">TITLE</th>
                          <th className="py-2.5 px-3">ORGANIZATION</th>
                          <th className="py-2.5 px-3">STATUS</th>
                          <th className="py-2.5 px-3">PRIORITY</th>
                          <th className="py-2.5 px-3">ASSIGNEE</th>
                          <th className="py-2.5 px-3">REPLIES</th>
                          <th className="py-2.5 px-3 text-right">UPDATED</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F5F9] text-[11.5px]">
                        {filteredTickets.map((tkt) => (
                          <tr key={tkt.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 px-3 font-mono text-[10.5px] text-[#64748B] font-semibold">
                              {tkt.id}
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-[#0F172A]">
                              {tkt.title}{" "}
                              <span className="text-[9.5px] font-normal text-[#64748B] bg-slate-100 px-1 py-0.2 rounded ml-1">
                                {tkt.type}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-[#475569]">{tkt.org}</td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                                  tkt.status === "Open"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : tkt.status === "In Progress"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : tkt.status === "Closed"
                                    ? "bg-slate-100 text-slate-600 border-slate-200"
                                    : "bg-purple-50 text-purple-700 border-purple-200"
                                }`}
                              >
                                {tkt.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[10.5px] text-[#64748B]">
                              <Flag size={9} className="inline mr-1 text-[#94A3B8]" /> {tkt.priority}
                            </td>
                            <td className="py-2.5 px-3 text-[#475569]">
                              <div className="flex items-center gap-1.5">
                                {tkt.assigneeAvatar ? (
                                  <img
                                    src={tkt.assigneeAvatar}
                                    alt={tkt.assigneeName}
                                    className="w-4 h-4 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[8px] flex items-center justify-center font-bold">
                                    ?
                                  </div>
                                )}
                                <span>{tkt.assigneeName}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[#64748B]">💬 {tkt.replies}</td>
                            <td className="py-2.5 px-3 text-right font-mono text-[#94A3B8]">{tkt.updated}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 5. SLA VIEW */}
                {ticketViewMode === "sla" && (
                  <div className="flex flex-col gap-4 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs">
                        <span className="text-[10px] font-mono text-[#94A3B8] uppercase">First Response SLA</span>
                        <div className="text-xl font-bold text-[#0F172A] mt-1">98.8%</div>
                        <span className="text-[10.5px] text-emerald-600 font-medium">Target: &lt; 2h</span>
                      </div>
                      <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs">
                        <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Resolution SLA</span>
                        <div className="text-xl font-bold text-[#0F172A] mt-1">97.4%</div>
                        <span className="text-[10.5px] text-emerald-600 font-medium">Target: &lt; 24h</span>
                      </div>
                      <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs">
                        <span className="text-[10px] font-mono text-[#94A3B8] uppercase">On-Track Active</span>
                        <div className="text-xl font-bold text-emerald-600 mt-1">2 / 2</div>
                        <span className="text-[10.5px] text-[#64748B]">0 at risk</span>
                      </div>
                      <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs">
                        <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Breached SLAs</span>
                        <div className="text-xl font-bold text-[#0F172A] mt-1">0</div>
                        <span className="text-[10.5px] text-emerald-600 font-medium">100% compliant this cycle</span>
                      </div>
                    </div>

                    <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs">
                      <h4 className="font-bold text-xs text-[#0F172A] mb-2">SLA Priority Tiers &amp; Deadlines</h4>
                      <table className="w-full text-xs text-left">
                        <thead className="bg-[#F8FAFC] border-b border-slate-100 text-[10px] font-mono text-[#64748B]">
                          <tr>
                            <th className="py-2 px-3">TIER</th>
                            <th className="py-2 px-3">FIRST RESPONSE TARGET</th>
                            <th className="py-2 px-3">RESOLUTION TARGET</th>
                            <th className="py-2 px-3">CURRENT HEALTH</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-red-600">Critical / Urgent</td>
                            <td className="py-2.5 px-3 font-mono text-[#475569]">30 minutes</td>
                            <td className="py-2.5 px-3 font-mono text-[#475569]">4 hours</td>
                            <td className="py-2.5 px-3 text-emerald-600 font-medium">✓ 100% On Time</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-orange-600">High</td>
                            <td className="py-2.5 px-3 font-mono text-[#475569]">1 hour</td>
                            <td className="py-2.5 px-3 font-mono text-[#475569]">8 hours</td>
                            <td className="py-2.5 px-3 text-emerald-600 font-medium">✓ 100% On Time</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-blue-600">Medium</td>
                            <td className="py-2.5 px-3 font-mono text-[#475569]">2 hours</td>
                            <td className="py-2.5 px-3 font-mono text-[#475569]">24 hours</td>
                            <td className="py-2.5 px-3 text-emerald-600 font-medium">✓ 100% On Time</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* VIEW 5: MESSAGING (100% IDENTICAL TO SCREENSHOTS da572d30, ef911eb6, d7f32c66) */}
          {currentView === "messages" && (() => {
            const channels: ChatChannelItem[] = [
              {
                id: "aetheris-design",
                type: "project" as const,
                title: "Aetheris Design System v3 Core Li...",
                fullTitle: "Aetheris Design System v3 Core Library",
                subtitle: "Project · 5 members",
                snippet: "Next.js marketing portal and client portal co...",
                time: "5d",
                membersCount: 5,
                membersAvatars: [
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
                ],
                messages: [
                  {
                    id: "ad-1",
                    senderName: "Liam Gallagher",
                    senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
                    timestamp: "05:38 AM (edited)",
                    isPinned: true,
                    text: "Aetheris Design Tokens 2.0 release is locked. All Figma variables, JSON token transforms, and CSS custom properties are verified.",
                    reactions: [
                      { emoji: "🔥", count: 1 },
                      { emoji: "🚀", count: 1 },
                    ],
                    dateDivider: "September 29, 2026",
                  },
                  {
                    id: "ad-2",
                    senderName: "Amara Okafor",
                    senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
                    timestamp: "09:38 AM (edited)",
                    text: "Next.js marketing portal and client portal components updated with electric indigo (#6366F1) and cyan glow (#06B6D4) gradients.",
                    reactions: [{ emoji: "❤️", count: 1 }],
                  },
                ],
              },
              {
                id: "arcturus-brand",
                type: "project" as const,
                title: "Arcturus Brand Identity & Web Laun...",
                fullTitle: "Arcturus Brand Identity & Web Launch",
                subtitle: "Project · 4 members",
                snippet: "Internal note: Evelyn confirmed 80 rovers de...",
                time: "5d",
                membersCount: 4,
                membersAvatars: [
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                ],
                messages: [
                  {
                    id: "ab-1",
                    senderName: "Evelyn Thorne",
                    senderAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
                    timestamp: "08:15 AM (edited)",
                    isPinned: true,
                    isInternalNote: true,
                    text: "Internal note: Evelyn confirmed 80 rovers deployed on site for trial runs. Initial brand guidelines submitted to executive committee.",
                    dateDivider: "September 29, 2026",
                  },
                ],
              },
              {
                id: "arcturus-org",
                type: "org" as const,
                title: "Arcturus Robotics",
                fullTitle: "Arcturus Robotics",
                subtitle: "Organization · 3 members",
                snippet: "Internal note: Travel expenses logged ($2,35...",
                time: "5d",
                membersCount: 3,
                membersAvatars: [
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
                ],
                messages: [
                  {
                    id: "ao-1",
                    senderName: "Evelyn Thorne",
                    senderAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
                    timestamp: "05:38 AM (edited)",
                    isPinned: true,
                    text: "We're setting up the hardware testbed rovers in Boston next Monday. Can Julian and Marcus join onsite for the live telemetry trials?",
                    reactions: [{ emoji: "🚀", count: 1 }],
                    dateDivider: "September 29, 2026",
                  },
                  {
                    id: "ao-2",
                    senderName: "Julian Vance",
                    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                    timestamp: "06:08 AM (edited)",
                    replyTo: {
                      senderName: "Evelyn Thorne",
                      textSnippet: "We're setting up the hardware testbed rovers in Boston next Monday. Can Julian a...",
                    },
                    text: "Flights booked! We will be onsite Monday morning with the full design and technical team.",
                  },
                  {
                    id: "ao-3",
                    senderName: "Julian Vance",
                    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                    timestamp: "10:08 AM (edited)",
                    isInternalNote: true,
                    text: "Internal note: Travel expenses logged ($2,350) under Arcturus project. Client will reimburse per contract section 4.2.",
                    reactions: [{ emoji: "👍", count: 1 }],
                    readBy: [
                      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
                      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
                    ],
                  },
                ],
              },
              {
                id: "kroma-fintech",
                type: "org" as const,
                title: "Kroma Fintech",
                fullTitle: "Kroma Fintech",
                subtitle: "Organization · 4 members",
                snippet: "Congratulations Tariq and Nadia! We are ...",
                hasUnreadDot: true,
                time: "5d",
                membersCount: 4,
                membersAvatars: [
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
                ],
                messages: [
                  {
                    id: "kf-1",
                    senderName: "Tariq Vance",
                    senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
                    timestamp: "09:12 AM",
                    text: "Kroma wire of $14,000 for SDK release has cleared. Production cutover ready for review.",
                    dateDivider: "September 29, 2026",
                  },
                  {
                    id: "kf-2",
                    senderName: "Julian Vance",
                    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                    timestamp: "10:30 AM",
                    text: "Congratulations Tariq and Nadia! We are locked for final phase deployment this Thursday.",
                    reactions: [{ emoji: "🎉", count: 1 }],
                  },
                ],
              },
              {
                id: "nebula-health",
                type: "org" as const,
                title: "Nebula Health",
                fullTitle: "Nebula Health",
                subtitle: "Organization · 3 members",
                snippet: "The contrast fixes and booking flow look ...",
                hasUnreadDot: true,
                time: "5d",
                membersCount: 3,
                membersAvatars: [
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
                ],
                messages: [
                  {
                    id: "nh-1",
                    senderName: "Dr. Aris",
                    senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
                    timestamp: "08:45 AM",
                    text: "The contrast fixes and booking flow look fantastic in the staging environment! Patients love the speed.",
                    dateDivider: "September 29, 2026",
                  },
                  {
                    id: "nh-2",
                    senderName: "Julian Vance",
                    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                    timestamp: "09:15 AM",
                    text: "Thank you Dr. Aris! Production cutover is scheduled for Thursday evening.",
                    reactions: [{ emoji: "❤️", count: 1 }],
                  },
                ],
              },
              {
                id: "marcus-dm",
                type: "dm" as const,
                title: "Marcus Brody",
                fullTitle: "Marcus Brody",
                subtitle: "Direct Message",
                snippet: "Thanks Julian! Amara and Liam crushed the ...",
                time: "5d",
                avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
                messages: [
                  {
                    id: "mb-1",
                    senderName: "Marcus Brody",
                    senderAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
                    timestamp: "07:20 AM",
                    text: "Thanks Julian! Amara and Liam crushed the design token sprint ahead of schedule.",
                    reactions: [{ emoji: "🚀", count: 1 }],
                    dateDivider: "September 29, 2026",
                  },
                  {
                    id: "mb-2",
                    senderName: "Julian Vance",
                    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                    timestamp: "08:10 AM",
                    text: "Awesome work Marcus! Let's make sure the client gets the demo build by 3 PM.",
                    reactions: [{ emoji: "👍", count: 1 }],
                  },
                ],
              },
              {
                id: "elena-dm",
                type: "dm" as const,
                title: "Elena Rostova",
                fullTitle: "Elena Rostova",
                subtitle: "Direct Message",
                snippet: "Absolutely Julian. Dominic and I finished rec...",
                time: "5d",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
                messages: [
                  {
                    id: "er-1",
                    senderName: "Julian Vance",
                    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                    timestamp: "05:38 AM (edited)",
                    isPinned: true,
                    text: "Elena, October is shaping up to be our strongest month this year — over $148k total invoiced and $109k collected!",
                    reactions: [
                      { emoji: "🔥", count: 1 },
                      { emoji: "🎉", count: 1 },
                    ],
                    dateDivider: "September 29, 2026",
                  },
                  {
                    id: "er-2",
                    senderName: "Elena Rostova",
                    senderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
                    timestamp: "09:38 AM (edited)",
                    text: "Yes! Arcturus Robotics wire cleared ($15,200) and Kroma paid the $14,000 SDK release invoice. Dominic reconciled everything.",
                    reactions: [{ emoji: "❤️", count: 1 }],
                  },
                  {
                    id: "er-3",
                    senderName: "Julian Vance",
                    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                    timestamp: "01:38 PM (edited)",
                    isInternalNote: true,
                    text: "Internal note: Let's discuss hiring another senior frontend engineer next Monday.",
                    reactions: [{ emoji: "👍", count: 1 }],
                  },
                  {
                    id: "er-4",
                    senderName: "Julian Vance",
                    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                    timestamp: "12:00 PM (edited)",
                    text: "Elena, Q3 revenue figures look incredible ($100k+ mark crossed). Let's review the Arcturus proposal terms tomorrow.",
                    readBy: [
                      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
                    ],
                    dateDivider: "Sunday",
                  },
                  {
                    id: "er-5",
                    senderName: "Elena Rostova",
                    senderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
                    timestamp: "12:00 PM (edited)",
                    text: "Absolutely Julian. Dominic and I finished reconciling all August invoice payments. Ready for review.",
                    dateDivider: "Monday",
                  },
                ],
              },
            ];

            const currentChannel = channels.find((c) => c.id === activeChatId) || channels[2];
            const combinedMessages: ChatMessageItem[] = [
              ...currentChannel.messages,
              ...(newChatMessages[activeChatId] || []),
            ];

            const handleSend = () => {
              if (!chatInputText.trim()) return;
              const newMsg: ChatMessageItem = {
                id: `new-${Date.now()}`,
                senderName: "Julian Vance",
                senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
                timestamp: "Just now",
                isInternalNote: isInternalNoteMode,
                text: isInternalNoteMode ? `Internal note: ${chatInputText}` : chatInputText,
                reactions: [],
              };
              setNewChatMessages((prev) => ({
                ...prev,
                [activeChatId]: [...(prev[activeChatId] || []), newMsg],
              }));
              setChatInputText("");
            };

            return (
              <div className="flex-1 flex h-[680px] overflow-hidden bg-white animate-fadeIn border-t border-[#E2E8F0]">
                {/* Left Channels & DMs Sidebar */}
                <div className="w-[260px] sm:w-[280px] border-r border-[#E2E8F0] flex flex-col shrink-0 bg-white select-none">
                  {/* Sidebar Header */}
                  <div className="p-3.5 border-b border-[#F1F5F9] flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#0F172A]">Messages</h3>
                    <button className="text-[#64748B] hover:text-[#0F172A] p-1 rounded hover:bg-slate-50 transition-colors">
                      <Edit3 size={15} />
                    </button>
                  </div>

                  {/* Search input */}
                  <div className="p-2.5 border-b border-[#F1F5F9]">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#64748B] focus-within:border-indigo-400 focus-within:bg-white transition-colors">
                      <Search size={12} className="text-[#94A3B8] shrink-0" />
                      <input
                        type="text"
                        placeholder="Search or start a new DM..."
                        value={chatSearch}
                        onChange={(e) => setChatSearch(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-xs text-[#0F172A] placeholder:text-[#94A3B8]"
                      />
                    </div>
                  </div>

                  {/* Scrollable Channels List */}
                  <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-3 p-2">
                    {/* 1. PROJECTS GROUP */}
                    <div>
                      <span className="text-[9.5px] font-mono text-[#94A3B8] uppercase font-bold tracking-wider px-2 py-1 block">
                        PROJECTS
                      </span>
                      <div className="flex flex-col gap-0.5 mt-0.5">
                        {channels
                          .filter((c) => c.type === "project")
                          .map((ch) => {
                            const isActive = activeChatId === ch.id;
                            return (
                              <button
                                key={ch.id}
                                onClick={() => setActiveChatId(ch.id)}
                                className={`w-full p-2 rounded-xl text-left transition-all flex items-start gap-2.5 ${
                                  isActive
                                    ? "bg-[#F1F5F9] text-[#0F172A]"
                                    : "hover:bg-slate-50 text-[#475569]"
                                }`}
                              >
                                <div className="w-6 h-6 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                                  <Folder size={13} className="text-[#6366F1]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className={`text-xs truncate ${isActive ? "font-bold text-[#0F172A]" : "font-medium text-[#1E293B]"}`}>
                                      {ch.title}
                                    </span>
                                    <span className="text-[10px] font-mono text-[#94A3B8] shrink-0">{ch.time}</span>
                                  </div>
                                  <p className="text-[11px] text-[#64748B] truncate mt-0.5">{ch.snippet}</p>
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* 2. ORGANIZATIONS GROUP */}
                    <div>
                      <div className="flex items-center justify-between px-2 py-1">
                        <span className="text-[9.5px] font-mono text-[#94A3B8] uppercase font-bold tracking-wider">
                          ORGANIZATIONS
                        </span>
                        <span className="text-[10px] font-bold text-white bg-[#3B82F6] px-1.5 py-0.2 rounded-full">
                          2
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5 mt-0.5">
                        {channels
                          .filter((c) => c.type === "org")
                          .map((ch) => {
                            const isActive = activeChatId === ch.id;
                            return (
                              <button
                                key={ch.id}
                                onClick={() => setActiveChatId(ch.id)}
                                className={`w-full p-2 rounded-xl text-left transition-all flex items-start gap-2.5 ${
                                  isActive
                                    ? "bg-[#F1F5F9] text-[#0F172A]"
                                    : "hover:bg-slate-50 text-[#475569]"
                                }`}
                              >
                                <div className="w-6 h-6 rounded-md bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                                  <Users size={13} className="text-[#8B5CF6]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className={`text-xs truncate ${isActive ? "font-bold text-[#0F172A]" : "font-medium text-[#1E293B]"}`}>
                                      {ch.title}
                                    </span>
                                    <span className="text-[10px] font-mono text-[#94A3B8] shrink-0">{ch.time}</span>
                                  </div>
                                  <div className="flex items-center justify-between gap-1 mt-0.5">
                                    <p className="text-[11px] text-[#64748B] truncate">{ch.snippet}</p>
                                    {ch.hasUnreadDot && (
                                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                                    )}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* 3. DIRECT MESSAGES GROUP */}
                    <div>
                      <span className="text-[9.5px] font-mono text-[#94A3B8] uppercase font-bold tracking-wider px-2 py-1 block">
                        DIRECT MESSAGES
                      </span>
                      <div className="flex flex-col gap-0.5 mt-0.5">
                        {channels
                          .filter((c) => c.type === "dm")
                          .map((ch) => {
                            const isActive = activeChatId === ch.id;
                            return (
                              <button
                                key={ch.id}
                                onClick={() => setActiveChatId(ch.id)}
                                className={`w-full p-2 rounded-xl text-left transition-all flex items-start gap-2.5 ${
                                  isActive
                                    ? "bg-[#F1F5F9] text-[#0F172A]"
                                    : "hover:bg-slate-50 text-[#475569]"
                                }`}
                              >
                                <img
                                  src={ch.avatar}
                                  alt={ch.title}
                                  className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5 border border-slate-100"
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className={`text-xs truncate ${isActive ? "font-bold text-[#0F172A]" : "font-medium text-[#1E293B]"}`}>
                                      {ch.title}
                                    </span>
                                    <span className="text-[10px] font-mono text-[#94A3B8] shrink-0">{ch.time}</span>
                                  </div>
                                  <p className="text-[11px] text-[#64748B] truncate mt-0.5">{ch.snippet}</p>
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Conversation Thread Pane */}
                <div className="flex-1 flex flex-col justify-between bg-white h-full overflow-hidden">
                  {/* Chat Top Header */}
                  <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between bg-white shrink-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {currentChannel.avatar ? (
                        <img
                          src={currentChannel.avatar}
                          alt={currentChannel.fullTitle}
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-100"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                          {currentChannel.type === "project" ? (
                            <Folder size={14} className="text-[#6366F1]" />
                          ) : (
                            <Users size={14} className="text-[#8B5CF6]" />
                          )}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-[#0F172A] truncate">
                          {currentChannel.fullTitle}
                        </h4>
                        <span className="text-[11px] text-[#64748B] block truncate">
                          {currentChannel.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded hover:bg-slate-50 transition-colors">
                        <Plus size={15} />
                      </button>

                      {currentChannel.membersAvatars && (
                        <div className="flex items-center gap-1">
                          <div className="flex -space-x-1.5">
                            {currentChannel.membersAvatars.map((av, idx) => (
                              <img
                                key={idx}
                                src={av}
                                alt="member"
                                className="w-5 h-5 rounded-full border-2 border-white object-cover"
                              />
                            ))}
                          </div>
                          {currentChannel.membersCount && currentChannel.membersCount > 3 && (
                            <span className="text-[10px] font-semibold text-[#64748B] bg-slate-100 px-1 py-0.2 rounded-full">
                              +{currentChannel.membersCount - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <button className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded hover:bg-slate-50 transition-colors">
                        <Info size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Messages Feed Area */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 no-scrollbar">
                    {combinedMessages.map((msg) => (
                      <React.Fragment key={msg.id}>
                        {/* Date Divider */}
                        {msg.dateDivider && (
                          <div className="flex items-center gap-3 my-1">
                            <div className="flex-1 h-px bg-slate-100" />
                            <span className="px-3 py-1 bg-white border border-[#E2E8F0] rounded-full text-[10.5px] font-medium text-[#64748B] shadow-2xs">
                              {msg.dateDivider}
                            </span>
                            <div className="flex-1 h-px bg-slate-100" />
                          </div>
                        )}

                        {/* Message Row */}
                        <div className="flex items-start gap-3 group">
                          <img
                            src={msg.senderAvatar}
                            alt={msg.senderName}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0 border border-slate-100 mt-0.5"
                          />

                          <div className="flex-1 min-w-0">
                            {/* Sender Info Line */}
                            <div className="flex items-center gap-2 flex-wrap text-xs">
                              <span className="font-bold text-[#0F172A]">{msg.senderName}</span>
                              <span className="text-[10px] text-[#94A3B8] font-normal">{msg.timestamp}</span>

                              {msg.isPinned && (
                                <span className="flex items-center gap-1 text-[10px] text-[#6366F1] font-semibold bg-[#EEF2FF] px-1.5 py-0.2 rounded">
                                  <Pin size={9} /> Pinned
                                </span>
                              )}

                              {msg.isInternalNote && (
                                <span className="flex items-center gap-1 text-[10px] text-[#B45309] font-medium bg-[#FFFBEB] border border-[#FDE68A] px-1.5 py-0.2 rounded">
                                  <Lock size={9} /> Internal note
                                </span>
                              )}
                            </div>

                            {/* Quoted reply if present */}
                            {msg.replyTo && (
                              <div className="mt-1.5 p-2 rounded-lg bg-slate-50 border-l-2 border-slate-300 text-[11.5px] flex flex-col gap-0.5 max-w-xl">
                                <span className="font-semibold text-[#475569] flex items-center gap-1">
                                  <CornerDownRight size={11} className="text-[#94A3B8]" />
                                  {msg.replyTo.senderName}
                                </span>
                                <span className="text-[#64748B] truncate">{msg.replyTo.textSnippet}</span>
                              </div>
                            )}

                            {/* Body Text */}
                            <div className="mt-1">
                              {msg.isInternalNote ? (
                                <div className="p-2.5 rounded-r-xl bg-[#FFFBEB]/50 border-l-2 border-[#F59E0B] text-xs text-[#92400E] leading-relaxed max-w-2xl font-medium">
                                  {msg.text}
                                </div>
                              ) : (
                                <div className="text-xs text-[#0F172A] leading-relaxed max-w-2xl">
                                  {msg.text}
                                </div>
                              )}
                            </div>

                            {/* Reactions */}
                            {msg.reactions && msg.reactions.length > 0 && (
                              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                                {msg.reactions.map((react, rIdx) => (
                                  <button
                                    key={rIdx}
                                    onClick={() => {
                                      react.count += 1;
                                    }}
                                    className="px-2 py-0.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs flex items-center gap-1 text-[#0F172A] transition-colors"
                                  >
                                    <span>{react.emoji}</span>
                                    {react.count > 1 && (
                                      <span className="text-[10.5px] font-medium text-[#64748B]">{react.count}</span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Read Receipts */}
                            {msg.readBy && msg.readBy.length > 0 && (
                              <div className="mt-1.5 flex justify-end">
                                <div className="flex -space-x-1">
                                  {msg.readBy.map((avUrl, aIdx) => (
                                    <img
                                      key={aIdx}
                                      src={avUrl}
                                      alt="read"
                                      className="w-4 h-4 rounded-full border border-white object-cover shadow-2xs"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Bottom Interactive Message Composer */}
                  <div className="p-3 sm:p-4 bg-white border-t border-[#F1F5F9] shrink-0">
                    <div
                      className={`border rounded-2xl p-2.5 bg-white shadow-2xs transition-all ${
                        isInternalNoteMode
                          ? "border-[#F59E0B] bg-[#FFFBEB]/20"
                          : "border-[#6366F1] focus-within:ring-2 ring-indigo-100"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder={
                          isInternalNoteMode
                            ? "Add an internal note (only team members can view)..."
                            : "Type a message... (@ to mention, / to search)"
                        }
                        value={chatInputText}
                        onChange={(e) => setChatInputText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        className="w-full bg-transparent border-none outline-none text-xs text-[#0F172A] placeholder:text-[#94A3B8] px-1 py-1"
                      />

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-[#94A3B8]">
                          <button className="hover:text-[#0F172A] p-1 transition-colors">
                            <Paperclip size={13} />
                          </button>
                          <button className="hover:text-[#0F172A] p-1 transition-colors">
                            <Folder size={13} />
                          </button>
                          <button className="hover:text-[#0F172A] p-1 transition-colors">
                            <Sparkles size={13} />
                          </button>
                          <button
                            onClick={() => setIsInternalNoteMode(!isInternalNoteMode)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-medium transition-colors ${
                              isInternalNoteMode
                                ? "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"
                                : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100"
                            }`}
                          >
                            <Lock size={10} />
                            <span>Internal note</span>
                          </button>
                        </div>

                        <button
                          onClick={handleSend}
                          disabled={!chatInputText.trim()}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                            chatInputText.trim()
                              ? "bg-[#4F46E5] text-white shadow-2xs hover:bg-[#4338CA]"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          <Send size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

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
                    { label: "Organizations", view: "organizations" as const, icon: Building2 },
                    { label: "Services", view: "offerings-services" as const, icon: Box },
                    { label: "Digital Assets", view: "offerings-products" as const, icon: Package },
                    { label: "Proposals", view: "proposals" as const, icon: FileText },
                    { label: "Invoices", icon: Receipt },
                    { label: "Team", view: "team" as const, icon: Users },
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
