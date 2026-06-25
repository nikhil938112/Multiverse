"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, X, Sparkles } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import { THEMES } from "@/app/lib/themes";

export default function ThemeSwitcher() {
  const { activeTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Floating toggle button ── */}
      <motion.button
        id="theme-switcher-btn"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="fixed right-5 top-1/2 -translate-y-1/2 z-[9998] w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: "linear-gradient(135deg, var(--cosmic-purple), var(--neon-blue))",
          boxShadow: "0 0 20px var(--neon-blue), 0 0 40px color-mix(in srgb, var(--neon-blue) 30%, transparent)",
        }}
        title="Switch Theme"
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {open ? (
            <X size={18} className="text-white" />
          ) : (
            <Palette size={18} className="text-white" />
          )}
        </motion.div>
      </motion.button>

      {/* ── Theme panel ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9996]"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed right-20 top-1/2 -translate-y-1/2 z-[9997] w-72 rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: "color-mix(in srgb, var(--space-black) 95%, transparent)",
                border: "1px solid color-mix(in srgb, var(--neon-blue) 30%, transparent)",
                boxShadow: "0 0 40px color-mix(in srgb, var(--neon-blue) 20%, transparent)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Header */}
              <div
                className="px-5 py-4 flex items-center justify-between"
                style={{
                  borderBottom: "1px solid color-mix(in srgb, var(--neon-blue) 12%, transparent)",
                  background: "color-mix(in srgb, var(--neon-blue) 5%, transparent)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={14} style={{ color: "var(--neon-blue)" }} />
                  <span className="font-orbitron text-xs tracking-[0.25em] text-white font-bold">
                    THEMES
                  </span>
                </div>
                <span
                  className="font-rajdhani text-xs"
                  style={{ color: "color-mix(in srgb, var(--neon-blue) 70%, white)" }}
                >
                  {activeTheme.emoji} {activeTheme.name}
                </span>
              </div>

              {/* Theme list */}
              <div className="p-3 flex flex-col gap-1.5 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {THEMES.map((theme, i) => {
                  const isActive = activeTheme.id === theme.id;
                  return (
                    <motion.button
                      key={theme.id}
                      onClick={() => {
                        setTheme(theme);
                        setOpen(false);
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ x: 6 }}
                      className="flex items-center gap-3 w-full p-2.5 rounded-xl text-left transition-all duration-200"
                      style={{
                        background: isActive
                          ? "color-mix(in srgb, var(--neon-blue) 12%, transparent)"
                          : "transparent",
                        border: isActive
                          ? "1px solid color-mix(in srgb, var(--neon-blue) 30%, transparent)"
                          : "1px solid transparent",
                      }}
                    >
                      {/* Color swatch */}
                      <div
                        className="w-11 h-11 rounded-xl flex-shrink-0 relative overflow-hidden"
                        style={{
                          background: theme.preview.bg,
                          border: `1px solid ${theme.preview.primary}44`,
                        }}
                      >
                        {/* Bottom gradient strip */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-5"
                          style={{
                            background: `linear-gradient(135deg, ${theme.preview.primary}, ${theme.preview.secondary})`,
                          }}
                        />
                        {/* Glow dot */}
                        <div
                          className="absolute top-2 left-2 w-2 h-2 rounded-full"
                          style={{
                            background: theme.preview.primary,
                            boxShadow: `0 0 8px ${theme.preview.primary}`,
                          }}
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="font-orbitron text-xs text-white tracking-wider truncate">
                          {theme.emoji} {theme.name}
                        </p>
                        <p
                          className="font-rajdhani text-xs mt-0.5 truncate"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          {theme.description}
                        </p>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{
                            background: "var(--neon-blue)",
                            boxShadow: "0 0 10px var(--neon-blue)",
                          }}
                        >
                          <Check size={11} className="text-black font-bold" strokeWidth={3} />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div
                className="px-5 py-3 text-center"
                style={{
                  borderTop: "1px solid color-mix(in srgb, var(--neon-blue) 10%, transparent)",
                }}
              >
                <p className="font-rajdhani text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                  Theme is saved automatically
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
