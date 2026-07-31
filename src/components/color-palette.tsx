"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Palette } from "lucide-react";
import { useAccentColor } from "@/components/accent-color-provider";

const presets = ["#A855F7", "#7C3AED", "#6366F1", "#3B82F6", "#38BDF8", "#34D399", "#EAB308", "#F97316", "#EF4444", "#EC4899"];

function hexToHsv(hex: string) {
  const value = hex.replace("#", "");
  const number = Number.parseInt(value, 16);
  const r = ((number >> 16) & 255) / 255;
  const g = ((number >> 8) & 255) / 255;
  const b = (number & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  let hue = 0;
  if (delta) hue = max === r ? 60 * (((g - b) / delta) % 6) : max === g ? 60 * ((b - r) / delta + 2) : 60 * ((r - g) / delta + 4);
  if (hue < 0) hue += 360;
  return { hue, saturation: max ? (delta / max) * 100 : 0, value: max * 100 };
}

function hsvToHex(hue: number, saturation: number, value: number) {
  const s = saturation / 100, v = value / 100, chroma = v * s, x = chroma * (1 - Math.abs((hue / 60) % 2 - 1)), m = v - chroma;
  const [r, g, b] = hue < 60 ? [chroma, x, 0] : hue < 120 ? [x, chroma, 0] : hue < 180 ? [0, chroma, x] : hue < 240 ? [0, x, chroma] : hue < 300 ? [x, 0, chroma] : [chroma, 0, x];
  return `#${[r, g, b].map((channel) => Math.round((channel + m) * 255).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

export function ColorPalette() {
  const { accentColor, setAccentColor } = useAccentColor();
  const [open, setOpen] = useState(false);
  const [hsv, setHsv] = useState(() => hexToHsv(accentColor));
  const pickerRef = useRef<HTMLDivElement>(null);
  const pointerFrameRef = useRef<number | null>(null);

  useEffect(() => setHsv(hexToHsv(accentColor)), [accentColor]);
  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => event.target instanceof Node && !pickerRef.current?.contains(event.target) && setOpen(false);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  const update = (next: Partial<typeof hsv>) => {
    const nextHsv = { ...hsv, ...next };
    setHsv(nextHsv);
    setAccentColor(hsvToHex(nextHsv.hue, nextHsv.saturation, nextHsv.value));
  };

  const updateFromPointer = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const saturation = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const value = Math.max(0, Math.min(100, 100 - ((event.clientY - rect.top) / rect.height) * 100));
    if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = requestAnimationFrame(() => {
      update({ saturation, value });
      pointerFrameRef.current = null;
    });
  };

  return <div ref={pickerRef} className="relative">
    <button type="button" onClick={() => setOpen((value) => !value)} className="group grid size-9 place-items-center rounded-[10px] border border-white/[.08] bg-[#120f17]/50 text-slate-400 shadow-[0_2px_16px_rgba(0,0,0,.18)] backdrop-blur-2xl transition-[border-color,background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-violet-300/35 hover:bg-violet-500/10 hover:text-violet-200" aria-label="Open color palette" aria-expanded={open}><Palette className="size-[17px] transition-transform duration-300 group-hover:rotate-12" /></button>
    {open && <div className="absolute right-[-8px] top-[calc(100%+10px)] z-50 w-48 rounded-2xl border border-white/[.12] bg-[#191722] p-2.5 shadow-[0_22px_60px_rgba(0,0,0,.55),0_0_30px_rgba(179,0,179,.18)]">
      <div className="mb-2 flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[.16em] text-slate-300">color=</span><span className="font-mono text-[9px] text-slate-500">&quot;{accentColor}&quot;</span></div>
      <button type="button" className="relative block h-24 w-full touch-none cursor-crosshair overflow-hidden rounded-lg" style={{ backgroundColor: `hsl(${hsv.hue} 100% 50%)`, backgroundImage: "linear-gradient(to right,#fff,transparent),linear-gradient(to top,#000,transparent)" }} aria-label="Choose saturation and brightness" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); updateFromPointer(event); }} onPointerMove={(event) => { if (event.buttons) updateFromPointer(event); }} onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}><span className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,.45)]" style={{ left: `${hsv.saturation}%`, top: `${100 - hsv.value}%` }} /></button>
      <input aria-label="Choose hue" type="range" min="0" max="360" value={hsv.hue} onChange={(event) => update({ hue: Number(event.target.value) })} className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-[linear-gradient(to_right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)]" />
      <div className="mt-3 grid grid-cols-8 gap-1">{presets.map((color) => <button key={color} type="button" onClick={() => setAccentColor(color)} className={accentColor.toUpperCase() === color ? "size-4 rounded-md border border-white transition-transform hover:scale-110" : "size-4 rounded-md border border-white/10 transition-transform hover:scale-110"} style={{ backgroundColor: color }} aria-label={`Use ${color}`} />)}</div>
    </div>}
  </div>;
}
