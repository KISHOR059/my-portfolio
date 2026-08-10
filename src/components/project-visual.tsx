"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Bot, Check, MapPin, Network, Sparkles, Zap } from "lucide-react";
import { type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

function EvChargingVisual({ calmMotion }: { calmMotion: boolean }) {
  const pins = ["left-[19%] top-[29%]", "left-[53%] top-[18%]", "left-[72%] top-[48%]"];

  return (
    <div className="visual-window overflow-hidden">
      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><motion.span animate={calmMotion ? undefined : { y: [0, -2, 0], opacity: [.78, 1, .78] }} transition={{ duration: 2.2, repeat: Infinity }} className="grid size-7 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300"><Zap className="size-3.5" /></motion.span><div><p className="text-[9px] font-semibold text-white">EV Charge Map</p><p className="text-[7px] text-slate-500">Stations near you</p></div></div><span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/[.07] px-2 py-1 text-[7px] text-cyan-300"><motion.span animate={calmMotion ? undefined : { opacity: [.4, 1, .4] }} transition={{ duration: 1.6, repeat: Infinity }} className="size-1 rounded-full bg-cyan-300" />12 available</span></div>
      <div className="relative mt-3 h-28 overflow-hidden rounded-xl border border-cyan-300/10 bg-[#081225]">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(24deg,transparent_46%,rgba(103,232,249,.18)_47%,rgba(103,232,249,.18)_49%,transparent_50%),linear-gradient(112deg,transparent_46%,rgba(59,130,246,.16)_47%,rgba(59,130,246,.16)_49%,transparent_50%)] [background-size:54px_42px]" />
        <svg className="absolute inset-0 size-full" viewBox="0 0 300 112" fill="none" aria-hidden="true"><motion.path initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.35, ease: "easeOut" }} d="M-10 91C38 72 54 92 95 60C138 27 164 78 205 45C244 14 264 39 315 13" stroke="rgba(103,232,249,.52)" strokeWidth="2" strokeDasharray="5 4"/><motion.path initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.15, delay: .18, ease: "easeOut" }} d="M22 8C49 37 66 43 94 60C128 81 152 89 192 116" stroke="rgba(124,58,237,.35)" strokeWidth="1.2"/></svg>
        {pins.map((position, index) => <motion.span key={position} className={cn("absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-200/25 bg-[#0c1930] text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,.25)]", position)} animate={calmMotion ? undefined : { y: [0, -3, 0] }} transition={{ duration: 2 + index * .35, delay: index * .16, repeat: Infinity }}><motion.span animate={calmMotion ? undefined : { scale: [1, 1.8], opacity: [.25, 0] }} transition={{ duration: 1.8, delay: index * .3, repeat: Infinity }} className="absolute inset-0 rounded-full border border-cyan-300/35" /><MapPin className="size-3" /></motion.span>)}
        <div className="absolute bottom-2 left-2 rounded-lg border border-white/[.06] bg-[#060a17]/80 px-2 py-1.5 backdrop-blur-md"><span className="block text-[6px] text-slate-500">Nearest station</span><strong className="text-[8px] text-white">0.8 km · 4 slots</strong></div>
      </div>
      <div className="mt-2 flex gap-1.5">{["10:30", "11:00", "11:30", "12:00"].map((time, index) => <motion.span key={time} initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: .28 + index * .07 }} className={cn("flex-1 rounded-md border px-1 py-1.5 text-center text-[7px]", index === 1 ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,.08)]" : "border-white/[.05] bg-white/[.02] text-slate-500")}>{time}</motion.span>)}</div>
    </div>
  );
}

