"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const transmissions = [
  "COMM-LINK: REINDEER SATELLITE ARRAY ONLINE [STABLE]",
  "ANOMALY: UNUSUAL JOY SURGE DETECTED IN SECTOR 12 (COPENHAGEN)",
  "WORKSHOP ALERT: HOT COCOA RESERVES AT 12% IN LEVEL 3 BREAKROOM",
  "NEURAL SYNC: GEMINI ANALYTICS ENGINE CALIBRATED FOR EMOTIONAL DEPTH",
  "FLIGHT DATA: SLEIGH THRUSTERS OPTIMIZED FOR GALE-FORCE WINDS",
  "LOGISTICS: 1.2M WOODEN TOYS CLEARED FOR PAINTING STAGE",
  "SAFETY: ELF VITALITY AVG AT 88% - SYSTEM NOMINAL",
  "ENCRYPTED: TRANSMISSION RECEIVED FROM SECRET SANTA NODE 4",
];

export default function TransmissionTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % transmissions.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-6 bg-[#d42426]/10 border-b border-[#d42426]/20 flex items-center px-10 overflow-hidden relative z-50">
      <div className="flex items-center gap-3 shrink-0 mr-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#d42426] animate-pulse" />
        <span className="text-[9px] font-black text-[#d42426] uppercase tracking-[0.3em]">
          Live Feed
        </span>
      </div>

      <div className="h-full flex items-center relative overflow-hidden flex-1">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[9px] font-mono text-white/50 uppercase tracking-widest whitespace-nowrap"
          >
            {transmissions[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4 text-[8px] font-mono text-white/20">
        <span className="animate-pulse">SENS-SCN: ACTIVE</span>
        <span>REF-ROT: {Math.floor(Math.random() * 900) + 100}ms</span>
      </div>
    </div>
  );
}
