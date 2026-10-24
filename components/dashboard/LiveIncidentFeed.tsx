"use client";

import { useState } from "react";
import { Search, ChevronDown, MapPin, ChevronRight } from "lucide-react";
import { Incident } from "@/lib/initial-data";
import { formatTimeAgo } from "@/lib/utils";
import { soundFX } from "@/lib/sound";

interface LiveIncidentFeedProps {
  incidents: Incident[];
  onSelectIncident: (inc: Incident) => void;
}

export function LiveIncidentFeed({ incidents, onSelectIncident }: LiveIncidentFeedProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");

  const filteredIncidents = incidents.filter((inc) => {
    const matchesSearch =
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      priorityFilter === "ALL" || inc.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="bg-[#091224] border border-[#16274b] rounded-lg flex flex-col h-full shadow-tactical overflow-hidden">
      {/* Header & Controls */}
      <div className="p-4 border-b border-[#16274b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0a1428]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xs font-bold tracking-wider uppercase text-white">
            Live Incident Feed
          </h2>
          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
            {incidents.length}
          </span>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search incident, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 bg-[#060c1a] border border-[#182a4d] rounded text-[11px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none bg-[#060c1a] border border-[#182a4d] text-slate-300 text-[11px] py-1 pl-2.5 pr-6 rounded focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="ALL">All Priorities</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Incident List */}
      <div className="p-3 space-y-3 overflow-y-auto max-h-[560px]">
        {filteredIncidents.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No active incidents match your filter.
          </div>
        ) : (
          filteredIncidents.map((inc) => {
            const isHigh = inc.priority === "HIGH";
            const isMed = inc.priority === "MEDIUM";

            const priorityBadgeClass = isHigh
              ? "bg-rose-500 text-white font-bold"
              : isMed
              ? "bg-amber-500 text-black font-bold"
              : "bg-emerald-500 text-white font-bold";

            return (
              <div
                key={inc.id}
                onClick={() => {
                  soundFX.blip(800, 0.03);
                  onSelectIncident(inc);
                }}
                className="p-3.5 rounded-lg bg-[#0c162c] border border-[#16274b] hover:border-cyan-500/50 hover:bg-[#101d3a] transition-all cursor-pointer group"
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className={`px-1.5 py-0.5 text-[9px] rounded uppercase ${priorityBadgeClass}`}>
                      {inc.priority}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-300">
                      {inc.code}
                    </span>
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {inc.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {formatTimeAgo(inc.reportedAt)}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-1.5 text-[11px] text-cyan-400 font-medium mb-1.5">
                  <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>{inc.location}</span>
                </div>

                {/* Description */}
                <p className="text-[11px] text-slate-300 leading-relaxed mb-2.5 line-clamp-2">
                  {inc.description}
                </p>

                {/* Units & Status */}
                <div className="flex items-center justify-between pt-2 border-t border-[#162646]">
                  <div className="flex items-center space-x-1 text-[10px] text-slate-400">
                    <span>Units:</span>
                    <div className="flex space-x-1">
                      {inc.assignedUnits.map((u, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.2 rounded bg-[#132344] text-cyan-300 font-mono text-[9px] border border-[#1e345e]"
                        >
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-[11px] font-bold text-cyan-400 group-hover:text-cyan-300">
                    <span>Status: {inc.status}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
