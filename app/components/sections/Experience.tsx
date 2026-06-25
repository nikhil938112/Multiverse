"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EXPERIENCE } from "@/app/lib/constants";
import { Briefcase, GraduationCap, Code2, Globe } from "lucide-react";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  Freelance: <Globe size={18} />,
  Internship: <Briefcase size={18} />,
  "Open Source": <Code2 size={18} />,
  Education: <GraduationCap size={18} />,
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="section-container relative overflow-hidden">
      {/* Space station bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(0,229,255,0.04) 0%, transparent 60%)" }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#10B981] text-xs font-orbitron tracking-[0.3em] mb-3">UNIVERSE 04</p>
          <h2 className="section-title text-white">
            My <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-white/40 font-rajdhani tracking-wider">Space Station — Professional Journey</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: "linear-gradient(to bottom, var(--cosmic-purple), var(--neon-blue), var(--galactic-pink), #10B981)", boxShadow: "0 0 15px rgba(0,229,255,0.3)" }} />

          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Card */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-dark rounded-3xl p-6 border transition-all duration-300"
                    style={{ borderColor: `${exp.color}22` }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${exp.color}66`)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${exp.color}22`)}
                  >
                    {/* Type badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-orbitron tracking-widest"
                        style={{ background: `${exp.color}22`, color: exp.color, border: `1px solid ${exp.color}44` }}>
                        <span>{TYPE_ICONS[exp.type]}</span>
                        {exp.type.toUpperCase()}
                      </div>
                      <span className="text-white/30 text-xs font-rajdhani">{exp.period}</span>
                    </div>

                    <h3 className="font-orbitron font-bold text-xl text-white mb-1">{exp.role}</h3>
                    <p className="font-rajdhani tracking-wider text-sm mb-3" style={{ color: exp.color }}>
                      @ {exp.company}
                    </p>
                    <p className="text-white/60 font-rajdhani leading-relaxed mb-4">{exp.description}</p>

                    {/* Highlights */}
                    <div className="flex flex-col gap-2">
                      {exp.highlights.map((h, j) => (
                        <div key={j} className="flex items-center gap-2 text-white/50 text-sm font-rajdhani">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: exp.color, boxShadow: `0 0 6px ${exp.color}` }} />
                          {h}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Center node */}
                <div className="hidden md:flex flex-shrink-0 w-14 h-14 rounded-full items-center justify-center border-2 relative"
                  style={{ borderColor: exp.color, background: `${exp.color}22`, boxShadow: `0 0 20px ${exp.color}44` }}>
                  <span style={{ color: exp.color }}>{TYPE_ICONS[exp.type]}</span>
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                    style={{ background: exp.color, animationDuration: "3s" }} />
                </div>

                {/* Empty placeholder for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
