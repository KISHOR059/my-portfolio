"use client";

import { motion } from "framer-motion";
import { CloudUpload, FileCode2, FileText, Folder, MapPin, Zap } from "lucide-react";
import { type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

function CloudStorageVisual({ calmMotion }: { calmMotion: boolean }) {
  const files = [
    { icon: Folder, name: "Projects", meta: "12 files", color: "text-violet-300" },
    { icon: FileCode2, name: "api-backup", meta: "2.4 MB", color: "text-cyan-300" },
    { icon: FileText, name: "brief.pdf", meta: "860 KB", color: "text-blue-300" },
  ];

  return (
    <div className="visual-window overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-lg bg-violet-400/10 text-violet-300"><CloudUpload className="size-3.5" /></span><div><p className="text-[9px] font-semibold text-white">CloudVault</p><p className="text-[7px] text-slate-500">Secure S3 storage</p></div></div>
        <span className="rounded-full border border-emerald-300/10 bg-emerald-400/[.06] px-2 py-1 text-[7px] text-emerald-300">Encrypted</span>
      </div>
      <div className="mt-3 grid grid-cols-[.72fr_1.28fr] gap-2">
        <div className="rounded-xl border border-dashed border-violet-300/20 bg-violet-500/[.045] p-3 text-center">
          <motion.div animate={calmMotion ? undefined : { y: [0, -3, 0] }} transition={{ duration: 2.4, repeat: Infinity }} className="mx-auto grid size-8 place-items-center rounded-full bg-violet-400/10 text-violet-300"><CloudUpload className="size-4" /></motion.div>
          <p className="mt-2 text-[8px] font-medium text-slate-300">Drop files</p><p className="mt-1 text-[6px] text-slate-600">or browse storage</p>
        </div>
        <div className="space-y-1.5">{files.map(({ icon: Icon, name, meta, color }) => <div key={name} className="flex items-center gap-2 rounded-lg border border-white/[.05] bg-white/[.025] px-2 py-1.5"><Icon className={cn("size-3", color)} /><span className="min-w-0 flex-1 truncate text-[7px] text-slate-300">{name}</span><span className="text-[6px] text-slate-600">{meta}</span></div>)}</div>
      </div>
      <div className="mt-3 rounded-lg border border-white/[.05] bg-[#070b1c]/60 px-2.5 py-2"><div className="flex justify-between text-[6px] text-slate-500"><span>Storage used</span><span>64.2 GB / 100 GB</span></div><div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[.05]"><motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-300" initial={{ width: 0 }} whileInView={{ width: "64%" }} viewport={{ once: true }} transition={{ duration: 1.2 }} /></div></div>
    </div>
  );
}

function EvChargingVisual({ calmMotion }: { calmMotion: boolean }) {
  const pins = ["left-[19%] top-[29%]", "left-[53%] top-[18%]", "left-[72%] top-[48%]"];

  return (
    <div className="visual-window overflow-hidden">
      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300"><Zap className="size-3.5" /></span><div><p className="text-[9px] font-semibold text-white">EV Charge Map</p><p className="text-[7px] text-slate-500">Stations near you</p></div></div><span className="rounded-full bg-cyan-400/[.07] px-2 py-1 text-[7px] text-cyan-300">12 available</span></div>
      <div className="relative mt-3 h-28 overflow-hidden rounded-xl border border-cyan-300/10 bg-[#081225]">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(24deg,transparent_46%,rgba(103,232,249,.18)_47%,rgba(103,232,249,.18)_49%,transparent_50%),linear-gradient(112deg,transparent_46%,rgba(59,130,246,.16)_47%,rgba(59,130,246,.16)_49%,transparent_50%)] [background-size:54px_42px]" />
        <svg className="absolute inset-0 size-full" viewBox="0 0 300 112" fill="none" aria-hidden="true"><path d="M-10 91C38 72 54 92 95 60C138 27 164 78 205 45C244 14 264 39 315 13" stroke="rgba(103,232,249,.52)" strokeWidth="2" strokeDasharray="5 4"/><path d="M22 8C49 37 66 43 94 60C128 81 152 89 192 116" stroke="rgba(124,58,237,.35)" strokeWidth="1.2"/></svg>
        {pins.map((position, index) => <motion.span key={position} className={cn("absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-200/25 bg-[#0c1930] text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,.25)]", position)} animate={calmMotion ? undefined : { y: [0, -3, 0] }} transition={{ duration: 2 + index * .35, repeat: Infinity }}><MapPin className="size-3" /></motion.span>)}
        <div className="absolute bottom-2 left-2 rounded-lg border border-white/[.06] bg-[#060a17]/80 px-2 py-1.5 backdrop-blur-md"><span className="block text-[6px] text-slate-500">Nearest station</span><strong className="text-[8px] text-white">0.8 km · 4 slots</strong></div>
      </div>
      <div className="mt-2 flex gap-1.5">{["10:30", "11:00", "11:30", "12:00"].map((time, index) => <span key={time} className={cn("flex-1 rounded-md border px-1 py-1.5 text-center text-[7px]", index === 1 ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-200" : "border-white/[.05] bg-white/[.02] text-slate-500")}>{time}</span>)}</div>
    </div>
  );
}

function BharatNetVisual() {
  return (
    <div className="visual-window overflow-hidden">
      <div className="flex items-center justify-between"><div><p className="text-[9px] font-semibold text-white">BharatNet / Network Operations</p><p className="mt-0.5 text-[7px] text-slate-500">National fiber infrastructure</p></div><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[7px] text-emerald-300">Live network</span></div>
      <div className="relative mt-4 h-32 overflow-hidden rounded-xl border border-blue-300/10 bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,.18),rgba(7,11,28,.9)_70%)]">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(96,165,250,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,.35)_1px,transparent_1px)] [background-size:18px_18px]" />
        <svg className="absolute inset-0 size-full" viewBox="0 0 300 128" fill="none" aria-hidden="true"><path d="M28 93L78 50L130 72L178 30L225 62L276 35" stroke="url(#network-line)" strokeWidth="1.5" strokeDasharray="4 4"/><path d="M78 50L94 104L130 72L165 104L225 62L250 103" stroke="rgba(103,232,249,.35)" strokeWidth="1"/><defs><linearGradient id="network-line" x1="28" y1="93" x2="276" y2="35"><stop stopColor="#7C3AED"/><stop offset=".52" stopColor="#3B82F6"/><stop offset="1" stopColor="#67E8F9"/></linearGradient></defs></svg>
        {["left-[8%] top-[69%]", "left-[24%] top-[31%]", "left-[41%] top-[48%]", "left-[57%] top-[16%]", "left-[73%] top-[40%]", "left-[90%] top-[20%]"].map((position, nodeIndex) => <span key={position} className={cn("absolute grid size-3 place-items-center rounded-full border border-cyan-200/50 bg-[#0b1730] shadow-[0_0_12px_rgba(34,211,238,.55)]", position)}><span className={cn("size-1 rounded-full", nodeIndex === 3 ? "bg-violet-300" : "bg-cyan-300")} /></span>)}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between rounded-lg border border-white/[.05] bg-[#070b1c]/75 px-2.5 py-1.5 backdrop-blur-md"><span className="text-[7px] text-slate-400"><strong className="text-white">Multi-region</strong> operations</span><span className="text-[7px] text-emerald-300">99.8% synced</span></div>
      </div>
    </div>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  const mobile = useMediaQuery("(max-width: 767px)");
  if (project.visual === "analytics") return <CloudStorageVisual calmMotion={mobile} />;
  if (project.visual === "commerce") return <EvChargingVisual calmMotion={mobile} />;
  return <BharatNetVisual />;
}
