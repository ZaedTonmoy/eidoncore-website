"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/content/site-content";

// Isometric SVG Line-Art Visuals
function PillarIllustration({ type }: { type: string }) {
  if (type === "compass") {
    return (
      <svg className="w-full h-32 text-[#0B0B0F]" viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="1.2">
        {/* Isometric Grid Plane */}
        <polygon points="100,20 170,55 100,90 30,55" stroke="#E7E7EA" fill="#FAFAFA" />
        <line x1="65" y1="37" x2="135" y2="72" stroke="#E7E7EA" />
        <line x1="135" y1="37" x2="65" y2="72" stroke="#E7E7EA" />
        {/* Floating Craft Pointer */}
        <polygon points="100,30 130,55 100,80 70,55" stroke="currentColor" fill="white" />
        <line x1="100" y1="30" x2="100" y2="80" stroke="currentColor" strokeDasharray="3 3" />
        <line x1="70" y1="55" x2="130" y2="55" stroke="currentColor" strokeDasharray="3 3" />
        <circle cx="100" cy="55" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (type === "stack") {
    return (
      <svg className="w-full h-32 text-[#0B0B0F]" viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="1.2">
        {/* Bottom Layer */}
        <polygon points="100,50 160,75 100,100 40,75" stroke="#E7E7EA" fill="#FAFAFA" />
        {/* Middle Layer */}
        <polygon points="100,35 160,60 100,85 40,60" stroke="#E7E7EA" fill="#FAFAFA" />
        {/* Top Active Layer */}
        <polygon points="100,20 160,45 100,70 40,45" stroke="currentColor" fill="white" />
        <line x1="100" y1="20" x2="100" y2="45" stroke="currentColor" />
        <line x1="160" y1="45" x2="160" y2="55" stroke="#E7E7EA" />
        <line x1="40" y1="45" x2="40" y2="55" stroke="#E7E7EA" />
      </svg>
    );
  }

  // Lattice / Cube for agents
  return (
    <svg className="w-full h-32 text-[#0B0B0F]" viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* 3D Wireframe Cube */}
      <polygon points="100,15 150,40 100,65 50,40" stroke="currentColor" fill="white" />
      <polygon points="50,40 100,65 100,105 50,80" stroke="currentColor" fill="#FAFAFA" />
      <polygon points="100,65 150,40 150,80 100,105" stroke="currentColor" fill="white" />
      {/* Internal lattice nodes */}
      <circle cx="100" cy="40" r="2.5" fill="#5B5FEF" stroke="none" />
      <circle cx="75" cy="72" r="2.5" fill="#5B5FEF" stroke="none" />
      <circle cx="125" cy="72" r="2.5" fill="#5B5FEF" stroke="none" />
      <line x1="100" y1="40" x2="75" y2="72" stroke="#5B5FEF" strokeWidth="0.8" strokeDasharray="2 2" />
      <line x1="100" y1="40" x2="125" y2="72" stroke="#5B5FEF" strokeWidth="0.8" strokeDasharray="2 2" />
    </svg>
  );
}

export default function Pillars() {
  const { pillars } = siteContent;

  return (
    <section className="py-20 border-b border-[#E7E7EA] bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col gap-4 group"
            >
              {/* Illustration Area */}
              <div className="w-full bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-4 flex items-center justify-center transition-all duration-300 group-hover:border-[#0B0B0F]/20 group-hover:shadow-sm">
                <PillarIllustration type={pillar.iconType} />
              </div>

              {/* Number Label */}
              <span className="font-mono text-xs text-[#6B6F76]">{pillar.index}</span>

              {/* Title & Description */}
              <h3 className="text-lg font-medium text-[#0B0B0F] tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-[#6B6F76] text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
