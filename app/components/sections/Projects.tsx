"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/app/lib/constants";
import { ExternalLink, X, Zap, CheckCircle } from "lucide-react";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section id="projects" ref={ref} className="section-container relative overflow-hidden">
      {/* Bg gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--galactic-pink)] text-xs font-orbitron tracking-[0.3em] mb-3">UNIVERSE 03</p>
          <h2 className="section-title text-white">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/40 font-rajdhani tracking-wider">Holographic Project Galaxy — Click to Explore</p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
              className="planet-card glass-dark rounded-3xl overflow-hidden cursor-pointer group relative"
              style={{ border: `1px solid ${project.planetColor}22` }}
            >
              {/* Planet visual header */}
              <div className="relative h-40 overflow-hidden"
                style={{ background: `radial-gradient(ellipse at 30% 40%, ${project.planetColor}33, ${project.color}11, transparent)` }}>
                
                {/* Floating planet */}
                <div className="absolute top-1/2 right-8 -translate-y-1/2">
                  <motion.div
                    className="w-20 h-20 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${project.planetColor}cc, ${project.color}66, var(--space-black))`,
                      boxShadow: `0 0 30px ${project.planetColor}66, 0 0 60px ${project.planetColor}22`,
                    }}
                    animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                {/* Number badge */}
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full glass flex items-center justify-center">
                  <span className="font-orbitron text-xs" style={{ color: project.planetColor }}>0{project.id}</span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to bottom, transparent, ${project.color}22)` }}>
                  <span className="text-white font-orbitron text-xs tracking-widest border border-white/30 px-3 py-1 rounded-full">
                    EXPLORE →
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-orbitron font-bold text-lg text-white mb-1 group-hover:text-[var(--neon-blue)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-rajdhani tracking-wider mb-3" style={{ color: project.planetColor }}>
                  {project.tagline}
                </p>
                <p className="text-white/50 text-sm font-rajdhani leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full glass font-rajdhani"
                      style={{ color: project.planetColor, borderColor: `${project.planetColor}44`, border: "1px solid" }}>
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-xs px-2 py-0.5 rounded-full glass font-rajdhani text-white/30">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(5,8,22,0.9)", backdropFilter: "blur(20px)" }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="glass-dark rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{ border: `1px solid ${selectedProject.planetColor}44` }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-48 overflow-hidden rounded-t-3xl"
                style={{ background: `radial-gradient(ellipse at 30% 40%, ${selectedProject.planetColor}44, ${selectedProject.color}22, var(--space-black))` }}>
                
                <div className="absolute top-1/2 right-10 -translate-y-1/2">
                  <div className="w-28 h-28 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${selectedProject.planetColor}, ${selectedProject.color}, var(--space-black))`,
                      boxShadow: `0 0 50px ${selectedProject.planetColor}88`,
                    }} />
                </div>

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="text-xs font-orbitron tracking-widest mb-1" style={{ color: selectedProject.planetColor }}>
                    PROJECT 0{selectedProject.id}
                  </p>
                  <h3 className="font-orbitron font-black text-3xl text-white">{selectedProject.title}</h3>
                  <p className="text-white/60 font-rajdhani">{selectedProject.tagline}</p>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal content */}
              <div className="p-6">
                <p className="text-white/70 font-rajdhani leading-relaxed mb-6">{selectedProject.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-orbitron text-sm text-[var(--neon-blue)] tracking-widest mb-3">KEY FEATURES</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-white/70 font-rajdhani text-sm">
                        <CheckCircle size={14} style={{ color: selectedProject.planetColor }} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="glass rounded-xl p-4 mb-6 flex items-center gap-3">
                  <Zap size={18} className="text-[var(--electric-cyan)]" />
                  <div>
                    <p className="text-xs font-orbitron text-[var(--electric-cyan)] tracking-widest">METRICS</p>
                    <p className="text-white/80 font-rajdhani">{selectedProject.metrics}</p>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="mb-6">
                  <h4 className="font-orbitron text-sm text-[var(--neon-blue)] tracking-widest mb-3">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="text-sm px-3 py-1 rounded-full glass font-rajdhani"
                        style={{ color: selectedProject.planetColor, border: `1px solid ${selectedProject.planetColor}44` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 glass-dark rounded-xl border border-white/10 hover:border-[var(--cosmic-purple)]/50 text-white font-orbitron text-xs tracking-widest transition-all"
                  >
                    <GithubIcon /> GITHUB
                  </motion.a>
                  {selectedProject.live !== "#" && (
                    <motion.a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-orbitron text-xs tracking-widest transition-all text-white"
                      style={{ background: `linear-gradient(135deg, ${selectedProject.planetColor}88, ${selectedProject.color}88)` }}
                    >
                      <ExternalLink size={16} /> LIVE DEMO
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
