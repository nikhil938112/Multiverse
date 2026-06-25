"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL_INFO, EXPERIENCE, ACHIEVEMENTS } from "@/app/lib/constants";
import { MapPin, Calendar, Star } from "lucide-react";

const TIMELINE = [
  { year: "2021", event: "Started B.Tech Computer Science", color: "#10B981" },
  { year: "2022", event: "First open source contributions & personal projects", color: "var(--cosmic-purple)" },
  { year: "2023", event: "Landed first internship, mastered MERN stack", color: "var(--neon-blue)" },
  { year: "2024", event: "Launched ApplyBot & MERN Thinkboard", color: "var(--galactic-pink)" },
  { year: "2025", event: "Graduated & exploring AI + GenAI integrations", color: "var(--electric-cyan)" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section-container relative overflow-hidden">
      {/* Background nebula */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", transform: "translateY(-50%)" }} />
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--neon-blue)] text-xs font-orbitron tracking-[0.3em] mb-3">UNIVERSE 01</p>
          <h2 className="section-title text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-white/40 font-rajdhani tracking-wider">The Human Behind the Code</p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Profile card */}
            <div className="glass-dark rounded-3xl p-8 neon-border-purple relative overflow-hidden">
              <div className="holographic" />
              
              {/* Avatar */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-32 h-32 mb-4">
                  <div className="absolute inset-0 rounded-full animate-spin border-2 border-transparent border-t-[#d97706]" style={{ animationDuration: "4s" }} />
                  <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-[#d97706]/50">
                    <img src="/profile.jpg" alt="Nikhil Kumar" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#d97706]/30" />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[#10B981] border-2 border-[var(--space-black)] animate-pulse" />
                </div>

                <h3 className="font-orbitron font-bold text-2xl text-white">{PERSONAL_INFO.name}</h3>
                <p className="text-[var(--neon-blue)] font-rajdhani tracking-wider text-sm mt-1">Full Stack Developer</p>
                
                <div className="flex items-center gap-2 mt-2 text-white/40 text-sm">
                  <MapPin size={14} />
                  <span className="font-rajdhani">{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-white/70 font-rajdhani leading-relaxed text-center text-base">
                {PERSONAL_INFO.bio}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {ACHIEVEMENTS.map((a, i) => (
                  <motion.div
                    key={i}
                    className="glass rounded-2xl p-4 text-center"
                    whileHover={{ scale: 1.05, borderColor: "var(--cosmic-purple)" }}
                  >
                    <div className="text-3xl mb-1">{a.icon}</div>
                    <div className="font-orbitron font-bold text-xl gradient-text-2">{a.value}</div>
                    <div className="text-white/40 text-xs font-rajdhani tracking-wider mt-1">{a.title}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Journey timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-dark rounded-3xl p-10 neon-border-blue">
              <h3 className="font-orbitron text-xl font-bold text-white mb-10">
                My <span className="gradient-text">Journey</span>
              </h3>

              <div className="relative">
                {/* Glowing vertical line — centered behind nodes */}
                <div
                  className="absolute top-0 bottom-0 w-px"
                  style={{
                    left: "19px",
                    background: "linear-gradient(to bottom, var(--cosmic-purple), var(--neon-blue), var(--galactic-pink))",
                    boxShadow: "0 0 8px rgba(0,229,255,0.6)",
                  }}
                />

                <div className="flex flex-col gap-7">
                  {TIMELINE.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.15 }}
                      className="flex items-start gap-5 relative"
                    >
                      {/* Node dot — centered on the line */}
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10"
                        style={{
                          borderColor: item.color,
                          background: `${item.color}18`,
                          boxShadow: `0 0 18px ${item.color}55`,
                        }}
                      >
                        <Calendar size={13} style={{ color: item.color }} />
                      </div>

                      {/* Card */}
                      <div className="glass rounded-2xl px-5 py-4 flex-1 border border-white/5 hover:border-white/15 transition-all duration-300">
                        <span className="font-orbitron text-xs tracking-[0.2em]" style={{ color: item.color }}>
                          {item.year}
                        </span>
                        <p className="text-white/75 font-rajdhani text-sm mt-1.5 leading-relaxed">{item.event}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Currently doing */}
              <div className="mt-10 glass rounded-2xl px-6 py-5 border border-[#10B981]/25">
                <div className="flex items-center gap-2 mb-3">
                  <Star size={15} className="text-[#10B981]" />
                  <span className="text-[#10B981] font-orbitron text-xs tracking-[0.25em]">CURRENTLY</span>
                </div>
                <p className="text-white/70 font-rajdhani text-sm leading-relaxed">
                  Deepening expertise in AI integrations, building production-grade Next.js applications, and contributing to the open-source community.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
