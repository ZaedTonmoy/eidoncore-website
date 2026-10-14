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
    url: "app.eidoncore.com/organizations",
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
    image: "/images/24-offerings-digital-products-catalog-grid.png",
    url: "app.eidoncore.com/offerings/digital-products",
    caption: "Package design sprints, brand kits, and asset packs with client download gating.",
    featureHref: "/digital-products/",
    featureName: "Digital Products",
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
    url: "app.eidoncore.com/tasks/board",
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
    url: "app.eidoncore.com/reports/financials",
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

                    {/* Right / Visual Preview Side */}
                    <div className="flex-1 w-full max-w-xl">
                      <BlendMockupCard className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-3 sm:p-4">
                        {/* Chrome bar */}
                        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            {vertical.url}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                            Active
                          </span>
                        </div>

                        {/* Screenshot */}
                        <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50">
                          <AnimatedImage
                            src={vertical.image}
                            alt={vertical.name}
                            origin={isReverse ? "top-left" : "top-right"}
                            className="bg-white"
                            imgClassName="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                          />
                        </div>

                        {/* Caption */}
                        <p className="mt-3 text-[11.5px] text-slate-500 leading-snug px-1">
                          {vertical.caption}
                        </p>
                      </BlendMockupCard>
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
