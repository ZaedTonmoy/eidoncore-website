"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedButton from "@/components/AnimatedButton";
import { Sparkles, Bot, Shield, Globe, Zap, ArrowRight, CheckCircle2, GitBranch } from "lucide-react";

const RELEASES = [
  {
    version: "v2.4.0",
    date: "September 2026",
    title: "AI Workspace & Model Context Protocol (MCP)",
    badge: "MAJOR RELEASE",
    summary:
      "Full integration with Claude Desktop, Cursor, and Windsurf via standard MCP. Over 111+ native agency tools with OAuth 2.1 PKCE security.",
    icon: <Bot size={20} className="text-indigo-600" />,
    items: [
      "Native Model Context Protocol (MCP) server integration",
      "OAuth 2.1 authorization with PKCE and token rotation",
      "111+ pre-built agency tools covering tasks, CRM, invoices, and analytics",
      "Role-aware tool filtering preventing non-admin data leaks",
    ],
  },
  {
    version: "v2.3.0",
    date: "August 2026",
    title: "White-Label CNAME Domains & Custom SMTP",
    badge: "ENHANCEMENT",
    summary:
      "Map portal.youragency.com with zero Eidoncore branding. Automated SSL certificate generation and custom email SMTP routing.",
    icon: <Globe size={20} className="text-blue-600" />,
    items: [
      "Custom CNAME domain routing with automated Let's Encrypt SSL",
      "Custom SMTP server support for transactional client emails",
      "Bespoke login page wallpaper, logo, and hex accent colors",
      "White-label invoice PDFs and proposal signature certificates",
    ],
  },
  {
    version: "v2.2.0",
    date: "July 2026",
    title: "Recurring Billing & Retainer Automation",
    badge: "NEW FEATURE",
    summary:
      "Set up recurring retainer subscriptions with automated Stripe credit card charging and smart dunning retry emails.",
    icon: <Zap size={20} className="text-amber-500" />,
    items: [
      "Weekly, monthly, and quarterly recurring invoice schedules",
      "Direct Stripe Connect integration with zero merchant surcharge",
      "Automated polite payment reminder emails 3 days before/after due date",
      "Multi-currency billing across 135+ global currencies",
    ],
  },
  {
    version: "v2.1.0",
    date: "June 2026",
    title: "Kanban Sprint Boards & Integrated Timers",
    badge: "PERFORMANCE",
    summary:
      "Fluid drag-and-drop task boards with WIP limits, subtask checklists, and one-click task timers synced to client invoices.",
    icon: <Sparkles size={20} className="text-emerald-600" />,
    items: [
      "High-speed drag-and-drop Kanban boards with custom stages",
      "Subtask checklists with individual specialist assignees",
      "One-click stopwatch timers with billable/non-billable tagging",
      "Automated import of tracked hours into invoice line items",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Changelog" },
          ]}
          eyebrow="Continuous Deployment"
          title="What's New in Eidoncore"
          description="Every major release, improvement, and performance tuning — shipped and documented. We build fast so your agency can scale faster."
          ctaPrimary={{
            label: "Start Free Trial →",
            href: "https://register.eidoncore.com/",
          }}
          ctaSecondary={{
            label: "View GitHub Repo",
            href: "https://github.com/ZaedTonmoy/cw_agency",
          }}
        />

        {/* Release Timeline (Platform modules box style & slow reveal) */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            <StaggerGroup className="flex flex-col gap-8">
              {RELEASES.map((rel) => (
                <StaggerItem
                  key={rel.version}
                  className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200"
                >
                  <div>
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200">
                          {rel.icon}
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-[#3F72AF]">
                            {rel.version}
                          </span>
                          <span className="text-xs text-[#94A3B8] ml-2 font-mono">
                            • {rel.date}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {rel.badge}
                      </span>
                    </div>

                    {/* Title & Summary */}
                    <h3 className="text-xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                      {rel.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {rel.summary}
                    </p>

                    {/* Checklist */}
                    <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-[#F1F5F9]">
                      {rel.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-xs text-[#334155]">
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
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
