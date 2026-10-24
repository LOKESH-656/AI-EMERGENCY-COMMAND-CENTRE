"use client";

import { useState } from "react";
import { Truck, Battery, Fuel, Wrench, CheckCircle, AlertCircle, Shield } from "lucide-react";
import { useCommandCenterStore } from "@/lib/store";
import { soundFX } from "@/lib/sound";

export default function FleetResourcesPage() {
  const { units } = useCommandCenterStore();
  const [activeTab, setActiveTab] = useState<"ALL" | "READY" | "SERVICE">("ALL");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-wider text-white">
              Fleet Resources & Apparatus Telemetry
            </h1>
            <p className="text-xs text-slate-400">
              Onboard equipment inventory, maintenance diagnostics, fuel/battery telemetry, and apparatus readiness.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-3 py-1 rounded bg-[#091224] border border-[#16274b] text-emerald-400">
            Readiness: <strong>92.3%</strong>
          </span>
        </div>
      </div>

      {/* Fleet Apparatus Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {units.map((u) => {
          const fuel = u.batteryOrFuel || 85;
          const isLow = fuel < 75;

          return (
            <div
              key={u.id}
              className="p-4 rounded-xl bg-[#091224] border border-[#16274b] shadow-tactical flex flex-col justify-between hover:border-cyan-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {u.callSign}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Crew: <strong className="text-white">{u.personnelCount || 2} Pax</strong>
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white mb-0.5">{u.name}</h3>
                <div className="text-[11px] text-cyan-400 font-mono mb-3">{u.agency}</div>

                <div className="p-2.5 rounded bg-[#060c1a] border border-[#142342] text-[11px] text-slate-300 mb-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Onboard Equipment:</span>
                    <span className="text-cyan-300 font-medium truncate max-w-[150px]">
                      {u.specialty || "Standard Tactical Gear"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Telemetry Status:</span>
                    <span className="text-emerald-400 font-mono">Encrypted 5G Mesh</span>
                  </div>
                </div>

                {/* Battery/Fuel Indicator */}
                <div className="space-y-1 mb-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Fuel className="w-3 h-3 text-cyan-400" />
                      <span>Propulsion / Fuel Level</span>
                    </span>
                    <span className={isLow ? "text-amber-400" : "text-emerald-400"}>{fuel}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#050b18] rounded-full overflow-hidden border border-[#142342]">
                    <div
                      style={{ width: `${fuel}%` }}
                      className={`h-full ${isLow ? "bg-amber-400" : "bg-cyan-400"}`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-[#142342] text-[11px]">
                <span className="text-slate-400">Inspection: Current</span>
                <button
                  onClick={() => soundFX.blip(850, 0.03)}
                  className="px-2.5 py-1 rounded bg-[#0e1d3a] hover:bg-[#142a55] border border-cyan-500/30 text-cyan-300 text-[10px] font-semibold"
                >
                  Diagnostic Ping
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
