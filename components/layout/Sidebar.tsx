"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  Radio,
  Navigation,
  Shield,
  Building2,
  Truck,
  BarChart3,
  Cpu,
} from "lucide-react";
import { soundFX } from "@/lib/sound";

interface SidebarProps {
  incidentsCount?: number;
  unitsCount?: number;
}

export function Sidebar({ incidentsCount = 6, unitsCount = 13 }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Tactical Dashboard",
      icon: Activity,
      badge: null,
      highlight: false,
    },
    {
      href: "/report",
      label: "Report Emergency",
      icon: AlertTriangle,
      badge: null,
      highlight: true, // Red accent in screenshots
    },
    {
      href: "/incidents",
      label: "Active Incidents",
      icon: AlertTriangle,
      badge: incidentsCount,
      highlight: false,
    },
    {
      href: "/map",
      label: "Shared Tactical Map",
      icon: Navigation,
      badge: null,
      highlight: false,
    },
    {
      href: "/units",
      label: "Responder Units",
      icon: Shield,
      badge: unitsCount,
      highlight: false,
    },
    {
      href: "/hospitals",
      label: "Hospital Alerts",
      icon: Building2,
      badge: null,
      highlight: false,
    },
    {
      href: "/fleet",
      label: "Fleet Resources",
      icon: Truck,
      badge: null,
      highlight: false,
    },
    {
      href: "/analytics",
      label: "Demo Analytics",
      icon: BarChart3,
      badge: null,
      highlight: false,
    },
    {
      href: "/architecture",
      label: "System Architecture",
      icon: Cpu,
      badge: null,
      highlight: false,
    },
  ];

  return (
    <aside className="w-64 bg-[#060c1c] border-r border-[#15223e] flex flex-col justify-between shrink-0 min-h-screen text-slate-300 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-[#15223e] flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-cyan-glow">
            <Radio className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-wider text-white uppercase flex items-center gap-1.5">
              <span>Command Center</span>
            </div>
            <div className="text-[10px] tracking-wider text-cyan-400 font-mono font-medium">
              LLAMA 3.1 NEURAL CORE
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => soundFX.blip(600, 0.04)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-medium transition-all group ${
                  isActive
                    ? "bg-[#0f1d38] text-white border-l-2 border-cyan-400 shadow-sm"
                    : item.highlight
                    ? "text-rose-400 hover:bg-[#131d33] hover:text-rose-300"
                    : "text-slate-400 hover:bg-[#0c162c] hover:text-slate-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? "text-cyan-400"
                        : item.highlight
                        ? "text-rose-400 group-hover:text-rose-300"
                        : "text-slate-400 group-hover:text-cyan-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== null && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-full ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "bg-[#142342] text-slate-400 border border-[#1e345e]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Prototype Warning Note */}
      <div className="p-3 m-3 rounded-lg bg-[#0a1224] border border-[#162646] text-slate-400 text-[11px] leading-relaxed">
        <div className="flex items-center space-x-1.5 text-cyan-400 font-semibold mb-1 text-[10px] uppercase tracking-wider">
          <Radio className="w-3.5 h-3.5" />
          <span>AI Demo Prototype</span>
        </div>
        <p className="text-[10px] text-slate-400">
          Simulated environment for LLM challenge. Not connected to real 911 dispatch.
        </p>
      </div>
    </aside>
  );
}
