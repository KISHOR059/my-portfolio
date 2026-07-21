"use client";

import { motion } from "framer-motion";
import { Braces, Code2, Coffee, MapPin, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="section-shell scroll-mt-20">
      <Reveal><SectionHeading eyebrow="01 / About" title="Crafting software with clarity and care." description="A builder at heart, driven by curiosity and the satisfaction of making complex things feel simple." /></Reveal>
      <div className="grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-8 rounded-full bg-violet-600/15 blur-3xl" />
          <motion.div whileHover={{ rotate: 2, scale: 1.015 }} className="relative aspect-square rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-300 p-px shadow-[0_0_70px_rgba(124,58,237,.26)]">
            <div className="relative grid size-full place-items-center overflow-hidden rounded-full border-[10px] border-[#070a18] bg-[radial-gradient(circle_at_50%_35%,#202b66_0%,#0c1230_46%,#060816_72%)]">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="relative grid size-[45%] place-items-center rounded-[2.5rem] border border-white/15 bg-white/[.06] shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-xl">
                <span className="bg-gradient-to-br from-white via-violet-100 to-cyan-300 bg-clip-text text-6xl font-extrabold tracking-[-.08em] text-transparent sm:text-7xl">{portfolio.initials}</span>
                <Code2 className="absolute -right-4 -top-4 size-11 rounded-xl border border-cyan-300/20 bg-[#0b1026] p-2.5 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,.2)]" />
                <Coffee className="absolute -bottom-5 -left-6 size-12 rounded-xl border border-violet-300/20 bg-[#0b1026] p-3 text-violet-300 shadow-[0_0_24px_rgba(124,58,237,.2)]" />
              </div>
              <div className="absolute bottom-8 flex items-center gap-2 rounded-full border border-white/10 bg-[#050816]/70 px-4 py-2 text-xs text-slate-300 backdrop-blur-lg"><span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" /> Open to create</div>
            </div>
          </motion.div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-violet-300"><Sparkles className="size-4" /> A little about me</div>
          <p className="text-pretty text-xl font-medium leading-9 text-slate-200 sm:text-2xl">{portfolio.about}</p>
          <p className="mt-5 text-pretty leading-7 text-slate-400">{portfolio.aboutSecondary}</p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="chip"><MapPin className="size-3.5 text-cyan-300" /> {portfolio.location}</span>
            <span className="chip"><Braces className="size-3.5 text-violet-300" /> Clean code, useful outcomes</span>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {portfolio.stats.map((stat) => (
              <motion.div key={stat.label} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="glass-card rounded-2xl p-4">
                <p className="text-2xl font-extrabold tracking-tight text-white">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
