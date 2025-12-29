"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingSteps = [
  "Awakening North Pole Node Alpha...",
  "Calibrating Global Joy Sensors...",
  "Establishing Reindeer Satellite Link...",
  "Syncing Neural Wish Decryptor...",
  "Finalizing Festive Logic...",
];

export default function CinematicLoader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) =>
        prev < loadingSteps.length - 1 ? prev + 1 : prev
      );
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[1000] bg-[#030304] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,36,38,0.1)_0%,_transparent_70%)]" />

      {/* Scanning Line */}
      <motion.div
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d42426]/30 to-transparent pointer-events-none z-10"
      />

      <div className="relative z-20 flex flex-col items-center gap-12">
        {/* Orbital Sleigh Silhouette */}
        <motion.div
          initial={{ x: -200, y: 100, opacity: 0, scale: 0.5 }}
          animate={{ x: 200, y: -100, opacity: [0, 0.15, 0], scale: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute -z-10 text-white pointer-events-none"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32">
            <path d="M3 17h18l-2-2H5l-2 2zM5 15l1-4h12l1 4M7 11l1-4h8l1 4M12 7V4m0 0l-2 2m2-2l2 2" />
          </svg>
        </motion.div>

        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[#d42426] blur-[60px] opacity-20 animate-pulse" />
          <h1 className="text-6xl font-black tracking-tighter text-white flex items-center gap-4">
            SANTA<span className="text-[#d42426]">OS</span>
          </h1>
          <div className="mt-2 h-1 w-full bg-white/5 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-[#d42426] to-[#ffcc33]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Status Messages */}
        <div className="h-8 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40"
            >
              {loadingSteps[currentStep]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* System Details */}
        <div className="absolute bottom-12 left-12 flex flex-col gap-1 text-[#ffcc33]/20 font-mono text-[8px] uppercase tracking-widest">
          <span>Core version: 12.25.0</span>
          <span>Magic frequency: 440hz</span>
          <span>Coal filtration: active</span>
        </div>
      </div>

      {/* Particle Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#ffcc33] rounded-full animate-ping [animation-delay:1s]" />
        <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-[#d42426] rounded-full animate-ping [animation-delay:0.5s]" />
      </div>
    </motion.div>
  );
}
