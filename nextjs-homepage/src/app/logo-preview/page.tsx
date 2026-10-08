"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles } from "lucide-react";

const concepts = [
  {
    id: "01",
    title: "The Modular Hexagon",
    badge: "Top Recommendation",
    src: "/images/logo-concepts/01-modular-hexagon.jpg",
    metaphor: "Isometric building blocks forming an interlocked E & C",
    meaning: "Represents Eidoncore's 19 unified modules (CRM, Portals, Invoicing, AI Agents, Tasks) locked into one solid operating system.",
    vibe: "Robust, architectural, futuristic, enterprise AI SaaS",
    bestFor: "Primary brand mark, App icon, Software splash screens",
  },
  {
    id: "02",
    title: "The Continuous Infinity Ribbon",
    badge: "Fluid & Modern",
    src: "/images/logo-concepts/02-infinity-ribbon.jpg",
    metaphor: "Continuous gradient ribbon where E loops smoothly into C",
    meaning: "Symbolizes autonomous workflows and frictionless synchronization between agency operations and client portals.",
    vibe: "Fluid, high-end AI platform, sleek, futuristic",
    bestFor: "Mobile app icons, brand collateral, marketing",
  },
  {
    id: "03",
    title: "The Radar & Cockpit Aperture",
    badge: "Precision 2D Vector",
    src: "/images/logo-concepts/03-radar-aperture.jpg",
    metaphor: "Central E nucleus enclosed by a calibrated radar C ring",
    meaning: "Directly mirrors the Mission Control Flight Deck, Live Telemetry, and Executive Cockpit.",
    vibe: "Technical instrument, precision engineering, Swiss typography",
    bestFor: "16px/32px favicons, top navbar header, high-contrast monochrome",
  },
  {
    id: "04",
    title: "The Dynamic Velocity Glyph",
    badge: "Bold & Fast",
    src: "/images/logo-concepts/04-velocity-glyph.jpg",
    metaphor: "Angular, forward-leaning geometric badge with precision diagonal cuts",
    meaning: "Represents project velocity, delivery acceleration, and operational agility.",
    vibe: "Decisive, dynamic, aerospace flight deck aesthetic",
    bestFor: "Dark-mode header marks, developer documentation, stickers",
  },
  {
    id: "05",
    title: "The Circular Nucleus",
    badge: "AI Engine",
    src: "/images/logo-concepts/05-circular-nucleus.jpg",
    metaphor: "Concentric circular orbits creating E and C around a bright core",
    meaning: "Captures the 'Core' of Eidoncore as the central brain powering the modern agency.",
    vibe: "Silicon Valley AI platform, glowing neon cyan/cobalt palette",
    bestFor: "Digital marketing, animated launch video, web headers",
  },
  {
    id: "06",
    title: "The Nested Core",
    badge: "Classic Monogram",
    src: "/images/logo-concepts/06-nested-core.jpg",
    metaphor: "A clean geometric E protected inside an orbital C shield",
    meaning: "Classic monogram emblem representing enterprise stability and client trust.",
    vibe: "Authoritative, structured, balanced",
    bestFor: "Corporate documents, invoices, legal portals",
  },
];

export default function LogoPreviewPage() {
  const [selected, setSelected] = useState("01");

  const current = concepts.find((c) => c.id === selected) || concepts[0];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white font-sans selection:bg-blue-600 selection:text-white pb-24">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-[#0E121D]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-medium flex items-center gap-1">
              <Sparkles size={11} /> Brand Identity Lab
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Eidoncore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">"EC" Logo Explorations</span>
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Generated concepts exploring how the <b>E</b> and <b>C</b> monogram can represent Eidoncore as an AI-powered agency operating system and mission control cockpit.
        </p>
      </div>

      {/* Grid of Concepts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concepts.map((c) => {
          const isSelected = selected === c.id;
          return (
            <div
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? "border-blue-500 bg-[#131927] ring-2 ring-blue-500/30 shadow-xl shadow-blue-500/10"
                  : "border-slate-800 bg-[#0E131F] hover:border-slate-700 hover:bg-[#121826]"
              }`}
            >
              <div className="p-4 sm:p-5">
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      #{c.id}
                    </span>
                    <h3 className="font-bold text-base text-white">{c.title}</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700/60 font-medium">
                    {c.badge}
                  </span>
                </div>

                {/* Logo Image Preview */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/60 border border-slate-800/80 mb-4 group">
                  <img
                    src={c.src}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                      <Check size={13} strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase font-mono tracking-wider">
                      Concept & Metaphor
                    </span>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      {c.metaphor}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/60">
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase font-mono tracking-wider">
                      Why it fits Eidoncore
                    </span>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      {c.meaning}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom application tag */}
              <div className="px-4 sm:px-5 py-3 bg-[#0A0E17] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{c.vibe}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Detail Spotlight & Navbar Mockup */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <div className="rounded-2xl border border-slate-800 bg-[#0E131F] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-36 h-36 rounded-2xl overflow-hidden border border-slate-700 shrink-0 shadow-2xl bg-black">
              <img
                src={current.src}
                alt={current.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">
                  Active Spotlight
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Concept #{current.id}
                </span>
              </div>

              <h2 className="text-2xl font-black text-white mt-1">
                {current.title}
              </h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                {current.meaning}
              </p>

              {/* Mockup in Navbar */}
              <div className="mt-5 p-3 rounded-xl bg-white text-slate-900 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2.5">
                  <img
                    src={current.src}
                    alt="Logo mockup"
                    className="w-7 h-7 rounded-lg object-cover shadow-sm"
                  />
                  <span className="font-bold text-sm tracking-tight text-slate-900">
                    Eidoncore
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-600">
                  <span>Features</span>
                  <span>Modules</span>
                  <span>Pricing</span>
                </div>
                <div className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold">
                  Start Free Trial
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
