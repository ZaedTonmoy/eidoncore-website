"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FeatureSectionProps {
  id?: string;
  title: string;
  description: string;
  learnMoreHref: string;
  features: Array<{ label: string; href: string }>;
  mockup: React.ReactNode;
}

export default function FeatureSection({
  id,
  title,
  description,
  learnMoreHref,
  features,
  mockup,
}: FeatureSectionProps) {
  return (
    <section id={id} className="py-24 md:py-32 border-b border-[#E7E7EA]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Row 1: Left Heading, Right Description + Learn More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-10"
        >
          <div className="md:col-span-6 lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-[#0B0B0F] leading-[1.08]">
              {title}
            </h2>
          </div>
          <div className="md:col-span-6 lg:col-span-7 flex flex-col items-start gap-3 md:pl-8">
            <p className="text-[#6B6F76] text-base sm:text-lg leading-relaxed">
              {description}
            </p>
            <Link
              href={learnMoreHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#0B0B0F] hover:text-indigo-600 transition-colors"
            >
              Learn more <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>

        {/* Row 2: Large Mockup Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="transition-transform duration-300 hover:-translate-y-1"
        >
          {mockup}
        </motion.div>

        {/* Row 3: Small "Features" label on left + Row of small text links with arrows on right */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
        >
          <span className="font-mono text-[#6B6F76] uppercase tracking-wider text-[11px]">
            Features
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {features.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-1 text-[#6B6F76] hover:text-[#0B0B0F] transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-[#6B6F76]">&rarr;</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
