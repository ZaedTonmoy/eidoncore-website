"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
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
  Sparkles,
  Layers,
  Clock,
  Receipt,
  Globe,
  Lock,
  ChevronRight,
  ExternalLink,
  Kanban,
  FileText,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";

interface ScreenItem {
  id: string;
  name: string;
  badge: string;
  image: string;
  url: string;
  caption: string;
  featureHref: string;
  featureName: string;
  highlightTags: string[];
}

interface VerticalItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  tagline: string;
  desc: string;
  points: string[];
  includedModules: { name: string; href: string }[];
  screens: ScreenItem[];
}

const VERTICALS: VerticalItem[] = [
  {
    id: "marketing",
    name: "Marketing Agencies",
    icon: <Megaphone size={22} className="text-pink-600" />,
    tagline: "Manage campaigns, retainers, and client approvals with zero chaos",
    desc: "Coordinate ad campaigns, content calendars, and social deliverables across multiple client accounts. Track monthly recurring retainers and send automated performance digests.",
    points: [
      "Campaign milestone schedules with integrated asset reviews",
      "Automated monthly recurring retainer invoicing via Stripe",
      "White-label client portal for real-time campaign reporting",
      "Intake questionnaires for rapid onboarding of new client accounts",
    ],
    includedModules: [
      { name: "CRM", href: "/crm/" },
      { name: "Client Portal", href: "/portal/" },
      { name: "Invoicing", href: "/invoicing/" },
      { name: "Intake Forms", href: "/intake-forms/" },
    ],
    screens: [
      {
        id: "crm",
        name: "Campaign CRM & Accounts",
        badge: "Multi-Client Health",
        image: "/images/04-crm-organizations-list-table-view.png",
        url: "app.eidoncore.com/organizations",
        caption: "Track multi-client account stability scores, retainer volume, and relationship health in real time.",
        featureHref: "/crm/",
        featureName: "CRM Module",
        highlightTags: ["Account Stability", "Health Scores", "Milestone Tracking"],
      },
      {
        id: "portal",
        name: "White-Label Client Hub",
        badge: "100% Branded Portal",
        image: "/images/07-crm-org-detail-steven-losada-overview.png",
        url: "portal.clientagency.com/overview",
        caption: "Deliver an executive client experience under your custom domain with zero Eidoncore branding.",
        featureHref: "/portal/",
        featureName: "Client Portal",
        highlightTags: ["Custom CNAME", "Approval Status", "Private Chat"],
      },
      {
        id: "invoices",
        name: "Automated Retainer Billing",
        badge: "Stripe Auto-Pay",
        image: "/images/30-invoicing-my-invoices-and-drafts-list.png",
        url: "app.eidoncore.com/invoices",
        caption: "Automate monthly recurring retainers, eliminate payment chasing, and issue instant receipts.",
        featureHref: "/invoicing/",
        featureName: "Invoicing",
        highlightTags: ["Recurring Retainers", "Stripe Sync", "Zero Chasing"],
      },
    ],
  },
  {
    id: "design",
    name: "Design Studios",
    icon: <Palette size={22} className="text-purple-600" />,
    tagline: "Frictionless design proofs, revision rounds & deliverable delivery",
    desc: "Present Figma links, brand assets, and creative proofs cleanly. Let clients leave targeted feedback and approve milestone releases before final file handoff.",
    points: [
      "Dedicated asset galleries with rich in-browser image previews",
      "Milestone-based approval gating before invoice releases",
      "Productized design subscriptions and one-click add-ons",
      "Expiring download links protecting raw source files",
    ],
    includedModules: [
      { name: "Proposals", href: "/proposals/" },
      { name: "Digital Products", href: "/digital-products/" },
      { name: "Projects", href: "/projects/" },
      { name: "Client Portal", href: "/portal/" },
    ],
    screens: [
      {
        id: "offerings",
        name: "Deliverables & Asset Catalog",
        badge: "Design Sprints",
        image: "/images/24-offerings-digital-products-catalog-grid.png",
        url: "app.eidoncore.com/offerings/digital-products",
        caption: "Showcase brand kits, icon systems, and sprint deliverables with downloadable source galleries.",
        featureHref: "/digital-products/",
        featureName: "Digital Products",
        highlightTags: ["Asset Galleries", "Download Access", "Fixed Sprints"],
      },
      {
        id: "proposals",
        name: "Interactive Scope & E-Sign",
        badge: "Legally Binding",
        image: "/images/10-proposals-editor-draft-preview-prop-015.png",
        url: "app.eidoncore.com/proposals/prop-015",
        caption: "Send interactive creative proposals with optional add-on packages and built-in e-signature signing.",
        featureHref: "/proposals/",
        featureName: "Proposals",
        highlightTags: ["Scope Add-Ons", "Digital Signature", "50% Deposit Gating"],
      },
      {
        id: "projects",
        name: "Milestone Sign-Off & Review",
        badge: "Revision Control",
        image: "/images/16-projects-living-with-lolo-project-view.png",
        url: "app.eidoncore.com/projects/brand-identity",
        caption: "Gate final asset deliveries behind client sign-offs to eliminate scope creep and protect margins.",
        featureHref: "/projects/",
        featureName: "Projects",
        highlightTags: ["Approval Gating", "Milestone Tracking", "Delivery Timelines"],
      },
    ],
  },
  {
    id: "development",
    name: "Software & Web Agencies",
    icon: <Code2 size={22} className="text-[#3F72AF]" />,
    tagline: "Agile sprints, hourly budget burndowns & MCP AI coding tools",
    desc: "Run two-week sprints with Kanban boards, connect Cursor and Claude via native MCP, track billable developer hours, and prevent scope creep with signed estimates.",
    points: [
      "Model Context Protocol (MCP) integration with Claude & Cursor",
      "Kanban sprint boards with WIP limits and subtask checklists",
      "Real-time budget burndown alerts when hours exceed estimates",
      "Outbound signed webhooks to GitHub, Slack, and internal APIs",
    ],
    includedModules: [
      { name: "Tasks", href: "/tasks/" },
      { name: "Projects", href: "/projects/" },
      { name: "AI Workspace", href: "/ai-workspace/" },
      { name: "Tickets", href: "/tickets/" },
    ],
    screens: [
      {
        id: "kanban",
        name: "Sprint Kanban & Backlog",
        badge: "Agile Workflows",
        image: "/images/20-tasks-kanban-board-in-progress-column.png",
        url: "app.eidoncore.com/tasks/board",
        caption: "Run agile engineering sprints with work-in-progress limits, priority flags, and subtask trees.",
        featureHref: "/tasks/",
        featureName: "Tasks & Sprints",
        highlightTags: ["WIP Limits", "Subtask Trees", "Sprint Velocities"],
      },
      {
        id: "timeline",
        name: "Roadmap & Gantt Sprints",
        badge: "Milestone Roadmap",
        image: "/images/17-projects-living-with-lolo-timeline-view.png",
        url: "app.eidoncore.com/projects/web-app/timeline",
        caption: "Visualize dependencies, release milestones, and sprint burndowns on interactive Gantt timelines.",
        featureHref: "/projects/",
        featureName: "Projects",
        highlightTags: ["Gantt Milestones", "Sprint Burndown", "Scope Defense"],
      },
      {
        id: "tickets",
        name: "Support SLA & Bug Queue",
        badge: "SLA Clocks",
        image: "/images/27-tickets-support-inbox-table-view.png",
        url: "app.eidoncore.com/tickets",
        caption: "Route client bug tickets to engineer queues with automated SLA countdown timers and priority levels.",
        featureHref: "/tickets/",
        featureName: "Tickets & SLAs",
        highlightTags: ["SLA Countdown", "Auto-Routing", "Client Bug Queue"],
      },
    ],
  },
  {
    id: "consulting",
    name: "Consulting & Advisory Firms",
    icon: <Briefcase size={22} className="text-amber-600" />,
    tagline: "Professional engagement tracking, confidential notes & time audits",
    desc: "Track client engagements with clear milestone deliverables, calculate utilization rates across senior partners and associates, and maintain confidential internal notes.",
    points: [
      "Internal advisory notes strictly isolated from client portal views",
      "Partner and associate billable utilization analytics",
      "Custom proposal contracts with legally binding digital e-signatures",
      "Professional itemized invoices supporting multi-currency billing",
    ],
    includedModules: [
      { name: "Reports", href: "/reports/" },
      { name: "Proposals", href: "/proposals/" },
      { name: "Invoicing", href: "/invoicing/" },
      { name: "Team", href: "/team/" },
    ],
    screens: [
      {
        id: "reports",
        name: "Financial Overview & Margins",
        badge: "Partner Intelligence",
        image: "/images/33-reports-workspace-overview-at-a-glance.png",
        url: "app.eidoncore.com/reports/financials",
        caption: "Monitor partner profitability, gross margins, cash flow runway, and revenue trends across quarters.",
        featureHref: "/reports/",
        featureName: "Reports",
        highlightTags: ["Partner Margins", "Cash Flow Forecast", "EBITDA Health"],
      },
      {
        id: "workload",
        name: "Team Capacity & Utilization",
        badge: "Billable Hours",
        image: "/images/21-tasks-team-workload-capacity-allocation.png",
        url: "app.eidoncore.com/tasks/workload",
        caption: "Audit associate billable hours and workload distribution to prevent project bottlenecks.",
        featureHref: "/team/",
        featureName: "Team Directory",
        highlightTags: ["Billable Allocation", "Utilization Rate", "Resource Planning"],
      },
      {
        id: "proposals",
        name: "Engagement Contracts Pipeline",
        badge: "Advisory Deals",
        image: "/images/09-proposals-pipeline-dashboard-list.png",
        url: "app.eidoncore.com/proposals",
        caption: "Move strategic advisory engagements through draft, legal review, and digital e-signature acceptance.",
        featureHref: "/proposals/",
        featureName: "Proposals",
        highlightTags: ["Retainer Agreements", "E-Signature Audit", "Conversion Stats"],
      },
    ],
  },
  {
    id: "freelancers",
    name: "Freelancers & Solo Studios",
    icon: <UserCheck size={22} className="text-emerald-600" />,
    tagline: "One platform that replaces 5 subscriptions for solo creators",
    desc: "Look like a 20-person agency with a custom-branded portal, professional proposals, automated invoice reminders, and self-service productized services.",
    points: [
      "Free 14-day trial without needing a credit card",
      "Replace ClickUp, QuickBooks, Pandadoc, and Typeform in 1 tool",
      "Productized service catalog allowing clients to buy online",
      "Flat pricing that never penalizes you for inviting contractors",
    ],
    includedModules: [
      { name: "Dashboard", href: "/dashboard/" },
      { name: "Services", href: "/services/" },
      { name: "Invoicing", href: "/invoicing/" },
      { name: "Proposals", href: "/proposals/" },
    ],
    screens: [
      {
        id: "flightdeck",
        name: "Flightdeck All-in-One",
        badge: "Solo Command",
        image: "/images/01-dashboard-myday-flightdeck-overview.png",
        url: "app.eidoncore.com/dashboard/myday",
        caption: "Start your morning with a unified agenda: due deliverables, project status, and unpaid invoices.",
        featureHref: "/dashboard/",
        featureName: "Dashboard",
        highlightTags: ["Daily Agenda", "Replaces 5 Tools", "Launch Window"],
      },
      {
        id: "services",
        name: "Productized Services Store",
        badge: "Upfront Checkout",
        image: "/images/23-offerings-services-catalog-grid.png",
        url: "app.eidoncore.com/offerings/services",
        caption: "Sell fixed-scope advisory packages, design audits, and consults directly through self-checkout.",
        featureHref: "/services/",
        featureName: "Services Catalog",
        highlightTags: ["Upfront Payment", "Self-Service", "Zero Scope Creep"],
      },
      {
        id: "paid",
        name: "Paid Receipts & Invoices",
        badge: "Zero Chasing",
        image: "/images/31-invoicing-invoice-detail-inv-00043-paid.png",
        url: "app.eidoncore.com/invoices/inv-00043",
        caption: "Generate clean itemized invoices with automated payment reminders and instant card processing.",
        featureHref: "/invoicing/",
        featureName: "Invoicing",
        highlightTags: ["Instant Stripe Receipt", "Auto-Reminders", "PDF Export"],
      },
    ],
  },
];

