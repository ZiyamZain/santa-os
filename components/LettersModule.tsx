"use client";

import React from "react";
import { worldLetters, LetterData, Emotion } from "@/data/mock-data";

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

export default function LettersModule({
  onSelectLetter,
  selectedId,
}: {
  onSelectLetter: (letter: LetterData) => void;
  selectedId?: string;
}) {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest">
            {worldLetters.filter((l) => !l.reviewed).length} PENDING
            TRANSMISSIONS
          </div>
          <div className="text-[10px] font-bold text-[#d42426] animate-pulse">
            ● LIVE_FEED
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin">
        {worldLetters.map((letter) => {
          const meta = emotionMetadata[letter.emotion];
          return (
            <button
              key={letter.id}
              onClick={() => onSelectLetter(letter)}
              className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 group ${
                selectedId === letter.id
                  ? "bg-white/[0.05] border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  : "bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-sm text-white/60">
                    {letter.childName[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white tracking-tight">
                      {letter.childName}, {letter.age}
                    </h4>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">
                      {letter.region}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-mono text-white/20">
                    {letter.timestamp}
                  </span>
                  {letter.reviewed && (
                    <span className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1">
                      ✓ Reviewed
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-white/70 line-clamp-2 leading-relaxed mb-6 italic">
                &quot;{letter.text}&quot;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border ${meta.bg} ${meta.border}`}
                  >
                    <span className="text-sm">{meta.emoji}</span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${meta.color}`}
                    >
                      {letter.emotion}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">
                        Confidence
                      </span>
                      <span className="text-[10px] font-mono text-white/60">
                        {letter.confidence}%
                      </span>
                    </div>
                    <div className="w-24 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-white/20"
                        style={{ width: `${letter.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-white/60 group-hover:translate-x-1 transition-all flex items-center gap-1">
                  Analyze{" "}
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="h-[2px] bg-[#d42426]/20 rounded-full flex-1 overflow-hidden">
                  <div
                    className="h-full bg-[#d42426] animate-progress"
                    style={{ width: "0%" }}
                  />
                </div>
                <span className="text-[8px] font-bold text-[#d42426]/40 uppercase tracking-widest">
                  Neural Link Active
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-[#d42426]/5 border border-[#d42426]/20 rounded-xl p-4 flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-[#d42426] animate-ping" />
        <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
          AI-ASSISTED INSIGHT ENGINE OPERATIONAL • SCANNING EMOTIONAL
          FREQUENCIES
        </p>
      </div>
    </div>
  );
}
