"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import RightPanel from "@/components/RightPanel";
import GlobalJoyMap from "@/components/GlobalJoyMap";
import LettersModule from "@/components/LettersModule";
import ElfOperationsModule from "@/components/ElfOperationsModule";

import MissionProtocol from "@/components/MissionProtocol";
import GiftIntelligenceModule from "@/components/GiftIntelligenceModule";

import AudioController from "@/components/AudioController";
import CinematicLoader from "@/components/CinematicLoader";
import TransmissionTicker from "@/components/TransmissionTicker";
import { AnimatePresence, motion } from "framer-motion";
import Snowfall from "react-snowfall";
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
  const [isLoading, setIsLoading] = useState(true);

  // Mobile Toggles
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileRightPanelOpen, setMobileRightPanelOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const loaderTimer = setTimeout(() => setIsLoading(false), 3500);
    return () => {
      clearInterval(timer);
      clearTimeout(loaderTimer);
    };
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
    <AnimatePresence mode="wait">
      {isLoading ? (
        <CinematicLoader key="loader" />
      ) : (
        <main
          key="dashboard"
          className="h-[100dvh] w-full flex flex-col lg:flex-row bg-[#030304] text-white overflow-hidden font-sans selection:bg-[#d42426]/30 relative aurora-bg animate-aurora"
        >
          <Snowfall
            color="#fff"
            snowflakeCount={150}
            style={{
              position: "fixed",
              width: "100vw",
              height: "100vh",
              zIndex: 0,
              opacity: 0.4,
            }}
          />

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {mobileSidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 z-50 h-full lg:hidden shadow-2xl"
                >
                  <Sidebar
                    activeModule={activeModule}
                    onModuleChange={(id) => {
                      setActiveModule(id);
                      setMobileSidebarOpen(false);
                    }}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block h-full shrink-0">
            <Sidebar
              activeModule={activeModule}
              onModuleChange={setActiveModule}
            />
          </div>

          <section className="flex-1 flex flex-col min-w-0 bg-[#070708] relative z-10 lg:z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d42426]/5 rounded-full blur-[120px] pointer-events-none" />

            <header className="h-16 lg:h-20 border-b border-white/5 flex items-center justify-between px-4 lg:px-10 relative z-20 backdrop-blur-sm bg-black/10 shrink-0">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="lg:hidden p-2 -ml-2 text-white/60 hover:text-white"
                >
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                <div className="flex flex-col">
                  <h1 className="text-lg lg:text-2xl font-black tracking-tight flex items-center gap-2 lg:gap-3">
                    <span className="text-white/40 font-light hidden sm:inline">
                      SYSTEM
                    </span>
                    <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                      OPERATIONS
                    </span>
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#d42426]" />
                    <p className="text-[8px] lg:text-[10px] text-white/30 uppercase tracking-[0.4em] font-medium">
                      Node: North-Pole-Alpha
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:gap-12">
                <div className="hidden sm:flex flex-col items-end">
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
                <div className="hidden sm:block h-8 w-[1px] bg-white/10" />
                <div className="flex flex-col items-end">
                  <span className="hidden sm:inline text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
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

                {/* Mobile Right Panel Toggle */}
                <button
                  onClick={() => setMobileRightPanelOpen(true)}
                  className="lg:hidden p-2 -mr-2 text-white/60 hover:text-white relative"
                >
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {/* Indicator dot if logic requires attention? */}
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#d42426] animate-pulse" />
                </button>
              </div>
            </header>

            <TransmissionTicker />

            <div className="flex-1 p-4 lg:p-10 overflow-hidden relative z-10 flex flex-col">
              <div className="flex-1 flex flex-col gap-4 lg:gap-8 min-h-0">
                <header className="flex justify-between items-end shrink-0">
                  <div className="space-y-2 lg:space-y-4">
                    <h2 className="text-2xl lg:text-4xl font-black tracking-tighter text-white uppercase flex items-center gap-2 lg:gap-4">
                      <span className="truncate max-w-[200px] sm:max-w-none">
                        {getModuleTitle(activeModule)}
                      </span>
                      <span
                        className={`text-[10px] lg:text-xs font-mono border px-2 py-0.5 rounded uppercase tracking-widest ${
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
                        activeModule === "archive"
                          ? "bg-white/10"
                          : "bg-[#d42426]"
                      }`}
                    />
                  </div>

                  <div className="hidden sm:block">
                    <ModuleMetrics activeModule={activeModule} />
                  </div>
                </header>

                <div className="flex-1 min-h-0 relative">
                  {/* Container for scrollable content */}
                  <div className="absolute inset-0 overflow-y-auto pr-2 custom-scrollbar">
                    {activeModule === "mission" && <MissionProtocol />}
                    {activeModule === "map" && (
                      <GlobalJoyMap
                        onSelectCountry={(c) => {
                          setSelectedCountry(c);
                          if (window.innerWidth < 1024)
                            setMobileRightPanelOpen(true);
                        }}
                        selectedId={selectedCountry?.id}
                      />
                    )}
                    {activeModule === "letters" && (
                      <LettersModule
                        onSelectLetter={(l) => {
                          setSelectedLetter(l);
                          if (window.innerWidth < 1024)
                            setMobileRightPanelOpen(true);
                        }}
                        selectedId={selectedLetter?.id}
                      />
                    )}
                    {activeModule === "elves" && (
                      <ElfOperationsModule
                        elves={elves}
                        onSelectElf={(elf) => {
                          setSelectedElfId(elf.id);
                          if (window.innerWidth < 1024)
                            setMobileRightPanelOpen(true);
                        }}
                        selectedId={selectedElfId}
                      />
                    )}

                    {activeModule === "intelligence" && (
                      <GiftIntelligenceModule />
                    )}

                    {(activeModule === "delivery" ||
                      activeModule === "archive") && (
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
                          <p className="text-sm text-white/30 max-w-sm leading-relaxed px-4">
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
            </div>
          </section>

          {/* Mobile Right Panel Overlay */}
          <AnimatePresence>
            {mobileRightPanelOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-50 bg-[#070708] lg:hidden"
              >
                <RightPanel
                  activeModule={activeModule}
                  selectedData={
                    activeModule === "map" ? selectedCountry : undefined
                  }
                  selectedLetter={
                    activeModule === "letters" ? selectedLetter : undefined
                  }
                  selectedElf={
                    activeModule === "elves" ? selectedElf : undefined
                  }
                  onAssignTask={handleAssignTask}
                  onClose={() => setMobileRightPanelOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Right Panel */}
          <div className="hidden lg:block h-full shrink-0">
            <RightPanel
              activeModule={activeModule}
              selectedData={
                activeModule === "map" ? selectedCountry : undefined
              }
              selectedLetter={
                activeModule === "letters" ? selectedLetter : undefined
              }
              selectedElf={activeModule === "elves" ? selectedElf : undefined}
              onAssignTask={handleAssignTask}
            />
          </div>
        </main>
      )}
    </AnimatePresence>
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
