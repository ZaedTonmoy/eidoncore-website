"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import {
  BookOpen,
  Terminal,
  ShieldCheck,
  Bot,
  Zap,
  FolderKanban,
  Receipt,
  Users,
  Search,
  ArrowRight,
  Code,
  Check,
} from "lucide-react";

const DOCS_SECTIONS = [
  {
    category: "Getting Started",
    icon: <BookOpen size={20} className="text-[#3F72AF]" />,
    articles: [
      {
        title: "Quickstart: Set Up in Under 10 Minutes",
        desc: "Step-by-step setup of your workspace name, default currency, brand colors, and team invitations.",
      },
      {
        title: "Inviting Team Members & Roles",
        desc: "Learn the distinction between Owners, Admins, Project Managers, Members, and Contractors.",
      },
      {
        title: "Client Portal & Custom Domain CNAME",
        desc: "Point portal.youragency.com with automated Let's Encrypt SSL certificates.",
      },
    ],
  },
  {
    category: "AI Workspace & MCP",
    icon: <Bot size={20} className="text-indigo-600" />,
    articles: [
      {
        title: "Connecting Claude Desktop to Eidoncore",
        desc: "Configure your claude_desktop_config.json with OAuth 2.1 PKCE to interact with your agency tools.",
      },
      {
        title: "Cursor & Windsurf AI Integration",
        desc: "Run background agency commands directly from your IDE development environment.",
      },
      {
        title: "111+ Native MCP Tools Schema",
        desc: "Full JSON Schema documentation for all project, invoicing, CRM, and analytics AI tools.",
      },
    ],
  },
  {
    category: "Financials & Billing",
    icon: <Receipt size={20} className="text-purple-600" />,
    articles: [
      {
        title: "Stripe Connect Onboarding",
        desc: "Connect your Stripe account to start collecting credit cards, Apple Pay, and ACH transfers.",
      },
      {
        title: "Automated Recurring Retainer Setup",
        desc: "Configure monthly retainer schedules with auto-charging and smart dunning emails.",
      },
      {
        title: "Milestone-Based Invoicing",
        desc: "Link project milestones to invoice line items for automatic billing upon client sign-off.",
      },
    ],
  },
  {
    category: "Developer & API",
    icon: <Terminal size={20} className="text-emerald-600" />,
    articles: [
      {
        title: "REST API Authentication & Scopes",
        desc: "Generate secure Bearer tokens and configure granular read/write permission scopes.",
      },
      {
        title: "Outbound HMAC Webhooks",
        desc: "Verify webhook signatures and listen to real-time events for Slack or Zapier automation.",
      },
      {
        title: "Rate Limits & Error Codes",
        desc: "Understand API throughput limits, standard HTTP error responses, and retry backoff.",
      },
    ],
  },
];

export default function DocsPage() {
  const [search, setSearch] = useState("");

  const filteredSections = DOCS_SECTIONS.map((sec) => ({
    ...sec,
    articles: sec.articles.filter(
      (a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((sec) => sec.articles.length > 0);

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Documentation" },
          ]}
          eyebrow="Help Center & Developer Hub"
          title="Eidoncore Documentation"
          description="Everything you need to configure your agency workspace, connect AI assistants via MCP, automate client workflows, and integrate custom APIs."
        >
          {/* Search Bar */}
          <div className="w-full max-w-md relative mt-4">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />
            <input
              type="text"
              placeholder="Search guides, tutorials, or API endpoints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#3F72AF] focus:ring-1 focus:ring-[#3F72AF] shadow-2xs transition-colors"
            />
          </div>
        </InnerHero>

        {/* Documentation Sections Grid (Platform modules box style & slow reveal) */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col gap-16">
            {filteredSections.map((sec) => (
              <div key={sec.category}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-2xs">
                    {sec.icon}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                    {sec.category}
                  </h2>
                </div>

                <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sec.articles.map((art) => (
                    <StaggerItem
                      key={art.title}
                      className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200"
                    >
                      <div>
                        <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                          {art.title}
                        </h3>
                        <p className="mt-2.5 text-xs text-[#64748B] leading-relaxed">
                          {art.desc}
                        </p>
                      </div>

                      <div className="mt-6 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                        <span className="font-medium text-[11px]">Read documentation</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            ))}
          </div>
        </section>

        {/* Unified FAQ */}
        <FAQSection />

        {/* Global CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
