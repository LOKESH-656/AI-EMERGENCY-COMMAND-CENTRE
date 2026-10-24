"use client";

import { Incident } from "@/lib/initial-data";

interface PriorityBreakdownProps {
  incidents: Incident[];
}

export function PriorityBreakdown({ incidents }: PriorityBreakdownProps) {
  const high = incidents.filter((i) => i.priority === "HIGH").length;
  const med = incidents.filter((i) => i.priority === "MEDIUM").length;
  const low = incidents.filter((i) => i.priority === "LOW").length;
  const total = incidents.length || 1;

  const pctHigh = (high / total) * 100;
  const pctMed = (med / total) * 100;
  const pctLow = (low / total) * 100;

  return (
    <div className="bg-[#091224] border border-[#16274b] rounded-lg p-3.5 shadow-tactical">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white">
          Priority Severity Breakdown
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Total: {incidents.length}</span>
      </div>

      {/* Segmented Progress Bar */}
      <div className="h-3 w-full bg-[#050b18] rounded-full overflow-hidden flex border border-[#142342] mb-2.5">
        <div
          style={{ width: `${pctHigh}%` }}
          className="bg-rose-500 h-full transition-all duration-500"
        />
        <div
          style={{ width: `${pctMed}%` }}
          className="bg-amber-500 h-full transition-all duration-500"
        />
        <div
          style={{ width: `${pctLow}%` }}
          className="bg-emerald-500 h-full transition-all duration-500"
        />
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>High: {high}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Medium: {med}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Low: {low}</span>
        </div>
      </div>
    </div>
  );
}
