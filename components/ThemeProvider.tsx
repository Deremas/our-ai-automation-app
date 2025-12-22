"use client";

import React from "react";
import { getThemePref, setThemePref, type ThemePref } from "@/lib/prefsCookies";

type ThemeCtx = {
  theme: ThemePref;
  setTheme: (t: ThemePref) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemePref>("light");

  // Initialize from cookie
  React.useEffect(() => {
    const saved = getThemePref();
    const initial =
      saved ??
      (document.documentElement.classList.contains("dark") ? "dark" : "light");
    setThemeState(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const setTheme = (t: ThemePref) => {
    setThemeState(t);
    document.documentElement.classList.toggle("dark", t === "dark");
    setThemePref(t);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
