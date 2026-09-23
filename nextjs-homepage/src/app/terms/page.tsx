"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import { FileCheck, Shield, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Terms of Service" },
          ]}
          eyebrow="Legal Agreement"
          title="Terms of Service"
          description="Last updated: March 1, 2026. Please read these terms carefully before accessing or using Eidoncore's agency management platform and API services."
        />

        {/* Terms Body */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[840px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-12 text-sm sm:text-base text-[#334155] leading-relaxed">
              
              <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-start gap-4">
                <FileCheck className="w-6 h-6 text-[#3F72AF] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#64748B]">
                  <strong className="text-[#0F172A] font-semibold block mb-1">Agreement Overview:</strong>
                  By registering for an account or using Eidoncore software and API endpoints, you agree to be bound by these Terms of Service.
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">1. Accounts & Registration</h2>
                <p>
                  To access Eidoncore, you must create a workspace account. You agree to provide accurate, current, and complete registration information. You are responsible for safeguarding your login credentials and for all actions taken under your account.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">2. Subscription & Billing</h2>
                <p>
                  Paid plans (Pro and Enterprise) are billed on a recurring monthly or annual basis. You may cancel or modify your subscription at any time within your billing portal. Cancellations become effective at the conclusion of the current prepaid billing period. We offer a 14-day free trial on new accounts with zero credit card obligation.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">3. Data Ownership & Intellectual Property</h2>
                <p>
                  You retain all intellectual property rights and title to the agency data, client communications, deliverables, designs, and files uploaded to your Eidoncore workspace. Eidoncore claims no ownership over your client information.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">4. Acceptable Use Policy</h2>
                <p>
                  You agree not to use the platform to violate laws, transmit malicious software, engage in unauthorized vulnerability scanning, or abuse rate limits on our API or MCP interfaces.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">5. Service Availability & SLA</h2>
                <p>
                  We strive for 99.9% uptime across our production infrastructure. Scheduled maintenance windows will be communicated in advance via our changelog and status pages.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">6. Contact & Legal Inquiries</h2>
                <p>
                  If you have questions regarding these terms, please contact our legal team at <a href="mailto:legal@eidoncore.com" className="text-[#3F72AF] underline">legal@eidoncore.com</a>.
                </p>
              </div>

            </div>
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
