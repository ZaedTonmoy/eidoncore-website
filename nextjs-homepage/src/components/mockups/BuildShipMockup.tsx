"use client";

import React from "react";
import { GitBranch, GitPullRequest, CheckCircle2 } from "lucide-react";

export default function BuildShipMockup() {
  return (
    <div className="w-full bg-white border border-[#E7E7EA] rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[360px] text-xs">
      {/* Left: Issue & Branch Tracker */}
      <div className="md:col-span-5 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-4 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E7E7EA]">
            <span className="font-medium text-[#0B0B0F] flex items-center gap-1.5">
              <GitPullRequest size={13} className="text-indigo-600" /> Pull Request #482
            </span>
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
              Checks Passing
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[11px] text-[#6B6F76]">
              <GitBranch size={12} /> <span className="font-mono text-[#0B0B0F]">sarah/agent-stream-opt</span>
            </div>
            <div className="bg-white border border-[#E7E7EA] rounded-lg p-2.5 flex flex-col gap-1 text-[11px]">
              <span className="font-medium text-[#0B0B0F]">Linked to issue ENG-1042</span>
              <span className="text-[#6B6F76]">4 commits &bull; 2 reviews approved</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#E7E7EA] flex items-center justify-between text-[11px]">
          <span className="text-[#6B6F76]">Deployment Target</span>
          <span className="font-mono text-[#0B0B0F] font-medium">preview-eng-1042.internal</span>
        </div>
      </div>

      {/* Right: Code Diff View */}
      <div className="md:col-span-7 bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-4 flex flex-col justify-between font-mono text-[11px]">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-[#E7E7EA] text-[#6B6F76]">
            <span>src/engine/orchestrator.ts</span>
            <span className="text-[10px]">+14 / -4 lines</span>
          </div>

          {/* Diff Lines */}
          <div className="pt-3 flex flex-col gap-1 leading-relaxed">
            <div className="text-[#6B6F76] px-2 py-0.5">
              @@ -14,7 +14,9 @@ export class AgentStream {
            </div>
            <div className="bg-red-50 text-red-700 px-2 py-0.5 rounded flex items-center gap-2">
              <span className="select-none text-red-400">-</span>
              <span>await this.socket.send(payload);</span>
            </div>
            <div className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-2">
              <span className="select-none text-emerald-500">+</span>
              <span>const channel = await this.pool.acquire(streamId);</span>
            </div>
            <div className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-2">
              <span className="select-none text-emerald-500">+</span>
              <span>await channel.publishOptimistic(payload, &#123; timeoutMs: 50 &#125;);</span>
            </div>
            <div className="text-[#6B6F76] px-2 py-0.5">
              &nbsp;&nbsp;this.metrics.recordLatency(&quot;p99&quot;);
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#E7E7EA] flex items-center justify-between text-[10px] text-[#6B6F76]">
          <span>Reviewer: Alex Rivera (Approved)</span>
          <span className="text-emerald-600 flex items-center gap-1 font-sans"><CheckCircle2 size={12} /> Ready to ship</span>
        </div>
      </div>
    </div>
  );
}
