"use client";

import React, { useState } from "react";
import Link from "next/link";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedText from "./AnimatedText";
import { Check, ArrowRight, Mail } from "lucide-react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <section className="bg-[#F8FAFC] border-t border-[#E2E8F0] py-16 sm:py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 flex flex-col gap-10 sm:gap-12">
        
        {/* 1. Newsletter Box with Capsule Input */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-12 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 transition-all hover:border-[#CBD5E1] hover:shadow-md">
          <div className="max-w-md">
            <h3 className="text-lg sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              The agency playbook, monthly.
            </h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
              New workflows, fresh integrations, and what we shipped - one email, no fluff.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full md:max-w-md">
            <div className="bg-white border border-[#CBD5E1] focus-within:border-[#3F72AF] focus-within:ring-2 focus-within:ring-[#3F72AF]/20 rounded-xl sm:rounded-full p-1.5 sm:pl-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 shadow-2xs transition-all">
              <div className="flex items-center gap-2 px-2 sm:px-0 py-1 sm:py-0 w-full">
                <Mail size={16} className="text-[#94A3B8] shrink-0" />
                <input
                  type="email"
                  placeholder="you@agency.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-lg sm:rounded-full transition-colors whitespace-nowrap"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </div>
            <span className="text-[10.5px] sm:text-[11px] text-[#94A3B8] sm:pl-5">
              No spam. Unsubscribe anytime.
            </span>
          </form>
        </div>

        {/* 2. Big Obsidian Gradient CTA Card with Glow Blobs */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#0D1527] to-[#0A0F1D] border border-white/10 p-7 sm:p-16 text-center shadow-2xl">
          
          {/* Glowing Ambient Blobs */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#3F72AF]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#00ADB5]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* Eyebrow */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/25 mb-5 sm:mb-6">
              14-day free PRO trial
            </span>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
              Ready to Streamline Your Agency?
            </h2>

            {/* Subheading */}
            <p className="mt-3.5 sm:mt-5 text-[#94A3B8] text-sm sm:text-lg leading-relaxed max-w-xl">
              Join thousands of agencies managing their entire workflow from a single platform. Start your 14-day free PRO trial - no credit card required.
            </p>

            {/* Action Buttons (100% width on phone for tap ergonomics, auto on desktop) */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
              <a
                href="https://register.eidoncore.com/"
                className="w-full sm:w-auto px-7 py-3 bg-white hover:bg-[#F1F5F9] text-[#0F172A] text-xs sm:text-sm font-bold rounded-full transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Start Free Trial</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3 bg-transparent hover:bg-white/10 text-white border border-white/25 hover:border-white text-xs sm:text-sm font-semibold rounded-full transition-all text-center"
              >
                Book a Demo
              </Link>
            </div>

            {/* Trust Row */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2 text-[11px] sm:text-xs text-[#94A3B8]">
              <span className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-emerald-400" />
                <span>No credit card required</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-emerald-400" />
                <span>Cancel anytime</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-emerald-400" />
                <span>SOC2-ready security</span>
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
