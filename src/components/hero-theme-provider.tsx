"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type HeroTheme = "Halo" | "pillar" | "lightfall" | "rays" | "softAurora";

type HeroThemeContextValue = {
  theme: HeroTheme;
  setTheme: (theme: HeroTheme) => void;
  showProfilePic: boolean;
  setShowProfilePic: (val: boolean) => void;
  autoRotate: boolean;
  setAutoRotate: (val: boolean) => void;
  autoRotateInterval: number;
  setAutoRotateInterval: (val: number) => void;
};
const HeroThemeContext = createContext<HeroThemeContextValue | null>(null);

export function HeroThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<HeroTheme>("pillar");
  const [showProfilePic, setShowProfilePic] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [autoRotateInterval, setAutoRotateInterval] = useState(8);

  useEffect(() => {
    if (!autoRotate) return;
    const themes: HeroTheme[] = ["pillar", "Halo", "lightfall", "rays", "softAurora"];
    const intervalId = setInterval(() => {
      setTheme((currentTheme) => {
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        return themes[nextIndex];
      });
    }, autoRotateInterval * 1000);
    return () => clearInterval(intervalId);
  }, [autoRotate, autoRotateInterval, theme]);

  // In production, always force it to true; only allow toggling in dev.
  const isDev = process.env.NODE_ENV === "development";
  const actualShowProfilePic = isDev ? showProfilePic : true;

  return (
    <HeroThemeContext.Provider
      value={{
        theme,
        setTheme,
        showProfilePic: actualShowProfilePic,
        setShowProfilePic,
        autoRotate,
        setAutoRotate,
        autoRotateInterval,
        setAutoRotateInterval,
      }}
    >
      {children}
    </HeroThemeContext.Provider>
  );
}

export function useHeroTheme() {
  const value = useContext(HeroThemeContext);
  if (!value) throw new Error("useHeroTheme must be used within HeroThemeProvider");
  return value;
}
