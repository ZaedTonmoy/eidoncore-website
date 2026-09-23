"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedText from "@/components/AnimatedText";
import AnimatedButton from "@/components/AnimatedButton";
import { Mail, MessageCircle, Clock, Globe, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";

const CONTACT_FAQS = [
  {
    q: "How do I request a live demo?",
    a: "Fill out the form with 'Request a Demo' selected. Our product team will schedule a tailored 20-minute screen walkthrough demonstrating how Eidoncore consolidates your agency's specific workflows.",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes! Every new account begins with a 14-day free Pro trial — zero credit card required. You get full unconstrained access to all 19 modules, automations, and white-label client portal features.",
  },
  {
    q: "What kind of customer support do you offer?",
    a: "All plans include email support with under 24-hour SLA. Pro plans receive priority queueing, and Enterprise plans include dedicated onboarding, real-time live chat, and a custom Slack channel.",
  },
  {
    q: "Can we migrate data from our existing tools?",
    a: "Absolutely. Eidoncore provides seamless CSV and JSON import tools for contacts, client companies, tasks, and project history. For Enterprise teams, our engineers provide white-glove assisted migration.",
  },
];

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "demo",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
          eyebrow="Direct Agency Support"
          title="Let's Talk About Your Agency"
          description="Have questions about modules, custom enterprise setups, or looking for a live product demo? Our team is here to help."
        />

        {/* Contact Form & Info Grid */}
        <section className="py-16 md:py-24 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              
              {/* Left Column: Form Card */}
              <div className="lg:col-span-7 bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-7 sm:p-10 shadow-xs">
                {formSubmitted ? (
                  <div className="py-12 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 shadow-xs">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                      Message Received!
                    </h3>
                    <p className="mt-3 text-sm text-[#64748B] max-w-md leading-relaxed">
                      Thank you for reaching out. One of our agency specialists will review your note and respond to <strong className="text-[#0F172A]">{formData.email || "your email"}</strong> within 24 hours.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-8 px-5 py-2.5 bg-white border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-full hover:border-[#3F72AF] shadow-2xs transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">
                        Send us a message
                      </h3>
                      <p className="mt-1 text-xs text-[#64748B]">
                        Fill out the details below and we&apos;ll get back to you promptly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#334155]">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Sarah Kim"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#3F72AF] focus:ring-2 focus:ring-[#3F72AF]/20 outline-none transition-all shadow-2xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#334155]">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@agency.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#3F72AF] focus:ring-2 focus:ring-[#3F72AF]/20 outline-none transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#334155]">
                          Agency / Company Name
                        </label>
                        <input
                          type="text"
                          placeholder="Spectra Digital"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#3F72AF] focus:ring-2 focus:ring-[#3F72AF]/20 outline-none transition-all shadow-2xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#334155]">
                          Inquiry Subject *
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:border-[#3F72AF] focus:ring-2 focus:ring-[#3F72AF]/20 outline-none transition-all shadow-2xs cursor-pointer"
                        >
                          <option value="demo">Request a Live Demo</option>
                          <option value="sales">Sales & Pricing Inquiry</option>
                          <option value="enterprise">Enterprise Custom Plan</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Agency Partnership</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#334155]">
                        Message *
                      </label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Tell us about your agency size, tools you want to replace, or any specific questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#3F72AF] focus:ring-2 focus:ring-[#3F72AF]/20 outline-none transition-all shadow-2xs resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-200 shadow-xs hover:shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Send Inquiry</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Channels & Details */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                
                {/* Direct Channels */}
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] tracking-tight mb-4">
                    Direct Channels
                  </h3>
                  <div className="flex flex-col gap-3.5">
                    <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-start gap-3.5 shadow-2xs">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#3F72AF] flex items-center justify-center shrink-0">
                        <Mail size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A]">Email Us Directly</h4>
                        <a
                          href="mailto:hello@eidoncore.com"
                          className="text-xs font-mono text-[#3F72AF] hover:underline"
                        >
                          hello@eidoncore.com
                        </a>
                      </div>
                    </div>

                    <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-start gap-3.5 shadow-2xs">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <MessageCircle size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A]">Live Support Hours</h4>
                        <p className="text-xs text-[#64748B]">
                          Mon – Fri, 9am – 6pm EST (Average response &lt; 4 hours)
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-start gap-3.5 shadow-2xs">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Globe size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A]">Headquarters</h4>
                        <p className="text-xs text-[#64748B]">
                          Remote-first engineering team serving agencies globally.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Navigation Links */}
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] tracking-tight mb-4">
                    Quick Resources
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      href="/features/"
                      className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] hover:border-[#3F72AF]/40 hover:text-[#3F72AF] transition-colors flex items-center justify-between shadow-2xs"
                    >
                      <span>19 Modules</span>
                      <ArrowRight size={13} />
                    </Link>
                    <Link
                      href="/pricing/"
                      className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] hover:border-[#3F72AF]/40 hover:text-[#3F72AF] transition-colors flex items-center justify-between shadow-2xs"
                    >
                      <span>Plans & Pricing</span>
                      <ArrowRight size={13} />
                    </Link>
                    <Link
                      href="/compare/"
                      className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] hover:border-[#3F72AF]/40 hover:text-[#3F72AF] transition-colors flex items-center justify-between shadow-2xs"
                    >
                      <span>Compare Tools</span>
                      <ArrowRight size={13} />
                    </Link>
                    <Link
                      href="/security/"
                      className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] hover:border-[#3F72AF]/40 hover:text-[#3F72AF] transition-colors flex items-center justify-between shadow-2xs"
                    >
                      <span>Security Whitepaper</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Contact FAQ Accordion */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-mono text-[#3F72AF] uppercase tracking-wider font-semibold">
                FAQ
              </span>
              <AnimatedHeading
                as="h2"
                text="Common Inquiries"
                className="mt-3 text-3xl font-bold tracking-tight text-[#0F172A] justify-center"
              />
            </div>

            <div className="flex flex-col gap-3">
              {CONTACT_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={faq.q}
                    className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        className={`text-[#64748B] shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#3F72AF]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#F1F5F9]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Global CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
