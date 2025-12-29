"use client";

import React from "react";

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
};

const modules: Module[] = [
  { id: "map", label: "Global Joy Map", icon: "map" },
  { id: "letters", label: "Letters", icon: "mail" },
  { id: "intelligence", label: "Gift Intelligence", icon: "gift" },
  { id: "elves", label: "Elf Operations", icon: "users" },
  { id: "delivery", label: "Time & Delivery", icon: "clock" },
  { id: "archive", label: "Forgotten Wishes", icon: "archive" },
  { id: "governance", label: "AI Governance", icon: "shield" },
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
      <div className="p-6 border-b border-white/5">
        <h2 className="text-xl font-bold tracking-tighter text-[#ffcc33]">
          SANTA<span className="text-[#d42426]">OS</span>
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
            <span className="text-sm font-medium tracking-wide">{m.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">
            System Online
          </span>
        </div>
      </div>
    </aside>
  );
}
