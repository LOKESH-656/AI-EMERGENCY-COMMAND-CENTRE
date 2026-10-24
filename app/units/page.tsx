"use client";

import { useState } from "react";
import { Shield, Bell, Check, Radio } from "lucide-react";
import { useCommandCenterStore } from "@/lib/store";
import { soundFX } from "@/lib/sound";

export default function ResponderUnitsPage() {
  const { units, toggleUnitStatus, notifyUnit } = useCommandCenterStore();
  const [filter, setFilter] = useState<"ALL" | "EMS" | "Police" | "Fire & Rescue">("ALL");
  const [notifiedUnitId, setNotifiedUnitId] = useState<string | null>(null);

  const filteredUnits = units.filter((u) => {
    if (filter === "ALL") return true;
    return u.agency === filter;
  });

  const handleNotify = (unitId: string, callSign: string) => {
    soundFX.blip(1100, 0.08);
    setNotifiedUnitId(unitId);
    notifyUnit(unitId, `Command alert transmitted to ${callSign}`);
    setTimeout(() => {
      setNotifiedUnitId(null);
    }, 2500);
  };

  return (
    <div className="space-y-4">
      {/* Header & Agency Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-wider text-white">
              Multi-Agency Responder Apparatus
            </h1>
            <p className="text-xs text-slate-400">
              Direct telemetry, dispatch assignment, and ETA tracking across Medical, Police, and Fire agencies.
            </p>
          </div>
        </div>

        {/* Agency Filter Tabs */}
        <div className="flex items-center space-x-1.5 bg-[#091224] p-1 rounded-lg border border-[#16274b]">
          {(["ALL", "EMS", "Police", "Fire & Rescue"] as const).map((ag) => (
            <button
              key={ag}
              onClick={() => {
                setFilter(ag);
                soundFX.blip(750, 0.03);
              }}
              className={`px-3 py-1 rounded text-[11px] font-bold tracking-wider transition-all ${
                filter === ag
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {ag === "Fire & Rescue" ? "Fire & Rescue" : ag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Responder Cards (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUnits.map((u) => {
          const isResponding = u.status === "RESPONDING";
          const isBusy = u.status === "BUSY";

          const statusColor = isResponding
            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow"
            : isBusy
            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";

          const isNotified = notifiedUnitId === u.id;

          return (
            <div
              key={u.id}
              className="p-4 rounded-xl bg-[#091224] border border-[#16274b] shadow-tactical flex flex-col justify-between hover:border-cyan-500/30 transition-all"
            >
              <div>
                {/* Header: Call Sign + Status */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {u.callSign}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${statusColor}`}>
                    {u.status}
                  </span>
                </div>

                {/* Name & Agency */}
                <h3 className="font-bold text-sm text-white mb-0.5">{u.name}</h3>
                <div className="text-[11px] text-slate-400 font-mono mb-3">{u.agency}</div>

                {/* Order & ETA */}
                <div className="space-y-1.5 py-2.5 px-3 rounded-lg bg-[#060c1a] border border-[#142342] text-xs mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Current Order:</span>
                    <span className="font-mono text-cyan-300 font-semibold truncate max-w-[150px]">
                      {u.currentOrder}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">ETA to Scene:</span>
                    <span className="font-mono text-white font-bold">{u.eta}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#142342]">
                <button
                  onClick={() => {
                    soundFX.blip(650, 0.04);
                    toggleUnitStatus(u.id);
                  }}
                  className="py-1.5 px-2 rounded bg-[#0b162c] hover:bg-[#12244a] text-slate-300 text-xs font-semibold border border-[#182a4d] transition-all text-center"
                >
                  Toggle Status
                </button>

                <button
                  onClick={() => handleNotify(u.id, u.callSign)}
                  className={`py-1.5 px-2 rounded text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                    isNotified
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : "bg-[#0b162c] hover:bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:border-cyan-400"
                  }`}
                >
                  {isNotified ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Sent</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3 h-3 text-cyan-400" />
                      <span>Notify Unit</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
