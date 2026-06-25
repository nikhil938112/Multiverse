"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ChevronRight } from "lucide-react";
import { AI_ORB_FAQ } from "@/app/lib/constants";

export default function AIOrb() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQ, setSelectedQ] = useState<number | null>(null);
  const [orbPos, setOrbPos] = useState({ x: 0, y: 0 });
  const orbRef = useRef<HTMLDivElement>(null);

  // Subtle float animation — no mouse following (can be annoying)
  return (
    <>
      {/* Floating AI Orb */}
      <motion.div
        ref={orbRef}
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open AI Assistant"
        >
          {/* Glowing orb */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--cosmic-purple)] to-[#f59e0b] animate-pulse-glow" />
          <div className="absolute -inset-2 rounded-full border border-[var(--neon-blue)]/30 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="relative z-10">
            <MessageCircle size={22} className="text-white" />
          </div>
          {/* Label */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-[10px] font-orbitron text-[var(--neon-blue)] tracking-widest bg-black/50 px-2 py-0.5 rounded-full">
              AI ASSISTANT
            </span>
          </div>
        </motion.button>
      </motion.div>

      {/* FAQ Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-28 right-8 z-50 w-80 glass-dark rounded-2xl p-5 neon-border-purple"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--cosmic-purple)] to-[#f59e0b] flex items-center justify-center">
                  <span className="text-xs">🤖</span>
                </div>
                <div>
                  <p className="text-white text-sm font-orbitron">ARIA</p>
                  <p className="text-[var(--neon-blue)] text-xs font-rajdhani">Nikhil's AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {selectedQ === null ? (
                <motion.div
                  key="questions"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <p className="text-white/60 text-xs font-rajdhani mb-3 tracking-wider">
                    What would you like to know about Nikhil?
                  </p>
                  <div className="flex flex-col gap-2">
                    {AI_ORB_FAQ.map((item, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setSelectedQ(i)}
                        whileHover={{ x: 4, backgroundColor: "rgba(124,58,237,0.15)" }}
                        className="text-left text-sm text-white/80 p-2.5 rounded-xl border border-white/5 hover:border-[var(--cosmic-purple)]/50 transition-all duration-200 flex items-center justify-between group"
                      >
                        <span className="font-rajdhani">{item.question}</span>
                        <ChevronRight size={14} className="text-[var(--neon-blue)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <p className="text-[var(--neon-blue)] text-xs font-orbitron mb-2">
                    {AI_ORB_FAQ[selectedQ].question}
                  </p>
                  <p className="text-white/80 text-sm font-rajdhani leading-relaxed mb-4">
                    {AI_ORB_FAQ[selectedQ].answer}
                  </p>
                  <button
                    onClick={() => setSelectedQ(null)}
                    className="text-xs text-white/50 hover:text-[var(--neon-blue)] transition-colors font-rajdhani tracking-wider"
                  >
                    ← Ask something else
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
