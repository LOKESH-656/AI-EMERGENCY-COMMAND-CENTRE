"use client";

import { Radio, Cpu, FileJson, Send, AlertCircle, Sparkles, Users, Activity, Shield, Hospital, Truck, Compass } from "lucide-react";

export default function SystemArchitecturePage() {
  const pipelineSteps = [
    {
      num: "01. INGESTION",
      title: "Multimodal Input",
      desc: "Messy citizen voice, audio recordings, scene photos, GPS coordinates.",
      icon: Radio,
    },
    {
      num: "02. REASONING",
      title: "Llama 3.1 Neural Core",
      desc: "Zero-shot casualty extraction, hazard detection, road blockage identification.",
      icon: Cpu,
    },
    {
      num: "03. SYNTHESIS",
      title: "Structured Incident",
      desc: "Standardized JSON payload with priority level, required apparatus, and hazards.",
      icon: FileJson,
    },
    {
      num: "04. DISPATCH",
      title: "Multi-Agency Action",
      desc: "Simultaneous notification to Ambulances, Police, and Receiving ER Trauma Centers.",
      icon: Send,
    },
  ];

  const personas = [
    {
      title: "Citizens / Bystanders",
      desc: "Report emergencies via voice & photo without friction.",
      icon: Users,
    },
    {
      title: "EMS Paramedics",
      desc: "Receive casualty counts & extrication notes en route.",
      icon: Activity,
    },
    {
      title: "Police & Traffic",
      desc: "Automated road blockage alerts for traffic diversions.",
      icon: Shield,
    },
    {
      title: "Fire & Rescue",
      desc: "Flammable liquid & building floor hazard detection.",
      icon: Truck,
    },
    {
      title: "Hospital ER Triage",
      desc: "Prep trauma bays with real-time ETA countdowns.",
      icon: Hospital,
    },
    {
      title: "Command Operations",
      desc: "Holistic citywide radar map & resource allocations.",
      icon: Compass,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <h1 className="text-base font-bold uppercase tracking-wider text-white">
          AI Emergency Coordination Pipeline
        </h1>
        <p className="text-xs text-slate-400">
          From unorganized, panicked caller reports to structured operational triage in sub-second latency.
        </p>
      </div>

      {/* 4 Pipeline Workflow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {pipelineSteps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#091224] border border-[#16274b] shadow-tactical flex flex-col justify-between hover:border-cyan-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-wider">
                    {step.num}
                  </span>
                  <div className="w-6 h-6 rounded bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <StepIcon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="font-bold text-xs text-white mb-1.5">{step.title}</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Annotation */}
      <div className="text-center text-[10px] text-slate-400 italic">
        *AI helps organize information, not replace professional judgment*
      </div>

      {/* Comparison Section (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Traditional Bottleneck */}
        <div className="p-5 rounded-xl bg-[#0a1224] border border-rose-500/30 shadow-tactical space-y-3">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>The Traditional Bottleneck</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-rose-400 font-bold">•</span>
              <span>
                <strong className="text-white">Incomplete Information:</strong> Panicked 911 callers omit critical location or hazard data.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-rose-400 font-bold">•</span>
              <span>
                <strong className="text-white">Sequential Phone Trees:</strong> Dispatchers make separate calls to EMS, Fire, and Hospitals.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-rose-400 font-bold">•</span>
              <span>
                <strong className="text-white">Unclear Severity:</strong> Trapped victims and fluid leaks only discovered once units arrive on scene.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-rose-400 font-bold">•</span>
              <span>
                <strong className="text-white">Siloed Visibility:</strong> Responders do not share the same real-time situational picture.
              </span>
            </li>
          </ul>
        </div>

        {/* Card 2: The AI Coordination Layer */}
        <div className="p-5 rounded-xl bg-[#09152e] border border-cyan-500/40 shadow-cyan-glow space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>The AI Coordination Layer</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-200">
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span>
                <strong className="text-white">Faster Information Flow:</strong> Instant extraction from voice waveforms and photos.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span>
                <strong className="text-white">Better Resource Coordination:</strong> Automated recommendation of ALS vs BLS units.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span>
                <strong className="text-white">Shared Tactical Picture:</strong> Real-time updates shared across all responding agency dashboards.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span>
                <strong className="text-white">Connected Ecosystem:</strong> ER doctors receive incoming patient vitals before the ambulance arrives.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Target User Personas Grid */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
          Target User Personas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {personas.map((p, idx) => {
            const PersonaIcon = p.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#081022] border border-[#142342] hover:border-cyan-500/30 transition-all flex items-start space-x-3"
              >
                <div className="w-7 h-7 rounded-md bg-[#0e1d3b] text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <PersonaIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-white">{p.title}</h3>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
