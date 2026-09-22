"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/content/site-content";

export default function Statement() {
  const { firstSentence, rest } = siteContent.statement;

  return (
    <section className="py-28 md:py-36">
      <div className="max-w-[1080px] mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-[38px] font-medium tracking-tight leading-[1.25]"
        >
          <span className="text-[#0B0B0F]">{firstSentence} </span>
          <span className="text-[#6B6F76]">{rest}</span>
        </motion.p>
      </div>
    </section>
  );
}
