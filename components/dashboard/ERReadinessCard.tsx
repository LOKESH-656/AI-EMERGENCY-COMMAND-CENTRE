"use client";

import { Building2, BellRing, Check } from "lucide-react";
import { Hospital } from "@/lib/initial-data";
import { soundFX } from "@/lib/sound";
import { useState } from "react";

interface ERReadinessCardProps {
  hospitals: Hospital[];
  onQuickAlert: (hospitalId: string) => void;
}

export function ERReadinessCard({ hospitals, onQuickAlert }: ERReadinessCardProps) {
  const [alertedIds, setAlertedIds] = useState<string[]>([]);

  const handleAlert = (id: string) => {
    soundFX.hospitalAlert();
    setAlertedIds((prev) => [...prev, id]);
    onQuickAlert(id);
    setTimeout(() => {
      setAlertedIds((prev) => prev.filter((item) => item !== id));
    }, 4000);
  };

  return (
    <div className="bg-[#091224] border border-[#16274b] rounded-lg p-3.5 shadow-tactical flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Building2 className="w-3.5 h-3.5 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Receiving ER Readiness
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[9px] font-mono font-bold tracking-wider">
          Live Telemetry
        </span>
      </div>

      {/* Hospital List */}
      <div className="space-y-2.5">
        {hospitals.slice(0, 2).map((h) => {
          const isAlerted = alertedIds.includes(h.id);

          return (
            <div
              key={h.id}
              className="p-2.5 rounded-lg bg-[#070e1e] border border-[#142342] flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-white">{h.name}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {h.level} • <strong className="text-emerald-400">{h.openBeds} beds available</strong>
                </div>
              </div>

              <button
                onClick={() => handleAlert(h.id)}
                className={`px-3 py-1 rounded text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  isAlerted
                    ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse"
                    : "bg-[#0b1730] border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400"
                }`}
              >
                {isAlerted ? (
                  <>
                    <Check className="w-3 h-3 text-rose-400" />
                    <span>Alerted!</span>
                  </>
                ) : (
                  <>
                    <BellRing className="w-3 h-3 text-cyan-400" />
                    <span>Quick Alert</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
