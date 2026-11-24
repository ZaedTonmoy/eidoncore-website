"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import { getBlogPostingSchema, getFAQSchema } from "@/lib/schema";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

export interface BlogArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogArticleProps {
  slug: string;
  title: string;
  description: string;
  tag: string;
  readTime: string;
  displayDate: string;
  isoDate: string;
  keyTakeaway: string;
  sections: BlogArticleSection[];
  relatedLinks: Array<{ label: string; href: string; description: string }>;
  faqs?: Array<{ q: string; a: string }>;
}

export default function BlogArticleTemplate({
  slug,
  title,
  description,
  tag,
  readTime,
  displayDate,
  isoDate,
  keyTakeaway,
  sections,
  relatedLinks,
  faqs,
}: BlogArticleProps) {
  const schema = getBlogPostingSchema({
    title,
    summary: description,
    date: isoDate,
    href: `/blog/${slug}/`,
  });

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <JsonLd schema={schema} />
      <Navbar />

      <main id="main-content" className="flex-1">
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog/" },
            { label: tag },
          ]}
          eyebrow={tag}
          title={title}
          description={description}
        />

        <article className="py-16 md:py-20 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[820px] mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E7E7EA] text-xs font-mono text-[#64748B]">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={13} />
                  {displayDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} />
                  {readTime}
                </span>
              </div>
              <Link
                href="/blog/"
                className="inline-flex items-center gap-1.5 text-[#3F72AF] hover:underline font-medium"
              >
                <ArrowLeft size={13} />
                All Agency Playbooks
              </Link>
            </div>

            {/* Direct Answer / AEO Summary Box */}
            <div className="mb-10 rounded-2xl border border-[#3F72AF]/20 bg-[#F8FAFC] p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-[#3F72AF] font-semibold mb-2">
                Key Takeaway
              </p>
              <p className="text-sm sm:text-base text-[#0F172A] leading-relaxed font-medium">
                {keyTakeaway}
              </p>
            </div>

            <div className="space-y-10">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-4">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((p, idx) => (
                      <p
                        key={idx}
                        className="text-sm sm:text-base text-[#4A4E57] leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2.5 pl-5 list-disc text-sm sm:text-base text-[#334155]">
                      {section.bullets.map((b, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Related Eidoncore Modules */}
            <div className="mt-14 pt-10 border-t border-[#E7E7EA]">
              <h2 className="text-lg font-bold text-[#0F172A] tracking-tight mb-4">
                Explore Related Eidoncore Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 hover:border-[#3F72AF]/40 hover:bg-white transition-colors"
                  >
                    <div className="flex items-center justify-between text-sm font-semibold text-[#0F172A] group-hover:text-[#3F72AF]">
                      <span>{item.label}</span>
                      <ArrowRight size={14} />
                    </div>
                    <p className="mt-1.5 text-xs text-[#64748B] leading-relaxed">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>

        {faqs && faqs.length > 0 && (
          <section className="py-16 bg-[#F8FAFC] border-b border-[#E7E7EA]">
            <JsonLd schema={getFAQSchema(faqs)} />
            <div className="max-w-[820px] mx-auto px-4 sm:px-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.q}
                    className="rounded-xl border border-[#E2E8F0] bg-white p-5"
                  >
                    <h3 className="text-base font-semibold text-[#0F172A]">
                      {faq.q}
                    </h3>
                    <p className="mt-2 text-sm text-[#4A4E57] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
