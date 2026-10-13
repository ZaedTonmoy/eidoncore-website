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
  Briefcase,
  Zap,
  AlertTriangle,
  Heart,
  Hash,
  Bell,
  Mail,
  Settings,
  Moon,
  ChevronUp,
  CheckCheck,
  CornerUpLeft,
  Box,
  ShoppingBag,
  Smartphone,
  Laptop,
  CreditCard,
  Receipt,
  FileText,
  X,
  Sliders,
  GitBranch,
  TrendingUp,
  Building,
  LifeBuoy,
  Copy,
  ExternalLink,
  BarChart3,
  HelpCircle,
  PenTool,
  Printer,
  Edit3,
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

  // State for Messaging Feature 03 (AI Polish Tone)
  const [activeAiTone, setActiveAiTone] = useState<string>("Professional");

  // State for Notifications Feature 01 (Tabs and Accordion)
  const [notificationTab, setNotificationTab] = useState<"all" | "unread" | "for_you">("all");
  const [isAccordionExpanded, setIsAccordionExpanded] = useState<boolean>(true);

  // State for Notifications Feature 02 (Settings toggles & scrolling animation)
  const [digestFreq, setDigestFreq] = useState<"instant" | "daily" | "weekly">("instant");
  const [activeSettingsView, setActiveSettingsView] = useState<"delivery" | "categories">("delivery");
  const [deliveryMethods, setDeliveryMethods] = useState({
    email: true,
    inApp: true,
    push: false,
  });
  const [notifToggles, setNotifToggles] = useState<Record<string, { email: boolean; inApp: boolean }>>({
    taskAssigned: { email: true, inApp: true },
    taskStatus: { email: false, inApp: true },
    commentMention: { email: true, inApp: true },
    budgetAlert: { email: true, inApp: true },
    approvals: { email: true, inApp: true },
  });

  // Automated scrolling animation between Delivery Methods and Notification Categories
  useEffect(() => {
    const scrollTimer = setInterval(() => {
      setActiveSettingsView((prev) => (prev === "delivery" ? "categories" : "delivery"));
    }, 4500);
    return () => clearInterval(scrollTimer);
  }, []);

  const toggleSetting = (key: string, type: "email" | "inApp") => {
    setNotifToggles((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: !prev[key][type],
      },
    }));
  };

  // State for Notifications Feature 03 (SMTP Configuration)
  const [smtpEnabled, setSmtpEnabled] = useState<boolean>(true);
  const [smtpEncryption, setSmtpEncryption] = useState<"TLS" | "SSL">("SSL");
  const [showApiKey, setShowApiKey] = useState<boolean>(false);

  // State for Offerings / Services Feature 01 & 03
  const [offeringsTab, setOfferingsTab] = useState<"services" | "digital">("services");
  const [serviceTagFilter, setServiceTagFilter] = useState<string>("all");
  const [digitalTagFilter, setDigitalTagFilter] = useState<string>("all");

  // State for Invoicing Features
  const [invoiceDashboardTab, setInvoiceDashboardTab] = useState<"all" | "recurring" | "analytics">("all");
  const [invoiceCurrency, setInvoiceCurrency] = useState<"bdt" | "usd">("usd");
  const [invoicePaymentMethod, setInvoicePaymentMethod] = useState<"card" | "cashapp">("card");
  const [savePaymentInfo, setSavePaymentInfo] = useState<boolean>(true);
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState<string>("all");
  const [recurringRetainerActive, setRecurringRetainerActive] = useState<boolean>(true);

  // State for Milestone & Time Billing Feature 02
  const [timeInvoiceStep, setTimeInvoiceStep] = useState<"timesheet" | "modal" | "invoice">("modal");
  const [timeDateRange, setTimeDateRange] = useState<"last" | "this" | "custom">("this");

  // Auto toggle between All Invoices and Recurring view every 5s if user hasn't manually interacted
  useEffect(() => {
    if (!moduleName.toLowerCase().includes("invoic")) return;
    const interval = setInterval(() => {
      setInvoiceDashboardTab((prev) => (prev === "all" ? "recurring" : "all"));
    }, 5500);
    return () => clearInterval(interval);
  }, [moduleName]);

  // Auto transition for Feature 02: Timesheet -> Modal -> Generated Invoice
  useEffect(() => {
    if (!moduleName.toLowerCase().includes("invoic")) return;
    const stepInterval = setInterval(() => {
      setTimeInvoiceStep((prev) => {
        if (prev === "timesheet") return "modal";
        if (prev === "modal") return "invoice";
        return "timesheet";
      });
    }, 6000);
    return () => clearInterval(stepInterval);
  }, [moduleName]);

  // State for Automations Features
  const [automationActiveStep, setAutomationActiveStep] = useState<number>(1);
  const [automationLive, setAutomationLive] = useState<boolean>(true);
  const [actionCategoryTab, setActionCategoryTab] = useState<string>("all");
  const [actionSearchQuery, setActionSearchQuery] = useState<string>("");
  const [integrationFilter, setIntegrationFilter] = useState<string>("all");

  // State for Reports & Intelligence Features
  const [reportsFinancialTab, setReportsFinancialTab] = useState<"revenue" | "cashflow">("revenue");
  const [reportsCursorTarget, setReportsCursorTarget] = useState<"revenue" | "cashflow" | null>(null);
  const [isReportsClicking, setIsReportsClicking] = useState(false);
  const [orgFilterTab, setOrgFilterTab] = useState<"all" | "active" | "leads" | "atrisk">("all");
  const [crewHeatmapFilter, setCrewHeatmapFilter] = useState<"14d" | "30d">("14d");

  // Automated gentle switching between Revenue and Cash Flow for Feature 01 with realistic cursor click
  useEffect(() => {
    if (!moduleName.toLowerCase().includes("report")) return;
    const viewInterval = setInterval(() => {
      const nextTab = reportsFinancialTab === "revenue" ? "cashflow" : "revenue";
      // 1. Move cursor to target tab
      setReportsCursorTarget(nextTab);
      // 2. Click effect
      setTimeout(() => {
        setIsReportsClicking(true);
        setTimeout(() => {
          setIsReportsClicking(false);
          setReportsFinancialTab(nextTab);
          // 3. Retract / hide cursor
          setTimeout(() => {
            setReportsCursorTarget(null);
          }, 600);
        }, 250);
      }, 500);
    }, 4500);
    return () => clearInterval(viewInterval);
  }, [reportsFinancialTab, moduleName]);

  // State for AI Workspace Features (Feature 02: Full Workspace Actions)
  const [aiWorkspaceMode, setAiWorkspaceMode] = useState<"actions" | "slash_tools" | "query_unbilled" | "query_health">("slash_tools");
  const [aiSlashSearch, setAiSlashSearch] = useState<string>("");
  const [aiExpandedSource, setAiExpandedSource] = useState<boolean>(false);

  // State for AI Workspace Features (Feature 01: MCP Native Server)
  const [mcpActiveTab, setMcpActiveTab] = useState<"overview" | "connection" | "tools" | "governance">("overview");
  const [mcpCopied, setMcpCopied] = useState<boolean>(false);
  const [mcpToolSearch, setMcpToolSearch] = useState<string>("");
  const [mcpConnectorEnabled, setMcpConnectorEnabled] = useState<boolean>(true);
  const [mcpRoleOwner, setMcpRoleOwner] = useState<boolean>(true);
  const [mcpRoleAdmin, setMcpRoleAdmin] = useState<boolean>(false);
  const [mcpRolePM, setMcpRolePM] = useState<boolean>(false);
  const [mcpRoleAccountant, setMcpRoleAccountant] = useState<boolean>(false);
  const [mcpRoleTeam, setMcpRoleTeam] = useState<boolean>(false);
  const [mcpExposedModules, setMcpExposedModules] = useState<Record<string, boolean>>({
    tasks: true,
    projects: true,
    invoices: true,
    proposals: true,
    clients: true,
    tickets: true,
    reports: true,
    messaging: true,
  });

  // State for Proposals Features
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({
    fintech: true,
    webrtc: false,
    qa_retainer: true,
    robotics: false,
    advisory: true,
    starter_kit: false,
    uikit: true,
  });
  const [proposalSignMode, setProposalSignMode] = useState<"draw" | "type">("draw");
  const [legalNameInput, setLegalNameInput] = useState<string>("Alex Morgan");
  const [signatureAgreed, setSignatureAgreed] = useState<boolean>(true);
  const [signatureCleared, setSignatureCleared] = useState<boolean>(false);
  const [proposalAccepted, setProposalAccepted] = useState<boolean>(false);
  const [depositEnabled, setDepositEnabled] = useState<boolean>(true);
  const [depositPercentage, setDepositPercentage] = useState<number>(50);
  const [acceptanceAction, setAcceptanceAction] = useState<string>("Auto-create Project");

  // =========================================================================
  // CUSTOM EIDONCORE MODULE: INVOICING
  // =========================================================================
  if (moduleName.toLowerCase().includes("invoic")) {
    // -------------------------------------------------------------------------
    // FEATURE 01: Recurring / One-time Invoices Dashboard & KPIs (Screenshots 2 & 3)
    // -------------------------------------------------------------------------
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5 sm:gap-4 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Top Workspace Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#3F72AF] border border-blue-100">
                  <Receipt size={17} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">Invoices</h3>
                  <p className="text-[11px] text-slate-400">aetheris-studio.eidoncore.com</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/70 border border-slate-200/70 text-[11px] font-medium text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Onboarding 11/17</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/70 border border-blue-200/60 text-[#3F72AF] text-[11px] font-medium shadow-2xs">
                  <Sparkles size={12} className="text-[#3F72AF]" />
                  <span>AI Copilot</span>
                  <span className="font-mono text-[9px] bg-white/80 px-1 rounded text-[#3F72AF] border border-blue-200/50">⌘J</span>
                </div>
                {/* User avatar */}
                <div className="w-7 h-7 rounded-full bg-linear-to-tr from-[#3F72AF] to-indigo-600 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white shadow-2xs">
                  JV
                </div>
              </div>
            </div>

            {/* KPI Metric Cards Row - Compacted/Cropped top numbers to focus on lists */}
            <div className="grid grid-cols-3 gap-2">
              {/* Card 1: This Month */}
              <div className="px-2.5 py-1.5 rounded-lg bg-slate-50/70 border border-slate-200/70 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium text-slate-400">This Month</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">$40.9K</span>
                    <span className="text-[10px] text-emerald-600 font-semibold hidden sm:inline">↑ 90%</span>
                  </div>
                </div>
                <span className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">$</span>
              </div>

              {/* Card 2: Outstanding */}
              <div className="px-2.5 py-1.5 rounded-lg bg-slate-50/70 border border-slate-200/70 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium text-slate-400">Outstanding</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">$28.3K</span>
                    <span className="text-[10px] text-amber-500 font-medium hidden sm:inline">Pending</span>
                  </div>
                </div>
                <Clock size={13} className="text-amber-500 shrink-0" />
              </div>

              {/* Card 3: Overdue */}
              <div className="px-2.5 py-1.5 rounded-lg bg-rose-50/30 border border-rose-200/60 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium text-rose-700">Overdue</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm sm:text-base font-bold text-rose-600 tracking-tight">$4.8K</span>
                    <span className="text-[10px] text-rose-500 font-medium hidden sm:inline">Follow-up</span>
                  </div>
                </div>
                <AlertTriangle size={13} className="text-rose-500 shrink-0" />
              </div>
            </div>

            {/* Filter & View Switcher Bar (All Invoices vs Recurring vs Analytics + +Create Invoice button) */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 flex-wrap">
              <div className="flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/80 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setInvoiceDashboardTab("all")}
                  className={`px-3 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    invoiceDashboardTab === "all"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  All Invoices
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceDashboardTab("recurring")}
                  className={`px-3 py-1 rounded-md text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
                    invoiceDashboardTab === "recurring"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span>Recurring</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3F72AF]" />
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceDashboardTab("analytics")}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer hidden sm:inline-block ${
                    invoiceDashboardTab === "analytics"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Analytics
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="h-7 px-3 rounded-lg bg-[#3F72AF] hover:bg-[#325a8d] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <Plus size={12} strokeWidth={2.5} />
                  <span>Create Invoice</span>
                  <span className="font-mono text-[9px] bg-white/20 px-1 rounded">N</span>
                </button>
              </div>
            </div>

            {/* View Body: Animated Toggle between Recurring Tab View and All Invoices Table View with Equalized Height */}
            <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-2xs min-h-[295px] flex flex-col justify-between">
              {invoiceDashboardTab === "recurring" ? (
                /* RECURRING INVOICES VIEW - Enhanced with Multiple Subscriptions */
                <div className="divide-y divide-slate-100 text-xs flex-1 flex flex-col justify-between">
                  <div>
                    <div className="bg-slate-50/70 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 grid grid-cols-12 gap-2">
                      <span className="col-span-4 sm:col-span-4">Invoice / Retainer</span>
                      <span className="col-span-3 sm:col-span-2">Client</span>
                      <span className="col-span-2 sm:col-span-2">Status</span>
                      <span className="hidden sm:inline-block sm:col-span-2">Frequency</span>
                      <span className="col-span-3 sm:col-span-2 text-right sm:text-left">Next Due</span>
                    </div>

                    {/* Subscription 1: Nebula Health */}
                    <div className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                      <div className="col-span-4 sm:col-span-4 flex flex-col">
                        <span className="font-semibold text-slate-900 truncate">
                          Nebula Health - Monthly Design Retainer
                        </span>
                        <span className="text-[10px] text-slate-400 sm:hidden">Monthly · Oct 31, 2026</span>
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-slate-600 truncate font-medium">
                        Nebula Health
                      </div>
                      <div className="col-span-2 sm:col-span-2 flex items-center">
                        <button
                          type="button"
                          onClick={() => setRecurringRetainerActive(!recurringRetainerActive)}
                          className="flex items-center gap-1.5 cursor-pointer group"
                        >
                          <div
                            className={`w-7 h-4 rounded-full transition-colors relative flex items-center px-0.5 ${
                              recurringRetainerActive ? "bg-[#3F72AF]" : "bg-slate-300"
                            }`}
                          >
                            <div
                              className={`w-3 h-3 rounded-full bg-white transition-transform ${
                                recurringRetainerActive ? "translate-x-3" : "translate-x-0"
                              }`}
                            />
                          </div>
                          <span className="text-[10px] font-semibold text-slate-700 hidden sm:inline">
                            {recurringRetainerActive ? "Active" : "Paused"}
                          </span>
                        </button>
                      </div>
                      <div className="hidden sm:inline-block sm:col-span-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#3F72AF] text-[10px] font-bold border border-blue-200/60">
                          Monthly
                        </span>
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-right sm:text-left font-mono text-[11px] text-slate-600">
                        Oct 31, 2026
                      </div>
                    </div>

                    {/* Subscription 2: Kroma Fintech */}
                    <div className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                      <div className="col-span-4 sm:col-span-4 flex flex-col">
                        <span className="font-semibold text-slate-900 truncate">
                          Kroma Fintech - Core Engineering Support
                        </span>
                        <span className="text-[10px] text-slate-400 sm:hidden">Monthly · Nov 5, 2026</span>
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-slate-600 truncate font-medium">
                        Kroma Fintech
                      </div>
                      <div className="col-span-2 sm:col-span-2 flex items-center">
                        <div className="flex items-center gap-1.5">
                          <div className="w-7 h-4 rounded-full bg-[#3F72AF] relative flex items-center px-0.5">
                            <div className="w-3 h-3 rounded-full bg-white translate-x-3" />
                          </div>
                          <span className="text-[10px] font-semibold text-slate-700 hidden sm:inline">Active</span>
                        </div>
                      </div>
                      <div className="hidden sm:inline-block sm:col-span-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#3F72AF] text-[10px] font-bold border border-blue-200/60">
                          Monthly
                        </span>
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-right sm:text-left font-mono text-[11px] text-slate-600">
                        Nov 5, 2026
                      </div>
                    </div>

                    {/* Subscription 3: Arcturus Robotics */}
                    <div className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                      <div className="col-span-4 sm:col-span-4 flex flex-col">
                        <span className="font-semibold text-slate-900 truncate">
                          Arcturus - Cloud Maintenance & DevOps
                        </span>
                        <span className="text-[10px] text-slate-400 sm:hidden">Quarterly · Dec 15, 2026</span>
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-slate-600 truncate font-medium">
                        Arcturus Robotics
                      </div>
                      <div className="col-span-2 sm:col-span-2 flex items-center">
                        <div className="flex items-center gap-1.5">
                          <div className="w-7 h-4 rounded-full bg-[#3F72AF] relative flex items-center px-0.5">
                            <div className="w-3 h-3 rounded-full bg-white translate-x-3" />
                          </div>
                          <span className="text-[10px] font-semibold text-slate-700 hidden sm:inline">Active</span>
                        </div>
                      </div>
                      <div className="hidden sm:inline-block sm:col-span-2">
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200/60">
                          Quarterly
                        </span>
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-right sm:text-left font-mono text-[11px] text-slate-600">
                        Dec 15, 2026
                      </div>
                    </div>

                    {/* Subscription 4: Solari Logistics */}
                    <div className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                      <div className="col-span-4 sm:col-span-4 flex flex-col">
                        <span className="font-semibold text-slate-900 truncate">
                          Solari Logistics - SEO & Growth Retainer
                        </span>
                        <span className="text-[10px] text-slate-400 sm:hidden">Monthly · Nov 1, 2026</span>
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-slate-600 truncate font-medium">
                        Solari Logistics
                      </div>
                      <div className="col-span-2 sm:col-span-2 flex items-center">
                        <div className="flex items-center gap-1.5">
                          <div className="w-7 h-4 rounded-full bg-slate-300 relative flex items-center px-0.5">
                            <div className="w-3 h-3 rounded-full bg-white translate-x-0" />
                          </div>
                          <span className="text-[10px] font-semibold text-slate-500 hidden sm:inline">Paused</span>
                        </div>
                      </div>
                      <div className="hidden sm:inline-block sm:col-span-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#3F72AF] text-[10px] font-bold border border-blue-200/60">
                          Monthly
                        </span>
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-right sm:text-left font-mono text-[11px] text-slate-600">
                        Nov 1, 2026
                      </div>
                    </div>
                  </div>

                  {/* Sub-item: Scheduled creation badge */}
                  <div className="px-3.5 py-2 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 font-bold text-[9px] flex items-center justify-center">
                        DS
                      </div>
                      <span className="text-slate-600 font-medium">Created by Dominic Sterling</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">4 active retainers · Auto-charge enabled</span>
                  </div>
                </div>
              ) : (
                /* ALL INVOICES VIEW (Exact match to Screenshot 3) */
                <div className="divide-y divide-slate-100 text-xs flex-1 flex flex-col justify-between">
                  <div>
                    {/* Status Pills Toolbar from Screenshot 3 */}
                    <div className="px-3 py-2 bg-slate-50/40 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                      <button
                        type="button"
                        onClick={() => setInvoiceStatusFilter("all")}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 transition-colors ${
                          invoiceStatusFilter === "all"
                            ? "bg-white text-slate-900 border border-slate-200 shadow-2xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        All statuses <span className="text-slate-400 font-normal">17</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setInvoiceStatusFilter("outstanding")}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium text-amber-700 bg-amber-50/80 border border-amber-200/50 shrink-0"
                      >
                        ● Outstanding 4
                      </button>
                      <button
                        type="button"
                        onClick={() => setInvoiceStatusFilter("paid")}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium text-emerald-700 bg-emerald-50/80 border border-emerald-200/50 shrink-0"
                      >
                        ● Paid 13
                      </button>
                      <button
                        type="button"
                        onClick={() => setInvoiceStatusFilter("overdue")}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium text-rose-700 bg-rose-50/80 border border-rose-200/50 shrink-0"
                      >
                        ● Overdue 1
                      </button>
                    </div>

                    {/* Table Header */}
                    <div className="bg-slate-50/70 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 grid grid-cols-12 gap-2">
                      <span className="col-span-3 sm:col-span-3">Invoice</span>
                      <span className="col-span-3 sm:col-span-3">Client</span>
                      <span className="col-span-2 sm:col-span-2">Status</span>
                      <span className="col-span-2 sm:col-span-2 text-right">Total</span>
                      <span className="col-span-2 sm:col-span-2 text-right">Amount Due</span>
                    </div>

                    {/* Row 1: INV-2026-0017 (Sent / Due) */}
                    <div className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                      <span className="col-span-3 sm:col-span-3 font-bold text-slate-900 font-mono text-[11px]">
                        INV-2026-0017
                      </span>
                      <span className="col-span-3 sm:col-span-3 text-slate-600 truncate font-medium">
                        Kroma Fintech
                      </span>
                      <div className="col-span-2 sm:col-span-2">
                        <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200/60 inline-flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-blue-600" /> Sent
                        </span>
                      </div>
                      <span className="col-span-2 sm:col-span-2 text-right font-mono font-semibold text-slate-800">
                        $6,500.00
                      </span>
                      <span className="col-span-2 sm:col-span-2 text-right font-mono font-bold text-amber-700">
                        $6,500.00
                      </span>
                    </div>

                    {/* Row 2: INV-2026-0016 (Paid) */}
                    <div className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                      <span className="col-span-3 sm:col-span-3 font-bold text-slate-900 font-mono text-[11px]">
                        INV-2026-0016
                      </span>
                      <span className="col-span-3 sm:col-span-3 text-slate-600 truncate font-medium">
                        Arcturus Robotics
                      </span>
                      <div className="col-span-2 sm:col-span-2">
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60 inline-flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-600" /> Paid
                        </span>
                      </div>
                      <span className="col-span-2 sm:col-span-2 text-right font-mono font-semibold text-slate-800">
                        $15,200.00
                      </span>
                      <span className="col-span-2 sm:col-span-2 text-right font-mono font-semibold text-emerald-600">
                        Paid
                      </span>
                    </div>

                    {/* Row 3: INV-2026-0015 (Sent / Due) */}
                    <div className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                      <span className="col-span-3 sm:col-span-3 font-bold text-slate-900 font-mono text-[11px]">
                        INV-2026-0015
                      </span>
                      <span className="col-span-3 sm:col-span-3 text-slate-600 truncate font-medium">
                        Solari Logistics
                      </span>
                      <div className="col-span-2 sm:col-span-2">
                        <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200/60 inline-flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-blue-600" /> Sent
                        </span>
                      </div>
                      <span className="col-span-2 sm:col-span-2 text-right font-mono font-semibold text-slate-800">
                        $2,500.00
                      </span>
                      <span className="col-span-2 sm:col-span-2 text-right font-mono font-bold text-amber-700">
                        $2,500.00
                      </span>
                    </div>

                    {/* Row 4: INV-2026-0014 (Paid) */}
                    <div className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                      <span className="col-span-3 sm:col-span-3 font-bold text-slate-900 font-mono text-[11px]">
                        INV-2026-0014
                      </span>
                      <span className="col-span-3 sm:col-span-3 text-slate-600 truncate font-medium">
                        Nebula Health
                      </span>
                      <div className="col-span-2 sm:col-span-2">
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60 inline-flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-600" /> Paid
                        </span>
                      </div>
                      <span className="col-span-2 sm:col-span-2 text-right font-mono font-semibold text-slate-800">
                        $8,500.00
                      </span>
                      <span className="col-span-2 sm:col-span-2 text-right font-mono font-semibold text-emerald-600">
                        Paid
                      </span>
                    </div>
                  </div>

                  {/* Summary Footer */}
                  <div className="px-3.5 py-2 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-auto">
                    <span className="text-slate-600 font-medium">Showing 4 of 17 invoices</span>
                    <span className="text-[10px] font-mono text-[#3F72AF] font-bold">Auto-sync with Stripe active</span>
                  </div>
                </div>
              )}
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // FEATURE 02: Milestone & Time Billing (Interactive Time to Invoice generator preview)
    // -------------------------------------------------------------------------
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5 sm:gap-4 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Top Navigation & Workflow Step Tabs */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <Timer size={17} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">Nebula Telehealth 2.0</h3>
                  <p className="text-[11px] text-slate-400">Budget & Time Tracking</p>
                </div>
              </div>

              {/* Step Switcher Tabs (Timesheet -> Generate Modal -> Invoice #INV-00018) */}
              <div className="flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/80 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setTimeInvoiceStep("timesheet")}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    timeInvoiceStep === "timesheet"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  1. Timesheet
                </button>
                <button
                  type="button"
                  onClick={() => setTimeInvoiceStep("modal")}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    timeInvoiceStep === "modal"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  2. Generate Modal
                </button>
                <button
                  type="button"
                  onClick={() => setTimeInvoiceStep("invoice")}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    timeInvoiceStep === "invoice"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  3. Invoice Draft
                </button>
              </div>
            </div>

            {/* Container with Equalized Height for all 3 views */}
            <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-2xs min-h-[385px] flex flex-col justify-between">
              {timeInvoiceStep === "timesheet" && (
                /* VIEW 1: Project Time Entries & Expenses (Exact match to Screenshot 1) */
                <div className="divide-y divide-slate-100 text-xs flex-1 flex flex-col justify-between">
                  <div>
                    {/* Project Status Bar */}
                    <div className="p-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200/60 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> In Progress
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60">
                          On Track
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">May 1 – Nov 20, 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-600">Gross Profit:</span>
                        <span className="font-mono font-bold text-emerald-600 text-xs">+$53,720.00</span>
                      </div>
                    </div>

                    {/* Table Toolbar */}
                    <div className="px-3 py-2 bg-white flex items-center justify-between border-b border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        <Timer size={14} className="text-[#3F72AF]" />
                        <span>Time Entries</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setTimeInvoiceStep("modal")}
                          className="px-2.5 py-1 rounded-lg bg-[#3F72AF] text-white text-[11px] font-bold hover:bg-[#325a8d] transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                        >
                          <Receipt size={12} />
                          <span>Generate Invoice</span>
                        </button>
                      </div>
                    </div>

                    {/* Time Table Header */}
                    <div className="bg-slate-50/70 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 grid grid-cols-12 gap-2">
                      <span className="col-span-3">Who</span>
                      <span className="col-span-2">Duration</span>
                      <span className="col-span-7">Description / Task</span>
                    </div>

                    {/* Row 1: Liam Gallagher */}
                    <div className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                      <div className="col-span-3 flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                          LG
                        </div>
                        <span className="font-semibold text-slate-800 truncate">Liam Gallagher</span>
                      </div>
                      <span className="col-span-2 font-mono font-bold text-slate-800">14h</span>
                      <span className="col-span-7 text-slate-600 truncate">
                        Interactive Appointment Booking Calendar with Timezone Auto-Detection
                      </span>
                    </div>

                    {/* Row 2: Chloe Bennett */}
                    <div className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                      <div className="col-span-3 flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                          CB
                        </div>
                        <span className="font-semibold text-slate-800 truncate">Chloe Bennett</span>
                      </div>
                      <span className="col-span-2 font-mono font-bold text-slate-800">9h 30m</span>
                      <span className="col-span-7 text-slate-600 truncate">
                        Patient Electronic Prescription (eRx) Signature Component
                      </span>
                    </div>

                    {/* Row 3: Amara Okafor */}
                    <div className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                      <div className="col-span-3 flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                          AO
                        </div>
                        <span className="font-semibold text-slate-800 truncate">Amara Okafor</span>
                      </div>
                      <span className="col-span-2 font-mono font-bold text-slate-800">28h</span>
                      <span className="col-span-7 text-slate-600 truncate">
                        Implement encrypted WebRTC video consultation room UI
                      </span>
                    </div>
                  </div>

                  {/* Expenses Footer Callout from Screenshot 1 */}
                  <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[11px] mt-auto">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <DollarSign size={13} className="text-emerald-600" />
                      <span className="font-medium">Project Expenses:</span>
                      <span className="text-slate-500">Total: $5,780.00 · Billable: <strong className="text-slate-900 font-mono">$6,422.00</strong></span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                      Ready to Bill
                    </span>
                  </div>
                </div>
              )}

              {timeInvoiceStep === "modal" && (
                /* VIEW 2: Generate Invoice from Time Modal (Exact match to Screenshots 3 & 4) */
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-slate-50/30">
                  <div className="flex flex-col gap-3">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-blue-50 text-[#3F72AF] flex items-center justify-center">
                          <Receipt size={14} />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">Generate Invoice from Time</h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTimeInvoiceStep("timesheet")}
                        className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    {/* Date Range Tabs (Last Month vs This Month vs Custom) */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                        Date Range
                      </label>
                      <div className="grid grid-cols-3 gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                        <button
                          type="button"
                          onClick={() => setTimeDateRange("last")}
                          className={`py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                            timeDateRange === "last"
                              ? "bg-white text-slate-900 shadow-2xs"
                              : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          Last Month
                        </button>
                        <button
                          type="button"
                          onClick={() => setTimeDateRange("this")}
                          className={`py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                            timeDateRange === "this"
                              ? "bg-white text-slate-900 shadow-2xs font-bold"
                              : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          This Month
                        </button>
                        <button
                          type="button"
                          onClick={() => setTimeDateRange("custom")}
                          className={`py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                            timeDateRange === "custom"
                              ? "bg-white text-slate-900 shadow-2xs"
                              : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          Custom
                        </button>
                      </div>

                      {/* Date Pickers */}
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <span className="text-[10px] text-slate-400 block mb-0.5">From</span>
                          <div className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-mono text-slate-800 flex items-center justify-between">
                            <span>{timeDateRange === "last" ? "Sep 1, 2026" : "Oct 1, 2026"}</span>
                            <ChevronDown size={12} className="text-slate-400" />
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block mb-0.5">To</span>
                          <div className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-mono text-slate-800 flex items-center justify-between">
                            <span>{timeDateRange === "last" ? "Sep 30, 2026" : "Oct 31, 2026"}</span>
                            <ChevronDown size={12} className="text-slate-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Group Line Items By */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                        Group Line Items By
                      </span>
                      <div className="grid grid-cols-3 gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                        <span className="py-1 rounded-md text-[11px] font-bold bg-white text-slate-900 text-center shadow-2xs">
                          Per Task
                        </span>
                        <span className="py-1 rounded-md text-[11px] text-slate-500 text-center">
                          Per Member
                        </span>
                        <span className="py-1 rounded-md text-[11px] text-slate-500 text-center">
                          Single Line
                        </span>
                      </div>
                    </div>

                    {/* Include Unbilled Expenses Box (Checked by default) */}
                    <div className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/50 flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded bg-[#3F72AF] text-white flex items-center justify-center mt-0.5 shrink-0">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <div className="text-[11px] leading-tight">
                        <span className="font-bold text-slate-900 block">Include unbilled project expenses (2)</span>
                        <span className="text-slate-500 text-[10px]">
                          Adds 2 expense line items (est. $6,422.00 with billable markup applied).
                        </span>
                      </div>
                    </div>

                    {/* Calculated Summary Pill */}
                    <div className="p-2 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                      <span className="text-slate-600">2 expenses ($6,422.00) · est. total</span>
                      <span className="font-bold font-mono text-slate-900">$6,422.00</span>
                    </div>
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 mt-2">
                    <button
                      type="button"
                      onClick={() => setTimeInvoiceStep("timesheet")}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setTimeInvoiceStep("invoice")}
                      className="px-3.5 py-1.5 rounded-lg bg-[#3F72AF] text-white text-xs font-bold hover:bg-[#325a8d] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Receipt size={13} />
                      <span>Generate Draft — $6,422.00</span>
                    </button>
                  </div>
                </div>
              )}

              {timeInvoiceStep === "invoice" && (
                /* VIEW 3: Final Generated Invoice #INV-00018 (Exact match to Screenshot 2) */
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-xs">
                  <div>
                    {/* Invoice Top Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 font-mono">Invoice #INV-00018</span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200/60 font-bold text-[10px]">
                          Draft
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                        <span>Nebula Health</span>
                        <span>›</span>
                        <span className="font-mono text-slate-900 font-bold text-xs">USD 6,422.00</span>
                      </div>
                    </div>

                    {/* Bill To & Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 border-b border-slate-100 text-[11px]">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Bill To</span>
                        <span className="font-bold text-slate-800 block mt-0.5">Dr. Alexander Hayes</span>
                        <span className="text-slate-400 text-[10px]">finance@nebulahealth.io</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Issue Date</span>
                        <span className="font-mono text-slate-700 block mt-0.5">Oct 13, 2026</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Due Date</span>
                        <span className="font-mono text-slate-700 block mt-0.5">Nov 12, 2026</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Payment Terms</span>
                        <span className="font-semibold text-slate-700 block mt-0.5">Net 30</span>
                      </div>
                    </div>

                    {/* Itemized Line Items Table */}
                    <div className="mt-2 divide-y divide-slate-100 border border-slate-200/80 rounded-lg overflow-hidden">
                      <div className="bg-slate-50/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 grid grid-cols-12 gap-2">
                        <span className="col-span-6">Item</span>
                        <span className="col-span-2 text-center">Type</span>
                        <span className="col-span-2 text-right">Rate</span>
                        <span className="col-span-2 text-right">Total</span>
                      </div>

                      {/* Line 1: Medical UX Compliance */}
                      <div className="p-3 grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-6">
                          <span className="font-bold text-slate-900 block">Medical UX Compliance Research Consultant</span>
                          <span className="text-[10px] text-slate-400 line-clamp-1">Patient EHR comprehension study & HIPAA consent</span>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[9px] border border-blue-200/50">
                            One-time
                          </span>
                        </div>
                        <span className="col-span-2 text-right font-mono text-slate-600">$4,950.00</span>
                        <span className="col-span-2 text-right font-mono font-bold text-slate-900">$4,950.00</span>
                      </div>

                      {/* Line 2: AWS GovCloud WebRTC */}
                      <div className="p-3 grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-6">
                          <span className="font-bold text-slate-900 block">AWS GovCloud WebRTC Relay Infrastructure</span>
                          <span className="text-[10px] text-slate-400 line-clamp-1">HIPAA-compliant STUN/TURN dual-relay servers</span>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[9px] border border-blue-200/50">
                            One-time
                          </span>
                        </div>
                        <span className="col-span-2 text-right font-mono text-slate-600">$1,472.00</span>
                        <span className="col-span-2 text-right font-mono font-bold text-slate-900">$1,472.00</span>
                      </div>
                    </div>
                  </div>

                  {/* Total & Action Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Amount Due:</span>
                      <span className="text-base font-bold font-mono text-[#3F72AF]">$6,422.00</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setTimeInvoiceStep("timesheet")}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        Back to Log
                      </button>
                      <button
                        type="button"
                        className="px-3.5 py-1.5 rounded-lg bg-[#3F72AF] hover:bg-[#325a8d] text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send size={12} />
                        <span>Send Invoice</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // FEATURE 03: Frictionless Client Payment Checkout (Exact match to Screenshot 1)
    // -------------------------------------------------------------------------
    if (featureIndex === "03") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-4 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Split Checkout Mockup (Left Summary & Right Payment Form) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* LEFT COLUMN: Agency Info, Currency Picker, and Invoice Item */}
              <div className="md:col-span-5 flex flex-col justify-between pr-0 md:pr-3 md:border-r border-slate-100">
                <div className="flex flex-col gap-3.5">
                  {/* Agency Brand Name */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-100 text-slate-700 flex items-center justify-center text-xs">
                      <Briefcase size={13} />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Creation Wave LLC</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">Pay Creation Wave LLC</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Invoice INV-00052</p>
                  </div>

                  {/* Currency Selection Switcher */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-600">Choose currency</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setInvoiceCurrency("bdt")}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          invoiceCurrency === "bdt"
                            ? "border-[#3F72AF] bg-blue-50/50 shadow-2xs ring-1 ring-[#3F72AF]"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">🇧🇩</span>
                          <span className="text-[11px] font-bold text-slate-900 truncate">BDT 20,504.63</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setInvoiceCurrency("usd")}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          invoiceCurrency === "usd"
                            ? "border-[#3F72AF] bg-blue-50/50 shadow-2xs ring-1 ring-[#3F72AF]"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">🇺🇸</span>
                          <span className="text-[11px] font-bold text-slate-900 truncate">US$160.00</span>
                        </div>
                      </button>
                    </div>
                    <span className="text-[9px] text-slate-400">Exchange rate and fees of your bank may apply</span>
                  </div>
                </div>

                {/* Bottom Total Line */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Invoice INV-00052</span>
                    <span className="text-[10px] text-slate-400">Payment to Creation Wave LLC</span>
                  </div>
                  <span className="text-sm font-bold font-mono text-slate-900">
                    {invoiceCurrency === "usd" ? "US$160.00" : "BDT 20,504"}
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: Express Pay (Apple Pay + Link), Contact Info, Payment Method (Card vs Cash App) */}
              <div className="md:col-span-7 flex flex-col gap-3">
                {/* Express Checkout Buttons: Apple Pay & Link (Screenshot 1) */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="h-9 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs hover:bg-zinc-800 transition-colors shadow-2xs cursor-pointer gap-1"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.32-6.19-9.35-11.06-20.25-14.6-32.69-3.54-12.44-5.31-23.75-5.31-33.93 0-14.67 3.75-26.68 11.24-36.03 7.5-9.35 16.9-14.07 28.21-14.18 5.66 0 11.75 1.57 18.28 4.7 6.53 3.14 10.74 4.76 12.64 4.88 1.45 0 5.86-1.68 13.23-5.06 7.37-3.37 13.62-4.94 18.76-4.7 13.88.75 24.89 5.86 33.02 15.34-12.16 7.37-18.12 17.5-17.89 30.39.24 10.13 4.13 18.74 11.68 25.82 7.55 7.08 16.59 11.14 27.13 12.18-2.22 6.63-4.95 13.24-8.18 19.82zM119.22 33.15c0-7.25 2.65-14.06 7.95-20.43 5.3-6.38 11.83-10.47 19.6-12.28.36 1.8.54 3.48.54 5.06 0 7.24-2.67 14.18-8 20.83-5.34 6.64-11.99 10.77-19.96 12.39-.12-1.8-.13-3.66-.13-5.57z" />
                    </svg>
                    <span>Pay</span>
                  </button>

                  <button
                    type="button"
                    className="h-9 rounded-lg bg-[#00D66F] text-slate-900 flex items-center justify-center font-bold text-xs hover:bg-[#00c264] transition-colors shadow-2xs cursor-pointer gap-1"
                  >
                    <span className="font-black text-sm">›</span>
                    <span>link</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 my-0.5">
                  <div className="h-px bg-slate-200 flex-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">OR</span>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                {/* Contact Information */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Contact information</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-[10px] font-medium text-slate-400">Email</span>
                    <input
                      type="email"
                      readOnly
                      value="billing@eidoncore.com"
                      className="w-full pl-12 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* Payment Method Selector Box */}
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  {/* Card Option Header */}
                  <div
                    onClick={() => setInvoicePaymentMethod("card")}
                    className={`p-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                      invoicePaymentMethod === "card" ? "bg-slate-50/60" : "hover:bg-slate-50/40"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-[#3F72AF] flex items-center justify-center">
                        {invoicePaymentMethod === "card" && <div className="w-1.5 h-1.5 rounded-full bg-[#3F72AF]" />}
                      </div>
                      <CreditCard size={14} className="text-slate-700" />
                      <span className="text-xs font-bold text-slate-800">Card</span>
                    </div>
                  </div>

                  {/* Card Form Fields */}
                  {invoicePaymentMethod === "card" && (
                    <div className="p-2.5 border-t border-slate-100 flex flex-col gap-2 bg-slate-50/20">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-slate-600">Card information</span>
                          <div className="flex items-center gap-1">
                            <span className="px-1 py-0.2 rounded bg-blue-100 text-[8px] font-bold text-blue-800">VISA</span>
                            <span className="px-1 py-0.2 rounded bg-amber-100 text-[8px] font-bold text-amber-800">MC</span>
                            <span className="px-1 py-0.2 rounded bg-blue-600 text-[8px] font-bold text-white">AMEX</span>
                          </div>
                        </div>
                        <input
                          type="text"
                          readOnly
                          value="4242 •••• •••• 4242"
                          className="w-full px-2.5 py-1.5 text-xs rounded-t-lg border border-slate-200 bg-white font-mono text-slate-800"
                        />
                        <div className="grid grid-cols-2 -mt-px">
                          <input
                            type="text"
                            readOnly
                            value="MM / YY"
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 bg-white text-slate-400 rounded-bl-lg"
                          />
                          <input
                            type="text"
                            readOnly
                            value="CVC"
                            className="w-full px-2.5 py-1.5 text-xs border border-l-0 border-slate-200 bg-white text-slate-400 rounded-br-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-600 block mb-0.5">Cardholder name</span>
                        <input
                          type="text"
                          readOnly
                          value="Julian Vance"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-600 block mb-0.5">Country or region</span>
                        <select
                          disabled
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                        >
                          <option>United States</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Cash App Pay Option Header */}
                  <div
                    onClick={() => setInvoicePaymentMethod("cashapp")}
                    className={`p-2.5 border-t border-slate-100 flex items-center justify-between cursor-pointer transition-colors ${
                      invoicePaymentMethod === "cashapp" ? "bg-slate-50/60" : "hover:bg-slate-50/40"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 flex items-center justify-center">
                        {invoicePaymentMethod === "cashapp" && <div className="w-1.5 h-1.5 rounded-full bg-[#3F72AF]" />}
                      </div>
                      <span className="w-4 h-4 rounded-md bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center">
                        $
                      </span>
                      <span className="text-xs font-bold text-slate-800">Cash App Pay</span>
                    </div>
                  </div>
                </div>

                {/* Save information checkbox */}
                <div
                  onClick={() => setSavePaymentInfo(!savePaymentInfo)}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/40 flex items-start gap-2 cursor-pointer"
                >
                  <div
                    className={`w-3.5 h-3.5 rounded border mt-0.5 flex items-center justify-center transition-colors ${
                      savePaymentInfo ? "bg-[#3F72AF] border-[#3F72AF] text-white" : "border-slate-300 bg-white"
                    }`}
                  >
                    {savePaymentInfo && <Check size={10} strokeWidth={3} />}
                  </div>
                  <div className="text-[11px] leading-tight">
                    <span className="font-bold text-slate-800 block">Save my information for faster checkout</span>
                    <span className="text-slate-400 text-[10px]">
                      Pay securely at Creation Wave LLC and everywhere Link is accepted.
                    </span>
                  </div>
                </div>

                {/* Submit Pay Button */}
                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl bg-[#3F72AF] hover:bg-[#325a8d] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Lock size={12} />
                  <span>Pay {invoiceCurrency === "usd" ? "US$160.00" : "BDT 20,504.63"}</span>
                </button>

                {/* Footer powered by Stripe */}
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                  <span>Powered by <strong className="text-slate-600">stripe</strong></span>
                  <span>•</span>
                  <span>Terms</span>
                  <span>•</span>
                  <span>Privacy</span>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }
  }

  // =========================================================================
  // CUSTOM EIDONCORE MODULE: AUTOMATIONS
  // =========================================================================
  if (moduleName.toLowerCase().includes("automat")) {
    // -------------------------------------------------------------------------
    // FEATURE 01: Visual Rule Builder / Workflow Studio (Exact match to Screenshot 1)
    // -------------------------------------------------------------------------
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3 sm:gap-3.5 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Top Workflow Studio Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center border border-blue-100">
                  <Zap size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">Workflow studio</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-slate-400">Send a message to slack and email when a task is created</span>
                    <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1 rounded border border-emerald-200/50">Saved</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Live toggle */}
                <button
                  type="button"
                  onClick={() => setAutomationLive(!automationLive)}
                  className="flex items-center gap-1.5 cursor-pointer bg-slate-50 px-2 py-1 rounded-lg border border-slate-200"
                >
                  <div
                    className={`w-6 h-3.5 rounded-full transition-colors relative flex items-center px-0.5 ${
                      automationLive ? "bg-[#3F72AF]" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full bg-white transition-transform ${
                        automationLive ? "translate-x-2.5" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">
                    {automationLive ? "Live" : "Draft"}
                  </span>
                </button>

                <button
                  type="button"
                  className="px-2.5 py-1 rounded-lg bg-[#3F72AF] text-white text-[11px] font-bold hover:bg-[#325a8d] transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <Check size={12} strokeWidth={2.5} />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* Split Visual Canvas: Left Steps List + Center Node Graph + Right Inspector */}
            <div className="grid grid-cols-12 gap-3 bg-slate-50/40 p-2.5 rounded-xl border border-slate-200/70 min-h-[380px]">
              {/* Left Column: Workflow Outline (Steps 1 to 4) */}
              <div className="col-span-12 sm:col-span-4 flex flex-col gap-1.5 border-b sm:border-b-0 sm:border-r border-slate-200/70 pr-0 sm:pr-2.5 pb-2.5 sm:pb-0">
                <div className="flex items-center justify-between pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>Workflow</span>
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">4 steps</span>
                </div>

                {/* Step 1: When task created */}
                <div
                  onClick={() => setAutomationActiveStep(1)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                    automationActiveStep === 1
                      ? "bg-white border-[#3F72AF] shadow-2xs ring-1 ring-[#3F72AF]/30"
                      : "bg-white/80 border-slate-200 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-blue-50 text-[#3F72AF] flex items-center justify-center shrink-0">
                      <Zap size={11} />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block">Step 1</span>
                      <span className="text-[11px] font-bold text-slate-900 leading-tight">New task created</span>
                    </div>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>

                {/* Step 2: Every matching event */}
                <div
                  onClick={() => setAutomationActiveStep(2)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                    automationActiveStep === 2
                      ? "bg-white border-[#3F72AF] shadow-2xs ring-1 ring-[#3F72AF]/30"
                      : "bg-white/80 border-slate-200 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Sliders size={11} />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block">Step 2 · Filter</span>
                      <span className="text-[11px] font-bold text-slate-900 leading-tight">Matching events</span>
                    </div>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>

                {/* Step 3: Send email */}
                <div
                  onClick={() => setAutomationActiveStep(3)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                    automationActiveStep === 3
                      ? "bg-white border-[#3F72AF] shadow-2xs ring-1 ring-[#3F72AF]/30"
                      : "bg-white/80 border-slate-200 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Mail size={11} />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block">Step 3</span>
                      <span className="text-[11px] font-bold text-slate-900 leading-tight">Send email</span>
                    </div>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>

                {/* Step 4: Send Slack message */}
                <div
                  onClick={() => setAutomationActiveStep(4)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                    automationActiveStep === 4
                      ? "bg-white border-[#3F72AF] shadow-2xs ring-1 ring-[#3F72AF]/30"
                      : "bg-white/80 border-slate-200 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <Hash size={11} />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block">Step 4</span>
                      <span className="text-[11px] font-bold text-slate-900 leading-tight">Send Slack msg</span>
                    </div>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Right Column: Visual Flow Cards on Dot Grid Canvas (Screenshot 1) */}
              <div className="col-span-12 sm:col-span-8 flex flex-col items-center justify-center py-2 relative">
                {/* Dot grid subtle background */}
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none rounded-lg"
                  style={{
                    backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                />

                <div className="w-full max-w-xs flex flex-col items-center gap-2 relative z-10">
                  {/* Card 1: Trigger */}
                  <div className="w-full bg-white rounded-xl border border-blue-200 p-2.5 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center">
                        <Zap size={13} />
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-medium">1. When this happens</span>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">New task created</h4>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Check size={10} /> Ready
                    </span>
                  </div>

                  {/* Connecting Line 1 */}
                  <div className="w-0.5 h-3 bg-slate-300" />

                  {/* Card 2: Condition Filter */}
                  <div className="w-full bg-white rounded-xl border border-slate-200/80 p-2.5 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Sliders size={13} />
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-medium">2. Only continue if</span>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">Every matching event continues</h4>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Check size={10} /> Ready
                    </span>
                  </div>

                  {/* Connecting Line 2 */}
                  <div className="w-0.5 h-3 bg-slate-300" />

                  {/* Card 3: Action - Send email */}
                  <div className="w-full bg-white rounded-xl border border-slate-200/80 p-2.5 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Mail size={13} />
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-medium">3. Then do this</span>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">Send email</h4>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Check size={10} /> Ready
                    </span>
                  </div>

                  {/* Connecting Line 3 */}
                  <div className="w-0.5 h-3 bg-slate-300" />

                  {/* Card 4: Action - Send Slack message */}
                  <div className="w-full bg-white rounded-xl border border-slate-200/80 p-2.5 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Hash size={13} />
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-medium">4. Then do this</span>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">Send Slack message</h4>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Check size={10} /> Ready
                    </span>
                  </div>

                  {/* Add action buttons */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[10px] font-bold shadow-2xs hover:bg-slate-50 flex items-center gap-1"
                    >
                      <Plus size={10} /> Add action
                    </button>
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[10px] font-bold shadow-2xs hover:bg-slate-50 flex items-center gap-1"
                    >
                      <GitBranch size={10} /> Add if/else
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // FEATURE 02: Slack & Email Message / Action Picker Modal (Exact match to Screenshot 3)
    // -------------------------------------------------------------------------
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5 sm:gap-4 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Top Workspace Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                  <Hash size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">Choose an action</h3>
                  <p className="text-[11px] text-slate-400">Choose what happens next. Actions execute in order.</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                <span>Multi-Channel Dispatch</span>
              </div>
            </div>

            {/* Action Picker Modal Card (Screenshot 3) */}
            <div className="border border-slate-200/90 rounded-xl bg-white shadow-2xs overflow-hidden flex flex-col min-h-[380px]">
              {/* Search Bar */}
              <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                <div className="relative">
                  <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={actionSearchQuery}
                    onChange={(e) => setActionSearchQuery(e.target.value)}
                    placeholder="Search actions (e.g. email, slack, task)..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#3F72AF]"
                  />
                </div>
              </div>

              {/* Two Column Layout: Module Filter Tabs (Left) + Actions List (Right) */}
              <div className="grid grid-cols-12 flex-1 divide-x divide-slate-100 text-xs">
                {/* Left Category Tabs */}
                <div className="col-span-4 p-2 bg-slate-50/40 flex flex-col gap-1">
                  {[
                    { id: "all", label: "All modules" },
                    { id: "messages", label: "Messages" },
                    { id: "tasks", label: "Tasks" },
                    { id: "orgs", label: "Organizations" },
                    { id: "support", label: "Support" },
                    { id: "flow", label: "Flow control" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActionCategoryTab(tab.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-left text-[11px] font-medium transition-colors cursor-pointer ${
                        actionCategoryTab === tab.id
                          ? "bg-blue-50/80 text-[#3F72AF] font-bold border border-blue-200/60"
                          : "text-slate-600 hover:bg-slate-100/70"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Right Action Items List (Exact match to items in Screenshot 3) */}
                <div className="col-span-8 p-2 flex flex-col gap-1.5 overflow-y-auto max-h-[320px]">
                  {/* Action 1: Send notification */}
                  <div className="p-2.5 rounded-lg border border-slate-200/70 hover:border-[#3F72AF] hover:bg-blue-50/20 transition-all flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center shrink-0">
                        <Bell size={13} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#3F72AF] transition-colors">
                          Send notification
                        </h4>
                        <span className="text-[10px] text-slate-400">Messages · In-app push</span>
                      </div>
                    </div>
                    <ChevronRight size={13} className="text-slate-400 group-hover:text-[#3F72AF]" />
                  </div>

                  {/* Action 2: Send email */}
                  <div className="p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/30 hover:border-indigo-400 transition-all flex items-center justify-between group cursor-pointer ring-1 ring-indigo-200/50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Mail size={13} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          Send email
                        </h4>
                        <span className="text-[10px] text-slate-400">Messages · Branded templates & merge tags</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-indigo-600 bg-white px-1.5 py-0.5 rounded border border-indigo-200">
                      Active
                    </span>
                  </div>

                  {/* Action 3: Send Slack message */}
                  <div className="p-2.5 rounded-lg border border-purple-200 bg-purple-50/30 hover:border-purple-400 transition-all flex items-center justify-between group cursor-pointer ring-1 ring-purple-200/50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Hash size={13} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                          Send Slack message
                        </h4>
                        <span className="text-[10px] text-slate-400">Slack · Dedicated channel alerts</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-purple-600 bg-white px-1.5 py-0.5 rounded border border-purple-200">
                      Active
                    </span>
                  </div>

                  {/* Action 4: Create a task */}
                  <div className="p-2.5 rounded-lg border border-slate-200/70 hover:border-[#3F72AF] hover:bg-blue-50/20 transition-all flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center shrink-0">
                        <CheckSquare size={13} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#3F72AF] transition-colors">
                          Create a task
                        </h4>
                        <span className="text-[10px] text-slate-400">Tasks · Auto-assign & schedule</span>
                      </div>
                    </div>
                    <ChevronRight size={13} className="text-slate-400 group-hover:text-[#3F72AF]" />
                  </div>

                  {/* Action 5: Update task status */}
                  <div className="p-2.5 rounded-lg border border-slate-200/70 hover:border-[#3F72AF] hover:bg-blue-50/20 transition-all flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center shrink-0">
                        <Activity size={13} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#3F72AF] transition-colors">
                          Update task status
                        </h4>
                        <span className="text-[10px] text-slate-400">Tasks · Move across kanban</span>
                      </div>
                    </div>
                    <ChevronRight size={13} className="text-slate-400 group-hover:text-[#3F72AF]" />
                  </div>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // FEATURE 03: Unlimited Integrations Directory (Exact match to Screenshot 2)
    // -------------------------------------------------------------------------
    if (featureIndex === "03") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5 sm:gap-4 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Header: Settings > Integrations */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <Globe size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">Integrations</h3>
                  <p className="text-[11px] text-slate-400">Connect third-party tools and services to your workspace.</p>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold text-[#3F72AF] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/50">
                Unlimited Hub
              </span>
            </div>

            {/* Integrations Directory Body */}
            <div className="flex flex-col gap-3 min-h-[380px]">
              {/* Category: AVAILABLE INTEGRATIONS (Screenshot 2) */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Available Integrations
                </span>
                <div className="flex flex-col gap-2">
                  {/* Item 1: Stripe */}
                  <div className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 transition-colors flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <CreditCard size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">Stripe</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Accept payments for invoices, services, and subscriptions</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200">
                      Not Connected
                    </span>
                  </div>

                  {/* Item 2: Slack */}
                  <div className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 transition-colors flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 font-bold text-sm">
                        #
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">Slack</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Send workspace notifications to your Slack channels</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200">
                      Not Connected
                    </span>
                  </div>

                  {/* Item 3: Gmail & email (Enabled) */}
                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/20 transition-colors flex items-center justify-between shadow-2xs ring-1 ring-emerald-200/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                        <Mail size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">Gmail & email</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Turn emails into tasks and tickets from Gmail or by forwarding</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Enabled
                    </span>
                  </div>

                  {/* Item 4: AI Connector (Enabled) */}
                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/20 transition-colors flex items-center justify-between shadow-2xs ring-1 ring-emerald-200/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">AI Connector</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Connect Claude, Cursor, and other AI assistants via MCP</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Enabled
                    </span>
                  </div>
                </div>
              </div>

              {/* Category: COMING SOON (Screenshot 2) */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Coming Soon
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg border border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="text-slate-400" />
                      <span className="text-xs font-medium text-slate-700">Outlook add-in</span>
                    </div>
                    <span className="text-[9px] font-medium text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">Coming Soon</span>
                  </div>

                  <div className="p-2.5 rounded-lg border border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="text-slate-400" />
                      <span className="text-xs font-medium text-slate-700">Google Calendar</span>
                    </div>
                    <span className="text-[9px] font-medium text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">Coming Soon</span>
                  </div>

                  <div className="p-2.5 rounded-lg border border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap size={13} className="text-slate-400" />
                      <span className="text-xs font-medium text-slate-700">Zapier (5,000+ apps)</span>
                    </div>
                    <span className="text-[9px] font-medium text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">Coming Soon</span>
                  </div>

                  <div className="p-2.5 rounded-lg border border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Folder size={13} className="text-slate-400" />
                      <span className="text-xs font-medium text-slate-700">Google Drive</span>
                    </div>
                    <span className="text-[9px] font-medium text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }
  }

  // =========================================================================
  // CUSTOM EIDONCORE MODULE: REPORTS & INTELLIGENCE
  // =========================================================================
  if (moduleName.toLowerCase().includes("report")) {
    // -------------------------------------------------------------------------
    // FEATURE 01: Financial Intelligence / Revenue & MRR & Receivables (Screenshots 3 & 4)
    // -------------------------------------------------------------------------
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Top Workspace Header Bar with View Switcher & Animated Cursor */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center border border-blue-100 shrink-0">
                  <BarChart3 size={17} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">Financial Intelligence</h3>
                  <p className="text-[10px] text-[#64748B]">Real-time agency revenue & cash flow recognition</p>
                </div>
              </div>

              {/* View Switcher Tabs with Animated Floating Click Cursor */}
              <div className="relative flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setReportsFinancialTab("revenue");
                    setReportsCursorTarget(null);
                    setIsReportsClicking(false);
                  }}
                  className={`relative z-10 px-3 py-1.5 rounded-md text-[11px] transition-all cursor-pointer ${
                    reportsFinancialTab === "revenue"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  PFD 1 · Total Revenue
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReportsFinancialTab("cashflow");
                    setReportsCursorTarget(null);
                    setIsReportsClicking(false);
                  }}
                  className={`relative z-10 px-3 py-1.5 rounded-md text-[11px] transition-all cursor-pointer ${
                    reportsFinancialTab === "cashflow"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  FIN 4 · Cash Flow
                </button>

                {/* Realistic Animated Floating Click Cursor */}
                {reportsCursorTarget && (
                  <div
                    className={`pointer-events-none absolute z-30 transition-all duration-300 ease-out flex items-center ${
                      reportsCursorTarget === "revenue"
                        ? "left-6 sm:left-8 top-3"
                        : "left-[145px] sm:left-[160px] top-3"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 text-slate-900 drop-shadow-md transition-transform duration-150 ${
                        isReportsClicking ? "scale-75 translate-y-0.5" : "scale-100"
                      }`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
                    </svg>
                    {isReportsClicking && (
                      <span className="absolute -inset-1 rounded-full bg-blue-500/30 animate-ping" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Same-Height Card Container (Zero Height Shift & Jump) */}
            <div className="relative min-h-[440px] flex flex-col justify-between">
              {/* CARD 1: TOTAL REVENUE (Exact match to Screenshot media_...c64934bd.png) */}
              {reportsFinancialTab === "revenue" && (
                <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-2xs p-4 sm:p-5 flex-1 flex flex-col justify-between min-h-[440px] transition-all duration-200">
                  {/* Header */}
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-start gap-2.5">
                      <span className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-500 font-mono text-[10px] rounded font-bold uppercase shadow-2xs mt-0.5">
                        PFD 1
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-[#0F172A] leading-tight">Total revenue</h4>
                        <span className="text-xs text-[#64748B] block mt-0.5">All recognized revenue channels</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-semibold text-[#0F172A] flex items-center gap-1.5 border border-[#E2E8F0] px-3 py-1.5 rounded-lg shadow-2xs bg-white hover:bg-slate-50 transition-colors"
                    >
                      <span>View breakdown</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  {/* Main 2-Column Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 flex-1">
                    {/* Left Column */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider block font-bold">
                          THIS MONTH · OCT 1 – 31, 2026
                        </span>
                        <div className="text-4xl sm:text-[44px] font-black text-[#0F172A] tracking-tight mt-1 font-sans leading-none">
                          $40,900
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="px-2 py-0.5 bg-[#E8FAF0] text-emerald-700 border border-[#B7F4D0] rounded-full font-bold text-xs flex items-center gap-0.5 font-mono">
                            ↑ 529%
                          </span>
                          <span className="text-xs text-[#64748B]">
                            vs. previous period <b className="text-[#0F172A] font-bold font-mono">$6,500</b>
                          </span>
                        </div>
                      </div>

                      {/* Sub-stats Row */}
                      <div className="pt-4 mt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#64748B] font-bold tracking-wider block">
                            REVENUE TRANSACTIONS
                          </span>
                          <span className="text-2xl font-black text-[#0F172A] mt-1 block font-sans">5</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#64748B] font-bold tracking-wider block">
                            AVERAGE TRANSACTION
                          </span>
                          <span className="text-2xl font-black text-[#0F172A] mt-1 block font-mono">$8,180</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col justify-between">
                      {/* Pacing vs Prior Period */}
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-[#64748B] uppercase tracking-wider font-bold">PACING VS PRIOR PERIOD</span>
                          <span className="font-mono font-black text-[#0F172A] text-base">6.3×</span>
                        </div>

                        {/* Pacing Progress Bar with black tick */}
                        <div className="relative mt-2">
                          <div className="h-2.5 bg-blue-50 border border-blue-200/60 rounded-full flex items-center overflow-hidden">
                            <div className="bg-[#2563EB] h-full w-[45%]" />
                            <div className="border-t-2 border-dashed border-blue-400 h-full w-[55%]" />
                          </div>
                          {/* Vertical tick marker for prior */}
                          <div className="absolute -top-0.5 left-[12%] w-[2.5px] h-3.5 bg-black rounded-xs" />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#64748B] font-mono mt-1.5">
                          <span className="flex items-center gap-1 font-medium">
                            <span className="font-bold text-black">|</span> Prior $6,500
                          </span>
                          <span>Now $40,900</span>
                        </div>
                      </div>

                      {/* Projection */}
                      <div className="pt-3.5 mt-3.5 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 font-mono">
                          <span className="border border-dashed border-blue-500 rounded px-1 text-[9px] leading-tight">::</span>
                          <span>PROJECTION</span>
                        </div>
                        <div className="text-sm font-bold text-[#0F172A] mt-1">
                          At current pace ≈ $97,531 by Oct 31
                        </div>
                        <span className="text-xs text-[#64748B] block mt-0.5 leading-snug">
                          $40,900 over 13 of 31 days (UTC), linear pace
                        </span>
                      </div>

                      {/* Window Elapsed Segments */}
                      <div className="pt-3.5 mt-3.5 border-t border-slate-100">
                        <div className="flex items-center justify-between text-[11px] text-[#64748B] font-mono">
                          <span className="font-bold uppercase tracking-wider">WINDOW ELAPSED</span>
                          <span className="font-semibold text-[#0F172A]">Day 13 of 31</span>
                        </div>
                        {/* 31 Segments */}
                        <div className="flex gap-[2px] mt-2">
                          {[...Array(31)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-[9px] flex-1 rounded-[1.5px] ${
                                i < 12
                                  ? "bg-slate-400"
                                  : i === 12
                                  ? "bg-[#6366F1]"
                                  : "bg-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD 2: CASH FLOW (Exact match to Screenshot media_...5defc8d0.png) */}
              {reportsFinancialTab === "cashflow" && (
                <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-2xs p-4 sm:p-5 flex-1 flex flex-col justify-between min-h-[440px] transition-all duration-200">
                  {/* Header */}
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-start gap-2.5">
                      <span className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-500 font-mono text-[10px] rounded font-bold uppercase shadow-2xs mt-0.5">
                        FIN 4
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-[#0F172A] leading-tight">Cash flow</h4>
                        <span className="text-xs text-[#64748B] block mt-0.5">Invoiced vs collected · last 6 months</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics 3 Columns */}
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#64748B] font-bold tracking-wider block">COLLECTED</span>
                      <div className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1 font-sans">$113,900</div>
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#64748B] font-bold tracking-wider block">INVOICED</span>
                      <div className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1 font-sans">$148,700</div>
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#64748B] font-bold tracking-wider block">COLLECTION RATE</span>
                      <div className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1 font-sans">77%</div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 text-xs text-[#64748B] mt-3 mb-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2.5 h-2.5 rounded-2xs bg-[#CBD5E1]" /> Invoiced
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2.5 h-2.5 rounded-2xs bg-[#2563EB]" /> Collected
                    </span>
                  </div>

                  {/* Chart Container */}
                  <div className="relative pt-2 pb-2">
                    {/* Horizontal Guide Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] font-mono text-[#94A3B8]">
                      <div className="flex items-center border-b border-slate-100 pb-0.5">
                        <span>$60,000</span>
                      </div>
                      <div className="flex items-center border-b border-slate-100 pb-0.5">
                        <span>$30,000</span>
                      </div>
                      <div className="flex items-center border-b border-slate-200 pb-0.5">
                        <span>$0</span>
                      </div>
                    </div>

                    {/* 6 Months Bar Grid */}
                    <div className="h-40 w-full flex items-end justify-between gap-3 px-6 relative z-10">
                      {[
                        { m: "May", inv: "$18,500", col: "$0", invH: 31, colH: 2 },
                        { m: "Jun", inv: "$18,500", col: "$18,500", invH: 31, colH: 31 },
                        { m: "Jul", inv: "$21,000", col: "$18,500", invH: 35, colH: 31 },
                        { m: "Aug", inv: "$19,800", col: "$21,000", invH: 33, colH: 35 },
                        { m: "Sep", inv: "$27,500", col: "$21,500", invH: 46, colH: 36 },
                        { m: "Oct", inv: "$43,400", col: "$34,400", invH: 72, colH: 57, current: true },
                      ].map((item) => (
                        <div key={item.m} className={`flex-1 flex flex-col items-center relative ${item.current ? "px-2" : ""}`}>
                          {/* Background highlight column for Oct */}
                          {item.current && (
                            <div className="absolute -inset-x-2 -inset-y-3 bg-slate-50/90 rounded-xl -z-10 border border-slate-100" />
                          )}

                          <div className="w-full flex items-end justify-center gap-1.5 h-28">
                            <div
                              className="w-3 sm:w-3.5 rounded-t-2xs bg-[#CBD5E1]"
                              style={{ height: `${item.invH}%` }}
                            />
                            <div
                              className="w-3 sm:w-3.5 rounded-t-2xs bg-[#2563EB]"
                              style={{ height: `${item.colH}%` }}
                            />
                          </div>

                          {/* Month Label */}
                          <span className={`text-xs mt-2 ${
                            item.current ? "font-bold text-[#0F172A]" : "text-[#64748B]"
                          }`}>
                            {item.m}
                          </span>

                          {/* Values below month */}
                          <div className="flex flex-col text-[11px] font-mono text-center mt-1 leading-tight">
                            <span className={item.current ? "font-bold text-[#3F72AF]" : "font-bold text-[#0F172A]"}>
                              {item.col}
                            </span>
                            <span className="text-[#94A3B8] text-[10px]">
                              {item.inv}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="pt-3 mt-2 border-t border-slate-100 text-[11px] text-[#64748B] flex items-center gap-1.5">
                    <HelpCircle size={13} className="text-[#94A3B8]" />
                    <span>Invoiced by issue date (excluding draft, scheduled and void) · collected by payment date.</span>
                  </div>
                </div>
              )}
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // FEATURE 02: Crew Load & Throughput Analytics (Exact match to Screenshot 1)
    // -------------------------------------------------------------------------
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5 sm:gap-4 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <Users size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">Crew & throughput</h3>
                  <p className="text-[11px] text-slate-400">Hours logged per person · Last 14 days (Sep 30 – Oct 13)</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  38.5h logged
                </span>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50 font-bold">
                  28 tracked
                </span>
              </div>
            </div>

            {/* Crew Load Heatmap & Throughput Grid (Screenshot 1) */}
            <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-2xs min-h-[385px] flex flex-col justify-between">
              <div className="p-3.5 sm:p-4 flex flex-col gap-3">
                {/* Heatmap Legend */}
                <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-100">
                  <span className="font-bold text-slate-700">Team Billable Allocation</span>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <span>0h</span>
                    <div className="flex gap-0.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-slate-100" />
                      <span className="w-2.5 h-2.5 rounded-xs bg-blue-100" />
                      <span className="w-2.5 h-2.5 rounded-xs bg-blue-300" />
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#3F72AF]" />
                      <span className="w-2.5 h-2.5 rounded-xs bg-blue-900" />
                    </div>
                    <span>8h+</span>
                  </div>
                </div>

                {/* Person 1: Amara Okafor */}
                <div className="p-2.5 rounded-xl border border-slate-200/70 bg-slate-50/30 flex items-center justify-between gap-2 hover:bg-slate-50/70 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-[120px]">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                      AO
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">Amara Okafor</h4>
                      <span className="text-[10px] text-slate-400">Frontend & WebRTC</span>
                    </div>
                  </div>

                  {/* 14-day Activity Mini Blocks */}
                  <div className="hidden sm:flex items-center gap-1">
                    {[1, 2, 0, 3, 4, 1, 0, 2, 4, 3, 1, 0, 4, 4].map((intensity, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-5 rounded-xs ${
                          intensity === 4
                            ? "bg-[#3F72AF]"
                            : intensity === 3
                            ? "bg-blue-300"
                            : intensity === 2
                            ? "bg-blue-200"
                            : intensity === 1
                            ? "bg-blue-100"
                            : "bg-slate-200/50"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Hours & Late Tasks */}
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <span className="font-mono font-bold text-xs text-slate-900 block">15h</span>
                      <span className="text-[10px] text-amber-600 bg-amber-50 px-1 rounded font-semibold">10 tasks (7 late)</span>
                    </div>
                  </div>
                </div>

                {/* Person 2: Liam Gallagher */}
                <div className="p-2.5 rounded-xl border border-slate-200/70 bg-slate-50/30 flex items-center justify-between gap-2 hover:bg-slate-50/70 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-[120px]">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                      LG
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">Liam Gallagher</h4>
                      <span className="text-[10px] text-slate-400">Backend & API Lead</span>
                    </div>
                  </div>

                  {/* 14-day Activity Mini Blocks */}
                  <div className="hidden sm:flex items-center gap-1">
                    {[0, 1, 2, 4, 3, 2, 0, 1, 3, 4, 2, 0, 3, 4].map((intensity, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-5 rounded-xs ${
                          intensity === 4
                            ? "bg-[#3F72AF]"
                            : intensity === 3
                            ? "bg-blue-300"
                            : intensity === 2
                            ? "bg-blue-200"
                            : intensity === 1
                            ? "bg-blue-100"
                            : "bg-slate-200/50"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Hours & Late Tasks */}
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <span className="font-mono font-bold text-xs text-slate-900 block">14h</span>
                      <span className="text-[10px] text-amber-600 bg-amber-50 px-1 rounded font-semibold">6 tasks (3 late)</span>
                    </div>
                  </div>
                </div>

                {/* Person 3: Chloe Bennett */}
                <div className="p-2.5 rounded-xl border border-slate-200/70 bg-slate-50/30 flex items-center justify-between gap-2 hover:bg-slate-50/70 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-[120px]">
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0">
                      CB
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">Chloe Bennett</h4>
                      <span className="text-[10px] text-slate-400">Design Systems & Tokens</span>
                    </div>
                  </div>

                  {/* 14-day Activity Mini Blocks */}
                  <div className="hidden sm:flex items-center gap-1">
                    {[2, 3, 1, 0, 4, 3, 0, 1, 2, 3, 4, 0, 2, 3].map((intensity, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-5 rounded-xs ${
                          intensity === 4
                            ? "bg-[#3F72AF]"
                            : intensity === 3
                            ? "bg-blue-300"
                            : intensity === 2
                            ? "bg-blue-200"
                            : intensity === 1
                            ? "bg-blue-100"
                            : "bg-slate-200/50"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Hours & Late Tasks */}
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <span className="font-mono font-bold text-xs text-slate-900 block">9.5h</span>
                      <span className="text-[10px] text-amber-600 bg-amber-50 px-1 rounded font-semibold">6 tasks (2 late)</span>
                    </div>
                  </div>
                </div>

                {/* Throughput Summary Sub-card */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between mt-1">
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Completed</span>
                      <span className="text-base font-bold text-slate-900 font-mono">10</span>
                    </div>
                    <div className="h-6 w-px bg-slate-200" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Created</span>
                      <span className="text-base font-bold text-slate-900 font-mono">19</span>
                    </div>
                    <div className="h-6 w-px bg-slate-200" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Net Backlog</span>
                      <span className="text-base font-bold text-blue-700 font-mono">+9</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                    Created vs completed trend
                  </span>
                </div>
              </div>

              {/* Bottom Summary Callout */}
              <div className="px-3.5 py-2.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-auto">
                <span className="text-slate-600 font-medium">All crew total: 38.5h logged</span>
                <span className="text-[10px] font-mono text-[#3F72AF] font-bold">Weekends & zero days visible</span>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // FEATURE 03: Client Intelligence / Organizations Portfolio (Exact match to Screenshot 2)
    // -------------------------------------------------------------------------
    if (featureIndex === "03") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5 sm:gap-4 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Header: Organizations & Client Health */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center border border-blue-100">
                  <Building size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">Organizations</h3>
                  <p className="text-[11px] text-slate-400">Client portfolio, LTV & account health</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> 100% Healthy
                </span>
              </div>
            </div>

            {/* Top Stat Summary Grid (Screenshot 2: Total Accounts 4, Pipeline leads 0, Pipeline forecast $0, Attention needed 0) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200/70">
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Total Accounts</span>
                <span className="text-base font-bold text-slate-900 font-mono">4</span>
                <span className="text-[9px] text-emerald-600 font-semibold block">4 active (100%)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200/70">
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Pipeline Leads</span>
                <span className="text-base font-bold text-slate-900 font-mono">0</span>
                <span className="text-[9px] text-slate-400 block">0 proposal sent</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200/70">
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Forecast</span>
                <span className="text-base font-bold text-slate-900 font-mono">$0</span>
                <span className="text-[9px] text-slate-400 block">Weighted prob.</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200/70">
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Attention</span>
                <span className="text-base font-bold text-slate-900 font-mono">0</span>
                <span className="text-[9px] text-emerald-600 font-semibold block">No churn flags</span>
              </div>
            </div>

            {/* CRM Insight Banner from Screenshot 2 */}
            <div className="p-2.5 rounded-xl border border-blue-200/80 bg-blue-50/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-[#3F72AF] shrink-0" />
                <span className="text-slate-700 text-[11px]">
                  <strong>CRM insight:</strong> 4 accounts in your book, 4 active at a <strong>100% conversion rate</strong>.
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#3F72AF] bg-white px-2 py-0.5 rounded border border-blue-200 hidden sm:inline">
                Healthy book
              </span>
            </div>

            {/* Organization Accounts Table (Screenshot 2) */}
            <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-2xs min-h-[240px] flex flex-col justify-between">
              <div className="divide-y divide-slate-100 text-xs">
                {/* Header */}
                <div className="bg-slate-50/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 grid grid-cols-12 gap-2">
                  <span className="col-span-5 sm:col-span-4">Organization</span>
                  <span className="col-span-2 text-center">Status</span>
                  <span className="hidden sm:inline-block sm:col-span-2 text-center">Health</span>
                  <span className="col-span-3 sm:col-span-2 text-right">Amount (LTV)</span>
                  <span className="col-span-2 sm:col-span-2 text-right">Unpaid</span>
                </div>

                {/* Account 1: Nebula Health */}
                <div className="p-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="col-span-5 sm:col-span-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-blue-100 text-[#3F72AF] font-bold text-[10px] flex items-center justify-center shrink-0">
                      NH
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block truncate leading-tight">Nebula Health</span>
                      <span className="text-[10px] text-slate-400 block truncate">Dr. Alexander Hayes</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200/60">
                      Active
                    </span>
                  </div>
                  <div className="hidden sm:flex sm:col-span-2 justify-center items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy
                  </div>
                  <span className="col-span-3 sm:col-span-2 text-right font-mono font-bold text-slate-900">
                    $59,500.00
                  </span>
                  <span className="col-span-2 sm:col-span-2 text-right font-mono text-slate-400">
                    $0.00
                  </span>
                </div>

                {/* Account 2: Kroma Fintech */}
                <div className="p-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="col-span-5 sm:col-span-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-purple-100 text-purple-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                      KF
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block truncate leading-tight">Kroma Fintech</span>
                      <span className="text-[10px] text-slate-400 block truncate">Tariq Mansour</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200/60">
                      Active
                    </span>
                  </div>
                  <div className="hidden sm:flex sm:col-span-2 justify-center items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy
                  </div>
                  <span className="col-span-3 sm:col-span-2 text-right font-mono font-bold text-slate-900">
                    $21,700.00
                  </span>
                  <span className="col-span-2 sm:col-span-2 text-right font-mono text-amber-600 font-bold">
                    $11,300.00
                  </span>
                </div>

                {/* Account 3: Solari Logistics */}
                <div className="p-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="col-span-5 sm:col-span-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                      SL
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block truncate leading-tight">Solari Logistics</span>
                      <span className="text-[10px] text-slate-400 block truncate">David Solari</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200/60">
                      Active
                    </span>
                  </div>
                  <div className="hidden sm:flex sm:col-span-2 justify-center items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy
                  </div>
                  <span className="col-span-3 sm:col-span-2 text-right font-mono font-bold text-slate-900">
                    $14,500.00
                  </span>
                  <span className="col-span-2 sm:col-span-2 text-right font-mono text-amber-600 font-bold">
                    $17,000.00
                  </span>
                </div>

                {/* Account 4: Arcturus Robotics */}
                <div className="p-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="col-span-5 sm:col-span-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                      AR
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block truncate leading-tight">Arcturus Robotics</span>
                      <span className="text-[10px] text-slate-400 block truncate">Evelyn Thorne</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200/60">
                      Active
                    </span>
                  </div>
                  <div className="hidden sm:flex sm:col-span-2 justify-center items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy
                  </div>
                  <span className="col-span-3 sm:col-span-2 text-right font-mono font-bold text-slate-900">
                    $24,700.00
                  </span>
                  <span className="col-span-2 sm:col-span-2 text-right font-mono text-slate-400">
                    $0.00
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="px-3 py-2 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-auto">
                <span className="text-slate-600 font-medium">4 of 4 organizations shown</span>
                <span className="font-mono text-[10px] text-[#3F72AF] font-bold">Portfolio Total: $120,400.00</span>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }
  }

  // =========================================================================
  // CUSTOM EIDONCORE MODULE: AI WORKSPACE
  // =========================================================================
  if (moduleName.toLowerCase().includes("ai")) {
    // -------------------------------------------------------------------------
    // FEATURE 01: Model Context Protocol (MCP) Native (Screenshots 1-5)
    // -------------------------------------------------------------------------
    if (featureIndex === "01") {
      const MCP_MODULES_LIST = [
        { name: "Tasks", desc: "Manage tasks, track time, toggle checklists, and comment", read: 9, write: 9 },
        { name: "Projects", desc: "View project dashboards, track budgets and milestones", read: 6, write: 7 },
        { name: "Invoices", desc: "View invoice history, create new invoices, check financial stats", read: 4, write: 6 },
        { name: "Proposals", desc: "Manage proposals from drafts through sending and acceptance", read: 2, write: 3 },
        { name: "Clients", desc: "CRM operations — view client organizations, add notes, schedule", read: 3, write: 7 },
        { name: "Tickets", desc: "Manage support tickets — view, create, reply, and update", read: 4, write: 6 },
        { name: "Reports", desc: "Agency-wide dashboards — project health, task velocity, analytics", read: 8, write: 0 },
        { name: "Messaging", desc: "Access team and client chat — channels, messages, and threads", read: 3, write: 2 },
        { name: "Services", desc: "Browse the service catalog and manage client offerings", read: 3, write: 2 },
        { name: "Files", desc: "Browse file metadata, attachments, and cloud storage", read: 2, write: 1 },
        { name: "Search", desc: "Universal search — find tasks, projects, contacts, and docs", read: 1, write: 0 },
        { name: "Dashboard", desc: "Executive briefings — KPIs, project health, and activity", read: 3, write: 0 },
        { name: "Team", desc: "Team management — member profiles, workloads, and roles", read: 4, write: 0 },
        { name: "Automations", desc: "Workflow automation — view workflows, triggers, and runs", read: 3, write: 2 },
        { name: "Client Reports", desc: "Generate and send professional client status summaries", read: 1, write: 2 },
        { name: "Notifications", desc: "View and manage your in-app and delivery notifications", read: 2, write: 1 },
        { name: "Templates", desc: "Browse project templates, document scopes, and presets", read: 2, write: 1 },
        { name: "Recurring Invoices", desc: "View and create recurring retainer billing schedules", read: 1, write: 1 },
        { name: "Settings", desc: "View workspace configuration — profile, security, branding", read: 1, write: 0 },
        { name: "Email", desc: "Client email threads linked to workspaces and tickets", read: 3, write: 1 },
      ];

      const filteredMcpModules = MCP_MODULES_LIST.filter(
        (m) =>
          m.name.toLowerCase().includes(mcpToolSearch.toLowerCase()) ||
          m.desc.toLowerCase().includes(mcpToolSearch.toLowerCase())
      );

      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Top Bar with MCP Architecture Header & Tab Switcher */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#3F72AF] flex items-center justify-center border border-indigo-100">
                  <Shield size={17} className="text-[#3F72AF]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">MCP AI Connector</h3>
                    <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      OAuth 2.1 PKCE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Model Context Protocol Server & Security</p>
                </div>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/80 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setMcpActiveTab("overview")}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    mcpActiveTab === "overview"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Overview & Modules
                </button>
                <button
                  type="button"
                  onClick={() => setMcpActiveTab("connection")}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    mcpActiveTab === "connection"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Server & Security
                </button>
                <button
                  type="button"
                  onClick={() => setMcpActiveTab("tools")}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    mcpActiveTab === "tools"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  116 Tools
                </button>
                <button
                  type="button"
                  onClick={() => setMcpActiveTab("governance")}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    mcpActiveTab === "governance"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Roles & Guardrails
                </button>
              </div>
            </div>

            {/* Container Body with Equalized Min-Height */}
            <div className="bg-slate-50/50 rounded-xl border border-slate-200/70 overflow-hidden flex flex-col min-h-[440px]">
              {/* TAB 1: OVERVIEW & EXPOSED MODULES (Screenshot 5: media_...8ada9222.png) */}
              {mcpActiveTab === "overview" && (
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col gap-3 text-xs">
                  {/* Top Header Card */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-indigo-50 text-[#3F72AF] flex items-center justify-center">
                          <Sparkles size={13} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs">AI Connector</span>
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.2 rounded-full border border-emerald-200 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Enabled
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Connect AI assistants like Claude and Cursor via Model Context Protocol (MCP).
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMcpConnectorEnabled(!mcpConnectorEnabled)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors cursor-pointer ${
                          mcpConnectorEnabled
                            ? "border-rose-200 text-rose-600 bg-rose-50/50 hover:bg-rose-50"
                            : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                        }`}
                      >
                        {mcpConnectorEnabled ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </div>

                  {/* 3 Overview Stat Cards */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Active Sessions</span>
                      <span className="text-base font-extrabold text-slate-900 block mt-0.5">0</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Actions (30d)</span>
                      <span className="text-base font-extrabold text-slate-900 block mt-0.5">0</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Plan</span>
                      <span className="text-xs font-bold text-slate-900 block mt-1 tracking-tight truncate">ENTERPRISE_LTD</span>
                    </div>
                  </div>

                  {/* Exposed Modules Section */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex-1 flex flex-col">
                    <div className="pb-2 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">Exposed Modules</span>
                        <span className="text-[10px] text-slate-400">8 of 8 enabled</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Control which data modules AI assistants can access. Unchecking a module hides its tools from connected sessions.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5 max-h-[175px] overflow-y-auto pr-1">
                      {[
                        { id: "tasks", name: "Tasks", desc: "Manage tasks, track time, toggle checklists, and comments" },
                        { id: "projects", name: "Projects", desc: "View dashboards, track budgets, milestones, and updates" },
                        { id: "invoices", name: "Invoices", desc: "View invoice history, create invoices, check stats" },
                        { id: "proposals", name: "Proposals", desc: "Manage drafts, proposals, scope, timeline, and terms" },
                        { id: "clients", name: "Clients", desc: "CRM operations — client orgs, notes, and communications" },
                        { id: "tickets", name: "Tickets", desc: "Support tickets — view, reply, and update status" },
                        { id: "reports", name: "Reports", desc: "Agency analytics, financial summaries, and velocity" },
                        { id: "messaging", name: "Messaging", desc: "Access team and client chat — channels and messages" },
                      ].map((mod) => {
                        const isEnabled = mcpExposedModules[mod.id] ?? true;
                        return (
                          <div
                            key={mod.id}
                            onClick={() =>
                              setMcpExposedModules({ ...mcpExposedModules, [mod.id]: !isEnabled })
                            }
                            className={`p-2 rounded-lg border transition-all cursor-pointer flex items-start gap-2 ${
                              isEnabled
                                ? "bg-slate-50/70 border-slate-200"
                                : "bg-slate-50/30 border-slate-200/50 opacity-60"
                            }`}
                          >
                            <div
                              className={`w-7 h-4 rounded-full relative transition-colors shrink-0 mt-0.5 ${
                                isEnabled ? "bg-[#3F72AF]" : "bg-slate-300"
                              }`}
                            >
                              <div
                                className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                                  isEnabled ? "left-3.5" : "left-0.5"
                                }`}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="font-bold text-slate-900 text-[11px] block">{mod.name}</span>
                              <span className="text-[10px] text-slate-500 line-clamp-1 leading-tight">{mod.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SERVER & SECURITY (Screenshots 1 & 4: media_...6565442a.png & media_...ea486fed.png) */}
              {mcpActiveTab === "connection" && (
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col gap-3 text-xs">
                  {/* Connection Details Card */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="font-bold text-slate-900 text-xs block">Connection Details</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Use this URL in your MCP client configuration. Authentication is handled via OAuth — your AI tool will prompt you to sign in.
                    </p>

                    <div className="mt-2.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        MCP SERVER URL
                      </span>
                      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono text-[11px] text-slate-800">
                        <span className="truncate">https://aetheris-studio.eidoncore.com/api/mcp</span>
                        <button
                          type="button"
                          onClick={() => {
                            setMcpCopied(true);
                            setTimeout(() => setMcpCopied(false), 2000);
                          }}
                          className="ml-2 px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-sans font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
                        >
                          {mcpCopied ? (
                            <>
                              <Check size={11} className="text-emerald-600" />
                              <span className="text-emerald-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} className="text-slate-400" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Compatible AI Tools Grid */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="font-bold text-slate-900 text-xs block mb-2">Compatible AI Tools</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200 flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-4 h-4 rounded bg-amber-100 text-amber-700 font-bold text-[9px] flex items-center justify-center">
                            C
                          </span>
                          <span className="font-bold text-slate-900 text-[11px]">Claude</span>
                        </div>
                        <span className="text-[9px] text-slate-500">Anthropic AI Assistant</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200 flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-4 h-4 rounded bg-blue-100 text-blue-700 font-bold text-[9px] flex items-center justify-center">
                            C
                          </span>
                          <span className="font-bold text-slate-900 text-[11px]">Cursor</span>
                        </div>
                        <span className="text-[9px] text-slate-500">AI Code Editor</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200 flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-4 h-4 rounded bg-emerald-100 text-emerald-700 font-bold text-[9px] flex items-center justify-center">
                            W
                          </span>
                          <span className="font-bold text-slate-900 text-[11px]">Windsurf</span>
                        </div>
                        <span className="text-[9px] text-slate-500">Agentic IDE (Codeium)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200 flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-4 h-4 rounded bg-purple-100 text-purple-700 font-bold text-[9px] flex items-center justify-center">
                            A
                          </span>
                          <span className="font-bold text-slate-900 text-[11px]">Any MCP</span>
                        </div>
                        <span className="text-[9px] text-slate-500">Open Protocol Client</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Architecture 4-Pillars */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex-1">
                    <span className="font-bold text-slate-900 text-xs block mb-2">Enterprise Security</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="flex items-start gap-2 p-1.5 rounded-lg bg-slate-50/60 border border-slate-200/60">
                        <Shield size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900 block text-[11px]">OAuth 2.1 with PKCE</span>
                          <span className="text-[10px] text-slate-500 leading-tight">No raw API keys stored in config files</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-1.5 rounded-lg bg-slate-50/60 border border-slate-200/60">
                        <Shield size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900 block text-[11px]">Live Permission Enforcement</span>
                          <span className="text-[10px] text-slate-500 leading-tight">Revocations take effect instantly on every call</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-1.5 rounded-lg bg-slate-50/60 border border-slate-200/60">
                        <Shield size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900 block text-[11px]">Full Audit Trail</span>
                          <span className="text-[10px] text-slate-500 leading-tight">Every tool call logged with action, user & input</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-1.5 rounded-lg bg-slate-50/60 border border-slate-200/60">
                        <Shield size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900 block text-[11px]">Token Rotation</span>
                          <span className="text-[10px] text-slate-500 leading-tight">Refresh tokens are single-use and auto-revoked</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: 116 MODULE TOOLS REFERENCE (Screenshot 3: media_...c4864046.png) */}
              {mcpActiveTab === "tools" && (
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col gap-2.5 text-xs">
                  {/* Header & Live Filter Input */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">Module Reference</span>
                        <span className="bg-blue-50 text-[#3F72AF] font-bold text-[10px] px-2 py-0.2 rounded-full border border-blue-200">
                          116 tools
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">Click any module to inspect tools</span>
                    </div>

                    <div className="mt-2.5 flex items-center bg-slate-50 rounded-lg border border-slate-200 px-2.5 py-1.5 text-slate-400 text-xs">
                      <Search size={12} className="text-slate-400 mr-2 shrink-0" />
                      <input
                        type="text"
                        value={mcpToolSearch}
                        onChange={(e) => setMcpToolSearch(e.target.value)}
                        placeholder="Search modules or tools..."
                        className="bg-transparent border-none outline-none text-slate-800 text-[11px] placeholder:text-slate-400 w-full"
                      />
                      {mcpToolSearch && (
                        <button
                          type="button"
                          onClick={() => setMcpToolSearch("")}
                          className="text-slate-400 hover:text-slate-600 text-[10px] font-bold ml-1"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Modules Grid */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex-1 max-h-[300px] overflow-y-auto pr-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filteredMcpModules.map((item) => (
                        <div
                          key={item.name}
                          className="p-2.5 rounded-lg border border-slate-200/70 hover:border-[#3F72AF]/40 hover:bg-slate-50/70 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="min-w-0 flex-1 pr-2">
                            <span className="font-bold text-slate-900 text-[11px] group-hover:text-[#3F72AF] transition-colors block">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-slate-500 block truncate">{item.desc}</span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {item.read}R
                            </span>
                            {item.write > 0 && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                {item.write}W
                              </span>
                            )}
                            <ChevronRight size={12} className="text-slate-300 group-hover:text-slate-600 transition-colors ml-0.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: ROLES & GUARDRAILS (Screenshot 2: media_...e70f5474.png) */}
              {mcpActiveTab === "governance" && (
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col gap-3 text-xs">
                  {/* Eligible Roles */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="pb-1.5 border-b border-slate-100">
                      <span className="font-bold text-slate-900 text-xs block">Eligible Roles</span>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                        Choose which agency roles can connect AI assistants. Ineligible roles are refused at authorization. Client portal users can never connect.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2.5">
                      {[
                        { id: "owner", label: "Owner", val: mcpRoleOwner, setter: setMcpRoleOwner },
                        { id: "admin", label: "Admin", val: mcpRoleAdmin, setter: setMcpRoleAdmin },
                        { id: "pm", label: "Project Manager", val: mcpRolePM, setter: setMcpRolePM },
                        { id: "accountant", label: "Accountant", val: mcpRoleAccountant, setter: setMcpRoleAccountant },
                        { id: "team", label: "Team Member", val: mcpRoleTeam, setter: setMcpRoleTeam },
                      ].map((role) => (
                        <div
                          key={role.id}
                          onClick={() => role.setter(!role.val)}
                          className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-200/80 cursor-pointer"
                        >
                          <div
                            className={`w-6 h-3.5 rounded-full relative transition-colors shrink-0 ${
                              role.val ? "bg-[#3F72AF]" : "bg-slate-300"
                            }`}
                          >
                            <div
                              className={`w-2.5 h-2.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                                role.val ? "left-3" : "left-0.5"
                              }`}
                            />
                          </div>
                          <span className="font-semibold text-slate-800 text-[11px] truncate">{role.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Instructions System Prompt */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex-1 flex flex-col">
                    <span className="font-bold text-slate-900 text-xs block">AI Instructions (System Prompt)</span>
                    <p className="text-[10px] text-slate-500 mt-0.5 mb-2 leading-relaxed">
                      Provide workspace-level instructions for AI assistants. Included in every AI session to enforce tone and workflows.
                    </p>

                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-sans text-[11px] text-slate-700 leading-relaxed flex-1">
                      You are the AI copilot for Aetheris Creative Studio. Maintain enterprise-grade precision, adhere strictly to brand design systems, and assist with client delivery.
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                      <span>Injected via system prompt header</span>
                      <span>163 / 2,000 characters</span>
                    </div>
                  </div>

                  {/* Rate Limiting */}
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-xs block">Tool calls rate limit</span>
                      <span className="text-[10px] text-slate-400">Lower values protect database load</span>
                    </div>
                    <div className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>10 / min</span>
                      <ChevronDown size={11} className="text-slate-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // FEATURE 02: Full Workspace Actions (Screenshots 1, 2, 3, 4, 5)
    // -------------------------------------------------------------------------
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3 sm:gap-3.5 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Top Bar with AI Copilot Header & Mode Switcher */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#3F72AF] flex items-center justify-center border border-indigo-100">
                  <Bot size={17} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">AI Copilot</h3>
                    <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                      Admin
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Full Workspace Actions & Slash Commands</p>
                </div>
              </div>

              {/* Mode Switcher Tabs matching screenshots */}
              <div className="flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/80 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAiWorkspaceMode("slash_tools")}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    aiWorkspaceMode === "slash_tools"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  / Slash Tools
                </button>
                <button
                  type="button"
                  onClick={() => setAiWorkspaceMode("actions")}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    aiWorkspaceMode === "actions"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Actions
                </button>
                <button
                  type="button"
                  onClick={() => setAiWorkspaceMode("query_unbilled")}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer hidden sm:inline-block ${
                    aiWorkspaceMode === "query_unbilled"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Hours Audit
                </button>
                <button
                  type="button"
                  onClick={() => setAiWorkspaceMode("query_health")}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer hidden sm:inline-block ${
                    aiWorkspaceMode === "query_health"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Health
                </button>
              </div>
            </div>

            {/* Container with Equalized Height for all AI Views */}
            <div className="border border-slate-200/90 rounded-xl bg-white shadow-2xs overflow-hidden min-h-[385px] flex flex-col justify-between">
              {aiWorkspaceMode === "slash_tools" && (
                /* VIEW 1: SLASH TOOLS POPOVER MENU (Screenshot 1) */
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-slate-50/20">
                  <div className="flex flex-col gap-2.5">
                    {/* Previous message context summary */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                      <p className="text-[11px] text-slate-600">
                        Regarding overall project progress, three projects are currently in progress (<em>Nebula Telehealth 2.0</em>, <em>Solari Fleet Telematics</em>, and <em>Kroma Mobile SDK</em>), one is completed (<em>Aetheris Design System v3</em>), and one is not yet started (<em>Arcturus Brand Identity</em>).
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <span className="text-[9px] text-slate-400 font-mono">Sources (15 checked):</span>
                        <span className="text-[9px] font-medium bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">Nebula Telehealth 2.0</span>
                        <span className="text-[9px] font-medium bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">Kroma Mobile SDK</span>
                        <span className="text-[9px] font-medium bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">Solari Fleet</span>
                      </div>
                    </div>

                    {/* Slash Command / Tools Popover Menu (Exact match to Screenshot 1) */}
                    <div className="border border-slate-200 rounded-xl bg-white shadow-lg overflow-hidden -mt-1">
                      <div className="px-3 py-1.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span>Tools & Shortcuts</span>
                        <span className="font-mono text-slate-500 font-normal">Press / to trigger</span>
                      </div>

                      <div className="divide-y divide-slate-100 text-xs">
                        {/* Tool 1: Task breakdown */}
                        <div
                          onClick={() => setAiWorkspaceMode("actions")}
                          className="px-3 py-2 flex items-center justify-between hover:bg-blue-50/40 cursor-pointer group transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <CheckSquare size={13} className="text-[#3F72AF]" />
                            <div>
                              <span className="font-bold text-slate-900 group-hover:text-[#3F72AF] transition-colors">
                                Task breakdown
                              </span>
                              <span className="text-[10px] text-slate-400 ml-1.5 hidden sm:inline">
                                Plan a task with a checklist
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded group-hover:bg-blue-100 group-hover:text-[#3F72AF]">
                            /task
                          </span>
                        </div>

                        {/* Tool 2: Ticket triage */}
                        <div
                          onClick={() => setAiWorkspaceMode("actions")}
                          className="px-3 py-2 flex items-center justify-between hover:bg-blue-50/40 cursor-pointer group transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <LifeBuoy size={13} className="text-rose-500" />
                            <div>
                              <span className="font-bold text-slate-900 group-hover:text-[#3F72AF] transition-colors">
                                Ticket triage
                              </span>
                              <span className="text-[10px] text-slate-400 ml-1.5 hidden sm:inline">
                                Classify and draft a reply
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded group-hover:bg-blue-100 group-hover:text-[#3F72AF]">
                            /triage
                          </span>
                        </div>

                        {/* Tool 3: Polish message */}
                        <div
                          onClick={() => setAiWorkspaceMode("actions")}
                          className="px-3 py-2 flex items-center justify-between hover:bg-blue-50/40 cursor-pointer group transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <MessageSquare size={13} className="text-emerald-500" />
                            <div>
                              <span className="font-bold text-slate-900 group-hover:text-[#3F72AF] transition-colors">
                                Polish message
                              </span>
                              <span className="text-[10px] text-slate-400 ml-1.5 hidden sm:inline">
                                Rewrite in the right tone
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded group-hover:bg-blue-100 group-hover:text-[#3F72AF]">
                            /polish
                          </span>
                        </div>

                        {/* Tool 4: Proposal draft */}
                        <div
                          onClick={() => setAiWorkspaceMode("actions")}
                          className="px-3 py-2 flex items-center justify-between hover:bg-blue-50/40 cursor-pointer group transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <FileText size={13} className="text-indigo-500" />
                            <div>
                              <span className="font-bold text-slate-900 group-hover:text-[#3F72AF] transition-colors">
                                Proposal draft
                              </span>
                              <span className="text-[10px] text-slate-400 ml-1.5 hidden sm:inline">
                                Scope, deliverables and pricing
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded group-hover:bg-blue-100 group-hover:text-[#3F72AF]">
                            /proposal
                          </span>
                        </div>

                        {/* Tool 5: Invoice draft */}
                        <div
                          onClick={() => setAiWorkspaceMode("actions")}
                          className="px-3 py-2 flex items-center justify-between hover:bg-blue-50/40 cursor-pointer group transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Receipt size={13} className="text-amber-500" />
                            <div>
                              <span className="font-bold text-slate-900 group-hover:text-[#3F72AF] transition-colors">
                                Invoice draft
                              </span>
                              <span className="text-[10px] text-slate-400 ml-1.5 hidden sm:inline">
                                Line items from unbilled work
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded group-hover:bg-blue-100 group-hover:text-[#3F72AF]">
                            /invoice
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input Box with active '/' trigger */}
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <div className="relative flex items-center bg-white rounded-xl border border-blue-400 ring-2 ring-blue-100 px-3 py-2">
                      <span className="font-mono text-xs font-bold text-[#3F72AF]">/</span>
                      <span className="inline-block w-0.5 h-3.5 bg-[#3F72AF] animate-pulse ml-0.5" />
                      <span className="text-xs text-slate-400 ml-1.5">Type a command or ask anything...</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <span className="font-mono text-[9px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          Enter to select
                        </span>
                        <div className="w-6 h-6 rounded-lg bg-[#3F72AF] text-white flex items-center justify-center">
                          <Send size={11} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {aiWorkspaceMode === "actions" && (
                /* VIEW 2: SUGGESTED ONE-CLICK ACTIONS (Screenshot 2) */
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <p className="leading-relaxed">
                        Workspace health audit complete. <strong>3 projects active</strong>, <strong>1 overdue invoice ($4,800)</strong>, and <strong>15 tasks require attention</strong>.
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Suggested Actions
                      </span>
                      <div className="flex flex-col gap-2">
                        {/* Action 1: View All Projects */}
                        <div className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-[#3F72AF] hover:bg-blue-50/20 transition-all flex items-center justify-between cursor-pointer group shadow-2xs">
                          <div className="flex items-center gap-2.5">
                            <ArrowRight size={14} className="text-[#3F72AF] group-hover:translate-x-0.5 transition-transform" />
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#3F72AF] transition-colors">
                                View All Projects
                              </h4>
                              <span className="text-[10px] text-slate-400">Opens project flightdeck</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-[#3F72AF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                            Open
                          </span>
                        </div>

                        {/* Action 2: View Invoices & Billing */}
                        <div className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-[#3F72AF] hover:bg-blue-50/20 transition-all flex items-center justify-between cursor-pointer group shadow-2xs">
                          <div className="flex items-center gap-2.5">
                            <ArrowRight size={14} className="text-[#3F72AF] group-hover:translate-x-0.5 transition-transform" />
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#3F72AF] transition-colors">
                                View Invoices & Billing
                              </h4>
                              <span className="text-[10px] text-slate-400">Inspect $4,800 overdue invoice</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-[#3F72AF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                            Open
                          </span>
                        </div>

                        {/* Action 3: Review Overdue Tasks */}
                        <div className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-[#3F72AF] hover:bg-blue-50/20 transition-all flex items-center justify-between cursor-pointer group shadow-2xs">
                          <div className="flex items-center gap-2.5">
                            <ArrowRight size={14} className="text-[#3F72AF] group-hover:translate-x-0.5 transition-transform" />
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#3F72AF] transition-colors">
                                Update Arcturus Project Status
                              </h4>
                              <span className="text-[10px] text-slate-400">Review deliverables and timeline</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-[#3F72AF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                            Open
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick follow-up prompt chips */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Ask Follow-up
                      </span>
                      <div className="flex flex-col gap-1 text-xs">
                        <button
                          type="button"
                          onClick={() => setAiWorkspaceMode("query_unbilled")}
                          className="text-left px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-between text-[11px]"
                        >
                          <span>What are the team members' unbilled hours?</span>
                          <ArrowRight size={11} className="text-slate-400" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setAiWorkspaceMode("query_health")}
                          className="text-left px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-between text-[11px]"
                        >
                          <span>Show me the budget and burn rate for Nebula Telehealth 2.0</span>
                          <ArrowRight size={11} className="text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Input Box */}
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-400">
                      <span>Ask a follow-up question or give an instruction...</span>
                      <div className="ml-auto w-6 h-6 rounded-lg bg-[#3F72AF] text-white flex items-center justify-center">
                        <Send size={11} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {aiWorkspaceMode === "query_unbilled" && (
                /* VIEW 3: UNBILLED HOURS AUDIT QUERY (Screenshot 3) */
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between text-xs">
                  <div className="flex flex-col gap-3">
                    {/* User Prompt Bubble */}
                    <div className="flex justify-end">
                      <div className="bg-[#3F72AF] text-white px-3 py-2 rounded-2xl rounded-tr-xs max-w-xs text-xs font-medium shadow-2xs">
                        Can you show me the unbilled hours for Amara Okafor?
                      </div>
                    </div>

                    {/* Copilot Response Bubble */}
                    <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-2xl rounded-tl-xs border border-slate-200 text-slate-800">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                        <Sparkles size={12} className="text-[#3F72AF]" />
                        <span className="font-bold text-slate-900">Copilot</span>
                        <span>05:46 PM</span>
                      </div>
                      <p className="leading-relaxed text-[11px] text-slate-600">
                        As an Admin, you have full access to team time tracking. Amara Okafor has logged a total of <strong>65.0 unbilled hours</strong> across the following tasks:
                      </p>

                      <div className="divide-y divide-slate-200/60 border border-slate-200 rounded-lg bg-white overflow-hidden text-[11px] mt-1">
                        <div className="p-2 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900">Nebula Telehealth 2.0 Core</span>
                            <span className="text-[10px] text-slate-500 block">Encrypted WebRTC consultation room UI</span>
                          </div>
                          <span className="font-mono font-bold text-[#3F72AF]">28.0h</span>
                        </div>
                        <div className="p-2 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900">Kroma Mobile SDK</span>
                            <span className="text-[10px] text-slate-500 block">Realtime WebSocket transaction feed</span>
                          </div>
                          <span className="font-mono font-bold text-[#3F72AF]">22.0h</span>
                        </div>
                        <div className="p-2 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900">Kroma Mobile SDK</span>
                            <span className="text-[10px] text-slate-500 block">Stripe PaymentSheet & Apple Pay integration</span>
                          </div>
                          <span className="font-mono font-bold text-[#3F72AF]">15.0h</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-400">Total Billable Amount: <strong className="text-slate-900 font-mono">$6,422.00</strong></span>
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-md bg-[#3F72AF] text-white text-[10px] font-bold hover:bg-[#325a8d] flex items-center gap-1 shadow-2xs"
                        >
                          <Receipt size={10} /> Draft Invoice
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Input Box */}
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-400">
                      <span>Ask a follow-up question or give an instruction...</span>
                      <div className="ml-auto w-6 h-6 rounded-lg bg-[#3F72AF] text-white flex items-center justify-center">
                        <Send size={11} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {aiWorkspaceMode === "query_health" && (
                /* VIEW 4: TASK HEALTH & OVERDUE WORKSPACE SCAN (Screenshots 4 & 5) */
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between text-xs">
                  <div className="flex flex-col gap-2.5">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">Milestones & Deliverables Health</span>
                        <span className="text-[10px] font-mono text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 font-bold">
                          15 Overdue Tasks
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] my-1">
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <span className="text-[10px] text-slate-400 block font-medium">Completed Milestones</span>
                          <span className="font-bold text-slate-900 block mt-0.5">Phase 1 Complete</span>
                          <span className="text-[9px] text-emerald-600 font-semibold">Across all 5 projects</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <span className="text-[10px] text-slate-400 block font-medium">Task Health</span>
                          <span className="font-bold text-slate-900 block mt-0.5">28 Open Tasks</span>
                          <span className="text-[9px] text-amber-600 font-semibold">53% overdue items</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        High volume of overdue tasks detected on <em>Kroma Mobile SDK</em> and <em>Nebula Telehealth 2.0</em>. Suggesting deadline adjustments or resource reallocation.
                      </p>

                      <div className="flex items-center gap-2 pt-1 border-t border-slate-200/80">
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-md bg-[#3F72AF] text-white text-[10px] font-bold hover:bg-[#325a8d]"
                        >
                          Auto-reallocate Assignees
                        </button>
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-semibold hover:bg-slate-50"
                        >
                          Adjust Milestones +7d
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Input Box */}
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-400">
                      <span>Ask a follow-up question or give an instruction...</span>
                      <div className="ml-auto w-6 h-6 rounded-lg bg-[#3F72AF] text-white flex items-center justify-center">
                        <Send size={11} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </BlendMockupCard>
        </div>
      );
    }
  }

  // =========================================================================
  // CUSTOM EIDONCORE MODULE: PROPOSALS
  // =========================================================================
  if (moduleName.toLowerCase().includes("proposal")) {
    const addonsData = [
      {
        id: "fintech",
        title: "Fintech Compliance & Payment Flow Audit",
        h3: "Maximize payment success rates while ensuring rigorous financial compliance",
        p: "Deep technical and UX audit covering card authorization rates, alternative payment methods, and fraud mitigation friction.",
        price: 7500,
      },
      {
        id: "webrtc",
        title: "WebRTC Video Consultation Infrastructure",
        h3: "Medical-grade, low-latency video and audio consultation architecture",
        p: "Engineered for telehealth providers, financial client consultations, and secure enterprise communications.",
        price: 18500,
      },
      {
        id: "qa_retainer",
        title: "Monthly Design QA & Accessibility Maintenance Retainer",
        h3: "Continuous quality assurance to guarantee your product stays accessible and pixel-perfect",
        p: "Prevent visual regressions and accessibility legal liabilities with continuous monthly audits by our specialized QA team.",
        price: 3200,
      },
      {
        id: "robotics",
        title: "Autonomous Robotics Fleet Web Console UI",
        h3: "Real-time mission control for autonomous warehouse rovers and robotics fleets",
        p: "High-frequency WebGL telemetry visualization designed for industrial robotics operators and fleet safety engineers.",
        price: 28000,
      },
      {
        id: "starter_kit",
        title: "Next.js SaaS Application Starter Kit",
        h3: "Ship your B2B SaaS product in days instead of months",
        p: "Pre-architected SaaS foundation with team collaboration, subscription tiering, and role-based permissions.",
        price: 850,
      },
      {
        id: "uikit",
        title: "Aetheris Pro UI Kit & Tokens (Figma + Code)",
        h3: "The definitive UI design system kit for modern SaaS applications",
        p: "Instant download package includes Figma master files, React components, Tailwind configuration, and token JSONs.",
        price: 1200,
      },
    ];

    const baseProposalPrice = 32000;
    const currentAddonsSum = addonsData.reduce((acc, item) => {
      return selectedAddons[item.id] ? acc + item.price : acc;
    }, 0);
    const totalProposalPrice = baseProposalPrice + currentAddonsSum;

    // -------------------------------------------------------------------------
    // FEATURE 01: Let Clients Select Add-Ons Before Signing (Screenshots 2 & 3)
    // -------------------------------------------------------------------------
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Top Workspace Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#4F46E5] flex items-center justify-center border border-indigo-100 shrink-0 font-bold text-xs">
                  A
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">Aetheris Creative Studio</h3>
                    <span className="font-mono text-[9.5px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-semibold">
                      #PROP-002
                    </span>
                  </div>
                  <p className="text-[10.5px] text-[#64748B] flex items-center gap-1.5 mt-0.5">
                    <Clock size={11} className="text-slate-400" />
                    <span>Valid until Nov 12, 2026</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold border border-slate-200 rounded-lg text-slate-700 bg-white hover:bg-slate-50 shadow-2xs transition-colors"
                >
                  <Printer size={12} className="text-slate-500" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Accept & Sign Proposal Modal (Matches Screenshots 2 & 3) */}
            <div className="border border-slate-200/90 rounded-xl bg-white shadow-2xs p-4 sm:p-5 flex flex-col gap-3.5">
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0F172A] leading-tight">
                    Accept &amp; Sign Proposal
                  </h4>
                  <p className="text-[10.5px] font-mono text-[#64748B] mt-0.5">
                    #PROP-002 — WEB DESIGN &amp; DEVELOPMENT PROPOSAL (Copy)
                  </p>
                </div>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Section Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  Optional Add-ons &amp; Services
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200/60">
                  Interactive Scope Selection
                </span>
              </div>

              {/* Add-ons List */}
              <div className="flex flex-col gap-2.5 max-h-[300px] sm:max-h-[320px] overflow-y-auto pr-1">
                {addonsData.map((item) => {
                  const isChecked = !!selectedAddons[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() =>
                        setSelectedAddons((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))
                      }
                      className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-2.5 ${
                        isChecked
                          ? "border-[#6366F1] bg-[#F5F3FF]/40 ring-1 ring-[#6366F1]/20 shadow-2xs"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                    >
                      {/* Checkbox */}
                      <div
                        className={`w-4 h-4 rounded-[4px] flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? "bg-[#4F46E5] text-white"
                            : "border border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check size={11} strokeWidth={3} />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                            {item.title}
                          </h5>
                          <span className="text-xs sm:text-[13px] font-black text-slate-900 font-mono shrink-0">
                            +${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-slate-700 mt-1 leading-snug">
                          {item.h3}
                        </p>
                        <p className="text-[10.5px] text-slate-500 mt-0.5 leading-relaxed">
                          {item.p}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Recalculated Summary & Acceptance */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                  <div className="flex items-center gap-3 text-slate-600">
                    <span>Base: <b className="text-slate-900 font-mono font-bold">$32,000.00</b></span>
                    <span>Add-ons: <b className="text-indigo-600 font-mono font-bold">+${currentAddonsSum.toLocaleString("en-US", { minimumFractionDigits: 2 })}</b></span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Updated Total</span>
                    <span className="text-sm sm:text-base font-black text-slate-900 font-mono leading-none">
                      ${totalProposalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <label
                  onClick={() => setSignatureAgreed(!signatureAgreed)}
                  className="flex items-start gap-2.5 cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      signatureAgreed
                        ? "bg-[#4F46E5] border-[#4F46E5] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {signatureAgreed && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className="text-[11px] text-slate-600 leading-snug">
                    I confirm that I am legally authorized to sign on behalf of <strong className="font-semibold text-slate-900">Client</strong>, and agree to the terms of this proposal.
                  </span>
                </label>

                {/* Action Button */}
                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl bg-[#4F46E5] hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <PenTool size={13} />
                  <span>Accept &amp; Sign Proposal · ${totalProposalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </button>

                {/* Security Footnote */}
                <div className="text-[10px] text-[#64748B] flex items-center gap-1.5">
                  <Lock size={12} className="text-[#94A3B8] shrink-0" />
                  <span>
                    Your name, signature, account, IP address and the time are recorded with a fingerprint of this proposal as the record of your acceptance.
                  </span>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // FEATURE 02: Full ESIGN & UETA Compliance (Screenshot 1)
    // -------------------------------------------------------------------------
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Top Workspace Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#4F46E5] flex items-center justify-center border border-indigo-100 shrink-0 font-bold text-xs">
                  A
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">Aetheris Creative Studio</h3>
                    <span className="font-mono text-[9.5px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-semibold">
                      #PROP-002
                    </span>
                  </div>
                  <p className="text-[10.5px] text-[#64748B] flex items-center gap-1.5 mt-0.5">
                    <Clock size={11} className="text-slate-400" />
                    <span>Valid until Nov 12, 2026</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono">
                  <Shield size={11} />
                  <span>ESIGN &amp; UETA Compliant</span>
                </span>
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold border border-slate-200 rounded-lg text-slate-700 bg-white hover:bg-slate-50 shadow-2xs transition-colors"
                >
                  <Printer size={12} className="text-slate-500" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Accept & Sign Proposal Modal (Matches Screenshot 1 media_...bca8c4da.png) */}
            <div className="border border-slate-200/90 rounded-xl bg-white shadow-2xs p-4 sm:p-5 flex flex-col gap-3.5">
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0F172A] leading-tight">
                    Accept &amp; Sign Proposal
                  </h4>
                  <p className="text-[10.5px] font-mono text-[#64748B] mt-0.5">
                    #PROP-002 — WEB DESIGN &amp; DEVELOPMENT PROPOSAL (Copy)
                  </p>
                </div>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Selected Add-on Preview (From Screenshot 1) */}
              <div className="p-3 sm:p-3.5 rounded-xl border border-[#6366F1] bg-[#F5F3FF]/40 ring-1 ring-[#6366F1]/20 flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-[4px] bg-[#4F46E5] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} strokeWidth={3} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-xs sm:text-[13px] font-bold text-slate-900 truncate">
                      Aetheris Pro UI Kit &amp; Tokens (Figma + Code)
                    </h5>
                    <span className="text-xs sm:text-[13px] font-black text-slate-900 font-mono shrink-0">
                      +$1,200.00
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700 mt-1 leading-snug">
                    The definitive UI design system kit for modern SaaS applications
                  </p>
                  <p className="text-[10.5px] text-slate-500 mt-0.5 leading-relaxed">
                    Instant download package includes Figma master files, React components, Tailwind configuration, and token JSONs.
                  </p>
                </div>
              </div>

              {/* Section Header: Electronic Signature */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  Electronic Signature <span className="text-red-500">*</span>
                </span>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setProposalSignMode("type")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                      proposalSignMode === "type"
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <span className="font-serif font-bold text-xs">T</span>
                    <span>Type Name</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProposalSignMode("draw")}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                      proposalSignMode === "draw"
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <PenTool size={11} className={proposalSignMode === "draw" ? "text-[#3F72AF]" : ""} />
                    <span>Draw Ink</span>
                  </button>
                </div>
              </div>

              {/* Full legal name input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-slate-700">Full legal name</label>
                <input
                  type="text"
                  value={legalNameInput}
                  onChange={(e) => setLegalNameInput(e.target.value)}
                  placeholder="Type your full legal name"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-2xs"
                />
              </div>

              {/* Signature Drawing Canvas Box */}
              <div className="relative rounded-xl border border-slate-200 bg-slate-50/50 p-4 min-h-[140px] flex items-center justify-center overflow-hidden">
                {/* Clear / Restore button */}
                <button
                  type="button"
                  onClick={() => setSignatureCleared((prev) => !prev)}
                  className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-white border border-slate-200/90 rounded text-[10.5px] font-semibold text-slate-600 hover:text-slate-900 shadow-2xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <X size={11} />
                  <span>{signatureCleared ? "Restore" : "Clear"}</span>
                </button>

                {/* Signature rendered in canvas */}
                {!signatureCleared ? (
                  proposalSignMode === "draw" ? (
                    <svg
                      viewBox="0 0 280 80"
                      className="w-56 sm:w-64 h-16 text-[#0F172A] drop-shadow-2xs select-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M 35 62 C 30 50, 32 30, 42 22 C 50 14, 58 24, 56 42 C 54 58, 48 68, 46 64 C 44 58, 62 38, 70 32 C 78 26, 84 34, 82 46 C 80 56, 92 36, 102 34 C 112 32, 114 44, 116 52 C 118 42, 130 38, 142 38 C 154 38, 162 48, 172 44 C 182 40, 204 36, 218 36" />
                      <path d="M 68 46 Q 130 40, 215 42" strokeWidth="1.8" />
                      <path d="M 172 44 Q 192 18, 222 30 Q 242 38, 258 34" strokeWidth="2.2" />
                    </svg>
                  ) : (
                    <span className="font-serif italic text-3xl sm:text-4xl text-[#0F172A] select-none tracking-wide">
                      {legalNameInput || "Alex Morgan"}
                    </span>
                  )
                ) : (
                  <div className="text-center text-slate-400 text-xs py-4 flex flex-col items-center gap-1">
                    <PenTool size={18} className="text-slate-300" />
                    <span>Click Clear button to restore signature</span>
                  </div>
                )}

                {/* Baseline Guide with X symbol */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 pointer-events-none">
                  <span className="text-slate-400 font-mono text-xs select-none">✕</span>
                  <div className="flex-1 border-b border-dashed border-slate-300" />
                </div>
              </div>

              {/* Authorization agreement checkbox */}
              <label
                onClick={() => setSignatureAgreed(!signatureAgreed)}
                className="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    signatureAgreed
                      ? "bg-[#4F46E5] border-[#4F46E5] text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {signatureAgreed && <Check size={11} strokeWidth={3} />}
                </div>
                <span className="text-[11.5px] text-slate-600 leading-snug">
                  I confirm that I am legally authorized to sign on behalf of <strong className="font-semibold text-slate-900">Client</strong>, and agree to the terms of this proposal.
                </span>
              </label>

              {/* Action Button matching screenshot with toggle for interactive test */}
              <button
                type="button"
                onClick={() => setProposalAccepted(!proposalAccepted)}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  proposalAccepted
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-[#4F46E5] hover:bg-indigo-700 text-white"
                }`}
              >
                {proposalAccepted ? (
                  <>
                    <Check size={14} strokeWidth={3} />
                    <span>Proposal Accepted &amp; Signed · $33,200.00</span>
                  </>
                ) : (
                  <>
                    <PenTool size={13} />
                    <span>Accept &amp; Sign Proposal · $33,200.00</span>
                  </>
                )}
              </button>

              {/* Security Audit Footnote */}
              <div className="text-[10px] text-[#64748B] flex items-center gap-1.5 pt-0.5">
                <Lock size={12} className="text-[#94A3B8] shrink-0" />
                <span>
                  Your name, signature, account, IP address and the time are recorded with a fingerprint of this proposal as the record of your acceptance.
                </span>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // FEATURE 03: Automatically Trigger Deposit & Project (Screenshot 14fa2aab)
    // -------------------------------------------------------------------------
    if (featureIndex === "03") {
      const calculatedDepositAmount = depositEnabled
        ? (31500 * (Number(depositPercentage) || 0)) / 100
        : 0;

      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5 text-slate-800 border border-slate-200/80 shadow-xs">
            {/* Top Workspace Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center border border-blue-100 shrink-0 font-bold text-xs">
                  <FileText size={15} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight truncate max-w-[200px] sm:max-w-xs">
                    WEB DESIGN &amp; DEVELOPMENT PROPOSAL
                  </h3>
                  <p className="text-[10px] text-[#64748B]">Proposal Editor · Automated Triggers &amp; Settings</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="h-6 px-2 rounded-md bg-purple-50 text-purple-700 text-[10px] font-semibold border border-purple-200/60 flex items-center gap-1">
                  <Sparkles size={10} />
                  <span>AI Copilot</span>
                  <span className="font-mono text-[8.5px] bg-white px-1 rounded border border-purple-200">⌘J</span>
                </div>
                <div className="w-6 h-6 rounded-md text-slate-400 hover:bg-slate-100 flex items-center justify-center">
                  <Settings size={12} />
                </div>
              </div>
            </div>

            {/* Proposal Header Bar matching screenshot */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-slate-400 hover:text-slate-700 cursor-pointer">
                  ← Proposals
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Draft
                </span>
                <span className="font-mono text-xs font-semibold text-slate-600">
                  # PROP-001
                </span>
                <span className="font-mono text-xs sm:text-sm font-black text-slate-900">
                  USD 31,500.00
                </span>
                <span className="text-[10px] font-medium text-emerald-600 hidden sm:inline">
                  Saved ✓
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="px-2 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
                >
                  <Eye size={12} className="text-slate-500" />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-lg bg-[#4F46E5] hover:bg-indigo-700 text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs"
                >
                  <Send size={11} />
                  <span>Send</span>
                </button>
              </div>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-4 text-xs border-b border-slate-100 pb-2 text-slate-500">
              <span className="cursor-pointer hover:text-slate-800">Content</span>
              <span className="cursor-pointer hover:text-slate-800 flex items-center gap-1">
                Line Items
                <span className="font-mono text-[9.5px] bg-slate-100 text-slate-600 px-1 rounded-full">3</span>
              </span>
              <span className="font-bold text-[#4F46E5] border-b-2 border-[#4F46E5] pb-2 -mb-2 cursor-pointer">
                Settings
              </span>
              <span className="cursor-pointer hover:text-slate-800 hidden sm:inline">Activity</span>
              <span className="cursor-pointer hover:text-slate-800 hidden sm:inline">Analytics</span>
            </div>

            {/* SETTINGS CARDS CONTAINER */}
            <div className="flex flex-col gap-3">
              {/* CARD 1: Deposit (Matches media_1791915330918_14fa2aab.png) */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-4.5 shadow-2xs flex flex-col gap-3">
                {/* Header with Icon, Title, Subtitle, and Toggle Switch */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5">
                      <Shield size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">Deposit</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Collect upfront payment before starting work
                      </p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => setDepositEnabled(!depositEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                      depositEnabled ? "bg-[#4F46E5]" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                        depositEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Percentage & Calculated Amount */}
                {depositEnabled && (
                  <div className="grid grid-cols-2 gap-4 pt-1 items-end">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                        Percentage
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={depositPercentage}
                          onChange={(e) => setDepositPercentage(Number(e.target.value) || 0)}
                          className="w-16 px-2.5 py-1.5 border border-slate-200 rounded-lg text-sm font-bold text-center text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <span className="text-xs font-semibold text-slate-500">%</span>
                      </div>
                    </div>

                    <div className="text-right sm:text-left">
                      <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                        Calculated Amount
                      </label>
                      <div className="text-lg sm:text-2xl font-black text-emerald-600 font-mono tracking-tight leading-none">
                        USD {calculatedDepositAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Footnote */}
                <div className="pt-2 border-t border-slate-100 text-[10.5px] text-slate-500 leading-relaxed">
                  Auto-calculated from the proposal total. When converted to an invoice, a separate deposit invoice will be created.
                </div>
              </div>

              {/* CARD 2: On Acceptance (Auto-create Project) */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-4.5 shadow-2xs flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0 mt-0.5">
                    <CheckSquare size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">On Acceptance</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      What happens when the client accepts this proposal
                    </p>
                  </div>
                </div>

                {/* Action Dropdown Field */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Do this (Action) <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-800 flex items-center justify-between shadow-2xs">
                    <span className="font-semibold text-slate-900">{acceptanceAction}</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </div>
                </div>

                {/* Footnote */}
                <div className="pt-2 border-t border-slate-100 text-[10.5px] text-slate-500 leading-relaxed">
                  A project will be created automatically when the client accepts.
                </div>
              </div>

              {/* CARD 3: Validity (Peeking) */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60 shrink-0">
                    <Calendar size={13} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 leading-tight">Validity</h5>
                    <p className="text-[10px] text-slate-400">Proposal expires in 30 days if unsigned</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold">
                  30 days
                </span>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }
  }

  // Only apply custom Eidoncore focused cards on /notifications
  if (moduleName.toLowerCase().includes("notif")) {
    // =========================================================================
    // FEATURE 01: Smart Notification Center (Popovers from Screenshot 1 & Screenshot 2)
    // =========================================================================
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-4 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-4">
            {/* Top Bar with Search, AI Copilot, Settings, and Bell Icon */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/70 rounded-lg px-2.5 py-1 text-slate-400 text-xs w-48 sm:w-56">
                <Search size={13} className="text-slate-400 shrink-0" />
                <span className="text-[11px] text-slate-400">Search...</span>
                <span className="ml-auto font-mono text-[10px] bg-white px-1 rounded border border-slate-200 text-slate-400">⌘K</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-7 px-2.5 rounded-lg bg-blue-50/70 border border-blue-200/60 text-[#3F72AF] text-[11px] font-medium flex items-center gap-1.5 shadow-2xs">
                  <Sparkles size={12} className="text-[#3F72AF]" />
                  <span>AI Copilot</span>
                  <span className="font-mono text-[9px] bg-white/80 px-1 rounded text-[#3F72AF] border border-blue-200/50">⌘J</span>
                </div>
                <div className="w-7 h-7 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center cursor-pointer">
                  <Settings size={14} />
                </div>
                {/* Active Bell with Badge */}
                <div className="relative w-7 h-7 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center border border-blue-200/60">
                  <Bell size={14} />
                  <span className="absolute -top-1 -right-1 bg-[#3F72AF] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    9
                  </span>
                </div>
              </div>
            </div>

            {/* Notification Drawer Modal */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xl overflow-hidden text-slate-800">
              {/* Header */}
              <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">Notifications</h3>
                  <span className="bg-blue-50 text-[#3F72AF] font-semibold text-[11px] px-2 py-0.5 rounded-full border border-blue-200/50">
                    9
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" className="text-[11px] font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
                    <CheckCheck size={13} className="text-slate-500" />
                    <span>Mark all read</span>
                  </button>
                  <button type="button" className="text-slate-400 hover:text-slate-700">
                    <Settings size={13} />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-3.5 sm:px-4 py-2 border-b border-slate-100 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setNotificationTab("all")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    notificationTab === "all"
                      ? "bg-blue-50 text-[#3F72AF] border border-blue-200"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setNotificationTab("unread")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    notificationTab === "unread"
                      ? "bg-blue-50 text-[#3F72AF] border border-blue-200"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Unread
                </button>
                <button
                  type="button"
                  onClick={() => setNotificationTab("for_you")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    notificationTab === "for_you"
                      ? "bg-blue-50 text-[#3F72AF] border border-blue-200"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  For you
                </button>
              </div>

              {/* Notification Feed List */}
              <div className="p-3 sm:p-4 flex flex-col gap-2.5 max-h-[440px] overflow-y-auto">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  Earlier
                </div>

                {/* Overdue Invoice Alert */}
                <div className="relative flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:bg-slate-100/70 transition-colors">
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-amber-500 rounded-r" />
                  <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle size={15} />
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 tracking-tight">Invoice #INV-00052 is overdue</h4>
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                      Invoice INV-00052 passed its due date and is now overdue.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block font-mono">2d ago</span>
                  </div>
                </div>

                {/* Member Mention */}
                <div className="relative flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/60 hover:bg-slate-50 transition-colors">
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-blue-500 rounded-r" />
                  <div className="relative shrink-0 mt-0.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      AM
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center text-[9px] border border-white">
                      @
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                        Alex Morgan mentioned you in Internal Tasks
                      </h4>
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      <span className="font-semibold text-slate-800">@Jordan Lee</span> please review the staging payload.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block font-mono">Alex Morgan · 3d ago</span>
                  </div>
                </div>

                {/* Accordion Group: 2 Client replies on tickets */}
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setIsAccordionExpanded((prev) => !prev)}
                    className="w-full p-3 flex items-center justify-between hover:bg-slate-100/60 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shrink-0">
                        <CornerUpLeft size={14} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 tracking-tight">
                          2 client replies on tickets
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">9/25/2026</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                        2
                      </span>
                      {isAccordionExpanded ? (
                        <ChevronUp size={15} className="text-slate-400" />
                      ) : (
                        <ChevronDown size={15} className="text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Nested Child Items */}
                  {isAccordionExpanded && (
                    <div className="pl-6 pr-3 pb-3 pt-1 flex flex-col gap-2 border-t border-slate-100 bg-white/60">
                      {/* Sub-item 1 */}
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-start gap-2.5 shadow-2xs">
                        <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 border border-amber-200/50 flex items-center justify-center shrink-0 mt-0.5">
                          <CornerUpLeft size={12} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">
                              Client replied on TKT-29 (unassigned)
                            </span>
                            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                          </div>
                          <span className="text-[11px] text-slate-500 block">Acme Portal / Canadian Health</span>
                          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">9/25/2026</span>
                        </div>
                      </div>

                      {/* Sub-item 2 */}
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-start gap-2.5 shadow-2xs">
                        <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 border border-amber-200/50 flex items-center justify-center shrink-0 mt-0.5">
                          <CornerUpLeft size={12} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">
                              Client replied on TKT-24 (unassigned)
                            </span>
                            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                          </div>
                          <span className="text-[11px] text-slate-500 block">Nexus App Team</span>
                          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">9/24/2026</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Team member completed task */}
                <div className="relative flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:bg-slate-100/70 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200/60 text-[#3F72AF] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                        Team member completed task: Design System Sync
                      </h4>
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                      &quot;Design System Sync&quot; marked as Done
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block font-mono">9/21/2026</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-center">
                <button
                  type="button"
                  className="text-xs font-semibold text-[#3F72AF] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>View all notifications</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 02: Granular Preferences (Settings Table, Digest Frequency & Quiet Hours)
    // =========================================================================
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-4 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-4 text-slate-800">
            {/* Box 1: Animated Scrolling Viewport between Delivery Methods and Notification Categories */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden relative">

              {/* Scroll Container with Smooth Transition */}
              <div className="relative min-h-[295px] overflow-hidden">
                {/* VIEW A: Delivery Methods (Screenshot from latest user message) */}
                <div
                  className={`transition-all duration-700 ease-in-out ${
                    activeSettingsView === "delivery"
                      ? "opacity-100 translate-y-0 relative z-10"
                      : "opacity-0 -translate-y-6 pointer-events-none absolute inset-0 z-0"
                  }`}
                >
                  <div className="p-3.5 sm:p-4 border-b border-slate-100">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                      Delivery Methods
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Choose how you want to be notified.
                    </p>
                  </div>

                  <div className="divide-y divide-slate-100 text-xs">
                    {/* Delivery Row 1: Email Notifications */}
                    <div className="p-3 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                          <Mail size={15} />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">Email Notifications</div>
                          <div className="text-[11px] text-slate-500">Receive notifications via email</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDeliveryMethods((prev) => ({ ...prev, email: !prev.email }))}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                          deliveryMethods.email ? "bg-[#3F72AF]" : "bg-slate-200"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            deliveryMethods.email ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Delivery Row 2: In-App Notifications */}
                    <div className="p-3 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                          <Bell size={15} />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">In-App Notifications</div>
                          <div className="text-[11px] text-slate-500">Show notifications within the app</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDeliveryMethods((prev) => ({ ...prev, inApp: !prev.inApp }))}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                          deliveryMethods.inApp ? "bg-[#3F72AF]" : "bg-slate-200"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            deliveryMethods.inApp ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Delivery Row 3: Push Notifications */}
                    <div className="p-3 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                          <Laptop size={15} />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">Push Notifications</div>
                          <div className="text-[11px] text-slate-500">Get notified even when the app isn&apos;t open</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDeliveryMethods((prev) => ({ ...prev, push: !prev.push }))}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                          deliveryMethods.push ? "bg-[#3F72AF]" : "bg-slate-200"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            deliveryMethods.push ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* VIEW B: Notification Categories Table */}
                <div
                  className={`transition-all duration-700 ease-in-out ${
                    activeSettingsView === "categories"
                      ? "opacity-100 translate-y-0 relative z-10"
                      : "opacity-0 translate-y-6 pointer-events-none absolute inset-0 z-0"
                  }`}
                >
                  <div className="p-3.5 sm:p-4 border-b border-slate-100">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                      Notification Categories
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Toggle specific notification types. Some categories support scope filtering.
                    </p>
                  </div>

                  {/* Table Column Headers */}
                  <div className="bg-slate-50/70 px-3.5 sm:px-4 py-2 border-b border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span className="w-5/12 sm:w-1/2">Category</span>
                    <span className="w-3/12 sm:w-1/4 text-center">Scope</span>
                    <div className="w-4/12 sm:w-1/4 flex items-center justify-end gap-3 sm:gap-4 pr-1">
                      <span className="flex items-center gap-1">
                        <Mail size={11} />
                        <span>Email</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Bell size={11} />
                        <span>In-App</span>
                      </span>
                    </div>
                  </div>

                  {/* Table Rows */}
                  <div className="divide-y divide-slate-100 text-xs">
                    {/* Row 1: Task assigned to me */}
                    <div className="p-3 sm:px-4 flex items-center justify-between gap-2 hover:bg-slate-50/50 transition-colors">
                      <div className="w-5/12 sm:w-1/2">
                        <div className="font-semibold text-slate-900">Task assigned to me</div>
                        <div className="text-[11px] text-slate-500">When a task is assigned to you</div>
                      </div>
                      <div className="w-3/12 sm:w-1/4 flex justify-center">
                        <div className="h-7 px-2 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-700 flex items-center justify-between gap-1 shadow-2xs">
                          <span>My projects</span>
                          <ChevronDown size={12} className="text-slate-400" />
                        </div>
                      </div>
                      <div className="w-4/12 sm:w-1/4 flex items-center justify-end gap-4 sm:gap-5 pr-1">
                        <button
                          type="button"
                          onClick={() => toggleSetting("taskAssigned", "email")}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                            notifToggles.taskAssigned.email ? "bg-[#3F72AF]" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              notifToggles.taskAssigned.email ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleSetting("taskAssigned", "inApp")}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                            notifToggles.taskAssigned.inApp ? "bg-[#3F72AF]" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              notifToggles.taskAssigned.inApp ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Row 2: Task status changed */}
                    <div className="p-3 sm:px-4 flex items-center justify-between gap-2 hover:bg-slate-50/50 transition-colors">
                      <div className="w-5/12 sm:w-1/2">
                        <div className="font-semibold text-slate-900">Task status changed</div>
                        <div className="text-[11px] text-slate-500">When a task changes status</div>
                      </div>
                      <div className="w-3/12 sm:w-1/4 flex justify-center">
                        <div className="h-7 px-2 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-700 flex items-center justify-between gap-1 shadow-2xs">
                          <span>My projects</span>
                          <ChevronDown size={12} className="text-slate-400" />
                        </div>
                      </div>
                      <div className="w-4/12 sm:w-1/4 flex items-center justify-end gap-4 sm:gap-5 pr-1">
                        <button
                          type="button"
                          onClick={() => toggleSetting("taskStatus", "email")}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                            notifToggles.taskStatus.email ? "bg-[#3F72AF]" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              notifToggles.taskStatus.email ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleSetting("taskStatus", "inApp")}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                            notifToggles.taskStatus.inApp ? "bg-[#3F72AF]" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              notifToggles.taskStatus.inApp ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Row 3: Budget alert */}
                    <div className="p-3 sm:px-4 flex items-center justify-between gap-2 hover:bg-slate-50/50 transition-colors">
                      <div className="w-5/12 sm:w-1/2">
                        <div className="font-semibold text-slate-900">Budget alert</div>
                        <div className="text-[11px] text-slate-500">When reaching 80%+ budget</div>
                      </div>
                      <div className="w-3/12 sm:w-1/4 flex justify-center">
                        <div className="h-7 px-2 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-700 flex items-center justify-between gap-1 shadow-2xs">
                          <span>My projects</span>
                          <ChevronDown size={12} className="text-slate-400" />
                        </div>
                      </div>
                      <div className="w-4/12 sm:w-1/4 flex items-center justify-end gap-4 sm:gap-5 pr-1">
                        <button
                          type="button"
                          onClick={() => toggleSetting("budgetAlert", "email")}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                            notifToggles.budgetAlert.email ? "bg-[#3F72AF]" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              notifToggles.budgetAlert.email ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleSetting("budgetAlert", "inApp")}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                            notifToggles.budgetAlert.inApp ? "bg-[#3F72AF]" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              notifToggles.budgetAlert.inApp ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Digest Frequency (Screenshot 5) */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                  Digest Frequency
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  How often to receive notification summaries. Critical events always send instantly.
                </p>
              </div>
              {/* Segmented Pill Selector */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setDigestFreq("instant")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    digestFreq === "instant"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Zap size={12} className={digestFreq === "instant" ? "text-amber-500 fill-amber-500" : ""} />
                  <span>Instant</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDigestFreq("daily")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    digestFreq === "daily"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Calendar size={12} />
                  <span>Daily</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDigestFreq("weekly")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    digestFreq === "weekly"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Calendar size={12} />
                  <span>Weekly</span>
                </button>
              </div>
            </div>

            {/* Box 3: Quiet Hours (Screenshot 5) */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs flex flex-col gap-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  <Moon size={14} className="text-indigo-500" />
                  <span>Quiet Hours</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Mute non-critical notifications during specified hours (optional). Critical events bypass quiet hours.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <span className="text-[10px] font-medium text-slate-500 block mb-1">Start Time</span>
                  <div className="h-8 px-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center justify-between">
                    <span>22:00</span>
                    <Clock size={12} className="text-slate-400" />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-slate-500 block mb-1">End Time</span>
                  <div className="h-8 px-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center justify-between">
                    <span>08:00</span>
                    <Clock size={12} className="text-slate-400" />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-slate-500 block mb-1">Timezone</span>
                  <div className="h-8 px-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-700 flex items-center justify-between">
                    <span className="truncate">UTC-05:00 Eastern</span>
                    <ChevronDown size={12} className="text-slate-400 shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 03: Client Communication (White-Label SMTP Configuration)
    // Converted to light mode matching Eidoncore design system
    // =========================================================================
    if (featureIndex === "03") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-4 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-4 text-slate-800">
            {/* Header: Title and Enable Toggle */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center border border-blue-200/50">
                  <Mail size={14} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  SMTP Configuration
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Enable</span>
                <button
                  type="button"
                  onClick={() => setSmtpEnabled((prev) => !prev)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                    smtpEnabled ? "bg-[#3F72AF]" : "bg-slate-200"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      smtpEnabled ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Stepper Wizard / Status Pills - Showing Saved and Tested */}
            <div className="flex items-center flex-wrap gap-2 text-xs">
              {/* Step 1: Saved */}
              <div className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>1. Saved (Active webhook)</span>
              </div>
              <ChevronRight size={13} className="text-slate-300" />
              {/* Step 2: Tested */}
              <div className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#3F72AF] font-semibold flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>2. Tested (Verified & Connected)</span>
              </div>
            </div>

            {/* Configuration Form in Clean Light Theme */}
            <div className="flex flex-col gap-3 pt-1 text-xs">
              {/* Row: Provider Dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <label className="sm:w-1/3 font-semibold text-slate-700">Provider</label>
                <div className="sm:w-2/3 h-9 px-3 bg-slate-50/70 border border-slate-200 rounded-lg text-slate-800 flex items-center justify-between shadow-2xs">
                  <span className="font-medium">Resend</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </div>
              </div>

              {/* Row: SMTP Host */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <label className="sm:w-1/3 font-semibold text-slate-700">
                  SMTP Host <span className="text-rose-500">*</span>
                </label>
                <div className="sm:w-2/3 h-9 px-3 bg-slate-50/70 border border-slate-200 rounded-lg text-slate-800 flex items-center font-mono text-[11px] shadow-2xs">
                  <span>smtp.resend.com</span>
                </div>
              </div>

              {/* Row: Port */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <label className="sm:w-1/3 font-semibold text-slate-700">
                  Port <span className="text-rose-500">*</span>
                </label>
                <div className="sm:w-2/3">
                  <div className="w-28 h-9 px-3 bg-slate-50/70 border border-slate-200 rounded-lg text-slate-800 flex items-center font-mono text-[11px] shadow-2xs">
                    <span>465</span>
                  </div>
                </div>
              </div>

              {/* Row: Username */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <label className="sm:w-1/3 font-semibold text-slate-700">
                  Username <span className="text-rose-500">*</span>
                </label>
                <div className="sm:w-2/3 h-9 px-3 bg-slate-50/70 border border-slate-200 rounded-lg text-slate-800 flex items-center font-mono text-[11px] shadow-2xs">
                  <span>resend</span>
                </div>
              </div>

              {/* Row: API Key */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <label className="sm:w-1/3 font-semibold text-slate-700">
                  Resend API Key <span className="text-rose-500">*</span>
                </label>
                <div className="sm:w-2/3 h-9 px-3 bg-slate-50/70 border border-slate-200 rounded-lg text-slate-800 flex items-center justify-between shadow-2xs">
                  <span className="font-mono text-xs tracking-widest text-slate-600">
                    {showApiKey ? "re_1892_sample_key" : "••••••••••••••••••••••••"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowApiKey((prev) => !prev)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>

              {/* Row: Encryption (TLS / SSL toggle) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <label className="sm:w-1/3 font-semibold text-slate-700">Encryption</label>
                <div className="sm:w-2/3 flex items-center gap-1.5">
                  <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setSmtpEncryption("TLS")}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                        smtpEncryption === "TLS"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      TLS
                    </button>
                    <button
                      type="button"
                      onClick={() => setSmtpEncryption("SSL")}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                        smtpEncryption === "SSL"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      SSL
                    </button>
                  </div>
                </div>
              </div>

              {/* Row: From Email */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <label className="sm:w-1/3 font-semibold text-slate-700">
                  From Email <span className="text-rose-500">*</span>
                </label>
                <div className="sm:w-2/3 h-9 px-3 bg-slate-50/70 border border-slate-200 rounded-lg text-slate-800 flex items-center font-mono text-[11px] shadow-2xs">
                  <span>noreply@acme-agency.com</span>
                </div>
              </div>

              {/* Row: Reply-to Email */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <label className="sm:w-1/3 font-semibold text-slate-700">Reply-to Email</label>
                <div className="sm:w-2/3 h-9 px-3 bg-slate-50/70 border border-slate-200 rounded-lg text-slate-800 flex items-center font-mono text-[11px] shadow-2xs">
                  <span>support@acme-agency.com</span>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }
  }

  // Only apply custom Eidoncore focused cards on /services or offerings
  if (moduleName.toLowerCase().includes("offer") || moduleName.toLowerCase().includes("service")) {
    // =========================================================================
    // FEATURE 01: Productized Catalog (Services Catalog Grid - Screenshot 2)
    // =========================================================================
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-4 rounded-2xl w-full min-w-0 flex flex-col gap-3 text-slate-800">
            {/* Top Navigation Bar - Clean & focused */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center border border-blue-200/50">
                  <Box size={14} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Offerings</h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/70 rounded-lg px-2.5 py-1 text-slate-400 text-xs w-40 sm:w-48">
                  <Search size={12} className="text-slate-400 shrink-0" />
                  <span className="text-[11px] text-slate-400">Search or jump to...</span>
                  <span className="ml-auto font-mono text-[9px] bg-white px-1 rounded border border-slate-200 text-slate-400">⌘K</span>
                </div>
                <div className="relative w-6 h-6 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center border border-blue-200/50">
                  <Bell size={13} />
                  <span className="absolute -top-1 -right-1 bg-[#3F72AF] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    8
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-Header Tabs */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="text-slate-400 cursor-pointer">All</span>
                <span className="text-[#3F72AF] border-b-2 border-[#3F72AF] pb-1 cursor-pointer">Services</span>
                <span className="text-slate-500 cursor-pointer">Digital Products</span>
              </div>
            </div>

            {/* Search Bar & View Mode Toggle */}
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <div className="flex-1 flex items-center gap-2 bg-slate-50/80 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-xs">
                <Search size={13} className="text-slate-400 shrink-0" />
                <span className="text-[11px] text-slate-400">Search services...</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <div className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-slate-100 text-slate-600">
                  <List size={14} />
                </div>
                <div className="w-7 h-7 rounded-md flex items-center justify-center bg-slate-100 text-slate-900">
                  <LayoutGrid size={14} />
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={() => setServiceTagFilter("all")}
                className={`h-6 px-2.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                  serviceTagFilter === "all"
                    ? "bg-blue-50 text-[#3F72AF] border border-blue-200"
                    : "text-slate-600 bg-slate-100/60"
                }`}
              >
                <span>All</span>
                <span className="bg-white/80 px-1 rounded-full text-[9px] font-bold">7</span>
              </button>
              <button
                type="button"
                onClick={() => setServiceTagFilter("wp")}
                className={`h-6 px-2.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                  serviceTagFilter === "wp"
                    ? "bg-blue-50 text-[#3F72AF] border border-blue-200"
                    : "text-slate-600 bg-slate-100/60"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>WordPress Plugin</span>
                <span className="bg-white/80 px-1 rounded-full text-[9px] font-bold">0</span>
              </button>
            </div>

            {/* Services Grid (1.5 x 2 layout: 1 main row of 2 cards + subtle peek of next row) */}
            <div className="relative overflow-hidden max-h-[380px] pb-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Card 1: Business VPS Hosting */}
                <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
                  <div>
                    <div className="h-24 bg-[#EEF4FF] relative flex items-center justify-center border-b border-blue-100/60">
                      <div className="w-9 h-9 rounded-full bg-white/90 border border-blue-200 text-blue-600 flex items-center justify-center shadow-xs">
                        <Box size={16} />
                      </div>
                    </div>
                    <div className="p-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold mb-1 border border-blue-100">
                        Recurring
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 tracking-tight leading-snug">
                        Cloud VPS Architecture
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        Dedicated cloud VPS resources, isolated environment, and enterprise performance.
                      </p>
                    </div>
                  </div>
                  <div className="p-3 pt-0 flex items-center justify-between border-t border-slate-100/80 mt-1">
                    <div className="text-xs font-extrabold text-slate-900">
                      $40 <span className="text-[10px] font-normal text-slate-500">/mo</span>
                    </div>
                    <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-2xs">
                      <ArrowRight size={10} />
                    </div>
                  </div>
                </div>

                {/* Card 2: Small Managed Hosting */}
                <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
                  <div>
                    <div className="h-24 bg-[#FFF4ED] relative flex items-center justify-center border-b border-orange-100/60">
                      <div className="w-9 h-9 rounded-full bg-white/90 border border-orange-200 text-orange-600 flex items-center justify-center shadow-xs">
                        <Box size={16} />
                      </div>
                    </div>
                    <div className="p-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold mb-1 border border-blue-100">
                        Recurring
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 tracking-tight leading-snug">
                        Managed Web Infrastructure
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        High-speed cloud hosting with SSL, automated backups, and 99.9% uptime guarantee.
                      </p>
                    </div>
                  </div>
                  <div className="p-3 pt-0 flex items-center justify-between border-t border-slate-100/80 mt-1">
                    <div className="text-xs font-extrabold text-slate-900">
                      $19 <span className="text-[10px] font-normal text-slate-500">/mo</span>
                    </div>
                    <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-2xs">
                      <ArrowRight size={10} />
                    </div>
                  </div>
                </div>

                {/* Card 3 (Peek card in 1.5x2): Security Hardening */}
                <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs opacity-70">
                  <div className="h-20 bg-[#EDFDF5] relative flex items-center justify-center border-b border-emerald-100/60">
                    <div className="w-8 h-8 rounded-full bg-white/90 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs">
                      <Box size={14} />
                    </div>
                  </div>
                  <div className="p-3">
                    <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold mb-1 border border-blue-100">
                      Recurring
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 tracking-tight">Security & WAF Shield</h4>
                  </div>
                </div>

                {/* Card 4 (Peek card in 1.5x2): Speed Optimization */}
                <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs opacity-70">
                  <div className="h-20 bg-[#FEF9ED] relative flex items-center justify-center border-b border-amber-100/60">
                    <div className="w-8 h-8 rounded-full bg-white/90 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
                      <Box size={14} />
                    </div>
                  </div>
                  <div className="p-3">
                    <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold mb-1 border border-blue-100">
                      Recurring
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 tracking-tight">Core Vitals Performance</h4>
                  </div>
                </div>
              </div>

              {/* Gentle fade-out overlay at bottom giving authentic scrollable viewport peek */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 02: Automated Onboarding (Pending automated task creation screenshot)
    // =========================================================================
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-4 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3">
            <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/40 p-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-2">
                <Clock size={13} />
                <span>Pending Task Creation Screenshot</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">Instant Automated Task Creation</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                Automated task creation, intake forms, and kickoff workflow previews will be updated with your upcoming screenshot.
              </p>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 03: Client Self-Serve / Digital Products Catalog (Screenshot 1)
    // =========================================================================
    if (featureIndex === "03") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-4 rounded-2xl w-full min-w-0 flex flex-col gap-3 text-slate-800">
            {/* Top Navigation Bar - Clean & focused */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center border border-blue-200/50">
                  <Box size={14} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Offerings</h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/70 rounded-lg px-2.5 py-1 text-slate-400 text-xs w-40 sm:w-48">
                  <Search size={12} className="text-slate-400 shrink-0" />
                  <span className="text-[11px] text-slate-400">Search or jump to...</span>
                  <span className="ml-auto font-mono text-[9px] bg-white px-1 rounded border border-slate-200 text-slate-400">⌘K</span>
                </div>
                <div className="relative w-6 h-6 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center border border-blue-200/50">
                  <Bell size={13} />
                  <span className="absolute -top-1 -right-1 bg-[#3F72AF] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    8
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-Header Tabs */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="text-slate-400 cursor-pointer">All</span>
                <span className="text-slate-500 cursor-pointer">Services</span>
                <span className="text-[#3F72AF] border-b-2 border-[#3F72AF] pb-1 cursor-pointer">Digital Products</span>
              </div>
            </div>

            {/* Search Bar & View Mode Toggle */}
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <div className="flex-1 flex items-center gap-2 bg-slate-50/80 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-xs">
                <Search size={13} className="text-slate-400 shrink-0" />
                <span className="text-[11px] text-slate-400">Search products...</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <div className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-slate-100 text-slate-600">
                  <List size={14} />
                </div>
                <div className="w-7 h-7 rounded-md flex items-center justify-center bg-slate-100 text-slate-900">
                  <LayoutGrid size={14} />
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={() => setDigitalTagFilter("all")}
                className={`h-6 px-2.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                  digitalTagFilter === "all"
                    ? "bg-blue-50 text-[#3F72AF] border border-blue-200"
                    : "text-slate-600 bg-slate-100/60"
                }`}
              >
                <span>All</span>
                <span className="bg-white/80 px-1 rounded-full text-[9px] font-bold">36</span>
              </button>
              <button
                type="button"
                onClick={() => setDigitalTagFilter("wp")}
                className={`h-6 px-2.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                  digitalTagFilter === "wp"
                    ? "bg-blue-50 text-[#3F72AF] border border-blue-200"
                    : "text-slate-600 bg-slate-100/60"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>WordPress Plugin</span>
                <span className="bg-white/80 px-1 rounded-full text-[9px] font-bold">36</span>
              </button>
            </div>

            {/* Digital Products Grid (1.5 x 2 layout: 1 main row of 2 cards + subtle peek of next row) */}
            <div className="relative overflow-hidden max-h-[380px] pb-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Product 1: SEO & Performance Suite (dummy product) */}
                <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
                  <div>
                    <div className="h-24 bg-gradient-to-r from-purple-900 to-rose-900 relative flex items-center justify-center p-3 text-white font-extrabold text-base tracking-tight overflow-hidden">
                      <div className="flex items-center gap-1.5 z-10">
                        <span>ApexSEO</span>
                        <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">PRO</span>
                      </div>
                      <div className="absolute top-2 left-2 text-[10px] bg-white/90 text-slate-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>Plugin Bundle</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold mb-1 border border-blue-100">
                        Recurring
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 tracking-tight leading-snug">
                        ApexSEO Pro + Cache Suite
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        Complete search rank optimization, automated schema markup & peak cache engine.
                      </p>
                    </div>
                  </div>
                  <div className="p-3 pt-0 flex items-center justify-between border-t border-slate-100/80 mt-1">
                    <div className="text-xs font-extrabold text-slate-900">
                      $12 <span className="text-[10px] font-normal text-slate-500">/mo</span>
                    </div>
                    <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-2xs">
                      <ArrowRight size={10} />
                    </div>
                  </div>
                </div>

                {/* Product 2: Portal Theme (dummy product) */}
                <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
                  <div>
                    <div className="h-24 bg-yellow-400 relative flex items-center justify-center p-3 text-blue-900 font-black text-2xl tracking-tighter">
                      <span className="z-10">CORE</span>
                      <div className="absolute top-2 left-2 text-[10px] bg-white/90 text-slate-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>Theme Kit</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold mb-1 border border-emerald-100">
                        One-Time
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 tracking-tight leading-snug">
                        CorePortal UI Framework
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        Pre-built customer dashboard template with authenticated billing & ticket modules.
                      </p>
                    </div>
                  </div>
                  <div className="p-3 pt-0 flex items-center justify-between border-t border-slate-100/80 mt-1">
                    <div className="text-xs font-extrabold text-slate-900">
                      $89
                    </div>
                    <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-2xs">
                      <ArrowRight size={10} />
                    </div>
                  </div>
                </div>

                {/* Peek Card 3: Automation Hub */}
                <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs opacity-70">
                  <div className="h-20 bg-slate-200 relative flex items-center justify-center p-2 text-slate-900 font-black text-lg">
                    <span>FlowSync</span>
                  </div>
                  <div className="p-3">
                    <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold mb-1 border border-blue-100">
                      Recurring
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 tracking-tight">FlowSync Webhooks</h4>
                  </div>
                </div>

                {/* Peek Card 4: Builder Kit */}
                <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs opacity-70">
                  <div className="h-20 bg-[#EEF4FF] relative flex items-center justify-center border-b border-blue-100/60">
                    <div className="w-8 h-8 rounded-full bg-white/90 border border-blue-200 text-blue-600 flex items-center justify-center shadow-xs">
                      <Box size={14} />
                    </div>
                  </div>
                  <div className="p-3">
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold mb-1 border border-emerald-100">
                      One-Time
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 tracking-tight">Studio Builder Pack</h4>
                  </div>
                </div>
              </div>

              {/* Gentle fade-out overlay at bottom giving authentic scrollable viewport peek */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            </div>
          </BlendMockupCard>
        </div>
      );
    }
  }

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

  // Only apply custom Eidoncore focused cards on /messaging
  if (moduleName.toLowerCase() === "messaging" || moduleName.toLowerCase().includes("messag")) {
    // =========================================================================
    // FEATURE 01: Project Channels (Discussions Anchored to Active Deliverables)
    // Matches screenshot media_1791144277900.png / media_1791144277902.png
    // =========================================================================
    if (featureIndex === "01") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3">
            {/* Top Window Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                  <MessageSquare size={14} />
                </div>
                <span className="text-sm font-bold text-slate-900 tracking-tight">Messaging</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#F8FAFC] border border-slate-200/80 rounded-lg text-xs text-slate-400">
                  <Sparkles size={12} className="text-blue-500" />
                  <span>AI Copilot</span>
                  <kbd className="font-mono text-[9px] bg-white border border-slate-200 px-1 rounded">⌘J</kbd>
                </div>
                <div className="flex items-center -space-x-1.5">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[9px] flex items-center justify-center border-2 border-white">
                    ZT
                  </span>
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center border-2 border-white">
                    AM
                  </span>
                </div>
              </div>
            </div>

            {/* Split Screen: Project Channels Sidebar + Active Chat Stream */}
            <div className="grid grid-cols-12 rounded-xl border border-slate-200/80 overflow-hidden min-h-[360px] bg-white shadow-2xs">
              {/* Left Column: Projects & Organizations Sidebar */}
              <div className="col-span-5 sm:col-span-4 border-r border-slate-100 bg-[#FBFBFC] p-2.5 flex flex-col gap-2.5 text-xs">
                {/* Search */}
                <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white border border-slate-200/70 rounded-lg text-slate-400 text-[11px]">
                  <Search size={11} className="shrink-0" />
                  <span className="truncate">Search or new DM...</span>
                </div>

                {/* Section: PROJECTS */}
                <div>
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 block px-1.5 mb-1.5">
                    PROJECTS
                  </span>
                  <div className="flex flex-col gap-1">
                    {/* Active Project 1: Acme Corp Website */}
                    <div className="p-1.5 sm:p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                          <Folder size={12} />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-slate-900 text-xs block truncate">Acme Portal Redesign</span>
                          <span className="text-[10px] text-slate-400 block truncate">Internal scope note</span>
                        </div>
                      </div>
                      <span className="text-[9.5px] font-medium text-slate-400 shrink-0 ml-1">32m</span>
                    </div>

                    {/* Project 2: Zenith Brand Portal */}
                    <div className="p-1.5 sm:p-2 rounded-xl hover:bg-slate-100/60 transition-colors flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                          <Folder size={12} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-medium text-slate-700 block truncate">Nexus Web App</span>
                          <span className="text-[10px] text-slate-400 block truncate">Alex M. joined the channel</span>
                        </div>
                      </div>
                      <span className="text-[9.5px] text-slate-400 shrink-0 ml-1">Mar 30</span>
                    </div>

                    {/* Project 3: Apex Design System */}
                    <div className="p-1.5 sm:p-2 rounded-xl hover:bg-slate-100/60 transition-colors flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                          <Folder size={12} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-medium text-slate-700 block truncate">Apex Design System</span>
                          <span className="text-[10px] text-slate-400 block truncate">David K. joined the channel</span>
                        </div>
                      </div>
                      <span className="text-[9.5px] text-slate-400 shrink-0 ml-1">New</span>
                    </div>

                    {/* Project 4: CloudScale Maintenance */}
                    <div className="p-1.5 sm:p-2 rounded-xl hover:bg-slate-100/60 transition-colors flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                          <Folder size={12} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-medium text-slate-700 block truncate">CloudScale SLA</span>
                          <span className="text-[10px] text-slate-400 block truncate">Channel created</span>
                        </div>
                      </div>
                      <span className="text-[9.5px] text-slate-400 shrink-0 ml-1">New</span>
                    </div>
                  </div>
                </div>

                {/* Section: ORGANIZATIONS */}
                <div className="mt-1 pt-2 border-t border-slate-100">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 block px-1.5 mb-1.5">
                    ORGANIZATIONS
                  </span>
                  <div className="flex flex-col gap-1">
                    {/* Org 1 */}
                    <div className="p-1.5 sm:p-2 rounded-xl hover:bg-slate-100/60 transition-colors flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                          <Users size={11} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-medium text-slate-700 block truncate">Velocity Studios</span>
                          <span className="text-[10px] text-slate-400 block truncate">Tasks mentioned from the menu...</span>
                        </div>
                      </div>
                      <span className="text-[9.5px] text-slate-400 shrink-0 ml-1">Apr 6</span>
                    </div>

                    {/* Org 2 */}
                    <div className="p-1.5 sm:p-2 rounded-xl hover:bg-slate-100/60 transition-colors flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                          <Users size={11} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-medium text-slate-700 block truncate">Beacon Health Tech</span>
                          <span className="text-[10px] text-slate-400 block truncate">Elena R. joined the channel</span>
                        </div>
                      </div>
                      <span className="text-[9.5px] text-slate-400 shrink-0 ml-1">New</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Chat Room Stream */}
              <div className="col-span-7 sm:col-span-8 flex flex-col justify-between p-3 sm:p-4 bg-white">
                {/* Channel Bar */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Folder size={12} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-xs truncate">Internal Tasks</h4>
                      <span className="text-[10px] text-slate-400 block">Project • 2 members</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10.5px] text-emerald-600 font-medium hidden sm:inline">Active</span>
                  </div>
                </div>

                {/* Messages Feed */}
                <div className="flex flex-col gap-3.5 mb-3 overflow-hidden">
                  {/* Message 1: Project Lead (Dummy Alex Morgan) */}
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                      AM
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 text-[11px]">Alex Morgan</span>
                        <span className="text-[9.5px] text-slate-400 font-mono">07:32 AM</span>
                      </div>
                      <div className="text-slate-600 text-[11px] leading-relaxed space-y-1.5">
                        <p>Hello, I hope this message finds you well. I am reaching out to discuss our upcoming projects and see if you have any updates to share.</p>
                        <p>Hi there! Just checking in to see how things are going on your end. I'd love to hear how your week is shaping up and if there's anything we can help you with.</p>
                        <p>Please note that all deliverables have been documented in the project ledger.</p>
                      </div>
                      <span className="inline-block mt-1.5 text-[10.5px] font-medium text-blue-600 hover:underline cursor-pointer">
                        @Jordan Lee
                      </span>
                    </div>
                  </div>

                  {/* Message 2: Jordan Lee reply */}
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                      JL
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-slate-900 text-[11px]">Jordan Lee</span>
                        <span className="text-[9.5px] text-slate-400 font-mono">11:32 PM</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Our new release workflow is working smoothly and simplifying all pipeline deployment steps. Everything is fully tested and verified.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input Composer Box */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <div className="flex-1 px-2.5 py-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-lg text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Type a message... (@ to mention)</span>
                    <Sparkles size={12} className="text-blue-500" />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Send size={12} />
                  </div>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 02: Client & Team Separation (Strict Internal Notes vs. Client-Visible Channels)
    // Matches screenshot media_1791144277905.png (Orange Internal Note Badge & Banner)
    // =========================================================================
    if (featureIndex === "02") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5">
            {/* Header: Internal Note Guard Banner */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/70">
                  <Lock size={12} className="text-amber-600" />
                  <span>Internal Note Mode</span>
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• Hidden from client view</span>
              </div>
              <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                2 Team Members
              </span>
            </div>

            {/* Main Chat Thread Showing Internal Note Capsule */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs flex flex-col gap-3">
              {/* Message with Orange Internal Note Pill */}
              <div className="flex items-start gap-2.5 text-xs">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  JL
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="font-bold text-slate-900 text-xs">Jordan Lee</span>
                    <span className="text-[10px] text-slate-400 font-mono">02:02 AM</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                      <Lock size={10} className="text-amber-600" />
                      <span>Internal note</span>
                    </span>
                  </div>

                  {/* Highlighted Internal Note Container matching Screenshot 3 */}
                  <div className="p-3 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl text-slate-800 text-xs leading-relaxed font-normal shadow-2xs">
                    This is an internal note
                  </div>
                </div>
              </div>

              {/* Internal Note Compose Bar (Orange styled matching Screenshot 3) */}
              <div className="mt-2 bg-[#FFFBEB] border border-amber-300/80 rounded-xl p-3 shadow-2xs">
                <div className="text-xs text-amber-800 font-medium mb-2 flex items-center justify-between">
                  <span>Write an internal note...</span>
                  <span className="text-[10.5px] font-mono text-amber-600">Visible to team only</span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-amber-200/60">
                  <div className="flex items-center gap-2">
                    <button type="button" className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100/70 transition-colors">
                      <Paperclip size={14} />
                    </button>
                    <button type="button" className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100/70 transition-colors">
                      <Sparkles size={14} />
                    </button>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100/80 rounded-lg text-[11px] font-bold text-amber-900 border border-amber-300">
                      <Lock size={11} className="text-amber-700" />
                      <span>Internal note</span>
                    </div>
                  </div>
                  <button type="button" className="w-8 h-8 rounded-lg bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center shadow-xs transition-colors">
                    <Send size={13} />
                  </button>
                </div>
              </div>
            </div>
          </BlendMockupCard>
        </div>
      );
    }

    // =========================================================================
    // FEATURE 03: Threaded Focus & AI Tone Polish
    // Matches screenshot media_1791147500994.png & media_1791147542050.png 100%
    // =========================================================================
    if (featureIndex === "03") {
      return (
        <div className="relative w-full max-w-xl group min-w-0">
          <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3">
            {/* Top Channel Header matching screenshot */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <Folder size={14} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">Internal Tasks</h4>
                  <span className="text-[10px] text-slate-400 block">Project • 2 members</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center -space-x-1.5">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[9px] flex items-center justify-center border-2 border-white shadow-2xs">
                    ZT
                  </span>
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center border-2 border-white shadow-2xs">
                    ST
                  </span>
                </div>
                <Info size={14} className="text-slate-400 ml-1 cursor-pointer" />
              </div>
            </div>

            {/* Chat Thread Feed matching Screenshot 1 (media_1791147500994.png) */}
            <div className="flex flex-col gap-2.5 bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs relative">
              {/* Date Separator Pill: Friday */}
              <div className="relative flex items-center justify-center my-0.5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100" />
                </div>
                <span className="relative z-10 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-medium text-slate-400">
                  Friday
                </span>
              </div>

              {/* Message 1: Quick affirmation */}
              <div className="flex items-start gap-2.5 text-xs">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  JL
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-slate-900 text-xs">Jordan Lee</span>
                    <span className="text-[10px] text-slate-400 font-mono">02:55 PM</span>
                  </div>
                  <p className="text-slate-800 text-xs font-normal">
                    Looks fantastic! Staging preview passed all responsive checks.
                  </p>
                </div>
              </div>

              {/* Date Separator Pill: Today */}
              <div className="relative flex items-center justify-center my-0.5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100" />
                </div>
                <span className="relative z-10 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-medium text-slate-400">
                  Today
                </span>
              </div>

              {/* Message 2: Internal Note with Reaction Heart */}
              <div className="flex items-start gap-2.5 text-xs">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  JL
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-xs">Jordan Lee</span>
                    <span className="text-[10px] text-slate-400 font-mono">02:02 AM</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                      <Lock size={10} className="text-amber-600" />
                      <span>Internal note</span>
                    </span>
                  </div>
                  <div className="p-2.5 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl text-slate-800 text-xs shadow-2xs mb-1.5 inline-block w-full">
                    Client approved the updated deliverables roadmap. Let’s double-check the API rate limits before publishing.
                  </div>
                  {/* Heart Reaction Capsule matching screenshot */}
                  <div className="flex items-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-xs shadow-2xs hover:scale-105 transition-transform cursor-pointer">
                      <span>❤️</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Message 3: Task Mention pill #Design-System-Sync */}
              <div className="flex items-start gap-2.5 text-xs">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  JL
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-xs">Jordan Lee</span>
                    <span className="text-[10px] text-slate-400 font-mono">02:57 AM</span>
                  </div>
                  {/* Blue Pill Task Mention */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-200/70 hover:bg-blue-100 transition-colors cursor-pointer">
                    <span>#Design-System-Sync</span>
                  </span>
                </div>
              </div>

              {/* Message 4: Threaded Quote Reply + Text + User Mention @Alex Morgan */}
              <div className="flex items-start gap-2.5 text-xs">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  JL
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-xs">Jordan Lee</span>
                    <span className="text-[10px] text-slate-400 font-mono">02:57 AM</span>
                  </div>

                  {/* Quoted Reply Capsule matching screenshot */}
                  <div className="p-2 sm:p-2.5 bg-slate-50 border-l-2 border-blue-500 rounded-r-xl text-slate-600 text-xs mb-1.5 flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800 text-[11px]">
                      <Reply size={11} className="text-blue-500" />
                      <span>Alex Morgan</span>
                    </div>
                    <span className="text-[11px] text-slate-500 truncate">
                      Can we verify all webhook triggers on the checkout flow before deploying?
                    </span>
                  </div>

                  <p className="text-slate-800 text-xs font-normal mb-1.5">
                    Completed! All endpoints returned 200 OK across test suites.
                  </p>

                  {/* Blue User Mention pill @Alex Morgan */}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 hover:underline cursor-pointer">
                    @Alex Morgan
                  </span>
                </div>
              </div>
            </div>

            {/* Input Composer Box with Screenshot 2 AI Polish Tone Menu Popover */}
            <div className="relative bg-white rounded-xl border border-blue-400/80 p-2.5 sm:p-3 shadow-2xs ring-2 ring-blue-500/10 flex flex-col gap-2">
              <span className="text-xs text-slate-500 font-normal">
                Type a message... (@ to mention, / to search)
              </span>

              {/* Bottom Action Bar */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button type="button" className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                    <Paperclip size={14} />
                  </button>

                  {/* Active AI Rewrite Sparkle Button */}
                  <div className="relative">
                    <button
                      type="button"
                      className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/80 shadow-2xs flex items-center justify-center transition-all hover:bg-blue-100"
                    >
                      <Sparkles size={14} className="text-blue-600" />
                    </button>

                    {/* SCREENSHOT 2: AI POLISH TONE POPOVER MENU (media_1791147542050.png) */}
                    <div className="absolute bottom-[calc(100%+8px)] left-0 z-30 w-52 bg-white rounded-2xl p-2 shadow-2xl border border-slate-200/90 animate-in fade-in zoom-in-95 duration-150">
                      {/* Popover Header */}
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
                        <Sparkles size={14} className="text-blue-600" />
                        <span>AI POLISH TONE</span>
                      </div>

                      {/* Tone Options */}
                      <div className="flex flex-col gap-0.5 mt-1">
                        {/* 1. Professional */}
                        <button
                          type="button"
                          onClick={() => setActiveAiTone("Professional")}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-xs transition-colors ${
                            activeAiTone === "Professional"
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-slate-700 hover:bg-slate-50 font-medium"
                          }`}
                        >
                          <Briefcase size={14} className={activeAiTone === "Professional" ? "text-blue-600" : "text-slate-500"} />
                          <span>Professional</span>
                        </button>

                        {/* 2. Friendly & Warm */}
                        <button
                          type="button"
                          onClick={() => setActiveAiTone("Friendly & Warm")}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-xs transition-colors ${
                            activeAiTone === "Friendly & Warm"
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-slate-700 hover:bg-slate-50 font-medium"
                          }`}
                        >
                          <Smile size={14} className={activeAiTone === "Friendly & Warm" ? "text-blue-600" : "text-slate-500"} />
                          <span>Friendly & Warm</span>
                        </button>

                        {/* 3. Short & Concise */}
                        <button
                          type="button"
                          onClick={() => setActiveAiTone("Short & Concise")}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-xs transition-colors ${
                            activeAiTone === "Short & Concise"
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-slate-700 hover:bg-slate-50 font-medium"
                          }`}
                        >
                          <Zap size={14} className={activeAiTone === "Short & Concise" ? "text-blue-600" : "text-slate-500"} />
                          <span>Short & Concise</span>
                        </button>

                        {/* 4. Urgent Notice */}
                        <button
                          type="button"
                          onClick={() => setActiveAiTone("Urgent Notice")}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-xs transition-colors ${
                            activeAiTone === "Urgent Notice"
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-slate-700 hover:bg-slate-50 font-medium"
                          }`}
                        >
                          <AlertTriangle size={14} className={activeAiTone === "Urgent Notice" ? "text-blue-600" : "text-slate-500"} />
                          <span>Urgent Notice</span>
                        </button>

                        {/* 5. Empathetic */}
                        <button
                          type="button"
                          onClick={() => setActiveAiTone("Empathetic")}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-xs transition-colors ${
                            activeAiTone === "Empathetic"
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-slate-700 hover:bg-slate-50 font-medium"
                          }`}
                        >
                          <Heart size={14} className={activeAiTone === "Empathetic" ? "text-blue-600" : "text-slate-500"} />
                          <span>Empathetic</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium text-slate-600 bg-slate-100/80">
                    <Lock size={11} className="text-slate-500" />
                    <span>Internal note</span>
                  </div>
                </div>

                <button type="button" className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-xs">
                  <Send size={12} />
                </button>
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
