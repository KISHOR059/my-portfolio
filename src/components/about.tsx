"use client";

import { motion } from "framer-motion";
import { Braces, MapPin, Sparkles } from "lucide-react";
import { InteractiveDeveloperPanel } from "@/components/interactive-developer-panel";
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
          <InteractiveDeveloperPanel />
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
