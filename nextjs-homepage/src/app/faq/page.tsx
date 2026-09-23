"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import { HelpCircle, MessageSquare, Mail, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "FAQ" },
          ]}
          eyebrow="Help & Knowledge Base"
          title="Frequently Asked Questions"
          description="Everything you need to know about Eidoncore plans, AI tools, client portals, and security. Need more help? Our team is always here for you."
          ctaPrimary={{
            label: "Contact Support →",
            href: "/contact/",
          }}
          ctaSecondary={{
            label: "Start Free Trial",
            href: "https://register.eidoncore.com/",
          }}
        />

        {/* Quick Resource Bento Cards (Platform modules box style & slow reveal) */}
        <section className="py-16 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StaggerItem className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3F72AF] border border-blue-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                    <MessageSquare size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                    24/7 Live Support
                  </h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    Have a specific question about your agency setup? Chat with our team or schedule a live screen walkthrough.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                  <a href="/contact/" className="font-medium text-[11px] inline-flex items-center gap-1">
                    Talk to our team <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </StaggerItem>

              <StaggerItem className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                    Free Assisted Migration
                  </h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    Moving from Asana, ClickUp, or QuickBooks? Our engineers provide complimentary white-glove data migration.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                  <a href="/contact/" className="font-medium text-[11px] inline-flex items-center gap-1">
                    Request migration <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </StaggerItem>

              <StaggerItem className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                    Security & Trust Center
                  </h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    Learn how we protect agency and client data with AES-256 encryption, TLS 1.3, and tenant isolation.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                  <a href="/security/" className="font-medium text-[11px] inline-flex items-center gap-1">
                    Security overview <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </section>

        {/* Unified FAQ Section - Identical to homepage */}
        <FAQSection />

        {/* Global CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
