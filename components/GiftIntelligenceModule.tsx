"use client";

import React from "react";

export default function GiftIntelligenceModule() {
  const inventory = [
    {
      name: "Wooden Train Sets",
      stock: 45000,
      target: 50000,
      status: "On Track",
    },
    { name: "Neural Robots", stock: 12000, target: 15000, status: "Delayed" },
    {
      name: "Starry Telescopes",
      stock: 28000,
      target: 30000,
      status: "On Track",
    },
    {
      name: "Magic Paintbrushes",
      stock: 8500,
      target: 8500,
      status: "Completed",
    },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          label="Total Stock"
          value="1.2M Units"
          color="text-[#ffcc33]"
        />
        <StatCard
          label="Global Demand"
          value="+14% YoY"
          color="text-emerald-400"
        />
        <StatCard
          label="Sleigh Weight"
          value="412 Tons"
          color="text-[#d42426]"
        />
      </div>

      <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-3xl p-4 lg:p-8 overflow-hidden flex flex-col">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-6">
          Production Inventory
        </h3>
        <div className="space-y-6 overflow-y-auto pr-2 scrollbar-thin">
          {inventory.map((item) => (
            <div
              key={item.name}
              className="p-6 rounded-2xl bg-black/20 border border-white/5 group hover:border-[#ffcc33]/20 transition-all"
            >
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-white/20 uppercase font-black tracking-widest mt-1">
                    Stock ID: TOY-{Math.floor(Math.random() * 9000)}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                      item.status === "Completed"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                        : item.status === "Delayed"
                        ? "bg-[#d42426]/10 border-[#d42426]/20 text-[#d42426]"
                        : "bg-[#ffcc33]/10 border-[#ffcc33]/20 text-[#ffcc33]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>
                    {item.stock.toLocaleString()} /{" "}
                    {item.target.toLocaleString()} Units
                  </span>
                  <span>{Math.round((item.stock / item.target) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      item.status === "Completed"
                        ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        : item.status === "Delayed"
                        ? "bg-[#d42426]"
                        : "bg-[#ffcc33]"
                    }`}
                    style={{ width: `${(item.stock / item.target) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#ffcc33]/5 border border-[#ffcc33]/20 rounded-xl p-4 flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-[#ffcc33] animate-ping" />
        <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-relaxed">
          INTELLIGENCE LINK SECURE • MONITORING FACTORY THROUGHPUT IN SECTORS
          7-12
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-black/20 space-y-2">
      <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">
        {label}
      </span>
      <div className={`text-2xl font-black tracking-tighter ${color}`}>
        {value}
      </div>
    </div>
  );
}
