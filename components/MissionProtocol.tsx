"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MissionProtocol() {
  return (
    <div className="flex flex-col h-full gap-10 max-w-6xl mx-auto py-12 px-4 lg:px-8 overflow-y-auto no-scrollbar">
      {/* Cinematic Header */}
      <header className="relative space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 text-[#ffcc33]"
        >
          <div className="h-[2px] w-16 bg-gradient-to-r from-[#ffcc33] to-transparent" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">
            Command Directive 25.12
          </span>
        </motion.div>

        <div className="space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-7xl font-black tracking-tighter text-white leading-none"
          >
            MISSION{" "}
            <span className="text-[#d42426] drop-shadow-[0_0_30px_rgba(212,36,38,0.4)]">
              STORY
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/40 tracking-tight font-medium"
          >
            Decoding the architecture of modern magic.
          </motion.p>
        </div>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 p-8 rounded-3xl bg-white/[0.03] border border-white/10 relative overflow-hidden group"
        >
          <div className="relative z-10 space-y-4">
            <h3 className="text-xl font-bold text-white">
              The Digital North Pole
            </h3>
            <p className="text-white/50 leading-relaxed text-lg">
              SantaOS is the proprietary operating system designed to handle the
              exponential complexity of global festive logistics. It transforms
              millions of unstructured wishes into a precise, executable
              delivery plan. By leveraging quantum-grade synchronization and
              neural sentiment analysis, we ensure that the spirit of Christmas
              scales for the 21st century.
            </p>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg viewBox="0 0 24 24" className="w-32 h-32 fill-white">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-8 rounded-3xl bg-[#d42426]/10 border border-[#d42426]/20 flex flex-col justify-between"
        >
          <h3 className="text-xs font-black text-[#d42426] uppercase tracking-widest">
            Active Status
          </h3>
          <div className="space-y-1">
            <div className="text-4xl font-black text-white tracking-tighter">
              OPERATIONAL
            </div>
            <div className="flex items-center gap-2 text-[#ffcc33] text-[10px] font-bold">
              <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
              SYSTEM UPTIME: 99.998%
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tech Stack / Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Global Joy Map",
            desc: "Real-time emotional telemetry visualization across all continents.",
            tag: "LOGISTICS",
          },
          {
            title: "Neural Decryptor",
            desc: "Gemini-powered sentiment analysis for complex wish resolution.",
            tag: "AI CORE",
          },
          {
            title: "Gift Intelligence",
            desc: "Predictive manufacturing and stock level optimization.",
            tag: "ANALYTICS",
          },
          {
            title: "Sleigh Tracker",
            desc: "Orbital telemetry and hyper-lane navigation for SS-01.",
            tag: "AEROSPACE",
          },
        ].map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#ffcc33]/20 transition-all"
          >
            <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-white/5 text-white/40 mb-3 block w-fit">
              {feat.tag}
            </span>
            <h4 className="text-white font-bold mb-2 tracking-tight">
              {feat.title}
            </h4>
            <p className="text-xs text-white/40 leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Detailed Technical Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 p-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60"
      >
        <div className="flex gap-12 text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
          <div>Build_ID: S-2024.12.25</div>
          <div>Location: 90.0000° N, 135.0000° W</div>
          <div>Encryption: Festive-AES-256</div>
        </div>
        <div className="text-[10px] font-bold text-white/20 italic">
          "Magic is just science we don't understand yet." — Command Alpha
        </div>
      </motion.div>
    </div>
  );
}
