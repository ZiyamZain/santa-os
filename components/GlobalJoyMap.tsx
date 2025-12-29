"use client";

import React from "react";
import { worldJoyData, CountryJoyData } from "@/data/mock-data";

export default function GlobalJoyMap({
  onSelectCountry,
  selectedId,
}: {
  onSelectCountry: (country: CountryJoyData) => void;
  selectedId?: string;
}) {
  return (
    <div className="relative w-full h-full bg-black/20 rounded-3xl border border-white/5 overflow-hidden group">
      {/* Tactical Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px",
        }}
      />

      {/* Stylized Map Underlay (Simplified SVG path representing continents) */}
      <svg
        viewBox="0 0 1000 500"
        className="absolute inset-0 w-full h-full opacity-10 blur-[1px] pointer-events-none transition-opacity duration-1000 group-hover:opacity-20"
      >
        <path
          d="M150,150 Q200,100 300,120 T450,150 T300,300 T150,250 Z M500,100 Q600,80 750,120 T850,250 T700,400 T500,300 Z M250,350 Q300,400 350,450 T400,350 T250,350 Z"
          fill="currentColor"
          className="text-white"
        />
      </svg>

      {/* Interactive Region Nodes */}
      <div className="absolute inset-0 p-10">
        {worldJoyData.map((region) => (
          <button
            key={region.id}
            onClick={() => onSelectCountry(region)}
            style={{
              left: `${region.coordinates.x}%`,
              top: `${region.coordinates.y}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group/node"
          >
            {/* Pulsing Aura */}
            <div
              className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 scale-150 opacity-20 ${getJoyColor(
                region.level
              )}`}
            />

            {/* Node Circle */}
            <div
              className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                selectedId === region.id
                  ? "scale-150 border-white bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                  : `${getJoyBorder(region.level)} bg-black hover:scale-125`
              }`}
            >
              {/* Inner core */}
              <div
                className={`absolute inset-0.5 rounded-full ${getJoyBg(
                  region.level
                )} ${selectedId === region.id ? "opacity-0" : "opacity-100"}`}
              />
            </div>

            {/* Label */}
            <div
              className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                selectedId === region.id
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 group-hover/node:opacity-100 group-hover/node:translate-y-0"
              }`}
            >
              <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest uppercase">
                  {region.name}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${getJoyBg(
                    region.level
                  )}`}
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <LegendItem color="bg-[#d42426]" label="CRITICAL JOY" />
          <LegendItem color="bg-[#ffcc33]" label="STABLE EMOTION" />
          <LegendItem color="bg-emerald-500" label="MAX VELOCITY" />
        </div>
      </div>

      {/* Scanning Line Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d42426]/5 to-transparent h-20 w-full animate-scan pointer-events-none" />
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-[10px] font-bold text-white/40 tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}

function getJoyColor(level: string) {
  if (level === "High") return "bg-emerald-500";
  if (level === "Medium") return "bg-[#ffcc33]";
  return "bg-[#d42426]";
}

function getJoyBorder(level: string) {
  if (level === "High") return "border-emerald-500/50";
  if (level === "Medium") return "border-[#ffcc33]/50";
  return "border-[#d42426]/50";
}

function getJoyBg(level: string) {
  if (level === "High") return "bg-emerald-500";
  if (level === "Medium") return "bg-[#ffcc33]";
  return "bg-[#d42426]";
}
