"use client";

import { useState, useEffect } from "react";
import { Crosshair, Radio } from "lucide-react";
import { soundFX } from "@/lib/sound";

interface Blip {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  type: "incident" | "police" | "ems" | "hospital" | "fire";
  label: string;
  status: string;
  color: string;
}

export function TacticalRadarMap() {
  const [activeBlip, setActiveBlip] = useState<Blip | null>(null);

  const blips: Blip[] = [
    { id: "b1", x: 42, y: 35, type: "incident", label: "INC-1042 Road Accident", status: "2 Casualties", color: "#ef4444" },
    { id: "b2", x: 68, y: 48, type: "incident", label: "INC-1041 Structural Fire", status: "Active Attack", color: "#ef4444" },
    { id: "b3", x: 30, y: 58, type: "incident", label: "INC-1040 Cardiac Arrest", status: "CPR Cycle 3", color: "#ef4444" },
    { id: "b4", x: 55, y: 72, type: "incident", label: "INC-1039 Traffic Collision", status: "Clearing", color: "#f59e0b" },
    { id: "b5", x: 46, y: 38, type: "ems", label: "AMB-07 (Medic 7 ALS)", status: "ETA 4m", color: "#00e5ff" },
    { id: "b6", x: 40, y: 32, type: "police", label: "POL-12 Traffic Cruiser", status: "ETA 7m", color: "#3b82f6" },
    { id: "b7", x: 72, y: 42, type: "fire", label: "LAD-02 Ladder 2", status: "ETA 3m", color: "#fb923c" },
    { id: "b8", x: 65, y: 52, type: "fire", label: "ENG-04 Engine 4", status: "On Scene", color: "#fb923c" },
    { id: "b9", x: 32, y: 62, type: "ems", label: "AMB-01 MICU", status: "On Scene", color: "#00e5ff" },
    { id: "b10", x: 52, y: 26, type: "hospital", label: "City General Trauma", status: "16 ER Beds", color: "#10b981" },
    { id: "b11", x: 78, y: 38, type: "hospital", label: "St. Jude Hospital", status: "5 ER Beds", color: "#10b981" },
  ];

  return (
    <div className="bg-[#091224] border border-[#16274b] rounded-lg p-3.5 shadow-tactical flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Tactical Radar Map
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-bold tracking-wider">
          SECTOR LIVE
        </span>
      </div>

      {/* Radar Display Screen */}
      <div className="relative w-full aspect-[16/10] bg-[#050b18] rounded-md border border-[#122344] overflow-hidden flex items-center justify-center">
        {/* Radar Rings & Grid */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0, 229, 255, 0)" />
              <stop offset="90%" stopColor="rgba(0, 229, 255, 0.12)" />
              <stop offset="100%" stopColor="rgba(0, 229, 255, 0.25)" />
            </radialGradient>
          </defs>

          {/* Concentric Circles */}
          <circle cx="50%" cy="50%" r="20%" fill="none" stroke="#13274c" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#183363" strokeWidth="1" />
          <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#1c3a70" strokeWidth="1.2" />

          {/* Secondary Sub-radar Coverage Cones */}
          <circle cx="38%" cy="45%" r="22%" fill="none" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="1" strokeDasharray="4,4" />
          <circle cx="68%" cy="48%" r="18%" fill="none" stroke="rgba(0, 229, 255, 0.25)" strokeWidth="1" strokeDasharray="4,4" />

          {/* Crosshairs */}
          <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#13274c" strokeWidth="1" strokeDasharray="2,4" />
          <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#13274c" strokeWidth="1" strokeDasharray="2,4" />

          {/* Sweep Hand */}
          <g className="radar-sweep-animation" style={{ transformOrigin: "50% 50%" }}>
            <line x1="50%" y1="50%" x2="50%" y2="2%" stroke="rgba(0, 229, 255, 0.8)" strokeWidth="1.5" />
            <path
              d="M 50% 50% L 50% 2% A 48% 48% 0 0 1 75% 15% Z"
              fill="rgba(0, 229, 255, 0.08)"
            />
          </g>
        </svg>

        {/* Tactical Blips */}
        {blips.map((b) => (
          <div
            key={b.id}
            onClick={() => {
              setActiveBlip(b);
              soundFX.radarPing();
            }}
            onMouseEnter={() => {
              setActiveBlip(b);
              soundFX.blip(900, 0.02);
            }}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
          >
            <div className="relative flex items-center justify-center">
              <span
                style={{ backgroundColor: b.color }}
                className="w-2.5 h-2.5 rounded-full block shadow-sm ring-2 ring-[#050b18]"
              />
              <span
                style={{ borderColor: b.color }}
                className="absolute w-5 h-5 rounded-full border animate-ping-slow pointer-events-none opacity-70"
              />
            </div>
          </div>
        ))}

        {/* Hover Tooltip / Detail Box */}
        {activeBlip && (
          <div className="absolute top-2 left-2 z-20 bg-[#071124]/95 border border-cyan-500/50 rounded p-2 text-[10px] shadow-cyan-glow backdrop-blur-sm pointer-events-none">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span style={{ backgroundColor: activeBlip.color }} className="w-1.5 h-1.5 rounded-full inline-block" />
              <span>{activeBlip.label}</span>
            </div>
            <div className="text-cyan-300 font-mono mt-0.5">{activeBlip.status}</div>
          </div>
        )}
      </div>

      {/* Footer Status Bar */}
      <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between">
        <span>Active Vectors: <strong className="text-cyan-300">14</strong></span>
        <span className="flex items-center gap-1">
          GPS Lock: <strong className="text-emerald-400">STABLE</strong>
        </span>
      </div>
    </div>
  );
}
