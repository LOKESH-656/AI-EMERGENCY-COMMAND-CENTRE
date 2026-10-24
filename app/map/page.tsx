"use client";

import { useState } from "react";
import { Navigation, ZoomIn, ZoomOut, RotateCcw, Shield, Radio, MapPin, Building2, Flame } from "lucide-react";
import { soundFX } from "@/lib/sound";

interface MapNode {
  id: string;
  code: string;
  label: string;
  sub: string;
  category: "INCIDENTS" | "AMBULANCES" | "POLICE" | "HOSPITALS";
  x: number; // percentage
  y: number; // percentage
  status: string;
  eta?: string;
  color: string;
  connectedTo?: string; // id of target node for dispatch line
}

export default function SharedTacticalMapPage() {
  const [filter, setFilter] = useState<"ALL" | "INCIDENTS" | "AMBULANCES" | "POLICE" | "HOSPITALS">("ALL");
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);

  const nodes: MapNode[] = [
    // Incidents
    {
      id: "inc-1042",
      code: "INC-1042",
      label: "Road Accident (Multi-Vehicle)",
      sub: "East Gate Road & 4th Ave • 2 Casualties",
      category: "INCIDENTS",
      x: 52,
      y: 35,
      status: "RESPONDING",
      color: "#ef4444",
    },
    {
      id: "inc-1041",
      code: "INC-1041",
      label: "Structural Fire (3rd Floor)",
      sub: "Oakland Commercial Complex",
      category: "INCIDENTS",
      x: 68,
      y: 28,
      status: "DISPATCHED",
      color: "#ef4444",
    },
    {
      id: "inc-1040",
      code: "INC-1040",
      label: "Medical Emergency (Cardiac)",
      sub: "Metro Central Mall Food Court",
      category: "INCIDENTS",
      x: 35,
      y: 52,
      status: "ON SCENE",
      color: "#ef4444",
    },
    {
      id: "inc-1038",
      code: "INC-1038",
      label: "Hazardous Material Leak",
      sub: "Warehouse 9 • Ammonia vapor",
      category: "INCIDENTS",
      x: 30,
      y: 28,
      status: "CONTAINED",
      color: "#ef4444",
    },
    {
      id: "inc-1039",
      code: "INC-1039",
      label: "Traffic Collision",
      sub: "South Highway Ex 14",
      category: "INCIDENTS",
      x: 72,
      y: 65,
      status: "INVESTIGATING",
      color: "#f59e0b",
    },
    {
      id: "inc-1037",
      code: "INC-1037",
      label: "Road Obstruction",
      sub: "Pine Hill Parkway • Fallen tree",
      category: "INCIDENTS",
      x: 58,
      y: 72,
      status: "SCHEDULED",
      color: "#10b981",
    },

    // Ambulances (EMS)
    {
      id: "amb-07",
      code: "AMB-07",
      label: "Medic 7 ALS",
      sub: "En route to INC-1042",
      category: "AMBULANCES",
      x: 56,
      y: 45,
      status: "RESPONDING",
      eta: "4 min",
      color: "#00e5ff",
      connectedTo: "inc-1042",
    },
    {
      id: "amb-01",
      code: "AMB-01",
      label: "MICU Alpha-1",
      sub: "On scene at INC-1040",
      category: "AMBULANCES",
      x: 36,
      y: 56,
      status: "ON SCENE",
      color: "#00e5ff",
      connectedTo: "inc-1040",
    },
    {
      id: "amb-11",
      code: "AMB-11",
      label: "Medic 11 BLS",
      sub: "Patrolling Sector West",
      category: "AMBULANCES",
      x: 28,
      y: 70,
      status: "AVAILABLE",
      eta: "Ready",
      color: "#00e5ff",
    },

    // Police
    {
      id: "pol-12",
      code: "POL-12",
      label: "Traffic Unit 12",
      sub: "En route to INC-1042",
      category: "POLICE",
      x: 48,
      y: 36,
      status: "RESPONDING",
      eta: "7 min",
      color: "#3b82f6",
      connectedTo: "inc-1042",
    },
    {
      id: "pol-08",
      code: "POL-08",
      label: "Highway Patrol 8",
      sub: "Clearing INC-1039 South Hwy",
      category: "POLICE",
      x: 73,
      y: 70,
      status: "BUSY",
      color: "#3b82f6",
      connectedTo: "inc-1039",
    },
    {
      id: "pol-19",
      code: "POL-19",
      label: "Tactical Unit 19",
      sub: "HQ Reserve",
      category: "POLICE",
      x: 44,
      y: 75,
      status: "AVAILABLE",
      color: "#3b82f6",
    },

    // Fire Apparatus
    {
      id: "lad-02",
      code: "LAD-02",
      label: "Ladder 2 Rescue",
      sub: "En route to INC-1041",
      category: "INCIDENTS", // Fire & rescue
      x: 65,
      y: 33,
      status: "RESPONDING",
      eta: "3 min",
      color: "#fb923c",
      connectedTo: "inc-1041",
    },

    // Hospitals
    {
      id: "hosp-01",
      code: "HOSP-01",
      label: "City General Trauma Center",
      sub: "Level 1 • 16 Beds • Alerted",
      category: "HOSPITALS",
      x: 53,
      y: 24,
      status: "ALERTED",
      color: "#10b981",
      connectedTo: "inc-1042",
    },
    {
      id: "hosp-02",
      code: "HOSP-02",
      label: "St. Jude Memorial Hospital",
      sub: "Level 2 • 5 Beds",
      category: "HOSPITALS",
      x: 75,
      y: 35,
      status: "NORMAL",
      color: "#10b981",
    },
    {
      id: "hosp-03",
      code: "HOSP-03",
      label: "Metro Emergency Hospital",
      sub: "Level 1 • 34 Beds • Alerted",
      category: "HOSPITALS",
      x: 40,
      y: 65,
      status: "ALERTED",
      color: "#10b981",
      connectedTo: "inc-1040",
    },
    {
      id: "hosp-04",
      code: "HOSP-04",
      label: "Northside Pediatric & Acute",
      sub: "Level 3 • 36 Beds",
      category: "HOSPITALS",
      x: 76,
      y: 50,
      status: "NORMAL",
      color: "#10b981",
    },
  ];

  const filteredNodes = nodes.filter((n) => {
    if (filter === "ALL") return true;
    return n.category === filter;
  });

  return (
    <div className="space-y-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-wider text-white">
              Shared Tactical Operations Grid
            </h1>
            <p className="text-xs text-slate-400">
              Live telemetry tracking emergency blips, emergency apparatus, and hospitals.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 bg-[#091224] p-1 rounded-lg border border-[#16274b]">
          {(["ALL", "INCIDENTS", "AMBULANCES", "POLICE", "HOSPITALS"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                soundFX.blip(800, 0.03);
              }}
              className={`px-3 py-1 rounded text-[11px] font-bold tracking-wider transition-all ${
                filter === cat
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tactical Map Box */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/10] bg-[#050b18] rounded-xl border border-[#16274b] overflow-hidden shadow-tactical tactical-grid-bg">
        {/* Vector SVG Telemetry Grid & Connected Routes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Tactical Radar Concentric Circles in background */}
          <circle cx="52%" cy="40%" r="28%" fill="none" stroke="rgba(0, 229, 255, 0.12)" strokeWidth="1" strokeDasharray="4,6" />
          <circle cx="52%" cy="40%" r="18%" fill="none" stroke="rgba(0, 229, 255, 0.18)" strokeWidth="1" />
          <circle cx="36%" cy="56%" r="14%" fill="none" stroke="rgba(0, 229, 255, 0.1)" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx="70%" cy="30%" r="16%" fill="none" stroke="rgba(0, 229, 255, 0.14)" strokeWidth="1" strokeDasharray="3,3" />

          {/* Dotted lines connecting Units to Incidents */}
          {nodes.map((n) => {
            if (!n.connectedTo) return null;
            const target = nodes.find((t) => t.id === n.connectedTo);
            if (!target) return null;

            return (
              <g key={`line-${n.id}-${target.id}`}>
                <line
                  x1={`${n.x}%`}
                  y1={`${n.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="rgba(0, 229, 255, 0.5)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  className="animate-pulse"
                />
              </g>
            );
          })}
        </svg>

        {/* Nodes / Blips */}
        {filteredNodes.map((n) => {
          const isSelected = selectedNode?.id === n.id;

          return (
            <div
              key={n.id}
              onClick={() => {
                setSelectedNode(n);
                soundFX.blip(900, 0.04);
              }}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            >
              {/* Node Icon Circle */}
              <div
                className={`relative px-2 py-1 rounded-full flex items-center space-x-1.5 transition-all ${
                  isSelected
                    ? "bg-[#0b1c3b] ring-2 ring-cyan-400 shadow-cyan-glow scale-110"
                    : "bg-[#071126]/90 hover:bg-[#0c1c3d] border border-[#172c54]"
                }`}
              >
                <span
                  style={{ backgroundColor: n.color }}
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0 animate-ping-slow"
                />
                <span className="text-[10px] font-mono font-bold text-white tracking-wider whitespace-nowrap">
                  {n.code}
                </span>
              </div>
            </div>
          );
        })}

        {/* Tactical Legend (Bottom Left - as seen in screenshot 3 bottom) */}
        <div className="absolute bottom-4 left-4 z-30 p-3 rounded-lg bg-[#071126]/90 border border-[#16274b] shadow-tactical backdrop-blur-sm text-[11px] font-mono space-y-1.5">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
            Tactical Legend
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
            <span>High-Priority Incident</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
            <span>Paramedic Unit (ALS)</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
            <span>Police / Highway Patrol</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Receiving Hospital ER</span>
          </div>
        </div>

        {/* Selected Node Telemetry Inspector Card (Top Right) */}
        {selectedNode && (
          <div className="absolute top-4 right-4 z-30 p-4 rounded-xl bg-[#081228]/95 border border-cyan-500/50 shadow-cyan-glow backdrop-blur-md w-72 text-xs space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#182a4d] pb-2">
              <div className="flex items-center space-x-2">
                <span style={{ backgroundColor: selectedNode.color }} className="w-2 h-2 rounded-full" />
                <span className="font-mono font-bold text-cyan-300">{selectedNode.code}</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedNode.status}
              </span>
            </div>

            <div className="font-bold text-white text-xs">{selectedNode.label}</div>
            <p className="text-[11px] text-slate-300">{selectedNode.sub}</p>

            {selectedNode.eta && (
              <div className="text-[11px] text-emerald-400 font-mono">
                ETA to Scene: <strong>{selectedNode.eta}</strong>
              </div>
            )}

            <button
              onClick={() => setSelectedNode(null)}
              className="w-full mt-1 py-1 rounded bg-[#0f2142] hover:bg-[#152e5a] text-slate-300 text-[10px] uppercase font-semibold"
            >
              Close Inspector
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
