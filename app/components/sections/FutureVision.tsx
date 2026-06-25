"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Cpu, Zap, Globe, Rocket, Sparkles } from "lucide-react";

const VISIONS = [
  {
    icon: <Brain size={32} />,
    title: "AI-First Applications",
    description: "Building applications where AI is not a feature but the foundation. Integrating LLMs, generative AI, and intelligent automation into every product.",
    color: "var(--cosmic-purple)",
    delay: 0,
  },
  {
    icon: <Globe size={32} />,
    title: "Web3 & Decentralization",
    description: "Exploring the intersection of blockchain technology and modern web development to build decentralized applications for the future internet.",
    color: "var(--neon-blue)",
    delay: 0.1,
  },
  {
    icon: <Cpu size={32} />,
    title: "Edge Computing",
    description: "Pushing computation to the edge — building ultra-fast, globally distributed applications that respond in milliseconds anywhere in the world.",
    color: "var(--galactic-pink)",
    delay: 0.2,
  },
  {
    icon: <Rocket size={32} />,
    title: "Space Tech",
    description: "Contributing to the new space economy through software. Satellite data processing, orbital mechanics simulation, and mission control systems.",
    color: "var(--electric-cyan)",
    delay: 0.3,
  },
  {
    icon: <Sparkles size={32} />,
    title: "Generative Experiences",
    description: "Creating immersive, generative digital experiences using AI models, procedural generation, and real-time 3D rendering on the web.",
    color: "#10B981",
    delay: 0.4,
  },
  {
    icon: <Zap size={32} />,
    title: "Quantum Computing",
    description: "Preparing for the quantum era — understanding quantum algorithms and their implications for cryptography, optimization, and AI acceleration.",
    color: "#8B5CF6",
    delay: 0.5,
  },
];

const NEURAL_NODES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
}));

export default function FutureVision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="future" ref={ref} className="section-container relative overflow-hidden">
      {/* Neural network background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          {NEURAL_NODES.map((node, i) =>
            NEURAL_NODES.slice(i + 1, i + 3).map((target, j) => (
              <line
                key={`${i}-${j}`}
                x1={`${node.x}%`} y1={`${node.y}%`}
                x2={`${target.x}%`} y2={`${target.y}%`}
                stroke="var(--cosmic-purple)" strokeWidth="1"
              />
            ))
          )}
          {NEURAL_NODES.map((node) => (
            <circle
              key={node.id}
              cx={`${node.x}%`} cy={`${node.y}%`}
              r={node.size} fill="var(--neon-blue)" opacity="0.6"
            />
          ))}
        </svg>

        {/* Gradient overlays */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#8B5CF6] text-xs font-orbitron tracking-[0.3em] mb-3">UNIVERSE 08</p>
          <h2 className="section-title text-white">
            Future <span className="gradient-text">Vision</span>
          </h2>
          <p className="text-white/40 font-rajdhani tracking-wider">AI + Innovation + What's Next</p>
        </motion.div>

        {/* Vision quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="glass-dark rounded-3xl p-8 neon-border-purple relative overflow-hidden">
            <div className="text-6xl text-[var(--cosmic-purple)]/30 font-orbitron absolute top-4 left-6">"</div>
            <p className="text-2xl font-rajdhani text-white/80 italic leading-relaxed z-10 relative">
              The future belongs to those who code it into existence. I'm not just building apps — I'm architecting the digital universe of tomorrow.
            </p>
            <div className="text-6xl text-[var(--cosmic-purple)]/30 font-orbitron absolute bottom-4 right-6">"</div>
          </div>
        </motion.div>

        {/* Vision cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VISIONS.map((vision, i) => (
            <motion.div
              key={vision.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: vision.delay }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-dark rounded-3xl p-6 border border-white/5 transition-all duration-300 group cursor-default"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${vision.color}44`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
                style={{ background: `${vision.color}22`, color: vision.color }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                >
                  {vision.icon}
                </motion.div>
              </div>

              <h3 className="font-orbitron font-bold text-lg text-white mb-3 group-hover:transition-colors"
                style={{ transition: "color 0.3s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = vision.color)}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "white")}
              >
                {vision.title}
              </h3>
              <p className="text-white/50 font-rajdhani leading-relaxed text-sm">{vision.description}</p>

              {/* Neon bottom accent */}
              <div
                className="h-px mt-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${vision.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-white/40 font-rajdhani text-lg mb-6">
            Ready to build the future together?
          </p>
          <motion.button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(124,58,237,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full font-orbitron font-bold text-sm tracking-widest text-white transition-all"
            style={{ background: "linear-gradient(135deg, var(--cosmic-purple), var(--neon-blue))" }}
          >
            LET'S BUILD TOGETHER
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
