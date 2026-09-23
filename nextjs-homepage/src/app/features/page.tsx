"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedText from "@/components/AnimatedText";
import SectionBadge from "@/components/SectionBadge";
import {
  Bot,
  FolderKanban,
  CheckCircle2,
  Users,
  Receipt,
  ShoppingBag,
  Zap,
  FileText,
  HelpCircle,
  Layout,
  BarChart3,
  Bell,
  MessageSquare,
  Shield,
  UserCheck,
  FolderArchive,
  ClipboardList,
  Palette,
  Package,
  ArrowRight,
  Sparkles,
  DollarSign,
  Layers,
  Clock,
  Lock,
  Search,
} from "lucide-react";

interface FeatureModule {
  id: string;
  title: string;
  category: "operations" | "clients" | "ai-automation" | "management";
  tag?: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const ALL_MODULES: FeatureModule[] = [
  {
    id: "ai-workspace",
    title: "AI Workspace",
    category: "ai-automation",
    tag: "NEW",
    description: "Connect Claude, Cursor, or any MCP assistant to manage tasks, billing, and projects via role-based OAuth 2.1.",
    href: "/ai-workspace/",
    icon: <Bot size={22} className="text-indigo-600" />,
  },
  {
    id: "projects",
    title: "Projects",
    category: "operations",
    tag: "CORE",
    description: "Budgets, milestones, health scoring, team assignments, time tracking, and progress monitoring in one view.",
    href: "/projects/",
    icon: <FolderKanban size={22} className="text-[#3F72AF]" />,
  },
  {
    id: "tasks",
    title: "Tasks",
    category: "operations",
    tag: "CORE",
    description: "Kanban boards, list views, subtasks, checklists, dependencies, labels, live timers, and threaded comments.",
    href: "/tasks/",
    icon: <CheckCircle2 size={22} className="text-emerald-600" />,
  },
  {
    id: "crm",
    title: "CRM & Clients",
    category: "clients",
    tag: "POPULAR",
    description: "Full client lifecycle - pipeline, contacts, follow-ups, health scoring, contracts, and company documents.",
    href: "/crm/",
    icon: <Users size={22} className="text-amber-600" />,
  },
  {
    id: "invoicing",
    title: "Invoicing & Billing",
    category: "clients",
    tag: "FINANCE",
    description: "Professional invoices, recurring billing, credit notes, refunds, payment tracking, and finance analytics.",
    href: "/invoicing/",
    icon: <Receipt size={22} className="text-purple-600" />,
  },
  {
    id: "services",
    title: "Offerings & Services",
    category: "clients",
    description: "Services & digital products with 5 pricing models, cart & checkout, Stripe, intake forms, and client catalog.",
    href: "/services/",
    icon: <ShoppingBag size={22} className="text-blue-600" />,
  },
  {
    id: "automations",
    title: "Automations",
    category: "ai-automation",
    tag: "WORKFLOWS",
    description: "Trigger → Condition → Action builder - automate task assignments, emails, status changes, and webhook alerts.",
    href: "/automations/",
    icon: <Zap size={22} className="text-amber-500" />,
  },
  {
    id: "proposals",
    title: "Proposals",
    category: "clients",
    description: "Block-based builder, line item pricing, e-signatures, analytics, and one-click conversion to live projects.",
    href: "/proposals/",
    icon: <FileText size={22} className="text-sky-600" />,
  },
  {
    id: "tickets",
    title: "Tickets & Support",
    category: "operations",
    description: "Client support ticketing with SLA tracking, CSAT ratings, auto-assignment, canned responses, and portal sync.",
    href: "/tickets/",
    icon: <HelpCircle size={22} className="text-teal-600" />,
  },
  {
    id: "portal",
    title: "Client Portal",
    category: "clients",
    tag: "WHITE-LABEL",
    description: "Branded client portal for clients to view deliverables, approve milestones, pay invoices, and self-serve.",
    href: "/portal/",
    icon: <Layout size={22} className="text-[#3F72AF]" />,
  },
  {
    id: "reports",
    title: "Reports & Dashboards",
    category: "management",
    description: "Revenue KPIs, project health, task velocity, billable hours, and team workload dashboards rolled up.",
    href: "/reports/",
    icon: <BarChart3 size={22} className="text-rose-600" />,
  },
  {
    id: "notifications",
    title: "Notifications",
    category: "management",
    description: "Real-time in-app alerts, Slack sync, email digests, and customizable notification rules per user role.",
    href: "/notifications/",
    icon: <Bell size={22} className="text-emerald-500" />,
  },
  {
    id: "messaging",
    title: "Team & Client Messaging",
    category: "operations",
    description: "Real-time direct and channel messaging, client threads, file sharing, and unread notification tracking.",
    href: "/messaging/",
    icon: <MessageSquare size={22} className="text-cyan-600" />,
  },
  {
    id: "security",
    title: "Enterprise Security",
    category: "management",
    tag: "SOC 2",
    description: "256-bit encryption, strict agency tenant isolation, OAuth 2.1 tokens, audit trails, and GDPR readiness.",
    href: "/security/",
    icon: <Shield size={22} className="text-indigo-600" />,
  },
  {
    id: "team",
    title: "Team & Permissions",
    category: "management",
    description: "Granular roles, permission matrix, hourly billing rates, workload capacity tracking, and member profiles.",
    href: "/team/",
    icon: <UserCheck size={22} className="text-violet-600" />,
  },
  {
    id: "files",
    title: "File Management",
    category: "operations",
    description: "Secure cloud asset library, versioning, project attachments, client uploads, and preview support.",
    href: "/files/",
    icon: <FolderArchive size={22} className="text-orange-500" />,
  },
  {
    id: "intake-forms",
    title: "Intake Forms",
    category: "clients",
    description: "Dynamic onboarding questionnaires, conditional logic, file upload fields, and auto-conversion to leads/tasks.",
    href: "/intake-forms/",
    icon: <ClipboardList size={22} className="text-pink-600" />,
  },
  {
    id: "white-label",
    title: "White-Label & Domains",
    category: "management",
    tag: "PRO",
    description: "Custom domain CNAME, your agency logo, brand colors, custom email SMTP, and total branding removal.",
    href: "/white-label/",
    icon: <Palette size={22} className="text-fuchsia-600" />,
  },
  {
    id: "digital-products",
    title: "Digital Products",
    category: "clients",
    description: "Sell downloadable templates, design packs, and assets with automated license delivery and Stripe checkout.",
    href: "/digital-products/",
    icon: <Package size={22} className="text-emerald-600" />,
  },
];

const CATEGORIES = [
  { id: "all", label: "All 19 Modules" },
  { id: "operations", label: "Operations" },
  { id: "clients", label: "Clients & Billing" },
  { id: "ai-automation", label: "AI & Automation" },
  { id: "management", label: "Security & Management" },
];

export default function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModules = ALL_MODULES.filter((mod) => {
    const matchesCategory =
      selectedCategory === "all" || mod.category === selectedCategory;
    const matchesSearch =
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Features" },
          ]}
          eyebrow="19 Core Platform Modules"
          title="Every Tool Your Agency Needs. One Platform."
          description="Integrated modules designed to replace your entire disjointed software stack. From project inception to final invoice — every step seamlessly connected."
          ctaPrimary={{ label: "Start Free Trial →", href: "https://register.eidoncore.com/" }}
          ctaSecondary={{ label: "View Pricing", href: "/pricing/" }}
        >
          {/* Search & Filter Bar */}
          <div className="w-full max-w-xl mx-auto flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />
              <input
                type="text"
                placeholder="Search modules (e.g. AI, CRM, Invoicing)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] focus:border-[#3F72AF] focus:ring-2 focus:ring-[#3F72AF]/20 rounded-full text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none transition-all shadow-2xs"
              />
            </div>
          </div>
        </InnerHero>

