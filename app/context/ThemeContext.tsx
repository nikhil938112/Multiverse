"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Theme, THEMES, DEFAULT_THEME } from "@/app/lib/themes";

interface ThemeContextType {
  activeTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  activeTheme: DEFAULT_THEME,
  setTheme: () => {},
});

function applyThemeVars(theme: Theme) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<Theme>(DEFAULT_THEME);

  // On mount: restore saved theme from localStorage
  useEffect(() => {
    const savedId = localStorage.getItem("portfolio-theme");
    if (savedId) {
      const found = THEMES.find((t) => t.id === savedId);
      if (found) {
        applyThemeVars(found);
        setActiveTheme(found);
      }
    } else {
      // Apply default theme vars on first load
      applyThemeVars(DEFAULT_THEME);
    }
  }, []);

  const setTheme = (theme: Theme) => {
    applyThemeVars(theme);
    setActiveTheme(theme);
    localStorage.setItem("portfolio-theme", theme.id);
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
