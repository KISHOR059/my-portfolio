"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitFork as Github } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { portfolio, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "analytics") {
    return (
      <div className="visual-window">
        <div className="flex items-center justify-between"><span className="text-[10px] font-medium text-slate-300">Orbit / Overview</span><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[8px] text-emerald-300">Live</span></div>
        <div className="mt-4 grid grid-cols-3 gap-2">{["24.8k", "68.4%", "+32%"].map((value, i) => <div key={value} className="rounded-lg border border-white/[.06] bg-white/[.035] p-2"><span className="block text-[7px] text-slate-500">{["Visitors", "Retention", "Growth"][i]}</span><strong className="text-[11px] text-white">{value}</strong></div>)}</div>
        <div className="mt-3 flex h-24 items-end gap-1 rounded-xl border border-white/[.05] bg-[#070b1c]/70 p-3">{[34, 48, 42, 65, 54, 76, 58, 86, 71, 92, 79, 96].map((height, i) => <span key={i} style={{ height: `${height}%` }} className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-600/50 to-cyan-300/80" />)}</div>
      </div>
    );
  }
  if (project.visual === "commerce") {
    return (
      <div className="visual-window grid grid-cols-[.8fr_1.2fr] gap-3">
        <div className="relative overflow-hidden rounded-xl border border-blue-300/10 bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-transparent"><div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] rounded-2xl border border-white/20 bg-gradient-to-br from-white/30 to-blue-400/10 shadow-2xl" /><span className="absolute bottom-2 left-2 text-[7px] text-blue-200">Essentials / 01</span></div>
        <div className="py-2"><span className="text-[8px] uppercase tracking-widest text-blue-300">New collection</span><h4 className="mt-2 text-sm font-bold text-white">Designed for focus.</h4><p className="mt-2 text-[8px] leading-4 text-slate-500">Minimal tools for ambitious ideas.</p><div className="mt-4 h-6 w-20 rounded-full bg-white text-center text-[8px] font-semibold leading-6 text-[#080b19]">Explore</div></div>
      </div>
    );
  }
  return (
    <div className="visual-window">
      <div className="flex items-center gap-2"><div className="grid size-7 place-items-center rounded-lg bg-cyan-400/10 text-[9px] font-bold text-cyan-300">P</div><div><p className="text-[9px] font-semibold text-white">Pulse workspace</p><p className="text-[7px] text-slate-500">Product launch</p></div></div>
      <div className="mt-4 grid grid-cols-3 gap-2">{["To do", "In progress", "Done"].map((column, columnIndex) => <div key={column} className="rounded-lg bg-white/[.025] p-2"><span className="text-[7px] text-slate-400">{column}</span>{Array.from({ length: columnIndex === 1 ? 2 : 3 }).map((_, i) => <div key={i} className="mt-2 rounded-md border border-white/[.05] bg-[#10162b] p-2"><span className="block h-1 w-3/4 rounded bg-slate-600/50" /><span className="mt-1.5 block h-1 w-1/2 rounded bg-slate-700/50" /></div>)}</div>)}</div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-shell scroll-mt-20">
      <Reveal><SectionHeading eyebrow="03 / Selected work" title="Built to solve. Designed to feel effortless." description="A selection of product concepts showcasing full-stack thinking, careful interactions, and strong visual systems." /></Reveal>
      <div className="grid gap-5 lg:grid-cols-3">
        {portfolio.projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.08}>
            <motion.article whileHover={{ y: -9 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="group glass-card h-full overflow-hidden rounded-3xl">
              <div className={cn("relative m-2 overflow-hidden rounded-[1.25rem] border border-white/[.07] p-5", project.accent === "violet" && "bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,.28),#080b19_72%)]", project.accent === "blue" && "bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,.28),#080b19_72%)]", project.accent === "cyan" && "bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,.2),#080b19_72%)]")}>
                <div className="absolute inset-x-12 bottom-0 h-16 rounded-full bg-violet-500/15 blur-3xl transition-colors group-hover:bg-cyan-400/20" />
                <motion.div className="origin-bottom transition-transform duration-500 group-hover:scale-[1.03]" whileHover={{ rotateX: 2, rotateY: -2 }}><ProjectVisual project={project} /></motion.div>
              </div>
              <div className="p-6 pt-4">
                <div className="flex items-start justify-between gap-4"><h3 className="text-xl font-bold tracking-tight text-white">{project.title}</h3><span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition-colors group-hover:border-cyan-300/25 group-hover:text-cyan-300"><ArrowUpRight className="size-3.5" /></span></div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded-full border border-white/[.07] bg-white/[.03] px-2.5 py-1 text-[10px] font-medium text-slate-300">{tech}</span>)}</div>
                <div className="mt-6 flex gap-2">
                  <a href={project.github} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1")}><Github className="size-3.5" /> GitHub</a>
                  <a href={project.live} className={cn(buttonVariants({ variant: "primary", size: "sm" }), "flex-1")}>Live demo <ArrowUpRight className="size-3.5" /></a>
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
