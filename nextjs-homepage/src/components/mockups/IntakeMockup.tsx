"use client";

import React from "react";
import { MessageSquare, ArrowRight, CheckCircle2, User, Hash } from "lucide-react";

export default function IntakeMockup() {
  return (
    <div className="w-full bg-white border border-[#E7E7EA] rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[360px] text-xs">
      {/* Left: Customer Request Chat Thread */}
      <div className="md:col-span-5 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-4 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E7E7EA]">
            <span className="font-medium text-[#0B0B0F] flex items-center gap-1.5">
              <MessageSquare size={13} className="text-indigo-600" /> Slack Customer Triage
            </span>
            <span className="text-[10px] font-mono text-[#6B6F76]">#feedback-enterprise</span>
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0">
              EK
            </div>
            <div className="flex flex-col gap-1 bg-white border border-[#E7E7EA] rounded-lg p-2.5 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-[#0B0B0F]">Elena Kovacs</span>
                <span className="text-[10px] text-[#6B6F76]">2m ago</span>
              </div>
              <p className="text-[#6B6F76] text-[11px] leading-relaxed">
                When bulk-exporting telemetry logs, the gzip compression times out on datasets over 500MB. Can this be queued asynchronously?
              </p>
            </div>
          </div>
        </div>

        {/* Action Button: Convert to Issue */}
        <div className="pt-3 border-t border-[#E7E7EA] flex items-center justify-between">
          <span className="text-[11px] text-[#6B6F76]">Auto-triaged by Agent</span>
          <button className="inline-flex items-center gap-1.5 bg-[#0B0B0F] text-white text-[11px] font-medium px-3 py-1.5 rounded-full hover:bg-neutral-800 transition-colors">
            Convert to Issue <ArrowRight size={11} />
          </button>
        </div>
      </div>

      {/* Right: Board with Columns */}
      <div className="md:col-span-7 grid grid-cols-3 gap-3">
        {/* Col 1: Triage */}
        <div className="bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[11px] font-medium text-[#6B6F76]">
            <span>Triage</span>
            <span className="font-mono text-[10px] bg-white border border-[#E7E7EA] px-1.5 rounded">2</span>
          </div>
          <div className="bg-white border border-[#E7E7EA] rounded-lg p-2.5 flex flex-col gap-1.5 shadow-2xs hover:border-indigo-200 transition-colors">
            <span className="font-mono text-[10px] text-indigo-600 font-medium">INT-891</span>
            <p className="text-[11px] font-medium text-[#0B0B0F] line-clamp-2">Queue asynchronous gzip for bulk telemetry exports</p>
            <div className="flex items-center justify-between pt-1 text-[10px] text-[#6B6F76]">
              <span className="bg-red-50 text-red-600 px-1 rounded border border-red-100">P1</span>
              <span>via Slack</span>
            </div>
          </div>
        </div>

        {/* Col 2: In Progress */}
        <div className="bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[11px] font-medium text-[#6B6F76]">
            <span>In Progress</span>
            <span className="font-mono text-[10px] bg-white border border-[#E7E7EA] px-1.5 rounded">3</span>
          </div>
          <div className="bg-white border border-[#E7E7EA] rounded-lg p-2.5 flex flex-col gap-1.5 shadow-2xs">
            <span className="font-mono text-[10px] text-indigo-600 font-medium">INT-884</span>
            <p className="text-[11px] font-medium text-[#0B0B0F] line-clamp-2">Webhook retry backoff handler for Zendesk events</p>
            <div className="flex items-center justify-between pt-1 text-[10px] text-[#6B6F76]">
              <span className="bg-amber-50 text-amber-700 px-1 rounded border border-amber-200">P2</span>
              <span>Alex R.</span>
            </div>
          </div>
        </div>

        {/* Col 3: Done */}
        <div className="bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[11px] font-medium text-[#6B6F76]">
            <span>Done</span>
            <span className="font-mono text-[10px] bg-white border border-[#E7E7EA] px-1.5 rounded">8</span>
          </div>
          <div className="bg-white border border-[#E7E7EA] rounded-lg p-2.5 flex flex-col gap-1.5 shadow-2xs opacity-80">
            <span className="font-mono text-[10px] text-emerald-600 font-medium">INT-879</span>
            <p className="text-[11px] font-medium text-[#0B0B0F] line-clamp-2">Intercom conversation linking to team issues</p>
            <div className="flex items-center justify-between pt-1 text-[10px] text-emerald-600">
              <span className="flex items-center gap-1"><CheckCircle2 size={11} /> Shipped</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
