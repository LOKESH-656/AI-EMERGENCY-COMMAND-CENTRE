"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Zap, Clock, ShieldCheck } from "lucide-react";
import { soundFX } from "@/lib/sound";

export default function DemoAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("24h");

  // 24-Hour Ingestion Trend Data
  const hourlyData = [
    { hour: "00", count: 4 },
    { hour: "01", count: 3 },
    { hour: "02", count: 2 },
    { hour: "03", count: 2 },
    { hour: "04", count: 1 },
    { hour: "05", count: 3 },
    { hour: "06", count: 7 },
    { hour: "07", count: 14 },
    { hour: "08", count: 18 },
    { hour: "09", count: 16 },
    { hour: "10", count: 13 },
    { hour: "11", count: 15 },
    { hour: "12", count: 21 },
    { hour: "13", count: 17 },
    { hour: "14", count: 19 },
    { hour: "15", count: 22 },
    { hour: "16", count: 26 },
    { hour: "17", count: 29 },
    { hour: "18", count: 34 },
    { hour: "19", count: 32 }, // Peak surge
    { hour: "20", count: 24 },
    { hour: "21", count: 18 },
    { hour: "22", count: 12 },
    { hour: "23", count: 7 },
  ];

  const maxVal = Math.max(...hourlyData.map((d) => d.count));

  const classifications = [
    { label: "Road Traffic Accidents", pct: 45, color: "bg-rose-500", text: "text-rose-400" },
    { label: "Medical & Cardiac Emergencies", pct: 30, color: "bg-cyan-400", text: "text-cyan-400" },
    { label: "Structural & Wildfire Incidents", pct: 15, color: "bg-amber-500", text: "text-amber-400" },
    { label: "Hazmat & Environmental", pct: 10, color: "bg-emerald-400", text: "text-emerald-400" },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-wider text-white">
              Demo Analytics & Response Efficiency
            </h1>
            <p className="text-xs text-slate-400">
              Simulated performance KPIs comparing traditional dispatcher response vs Llama 3.1 neural routing.
            </p>
          </div>
        </div>

        <button
          onClick={() => soundFX.blip(700, 0.03)}
          className="px-3 py-1.5 rounded bg-[#091224] border border-[#16274b] text-cyan-300 text-xs font-mono font-bold tracking-wider hover:bg-[#0e1d3a] transition-all"
        >
          DEMO DATA
        </button>
      </div>

      {/* 3 Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-xl bg-[#091224] border border-[#16274b] shadow-tactical">
          <div className="text-[11px] text-slate-400 uppercase font-mono mb-1">
            Average AI Triage Time
          </div>
          <div className="text-3xl font-bold font-mono text-cyan-400 mb-1">2.4 sec</div>
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>94% faster than manual intake</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-xl bg-[#091224] border border-[#16274b] shadow-tactical">
          <div className="text-[11px] text-slate-400 uppercase font-mono mb-1">
            Average Dispatched ETA
          </div>
          <div className="text-3xl font-bold font-mono text-emerald-400 mb-1">4.8 min</div>
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>-3.2 min regional reduction</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-xl bg-[#091224] border border-[#16274b] shadow-tactical">
          <div className="text-[11px] text-slate-400 uppercase font-mono mb-1">
            Cross-Agency Notification Sync
          </div>
          <div className="text-3xl font-bold font-mono text-white mb-1">100%</div>
          <div className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Simultaneous police/hospital trigger</span>
          </div>
        </div>
      </div>

      {/* 2 Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: 24-Hour Trend Chart (7 cols) */}
        <div className="lg:col-span-7 p-4 rounded-xl bg-[#091224] border border-[#16274b] shadow-tactical flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-white mb-4">
              24-Hour Incident Ingestion Trend (Simulated)
            </h3>

            {/* Custom High-Fidelity Tactical Bar Chart */}
            <div className="h-44 w-full flex items-end gap-1.5 pt-6 pb-2 px-1">
              {hourlyData.map((d, i) => {
                const heightPct = (d.count / maxVal) * 100;
                const isPeak = d.hour === "19" || d.hour === "18";

                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 bg-[#070e20] border border-cyan-500/40 text-cyan-300 font-mono text-[9px] px-1.5 py-0.5 rounded pointer-events-none transition-opacity whitespace-nowrap z-20">
                      {d.hour}:00 - {d.count} calls
                    </div>

                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t transition-all ${
                        isPeak
                          ? "bg-cyan-400 shadow-cyan-glow"
                          : "bg-[#183664] group-hover:bg-cyan-500/70"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subtext labels */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-3 border-t border-[#142342]">
            <span>00:00 Night Baseline</span>
            <span>Peak Surge: 19:00 (Rush Hour)</span>
          </div>
        </div>

        {/* Right: Emergency Incidents by Classification (5 cols) */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-[#091224] border border-[#16274b] shadow-tactical flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-white mb-4">
              Emergency Incidents by Classification
            </h3>

            <div className="space-y-4">
              {classifications.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.label}</span>
                    <span className={`font-mono font-bold ${item.text}`}>{item.pct}%</span>
                  </div>

                  <div className="h-2 w-full bg-[#050b18] rounded-full overflow-hidden border border-[#142342]">
                    <div
                      style={{ width: `${item.pct}%` }}
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-[#070e20] border border-[#142342] text-[10px] text-slate-400 leading-relaxed">
            Neural classification runs with continuous zero-shot transfer learning across FEMA NIMS categories.
          </div>
        </div>
      </div>
    </div>
  );
}
