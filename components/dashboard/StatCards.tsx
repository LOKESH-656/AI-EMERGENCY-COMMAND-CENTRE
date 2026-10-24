"use client";

import { AlertTriangle, Shield, Truck, Radio } from "lucide-react";
import { Incident, ResponderUnit } from "@/lib/initial-data";

interface StatCardsProps {
  incidents: Incident[];
  units: ResponderUnit[];
}

export function StatCards({ incidents, units }: StatCardsProps) {
  const highPriorityCount = incidents.filter((i) => i.priority === "HIGH").length;
  const respondingUnitsCount = units.filter((u) => u.status === "RESPONDING" || u.status === "BUSY").length;
  const availableAmbulances = units.filter((u) => u.agency === "EMS" && u.status === "AVAILABLE").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. ACTIVE INCIDENTS */}
      <div className="bg-[#091224] border border-[#16274b] rounded-lg p-4 relative overflow-hidden shadow-tactical hover:border-[#1d3567] transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[11px] font-bold tracking-wider uppercase">Active Incidents</span>
          <div className="w-6 h-6 rounded bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold font-mono text-white">{incidents.length}</span>
          <span className="text-xs text-rose-400 font-semibold">({highPriorityCount} High Priority)</span>
        </div>
        <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
          <span className="text-rose-400 font-bold">+2</span> reported in the last 15 min
        </div>
      </div>

      {/* 2. RESPONDING UNITS */}
      <div className="bg-[#091224] border border-[#16274b] rounded-lg p-4 relative overflow-hidden shadow-tactical hover:border-[#1d3567] transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[11px] font-bold tracking-wider uppercase">Responding Units</span>
          <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Shield className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline space-x-1.5">
          <span className="text-2xl font-bold font-mono text-white">{respondingUnitsCount}</span>
          <span className="text-xs text-slate-400">of {units.length} Deployed</span>
        </div>
        <div className="mt-2 text-[10px] text-slate-400">
          Avg ETA across sectors: <strong className="text-cyan-300">5.4m</strong>
        </div>
      </div>

      {/* 3. AVAILABLE AMBULANCES */}
      <div className="bg-[#091224] border border-[#16274b] rounded-lg p-4 relative overflow-hidden shadow-tactical hover:border-[#1d3567] transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[11px] font-bold tracking-wider uppercase">Available Ambulances</span>
          <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Truck className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold font-mono text-white">{availableAmbulances}</span>
          <span className="text-xs text-emerald-400 font-semibold">ALS Ready</span>
        </div>
        <div className="mt-2 text-[10px] text-slate-400">
          Fleet Readiness: <strong className="text-emerald-400">84%</strong>
        </div>
      </div>

      {/* 4. INCIDENTS MONITORED */}
      <div className="bg-[#091224] border border-[#16274b] rounded-lg p-4 relative overflow-hidden shadow-tactical hover:border-[#1d3567] transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[11px] font-bold tracking-wider uppercase">Incidents Monitored</span>
          <div className="w-6 h-6 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Radio className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold font-mono text-white">24/7</span>
          <span className="text-xs text-blue-400 font-medium">Neural Stream</span>
        </div>
        <div className="mt-2 text-[10px] text-cyan-300 flex items-center gap-1.5 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>0.3s Llama 3.1 inference latency</span>
        </div>
      </div>
    </div>
  );
}
