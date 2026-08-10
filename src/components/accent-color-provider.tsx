"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type AccentContextValue = { accentColor: string; setAccentColor: (color: string) => void };
const AccentContext = createContext<AccentContextValue | null>(null);

export function AccentColorProvider({ children }: { children: ReactNode }) {
  const [accentColor, setAccentColor] = useState("#A855F7");
  return <AccentContext.Provider value={{ accentColor, setAccentColor }}>{children}</AccentContext.Provider>;
}

export function useAccentColor() {
  const value = useContext(AccentContext);
  if (!value) throw new Error("useAccentColor must be used within AccentColorProvider");
  return value;
}