        {/* Category Pill Filters */}
        <section className="py-6 border-b border-[#E7E7EA] bg-[#F8FAFC] sticky top-16 z-30 backdrop-blur-md bg-white/90">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 select-none ${
                  selectedCategory === cat.id
                    ? "bg-[#0F172A] text-white shadow-xs"
                    : "bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#3F72AF]/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* 19 Modules Grid */}
        <section className="py-16 md:py-24 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                Showing {filteredModules.length} Modules
              </span>
              <span className="text-xs text-[#94A3B8]">
                Click any module for specifications
              </span>
            </div>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filteredModules.map((mod) => (
                <StaggerItem
                  key={mod.id}
                  className="group bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:bg-white hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200"
                >
                  <div>
                    {/* Top Row: Icon + Tag */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200">
                        {mod.icon}
                      </div>
                      {mod.tag && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-white border border-[#E2E8F0] text-[#3F72AF] shadow-2xs">
                          {mod.tag}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                      {mod.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                      {mod.description}
                    </p>
                  </div>

                  <Link
                    href={mod.href}
                    className="mt-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#64748B] group-hover:text-[#0F172A] transition-colors"
                  >
                    <span>Module details</span>
                    <ArrowRight
                      size={13}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Why Unified Architecture Matters */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <SectionBadge text="Unified Ecosystem" />
              <AnimatedHeading
                as="h2"
                text="Why Unified Architecture Matters"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] justify-center"
              />
              <AnimatedText
                text="When every tool lives under one roof, your agency stops losing context, double-paying for SaaS seats, and stitching together fragile zaps."
                mode="line"
                className="mt-4 text-[#64748B] text-base leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-7 flex flex-col justify-between shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                  <DollarSign size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">Save $200+/Month</h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    Replace separate subscriptions for ClickUp, QuickBooks, HubSpot, HoneyBook, and Slack bots. One unified subscription covers your full agency.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-7 flex flex-col justify-between shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3F72AF] flex items-center justify-center mb-5">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">Zero Data Silos</h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    When an invoice is paid, it updates client health in CRM, unlocks deliverables in the portal, and reflects in quarterly revenue reports instantly.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-7 flex flex-col justify-between shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">Save 10+ Hours/Week</h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    No manual copy-pasting, no broken webhooks, and no hunting through 5 browser tabs to find where a client file or feedback was left.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unified FAQ Section */}
        <FAQSection />

        {/* Global CTA Section */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
