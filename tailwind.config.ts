import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "space-black":   "#0d0a06",
        "deep-space":    "#120d07",
        "cosmic-purple": "#d97706",
        "neon-blue":     "#f59e0b",
        "electric-cyan": "#fbbf24",
        "galactic-pink": "#b45309",
        "star-white":    "#fef3c7",
        "nebula-violet": "#451a03",
        "aurora-green":  "#34d399",
      },
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
        inter: ["Inter", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "rotate-slow": "rotateSlow 20s linear infinite",
        "orbit": "orbit 8s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
        "gradient-x": "gradientX 4s ease infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px #d97706, 0 0 20px rgba(217,119,6,0.5)" },
          "50%":      { boxShadow: "0 0 30px #f59e0b, 0 0 60px rgba(245,158,11,0.5), 0 0 90px rgba(245,158,11,0.2)" },
        },
        rotateSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.8)" },
        },
      },
      backgroundImage: {
        "cosmic-gradient": "radial-gradient(ellipse at center, #1c1006 0%, #0d0a06 70%)",
        "nebula-gradient":  "radial-gradient(ellipse at 60% 40%, #d9770620 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #f59e0b0d 0%, transparent 50%)",
        "glass":            "linear-gradient(135deg, rgba(245,158,11,0.07), rgba(217,119,6,0.03))",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "neon-purple": "0 0 20px rgba(217,119,6,0.6), 0 0 40px rgba(217,119,6,0.25)",
        "neon-blue":   "0 0 20px rgba(245,158,11,0.6), 0 0 40px rgba(245,158,11,0.25)",
        "neon-pink":   "0 0 20px rgba(251,191,36,0.5), 0 0 40px rgba(251,191,36,0.2)",
        "glass":       "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(245,158,11,0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
