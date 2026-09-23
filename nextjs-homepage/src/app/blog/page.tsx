"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";

const ARTICLES = [
  {
    title: "5 Signs Your Agency Has Outgrown Spreadsheets",
    tag: "Guide",
    readTime: "4 min read",
    date: "Feb 2026",
    summary:
      "If you're still tracking projects in Excel and invoicing in Word, you're losing billable hours and margin. Here is the blueprint for modern agency consolidation.",
    href: "/features/",
  },
  {
    title: "How to Set Up Recurring Invoicing for Retainer Clients",
    tag: "Best Practice",
    readTime: "5 min read",
    date: "Feb 2026",
    summary:
      "Retainer billing shouldn't be manual. Learn how to automate monthly credit card charging via Stripe Connect — set it once, and collect funds on autopilot.",
    href: "/invoicing/",
  },
  {
    title: "Why Every Agency Needs a White-Label Client Portal",
    tag: "Strategy",
    readTime: "6 min read",
    date: "Jan 2026",
    summary:
      "A branded portal under your own domain isn't a vanity luxury — it's a massive competitive differentiator that cuts 'status check' emails by over 40%.",
    href: "/portal/",
  },
  {
    title: "Data Security Best Practices for Digital Agencies",
    tag: "Security",
    readTime: "5 min read",
    date: "Jan 2026",
    summary:
      "Your clients trust you with confidential code, brand assets, and customer lists. Here is how modern agencies enforce 2FA, tenant isolation, and audit logs.",
    href: "/security/",
  },
  {
    title: "Automating Agency Operations: A Practical Playbook",
    tag: "Productivity",
    readTime: "7 min read",
    date: "Jan 2026",
    summary:
      "Manual task reassignments and overdue invoice chasing drain agency momentum. Discover high-converting trigger-and-action rules that save 10+ hours weekly.",
    href: "/automations/",
  },
  {
    title: "Connecting Claude & Cursor via Model Context Protocol",
    tag: "AI Tech",
    readTime: "6 min read",
    date: "Dec 2025",
    summary:
      "A deep dive into how standard MCP protocols enable modern AI models to inspect project states, draft estimates, and resolve tickets securely.",
    href: "/ai-workspace/",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
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
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold bg-blue-50 text-[#3F72AF] border border-blue-200">
                        {post.tag}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] font-mono">
                        <Clock size={11} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-[#64748B] leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                    <span className="text-[11px] font-mono text-[#94A3B8]">{post.date}</span>
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
