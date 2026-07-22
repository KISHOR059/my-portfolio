"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, RotateCcw, TerminalSquare } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const tabs = ["profile.ts", "skills.json", "building.md"] as const;
type Tab = (typeof tabs)[number];
type Accent = "violet" | "blue" | "cyan";

const accents: Record<Accent, { dot: string; border: string; glow: string; text: string; button: string }> = {
  violet: { dot: "bg-violet-400", border: "border-violet-300/20", glow: "shadow-[0_24px_90px_rgba(124,58,237,.18)]", text: "text-violet-300", button: "bg-violet-500" },
  blue: { dot: "bg-blue-400", border: "border-blue-300/20", glow: "shadow-[0_24px_90px_rgba(59,130,246,.17)]", text: "text-blue-300", button: "bg-blue-500" },
  cyan: { dot: "bg-cyan-400", border: "border-cyan-300/20", glow: "shadow-[0_24px_90px_rgba(34,211,238,.14)]", text: "text-cyan-300", button: "bg-cyan-500" },
};

function ProfileCode() {
  return <code className="block"><span className="code-muted">01</span> <span className="code-pink">const</span> <span className="text-white">engineer</span> <span className="code-muted">= {'{'}</span>{"\n"}<span className="code-muted">02</span>   <span className="code-cyan">name</span>: <span className="code-lilac">&quot;Kishor&quot;</span>,{"\n"}<span className="code-muted">03</span>   <span className="code-cyan">role</span>: <span className="code-lilac">&quot;Software Engineer&quot;</span>,{"\n"}<span className="code-muted">04</span>   <span className="code-cyan">focus</span>: <span className="code-lilac">&quot;real-world systems&quot;</span>,{"\n"}<span className="code-muted">05</span>   <span className="code-cyan">available</span>: <span className="code-violet">true</span>,{"\n"}<span className="code-muted">06</span> <span className="code-muted">{'}'}</span>;</code>;
}

function SkillsCode() {
  return <code className="block"><span className="code-muted">01</span> <span className="code-muted">{'{'}</span>{"\n"}<span className="code-muted">02</span>   <span className="code-lilac">&quot;backend&quot;</span>: [<span className="code-lilac">&quot;Laravel&quot;</span>, <span className="code-lilac">&quot;Java&quot;</span>],{"\n"}<span className="code-muted">03</span>   <span className="code-lilac">&quot;frontend&quot;</span>: [<span className="code-lilac">&quot;React&quot;</span>, <span className="code-lilac">&quot;Next.js&quot;</span>],{"\n"}<span className="code-muted">04</span>   <span className="code-lilac">&quot;cloud&quot;</span>: [<span className="code-lilac">&quot;AWS&quot;</span>, <span className="code-lilac">&quot;Docker&quot;</span>],{"\n"}<span className="code-muted">05</span>   <span className="code-lilac">&quot;specialty&quot;</span>: <span className="code-lilac">&quot;REST + GIS&quot;</span>{"\n"}<span className="code-muted">06</span> <span className="code-muted">{'}'}</span></code>;
}

function BuildingCode() {
  return <code className="block"><span className="code-muted">01</span> <span className="code-violet"># Currently building</span>{"\n"}<span className="code-muted">02</span>{"\n"}<span className="code-muted">03</span> <span className="text-white">BSNL BharatNet Phase III</span>{"\n"}<span className="code-muted">04</span> <span className="code-lilac">National fiber infrastructure</span>{"\n"}<span className="code-muted">05</span>{"\n"}<span className="code-muted">06</span> <span className="code-cyan">✓</span> Laravel platform{"\n"}<span className="code-muted">07</span> <span className="code-cyan">✓</span> GIS visualization{"\n"}<span className="code-muted">08</span> <span className="code-cyan">✓</span> Web + mobile APIs</code>;
}

