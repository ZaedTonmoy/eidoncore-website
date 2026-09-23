"use client";

import React from "react";
import { siteContent } from "@/content/site-content";
import AnimatedText from "./AnimatedText";
import { StaggerGroup, StaggerItem } from "./StaggerReveal";
import { ShieldCheck, Activity, Users, Puzzle } from "lucide-react";

export default function MetricsStrip() {
  const { metrics, clientLogos } = siteContent;

  const metricIcons = [
    <Puzzle key="mod" size={20} className="text-[#3F72AF]" />,
    <Activity key="tools" size={20} className="text-indigo-600" />,
    <ShieldCheck key="uptime" size={20} className="text-emerald-600" />,
    <Users key="agencies" size={20} className="text-blue-600" />,
  ];

  return (
    <section className="py-16 border-t border-b border-[#E7E7EA] bg-[#FAFAFA]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Kicker & Logos */}
        <div className="text-center mb-12">
          <AnimatedText
            text="TRUSTED BY 500+ AGENCIES WORLDWIDE"
            mode="word"
            className="text-[11px] font-mono tracking-wider text-[#6B6F76] uppercase mb-6"
          />

          <StaggerGroup className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:justify-between opacity-70">
            {clientLogos.map((logo) => (
              <StaggerItem key={logo}>
                <span className="text-xs md:text-sm font-semibold tracking-wider text-[#6B6F76] hover:text-[#0B0B0F] transition-colors select-none">
                  {logo}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* 4 Metric Bento Cards */}
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <StaggerItem
              key={metric.label}
              className="bg-white border border-[#E7E7EA] rounded-2xl p-6 flex flex-col justify-between hover:border-[#0B0B0F]/20 hover:shadow-xs transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#6B6F76] uppercase tracking-wider">
                  {metric.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#FAFAFA] border border-[#E7E7EA] flex items-center justify-center">
                  {metricIcons[idx % metricIcons.length]}
                </div>
              </div>

              <div>
                <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B0B0F]">
                  {metric.value}
                </span>
                <p className="mt-1.5 text-xs text-[#6B6F76] leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
