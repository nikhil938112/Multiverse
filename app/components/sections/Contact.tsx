"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/app/lib/constants";
import { Send, Mail, CheckCircle, Loader2 } from "lucide-react";

const GithubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const SOCIALS = [
  { icon: <GithubIcon />, label: "GitHub", href: PERSONAL_INFO.github, color: "#ffffff" },
  { icon: <LinkedinIcon />, label: "LinkedIn", href: PERSONAL_INFO.linkedin, color: "#0EA5E9" },
  { icon: <Mail size={22} />, label: "Email", href: `mailto:${PERSONAL_INFO.email}`, color: "var(--galactic-pink)" },
  { icon: <InstagramIcon />, label: "Instagram", href: PERSONAL_INFO.instagram, color: "var(--electric-cyan)" },
];

// Particle burst animation
const BURST_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  angle: (i * 360) / 20,
  distance: Math.random() * 100 + 50,
}));

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send
    await new Promise((res) => setTimeout(res, 2000));
    setStatus("sent");
    setTimeout(() => {
      setStatus("idle");
      setFormState({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" ref={ref} className="section-container relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 70%, rgba(255,60,172,0.05) 0%, transparent 60%)" }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--galactic-pink)] text-xs font-orbitron tracking-[0.3em] mb-3">UNIVERSE 07</p>
          <h2 className="section-title text-white">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-white/40 font-rajdhani tracking-wider">Futuristic Communication Hub</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info + socials */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-orbitron font-bold text-2xl text-white mb-4">
              Open to <span className="neon-text-blue">Opportunities</span>
            </h3>
            <p className="text-white/60 font-rajdhani leading-relaxed mb-8 text-base">
              Whether you have an exciting project, a job opportunity, or just want to talk tech — I'd love to hear from you. Let's build something incredible together.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                { label: "EMAIL", value: PERSONAL_INFO.email, color: "var(--galactic-pink)" },
                { label: "LOCATION", value: PERSONAL_INFO.location, color: "var(--neon-blue)" },
                { label: "STATUS", value: "Available for work ✓", color: "#10B981" },
              ].map((item) => (
                <div key={item.label} className="glass-dark rounded-2xl px-5 py-3.5 border border-white/5 flex items-center justify-between">
                  <span className="font-orbitron text-xs tracking-widest text-white/40">{item.label}</span>
                  <span className="font-rajdhani" style={{ color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Social portals */}
            <div>
              <p className="text-white/40 text-xs font-orbitron tracking-widest mb-4">SOCIAL PORTALS</p>
              <div className="flex gap-4">
                {SOCIALS.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-2xl glass-dark flex items-center justify-center border border-white/10 transition-all duration-300"
                    style={{ color: s.color }}
                    title={s.label}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = s.color + "66";
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${s.color}33`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="glass-dark rounded-3xl p-8 neon-border-blue h-full flex flex-col items-center justify-center text-center relative overflow-hidden"
                >
                  {/* Particle burst */}
                  {BURST_PARTICLES.map((p) => (
                    <motion.div
                      key={p.id}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: p.id % 3 === 0 ? "var(--neon-blue)" : p.id % 3 === 1 ? "var(--cosmic-purple)" : "var(--galactic-pink)",
                        left: "50%", top: "50%",
                      }}
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{
                        x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                        y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
                        scale: 0,
                        opacity: 0,
                      }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  ))}

                  <CheckCircle size={56} className="text-[#10B981] mb-4" />
                  <h3 className="font-orbitron font-bold text-2xl text-white mb-2">Message Sent!</h3>
                  <p className="text-white/60 font-rajdhani">
                    Your message has been transmitted into the cosmos. I'll respond within 24 hours! 🚀
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass-dark rounded-3xl p-8 neon-border-purple flex flex-col gap-5"
                >
                  <div>
                    <label className="text-[var(--neon-blue)] text-xs font-orbitron tracking-widest mb-2 block">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/20 font-rajdhani text-base focus:outline-none focus:border-[#d97706] transition-colors bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-[var(--neon-blue)] text-xs font-orbitron tracking-widest mb-2 block">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/20 font-rajdhani text-base focus:outline-none focus:border-[#d97706] transition-colors bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-[var(--neon-blue)] text-xs font-orbitron tracking-widest mb-2 block">MESSAGE</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/20 font-rajdhani text-base focus:outline-none focus:border-[#d97706] transition-colors bg-transparent resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 py-4 rounded-xl font-orbitron text-sm tracking-widest text-white transition-all disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, var(--cosmic-purple), #451a03, #451a03)" }}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        SEND MESSAGE
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
