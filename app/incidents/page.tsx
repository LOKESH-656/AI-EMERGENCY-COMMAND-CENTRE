"use client";

import { useState } from "react";
import { Crosshair, MapPin, ChevronRight } from "lucide-react";
import { useCommandCenterStore } from "@/lib/store";
import { Incident } from "@/lib/initial-data";
import { CommandSheetModal } from "@/components/modals/CommandSheetModal";
import { soundFX } from "@/lib/sound";

export default function ActiveIncidentsPage() {
  const { incidents, selectedIncident, setSelectedIncident, sendHospitalAlert } = useCommandCenterStore();

  const handleOpenCommandSheet = (inc: Incident) => {
    soundFX.blip(800, 0.04);
    setSelectedIncident(inc);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Crosshair className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-wider text-white">
              Active Incidents Master List
            </h1>
            <p className="text-xs text-slate-400">
              Real-time monitoring of all reported emergencies undergoing triage or active response.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-[#091224] px-3 py-1.5 rounded border border-[#16274b]">
          Total: <strong className="text-white">{incidents.length} active</strong>
        </div>
      </div>

      {/* Grid of Incidents (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {incidents.map((inc) => {
          const isHigh = inc.priority === "HIGH";
          const isMed = inc.priority === "MEDIUM";

          const badgeColor = isHigh
            ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
            : isMed
            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";

          return (
            <div
              key={inc.id}
              className="p-4 rounded-xl bg-[#091224] border border-[#16274b] shadow-tactical flex flex-col justify-between hover:border-cyan-500/40 transition-all"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
                    {inc.priority} PRIORITY
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold">{inc.code}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-sm text-white mb-1.5">{inc.title}</h3>

                {/* Location */}
                <div className="flex items-center space-x-1.5 text-xs text-cyan-400 font-medium mb-2.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{inc.location}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {inc.description}
                </p>

                {/* 2 Stats boxes: Injuries & Road Block */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="p-2.5 rounded-lg bg-[#060c1a] border border-[#142342]">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Injuries</div>
                    <div className="font-bold text-xs text-slate-200 mt-0.5">{inc.injuries}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#060c1a] border border-[#142342]">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Road Block</div>
                    <div className="font-bold text-xs text-slate-200 mt-0.5 truncate" title={inc.roadBlock}>
                      {inc.roadBlock}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer: Status + Button */}
              <div className="flex items-center justify-between pt-3 border-t border-[#142342]">
                <div className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                  {inc.status}
                </div>

                <button
                  onClick={() => handleOpenCommandSheet(inc)}
                  className="flex items-center space-x-1 text-xs font-semibold text-cyan-300 hover:text-white bg-[#0e1c38] hover:bg-[#142a55] px-3 py-1.5 rounded border border-cyan-500/30 transition-all"
                >
                  <span>View Command Sheet</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <CommandSheetModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onSendHospitalAlert={(inc) => {
          if (inc.aiAnalysis?.closestHospitalId) {
            sendHospitalAlert(inc.aiAnalysis.closestHospitalId);
          } else {
            sendHospitalAlert("h1");
          }
        }}
      />
    </div>
  );
}
