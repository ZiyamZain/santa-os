"use client";

import React, { useState, useRef, useEffect } from "react";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("SantaOS Audio Error:", err);
        setAudioError(true);
      });
    }
    setHasInteracted(true);
  };

  return (
    <div className="fixed bottom-28 right-10 z-[100]">
      <audio
        ref={audioRef}
        src="/music/christmas-bg.mp3"
        loop
        onPlay={() => {
          setIsPlaying(true);
          setAudioError(false);
        }}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          console.error("Failed to load audio file");
          setAudioError(true);
        }}
      />

      <button
        onClick={toggleAudio}
        className={`group relative flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-500 backdrop-blur-xl ${
          isPlaying
            ? "bg-[#d42426]/20 border-[#d42426]/40 shadow-[0_0_20px_rgba(212,36,38,0.2)]"
            : audioError
            ? "bg-red-500/20 border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            : "bg-black/40 border-white/10 hover:border-white/20"
        }`}
      >
        {/* Animated Sound Bars */}
        <div className="flex items-center gap-0.5 h-4 w-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-0.5 rounded-full bg-current transition-all duration-300 ${
                isPlaying ? "animate-bounce" : "h-1"
              } ${
                isPlaying
                  ? "text-[#d42426]"
                  : audioError
                  ? "text-red-500"
                  : "text-white/40"
              }`}
              style={{
                animationDelay: `${i * 0.1}s`,
                height: isPlaying ? "100%" : "20%",
              }}
            />
          ))}
        </div>

        <div className="flex flex-col items-start ">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
            {audioError
              ? "System Audio: Failed"
              : isPlaying
              ? "System Audio: Active"
              : "System Audio: Muted"}
          </span>
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${
              isPlaying
                ? "text-white"
                : audioError
                ? "text-red-400"
                : "text-white/60"
            }`}
          >
            {audioError
              ? "Link Error"
              : isPlaying
              ? "Cinematic Magic"
              : "Initialize Sound"}
          </span>
        </div>

        {/* Neural Pulse Effect */}
        {!hasInteracted && !audioError && (
          <div className="absolute inset-0 rounded-2xl border border-[#d42426] animate-ping opacity-20 pointer-events-none" />
        )}
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap">
          <p className="text-[8px] font-black text-[#ffcc33] uppercase tracking-widest">
            {audioError
              ? "CHECK PUBLIC/MUSIC/CHRISTMAS-BG.MP3"
              : "Neural Audio Link v1.0.5"}
          </p>
        </div>
      </div>
    </div>
  );
}
