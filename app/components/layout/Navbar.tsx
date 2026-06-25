"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-dark border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            whileHover={{ scale: 1.05 }}
            className="font-orbitron font-bold text-xl gradient-text cursor-pointer"
          >
            NK<span className="text-[var(--neon-blue)]">.</span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="text-white/70 hover:text-[var(--neon-blue)] text-sm font-rajdhani tracking-widest transition-colors duration-300 uppercase relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--neon-blue)] group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            {/* Recruiter Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRecruiterMode(!recruiterMode)}
              className={`text-xs px-3 py-1.5 rounded-full font-rajdhani tracking-widest transition-all duration-300 border ${
                recruiterMode
                  ? "bg-[#10B981]/20 border-[#10B981] text-[#10B981]"
                  : "border-white/20 text-white/50 hover:border-[#10B981] hover:text-[#10B981]"
              }`}
            >
              {recruiterMode ? "✓ RECRUITER" : "RECRUITER MODE"}
            </motion.button>
          </div>

          {/* Mobile menu btn */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-4 right-4 z-50 glass-dark rounded-2xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="text-white/80 hover:text-[var(--neon-blue)] font-rajdhani tracking-widest uppercase text-left transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
