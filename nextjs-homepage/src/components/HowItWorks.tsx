"use client";

import React, { useState, useEffect } from "react";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedText from "./AnimatedText";
import SectionBadge from "./SectionBadge";
import { Check, Copy, ArrowRight, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StepTab {
  id: number;
  num: string;
  title: string;
  desc: string;
}

const STEPS: StepTab[] = [
  {
    id: 0,
    num: "01",
    title: "Create your workspace",
    desc: "Pick your agency name and get a live URL in under a minute.",
  },
  {
    id: 1,
    num: "02",
    title: "Customize & brand",
    desc: "Logo, colors, email, and payments - or go full white-label.",
  },
  {
    id: 2,
    num: "03",
    title: "Invite your team",
    desc: "Owners, admins, project managers - role-based, from day one.",
  },
  {
    id: 3,
    num: "04",
    title: "Start delivering",
    desc: "Add a client, spin up a project, send the first invoice.",
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#3F72AF");
  const [whiteLabelActive, setWhiteLabelActive] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto cycle through tabs every 6 seconds if not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % STEPS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#FAFAFA] border-t border-b border-[#E7E7EA]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Head */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <SectionBadge text="How It Works" />
          <AnimatedHeading
            as="h2"
            text="Up And Running in Minutes"
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B0B0F] leading-[1.08] justify-center"
          />
          <AnimatedText
            text="Get your agency workspace live in four simple steps."
            mode="word"
            className="mt-4 text-[#6B6F76] text-base sm:text-lg leading-relaxed justify-center"
          />
        </div>

        {/* Stage: Interactive Tabs on Left / Screen on Right (Equal Height: items-stretch) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Left: 4 Interactive Step Tabs */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {STEPS.map((step) => {
              const isActive = activeTab === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveTab(step.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex-1 flex flex-col justify-center ${
                    isActive
                      ? "bg-white border-[#3F72AF] shadow-sm"
                      : "bg-[#F4F4F6] border-[#E7E7EA] hover:bg-white hover:border-[#0B0B0F]/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isActive
                          ? "bg-[#3F72AF]/10 text-[#3F72AF]"
                          : "bg-neutral-200/60 text-[#6B6F76]"
                      }`}
                    >
                      {step.num}
                    </span>
                    <h3
                      className={`text-base font-semibold tracking-tight transition-colors ${
                        isActive ? "text-[#0B0B0F]" : "text-[#6B6F76] group-hover:text-[#0B0B0F]"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs sm:text-[13px] text-[#6B6F76] leading-relaxed pl-9">
                    {step.desc}
                  </p>

                  {/* Active Progress Bar at bottom */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100">
                      <div className="h-full bg-[#3F72AF] animate-[progress_5.5s_linear]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Mockup Browser Device Screen (Matching height of left side) */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-white border border-[#E7E7EA] rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full">
              
              {/* Device Topbar */}
              <div className="h-10 bg-[#F7F7F8] border-b border-[#E7E7EA] px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E7E7EA]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E7E7EA]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E7E7EA]" />
                </div>
                <div className="px-3 py-1 bg-white border border-[#E7E7EA] rounded-md text-[11px] font-mono text-[#6B6F76] shadow-2xs">
                  studio-nine.eidoncore.com
                </div>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  Step {activeTab + 1}/4
                </span>
              </div>

              {/* Panel Content Based on Active Tab with Smooth AnimatePresence Transition */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center bg-white relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {/* Panel 0: Create Workspace */}
                  {activeTab === 0 && (
                    <motion.div
                      key="tab-0"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="flex flex-col gap-4 max-w-md mx-auto w-full"
                    >
                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#6B6F76] font-medium block mb-1">
                          Agency Name
                        </label>
                        <div className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#E7E7EA] rounded-lg text-sm font-medium text-[#0B0B0F]">
                          Studio Nine
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#6B6F76] font-medium block mb-1">
                          Workspace URL
                        </label>
                        <div className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#E7E7EA] rounded-lg text-sm text-[#0B0B0F] flex items-center justify-between font-mono">
                          <span className="font-semibold text-[#3F72AF]">studio-nine</span>
                          <span className="text-[#6B6F76]">.eidoncore.com</span>
                        </div>
                      </div>

                      <div className="mt-2 w-full py-2.5 bg-[#3F72AF] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs">
                        <span>Start 14-day free trial</span>
                        <ArrowRight size={13} />
                      </div>

                      <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-medium pt-1">
                        <Check size={14} />
                        <span>Workspace created instantly</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Panel 1: Customize & Brand */}
                  {activeTab === 1 && (
                    <motion.div
                      key="tab-1"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="flex flex-col gap-5 max-w-md mx-auto w-full"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl text-white font-bold flex items-center justify-center text-sm shadow-xs transition-colors"
                          style={{ backgroundColor: selectedColor }}
                        >
                          SN
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-[#0B0B0F] block">Agency Logo</span>
                          <span className="text-[11px] text-[#6B6F76]">Custom favicon & white-label badge</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#6B6F76] font-medium block mb-2">
                          Brand Color
                        </label>
                        <div className="flex items-center gap-3">
                          {["#3F72AF", "#7C86FF", "#6BCF9A", "#FF6B6B", "#2B2F3A"].map((color) => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              style={{ backgroundColor: color }}
                              className={`w-7 h-7 rounded-full transition-transform ${
                                selectedColor === color ? "scale-125 ring-2 ring-offset-2 ring-[#0B0B0F]" : "hover:scale-110"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-[#0B0B0F]">White-label domain</span>
                          <span className="text-[10.5px] text-[#6B6F76]">Remove all Eidoncore references</span>
                        </div>
                        <button
                          onClick={() => setWhiteLabelActive(!whiteLabelActive)}
                          className={`w-10 h-5 rounded-full transition-colors relative ${
                            whiteLabelActive ? "bg-emerald-500" : "bg-neutral-300"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                              whiteLabelActive ? "left-5" : "left-0.5"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-medium">
                        <Check size={14} />
                        <span>Brand applied across all client views</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Panel 2: Invite Team */}
                  {activeTab === 2 && (
                    <motion.div
                      key="tab-2"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="flex flex-col gap-3 max-w-md mx-auto w-full"
                    >
                      <div className="p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                            S
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-[#0B0B0F] block">Sara K.</span>
                            <span className="text-[10px] text-[#6B6F76]">Admin • Full Access</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200/60 rounded text-[10px] font-mono font-medium text-emerald-700">
                          Active
                        </span>
                      </div>

                      <div className="p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                            O
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-[#0B0B0F] block">Owen R.</span>
                            <span className="text-[10px] text-[#6B6F76]">Project Manager</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 bg-blue-50 border border-blue-200/60 rounded text-[10px] font-mono font-medium text-blue-700">
                          Invited
                        </span>
                      </div>

                      <div className="p-2.5 border border-dashed border-[#3F72AF]/40 rounded-xl text-center text-xs font-semibold text-[#3F72AF] bg-[#3F72AF]/5 hover:bg-[#3F72AF]/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                        <UserPlus size={13} />
                        <span>+ Invite teammate with role-based permissions</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Panel 3: Start Delivering */}
                  {activeTab === 3 && (
                    <motion.div
                      key="tab-3"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="flex flex-col gap-4 max-w-md mx-auto w-full"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl text-center">
                          <span className="text-xl font-bold text-[#0B0B0F] block">6</span>
                          <span className="text-[10px] text-[#6B6F76] uppercase tracking-wider font-mono">Clients</span>
                        </div>
                        <div className="p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl text-center">
                          <span className="text-xl font-bold text-[#0B0B0F] block">11</span>
                          <span className="text-[10px] text-[#6B6F76] uppercase tracking-wider font-mono">Projects</span>
                        </div>
                        <div className="p-3 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl text-center">
                          <span className="text-xl font-bold text-emerald-600 block">$18.4k</span>
                          <span className="text-[10px] text-[#6B6F76] uppercase tracking-wider font-mono">Invoiced</span>
                        </div>
                      </div>

                      <div className="p-3 bg-white border border-[#E7E7EA] rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#0B0B0F] truncate">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="truncate">nimbus.studio-nine.com</span>
                        </div>
                        <button
                          onClick={() => {
                            setCopiedLink(true);
                            setTimeout(() => setCopiedLink(false), 2000);
                          }}
                          className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 rounded text-[10.5px] font-mono font-medium text-[#0B0B0F] transition-colors flex items-center gap-1"
                        >
                          <Copy size={11} />
                          <span>{copiedLink ? "COPIED" : "COPY LINK"}</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-medium">
                        <Check size={14} />
                        <span>Ready for live client onboarding</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
