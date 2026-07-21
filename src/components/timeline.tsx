"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

export function Timeline() {
  return (
    <section id="experience" className="section-shell scroll-mt-20">
      <Reveal><SectionHeading eyebrow="04 / Experience" title="A journey of building, learning, and shipping." description="Growing through hands-on product work, collaborative teams, and increasingly ambitious technical challenges." /></Reveal>
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute bottom-6 left-[17px] top-6 w-px bg-gradient-to-b from-violet-500 via-blue-500/60 to-transparent sm:left-1/2" />
        {portfolio.experience.map((experience, index) => (
          <Reveal key={experience.period} delay={index * 0.08} className="relative mb-8 last:mb-0">
            <div className="grid gap-5 pl-12 sm:grid-cols-2 sm:gap-12 sm:pl-0">
              <div className={index % 2 ? "sm:col-start-2" : "sm:text-right"}>
                <article className="glass-card group rounded-3xl p-6 transition-colors hover:border-violet-300/20">
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[.16em] text-cyan-300">{experience.period}</p>
                  <h3 className="mt-3 text-xl font-bold text-white">{experience.role}</h3>
                  <p className="mt-1 text-sm font-medium text-violet-300">{experience.company}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-400">{experience.description}</p>
                  <div className={"mt-5 flex flex-wrap gap-2 " + (index % 2 ? "" : "sm:justify-end")}>
                    {experience.highlights.map((highlight) => <span key={highlight} className="inline-flex items-center gap-1.5 text-[10px] text-slate-400"><Check className="size-3 text-emerald-400" />{highlight}</span>)}
                  </div>
                </article>
              </div>
            </div>
            <motion.div whileInView={{ scale: [0.6, 1.15, 1] }} viewport={{ once: true }} className="absolute left-0 top-6 grid size-9 place-items-center rounded-full border border-violet-300/30 bg-[#0b0d20] text-violet-300 shadow-[0_0_24px_rgba(124,58,237,.4)] sm:left-1/2 sm:-translate-x-1/2"><BriefcaseBusiness className="size-4" /></motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
