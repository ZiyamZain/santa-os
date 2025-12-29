"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import RightPanel from "@/components/RightPanel";
import GlobalJoyMap from "@/components/GlobalJoyMap";
import LettersModule from "@/components/LettersModule";
import ElfOperationsModule from "@/components/ElfOperationsModule";
import AIEthicsModule from "@/components/AIEthicsModule";
import GiftIntelligenceModule from "@/components/GiftIntelligenceModule";
import AudioController from "@/components/AudioController";
import {
  worldJoyData,
  CountryJoyData,
  worldLetters,
  LetterData,
  initialElves,
  ElfData,
  Task,
} from "@/data/mock-data";

export default function SantaDashboard() {
  const [activeModule, setActiveModule] = useState("map");
  const [selectedCountry, setSelectedCountry] = useState<
    CountryJoyData | undefined
  >(worldJoyData[0]);
  const [selectedLetter, setSelectedLetter] = useState<LetterData | undefined>(
    worldLetters[0]
  );

  const [elves, setElves] = useState<ElfData[]>(initialElves);
  const [selectedElfId, setSelectedElfId] = useState<string | undefined>(
    initialElves[0].id
  );

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAssignTask = (elfId: string, task: Task) => {
    setElves((prevElves) =>
      prevElves.map((elf) => {
        if (elf.id === elfId) {
          const energyCost = task === "Idle" ? 0 : 15;
          const newEnergy = Math.max(0, elf.energy - energyCost);

          let newMood = elf.mood;
          if (newEnergy < 20) newMood = "Grumpy";
          else if (newEnergy < 50) newMood = "Tired";

          return {
            ...elf,
            task,
            energy: newEnergy,
            mood: newMood as any,
          };
        }
        return elf;
      })
    );
  };

  const selectedElf = elves.find((e) => e.id === selectedElfId);

  return (
    <main className="h-screen w-full flex bg-[#030304] text-white overflow-hidden font-sans selection:bg-[#d42426]/30">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />

      <section className="flex-1 flex flex-col min-w-0 bg-[#070708] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d42426]/5 rounded-full blur-[120px] pointer-events-none" />

        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 relative z-10 backdrop-blur-sm bg-black/10">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="text-white/40 font-light">SYSTEM</span>
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                OPERATIONS
              </span>
            </h1>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#d42426]" />
              <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-medium">
                Node: North-Pole-Alpha-1
              </p>
            </div>
          </div>

          <div className="flex items-center gap-12">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                Orbital Period
              </span>
              <span className="text-xl font-mono text-[#ffcc33] tracking-tighter">
                {currentTime.toLocaleTimeString([], {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                Countdown
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black tracking-tighter text-white">
                  12
                </span>
                <span className="text-[10px] font-bold text-[#d42426] uppercase">
                  Days
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-hidden relative z-10">
          <div className="h-full flex flex-col gap-8">
            <header className="flex justify-between items-end">
              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tighter text-white uppercase flex items-center gap-4">
                  {getModuleTitle(activeModule)}
                  <span
                    className={`text-xs font-mono border px-2 py-0.5 rounded uppercase tracking-widest ${
                      activeModule === "archive"
                        ? "text-white/20 border-white/10"
                        : "text-[#d42426] border-[#d42426]/30 animate-pulse"
                    }`}
                  >
                    {activeModule === "archive" ? "Locked" : "Live"}
                  </span>
                </h2>
                <div
                  className={`h-1 w-24 shadow-[0_0_15px_rgba(212,36,38,0.5)] ${
                    activeModule === "archive" ? "bg-white/10" : "bg-[#d42426]"
                  }`}
                />
              </div>

              <ModuleMetrics activeModule={activeModule} />
            </header>

            <div className="flex-1 min-h-0">
              {activeModule === "map" && (
                <GlobalJoyMap
                  onSelectCountry={setSelectedCountry}
                  selectedId={selectedCountry?.id}
                />
              )}
              {activeModule === "letters" && (
                <LettersModule
                  onSelectLetter={setSelectedLetter}
                  selectedId={selectedLetter?.id}
                />
              )}
              {activeModule === "elves" && (
                <ElfOperationsModule
                  elves={elves}
                  onSelectElf={(elf) => setSelectedElfId(elf.id)}
                  selectedId={selectedElfId}
                />
              )}
              {activeModule === "governance" && <AIEthicsModule />}
              {activeModule === "intelligence" && <GiftIntelligenceModule />}

              {(activeModule === "delivery" || activeModule === "archive") && (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-8 animate-in fade-in duration-1000">
                  <div className="w-32 h-32 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#d42426] animate-spin" />
                    <svg
                      className="w-12 h-12 text-white/20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d={
                          activeModule === "archive"
                            ? "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        }
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-white/80 uppercase tracking-widest">
                      {activeModule === "archive"
                        ? "Archive Encrypted"
                        : "Temporal Calibration"}
                    </h3>
                    <p className="text-sm text-white/30 max-w-sm leading-relaxed">
                      {activeModule === "archive"
                        ? "Historical data for previous Christmas cycles is currently locked for deep-cold storage. Access restores on Dec 26."
                        : "Synchronizing orbital delivery lanes with global timezones. Establishing temporal stability for the Big Night."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <RightPanel
        activeModule={activeModule}
        selectedData={activeModule === "map" ? selectedCountry : undefined}
        selectedLetter={activeModule === "letters" ? selectedLetter : undefined}
        selectedElf={activeModule === "elves" ? selectedElf : undefined}
        onAssignTask={handleAssignTask}
      />

      <AudioController />
    </main>
  );
}

function ModuleMetrics({ activeModule }: { activeModule: string }) {
  if (activeModule === "map")
    return (
      <div className="flex gap-4">
        <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-end">
          <span className="text-[10px] font-bold text-white/30 uppercase">
            Global Joy Avg
          </span>
          <span className="text-sm font-mono text-emerald-500 font-bold">
            78.4%
          </span>
        </div>
      </div>
    );
  if (activeModule === "intelligence")
    return (
      <div className="flex gap-4">
        <div className="px-4 py-2 rounded-lg bg-[#ffcc33]/10 border border-[#ffcc33]/20 flex flex-col items-end">
          <span className="text-[10px] font-bold text-white/30 uppercase">
            Workshop Yield
          </span>
          <span className="text-sm font-mono text-[#ffcc33] font-bold">
            96.8%
          </span>
        </div>
      </div>
    );
  return null;
}

function getModuleTitle(id: string) {
  const titles: Record<string, string> = {
    map: "Global Joy Map",
    letters: "Transmission Inbox",
    intelligence: "Gift Intelligence",
    elves: "Personnel Ops",
    delivery: "Time & Delivery",
    archive: "Forgotten Wishes",
    governance: "AI Governance",
  };
  return titles[id] || "System Module";
}
