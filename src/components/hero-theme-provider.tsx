"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type HeroTheme = "reactbits" | "pillar";

type HeroThemeContextValue = { theme: HeroTheme; setTheme: (theme: HeroTheme) => void };
const HeroThemeContext = createContext<HeroThemeContextValue | null>(null);

export function HeroThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<HeroTheme>("pillar");
  return <HeroThemeContext.Provider value={{ theme, setTheme }}>{children}</HeroThemeContext.Provider>;
}

export function useHeroTheme() {
  const value = useContext(HeroThemeContext);
  if (!value) throw new Error("useHeroTheme must be used within HeroThemeProvider");
  return value;
}
