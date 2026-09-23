"use client";

import React from "react";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedText from "./AnimatedText";
import { StaggerGroup, StaggerItem } from "./StaggerReveal";
import {
  Bot,
  FileText,
  FolderKanban,
  CheckCircle2,
  Users,
  Receipt,
  Layout,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function FeaturesBento() {
  const { modulesHeading, modules } = siteContent;

  const moduleIcons: Record<string, React.ReactNode> = {
    "ai-workspace": <Bot size={22} className="text-indigo-600" />,
    proposals: <FileText size={22} className="text-blue-600" />,
    projects: <FolderKanban size={22} className="text-[#3F72AF]" />,
    tasks: <CheckCircle2 size={22} className="text-emerald-600" />,
    crm: <Users size={22} className="text-amber-600" />,
    invoicing: <Receipt size={22} className="text-purple-600" />,
    portal: <Layout size={22} className="text-sky-600" />,
  };

  return (
    <section id="features" className="py-24 md:py-32 bg-white border-b border-[#E7E7EA]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-[#3F72AF] uppercase tracking-wider font-semibold">
              {modulesHeading.eyebrow}
            </span>
            <AnimatedHeading
              as="h2"
              text={modulesHeading.title}
              className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#0F172A] leading-[1.08]"
            />
            <AnimatedText
              text={modulesHeading.description}
              mode="line"
              className="mt-4 text-[#64748B] text-base sm:text-lg leading-relaxed"
            />
          </div>

          <div className="shrink-0">
            <a
              href="https://eidoncore.com/features/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#3F72AF]/40 rounded-full text-xs font-semibold text-[#0F172A] hover:text-[#3F72AF] transition-colors group shadow-2xs"
            >
              <span>View all 19 modules</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Modules Grid */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod) => (
            <StaggerItem
              key={mod.id}
              className="group bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:bg-white hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    {moduleIcons[mod.id] || <Sparkles size={20} className="text-[#3F72AF]" />}
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      mod.tag === "NEW"
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        : "bg-neutral-100 text-neutral-700 border border-neutral-200"
                    }`}
                  >
                    {mod.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                  {mod.title}
                </h3>
                <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                  {mod.description}
                </p>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                <span className="font-medium text-[11px]">Learn more</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </StaggerItem>
          ))}

          {/* Special "Explore all modules" card */}
          <StaggerItem className="group bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white border border-[#1E293B] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-[border-color,background-color,box-shadow] duration-200">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10.5px] font-mono bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30 px-2.5 py-0.5 rounded-full font-bold">
                  +11 MORE
                </span>
                <Sparkles size={16} className="text-[#38BDF8]" />
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">
                Explore all modules
              </h3>
              <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">
                Automations, tickets, reports, messaging, security, offerings, and more.
              </p>
            </div>

            <a
              href="https://eidoncore.com/features/"
              className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#38BDF8] font-semibold group-hover:text-white transition-colors"
            >
              <span>Explore feature catalog</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
