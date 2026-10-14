"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedButton from "@/components/AnimatedButton";
import SectionBadge from "@/components/SectionBadge";
import AnimatedImage from "@/components/AnimatedImage";
import BlendMockupCard from "@/components/BlendMockupCard";
import {
  Megaphone,
  Palette,
  Code2,
  Briefcase,
  UserCheck,
  Check,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  DollarSign,
  Activity,
  Clock,
  Calendar,
  Building,
  Lock,
  Unlock,
  CheckSquare,
  TrendingUp,
  FileText,
  Eye,
  Sliders,
  Image as ImageIcon,
  Play,
  Pause,
  AlertCircle,
  MessageSquare,
  Bot,
  Zap,
} from "lucide-react";

interface VerticalItem {
  id: string;
  name: string;
  shortName: string;
  icon: React.ReactNode;
  tagline: string;
  desc: string;
  points: string[];
  image: string;
  url: string;
  caption: string;
  featureHref: string;
  featureName: string;
  includedModules: { name: string; href: string }[];
}

const VERTICALS: VerticalItem[] = [
  {
    id: "marketing",
    name: "Marketing Agencies",
    shortName: "Marketing",
    icon: <Megaphone size={16} className="text-pink-600" />,
    tagline: "Manage campaigns, retainers, and client approvals with zero chaos",
    desc: "Coordinate ad campaigns, content calendars, and social deliverables across multiple client accounts. Track monthly recurring retainers and send automated performance digests.",
    points: [
      "Campaign milestone schedules with integrated asset reviews",
      "Automated monthly recurring retainer invoicing via Stripe",
      "100% white-label client portal for real-time campaign reporting",
      "Intake questionnaires for rapid onboarding of new client accounts",
    ],
    image: "/images/04-crm-organizations-list-table-view.png",
    url: "app.eidoncore.com/crm/campaign-retainers",
    caption: "Multi-account CRM monitoring client health scores, retainer stability, and deliverables in real time.",
    featureHref: "/crm/",
    featureName: "CRM Module",
    includedModules: [
      { name: "CRM & Clients", href: "/crm/" },
      { name: "Client Portal", href: "/portal/" },
      { name: "Invoicing", href: "/invoicing/" },
      { name: "Intake Forms", href: "/intake-forms/" },
    ],
  },
  {
    id: "design",
    name: "Design Studios",
    shortName: "Design",
    icon: <Palette size={16} className="text-purple-600" />,
    tagline: "Frictionless design proofs, revision rounds & deliverable delivery",
    desc: "Present Figma links, brand assets, and creative proofs cleanly. Let clients leave targeted feedback and approve milestone releases before final file handoff.",
    points: [
      "Dedicated asset galleries with rich in-browser image previews",
      "Milestone-based approval gating before invoice releases",
      "Productized design subscriptions and one-click add-ons",
      "Expiring download links protecting raw source files",
    ],
    image: "/images/16-projects-living-with-lolo-project-view.png",
    url: "app.eidoncore.com/projects/creative-proofs",
    caption: "Package design sprints, brand kits, and asset packs with client download gating.",
    featureHref: "/projects/",
    featureName: "Projects & Assets",
    includedModules: [
      { name: "Proposals & E-Sign", href: "/proposals/" },
      { name: "Digital Products", href: "/digital-products/" },
      { name: "Projects", href: "/projects/" },
      { name: "Client Portal", href: "/portal/" },
    ],
  },
  {
    id: "development",
    name: "Software & Web Agencies",
    shortName: "Software & Web",
    icon: <Code2 size={16} className="text-[#3F72AF]" />,
    tagline: "Agile sprints, hourly budget burndowns & MCP AI coding tools",
    desc: "Run two-week sprints with Kanban boards, connect Cursor and Claude via native MCP, track billable developer hours, and prevent scope creep with signed estimates.",
    points: [
      "Model Context Protocol (MCP) integration with Claude & Cursor",
      "Kanban sprint boards with WIP limits and subtask checklists",
      "Real-time budget burndown alerts when hours exceed estimates",
      "Outbound signed webhooks to GitHub, Slack, and internal APIs",
    ],
    image: "/images/20-tasks-kanban-board-in-progress-column.png",
    url: "app.eidoncore.com/tasks/sprint-board",
    caption: "Run agile engineering sprints with work-in-progress limits and subtask completion trees.",
    featureHref: "/tasks/",
    featureName: "Tasks & Sprints",
    includedModules: [
      { name: "Tasks", href: "/tasks/" },
      { name: "Projects", href: "/projects/" },
      { name: "AI Workspace", href: "/ai-workspace/" },
      { name: "Tickets", href: "/tickets/" },
    ],
  },
  {
    id: "consulting",
    name: "Consulting & Advisory Firms",
    shortName: "Consulting",
    icon: <Briefcase size={16} className="text-amber-600" />,
    tagline: "Professional engagement tracking, confidential notes & time audits",
    desc: "Track client engagements with clear milestone deliverables, calculate utilization rates across senior partners and associates, and maintain confidential internal notes.",
    points: [
      "Internal advisory notes strictly isolated from client portal views",
      "Partner and associate billable utilization analytics",
      "Custom proposal contracts with legally binding digital e-signatures",
      "Professional itemized invoices supporting multi-currency billing",
    ],
    image: "/images/33-reports-workspace-overview-at-a-glance.png",
    url: "app.eidoncore.com/reports/engagement-financials",
    caption: "Monitor partner profitability, gross margins, cash flow forecasts, and quarterly billable health.",
    featureHref: "/reports/",
    featureName: "Reports & Financials",
    includedModules: [
      { name: "Reports", href: "/reports/" },
      { name: "Proposals", href: "/proposals/" },
      { name: "Invoicing", href: "/invoicing/" },
      { name: "Team Directory", href: "/team/" },
    ],
  },
  {
    id: "freelancers",
    name: "Freelancers & Solo Studios",
    shortName: "Freelancers & Solo",
    icon: <UserCheck size={16} className="text-emerald-600" />,
    tagline: "One platform that replaces 5 subscriptions for solo creators",
    desc: "Look like a 20-person agency with a custom-branded portal, professional proposals, automated invoice reminders, and self-service productized services.",
    points: [
      "Free 14-day trial without needing a credit card",
      "Replace ClickUp, QuickBooks, Pandadoc, and Typeform in 1 tool",
      "Productized service catalog allowing clients to buy online",
      "Flat pricing that never penalizes you for inviting contractors",
    ],
    image: "/images/01-dashboard-myday-flightdeck-overview.png",
    url: "app.eidoncore.com/dashboard/myday",
    caption: "Unified morning flightdeck command center: daily agenda, active client deliverables, and cash flow.",
    featureHref: "/dashboard/",
    featureName: "Dashboard",
    includedModules: [
      { name: "Dashboard", href: "/dashboard/" },
      { name: "Services", href: "/services/" },
      { name: "Invoicing", href: "/invoicing/" },
      { name: "Proposals", href: "/proposals/" },
    ],
  },
];

