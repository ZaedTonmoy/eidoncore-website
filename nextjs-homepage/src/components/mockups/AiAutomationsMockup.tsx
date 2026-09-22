"use client";

import React from "react";
import { Sparkles, Bot, Check, Zap } from "lucide-react";

export default function AiAutomationsMockup() {
  return (
    <div className="w-full bg-white border border-[#E7E7EA] rounded-2xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs min-h-[340px]">
      {/* Card 1: Agent Chat */}
      <div className="bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-indigo-600 font-medium">
            <Bot size={14} /> <span>Triage Agent</span>
          </div>
          <div className="bg-white border border-[#E7E7EA] rounded-lg p-2 text-[11px] text-[#6B6F76]">
            &ldquo;Identified 4 duplicate stack traces for issue #1042. Grouping into single incident.&rdquo;
          </div>
        </div>
        <div className="pt-2 border-t border-[#E7E7EA] flex items-center justify-between text-[10px] text-[#6B6F76]">
          <span>Accuracy: 99.4%</span>
          <span className="font-mono text-emerald-600">Applied</span>
        </div>
      </div>

      {/* Card 2: Activity Automation */}
      <div className="bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-amber-600 font-medium">
            <Zap size={14} /> <span>Workflow Rule</span>
          </div>
          <p className="text-[11px] text-[#0B0B0F] leading-snug">
            When PR merged to <code className="bg-white px-1 py-0.5 rounded border border-[#E7E7EA] font-mono text-[10px]">main</code>:
          </p>
          <div className="bg-white border border-[#E7E7EA] rounded-lg p-2 text-[10.5px] text-[#6B6F76] flex flex-col gap-1">
            <span>&bull; Transition to Done</span>
            <span>&bull; Notify customer channel</span>
            <span>&bull; Add to release note</span>
          </div>
        </div>
        <div className="pt-2 border-t border-[#E7E7EA] flex items-center justify-between text-[10px] text-[#6B6F76]">
          <span>Runs: 142 today</span>
          <span className="font-mono text-emerald-600">Active</span>
        </div>
      </div>

      {/* Card 3: Auto-Generated Task Details */}
      <div className="bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-indigo-600 font-medium">
            <Sparkles size={14} /> <span>Smart Checklist</span>
          </div>
          <div className="flex flex-col gap-1.5 text-[10.5px] text-[#6B6F76]">
            <div className="flex items-center gap-1.5 text-[#0B0B0F]">
              <span className="w-3 h-3 rounded bg-indigo-600 text-white flex items-center justify-center"><Check size={8} /></span>
              <span>Unit tests passing</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#0B0B0F]">
              <span className="w-3 h-3 rounded bg-indigo-600 text-white flex items-center justify-center"><Check size={8} /></span>
              <span>Migration backward-compatible</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#6B6F76]">
              <span className="w-3 h-3 rounded border border-[#E7E7EA] bg-white" />
              <span>Load test at 10k req/s</span>
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-[#E7E7EA] text-[10px] text-[#6B6F76]">
          Generated from PR commit #982
        </div>
      </div>

      {/* Card 4: Agent Review Gate */}
      <div className="bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <Bot size={14} /> <span>Security Reviewer</span>
          </div>
          <p className="text-[11px] text-[#6B6F76] leading-relaxed">
            Scan completed: Zero secret leaks, dependency graphs verified against CVE registry.
          </p>
        </div>
        <div className="pt-2 border-t border-[#E7E7EA] flex items-center justify-between text-[10px] text-[#6B6F76]">
          <span>Security Gate</span>
          <span className="font-mono text-emerald-600 font-medium">&check; Passed</span>
        </div>
      </div>
    </div>
  );
}
