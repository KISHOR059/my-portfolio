"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitFork as Github } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { BorderGlow } from "@/components/ui/border-glow";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const projectGlow = {
  violet: { colors: ["#a78bfa", "#f472b6", "#67e8f9"], hsl: "270 86 72" },
  cyan: { colors: ["#67e8f9", "#3b82f6", "#a78bfa"], hsl: "188 86 68" },
  blue: { colors: ["#60a5fa", "#818cf8", "#67e8f9"], hsl: "217 91 65" },
} as const;

export function Projects() {
  return (
    <section id="projects" className="section-shell scroll-mt-20">
      <Reveal><SectionHeading eyebrow="03 / Project experience" title="Projects built for real-world impact." description="Production-minded applications focused on secure cloud workflows, dependable data, and useful user experiences." /></Reveal>
      <div className="grid gap-6 lg:grid-cols-3">
        {portfolio.projects.map((project, index) => {
          const glow = projectGlow[project.accent];
          return (
            <Reveal key={project.title} delay={index * .08} className="h-full">
              <BorderGlow className="group h-full" backgroundColor="#0b0e20" borderRadius={24} glowRadius={34} glowIntensity={.68} edgeSensitivity={22} coneSpread={24} fillOpacity={.27} colors={[...glow.colors]} glowColor={glow.hsl}>
                <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="relative h-full">
                  <div className={cn("relative m-2 overflow-hidden rounded-[1.25rem] border border-white/[.07] p-5", project.accent === "violet" && "bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,.28),#080b19_72%)]", project.accent === "blue" && "bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,.28),#080b19_72%)]", project.accent === "cyan" && "bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,.2),#080b19_72%)]")}>
                    <motion.div className="origin-bottom transition-transform duration-500 group-hover:scale-[1.03]" whileHover={{ rotateX: 2, rotateY: -2 }}><ProjectVisual project={project} /></motion.div>
                  </div>
                  <div className="p-6 pt-4">
                    <div className="flex items-start justify-between gap-4"><h3 className="text-xl font-bold tracking-tight text-white">{project.title}</h3><span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition-colors group-hover:border-cyan-300/25 group-hover:text-cyan-300"><ArrowUpRight className="size-3.5" /></span></div>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{project.description}</p>
                    <ul className="mt-4 space-y-2">{project.highlights.map((highlight) => <li key={highlight} className="flex gap-2 text-xs leading-5 text-slate-500"><span className="mt-2 size-1 shrink-0 rounded-full bg-cyan-300" />{highlight}</li>)}</ul>
                    <div className="mt-5 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded-full border border-white/[.07] bg-white/[.03] px-2.5 py-1 text-[10px] font-medium text-slate-300">{tech}</span>)}</div>
                    <div className="mt-6 flex items-center justify-between gap-3"><span className="font-mono text-xs text-cyan-300">{project.year}</span>{project.private ? <span className="rounded-full border border-blue-300/15 bg-blue-400/[.06] px-4 py-2 text-xs font-medium text-blue-200">Featured project</span> : <a href={project.github} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "px-5")}><Github className="size-3.5" /> Source code</a>}</div>
                  </div>
                </motion.article>
              </BorderGlow>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
