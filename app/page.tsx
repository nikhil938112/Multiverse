"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import AIOrb from "./components/layout/AIOrb";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Resume from "./components/sections/Resume";
import Contact from "./components/sections/Contact";
import FutureVision from "./components/sections/FutureVision";
import MusicToggle from "./components/layout/MusicToggle";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  // Custom cursor
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
      if (followerRef.current) {
        setTimeout(() => {
          if (followerRef.current) {
            followerRef.current.style.left = e.clientX + "px";
            followerRef.current.style.top = e.clientY + "px";
          }
        }, 80);
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Loading sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={followerRef} className="cursor-follower" />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-screen"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-8">
              {/* Cosmic spinner */}
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#d97706] animate-spin" />
                <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#f59e0b] animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
                <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-[#b45309] animate-spin" style={{ animationDuration: "1.5s" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--cosmic-purple)] to-[#f59e0b] animate-pulse" />
                </div>
              </div>

              <div className="text-center">
                <h1 className="font-orbitron text-2xl font-bold gradient-text mb-2">
                  INITIALIZING
                </h1>
                <p className="text-[var(--neon-blue)] text-sm font-rajdhani tracking-widest">
                  LOADING ... {Math.min(100, Math.round(loadProgress))}%
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--cosmic-purple)] via-[var(--neon-blue)] to-[var(--galactic-pink)]"
                  style={{ width: `${Math.min(100, loadProgress)}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              <p className="text-white/30 text-xs font-rajdhani tracking-widest">
                NIKHIL KUMAR • PORTFOLIO v2.0
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <Navbar />
          <AIOrb />
          <MusicToggle />

          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Resume />
          <Contact />
          <FutureVision />

          {/* Footer */}
          <footer className="py-8 text-center border-t border-white/5">
            <p className="text-white/30 text-sm font-rajdhani tracking-widest">
              © 2026 NIKHIL KUMAR • BUILT WITH ❤️ IN THE MULTIVERSE
            </p>
          </footer>
        </motion.main>
      )}
    </>
  );
}
