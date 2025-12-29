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
    <div className="w-full px-4 mb-4">
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
        className={`w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500 backdrop-blur-xl ${
          isPlaying
            ? "bg-[#d42426]/10 border-[#d42426]/30 shadow-[0_0_15px_rgba(212,36,38,0.1)]"
            : audioError
            ? "bg-red-500/10 border-red-500/30"
            : "bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-white/10"
        }`}
      >
        {/* Animated Sound Bars */}
        <div className="flex items-center gap-0.5 h-3 w-4 shrink-0">
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
                  : "text-white/20"
              }`}
              style={{
                animationDelay: `${i * 0.1}s`,
                height: isPlaying ? "100%" : "20%",
              }}
            />
          ))}
        </div>

        <div className="flex flex-col items-start min-w-0">
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 truncate w-full">
            {audioError
              ? "Audio: Error"
              : isPlaying
              ? "Audio: Online"
              : "Audio: Off"}
          </span>
          <span
            className={`text-[9px] font-bold uppercase tracking-widest truncate w-full ${
              isPlaying
                ? "text-white/80"
                : audioError
                ? "text-red-400"
                : "text-white/50"
            }`}
          >
            {audioError
              ? "Config Error"
              : isPlaying
              ? "Neural Magic"
              : "Play Audio"}
          </span>
        </div>
      </button>
    </div>
  );
}
