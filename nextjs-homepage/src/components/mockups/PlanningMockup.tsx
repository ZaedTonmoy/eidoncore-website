"use client";

import React from "react";
import { Calendar, TrendingUp } from "lucide-react";

export default function PlanningMockup() {
  return (
    <div className="w-full bg-white border border-[#E7E7EA] rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[360px] text-xs">
      {/* Left: Gantt Roadmap Bars */}
      <div className="md:col-span-7 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-4 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E7E7EA]">
            <span className="font-medium text-[#0B0B0F] flex items-center gap-1.5">
              <Calendar size={13} className="text-indigo-600" /> Q3 &bull; Engineering Roadmap
            </span>
            <span className="text-[10px] font-mono text-[#6B6F76]">Cycle 41 &mdash; 44</span>
          </div>

          {/* Timeline header */}
          <div className="grid grid-cols-4 text-[10px] font-mono text-[#6B6F76] border-b border-[#E7E7EA] pb-1">
            <span>July</span>
            <span>August</span>
            <span>September</span>
            <span>October</span>
          </div>

          {/* Roadmap Bars */}
          <div className="flex flex-col gap-3 pt-2">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-medium text-[#0B0B0F]">Agent Protocol 2.0</span>
                <span className="font-mono text-[10px] text-[#6B6F76]">85%</span>
              </div>
              <div className="w-full bg-[#E7E7EA] h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[85%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-medium text-[#0B0B0F]">Sub-50ms Global Sync</span>
                <span className="font-mono text-[10px] text-[#6B6F76]">60%</span>
              </div>
              <div className="w-full bg-[#E7E7EA] h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[60%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-medium text-[#0B0B0F]">Distributed Event Bus</span>
                <span className="font-mono text-[10px] text-[#6B6F76]">30%</span>
              </div>
              <div className="w-full bg-[#E7E7EA] h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-400 h-full w-[30%] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#E7E7EA] flex items-center justify-between text-[11px] text-[#6B6F76]">
          <span>3 Initiatives in Flight</span>
          <span className="font-mono text-emerald-600 font-medium">On schedule &bull; 92% SLA</span>
        </div>
      </div>

      {/* Right: Scatter / Velocity Cycle Dot Chart */}
      <div className="md:col-span-5 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-[#E7E7EA]">
            <span className="font-medium text-[#0B0B0F] flex items-center gap-1.5">
              <TrendingUp size={13} className="text-emerald-600" /> Cycle Velocity &amp; Lead Time
            </span>
            <span className="text-[10px] font-mono text-[#6B6F76]">p90 = 2.4d</span>
          </div>

          {/* SVG Dot Scatter Chart */}
          <div className="pt-4">
            <svg className="w-full h-36" viewBox="0 0 240 100" fill="none">
              {/* Target Line */}
              <line x1="0" y1="50" x2="240" y2="50" stroke="#E6F23A" strokeWidth="2" strokeDasharray="4 4" />
              <text x="5" y="44" fill="#0B0B0F" fontSize="8" fontFamily="monospace">Target: 3.0 days</text>
              
              {/* Scatter Points (Simulating tasks plotted by lead time) */}
              <circle cx="25" cy="65" r="3" fill="#5B5FEF" opacity="0.8" />
              <circle cx="45" cy="42" r="3.5" fill="#5B5FEF" />
              <circle cx="60" cy="55" r="2.5" fill="#5B5FEF" opacity="0.6" />
              <circle cx="85" cy="35" r="4" fill="#5B5FEF" />
              <circle cx="110" cy="48" r="3" fill="#5B5FEF" opacity="0.9" />
              <circle cx="130" cy="28" r="3" fill="#5B5FEF" />
              <circle cx="155" cy="52" r="3.5" fill="#5B5FEF" />
              <circle cx="180" cy="38" r="3" fill="#5B5FEF" opacity="0.7" />
              <circle cx="205" cy="30" r="4" fill="#10B981" />
              <circle cx="225" cy="22" r="3.5" fill="#10B981" />
            </svg>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E7E7EA] flex items-center justify-between text-[11px] text-[#6B6F76]">
          <span>Average cycle lead time</span>
          <span className="font-mono text-[#0B0B0F] font-medium">-34% faster this quarter</span>
        </div>
      </div>
    </div>
  );
}
