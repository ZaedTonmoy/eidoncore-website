"use client";

import React from "react";
import { siteContent } from "@/content/site-content";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedText from "./AnimatedText";
import AnimatedButton from "./AnimatedButton";
import { StaggerGroup, StaggerItem } from "./StaggerReveal";
import { Check } from "lucide-react";

export default function CompareSection() {
  const { eyebrow, title, description, savingsNote, rows } = siteContent.compare;

  return (
    <section id="compare" className="py-20 md:py-32 bg-[#FAFAFA] border-b border-[#E7E7EA]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono text-[#3F72AF] uppercase tracking-wider font-semibold">
            {eyebrow}
          </span>
          <AnimatedHeading
            as="h2"
            text={title}
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B0B0F] leading-[1.08] justify-center"
          />
          <AnimatedText
            text={description}
            mode="word"
            className="mt-4 text-[#6B6F76] text-base sm:text-lg leading-relaxed justify-center"
          />
        </div>

        {/* Comparison Table */}
        <StaggerGroup>
          <StaggerItem className="bg-white border border-[#E7E7EA] rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E7E7EA] bg-[#F9F9FB] text-[#6B6F76] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-3.5 sm:px-6 font-semibold">Agency Need</th>
                    <th className="py-3.5 px-3.5 sm:px-6 font-semibold">Without Eidoncore</th>
                    <th className="py-3.5 px-3.5 sm:px-6 font-semibold text-[#3F72AF]">With Eidoncore</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E7EA]">
                  {rows.map((row) => (
                    <tr key={row.need} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-3 px-3.5 sm:px-6 font-medium text-[#0B0B0F] whitespace-nowrap sm:whitespace-normal">
                        {row.need}
                      </td>
                      <td className="py-3 px-3.5 sm:px-6 text-[#6B6F76] whitespace-nowrap sm:whitespace-normal">
                        {row.traditional}
                      </td>
                      <td className="py-3 px-3.5 sm:px-6 font-medium text-emerald-700 whitespace-nowrap sm:whitespace-normal">
                        <span className="inline-flex items-center gap-1.5">
                          <Check size={13} className="text-emerald-600 shrink-0" />
                          <span>{row.eidoncore}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Savings Callout */}
            <div className="p-5 sm:p-6 bg-[#F9F9FB] border-t border-[#E7E7EA] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <span className="font-semibold text-xs sm:text-sm text-[#0B0B0F]">
                {savingsNote}{" "}
                <span className="text-xs text-[#6B6F76] font-normal block sm:inline">
                  (eliminating 6+ separate licenses)
                </span>
              </span>
              <AnimatedButton
                href="https://register.eidoncore.com/"
                variant="primary"
                className="w-full sm:w-auto text-xs sm:text-sm"
              >
                Consolidate Stack Now →
              </AnimatedButton>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
