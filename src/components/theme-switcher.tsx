"use client";

import { useEffect, useRef, useState } from "react";
import { Check, WandSparkles } from "lucide-react";
import { useHeroTheme, type HeroTheme } from "@/components/hero-theme-provider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const options: { value: HeroTheme; label: string; description: string }[] = [
  { value: "pillar", label: "Monolith", description: "Light pillar with dot field" },
  { value: "Halo", label: "Halo", description: "Classic gradient background" },
  { value: "lightfall", label: "Starfall", description: "Falling light streaks tunnel" },
  { value: "rays", label: "Beacon", description: "Radiating light rays from above" },
  { value: "softAurora", label: "Soft Aurora", description: "Silky animated aurora glow" },
];

export function ThemeSwitcher() {
  const {
    theme,
    setTheme,
    showProfilePic,
    setShowProfilePic,
    autoRotate,
    setAutoRotate,
    autoRotateInterval,
    setAutoRotateInterval,
  } = useHeroTheme();
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => event.target instanceof Node && !pickerRef.current?.contains(event.target) && setOpen(false);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <div ref={pickerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group grid size-9 place-items-center rounded-[10px] border border-white/[.08] bg-[#120f17]/50 text-slate-400 shadow-[0_2px_16px_rgba(0,0,0,.18)] backdrop-blur-2xl transition-[border-color,background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-violet-300/35 hover:bg-violet-500/10 hover:text-violet-200"
        aria-label="Choose hero background theme"
        aria-expanded={open}
      >
        <WandSparkles className="size-[17px] transition-transform duration-300 group-hover:rotate-12" />
      </button>
      {open && (
        <div className="fixed right-3 top-[4.75rem] z-50 w-52 rounded-2xl border border-white/[.12] bg-[#191722] p-2.5 shadow-[0_22px_60px_rgba(0,0,0,.55),0_0_30px_rgba(179,0,179,.18)]">
          <div className="mb-2 flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[.16em] text-slate-300">theme=</span><span className="font-mono text-[9px] text-slate-500">&quot;{theme}&quot;</span></div>
          <div className="flex flex-col gap-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setTheme(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left transition-colors",
                  theme === option.value
                    ? "border-violet-300/30 bg-violet-500/15 text-white"
                    : "border-transparent text-slate-300 hover:bg-white/[.06] hover:text-white",
                )}
                aria-pressed={theme === option.value}
              >
                <span className="min-w-0">
                  <span className="block text-xs font-medium">{option.label}</span>
                  <span className="block truncate text-[10px] text-slate-500">{option.description}</span>
                </span>
                {theme === option.value && <Check className="size-3.5 shrink-0 text-violet-300" />}
              </button>
            ))}
          </div>

          <div className="my-2 h-px bg-white/[.08]" />
          <div className="flex items-center justify-between px-1 py-1">
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-slate-300">Auto Cycle</span>
              <span className="text-[8px] text-slate-500">Rotate themes</span>
            </div>
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                autoRotate ? "bg-violet-500" : "bg-slate-700"
              )}
              aria-label="Toggle auto theme rotation"
            >
              <span
                className={cn(
                  "pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  autoRotate ? "translate-x-4" : "translate-x-0"
                )}
              />
            </button>
          </div>

          {autoRotate && (
            <div className="mt-2 flex items-center justify-between gap-1 rounded-xl bg-white/[0.03] p-1.5 px-2">
              <span className="font-mono text-[8px] uppercase tracking-wider text-slate-400">Delay</span>
              <div className="flex gap-1">
                {[5, 8, 15].map((seconds) => (
                  <button
                    key={seconds}
                    type="button"
                    onClick={() => setAutoRotateInterval(seconds)}
                    className={cn(
                      "rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold transition-colors",
                      autoRotateInterval === seconds
                        ? "bg-violet-500/25 text-violet-300"
                        : "text-slate-500 hover:bg-white/[0.05] hover:text-white"
                    )}
                  >
                    {seconds}s
                  </button>
                ))}
              </div>
            </div>
          )}

          {process.env.NODE_ENV === "development" && (
            <>
              <div className="my-2 h-px bg-white/[.08]" />
              <div className="mb-1.5 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[.16em] text-amber-400">dev_settings=</span>
              </div>
              <button
                type="button"
                onClick={() => setShowProfilePic(!showProfilePic)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left font-mono text-[10px] transition-colors",
                  showProfilePic
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                    : "border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                )}
              >
                <span>Profile Photo</span>
                <span className="font-bold">{showProfilePic ? "ON" : "OFF"}</span>
              </button>
            </>
          )}

          {autoRotate && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-2xl">
              <motion.div
                key={`${theme}-${autoRotateInterval}`}
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: autoRotateInterval, ease: "linear" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
