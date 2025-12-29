"use client";

import React from "react";
import { motion } from "framer-motion";
import AudioController from "./AudioController";

const icons = {
  map: <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6zm6-3v15m6-15v15" />,
  mail: (
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" />
  ),
  gift: (
    <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  ),
  users: (
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  archive: <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
};

type Module = {
  id: string;
  label: string;
  icon: keyof typeof icons;
  badge?: string;
};

const modules: Module[] = [
  { id: "map", label: "Global Joy Map", icon: "map" },
  { id: "letters", label: "Letters", icon: "mail", badge: "AI" },
  { id: "intelligence", label: "Gift Intelligence", icon: "gift" },
  { id: "elves", label: "Elf Operations", icon: "users" },
  { id: "delivery", label: "Time & Delivery", icon: "clock" },
  { id: "archive", label: "Forgotten Wishes", icon: "archive" },
];

export default function Sidebar({
  activeModule,
  onModuleChange,
}: {
  activeModule: string;
  onModuleChange: (id: string) => void;
}) {
  return (
    <aside className="w-64 bg-black/40 border-r border-[#d42426]/20 flex flex-col h-full backdrop-blur-xl">
      <div className="p-6 border-b border-white/5 relative group/logo">
        <h2 className="text-xl font-bold tracking-tighter text-[#ffcc33] flex items-center">
          <span className="relative">
            S
            <motion.div
              initial={{ rotate: -15, y: 0 }}
              animate={{ rotate: [-15, -10, -15], y: [0, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -left-[6px] w-6 h-6 pointer-events-none z-10"
            >
              <svg
                viewBox="0 0 40 40"
                className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              >
                {/* Red Cap Body */}
                <path
                  d="M10,25 C10,25 12,12 25,8 C28,12 32,15 30,22"
                  stroke="#d42426"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M10,25 C10,25 12,12 25,8 C28,12 32,15 30,22"
                  fill="#d42426"
                />

                {/* White Fur Trim Base */}
                <path
                  d="M8,26 C8,24 32,21 32,23 C32,25 30,28 28,28 C26,28 25,26 23,26 C21,26 20,28 18,28 C16,28 15,26 13,26 C11,26 10,28 8,28 C6,28 8,26 8,26 Z"
                  fill="white"
                />

                {/* White Pom-pom */}
                <circle cx="28" cy="9" r="4" fill="white" />
                <circle cx="28" cy="9" r="3" fill="url(#pom-gradient)" />

                <defs>
                  <radialGradient id="pom-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="#f0f0f0" />
                  </radialGradient>
                </defs>
              </svg>
            </motion.div>
          </span>
          ANTA<span className="text-[#d42426]">OS</span>
        </h2>
        <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-medium">
          Control Command
        </p>
      </div>

      <nav className="flex-1 py-4">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => onModuleChange(m.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 group ${
              activeModule === m.id
                ? "bg-[#d42426]/10 text-white border-r-2 border-[#d42426]"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                activeModule === m.id ? "text-[#d42426]" : ""
              }`}
            >
              {icons[m.icon]}
            </svg>
            <div className="flex-1 flex items-center justify-between pr-2">
              <span className="text-sm font-medium tracking-wide">
                {m.label}
              </span>
              {m.badge && (
                <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-[#d42426]/20 text-[#d42426] border border-[#d42426]/30 animate-pulse">
                  {m.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </nav>

      <div className="p-2 border-t border-white/5 bg-black/20">
        <AudioController />
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">
            System Online
          </span>
        </div>
      </div>
    </aside>
  );
}