function BharatNetVisual({ calmMotion }: { calmMotion: boolean }) {
  return (
    <div className="visual-window overflow-hidden">
      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><motion.span animate={calmMotion ? undefined : { scale: [.9, 1.1, .9], opacity: [.8, 1, .8] }} transition={{ duration: 2.4, repeat: Infinity }} className="grid size-7 place-items-center rounded-lg bg-blue-400/10 text-blue-300"><Network className="size-3.5" /></motion.span><div><p className="text-[9px] font-semibold text-white">BharatNet / Network Operations</p><p className="mt-0.5 text-[7px] text-slate-500">National fiber infrastructure</p></div></div><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-1 text-[7px] text-emerald-300"><motion.span animate={calmMotion ? undefined : { scale: [.8, 1.25, .8], opacity: [.45, 1, .45] }} transition={{ duration: 1.7, repeat: Infinity }} className="size-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />Live network</span></div>
      <div className="relative mt-3 h-28 overflow-hidden rounded-xl border border-blue-300/10 bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,.18),rgba(7,11,28,.9)_70%)]">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(96,165,250,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,.35)_1px,transparent_1px)] [background-size:18px_18px]" />
        <svg className="absolute inset-0 size-full" viewBox="0 0 300 128" fill="none" aria-hidden="true"><motion.path initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} animate={calmMotion ? undefined : { strokeDashoffset: [0, -24] }} viewport={{ once: true }} transition={calmMotion ? { duration: 1.4, ease: "easeOut" } : { pathLength: { duration: 1.4, ease: "easeOut" }, opacity: { duration: .4 }, strokeDashoffset: { duration: 2.4, repeat: Infinity, ease: "linear" } }} d="M28 93L78 50L130 72L178 30L225 62L276 35" stroke="url(#network-line)" strokeWidth="1.5" strokeDasharray="4 4"/><motion.path initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: .18, ease: "easeOut" }} d="M78 50L94 104L130 72L165 104L225 62L250 103" stroke="rgba(103,232,249,.35)" strokeWidth="1"/><defs><linearGradient id="network-line" x1="28" y1="93" x2="276" y2="35"><stop stopColor="#7C3AED"/><stop offset=".52" stopColor="#3B82F6"/><stop offset="1" stopColor="#67E8F9"/></linearGradient></defs></svg>
        {["left-[8%] top-[69%]", "left-[24%] top-[31%]", "left-[41%] top-[48%]", "left-[57%] top-[16%]", "left-[73%] top-[40%]", "left-[90%] top-[20%]"].map((position, nodeIndex) => <motion.span key={position} initial={{ opacity: 0, scale: .35 }} whileInView={{ opacity: 1, scale: 1 }} animate={calmMotion ? undefined : { opacity: [.8, 1, .8], scale: [1, 1.12, 1] }} viewport={{ once: true }} transition={calmMotion ? { duration: .4, delay: .25 + nodeIndex * .08 } : { duration: 2, delay: nodeIndex * .22, repeat: Infinity, ease: "easeInOut" }} className={cn("absolute grid size-3 place-items-center rounded-full border border-cyan-200/50 bg-[#0b1730]", position)}><span className={cn("size-1 rounded-full", nodeIndex === 3 ? "bg-violet-300" : "bg-cyan-300")} /></motion.span>)}
      </div>
      <div className="mt-2 flex gap-1.5">{["Multi-region", "99.8% synced", "Real-time"].map((item, index) => <motion.span key={item} initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: .28 + index * .07 }} className={cn("flex-1 rounded-md border px-1 py-1.5 text-center text-[7px]", index === 0 ? "border-blue-300/30 bg-blue-400/10 text-blue-200 shadow-[0_0_12px_rgba(59,130,246,.1)]" : "border-white/[.05] bg-white/[.02] text-slate-500")}>{item}</motion.span>)}</div>
    </div>
  );
}

