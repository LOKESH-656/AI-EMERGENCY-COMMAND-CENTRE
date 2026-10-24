"use client";

import { useState } from "react";
import { Building2, BellRing, Check, Radio } from "lucide-react";
import { useCommandCenterStore } from "@/lib/store";
import { soundFX } from "@/lib/sound";

export default function HospitalAlertsPage() {
  const { hospitals, sendHospitalAlert } = useCommandCenterStore();
  const [alertingId, setAlertingId] = useState<string | null>(null);

  const handleSendAlert = (id: string, name: string) => {
    soundFX.hospitalAlert();
    setAlertingId(id);
    sendHospitalAlert(id);
    setTimeout(() => {
      setAlertingId(null);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <Building2 className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-sm font-bold uppercase tracking-wider text-white">
            Hospital Emergency Notification & Capacity
          </h1>
          <p className="text-xs text-slate-400">
            Bi-directional trauma bed availability telemetry with instantaneous pre-arrival alert routing.
          </p>
        </div>
      </div>

      {/* Grid of Hospital Cards (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {hospitals.map((h) => {
          const isAlerted = h.status === "ALERTED";
          const isProcessing = alertingId === h.id;

          const statusColor = isAlerted
            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";

          // Bar color: Red if capacity > 80%, else Cyan
          const barColor = h.capacityUtilization >= 80 ? "bg-rose-500" : "bg-cyan-400";

          return (
            <div
              key={h.id}
              className="p-5 rounded-xl bg-[#091224] border border-[#16274b] shadow-tactical flex flex-col justify-between hover:border-cyan-500/30 transition-all"
            >
              <div>
                {/* Header: Code/Level + Status Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {h.code} • {h.level}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>
                    {h.status}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-bold text-base text-white mb-1">{h.name}</h3>

                {/* Distance & ETA */}
                <div className="text-xs text-slate-400 font-mono mb-4">
                  Distance: <strong className="text-slate-200">{h.distanceKm} km</strong> • ETA:{" "}
                  <strong className="text-cyan-300">{h.etaMin} min</strong>
                </div>

                {/* Capacity Utilization Progress Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Capacity Utilization</span>
                    <span className="font-bold text-white">{h.capacityUtilization}%</span>
                  </div>

                  <div className="h-2.5 w-full bg-[#050b18] rounded-full overflow-hidden border border-[#142342]">
                    <div
                      style={{ width: `${h.capacityUtilization}%` }}
                      className={`h-full ${barColor} transition-all duration-500`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-0.5">
                    <span className="text-emerald-400 font-semibold">{h.openBeds} Open ER Beds</span>
                    <span>{h.totalBeds} Total Beds</span>
                  </div>
                </div>

                {h.lastAlertSent && (
                  <div className="p-2.5 rounded bg-[#070e20] border border-[#142342] text-[11px] text-cyan-200 font-mono mb-4">
                    Latest Alert: {h.lastAlertSent}
                  </div>
                )}
              </div>

              {/* Action Button: SEND HOSPITAL ALERT */}
              <button
                onClick={() => handleSendAlert(h.id, h.name)}
                disabled={isProcessing}
                className="w-full py-2.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 shadow-tactical"
              >
                {isProcessing ? (
                  <>
                    <Radio className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Transmitting Pre-Arrival Telemetry...</span>
                  </>
                ) : (
                  <>
                    <BellRing className="w-4 h-4 text-emerald-400" />
                    <span>Send Hospital Alert</span>
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
