"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import JsonLd from "@/components/JsonLd";
import { getBlogPostingSchema } from "@/lib/schema";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";

const ARTICLES = [
  {
    title: "What Is Agency Management Software? A Complete Guide",
    tag: "Guide",
    readTime: "6 min read",
    date: "Nov 2026",
    isoDate: "2026-11-24",
    summary:
      "Learn what agency management software is, which fragmented tools it replaces, and how unified platforms help digital agencies track projects, teams, and client portals.",
    href: "/blog/what-is-agency-management-software/",
  },
  {
    title: "How to Set Up Recurring Invoicing for Retainer Clients",
    tag: "Best Practice",
    readTime: "5 min read",
    date: "Feb 2026",
    isoDate: "2026-02-01",
    summary:
      "Retainer billing shouldn't be manual. Learn how to automate monthly credit card charging via Stripe Connect — set it once, and collect funds on autopilot.",
    href: "/invoicing/",
  },
  {
    title: "Why Every Agency Needs a White-Label Client Portal",
    tag: "Strategy",
    readTime: "5 min read",
    date: "Nov 2026",
    isoDate: "2026-11-24",
    summary:
      "A branded portal under your own domain isn't a vanity luxury — it centralizes deliverables, approvals, files, tickets, and invoices under your agency brand.",
    href: "/blog/white-label-client-portal-for-agencies/",
  },
  {
    title: "Data Security Best Practices for Digital Agencies",
    tag: "Security",
    readTime: "5 min read",
    date: "Jan 2026",
    isoDate: "2026-01-12",
    summary:
      "Your clients trust you with confidential code, brand assets, and customer lists. Here is how modern agencies enforce 2FA, tenant isolation, and audit logs.",
    href: "/security/",
  },
  {
    title: "Automating Agency Operations: A Practical Playbook",
    tag: "Productivity",
    readTime: "7 min read",
    date: "Jan 2026",
    isoDate: "2026-01-05",
    summary:
      "Manual task reassignments and overdue invoice chasing drain agency momentum. Discover high-converting trigger-and-action rules that save 10+ hours weekly.",
    href: "/automations/",
  },
  {
    title: "How Agencies Use MCP AI Workflows to Automate Operations",
    tag: "AI Tech",
    readTime: "5 min read",
    date: "Nov 2026",
    isoDate: "2026-11-24",
    summary:
      "A deep dive into how standard MCP protocols enable Claude, Cursor, and Windsurf to inspect project states, draft estimates, and resolve tickets securely.",
    href: "/blog/mcp-ai-workflows-for-digital-agencies/",
  },
  {
    title: "How to Scale a Digital Agency Without Tool Sprawl",
    tag: "Agency Management",
    readTime: "6 min read",
    date: "Nov 2026",
    isoDate: "2026-11-24",
    summary:
      "Why tool fragmentation slows growing digital agencies, how per-seat SaaS pricing erodes margins, and how to unify projects, CRM, portals, and billing.",
    href: "/blog/how-to-scale-a-digital-agency-without-tool-sprawl/",
  },
  {
    title: "How to Build Automated Agency Onboarding Workflows",
    tag: "Agency Operations",
    readTime: "5 min read",
    date: "Nov 2026",
    isoDate: "2026-11-24",
    summary:
      "Automate client onboarding from signed proposal and conditional intake form to instant project spinup, portal access, and kickoff invoicing.",
    href: "/blog/automated-agency-onboarding-workflows/",
  },
  {
    title: "Important Agency KPIs: Utilization, Margin & On-Time Delivery",
    tag: "Agency Intelligence",
    readTime: "6 min read",
    date: "Nov 2026",
    isoDate: "2026-11-24",
    summary:
      "Track billable utilization, project budget burndown, client health scores, and on-time milestone delivery in one live executive view.",
    href: "/blog/important-agency-kpis-utilization-margin/",
  },
];

export default function BlogPage() {
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Agency Insights & Playbooks — Eidoncore",
    description: "Actionable strategies, workflow automations, and operational best practices from agency operators who scaled past $1M ARR.",
    itemListElement: ARTICLES.map((post, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: getBlogPostingSchema({
        title: post.title,
        summary: post.summary,
        date: post.isoDate,
        href: post.href,
      }),
    })),
  };

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <JsonLd schema={blogListSchema} />
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Blog" },
          ]}
          eyebrow="The Agency Playbook"
          title="Agency Insights & Playbooks"
          description="Actionable strategies, workflow automations, and operational best practices from agency operators who scaled past $1M ARR."
        />

        {/* Blog Post Grid (Platform modules box style & slow reveal) */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ARTICLES.map((post) => (
                <StaggerItem
                  key={post.title}
                  className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold bg-blue-50 text-[#2F5F96] border border-blue-200 whitespace-nowrap shrink-0">
                        {post.tag}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] font-mono whitespace-nowrap">
                        <Clock size={11} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h2 className="text-base font-bold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-2.5 text-xs text-[#64748B] leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                    <span className="text-[11px] font-mono text-[#64748B]">{post.date}</span>
                    <a
                      href={post.href}
                      className="font-medium text-[11px] inline-flex items-center gap-1 text-[#3F72AF] group-hover:underline"
                    >
                      Read Guide <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </a>
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
