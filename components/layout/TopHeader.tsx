"use client";

import { useState, useEffect } from "react";
import { Bell, Flame, Zap } from "lucide-react";
import { soundFX } from "@/lib/sound";

interface TopHeaderProps {
  onRunDemoIncident?: () => void;
  pendingAlertsCount?: number;
}

export function TopHeader({ onRunDemoIncident, pendingAlertsCount = 1 }: TopHeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRunDemo = () => {
    soundFX.dispatchChime();
    if (onRunDemoIncident) {
      onRunDemoIncident();
    }
  };

  return (
    <header className="h-16 bg-[#070d1e] border-b border-[#15223e] px-6 flex items-center justify-between shrink-0 select-none">
      {/* Left Title & Tagline */}
      <div>
        <div className="flex items-center space-x-2.5">
          <h1 className="text-sm font-bold tracking-wider text-white uppercase">
            AI Emergency Command Center
          </h1>
          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-blue-600/30 text-blue-300 border border-blue-500/40">
            DEMO v3.1
          </span>
        </div>
        <p className="text-[11px] text-slate-400 italic">
          &ldquo;Seconds Matter. Information Should Move Faster.&rdquo;
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* System Status Pill */}
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-semibold tracking-wider">SYSTEM: OPERATIONAL</span>
        </div>

        {/* Live Clock */}
        <div className="text-xs font-mono text-slate-300 bg-[#0b162c] px-3 py-1 rounded border border-[#16294c]">
          {currentTime || "6:53:51 PM"}
        </div>

        {/* Primary Demo Button */}
        <button
          onClick={handleRunDemo}
          className="flex items-center space-x-2 px-4 py-1.5 rounded bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-bold tracking-wide shadow-red-glow transition-all active:scale-95"
        >
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span className="uppercase">Run Demo Incident</span>
        </button>

        {/* Notification Bell */}
        <div className="relative p-2 rounded-lg bg-[#0c162c] border border-[#162646] hover:border-slate-500 cursor-pointer text-slate-300">
          <Bell className="w-4 h-4" />
          {pendingAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {pendingAlertsCount}
            </span>
          )}
        </div>

        {/* User profile */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-[#1a2c50]">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center border border-blue-400">
            OP1
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-slate-200">Cmdr. Vance</div>
            <div className="text-[10px] text-slate-400">Lead Dispatcher</div>
          </div>
        </div>
      </div>
    </header>
  );
}
