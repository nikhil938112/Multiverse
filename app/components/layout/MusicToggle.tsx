"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) {
      // Use a royalty-free ambient space music from mixkit or similar
      audioRef.current = new Audio(
        "https://www.soundjay.com/misc/sounds/ambient-space-01.mp3"
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay policy might block — silently fail
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: "spring" }}
    >
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-12 h-12 rounded-full glass-dark border border-white/10 flex items-center justify-center hover:border-[var(--cosmic-purple)]/50 transition-all"
        aria-label="Toggle ambient music"
      >
        {isPlaying ? (
          <Volume2 size={18} className="text-[var(--neon-blue)]" />
        ) : (
          <VolumeX size={18} className="text-white/50" />
        )}
        {isPlaying && (
          <div className="absolute -inset-1 rounded-full border border-[#d97706]/30 animate-ping" style={{ animationDuration: "2s" }} />
        )}
      </motion.button>
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-[10px] font-orbitron text-white/30 tracking-widest">
          {isPlaying ? "♫ AMBIENT" : "MUSIC"}
        </span>
      </div>
    </motion.div>
  );
}
