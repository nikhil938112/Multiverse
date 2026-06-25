"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS } from "@/app/lib/constants";

type SkillCategory = keyof typeof SKILLS;

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("Frontend");

  const categories = Object.keys(SKILLS) as SkillCategory[];
  const currentSkills = SKILLS[activeCategory];

  return (
    <section id="skills" ref={ref} className="section-container relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,60,172,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--neon-blue)] text-xs font-orbitron tracking-[0.3em] mb-3">UNIVERSE 02</p>
          <h2 className="section-title text-white">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-white/40 font-rajdhani tracking-wider">Technologies in My Arsenal</p>
        </motion.div>

        {/* Animated skill sphere visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="flex justify-center mb-16"
        >
          <div className="relative w-72 h-72">
            {/* Central sphere */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full"
                style={{
                  background: "radial-gradient(circle at 35% 35%, var(--neon-blue), var(--cosmic-purple), var(--space-black))",
                  boxShadow: "0 0 40px rgba(0,229,255,0.4), 0 0 80px rgba(124,58,237,0.2)",
                }} />
            </div>

            {/* Orbiting skills */}
            {["React", "Node", "MongoDB", "Next.js", "TypeScript", "Docker", "AWS", "OpenAI"].map((skill, i) => {
              const angle = (i * 360) / 8;
              const radius = 110;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              const colors = ["#61DAFB", "#339933", "#47A248", "#ffffff", "#3178C6", "#2496ED", "#FF9900", "#74AA9C"];

              return (
                <motion.div
                  key={skill}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: "64px",
                    height: "64px",
                    marginLeft: "-32px",
                    marginTop: "-32px",
                  }}
                  animate={{
                    x: [x, x * 0.95, x],
                    y: [y, y * 0.95, y],
                  }}
                  transition={{
                    duration: 6 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-full h-full rounded-full flex items-center justify-center cursor-pointer text-xs font-bold glass border"
                    style={{ borderColor: `${colors[i]}66`, color: colors[i], fontSize: "10px" }}
                  >
                    {skill}
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Orbit rings */}
            <div className="absolute inset-0 rounded-full border border-white/5 animate-spin" style={{ animationDuration: "20s" }} />
            <div className="absolute inset-4 rounded-full border border-white/5 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-orbitron text-xs tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[var(--cosmic-purple)] to-[#451a03] text-white shadow-neon-purple"
                  : "glass-dark text-white/50 hover:text-white border border-white/10 hover:border-[var(--cosmic-purple)]/50"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
        >
          {currentSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, borderColor: skill.color }}
              className="glass-dark rounded-2xl p-5 border border-white/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: skill.color, boxShadow: `0 0 10px ${skill.color}` }}
                  />
                  <span className="text-white font-rajdhani font-semibold text-base">{skill.name}</span>
                </div>
                <span className="font-orbitron text-xs" style={{ color: skill.color }}>
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                  style={{ background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`, boxShadow: `0 0 10px ${skill.color}` }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