const CROSS_AGENCY_PILLARS = [
  {
    idx: "01",
    tag: "Client Retention",
    title: "The 100% White-Label Client Portal",
    desc: "Every agency thrives when clients feel empowered and informed. Replace endless status update emails with a branded portal under your own custom domain.",
    image: "/images/07-crm-org-detail-steven-losada-overview.png",
    url: "portal.youragency.com",
    features: [
      "Custom CNAME domain mapping with zero Eidoncore branding",
      "Public vs. private internal task toggles for total privacy",
      "Real-time milestone progress bars and asset download links",
      "Instant ticket submission and direct client-team comments",
    ],
    linkText: "Explore Client Portal Module",
    href: "/portal/",
  },
  {
    idx: "02",
    tag: "Operational Execution",
    title: "Agile Task Delivery & Team Capacity",
    desc: "Eliminate missed deadlines with visual Kanban boards, multi-assignee task workflows, and team workload heatmaps that keep production on track.",
    image: "/images/20-tasks-kanban-board-in-progress-column.png",
    url: "app.eidoncore.com/tasks",
    features: [
      "Kanban sprint boards with WIP limits and priority flags",
      "Integrated timer logging synced directly to invoice line items",
      "Team workload capacity matrix preventing burnout",
      "Subtask checklists with milestone completion gating",
    ],
    linkText: "Explore Tasks & Sprints Module",
    href: "/tasks/",
  },
  {
    idx: "03",
    tag: "Cash Flow & Margin",
    title: "Predictable Retainers & Financial Health",
    desc: "Connect your deliverables directly to cash flow. Collect 50% deposits upon proposal signature and automate monthly retainers via Stripe.",
    image: "/images/33-reports-workspace-overview-at-a-glance.png",
    url: "app.eidoncore.com/reports",
    features: [
      "Stripe-powered automated recurring retainer billing",
      "Proposal acceptance actions that auto-create projects",
      "Real-time EBITDA, gross margin, and cash flow reports",
      "Zero-chase invoice reminders with automatic late penalties",
    ],
    linkText: "Explore Financial Reports Module",
    href: "/reports/",
  },
];

