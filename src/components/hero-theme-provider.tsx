"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type HeroTheme = "Halo" | "pillar" | "lightfall" | "rays" | "softAurora";

type HeroThemeContextValue = {
  theme: HeroTheme;
  setTheme: (theme: HeroTheme) => void;
  showProfilePic: boolean;
  setShowProfilePic: (val: boolean) => void;
};
const HeroThemeContext = createContext<HeroThemeContextValue | null>(null);

export function HeroThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<HeroTheme>("pillar");
  const [showProfilePic, setShowProfilePic] = useState(true);

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
