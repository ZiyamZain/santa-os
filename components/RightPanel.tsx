"use client";

import React from "react";
import {
  CountryJoyData,
  LetterData,
  Emotion,
  ElfData,
  Task,
} from "@/data/mock-data";

const emotionMetadata: Record<
  Emotion,
  { emoji: string; color: string; bg: string; border: string }
> = {
  Lonely: {
    emoji: "😔",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  Excited: {
    emoji: "🤩",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  Hopeful: {
    emoji: "✨",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  Anxious: {
    emoji: "😟",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
};

export default function RightPanel({
  activeModule,
  selectedData,
  selectedLetter,
  selectedElf,
  onAssignTask,
}: {
  activeModule: string;
  selectedData?: CountryJoyData;
  selectedLetter?: LetterData;
  selectedElf?: ElfData;
  onAssignTask?: (elfId: string, task: Task) => void;
}) {
  return (
    <aside className="w-80 bg-black/40 border-l border-[#d42426]/20 flex flex-col h-full backdrop-blur-xl">
      <div className="p-6 border-b border-white/5">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#ffcc33]/80">
          Contextual Data
        </h3>
        <p className="text-[10px] text-white/30 truncate mt-1">
          Module: {activeModule.toUpperCase()}
        </p>
      </div>

      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
        {activeModule === "map" && selectedData && (
          <RegionalDetails data={selectedData} />
        )}

        {activeModule === "letters" && selectedLetter && (
          <LetterDetails letter={selectedLetter} />
        )}

        {activeModule === "elves" && selectedElf && (
          <ElfDetails elf={selectedElf} onAssignTask={onAssignTask} />
        )}

        {!(
          (activeModule === "map" && selectedData) ||
          (activeModule === "letters" && selectedLetter) ||
          (activeModule === "elves" && selectedElf)
        ) && <EmptyState moduleName={activeModule} />}
      </div>

      <div className="p-6 bg-black/40 border-t border-white/5">
        <button className="w-full py-3 bg-[#d42426]/20 border border-[#d42426]/50 rounded-lg text-[10px] font-black uppercase text-white tracking-[0.2em] hover:bg-[#d42426]/30 transition-all">
          Emergency Protocol
        </button>
      </div>
    </aside>
  );
}

function RegionalDetails({ data }: { data: CountryJoyData }) {
  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl border flex items-center justify-center font-black ${getPriorityColor(
              data.priority
            )}`}
          >
            {data.id}
          </div>
          <div>
            <h4 className="text-xl font-black tracking-tighter text-white">
              {data.name}
            </h4>
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${getPriorityBg(
                  data.priority
                )} animate-pulse`}
              />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                {data.priority} PRIORITY
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">
              Joy Index
            </span>
            <span className="text-2xl font-mono font-bold text-white">
              {data.joyIndex}%
            </span>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">
              Growth
            </span>
            <span className="text-lg font-mono font-bold text-emerald-400">
              +2.4%
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
          Neural Emotion Analysis
        </h4>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#d42426]/10 to-transparent border border-[#d42426]/20 relative overflow-hidden group">
          <div className="text-[10px] text-[#ffcc33] font-bold uppercase mb-1">
            Dominant Emotion
          </div>
          <div className="text-3xl font-black text-white tracking-tighter">
            {data.emotion}
          </div>
          <p className="text-xs text-white/40 mt-2 leading-relaxed italic">
            &quot;Sentiment patterns indicate widespread festive
            anticipation.&quot;
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
          Regional Metrics
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="Pending Letters"
            value={data.letters.toLocaleString()}
          />
          <MetricCard label="Delivery Lanes" value="74 Active" />
        </div>
      </section>
    </>
  );
}

function LetterDetails({ letter }: { letter: LetterData }) {
  const meta = emotionMetadata[letter.emotion];
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#d42426]/10 border border-[#d42426]/20 flex items-center justify-center font-black text-3xl text-[#d42426]">
            {letter.childName[0]}
          </div>
          <div>
            <h4 className="text-2xl font-black tracking-tighter text-white">
              {letter.childName}
            </h4>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
              Age: {letter.age} • {letter.region}
            </p>
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl border ${meta.bg} ${meta.border} flex items-center gap-3`}
        >
          <span className="text-2xl">{meta.emoji}</span>
          <div>
            <div
              className={`text-[10px] font-black uppercase tracking-widest ${meta.color}`}
            >
              Detected State: {letter.emotion}
            </div>
            <div className="text-[10px] text-white/40 uppercase font-bold">
              Confidence: {letter.confidence}%
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
          Message Content
        </h4>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 relative">
          <p className="text-sm text-white/80 leading-relaxed italic z-10 relative">
            &quot;{letter.text}&quot;
          </p>
        </div>
      </section>

      <section className="pt-4 space-y-3">
        <button className="w-full py-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-500 font-bold text-xs uppercase tracking-[0.2em] transition-all">
          MARK AS REVIEWED
        </button>
      </section>
    </div>
  );
}

function ElfDetails({
  elf,
  onAssignTask,
}: {
  elf: ElfData;
  onAssignTask?: (elfId: string, task: Task) => void;
}) {
  const tasks: Task[] = [
    "Idle",
    "Build Toys",
    "Repair Toys",
    "Gift Wrapping",
    "Sleigh Maintenance",
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
            {elf.mood === "Happy"
              ? "😊"
              : elf.mood === "Energetic"
              ? "⚡"
              : elf.mood === "Tired"
              ? "😴"
              : "😠"}
          </div>
          <div>
            <h4 className="text-2xl font-black tracking-tighter text-white">
              {elf.name}
            </h4>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
              Status: {elf.mood.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">
              Energy Levels
            </span>
            <span
              className={`font-mono text-sm ${
                elf.energy < 30 ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {elf.energy}%
            </span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                elf.energy < 30 ? "bg-red-500" : "bg-emerald-500"
              }`}
              style={{ width: `${elf.energy}%` }}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
          Deployment Assignment
        </h4>
        <div className="grid gap-2">
          {tasks.map((task) => (
            <button
              key={task}
              onClick={() => onAssignTask?.(elf.id, task)}
              disabled={elf.energy < 15 && task !== "Idle"}
              className={`w-full py-3 px-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                elf.task === task
                  ? "bg-[#ffcc33]/10 border-[#ffcc33]/40 text-[#ffcc33]"
                  : "bg-white/5 border-white/5 text-white/60 hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed"
              }`}
            >
              <span className="text-[11px] font-black uppercase tracking-widest">
                {task}
              </span>
              {elf.task === task && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#ffcc33] animate-pulse" />
              )}
            </button>
          ))}
        </div>
        {elf.energy < 15 && (
          <p className="text-[10px] text-red-400 font-bold uppercase italic mt-2">
            Warning: Energy levels insufficient for heavy labor. Rest
            recommended.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
          Efficiency Protocol
        </h4>
        <div className="p-4 rounded-xl border border-white/5 bg-black/20 flex justify-between items-center">
          <span className="text-[10px] text-white/30 uppercase font-bold">
            Projected Yield
          </span>
          <span className="text-lg font-mono text-white/80">
            {elf.efficiency}%
          </span>
        </div>
      </section>
    </div>
  );
}

function EmptyState({ moduleName }: { moduleName: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-4 opacity-30">
      <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <p className="text-[10px] uppercase font-bold tracking-widest leading-relaxed">
        Select an entry from the <br />
        {moduleName} module to begin analysis
      </p>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl border border-white/5 bg-black/20 space-y-1">
      <span className="text-[10px] text-white/30 uppercase font-bold">
        {label}
      </span>
      <div className="text-sm font-bold text-white/80">{value}</div>
    </div>
  );
}

function getPriorityColor(p: string) {
  if (p === "CRITICAL") return "border-[#d42426] text-[#d42426]";
  if (p === "ELEVATED") return "border-[#ffcc33] text-[#ffcc33]";
  return "border-emerald-500 text-emerald-500";
}

function getPriorityBg(p: string) {
  if (p === "CRITICAL") return "bg-[#d42426]";
  if (p === "ELEVATED") return "bg-[#ffcc33]";
  return "bg-emerald-500";
}
