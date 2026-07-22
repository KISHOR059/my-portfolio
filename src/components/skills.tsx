"use client";

import { motion } from "framer-motion";
import { CloudCog, Container, Database, PanelsTopLeft, ServerCog, Wrench } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BorderGlow } from "@/components/ui/border-glow";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

const icons = { PanelsTopLeft, ServerCog, Database, CloudCog, Container, Wrench };
const glowPalettes = [
  ["#a78bfa", "#f472b6", "#67e8f9"],
  ["#60a5fa", "#818cf8", "#67e8f9"],
  ["#67e8f9", "#3b82f6", "#a78bfa"],
] as const;
const glowHsl = ["270 86 72", "217 91 65", "188 86 68"] as const;

export function Skills() {
  return (
    <section id="skills" className="section-shell scroll-mt-20">
      <Reveal><SectionHeading eyebrow="02 / Expertise" title="Tools I use to turn ideas into products." description="A practical stack selected for strong developer experience, performance, and long-term maintainability." /></Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.skillGroups.map((group, index) => {
          const Icon = icons[group.icon];
          const paletteIndex = index % glowPalettes.length;
          return (
            <Reveal key={group.category} delay={index * .05} className="h-full">
              <BorderGlow
                className="group h-full min-h-[190px]"
                backgroundColor="#0b0e20"
                borderRadius={24}
                glowRadius={32}
                glowIntensity={.68}
                edgeSensitivity={22}
                coneSpread={24}
                fillOpacity={.3}
                colors={[...glowPalettes[paletteIndex]]}
                glowColor={glowHsl[paletteIndex]}
              >
                <motion.article whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 280, damping: 24 }} className="relative h-full p-6">
                  <div className="flex items-center gap-4">
                    <div className="grid size-12 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 shadow-[0_0_22px_rgba(124,58,237,.12)] transition-colors duration-300 group-hover:border-cyan-300/30 group-hover:text-cyan-300"><Icon className="size-5" /></div>
                    <h3 className="text-lg font-bold text-white">{group.category}</h3>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill) => <span key={skill} className="rounded-full border border-white/[.08] bg-white/[.04] px-3 py-1.5 text-xs text-slate-300 transition-colors group-hover:border-white/15 group-hover:bg-white/[.06] group-hover:text-white">{skill}</span>)}
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
