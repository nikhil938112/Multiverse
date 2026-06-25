"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowDown, Mail } from "lucide-react";
import { PERSONAL_INFO, ROLES } from "@/app/lib/constants";

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);


const PARTICLES = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 10 + 5,
  delay: Math.random() * 5,
  opacity: Math.random() * 0.8 + 0.2,
}));

const METEORS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  delay: i * 2.5,
  duration: Math.random() * 3 + 2,
}));

function TypewriterText({ roles }: { roles: string[] }) {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const role = roles[currentRole];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < role.length) {
        setDisplayText(role.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (!isDeleting && charIndex === role.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(role.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentRole((c) => (c + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentRole, roles]);

  return (
    <span className="gradient-text">
      {displayText}
      <span className="typewriter-cursor" />
    </span>
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Animated starfield canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; r: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        alpha: Math.random(),
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    let animFrame: number;
    const draw = () => {
      // Resolve CSS vars to actual colors for Canvas API
      const style = getComputedStyle(document.documentElement);
      const bgColor    = style.getPropertyValue("--space-black").trim() || "#0d0a06";
      const primary    = style.getPropertyValue("--neon-blue").trim()    || "#f59e0b";
      const secondary  = style.getPropertyValue("--cosmic-purple").trim()|| "#d97706";

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cosmic gradient background
      const bg = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      bg.addColorStop(0, bgColor + "aa");
      bg.addColorStop(0.5, bgColor + "dd");
      bg.addColorStop(1, bgColor);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebula glow — primary color
      const nebula1 = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.3, 0,
        canvas.width * 0.7, canvas.height * 0.3, 300
      );
      nebula1.addColorStop(0, secondary + "26");
      nebula1.addColorStop(1, "transparent");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.7, 0,
        canvas.width * 0.2, canvas.height * 0.7, 250
      );
      nebula2.addColorStop(0, primary + "14");
      nebula2.addColorStop(1, "transparent");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach((star) => {
        star.alpha += star.speed * 0.01;
        const alpha = Math.abs(Math.sin(star.alpha)) * 0.8 + 0.2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas starfield */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.id % 3 === 0 ? "var(--neon-blue)" : p.id % 3 === 1 ? "var(--cosmic-purple)" : "var(--galactic-pink)",
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [p.opacity, p.opacity * 0.3, p.opacity],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Meteors */}
      {METEORS.map((m) => (
        <motion.div
          key={m.id}
          className="absolute w-px bg-gradient-to-b from-white to-transparent pointer-events-none"
          style={{
            height: "120px",
            top: "-120px",
            left: `${Math.random() * 100}%`,
            transform: "rotate(35deg)",
            zIndex: 1,
          }}
          animate={{
            top: ["−120px", "110vh"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
            ease: "linear",
          }}
        />
      ))}

      {/* Black hole glow at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse at center bottom, rgba(124,58,237,0.15) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="relative text-center px-4 max-w-5xl mx-auto"
        style={{
          zIndex: 2,
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: "transform 0.2s ease",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 glass-dark px-4 py-2 rounded-full mb-8 neon-border-blue"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-rajdhani tracking-widest text-white/70">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>

        {/* Holographic Avatar */}
        <motion.div
          className="mx-auto mb-8 relative w-36 h-36 sm:w-44 sm:h-44"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, type: "spring" }}
        >
          {/* Rotating rings */}
          <div className="absolute inset-0 rounded-full border-2 border-[#d97706]/40 animate-spin" style={{ animationDuration: "8s" }} />
          <div className="absolute inset-2 rounded-full border border-[var(--neon-blue)]/30 animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }} />
          <div className="absolute inset-4 rounded-full border border-[#b45309]/20 animate-spin" style={{ animationDuration: "10s" }} />

          {/* Glow */}
          <div className="absolute inset-0 rounded-full animate-pulse-glow" />

          {/* Profile image */}
          <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-[#d97706]">
            <img
              src="/profile.jpg"
              alt="Nikhil Kumar"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to initials
                e.currentTarget.style.display = "none";
              }}
            />
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-blue)]/10 to-[#d97706]/20 mix-blend-overlay" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-[var(--neon-blue)] text-sm font-orbitron tracking-[0.3em] mb-2">
            HELLO, I'M
          </p>
          <h1 className="font-orbitron font-black mb-4" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1.1 }}>
            <span className="text-white">Nikhil </span>
            <span className="gradient-text">Kumar</span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl sm:text-2xl font-rajdhani font-medium mb-8 h-8 tracking-wider"
        >
          <TypewriterText roles={ROLES} />
        </motion.div>

        {/* Short bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-white/50 max-w-xl mx-auto mb-10 font-rajdhani text-lg leading-relaxed"
        >
          {PERSONAL_INFO.shortBio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={scrollToAbout}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,58,237,0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-gradient-to-r from-[var(--cosmic-purple)] to-[#451a03] rounded-full font-orbitron text-sm tracking-widest text-white font-bold transition-all duration-300"
          >
            EXPLORE MY UNIVERSE
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3.5 glass-dark rounded-full font-orbitron text-sm tracking-widest text-[var(--neon-blue)] neon-border-blue hover:bg-[var(--neon-blue)]/10 transition-all duration-300"
          >
            <Download size={16} />
            DOWNLOAD RESUME
          </motion.a>

          <motion.button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3.5 glass-dark rounded-full font-orbitron text-sm tracking-widest text-[var(--galactic-pink)] border border-[#b45309]/30 hover:bg-[#b45309]/10 transition-all duration-300"
          >
            CONTACT ME
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex items-center justify-center gap-5 mt-10"
        >
          {[
            { icon: <GithubIcon />, href: PERSONAL_INFO.github, color: "#fff" },
            { icon: <LinkedinIcon />, href: PERSONAL_INFO.linkedin, color: "#0EA5E9" },
            { icon: <Mail size={20} />, href: `mailto:${PERSONAL_INFO.email}`, color: "var(--galactic-pink)" },
          ].map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, color: s.color }}
              className="text-white/40 hover:text-white transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-[var(--neon-blue)] transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ zIndex: 2 }}
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </motion.button>
    </section>
  );
}