const CORE_PILLARS = [
  {
    title: "The 100% White-Label Portal",
    tag: "Client Experience",
    desc: "Deliver an executive client experience under your own custom domain. Clients approve milestones, pay invoices, and view deliverables without asking for updates.",
    image: "/images/07-crm-org-detail-steven-losada-overview.png",
    href: "/portal/",
  },
  {
    title: "Agile Execution & Capacity",
    tag: "Operations",
    desc: "Visual Kanban boards, workload heatmaps, and live billable timers keep your projects profitable and your team balanced.",
    image: "/images/20-tasks-kanban-board-in-progress-column.png",
    href: "/tasks/",
  },
  {
    title: "Predictable Cash Flow & Billing",
    tag: "Revenue Engine",
    desc: "Automated monthly retainers, 50% upfront deposit gating, and real-time EBITDA margins ensure you always get paid on time.",
    image: "/images/30-invoicing-my-invoices-and-drafts-list.png",
    href: "/invoicing/",
  },
];

// Dedicated Vertical Visual Preview Component that matches each vertical 100%
function VerticalVisualPreview({ vertical, isReverse }: { vertical: VerticalItem; isReverse: boolean }) {
  const [viewMode, setViewMode] = useState<"live" | "screenshot">("live");

  // State for interactive features
  const [designPhase2Approved, setDesignPhase2Approved] = useState(false);
  const [subtaskChecked1, setSubtaskChecked1] = useState(true);
  const [subtaskChecked2, setSubtaskChecked2] = useState(true);
  const [subtaskChecked3, setSubtaskChecked3] = useState(false);
  const [consultingTab, setConsultingTab] = useState<"cashflow" | "revenue">("cashflow");
  const [soloChecklist1, setSoloChecklist1] = useState(true);
  const [soloChecklist2, setSoloChecklist2] = useState(false);

  return (
    <div className="relative w-full max-w-xl group min-w-0">
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 sm:p-5 shadow-xs overflow-hidden">
        {/* Browser Top Window Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
            <span className="text-[10px] font-mono text-[#94A3B8] ml-2 truncate max-w-[200px] sm:max-w-xs">
              {vertical.url}
            </span>
          </div>

          {/* Toggle Button: Live Focused Preview vs Full Screenshot */}
          <div className="flex items-center bg-white border border-slate-200/80 rounded-lg p-0.5 text-[10px] font-semibold text-slate-600 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode("live")}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                viewMode === "live"
                  ? "bg-[#3F72AF] text-white shadow-2xs font-bold"
                  : "hover:text-slate-900"
              }`}
            >
              <Sparkles size={10} />
              <span>Live Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("screenshot")}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                viewMode === "screenshot"
                  ? "bg-[#3F72AF] text-white shadow-2xs font-bold"
                  : "hover:text-slate-900"
              }`}
            >
              <ImageIcon size={10} />
              <span>Full Screen</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Full High-Res Authentic Screenshot */}
        {viewMode === "screenshot" ? (
          <div className="rounded-xl border border-[#E2E8F0] overflow-hidden bg-white shadow-2xs">
            <AnimatedImage
              src={vertical.image}
              alt={vertical.name}
              origin={isReverse ? "top-left" : "top-right"}
              className="bg-white"
              imgClassName="w-full h-auto object-cover"
            />
          </div>
        ) : (
          /* View Mode 2: Focused Interactive Dashboard Matching the Exact Content */
          <div className="rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
            {/* 1. MARKETING AGENCIES PREVIEW */}
            {vertical.id === "marketing" && (
              <div className="p-4 sm:p-5 flex flex-col gap-3.5 text-slate-800">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-100">
                      <Megaphone size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        Client Retainers & Campaign Health
                      </h4>
                      <p className="text-[10px] text-slate-400">Multi-client campaign pacing & Stripe retainers</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> 100% Healthy Book
                  </span>
                </div>

                {/* 4 Stat Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                  <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/60">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Active Retainers</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">$38,500</span>
                    <span className="text-[9px] text-emerald-600 font-semibold block">3 accounts active</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/60">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Deliverables</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">18 / 18</span>
                    <span className="text-[9px] text-emerald-600 font-semibold block">100% On Track</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/60">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Portal Digest</span>
                    <span className="text-sm sm:text-base font-extrabold text-blue-600 font-mono">Oct 31</span>
                    <span className="text-[9px] text-slate-500 block">Auto-scheduled</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/60">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Churn Risk</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-600 font-mono">0</span>
                    <span className="text-[9px] text-emerald-600 block">No red flags</span>
                  </div>
                </div>

                {/* Retainer Accounts Table */}
                <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-2xs divide-y divide-slate-100 text-xs">
                  <div className="bg-slate-50/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 grid grid-cols-12 gap-2">
                    <span className="col-span-5">Client & Campaign</span>
                    <span className="col-span-3 text-center">Monthly Retainer</span>
                    <span className="col-span-2 text-center">Status</span>
                    <span className="col-span-2 text-right">Health</span>
                  </div>

                  <div className="p-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/60 transition-colors">
                    <div className="col-span-5 flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-pink-100 text-pink-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                        VM
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 block truncate leading-tight">Vantage Media</span>
                        <span className="text-[10px] text-slate-400 block truncate">Q4 Omnichannel Ads</span>
                      </div>
                    </div>
                    <span className="col-span-3 text-center font-mono font-semibold text-slate-800">$12,500/mo</span>
                    <span className="col-span-2 text-center">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200">
                        Active
                      </span>
                    </span>
                    <span className="col-span-2 text-right font-mono font-bold text-emerald-600">100%</span>
                  </div>

                  <div className="p-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/60 transition-colors">
                    <div className="col-span-5 flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-blue-100 text-[#3F72AF] font-bold text-[10px] flex items-center justify-center shrink-0">
                        NH
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 block truncate leading-tight">Nebula Health</span>
                        <span className="text-[10px] text-slate-400 block truncate">Patient Acquisition</span>
                      </div>
                    </div>
                    <span className="col-span-3 text-center font-mono font-semibold text-slate-800">$9,500/mo</span>
                    <span className="col-span-2 text-center">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200">
                        Active
                      </span>
                    </span>
                    <span className="col-span-2 text-right font-mono font-bold text-emerald-600">98%</span>
                  </div>

                  <div className="p-2.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/60 transition-colors">
                    <div className="col-span-5 flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-purple-100 text-purple-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                        KF
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 block truncate leading-tight">Kroma Fintech</span>
                        <span className="text-[10px] text-slate-400 block truncate">Growth Sprint</span>
                      </div>
                    </div>
                    <span className="col-span-3 text-center font-mono font-semibold text-slate-800">$16,500/mo</span>
                    <span className="col-span-2 text-center">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200">
                        Active
                      </span>
                    </span>
                    <span className="col-span-2 text-right font-mono font-bold text-emerald-600">100%</span>
                  </div>
                </div>

                {/* Automated Digest Banner */}
                <div className="p-2.5 rounded-lg bg-pink-50/60 border border-pink-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles size={13} className="text-pink-600 shrink-0" />
                    <span className="text-slate-700 text-[11px]">
                      Automated monthly retainer invoicing active via <strong>Stripe Connect</strong>.
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-pink-700 bg-white px-2 py-0.5 rounded border border-pink-200">
                    Auto-Pay On
                  </span>
                </div>
              </div>
            )}

            {/* 2. DESIGN STUDIOS PREVIEW */}
            {vertical.id === "design" && (
              <div className="p-4 sm:p-5 flex flex-col gap-3.5 text-slate-800">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                      <Palette size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        Living with Lolo — Brand & Web Experience
                      </h4>
                      <p className="text-[10px] text-slate-400">Creative proofs, milestone gating & feedback</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 font-bold flex items-center gap-1">
                    Phase 2 / 3
                  </span>
                </div>

                {/* Milestone Approval Gating Chain */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Milestone Approval Pipeline
                  </span>

                  {/* Stage 1: Done */}
                  <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className="font-semibold text-slate-800 text-[11px]">Milestone 1: Brand Guidelines & Tokens</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                      Approved ✓
                    </span>
                  </div>

                  {/* Stage 2: Active / In Review */}
                  <div className="p-3 rounded-xl border-2 border-purple-200 bg-purple-50/30 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-bold text-[10px]">
                          2
                        </div>
                        <span className="font-bold text-slate-900 text-xs">
                          Milestone 2: Figma Design System & Proofs
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-700 font-bold bg-white px-2 py-0.5 rounded border border-purple-200">
                        {designPhase2Approved ? "Signed Off ✓" : "Client Feedback Active"}
                      </span>
                    </div>

                    {/* Figma Proof & Client Feedback Card */}
                    <div className="p-2.5 rounded-lg bg-white border border-purple-100 flex flex-col gap-2 shadow-2xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono text-slate-500 flex items-center gap-1">
                          <ExternalLink size={11} className="text-purple-600" />
                          figma.com/file/.../Lolo-v2.4
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">Updated 2h ago</span>
                      </div>

                      <div className="p-2 bg-slate-50 rounded border border-slate-100 text-[11px] text-slate-600 leading-snug">
                        <strong className="text-slate-800">Sarah (Client):</strong> &ldquo;The typography hierarchy and mobile buttons look stunning. Ready for sign-off!&rdquo;
                      </div>

                      {/* Interactive Sign-off Button */}
                      <button
                        type="button"
                        onClick={() => setDesignPhase2Approved(!designPhase2Approved)}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          designPhase2Approved
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-purple-600 text-white hover:bg-purple-700 shadow-xs"
                        }`}
                      >
                        <Check size={12} strokeWidth={2.5} />
                        <span>{designPhase2Approved ? "Milestone Approved & Released" : "Click to Approve Milestone & Unlock Phase 3"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Stage 3: Gated */}
                  <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/40 flex items-center justify-between text-xs opacity-70">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                        {designPhase2Approved ? <Unlock size={11} /> : <Lock size={11} />}
                      </div>
                      <span className="font-medium text-slate-700 text-[11px]">
                        Milestone 3: Final Production Assets & Source Code Hand-off
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      {designPhase2Approved ? "Unlocked" : "Gated 🔒"}
                    </span>
                  </div>
                </div>

                {/* Secure Expiring Asset Link */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Shield size={13} className="text-purple-600 shrink-0" />
                    <span className="text-slate-600 text-[11px]">
                      Expiring source download link: <strong>lolo-assets-v2.zip</strong> (Expires in 48h)
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">Encrypted</span>
                </div>
              </div>
            )}

            {/* 3. SOFTWARE & WEB AGENCIES PREVIEW */}
            {vertical.id === "development" && (
              <div className="p-4 sm:p-5 flex flex-col gap-3.5 text-slate-800">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3F72AF] flex items-center justify-center border border-blue-100">
                      <Code2 size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        Sprint 42 — MCP Engine & Platform Core
                      </h4>
                      <p className="text-[10px] text-slate-400">Agile Kanban • WIP Limits • Claude & Cursor MCP</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-mono text-[#3F72AF] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F72AF] animate-ping" />
                    <span>MCP Active</span>
                  </div>
                </div>

                {/* Sprint Metrics */}
                <div className="grid grid-cols-3 gap-2 text-left">
                  <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/60">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Sprint Velocity</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">42 / 48 pts</span>
                    <span className="text-[9px] text-emerald-600 block">87.5% complete</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/60">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Billable Hours</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">124.5 hrs</span>
                    <span className="text-[9px] text-slate-500 block">Est: 140 hrs max</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/60">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Live Timer</span>
                    <span className="text-sm font-bold text-emerald-600 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      01:24:18
                    </span>
                    <span className="text-[9px] text-slate-400 block">Active on MCP task</span>
                  </div>
                </div>

                {/* Interactive Sprint Kanban Board */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {/* Column 1: Backlog */}
                  <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-200/60 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-200/50">
                      <span>Backlog</span>
                      <span className="bg-white px-1 rounded text-slate-500">1</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                      <span className="text-[9px] font-mono text-purple-600 font-bold bg-purple-50 px-1 rounded">DevOps</span>
                      <p className="text-[10px] font-semibold text-slate-800 mt-1 leading-tight">
                        Webhook retry exponential backoff
                      </p>
                      <span className="text-[9px] text-slate-400 block mt-1 font-mono">8 pts</span>
                    </div>
                  </div>

                  {/* Column 2: In Progress (WIP Limit) */}
                  <div className="bg-blue-50/40 p-2 rounded-xl border border-blue-200/70 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-blue-700 pb-1 border-b border-blue-200/50">
                      <span>In Progress</span>
                      <span className="bg-white px-1 rounded text-blue-700 font-bold">2/2 WIP</span>
                    </div>

                    {/* Card 1: MCP Server Bridge */}
                    <div className="bg-white p-2 rounded-lg border border-blue-200 shadow-xs flex flex-col gap-1.5">
                      <span className="text-[9px] font-mono text-blue-600 font-bold bg-blue-50 px-1 rounded inline-block self-start">
                        MCP Bridge
                      </span>
                      <p className="text-[10.5px] font-bold text-slate-900 leading-tight">
                        Claude & Cursor MCP bridge handler
                      </p>

                      {/* Interactive checkable subtasks */}
                      <div className="space-y-1 pt-1 border-t border-slate-100">
                        <label className="flex items-center gap-1.5 text-[9.5px] text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={subtaskChecked1}
                            onChange={() => setSubtaskChecked1(!subtaskChecked1)}
                            className="rounded text-[#3F72AF]"
                          />
                          <span className={subtaskChecked1 ? "line-through text-slate-400" : ""}>Protocol schema</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-[9.5px] text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={subtaskChecked2}
                            onChange={() => setSubtaskChecked2(!subtaskChecked2)}
                            className="rounded text-[#3F72AF]"
                          />
                          <span className={subtaskChecked2 ? "line-through text-slate-400" : ""}>Tool dispatch</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-[9.5px] text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={subtaskChecked3}
                            onChange={() => setSubtaskChecked3(!subtaskChecked3)}
                            className="rounded text-[#3F72AF]"
                          />
                          <span className={subtaskChecked3 ? "line-through text-slate-400" : ""}>Unit test suite</span>
                        </label>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1">
                        <span>Sakib</span>
                        <span className="text-blue-600 font-bold">14.5 / 16h</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Done */}
                  <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-200/60 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-200/50">
                      <span>Done</span>
                      <span className="bg-white px-1 rounded text-emerald-600 font-bold">12</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                      <span className="text-[9px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1 rounded">API</span>
                      <p className="text-[10px] font-semibold text-slate-800 mt-1 leading-tight">
                        Stripe webhook idempotency handler
                      </p>
                      <span className="text-[9px] text-emerald-600 font-mono font-bold block mt-1">6.2h billable</span>
                    </div>
                  </div>
                </div>

                {/* AI Workspace Callout */}
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Bot size={13} className="text-[#3F72AF] shrink-0" />
                    <span className="text-slate-700 text-[11px]">
                      Native Claude & Cursor agent integration prevents scope creep with signed sprint caps.
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#3F72AF] bg-white px-2 py-0.5 rounded border border-blue-200">
                    MCP Ready
                  </span>
                </div>
              </div>
            )}

            {/* 4. CONSULTING & ADVISORY FIRMS PREVIEW */}
            {vertical.id === "consulting" && (
              <div className="p-4 sm:p-5 flex flex-col gap-3.5 text-slate-800">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                      <Briefcase size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        Q4 Executive Advisory & Partner Margins
                      </h4>
                      <p className="text-[10px] text-slate-400">Financial intelligence, partner utilization & confidential memos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setConsultingTab("cashflow")}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        consultingTab === "cashflow" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                      }`}
                    >
                      Cash Flow
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultingTab("revenue")}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        consultingTab === "revenue" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                      }`}
                    >
                      Revenue
                    </button>
                  </div>
                </div>

                {/* Financial KPI Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                  <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/60">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Collected Cash</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">$84,200</span>
                    <span className="text-[9px] text-emerald-600 font-semibold block">75.2% collected</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/60">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Total Invoiced</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">$112,000</span>
                    <span className="text-[9px] text-slate-400 block">Net 30 terms</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/60">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Gross Margin</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-600 font-mono">68.4%</span>
                    <span className="text-[9px] text-emerald-600 block">+4.2% vs Q3</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/60">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Partner Utilization</span>
                    <span className="text-sm sm:text-base font-extrabold text-amber-600 font-mono">88.5%</span>
                    <span className="text-[9px] text-slate-500 block">Target: 80%</span>
                  </div>
                </div>

                {/* Utilization & Partner Pacing Bar */}
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 text-[11px]">
                      {consultingTab === "cashflow" ? "Quarterly Cash Flow Pacing" : "Accrued Revenue Recognition"}
                    </span>
                    <span className="font-mono text-emerald-600 font-bold text-[11px]">
                      {consultingTab === "cashflow" ? "$84.2k Collected / $112k Billed" : "$112.0k Recognized"}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: "75%" }} />
                    <div className="h-full bg-amber-400" style={{ width: "15%" }} />
                    <div className="h-full bg-slate-300 rounded-r-full" style={{ width: "10%" }} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Settled ($84.2k)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400" /> In Grace ($18.0k)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-slate-300" /> Retainers ($9.8k)
                    </span>
                  </div>
                </div>

                {/* Confidential Internal Advisory Note (Strictly Hidden from Portal) */}
                <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <Lock size={13} className="text-amber-700 shrink-0" />
                    <span className="text-slate-700 text-[11px] truncate">
                      <strong>Confidential Memo:</strong> M&A scope audit strictly isolated from client portal views.
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300 shrink-0">
                    Internal Only 🔒
                  </span>
                </div>
              </div>
            )}

            {/* 5. FREELANCERS & SOLO STUDIOS PREVIEW */}
            {vertical.id === "freelancers" && (
              <div className="p-4 sm:p-5 flex flex-col gap-3.5 text-slate-800">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                      <UserCheck size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        Flightdeck MyDay — Solo Morning Command Center
                      </h4>
                      <p className="text-[10px] text-slate-400">Replaces ClickUp + QuickBooks + PandaDoc + Typeform in 1 screen</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Morning Routine Ready
                  </span>
                </div>

                {/* 1 Screen Replaces 5 Subscriptions Strip */}
                <div className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs">
                  <span className="text-[10.5px] text-emerald-800 font-medium">
                    Consolidated 5 SaaS bills → Saved <strong>$210/mo</strong> in per-seat subscription fees
                  </span>
                  <span className="text-[9.5px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 hidden sm:inline">
                    Solo License
                  </span>
                </div>

                {/* Daily Agenda & Today's Priorities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {/* Today's Client Calls & Schedule */}
                  <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} className="text-[#3F72AF]" />
                        Today&apos;s Schedule
                      </span>
                      <span className="text-slate-400 font-mono">Oct 14</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-2xs flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-slate-900 block">Strategy Sync</span>
                          <span className="text-[9px] text-slate-400">Nebula Health • Dr. Alexander</span>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                          10:00 AM
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-2xs flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-slate-900 block">Brand Kit Review</span>
                          <span className="text-[9px] text-slate-400">Living with Lolo</span>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                          02:30 PM
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Active Deliverables & Checklist */}
                  <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span className="flex items-center gap-1">
                        <CheckSquare size={11} className="text-emerald-600" />
                        Today&apos;s Deliverables
                      </span>
                      <span className="text-emerald-600 font-mono font-bold">1/2 Done</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-2xs flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={soloChecklist1}
                          onChange={() => setSoloChecklist1(!soloChecklist1)}
                          className="rounded text-emerald-600"
                        />
                        <div className="min-w-0">
                          <span className={`text-[10px] font-bold block ${soloChecklist1 ? "line-through text-slate-400" : "text-slate-900"}`}>
                            Send retainer invoice
                          </span>
                          <span className="text-[9px] text-slate-400">$12,500 via Stripe</span>
                        </div>
                      </label>

                      <label className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-2xs flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={soloChecklist2}
                          onChange={() => setSoloChecklist2(!soloChecklist2)}
                          className="rounded text-emerald-600"
                        />
                        <div className="min-w-0">
                          <span className={`text-[10px] font-bold block ${soloChecklist2 ? "line-through text-slate-400" : "text-slate-900"}`}>
                            Export final SVG icon pack
                          </span>
                          <span className="text-[9px] text-slate-400">Figma release bundle</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Instant Cash Summary */}
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center justify-between text-xs shadow-2xs">
                  <div className="flex items-center gap-2">
                    <DollarSign size={13} className="text-emerald-600 shrink-0" />
                    <span className="text-slate-600 text-[11px]">
                      Cash collected this month: <strong className="text-slate-900">$18,400</strong> (0 overdue invoices)
                    </span>
                  </div>
                  <span className="text-[9.5px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Auto-Payout Fri
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Caption Bar */}
        <p className="mt-2.5 text-[11px] text-slate-500 text-center font-medium leading-normal">
          {vertical.caption}
        </p>
      </div>
    </div>
  );
}

export default function UseCasesPage() {
  const [activeHash, setActiveHash] = useState("marketing");

  useEffect(() => {
    const updateFromHash = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash.replace("#", "").toLowerCase();
        if (hash && VERTICALS.some((v) => v.id === hash)) {
          setActiveHash(hash);
        }
      }
    };

    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);
    return () => window.removeEventListener("hashchange", updateFromHash);
  }, []);

  const scrollToVertical = (id: string) => {
    setActiveHash(id);
    if (typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Use Cases" },
          ]}
          eyebrow="Engineered for Service Businesses"
          title="Built For Every Type of Agency"
          description="Whether you run a fast-paced marketing agency, high-end design studio, software shop, or consulting practice — Eidoncore adapts to your exact workflow."
          ctaPrimary={{
            label: "Start Free Trial →",
            href: "https://register.eidoncore.com/",
          }}
          ctaSecondary={{
            label: "Explore 19 Modules",
            href: "/features/",
          }}
        />

        {/* Clean Sticky Quick-Jump Navigation Bar */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#E7E7EA] py-3.5 shadow-2xs">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none py-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-2 shrink-0 hidden md:inline">
                Jump to Solution:
              </span>
              {VERTICALS.map((v) => {
                const isActive = v.id === activeHash;
                return (
                  <button
                    key={v.id}
                    onClick={() => scrollToVertical(v.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-[#3F72AF] text-white shadow-2xs"
                        : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                    }`}
                  >
                    <span>{v.icon}</span>
                    <span>{v.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Vertical Solutions List (Clean, High-Fidelity Alternating Rows) */}
        <div className="divide-y divide-[#E7E7EA]">
          {VERTICALS.map((vertical, idx) => {
            const isReverse = idx % 2 === 1;

            return (
              <section
                key={vertical.id}
                id={vertical.id}
                className="py-20 md:py-28 scroll-mt-32 bg-white first:pt-16"
              >
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                  <div
                    className={`flex flex-col ${
                      isReverse ? "lg:flex-row-reverse" : "lg:flex-row"
                    } items-center gap-12 lg:gap-16`}
                  >
                    {/* Left / Text Side */}
                    <div className="flex-1 max-w-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-7 h-7 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shadow-2xs">
                          {vertical.icon}
                        </span>
                        <SectionBadge text={`${vertical.name} Solution`} className="!mb-0" />
                      </div>

                      <AnimatedHeading
                        as="h2"
                        text={vertical.tagline}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight"
                      />

                      <p className="mt-4 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed">
                        {vertical.desc}
                      </p>

                      {/* Capabilities Checklist */}
                      <ul className="mt-6 flex flex-col gap-3">
                        {vertical.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={12} strokeWidth={3} />
                            </div>
                            <span className="text-xs sm:text-sm text-[#334155] font-medium leading-snug">
                              {pt}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Included Core Modules */}
                      <div className="mt-7 pt-6 border-t border-[#E7E7EA]">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Key Modules For This Solution
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {vertical.includedModules.map((mod) => (
                            <a
                              key={mod.name}
                              href={mod.href}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[11px] font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                            >
                              <span>{mod.name}</span>
                              <ChevronRight size={10} className="text-slate-400" />
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="mt-8 flex items-center gap-4 flex-wrap">
                        <AnimatedButton
                          as="a"
                          href="https://register.eidoncore.com/"
                          variant="primary"
                          className="text-xs px-5 py-2.5 font-semibold"
                        >
                          Start Free Trial for {vertical.shortName} →
                        </AnimatedButton>
                        <a
                          href={vertical.featureHref}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                          <span>Explore {vertical.featureName}</span>
                          <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>

                    {/* Right / Visual Preview Side (100% Matching Visuals with Live/Screenshot toggle) */}
                    <div className="flex-1 w-full max-w-xl min-w-0">
                      <VerticalVisualPreview vertical={vertical} isReverse={isReverse} />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Why Agencies Run End-to-End on Eidoncore */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-14">
              <SectionBadge text="Unified Platform" />
              <AnimatedHeading
                as="h2"
                text="The Three Core Pillars Every Agency Needs"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]"
              />
              <p className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">
                Regardless of your niche, high-margin agencies run on three connected operational systems: delighted clients, efficient team capacity, and automated cash flow.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {CORE_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-slate-300 transition-all group"
                >
                  <div>
                    <span className="text-[10.5px] font-mono font-bold text-[#3F72AF] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded uppercase tracking-wider">
                      {pillar.tag}
                    </span>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-3">
                      {pillar.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>

                    <div className="my-5 rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs bg-slate-50">
                      <AnimatedImage
                        src={pillar.image}
                        alt={pillar.title}
                        origin="top-right"
                        className="bg-white"
                        imgClassName="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <a
                    href={pillar.href}
                    className="inline-flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight size={13} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Unified FAQ */}
        <FAQSection />

        {/* Global CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
