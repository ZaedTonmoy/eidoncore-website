"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedText from "./AnimatedText";
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  replaced: string[];
  quote: React.ReactNode;
  metricNum: string;
  metricLabel: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Kim",
    role: "Operations Lead, Spectra Digital",
    avatar: "/images/testimonials/sarah-kim.jpg",
    replaced: ["Trello", "HubSpot", "QuickBooks"],
    quote: (
      <>
        We replaced Trello, HubSpot, and QuickBooks with just Eidoncore. Having our project budgets, client CRM, and invoicing connected in one platform{" "}
        <mark className="bg-[#3F72AF]/15 text-[#0B0B0F] px-1 rounded font-medium">saved us 15+ hours every week</mark> and{" "}
        <mark className="bg-[#3F72AF]/15 text-[#0B0B0F] px-1 rounded font-medium">eliminated all context switching</mark>.
      </>
    ),
    metricNum: "15+",
    metricLabel: "hrs saved / wk",
  },
  {
    name: "Marcus Patel",
    role: "Founder, Northline Studio",
    avatar: "/images/testimonials/marcus-patel.jpg",
    replaced: ["Asana", "Mailchimp", "Harvest"],
    quote: (
      <>
        Switching from Asana, Mailchimp, and Harvest felt risky, but Eidoncore paid for itself in a month. Client reporting is now{" "}
        <mark className="bg-[#3F72AF]/15 text-[#0B0B0F] px-1 rounded font-medium">fully automated</mark> and our billing errors{" "}
        <mark className="bg-[#3F72AF]/15 text-[#0B0B0F] px-1 rounded font-medium">dropped to zero</mark>.
      </>
    ),
    metricNum: "$4.2k",
    metricLabel: "saved / mo",
  },
  {
    name: "Elena Ruiz",
    role: "Managing Director, Fieldworks",
    avatar: "/images/testimonials/elena-ruiz.jpg",
    replaced: ["Monday", "Zendesk", "Xero"],
    quote: (
      <>
        We were paying for Monday, Zendesk, and Xero separately and none of it talked to each other. Now every ticket, task, and invoice lives in one place -{" "}
        <mark className="bg-[#3F72AF]/15 text-[#0B0B0F] px-1 rounded font-medium">onboarding new hires takes a day, not a week</mark>.
      </>
    ),
    metricNum: "5x",
    metricLabel: "faster onboarding",
  },
  {
    name: "David Chen",
    role: "COO, Halyard Agency",
    avatar: "/images/testimonials/david-chen.jpg",
    replaced: ["ClickUp", "Pipedrive", "FreshBooks"],
    quote: (
      <>
        Our team stopped fighting ClickUp, Pipedrive, and FreshBooks entirely. Eidoncore gave every project a live budget, so scope creep gets caught{" "}
        <mark className="bg-[#3F72AF]/15 text-[#0B0B0F] px-1 rounded font-medium">before it costs us money</mark>, not after.
      </>
    ),
    metricNum: "22%",
    metricLabel: "margin recovered",
  },
  {
    name: "Amara Voss",
    role: "Head of Delivery, Loop & Co.",
    avatar: "/images/testimonials/amara-voss.jpg",
    replaced: ["Notion", "Close", "Wave"],
    quote: (
      <>
        Notion, Close, and Wave were three logins we opened every morning. Now it&apos;s one dashboard, and clients get{" "}
        <mark className="bg-[#3F72AF]/15 text-[#0B0B0F] px-1 rounded font-medium">real-time visibility</mark> into their own projects without asking us for updates.
      </>
    ),
    metricNum: "9",
    metricLabel: "tools retired",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const active = TESTIMONIALS[currentSlide];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#F8FAFC] border-t border-b border-[#E7E7EA]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Head */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono text-[#3F72AF] uppercase tracking-wider font-semibold">
            What Agencies Say
          </span>
          <AnimatedHeading
            as="h2"
            text="Loved by 500+ Agencies Worldwide"
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B0B0F] leading-[1.08] justify-center"
          />
          <AnimatedText
            text="Here's how Eidoncore replaces the tool stack for real agencies, every single day."
            mode="word"
            className="mt-4 text-[#6B6F76] text-base sm:text-lg leading-relaxed justify-center"
          />
        </div>

        {/* Carousel Card */}
        <div
          className="max-w-3xl mx-auto bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.05)] relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Decorative Quote Symbol */}
          <div className="absolute right-6 top-4 text-neutral-100 font-serif text-8xl leading-none select-none pointer-events-none -z-0">
            &ldquo;
          </div>

          <div className="relative z-10">
            {/* Replaced Tool Stack Badge */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-8 text-xs font-mono">
              <span className="text-[#64748B] font-medium mr-1 uppercase tracking-wider text-[11px]">
                Replaced
              </span>
              {active.replaced.map((tool, idx) => (
                <React.Fragment key={tool}>
                  <span className="px-2.5 py-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded-md text-[#475569] font-medium">
                    {tool}
                  </span>
                  {idx < active.replaced.length - 1 ? (
                    <span className="text-[#94A3B8] font-bold">+</span>
                  ) : (
                    <span className="text-[#3F72AF] font-bold">→</span>
                  )}
                </React.Fragment>
              ))}
              <span className="px-2.5 py-1 bg-[#3F72AF]/10 border border-[#3F72AF]/20 rounded-md text-[#3F72AF] font-bold">
                Eidoncore
              </span>
            </div>

            {/* Quote Body */}
            <blockquote className="text-lg sm:text-2xl font-normal text-[#0F172A] leading-relaxed min-h-[110px]">
              &ldquo;{active.quote}&rdquo;
            </blockquote>

            {/* Attribution & Impact Metric */}
            <div className="mt-10 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              {/* Author Info */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm relative shrink-0">
                  <Image
                    src={active.avatar}
                    alt={active.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0F172A]">{active.name}</h4>
                  <p className="text-xs text-[#64748B]">{active.role}</p>
                </div>
              </div>

              {/* Metric Card */}
              <div className="flex items-baseline gap-2 bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2.5 rounded-xl self-start sm:self-auto">
                <span className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                  {active.metricNum}
                </span>
                <span className="text-xs font-mono text-[#64748B] font-medium">
                  {active.metricLabel}
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Avatar Navigation Bar */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.name}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`View testimonial by ${t.name}`}
              className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-all duration-300 relative ${
                currentSlide === idx
                  ? "border-[#3F72AF] scale-110 shadow-md ring-2 ring-[#3F72AF]/20"
                  : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              <Image
                src={t.avatar}
                alt={t.name}
                width={44}
                height={44}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
