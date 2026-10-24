"use client";

import { useState } from "react";
import { Radio, Play } from "lucide-react";
import { useCommandCenterStore } from "@/lib/store";
import { StatCards } from "@/components/dashboard/StatCards";
import { LiveIncidentFeed } from "@/components/dashboard/LiveIncidentFeed";
import { TacticalRadarMap } from "@/components/dashboard/TacticalRadarMap";
import { PriorityBreakdown } from "@/components/dashboard/PriorityBreakdown";
import { ERReadinessCard } from "@/components/dashboard/ERReadinessCard";
import { CommandSheetModal } from "@/components/modals/CommandSheetModal";
import { WorkflowSimModal } from "@/components/modals/WorkflowSimModal";
import { DemoIncidentModal } from "@/components/modals/DemoIncidentModal";
import { soundFX } from "@/lib/sound";

export default function DashboardPage() {
  const {
    incidents,
    units,
    hospitals,
    selectedIncident,
    setSelectedIncident,
    sendHospitalAlert,
    addIncident,
  } = useCommandCenterStore();

  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Top Banner: AI Multi-Agency Coordination Layer Active */}
      <div className="p-3.5 rounded-lg bg-gradient-to-r from-[#0c1a36] via-[#09152e] to-[#0a1b38] border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-cyan-glow">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-2">
              <span>AI Multi-Agency Coordination Layer Active</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Llama 3.1 real-time synthesis ingesting messy voice, citizen images, and caller transcripts.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundFX.blip(650, 0.05);
            setIsWorkflowModalOpen(true);
          }}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded bg-[#0f2347] hover:bg-[#143063] border border-cyan-400/60 text-cyan-300 hover:text-white text-xs font-semibold shadow-sm transition-all shrink-0 active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-cyan-400" />
          <span>Simulate 30-Second Workflow</span>
        </button>
      </div>

      {/* 4 Stat KPI Cards */}
      <StatCards incidents={incidents} units={units} />

      {/* Main Grid: Feed & Tactical Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Live Incident Feed (7 cols) */}
        <div className="lg:col-span-7">
          <LiveIncidentFeed
            incidents={incidents}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
          />
        </div>

        {/* Right Column: Tactical Radar + Priority Breakdown + ER Readiness (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <TacticalRadarMap />
          <PriorityBreakdown incidents={incidents} />
          <ERReadinessCard
            hospitals={hospitals}
            onQuickAlert={(id) => sendHospitalAlert(id)}
          />
        </div>
      </div>

      {/* Modals */}
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

      <WorkflowSimModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
      />

      <DemoIncidentModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onInjectIncident={(inc) => addIncident(inc)}
      />
    </div>
  );
}