export function InteractiveDeveloperPanel() {
  const [active, setActive] = useState<Tab>("profile.ts");
  const [accent, setAccent] = useState<Accent>("violet");
  const [menuOpen, setMenuOpen] = useState(false);
  const mobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useReducedMotion();
  const calmMotion = mobile || reducedMotion;
  const theme = accents[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: .97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: .9, delay: .28, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative w-full overflow-visible rounded-2xl border bg-[#120f17]/70 backdrop-blur-2xl", theme.border, theme.glow)}
    >
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-white/[.07] px-3 sm:px-4">
        <div className="flex items-center gap-2.5"><span className="flex gap-1.5" aria-hidden="true"><span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/10" /><span className={cn("size-2.5 rounded-full shadow-[0_0_10px_currentColor]", theme.dot)} /></span><span className="hidden font-mono text-[10px] text-slate-500 sm:inline">developer.config</span></div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setActive("profile.ts"); setAccent("violet"); }} className="grid size-7 place-items-center rounded-md border border-white/[.06] text-slate-500 transition-colors hover:bg-white/[.06] hover:text-white" aria-label="Reset code panel"><RotateCcw className="size-3" /></button>
          <div className="relative">
            <button onClick={() => setMenuOpen((value) => !value)} className="flex h-7 items-center gap-2 rounded-md border border-white/[.06] bg-white/[.025] px-2.5 font-mono text-[10px] text-slate-400 hover:bg-white/[.06]">{active}<ChevronDown className={cn("size-3 transition-transform", menuOpen && "rotate-180")} /></button>
            <AnimatePresence>{menuOpen && <motion.div initial={{ opacity: 0, y: -5, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: .97 }} className="absolute right-0 top-9 z-30 w-36 rounded-lg border border-white/10 bg-[#17121d]/95 p-1 shadow-2xl backdrop-blur-xl">{tabs.map((tab) => <button key={tab} onClick={() => { setActive(tab); setMenuOpen(false); }} className={cn("flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left font-mono text-[10px] text-slate-400 hover:bg-white/[.06] hover:text-white", active === tab && "text-white")}>{tab}{active === tab && <Check className="size-3 text-cyan-300" />}</button>)}</motion.div>}</AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex gap-1 border-b border-white/[.055] px-2 pt-2 sm:px-3">
        {tabs.map((tab) => <button key={tab} onClick={() => setActive(tab)} className={cn("relative rounded-t-lg px-2.5 py-2 font-mono text-[9px] text-slate-600 transition-colors sm:px-3 sm:text-[10px]", active === tab && "bg-white/[.035] text-slate-200")}>{tab}{active === tab && <motion.span layoutId="code-tab" className={cn("absolute inset-x-2 bottom-0 h-px", theme.dot)} />}</button>)}
      </div>

      <div className="min-h-[250px] overflow-hidden px-4 py-5 font-mono text-[11px] leading-7 sm:min-h-[285px] sm:px-6 sm:py-6 sm:text-[13px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.pre key={active} initial={calmMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={calmMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: .25 }} className="m-0 overflow-x-auto whitespace-pre text-slate-300">
            {active === "profile.ts" ? <ProfileCode /> : active === "skills.json" ? <SkillsCode /> : <BuildingCode />}
          </motion.pre>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between border-t border-white/[.06] px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[9px] text-slate-600"><TerminalSquare className="size-3" /> Click tabs to explore</div>
        <div className="flex items-center gap-1.5"><span className="mr-1 hidden font-mono text-[9px] text-slate-600 sm:inline">accent</span>{(Object.keys(accents) as Accent[]).map((color) => <button key={color} onClick={() => setAccent(color)} aria-label={`Use ${color} accent`} className={cn("size-3 rounded-full transition-transform hover:scale-125", accents[color].button, accent === color && "ring-2 ring-white/50 ring-offset-2 ring-offset-[#120f17]")} />)}</div>
      </div>
    </motion.div>
  );
}
