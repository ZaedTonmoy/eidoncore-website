"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ToolItem {
  id: string;
  name: string;
  category: string;
  color: string;
  gradientFrom: string;
  x: number; // Percentage or svg coord
  y: number;
  curvePath: string;
  icon: React.ReactNode;
}

export default function SaaSConvergenceGraphic() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [pulseCount, setPulseCount] = useState(0);

  // Trigger pulse cycles every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseCount((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const tools: ToolItem[] = [
    {
      id: "asana",
      name: "Asana",
      category: "Projects",
      color: "#F06A6A",
      gradientFrom: "#F06A6A",
      x: 250,
      y: 65,
      // Curved stream down into center (250, 250)
      curvePath: "M 250 85 C 254 130, 246 175, 250 215",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <circle cx="12" cy="7" r="3.5" fill="#F06A6A" />
          <circle cx="6.5" cy="16.5" r="3.5" fill="#F06A6A" />
          <circle cx="17.5" cy="16.5" r="3.5" fill="#F06A6A" />
        </svg>
      ),
    },
    {
      id: "hubspot",
      name: "HubSpot",
      category: "CRM",
      color: "#FF7A59",
      gradientFrom: "#FF7A59",
      x: 410,
      y: 175,
      // Curved stream inward to center
      curvePath: "M 390 185 C 330 190, 295 210, 275 230",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FF7A59">
          <circle cx="12" cy="12" r="9" fill="#FF7A59" />
          <circle cx="12" cy="12" r="4.5" fill="white" />
        </svg>
      ),
    },
    {
      id: "quickbooks",
      name: "QuickBooks",
      category: "Billing",
      color: "#2CA01C",
      gradientFrom: "#2CA01C",
      x: 350,
      y: 405,
      // Curved stream inward to center
      curvePath: "M 335 390 C 310 330, 285 295, 265 275",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#2CA01C">
          <circle cx="12" cy="12" r="10" fill="#2CA01C" />
          <text x="6" y="16.5" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">qb</text>
        </svg>
      ),
    },
    {
      id: "trello",
      name: "Trello",
      category: "Tasks",
      color: "#0079BF",
      gradientFrom: "#0079BF",
      x: 150,
      y: 405,
      // Curved stream inward to center
      curvePath: "M 165 390 C 190 330, 215 295, 235 275",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0079BF">
          <rect width="24" height="24" rx="4" fill="#0079BF" />
          <rect x="4" y="4" width="6.5" height="13" rx="1.5" fill="white" />
          <rect x="13.5" y="4" width="6.5" height="8.5" rx="1.5" fill="white" />
        </svg>
      ),
    },
    {
      id: "slack",
      name: "Slack",
      category: "Chat",
      color: "#4A154B",
      gradientFrom: "#E01E5A",
      x: 90,
      y: 175,
      // Curved stream inward to center
      curvePath: "M 110 185 C 170 190, 205 210, 225 230",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M5 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 2h4a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4z" fill="#E01E5A" />
          <path d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm2 0v4a2 2 0 0 1 4 0V5a2 2 0 0 1-4 0z" fill="#36C5F0" />
          <path d="M19 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0-2h-4a2 2 0 0 1 0-4h4a2 2 0 0 1 0 4z" fill="#2EB67D" />
          <path d="M14 19a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm-2 0v-4a2 2 0 0 1-4 0v4a2 2 0 0 1 4 0z" fill="#ECB22E" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto flex items-center justify-center select-none">
      
      {/* Background Orbital Guide Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[180px] h-[180px] rounded-full border border-slate-200/60 absolute" />
        <div className="w-[280px] h-[280px] rounded-full border border-dashed border-slate-200/70 absolute animate-[spin_60s_linear_infinite]" />
        <div className="w-[min(390px,92vw)] aspect-square rounded-full border border-slate-200/40 absolute" />
      </div>

      {/* SVG Flow Streams & Energy Beams */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      >
        <defs>
          {tools.map((t) => (
            <linearGradient
              key={`grad-${t.id}`}
              id={`grad-${t.id}`}
              gradientUnits="userSpaceOnUse"
              x1={t.x}
              y1={t.y}
              x2={250}
              y2={250}
            >
              <stop offset="0%" stopColor={t.color} stopOpacity="0.85" />
              <stop offset="60%" stopColor="#3F72AF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#3F72AF" stopOpacity="0.95" />
            </linearGradient>
          ))}
          {/* Radial Core Glow Filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Render Connection Streams */}
        {tools.map((t) => {
          const isHighlighted = activeTool === null || activeTool === t.id;
          return (
            <g key={`stream-${t.id}`}>
              {/* Background ambient path */}
              <path
                d={t.curvePath}
                fill="none"
                stroke={t.color}
                strokeWidth={isHighlighted ? "1.5" : "1"}
                strokeOpacity={isHighlighted ? "0.12" : "0.05"}
                strokeLinecap="round"
              />

              {/* Flowing Animated Energy Beam */}
              <path
                d={t.curvePath}
                fill="none"
                stroke={`url(#grad-${t.id})`}
                strokeWidth={isHighlighted ? "3" : "1.5"}
                strokeOpacity={isHighlighted ? "0.85" : "0.3"}
                strokeLinecap="round"
                strokeDasharray="6 8"
                className="animate-[flowBeam_2s_linear_infinite]"
              />

              {/* Glowing Pulse Beads moving along path */}
              <circle r="4" fill={t.color} filter="url(#glow)">
                <animateMotion
                  path={t.curvePath}
                  dur="2.4s"
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                />
              </circle>
              <circle r="2.5" fill="#FFFFFF">
                <animateMotion
                  path={t.curvePath}
                  dur="2.4s"
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Central Eidoncore Nucleus / Core */}
      <div className="relative z-30 flex flex-col items-center justify-center">
        {/* Expanding Transformation Shockwave */}
        <div
          key={`pulse-${pulseCount}`}
          className="absolute w-32 h-32 rounded-full border-2 border-blue-400/50 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_forwards] pointer-events-none"
        />

        {/* Ambient Halo Glow */}
        <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-sky-400/20 blur-2xl pointer-events-none animate-pulse" />

        {/* Center Glass Core */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-slate-200/90 shadow-2xl p-3.5 flex flex-col items-center justify-center gap-1 hover:border-[#3F72AF] hover:scale-105 transition-all duration-300 group cursor-default">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14">
            <Image
              src="/images/logo.png"
              alt="Eidoncore Logo Mark"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-900 group-hover:text-[#3F72AF] transition-colors">
            Eidoncore
          </span>
          <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
            Unified Core
          </span>
        </div>
      </div>

      {/* Outer Floating SaaS Tool Nodes */}
      {tools.map((t) => {
        const isSelected = activeTool === t.id;
        // Convert svg 0-500 coordinates to percentage styles
        const leftPct = `${(t.x / 500) * 100}%`;
        const topPct = `${(t.y / 500) * 100}%`;

        return (
          <div
            key={t.id}
            style={{ left: leftPct, top: topPct }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            onMouseEnter={() => setActiveTool(t.id)}
            onMouseLeave={() => setActiveTool(null)}
          >
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/95 backdrop-blur-md border shadow-md transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "scale-110 shadow-xl border-slate-400 ring-2 ring-blue-500/20"
                  : "border-slate-200/90 hover:scale-105 hover:shadow-lg"
              }`}
            >
              <div className="shrink-0">{t.icon}</div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {t.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 leading-tight">
                  {t.category}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating Bottom Status Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs text-[11px] text-slate-700 font-medium whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {activeTool ? (
              <span>
                <strong>{tools.find((t) => t.id === activeTool)?.name}</strong> converged into <strong>Eidoncore {tools.find((t) => t.id === activeTool)?.category}</strong>
              </span>
            ) : (
              <span>5 Disconnected SaaS Tools ➔ <strong>1 Single Operating Platform</strong></span>
            )}
          </span>
        </div>
      </div>

      {/* CSS Keyframes for SVG Dash Offset Animation */}
      <style jsx>{`
        @keyframes flowBeam {
          from {
            stroke-dashoffset: 28;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