function AetherMindVisual({ calmMotion }: { calmMotion: boolean }) {
  const tasks = [
    { name: "Ship AI planner MVP", time: "09:30", tag: "High", done: false },
    { name: "Weekly review", time: "17:00", tag: "Low", done: true },
  ];

  return (
    <div className="visual-window overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2"><motion.span animate={calmMotion ? undefined : { scale: [1, 1.12, 1], opacity: [.8, 1, .8] }} transition={{ duration: 2.2, repeat: Infinity }} className="grid size-7 place-items-center rounded-lg bg-violet-400/10 text-violet-300"><Sparkles className="size-3.5" /></motion.span><div><p className="text-[9px] font-semibold text-white">AetherMind</p><p className="text-[7px] text-slate-500">AI productivity workspace</p></div></div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-300/15 bg-violet-400/[.07] px-2 py-1 text-[7px] text-violet-200"><motion.span animate={calmMotion ? undefined : { opacity: [.45, 1, .45] }} transition={{ duration: 1.6, repeat: Infinity }} className="size-1 rounded-full bg-violet-300 shadow-[0_0_7px_#a78bfa]" />AI online</span>
      </div>
      <div className="mt-3 grid h-28 grid-cols-[.82fr_1.18fr] gap-2">
        <div className="flex flex-col rounded-xl border border-violet-300/15 bg-[radial-gradient(circle_at_15%_0%,rgba(139,92,246,.16),rgba(8,11,25,.9)_65%)] p-2.5">
          <div className="flex items-center gap-1.5"><motion.span animate={calmMotion ? undefined : { y: [0, -2, 0] }} transition={{ duration: 2.4, repeat: Infinity }} className="grid size-5 shrink-0 place-items-center rounded-lg border border-violet-300/20 bg-violet-400/10 text-violet-300"><Bot className="size-2.5" /></motion.span><p className="text-[7px] font-semibold text-white">Plan today</p></div>
          <p className="mt-1.5 text-[6.5px] leading-[1.5] text-slate-400">Broke down 3 high-impact tasks and rescheduled the low-priority meeting.</p>
          <div className="mt-auto flex flex-wrap gap-1">{["Daily plan", "Smart reschedule"].map((chip) => <span key={chip} className="rounded-md border border-white/[.06] bg-white/[.03] px-1.5 py-0.5 text-[6px] text-slate-400">{chip}</span>)}</div>
        </div>
        <div className="flex flex-col justify-center gap-1.5">{tasks.map((task, index) => <motion.div key={task.name} initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .45, delay: .12 + index * .09 }} className="flex items-center gap-2 rounded-lg border border-white/[.05] bg-white/[.025] px-2 py-1.5"><span className={cn("grid size-3.5 shrink-0 place-items-center rounded-full border", task.done ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-300" : "border-violet-300/35 bg-violet-400/10 text-transparent")}><Check className="size-2" /></span><span className={cn("min-w-0 flex-1 truncate text-[7px]", task.done ? "text-slate-500 line-through" : "text-slate-300")}>{task.name}</span><span className="font-mono text-[6px] text-slate-600">{task.time}</span></motion.div>)}</div>
      </div>
      <div className="mt-2 flex gap-1.5">{["Plan: 3", "Focus: 82%", "Local LLM"].map((item, index) => <motion.span key={item} initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: .28 + index * .07 }} className={cn("flex-1 rounded-md border px-1 py-1.5 text-center text-[7px]", index === 0 ? "border-violet-300/30 bg-violet-400/10 text-violet-200 shadow-[0_0_12px_rgba(139,92,246,.08)]" : "border-white/[.05] bg-white/[.02] text-slate-500")}>{item}</motion.span>)}</div>
    </div>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  const mobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const inView = useInView(visualRef, { margin: "100px 0px" });
  const calmMotion = mobile || Boolean(reducedMotion) || !inView;
  return (
    <div ref={visualRef}>
      {project.visual === "commerce" ? <EvChargingVisual calmMotion={calmMotion} /> : project.visual === "aiProductivity" ? <AetherMindVisual calmMotion={calmMotion} /> : <BharatNetVisual calmMotion={calmMotion} />}
    </div>
  );
}
