"use client";

import React, { useState } from "react";
import { siteContent } from "@/content/site-content";
import AnimatedHeading from "./AnimatedHeading";
import { StaggerGroup, StaggerItem } from "./StaggerReveal";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const { eyebrow, title, items } = siteContent.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-white border-b border-[#E7E7EA]">
      <div className="max-w-[800px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-[#3F72AF] uppercase tracking-wider font-semibold">
            {eyebrow}
          </span>
          <AnimatedHeading
            as="h2"
            text={title}
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B0B0F] leading-[1.08] justify-center"
          />
        </div>

        {/* FAQ Accordion Items with Smooth Height & Opacity Transition */}
        <div className="flex flex-col divide-y divide-[#E7E7EA] border-t border-b border-[#E7E7EA]">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={item.q} className="py-5">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left group transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#0B0B0F] group-hover:text-[#3F72AF] transition-colors">
                    {item.q}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border border-[#E7E7EA] flex items-center justify-center transition-all duration-300 shrink-0 ${
                      isOpen
                        ? "rotate-180 bg-[#3F72AF] border-[#3F72AF] text-white shadow-2xs"
                        : "bg-white text-[#6B6F76] group-hover:border-[#3F72AF]/40"
                    }`}
                  >
                    <ChevronDown size={14} className={isOpen ? "text-white" : "text-[#6B6F76]"} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 pr-8 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
