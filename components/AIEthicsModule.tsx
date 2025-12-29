"use client";

import React from "react";

export default function AIEthicsModule() {
  return (
    <div className="flex flex-col h-full gap-8 max-w-4xl mx-auto">
      <header className="space-y-2">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#ffcc33]/80">
          System Integrity
        </h3>
        <h4 className="text-3xl font-black tracking-tighter text-white">
          AI ETHICS & GOVERNANCE
        </h4>
        <p className="text-sm text-white/40 max-w-2xl leading-relaxed">
          The SantaOS Augmented Intelligence engine is designed to honor the
          spirit of Christmas through transparent, ethical, and human-centric
          processing.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EthicsCard
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          }
          title="Assistance, Not Autonomy"
          description="AI does NOT make decisions. It highlights patterns and emotional resonance, but the final gift authorization always rests with Santa."
        />
        <EthicsCard
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          }
          title="Emotional Integrity"
          description="Neural processing is used to detect subtle emotional signals like loneliness or hope, ensuring no child's deep emotional needs are overlooked."
        />
        <EthicsCard
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
          title="Santa-in-the-Loop"
          description="The system architecture enforces a human-approval step for every critical operation, from toy assembly priorities to delivery routes."
        />
      </div>

      <div className="mt-4 p-8 rounded-3xl border border-white/5 bg-white/[0.02] space-y-6">
        <h5 className="text-[10px] font-black uppercase text-white/20 tracking-widest">
          Core Governance Principles
        </h5>
        <div className="space-y-4">
          <PrincipleItem
            title="Privacy First"
            description="Letter data is processed locally within the North Pole Node. No personal identifiers leave our secure festive environment."
          />
          <PrincipleItem
            title="Zero Bias"
            description="Our neural models are trained on centuries of global festive traditions, ensuring fair toy distribution regardless of region or background."
          />
          <PrincipleItem
            title="Explainable Recommendations"
            description="Every AI-assisted insight comes with a 'Reasoning Decrypt' so Santa understands exactly why a specific emotional state was detected."
          />
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
          SYSTEM COMPLIANCE: ALL AI OPERATIONS OVERSIGHT ENABLED • ETHICAL OATH
          VERIFIED
        </p>
      </div>
    </div>
  );
}

function EthicsCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-black/20 space-y-4 hover:border-white/10 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ffcc33]">
        {icon}
      </div>
      <h5 className="text-lg font-bold text-white tracking-tight">{title}</h5>
      <p className="text-xs text-white/40 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}

function PrincipleItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
      <div className="text-[10px] font-black text-[#d42426] uppercase tracking-widest">
        {title}
      </div>
      <div className="md:col-span-3 text-xs text-white/50 leading-relaxed">
        {description}
      </div>
    </div>
  );
}
