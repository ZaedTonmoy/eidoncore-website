"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedText from "@/components/AnimatedText";
import SectionBadge from "@/components/SectionBadge";
import AnimatedImage from "@/components/AnimatedImage";
import SaaSConvergenceGraphic from "@/components/SaaSConvergenceGraphic";
import {
  Compass,
  Cpu,
  Layers,
  Shield,
  Zap,
  Sparkles,
  Users2,
  TrendingUp,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";

const VALUES = [
  {
    icon: <Sparkles size={20} className="text-[#3F72AF]" />,
    title: "Simplicity First",
    desc: "Complex functionality, simple interface. Every feature should feel intuitive on day one — no multi-week training manuals required.",
  },
  {
    icon: <Shield size={20} className="text-emerald-600" />,
    title: "Security by Design",
    desc: "SOC 2-ready architecture with strict tenant isolation, 256-bit encryption, 2FA, and granular role management built into the core.",
  },
  {
    icon: <Zap size={20} className="text-amber-500" />,
    title: "Speed Obsessed",
    desc: "Every interaction should feel instant. We optimize for speed at every level — from optimistic UI state to sub-50ms query execution.",
  },
  {
    icon: <Layers size={20} className="text-purple-600" />,
    title: "Design Excellence",
    desc: "We believe business tools should be beautiful. Pixel-perfect, high-contrast interfaces that agencies are genuinely proud to show clients.",
  },
  {
    icon: <Users2 size={20} className="text-indigo-600" />,
    title: "Agency-Centric",
    desc: "Every single feature is tailored to how agencies actually work — multi-client, multi-project, multi-brand, and asynchronous team workflows.",
  },
  {
    icon: <TrendingUp size={20} className="text-blue-600" />,
    title: "Growth Enabler",
    desc: "From solo freelancer to 100-person agency — Eidoncore scales with you without hitting pricing walls or requiring database migrations.",
  },
];

const LEADERS = [
  {
    name: "Zaed Bin Abedin Tonmoy",
    role: "Founder & CEO",
    bio: "Engineer turned founder with 6+ years in tech. Designed, architected, and built Eidoncore end-to-end — from database schema to pixel-perfect UI. Also founded Creation Wave LLC.",
    image: "/images/team-zaed-modern.webp",
    highlights: ["Product Architecture", "UI / UX Systems", "Growth & Strategy", "Agency Ops"],
  },
  {
    name: "Md Sakib Shahariar Tanoy",
    role: "CTO & Head of Development",
    bio: "Leading Eidoncore's technical architecture and development. Expert in web systems, security protocols, high-concurrency databases, and building resilient infrastructure.",
    image: "/images/team-tanoy-modern.webp",
    highlights: ["Distributed Systems", "Database Security", "Real-time Infrastructure", "API Architecture"],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About" },
          ]}
          eyebrow="Our Mission & Philosophy"
          title="Built by Agency People, For Agency People"
          description="We've lived the frustration of managing clients, deliverables, invoices, and teams across 5 disconnected browser tabs. Eidoncore is the unified operating system we wished existed."
          ctaPrimary={{ label: "Explore Platform", href: "/features/" }}
          ctaSecondary={{ label: "Meet the Team", href: "#leadership" }}
        />

        {/* Origin Story / The Problem */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <div className="lg:col-span-6 flex flex-col items-start">
                <SectionBadge text="The Genesis" />
                <AnimatedHeading
                  as="h2"
                  text="From Frustration to Foundation"
                  className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight text-left"
                />
                <p className="mt-5 text-[#64748B] text-sm sm:text-base leading-relaxed">
                  It started with a spreadsheet. Then a second one. Then a third. Before long, we were running our agency across <strong className="text-[#0F172A]">Asana for projects, Trello for tasks, HubSpot for CRM, QuickBooks for invoicing, and Slack for client chat</strong>.
                </p>
                <p className="mt-4 text-[#64748B] text-sm sm:text-base leading-relaxed">
                  Five logins. Five tabs open all day. Five monthly SaaS bills per seat. Worst of all, every time a client asked for an update or an invoice was delayed, team members had to manually cross-reference 3 different apps.
                </p>
                <div className="mt-8 p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#3F72AF] flex items-center justify-center shrink-0">
                    <Compass size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">Our Realization</h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      Agencies don&apos;t need 6 disconnected point solutions. They need one foundational platform where client CRM, task execution, autonomous AI workflows, and financial billing share the exact same database.
                    </p>
                  </div>
                </div>
              </div>

              {/* Animated SaaS Convergence Graphic */}
              <div className="lg:col-span-6 w-full flex items-center justify-center">
                <SaaSConvergenceGraphic />
              </div>

            </div>
          </div>
        </section>

        {/* Meaning of the Name: Eidon + Core */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <SectionBadge text="Etymology" />
              <AnimatedHeading
                as="h2"
                text="Why the Name Eidoncore?"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] justify-center"
              />
              <p className="mt-4 text-[#64748B] text-base leading-relaxed">
                Every name tells a story. Ours is rooted in classical philosophy and engineering purpose.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-10 shadow-2xs hover:shadow-xs transition-shadow">
                <span className="text-xs font-mono uppercase tracking-wider text-[#3F72AF] font-bold">
                  From the Greek
                </span>
                <h3 className="mt-2 text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  Eidon
                </h3>
                <span className="inline-block mt-1 text-xs text-[#94A3B8] font-mono">
                  Derived from εἶδος (Eidos)
                </span>
                <p className="mt-4 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Meaning <strong className="text-[#0F172A]">form, structure, or essential nature</strong> — the underlying architectural design that gives things clarity and meaning. In philosophy, Eidos represents the ideal blueprint behind every reality.
                </p>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-10 shadow-2xs hover:shadow-xs transition-shadow">
                <span className="text-xs font-mono uppercase tracking-wider text-[#3F72AF] font-bold">
                  The Foundation
                </span>
                <h3 className="mt-2 text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  Core
                </h3>
                <span className="inline-block mt-1 text-xs text-[#94A3B8] font-mono">
                  The central, indispensable heart
                </span>
                <p className="mt-4 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Represents the <strong className="text-[#0F172A]">central engine and bedrock</strong> that everything runs on — the unified operating system that holds agency operations together and orchestrates every workflow from within.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Bento Grid */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <SectionBadge text="Guiding Principles" />
              <AnimatedHeading
                as="h2"
                text="What Drives Us Every Day"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] justify-center"
              />
              <AnimatedText
                text="The principles that guide how we design features, treat customer data, and build for the long haul."
                mode="line"
                className="mt-4 text-[#64748B] text-base leading-relaxed"
              />
            </div>

            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VALUES.map((val) => (
                <StaggerItem
                  key={val.title}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-7 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:bg-white hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center mb-5 shadow-2xs">
                      {val.icon}
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
                      {val.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Leadership Team Section */}
        <section id="leadership" className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <SectionBadge text="Leadership" />
              <AnimatedHeading
                as="h2"
                text="Meet the Team Behind Eidoncore"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] justify-center"
              />
              <p className="mt-4 text-[#64748B] text-base leading-relaxed">
                We&apos;ve been in your shoes — managing clients across fragmented tools. That lived frustration became our fuel to build something radically better.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {LEADERS.map((leader) => (
                <div
                  key={leader.name}
                  className="group relative bg-white border border-[#E2E8F0] hover:border-slate-300 rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div>
                    {/* Studio Portrait Showcase Container */}
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 shadow-2xs">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        width={600}
                        height={750}
                        priority
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Founder Details */}
                    <div className="pt-5 px-1.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors duration-200">
                        {leader.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#3F72AF] tracking-wide mt-1">
                        {leader.role}
                      </p>
                      <p className="mt-3 text-xs sm:text-sm text-[#475569] leading-relaxed">
                        {leader.bio}
                      </p>
                    </div>
                  </div>

                  {/* Minimal Specialization Pills */}
                  <div className="mt-6 pt-4 px-1.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                    {leader.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium text-slate-600 bg-slate-50/80 px-2.5 py-1 rounded-md border border-slate-200/60 transition-colors group-hover:border-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials Carousel */}
        <Testimonials />

        {/* Unified FAQ Section */}
        <FAQSection />

        {/* Global CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
