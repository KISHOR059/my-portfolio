"use client";

import { motion } from "framer-motion";
import { Braces, Code2, Coffee, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { BorderGlow } from "@/components/ui/border-glow";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

const statColors = [
  ["#a78bfa", "#3b82f6", "#67e8f9"],
  ["#60a5fa", "#67e8f9", "#a78bfa"],
] as const;

export function About() {
  return (
    <section id="about" className="section-shell scroll-mt-20">
      <Reveal><SectionHeading eyebrow="01 / About" title="Crafting software with clarity and care." description="A builder at heart, driven by curiosity and the satisfaction of making complex things feel simple." /></Reveal>
      <div className="grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-7 rounded-[3rem] bg-violet-600/18 blur-3xl" />
          <motion.div whileHover={{ y: -6, rotate: 1, scale: 1.012 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="relative aspect-square rounded-[2.25rem] bg-gradient-to-br from-violet-400 via-blue-500 to-cyan-300 p-px shadow-[0_28px_90px_rgba(0,0,0,.34),0_0_70px_rgba(124,58,237,.28)]">
            <div className="relative size-full overflow-hidden rounded-[calc(2.25rem-1px)] border-[9px] border-[#070a18] bg-[#080b1b]">
              <Image src={portfolio.profileImage} alt="Portrait of Kishor" fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 28rem, 34vw" className="object-cover object-center" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/75 via-transparent to-violet-950/10" />
              <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
              <span className="pointer-events-none absolute left-4 top-4 size-8 border-l border-t border-violet-200/60" />
              <span className="pointer-events-none absolute bottom-4 right-4 size-8 border-b border-r border-cyan-200/60" />
              <Code2 className="absolute right-4 top-4 size-11 rounded-xl border border-cyan-300/20 bg-[#071022]/75 p-2.5 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,.2)] backdrop-blur-xl" />
              <Coffee className="absolute bottom-4 left-4 size-11 rounded-xl border border-violet-300/20 bg-[#0b0820]/75 p-2.5 text-violet-300 shadow-[0_0_24px_rgba(124,58,237,.2)] backdrop-blur-xl" />
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#050816]/70 px-4 py-2 text-xs text-slate-200 shadow-[0_8px_30px_rgba(0,0,0,.28)] backdrop-blur-xl"><span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" /> Open to create</div>
            </div>
          </motion.div>
        </Reveal>

        <Reveal delay={.1} className="text-center lg:text-left">
          <div className="mb-6 flex items-center justify-center gap-2 text-sm font-medium text-violet-300 lg:justify-start"><Sparkles className="size-4" /> A little about me</div>
          <p className="text-pretty text-xl font-medium leading-9 text-slate-200 sm:text-2xl">{portfolio.about}</p>
          <p className="mt-5 text-pretty leading-7 text-slate-400">{portfolio.aboutSecondary}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm text-slate-400 lg:justify-start"><span className="chip"><MapPin className="size-3.5 text-cyan-300" /> {portfolio.location}</span><span className="chip"><Braces className="size-3.5 text-violet-300" /> Clean code, useful outcomes</span></div>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {portfolio.stats.map((stat, index) => (
              <BorderGlow key={stat.label} className="h-full min-h-[96px]" backgroundColor="#0b0e20" borderRadius={16} glowRadius={22} glowIntensity={.5} edgeSensitivity={18} coneSpread={26} fillOpacity={.25} colors={[...statColors[index % statColors.length]]} glowColor={index % 2 ? "217 91 65" : "270 86 72"}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="h-full p-4 text-center lg:text-left">
                  <p className="text-2xl font-extrabold tracking-tight text-white">{stat.value}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{stat.label}</p>
                </motion.div>
              </BorderGlow>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
