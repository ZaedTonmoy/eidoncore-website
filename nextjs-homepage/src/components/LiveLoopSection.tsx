"use client";

import React, { useState } from "react";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedText from "./AnimatedText";
import { RefreshCw } from "lucide-react";

interface LoopStage {
  num: string;
  name: string;
  tip: string;
  angle: number; // in degrees
}

const STAGES: LoopStage[] = [
  { num: "01", name: "Lead", tip: "Inbound interest lands here first - before it's anyone's account.", angle: 0 },
  { num: "02", name: "Client", tip: "The lead becomes a live account, with its own history and contacts.", angle: 45 },
  { num: "03", name: "Proposal", tip: "Scope and pricing go out for signature - tracked until it's signed.", angle: 90 },
  { num: "04", name: "Project", tip: "Work kicks off on a timeline, scoped straight from the proposal.", angle: 135 },
  { num: "05", name: "Task", tip: "Day-to-day execution, assigned and tracked through to done.", angle: 180 },
  { num: "06", name: "Support", tip: "Client questions and requests land here, without derailing the project.", angle: 225 },
  { num: "07", name: "Invoice", tip: "Automated invoices and recurring billing - seamlessly connected to every project.", angle: 270 },
  { num: "08", name: "Report", tip: "Margins and outcomes roll up - and point straight at the next lead.", angle: 315 },
];

export default function LiveLoopSection() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <section
      id="workflow-loop"
      className="bg-[#0B1A2B] text-[#EDEFF4] py-16 sm:py-24 md:py-28 relative overflow-visible border-t border-b border-[#E2EDF8]/10"
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-mono tracking-wider uppercase text-white mb-5 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ADB5] animate-ping" />
              <span>LIVE LOOP</span>
            </div>

            {/* Headline */}
            <AnimatedHeading
              as="h2"
              text="Built as a Loop, Not a Funnel"
              className="text-2xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-white leading-[1.1] text-left"
            />

            {/* Paragraph */}
            <p className="mt-4 sm:mt-5 text-[#8D92A8] text-sm sm:text-base leading-relaxed max-w-lg">
              Most agency tools stop at the invoice. <strong className="text-white font-semibold">Eidoncore doesn&apos;t</strong> - every closed job feeds your reports, and every report surfaces the next lead. This is the cycle running underneath your agency, stage by stage, on repeat.
            </p>

            {/* Loop Note */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13px] text-[#8D92A8] leading-relaxed">
              <RefreshCw size={16} className="text-[#00ADB5] shrink-0 mt-0.5" />
              <p>
                Hover any stage to see what happens there. Watch the pulse - it never stops at <span className="text-[#00ADB5] font-medium">Report</span>, it turns back into <span className="text-[#00ADB5] font-medium">Lead</span>.
              </p>
            </div>
          </div>

          {/* Right Column: Circular Orbiting Loop (Desktop) & Timeline (Mobile) */}
          <div className="lg:col-span-7 flex justify-center items-center py-4 sm:py-10 overflow-visible">
            
            {/* Desktop Orbit (Visible >= 640px) */}
            <div className="hidden sm:block relative w-[380px] h-[380px] md:w-[480px] md:h-[480px] overflow-visible">
              
              {/* Outer dashed track */}
              <div className="absolute inset-4 md:inset-6 rounded-full border border-dashed border-[#E2EDF8]/20" />

              {/* Pulsing traveling dot along circle using SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 480 480">
                <circle
                  cx="240"
                  cy="240"
                  r="190"
                  fill="none"
                  stroke="rgba(0, 173, 181, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />
                <circle cx="240" cy="50" r="5" fill="#00ADB5" className="filter drop-shadow-[0_0_8px_#00ADB5]">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 240 240"
                    to="360 240 240"
                    dur="18s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#122542] border border-white/20 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10 pointer-events-none">
                <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#8D92A8] uppercase">
                  STAGES
                </span>
                <span className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                  8
                </span>
                <span className="font-mono text-[9px] md:text-[10px] tracking-wider text-[#00ADB5] font-semibold">
                  LOOPED
                </span>
              </div>

              {/* 8 Orbiting Stage Pills */}
              {STAGES.map((st, i) => {
                const rad = (st.angle * Math.PI) / 180;
                const radiusPct = 42;
                const left = 50 + radiusPct * Math.cos(rad);
                const top = 50 + radiusPct * Math.sin(rad);

                const isHovered = activeStage === i;
                const isTopHalf = top < 35;

                return (
                  <div
                    key={st.num}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all ${
                      isHovered ? "z-[999]" : "z-20"
                    }`}
                    onMouseEnter={() => setActiveStage(i)}
                    onMouseLeave={() => setActiveStage(null)}
                  >
                    <div
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer shadow-md select-none ${
                        isHovered
                          ? "bg-[#182D4D] border-[#00ADB5] scale-105 shadow-[0_0_20px_rgba(0,173,181,0.4)] ring-2 ring-[#00ADB5]/30"
                          : "bg-[#122542] border-white/15 hover:border-[#00ADB5]/50 hover:bg-[#182D4D]"
                      }`}
                    >
                      <span className="font-mono text-[10.5px] text-[#00ADB5] font-bold">
                        {st.num}
                      </span>
                      <span className="text-xs md:text-[13px] font-semibold text-white whitespace-nowrap">
                        {st.name}
                      </span>
                    </div>

                    {/* Tooltip on hover */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 w-60 p-3 rounded-xl bg-[#182D4D] border border-[#00ADB5]/50 text-xs text-[#EDEFF4] text-center shadow-[0_16px_36px_rgba(0,0,0,0.7)] pointer-events-none transition-all duration-200 z-[9999] ${
                        isTopHalf
                          ? "top-[calc(100%+10px)]"
                          : "bottom-[calc(100%+10px)]"
                      } ${
                        isHovered
                          ? "opacity-100 translate-y-0 visible"
                          : `opacity-0 ${isTopHalf ? "-translate-y-1" : "translate-y-1"} invisible`
                      }`}
                    >
                      <span className="text-white font-bold block mb-1 text-xs">
                        {st.num} {st.name}
                      </span>
                      <p className="text-[11.5px] text-[#C5CAD6] leading-relaxed m-0">
                        {st.tip}
                      </p>
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent ${
                          isTopHalf
                            ? "bottom-full border-b-4 border-b-[#182D4D]"
                            : "top-full border-t-4 border-t-[#182D4D]"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Vertical Timeline (Clean aligned dot & line on phone view) */}
            <div className="sm:hidden w-full relative pl-6 border-l-2 border-[#00ADB5]/40 flex flex-col gap-5 ml-2 my-2">
              {STAGES.map((st) => (
                <div key={st.num} className="relative">
                  {/* Timeline circle node centered on border-left */}
                  <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#0B1A2B] border-2 border-[#00ADB5]" />
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#00ADB5] font-bold">{st.num}</span>
                    <span className="text-sm font-semibold text-white">{st.name}</span>
                  </div>
                  <p className="mt-1 text-xs text-[#8D92A8] leading-relaxed">{st.tip}</p>
                </div>
              ))}
              <div className="mt-2 text-xs font-mono text-[#00ADB5] flex items-center gap-1.5 pt-2 border-t border-white/10">
                <RefreshCw size={12} />
                <span>Report insight becomes next quarter&apos;s lead</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
