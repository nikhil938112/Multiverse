"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Download, Eye, FileText, X } from "lucide-react";

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section id="resume" ref={ref} className="section-container relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--electric-cyan)] text-xs font-orbitron tracking-[0.3em] mb-3">UNIVERSE 06</p>
          <h2 className="section-title text-white">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-white/40 font-rajdhani tracking-wider">Crystal Cube — Download or Preview</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Crystal cube visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, type: "spring" }}
            className="flex-shrink-0"
          >
            <div className="relative w-64 h-64">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-3xl animate-pulse-glow" />

              {/* Main cube */}
              <motion.div
                className="absolute inset-8 rounded-3xl flex items-center justify-center overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(0,229,255,0.1), rgba(255,60,172,0.2))",
                  border: "1px solid rgba(0,229,255,0.3)",
                  boxShadow: "0 0 40px rgba(0,229,255,0.2), inset 0 0 40px rgba(124,58,237,0.1)",
                  backdropFilter: "blur(20px)",
                }}
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Holographic scan effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to bottom, transparent, rgba(0,229,255,0.15), transparent)",
                    height: "40px",
                  }}
                  animate={{ top: ["-40px", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative z-10 text-center">
                  <FileText size={40} className="text-[var(--neon-blue)] mx-auto mb-3" />
                  <p className="font-orbitron font-bold text-white text-sm">RESUME</p>
                  <p className="text-[var(--neon-blue)] text-xs font-rajdhani tracking-widest">NIKHIL KUMAR</p>
                </div>
              </motion.div>

              {/* Orbiting rings */}
              <div className="absolute inset-0 rounded-full border border-[#d97706]/20 animate-spin" style={{ animationDuration: "10s" }} />
              <div className="absolute inset-2 rounded-full border border-[var(--neon-blue)]/10 animate-spin" style={{ animationDuration: "7s", animationDirection: "reverse" }} />
            </div>
          </motion.div>

          {/* Info + Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 text-center lg:text-left"
          >
            <h3 className="font-orbitron font-bold text-3xl text-white mb-4">
              Full Stack <span className="gradient-text">Developer</span>
            </h3>
            <p className="text-white/60 font-rajdhani leading-relaxed mb-8 text-lg">
              My resume showcases 3+ years of hands-on development experience across the MERN stack, modern frontend frameworks, cloud technologies, and AI integrations. Built production-grade applications serving real users.
            </p>

            {/* Quick highlights */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: "MERN Stack", detail: "Expert" },
                { label: "Projects", detail: "10+ shipped" },
                { label: "React / Next.js", detail: "Advanced" },
                { label: "AI Integration", detail: "Intermediate" },
              ].map((item) => (
                <div key={item.label} className="glass-dark rounded-2xl p-3 border border-white/5">
                  <p className="text-[var(--neon-blue)] text-xs font-orbitron tracking-widest">{item.label}</p>
                  <p className="text-white/70 font-rajdhani text-sm">{item.detail}</p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.a
                href="https://drive.google.com/file/d/1JlpdQO7qjJrifc6yndtiFhTDxleYK8wo/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-orbitron text-sm tracking-widest text-white transition-all"
                style={{ background: "linear-gradient(135deg, var(--cosmic-purple), #451a03)" }}
              >
                <Download size={18} />
                DOWNLOAD PDF
              </motion.a>

              <motion.a
                href="https://drive.google.com/file/d/1JlpdQO7qjJrifc6yndtiFhTDxleYK8wo/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowPreview(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-3.5 glass-dark rounded-xl font-orbitron text-sm tracking-widest text-[var(--neon-blue)] neon-border-blue hover:bg-[var(--neon-blue)]/10 transition-all"
              >
                <Eye size={18} />
                VIEW ONLINE
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(5,8,22,0.95)", backdropFilter: "blur(20px)" }}
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-dark rounded-3xl p-6 max-w-2xl w-full neon-border-blue"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-orbitron text-white font-bold">Resume Preview</h3>
                <div className="flex items-center gap-3">
                  <motion.a
                    href="https://drive.google.com/file/d/1JlpdQO7qjJrifc6yndtiFhTDxleYK8wo/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full font-orbitron text-xs tracking-widest text-white"
                    style={{ background: "linear-gradient(135deg, var(--cosmic-purple), #451a03)" }}
                  >
                    <Eye size={12} /> OPEN IN DRIVE
                  </motion.a>
                  <button onClick={() => setShowPreview(false)} className="text-white/50 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "70vh" }}>
                <iframe
                  src="https://drive.google.com/file/d/1JlpdQO7qjJrifc6yndtiFhTDxleYK8wo/preview"
                  className="w-full h-full border-0"
                  allow="autoplay"
                  title="Resume Preview"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
