"use client";

import React from "react";
import { ElfData, Task } from "@/data/mock-data";

const moodMetadata: Record<ElfData["mood"], { emoji: string; color: string }> =
  {
    Happy: { emoji: "😊", color: "text-emerald-400" },
    Tired: { emoji: "😴", color: "text-yellow-400" },
    Grumpy: { emoji: "😠", color: "text-red-400" },
    Energetic: { emoji: "⚡", color: "text-cyan-400" },
  };

export default function ElfOperationsModule({
  elves,
  onSelectElf,
  selectedId,
}: {
  elves: ElfData[];
  onSelectElf: (elf: ElfData) => void;
  selectedId?: string;
}) {
  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
          Workshop Personnel
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-white/60">
              Active: {elves.filter((e) => e.task !== "Idle").length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-[10px] font-bold text-white/60">
              Low Energy: {elves.filter((e) => e.energy < 30).length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1 overflow-y-auto pr-2 scrollbar-thin">
        {elves.map((elf) => (
          <button
            key={elf.id}
            onClick={() => onSelectElf(elf)}
            className={`flex flex-col p-6 rounded-3xl border transition-all duration-300 group text-left ${
              selectedId === elf.id
                ? "bg-white/[0.05] border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                : "bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
            }`}
          >
            <div className="flex justify-between items-start mb-6 w-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                  {moodMetadata[elf.mood].emoji}
                </div>
                <div>
                  <h4 className="text-lg font-black tracking-tight text-white">
                    {elf.name}
                  </h4>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                    Technician Level {Math.floor(elf.efficiency / 10)}
                  </p>
                </div>
              </div>
              {elf.energy < 20 && (
                <div className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-[8px] font-black text-red-500 uppercase tracking-widest animate-pulse">
                  CRITICAL ENERGY
                </div>
              )}
            </div>

            <div className="space-y-4 w-full">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-white/40">Energy Reserve</span>
                  <span
                    className={
                      elf.energy < 30 ? "text-red-400" : "text-white/80"
                    }
                  >
                    {elf.energy}%
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      elf.energy < 30
                        ? "bg-red-500"
                        : elf.energy < 60
                        ? "bg-yellow-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${elf.energy}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                    Assignment
                  </span>
                  <span
                    className={`text-[11px] font-black uppercase ${
                      elf.task === "Idle" ? "text-white/40" : "text-[#ffcc33]"
                    }`}
                  >
                    {elf.task}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                    Efficiency
                  </span>
                  <span className="text-[11px] font-mono text-white/80">
                    {elf.efficiency}%
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-[#d42426]/5 border border-[#d42426]/20 rounded-xl p-4 flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
          WORKSHOP TELEMETRY ACTIVE • MONITORING ELF VITALITY & OUTPUT
        </p>
      </div>
    </div>
  );
}
