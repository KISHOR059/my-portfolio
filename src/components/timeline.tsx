"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

export function Timeline() {
  return (
    <section id="experience" className="section-shell scroll-mt-20 !pt-8 sm:!pt-10">
      <Reveal><SectionHeading eyebrow="04 / Professional experience" title="Building national-scale infrastructure systems." description="Hands-on engineering experience across Laravel platforms, GIS visualization, telecom operations, and integrated web and mobile systems." /></Reveal>
      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{ scaleY: 0, opacity: .35 }} whileInView={{ scaleY: 1, opacity: 1 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }} className="absolute bottom-6 left-[17px] top-6 w-px origin-top bg-gradient-to-b from-violet-500 via-blue-500/60 to-transparent will-change-transform sm:left-[17px]" />
        {portfolio.experience.map((experience, index) => (
          <Reveal key={experience.period} delay={index * 0.08} className="relative mb-8 last:mb-0">
            <div className="grid gap-5 pl-12 sm:grid-cols-2 sm:gap-8 sm:pl-12">
              <div className="sm:col-span-2">
                <motion.article whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280, damping: 24 }} className="group relative isolate overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[linear-gradient(135deg,rgba(18,13,40,.96),rgba(7,10,27,.96)_58%,rgba(4,22,38,.94))] p-6 shadow-[0_24px_70px_rgba(0,0,0,.3),0_0_40px_rgba(124,58,237,.1),inset_0_1px_0_rgba(255,255,255,.08)] transition-[border-color,box-shadow] hover:border-violet-300/35 hover:shadow-[0_28px_85px_rgba(91,33,182,.22),0_0_36px_rgba(34,211,238,.08)] sm:p-8">
                  <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-violet-600/15 blur-3xl" />
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/45 to-transparent" />
                  <div className="pointer-events-none absolute bottom-0 left-0 h-px w-2/3 bg-gradient-to-r from-cyan-300/50 via-violet-400/30 to-transparent" />
                  <div className="relative z-10 grid gap-7 lg:grid-cols-[.75fr_1.25fr] lg:gap-8">
                    <div className="lg:border-r lg:border-white/[.08] lg:pr-8">
                      <div className="flex items-center justify-between gap-3">
                        <p className="rounded-full border border-cyan-300/15 bg-cyan-300/[.06] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[.16em] text-cyan-300">{experience.period}</p>
                        <span className="font-mono text-[8px] uppercase tracking-[.18em] text-slate-600">NODE_0{index + 1}</span>
                      </div>
                      <h3 className="mt-5 text-2xl font-bold tracking-[-.03em] text-white">{experience.role}</h3>
                      <p className="mt-3 inline-flex items-center rounded-xl border border-violet-300/15 bg-violet-400/[.06] px-3 py-2 text-xs font-semibold text-violet-200">Project: {experience.project}</p>
                    </div>
                    <div>
                      <p className="text-sm leading-7 text-slate-400">{experience.description}</p>
                      <div className="mt-6 grid gap-2 sm:grid-cols-3">
                        {experience.highlights.map((highlight) => <span key={highlight} className="inline-flex items-start gap-2 rounded-xl border border-white/[.06] bg-white/[.025] px-3 py-2.5 text-[10px] leading-5 text-slate-400"><Check className="mt-1 size-3 shrink-0 text-emerald-400" />{highlight}</span>)}
                      </div>
                  </div>
                  </div>
                </motion.article>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: .65 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .5 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="absolute left-0 top-6 grid size-9 place-items-center rounded-full border border-violet-300/30 bg-[#0b0d20] text-violet-300 shadow-[0_0_24px_rgba(124,58,237,.4)]">
              <motion.span initial={{ opacity: .2, scale: .7 }} whileInView={{ opacity: [0, .7, 0], scale: [0.7, 1.45, 1.45] }} viewport={{ once: true }} transition={{ duration: .8, delay: .22, ease: "easeOut" }} className="pointer-events-none absolute inset-0 rounded-full border border-violet-300/45" />
              <motion.span initial={{ opacity: 0, y: 5, rotate: -12, scale: .75 }} whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} viewport={{ once: true, amount: .5 }} transition={{ delay: .18, type: "spring", stiffness: 320, damping: 16 }}><BriefcaseBusiness className="relative size-4" /></motion.span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
