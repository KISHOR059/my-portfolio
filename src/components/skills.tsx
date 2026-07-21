"use client";

import { CloudCog, Container, Database, PanelsTopLeft, ServerCog, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

const icons = { PanelsTopLeft, ServerCog, Database, CloudCog, Container, Wrench };

export function Skills() {
  return (
    <section id="skills" className="section-shell scroll-mt-20">
      <Reveal><SectionHeading eyebrow="02 / Expertise" title="Tools I use to turn ideas into products." description="A practical stack selected for strong developer experience, performance, and long-term maintainability." /></Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.skillGroups.map((group, index) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.category} delay={index * 0.05}>
              <motion.article whileHover={{ y: -7 }} className="group glass-card relative h-full overflow-hidden rounded-3xl p-6 transition-colors hover:border-cyan-300/20">
                <div className="absolute -right-12 -top-12 size-36 rounded-full bg-violet-600/0 blur-3xl transition-colors duration-500 group-hover:bg-violet-600/20" />
                <div className="relative flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 shadow-[0_0_22px_rgba(124,58,237,.12)] transition-colors group-hover:border-cyan-300/30 group-hover:text-cyan-300"><Icon className="size-5" /></div>
                  <div><p className="text-xs font-medium uppercase tracking-[.2em] text-slate-500">Category</p><h3 className="mt-1 text-lg font-bold text-white">{group.category}</h3></div>
                </div>
                <div className="relative mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => <span key={skill} className="rounded-full border border-white/[.07] bg-white/[.035] px-3 py-1.5 text-xs text-slate-300 transition-colors group-hover:border-white/10 group-hover:text-white">{skill}</span>)}
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