export default function UseCasesPage() {
  const [selectedVertical, setSelectedVertical] = useState("marketing");
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);

  // Sync hash anchor on mount and on hash changes (e.g. /use-cases/#design)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash.replace("#", "").toLowerCase();
        if (hash && VERTICALS.some((v) => v.id === hash)) {
          setSelectedVertical(hash);
          setSelectedScreenIndex(0);
          const el = document.getElementById("solutions-anchor");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const current = VERTICALS.find((v) => v.id === selectedVertical) || VERTICALS[0];
  const activeScreen = current.screens[selectedScreenIndex] || current.screens[0];

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

        {/* Agency Verticals Bento Selector */}
        <section id="solutions-anchor" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-[#E7E7EA] scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12">
              <SectionBadge text="Industry Solutions" />
              <AnimatedHeading
                as="h2"
                text="Tailored for Your Exact Business Model"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]"
              />
              <p className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">
                Click any agency type below to see how Eidoncore optimizes deliverables, billing, and client communication for your niche.
              </p>
            </div>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {VERTICALS.map((v) => {
                const isActive = v.id === selectedVertical;

                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVertical(v.id);
                      setSelectedScreenIndex(0);
                      if (typeof window !== "undefined") {
                        window.history.replaceState(null, "", `#${v.id}`);
                      }
                    }}
                    className="text-left w-full focus:outline-hidden cursor-pointer"
                  >
                    <StaggerItem
                      className={`h-full group rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 border ${
                        isActive
                          ? "bg-white border-[#3F72AF] shadow-md ring-2 ring-[#3F72AF]/20"
                          : "bg-white/80 border-[#E2E8F0] hover:bg-white hover:border-[#3F72AF]/40 hover:shadow-xs"
                      }`}
                    >
                      <div>
                        <div
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 transition-transform duration-200 ${
                            isActive
                              ? "bg-blue-50/70 border-blue-200 shadow-2xs scale-105"
                              : "bg-[#F8FAFC] border-[#E2E8F0] group-hover:scale-105"
                          }`}
                        >
                          {v.icon}
                        </div>
                        <h3 className="text-sm font-bold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                          {v.name}
                        </h3>
                      </div>
                      <span className="mt-4 text-[11px] font-semibold text-[#3F72AF] inline-flex items-center gap-1">
                        {isActive ? "Viewing" : "Explore"} <ArrowRight size={11} />
                      </span>
                    </StaggerItem>
                  </button>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        {/* Selected Vertical Deep Dive */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-14">
              {/* Text side */}
              <div className="flex-1 max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shadow-2xs">
                    {current.icon}
                  </span>
                  <SectionBadge text={`${current.name} Solution`} className="!mb-0" />
                </div>

                <AnimatedHeading
                  key={current.id}
                  as="h2"
                  text={current.tagline}
                  immediate={true}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight"
                />

                <p className="mt-4 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed">
                  {current.desc}
                </p>

                {/* Key Points */}
                <ul className="mt-6 flex flex-col gap-3">
                  {current.points.map((pt) => (
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

                {/* Included Core Modules Pill Strip */}
                <div className="mt-7 pt-6 border-t border-[#E7E7EA]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Included Core Modules For This Solution
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {current.includedModules.map((mod) => (
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
                    Start Free Trial for {current.name} →
                  </AnimatedButton>
                  <a
                    href="/pricing/"
                    className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
                  >
                    View Pricing Plans
                  </a>
                </div>
              </div>

              {/* Multi-Screen Dashboard Preview Side */}
              <div className="flex-1 w-full max-w-xl">
                {/* Screen Tab Switcher */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/80 border border-slate-200/70 mb-3 overflow-x-auto scrollbar-none">
                  {current.screens.map((scr, idx) => {
                    const isScreenActive = idx === selectedScreenIndex;
                    return (
                      <button
                        key={scr.id}
                        onClick={() => setSelectedScreenIndex(idx)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          isScreenActive
                            ? "bg-white text-slate-900 shadow-2xs border border-slate-200/80"
                            : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                        }`}
                      >
                        <span>{scr.name}</span>
                        <span
                          className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                            isScreenActive
                              ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                              : "bg-slate-200/70 text-slate-500"
                          }`}
                        >
                          {scr.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Dashboard Screenshot Mockup Card */}
                <BlendMockupCard className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-2 sm:p-3">
                  {/* Browser Chrome Header */}
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100 px-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10.5px] font-mono text-slate-500 max-w-[280px] truncate">
                      <Lock size={10} className="text-slate-400 shrink-0" />
                      <span className="truncate">{activeScreen.url}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Live Screen</span>
                    </div>
                  </div>

                  {/* Main Animated Screenshot */}
                  <div className="rounded-xl border border-slate-200/80 bg-[#FAFAFA] overflow-hidden">
                    <AnimatedImage
                      key={activeScreen.image}
                      src={activeScreen.image}
                      alt={activeScreen.name}
                      origin="top-right"
                      className="bg-white"
                      imgClassName="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                    />
                  </div>

                  {/* Screen Details & Module Link Footer */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {activeScreen.caption}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        {activeScreen.highlightTags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9.5px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={activeScreen.featureHref}
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0 whitespace-nowrap self-start sm:self-auto"
                    >
                      <span>Explore {activeScreen.featureName}</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </BlendMockupCard>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Agency Core Workflows Section */}
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {CROSS_AGENCY_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-slate-300 transition-all group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider">
                        Pillar {pillar.idx}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                      {pillar.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>

                    {/* Screenshot Container */}
                    <div className="my-5">
                      <BlendMockupCard className="bg-slate-50 rounded-xl border border-slate-200/70 p-2 overflow-hidden shadow-2xs">
                        <div className="flex items-center gap-1 pb-1.5 mb-1.5 border-b border-slate-200/60">
                          <div className="w-2 h-2 rounded-full bg-slate-300" />
                          <div className="w-2 h-2 rounded-full bg-slate-300" />
                          <div className="w-2 h-2 rounded-full bg-slate-300" />
                          <span className="text-[9px] font-mono text-slate-400 ml-1.5">
                            {pillar.url}
                          </span>
                        </div>
                        <AnimatedImage
                          src={pillar.image}
                          alt={pillar.title}
                          origin="top-right"
                          className="rounded-lg border border-slate-200 bg-white"
                          imgClassName="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </BlendMockupCard>
                    </div>

                    {/* Checklist */}
                    <ul className="space-y-2 mb-6">
                      {pillar.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                          <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} strokeWidth={3} />
                          </div>
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={pillar.href}
                    className="inline-flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
                  >
                    <span>{pillar.linkText}</span>
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
