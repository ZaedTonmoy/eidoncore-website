"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import { Shield, Lock, Eye, CheckCircle2 } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" },
          ]}
          eyebrow="Data Protection & Governance"
          title="Privacy Policy"
          description="Last updated: March 1, 2026. At Eidoncore, your privacy matters. We maintain strict tenant isolation, zero third-party tracking, and GDPR-compliant data standards."
        />

        {/* Legal Prose Content */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[840px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-12 text-sm sm:text-base text-[#334155] leading-relaxed">
              
              <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-start gap-4">
                <Shield className="w-6 h-6 text-[#3F72AF] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#64748B]">
                  <strong className="text-[#0F172A] font-semibold block mb-1">Our Core Privacy Commitment:</strong>
                  Your workspace data belongs exclusively to you. Eidoncore will never sell your personal information or use your agency deliverables, client lists, or financial data for advertising.
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">1. Information We Collect</h2>
                <h3 className="text-base font-semibold text-[#0F172A] mt-4 mb-2">Account Information</h3>
                <p>
                  When you register for Eidoncore, we collect your name, email address, agency name, and workspace credentials. When subscribing to paid tiers, credit card and payment information is securely processed directly via Stripe — zero cardholder details are ever stored on Eidoncore servers.
                </p>
                <h3 className="text-base font-semibold text-[#0F172A] mt-4 mb-2">Agency Data</h3>
                <p>
                  All records created within your tenant — including client profiles, project tasks, milestones, proposals, messages, files, and invoice items — remain strictly your confidential property. We process this data solely to provide and maintain the Eidoncore platform.
                </p>
                <h3 className="text-base font-semibold text-[#0F172A] mt-4 mb-2">Usage Telemetry</h3>
                <p>
                  We collect anonymized system telemetry and performance logs (such as page render latencies and error logs) to maintain high availability and prevent platform abuse. This data is aggregated and never linked to individual identity.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li>To provide, operate, and scale the Eidoncore software suite.</li>
                  <li>To process subscription payments and reconcile billing transactions via Stripe Connect.</li>
                  <li>To dispatch transactional system alerts, security notifications, and client portal updates.</li>
                  <li>To detect and remediate infrastructure anomalies, security threats, and fraudulent access.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">3. Data Security & Storage</h2>
                <p>
                  All database records are stored in secure SOC 2-compliant data centers. We implement defense-in-depth protections:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-2 mt-3">
                  <li><strong>AES-256 Encryption at Rest:</strong> All stored database tables and S3 file vaults are encrypted.</li>
                  <li><strong>TLS 1.3 in Transit:</strong> All communication between browsers, API clients, and servers is cryptographically secured.</li>
                  <li><strong>Strict Tenant Isolation:</strong> Multi-tenant database queries enforce workspace ownership boundaries.</li>
                  <li><strong>Automated Backups:</strong> Point-in-time recovery snapshots taken daily.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">4. Subprocessors & Third Parties</h2>
                <p>
                  We only share data with essential infrastructure partners necessary to provide the service:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-2 mt-3">
                  <li><strong>Stripe:</strong> Payment processing and subscription management.</li>
                  <li><strong>Cloudflare:</strong> DNS routing, DDoS protection, and SSL termination.</li>
                  <li><strong>AWS / Vercel:</strong> Cloud application hosting and global CDN edge routing.</li>
                </ul>
              </div>

              <div id="email-integrations" className="scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">
                  5. Email Integrations (Gmail Add-on, Browser Extension and Capture Addresses)
                </h2>
                
                <h3 className="text-base font-semibold text-[#0F172A] mt-4 mb-2">What we access</h3>
                <p>
                  When you use the EidonCore add-on for Gmail or the EidonCore browser extension, we read only the email that is open when you choose an EidonCore action — its subject, sender, recipients, date, body and the attachments you select. We never scan, index or sync your mailbox. If you connect your Google account to send replies from EidonCore, we use permission to send email on your behalf only when you press Send; we cannot read your mailbox with it. Email you forward, copy (BCC) or auto-forward to your personal EidonCore address is received by us like any other email.
                </p>

                <h3 className="text-base font-semibold text-[#0F172A] mt-4 mb-2">What we store</h3>
                <p>
                  Only what you choose to save, in the privacy mode you choose: the full email, the content without names and addresses, a redacted version (with phone numbers, payment details, one-time codes, signatures and names removed), or no copy of the original at all. You also choose who in your workspace may see the original. Workspace administrators may set stricter minimums and retention periods. Stored email is deleted when its retention period ends, when you delete the record, or when your workspace is deleted.
                </p>

                <h3 className="text-base font-semibold text-[#0F172A] mt-4 mb-2">How we use it</h3>
                <p>
                  Solely to provide the features you use: creating and updating tasks, tickets, notes and client history, showing linked email to people allowed to see it, sending replies you write, and optional AI summaries and suggestions you request. We do not sell email data, use it for advertising, or let people read it except where you or your workspace share it, where needed for security or legal reasons, or with your consent for support.
                </p>

                <h3 className="text-base font-semibold text-[#0F172A] mt-4 mb-2">AI features</h3>
                <p>
                  Optional email AI features send the privacy-processed text (after redaction) to our AI provider only when you request them. Data received from Google APIs is never used to develop, improve or train generalized AI or machine-learning models.
                </p>

                <h3 className="text-base font-semibold text-[#0F172A] mt-4 mb-2">Browser extension</h3>
                <p>
                  The extension stores its sign-in tokens in your browser, reads the current page only when you use &ldquo;Send to EidonCore&rdquo;, and sends data only to your EidonCore workspace. It contains no analytics or tracking. Disconnecting revokes its access.
                </p>

                <div className="mt-5 p-4 sm:p-5 bg-[#F8FAFC] border border-[#3F72AF]/30 rounded-xl">
                  <h3 className="text-sm font-bold text-[#0F172A] mb-1.5 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#3F72AF]" />
                    <span>Google API Services User Data Policy</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    EidonCore&apos;s use and transfer to any other app of information received from Google APIs will adhere to the{" "}
                    <a
                      href="https://developers.google.com/terms/api-services-user-data-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3F72AF] font-medium underline hover:text-[#112D4E]"
                    >
                      Google API Services User Data Policy
                    </a>
                    , including the Limited Use requirements.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">6. Your Legal Rights (GDPR & CCPA)</h2>
                <p>
                  You hold the legal right to access, export, rectify, or permanently delete all personal data associated with your Eidoncore account at any time. To request a complete data archive or account deletion, contact our privacy team at <a href="mailto:privacy@eidoncore.com" className="text-[#3F72AF] underline">privacy@eidoncore.com</a>.
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
