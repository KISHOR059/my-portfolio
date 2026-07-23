"use client";

import { motion } from "framer-motion";
import { Activity, CloudCog, Container, Database, Layers3, PanelsTopLeft, Radio, ServerCog, Sparkles, Wrench } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TechnologyLogoLoop } from "@/components/technology-logo-loop";
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
const iconStyles = [
  "border-violet-300/20 bg-violet-400/10 text-violet-200 shadow-[0_0_28px_rgba(124,58,237,.18)]",
  "border-blue-300/20 bg-blue-400/10 text-blue-200 shadow-[0_0_28px_rgba(59,130,246,.18)]",
  "border-cyan-300/20 bg-cyan-400/10 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,.16)]",
] as const;
const uniqueSkillCount = new Set(portfolio.skillGroups.flatMap((group) => group.skills)).size;

export function Skills() {
  return (
    <section id="skills" className="section-shell scroll-mt-20">
      <div className="pointer-events-none absolute inset-x-0 top-[22%] -z-10 h-[34rem] bg-[radial-gradient(ellipse_at_center,rgba(76,29,149,.12),transparent_68%)]" />

      <Reveal>
        <SectionHeading eyebrow="02 / Expertise" title="A modern stack engineered for impact." description="A practical technology system for building secure, scalable products—from interface to infrastructure." />
      </Reveal>

      <Reveal delay={.04}>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[.08] bg-[#070918]/80 p-2 shadow-[0_30px_100px_rgba(0,0,0,.28),0_0_70px_rgba(91,33,182,.06),inset_0_1px_0_rgba(255,255,255,.04)] sm:p-3">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div className="pointer-events-none absolute -left-24 -top-28 size-72 rounded-full bg-violet-600/10 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-32 right-0 size-80 rounded-full bg-cyan-500/[.06] blur-[100px]" />

          <div className="relative mb-2 flex min-h-14 items-center justify-between gap-4 px-3 sm:px-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-violet-300/15 bg-violet-400/[.07] text-violet-200">
                <Layers3 className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-mono text-[10px] uppercase tracking-[.2em] text-slate-300">Technology matrix</p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[.14em] text-slate-600">{uniqueSkillCount} capabilities · 06 systems</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-400/[.045] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[.14em] text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_9px_#34d399]" />
              <span className="hidden sm:inline">All systems</span> operational
            </div>
          </div>

          <div className="relative grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.skillGroups.map((group, index) => {
              const Icon = icons[group.icon];
              const paletteIndex = index % glowPalettes.length;
              const completion = 72 + ((index * 7) % 24);

              return (
                <Reveal key={group.category} delay={index * .045} className="h-full">
                  <BorderGlow
                    className="group h-full min-h-[244px]"
                    backgroundColor="#0b0e20"
                    borderRadius={22}
                    glowRadius={34}
                    glowIntensity={.76}
                    edgeSensitivity={20}
                    coneSpread={24}
                    fillOpacity={.34}
                    colors={[...glowPalettes[paletteIndex]]}
                    glowColor={glowHsl[paletteIndex]}
                  >
                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 280, damping: 25 }}
                      className="relative flex h-full flex-col overflow-hidden p-5 sm:p-6"
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:linear-gradient(115deg,transparent_20%,rgba(255,255,255,.025)_48%,transparent_75%)]" />
                      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      <div className="relative flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <motion.span
                            whileHover={{ rotate: -6, scale: 1.06 }}
                            transition={{ type: "spring", stiffness: 330, damping: 20 }}
                            className={`grid size-12 shrink-0 place-items-center rounded-2xl border ${iconStyles[paletteIndex]}`}
                          >
                            <Icon className="size-5" />
                          </motion.span>
                          <div>
                            <h3 className="text-lg font-bold tracking-[-.02em] text-white">{group.category}</h3>
                            <p className="mt-1 font-mono text-[8px] uppercase tracking-[.16em] text-slate-600">{String(group.skills.length).padStart(2, "0")} capabilities</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[8px] text-slate-700">
                          <Radio className="size-3 text-emerald-400/70" />
                          0{index + 1}
                        </div>
                      </div>

                      <div className="relative my-5 h-px bg-gradient-to-r from-white/[.09] via-white/[.045] to-transparent" />

                      <div className="relative flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <span key={skill} className="inline-flex items-center gap-2 rounded-xl border border-white/[.07] bg-white/[.025] px-3 py-2 text-[11px] font-medium text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,.025)] transition-[border-color,background-color,color,transform] duration-300 group-hover:border-white/[.12] group-hover:bg-white/[.045] group-hover:text-white">
                            <span className={`size-1 rounded-full ${paletteIndex === 0 ? "bg-violet-300" : paletteIndex === 1 ? "bg-blue-300" : "bg-cyan-300"}`} />
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="relative mt-auto flex items-end gap-3 pt-6">
                        <div className="flex-1">
                          <div className="mb-2 font-mono text-[8px] uppercase tracking-[.14em] text-slate-700">
                            <span>System readiness</span>
                          </div>
                          <div className="h-1 overflow-hidden rounded-full bg-white/[.045]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${completion}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: .9, delay: .08 + index * .04, ease: [0.16, 1, 0.3, 1] }}
                              className={`h-full rounded-full ${paletteIndex === 0 ? "bg-gradient-to-r from-violet-600 to-violet-300" : paletteIndex === 1 ? "bg-gradient-to-r from-blue-600 to-blue-300" : "bg-gradient-to-r from-cyan-600 to-cyan-300"}`}
                            />
                          </div>
                        </div>
                        <Activity className="size-3.5 text-emerald-400/70" />
                      </div>
                    </motion.article>
                  </BorderGlow>
                </Reveal>
              );
            })}
          </div>

          <div className="relative mt-2 flex items-center justify-center gap-2 rounded-2xl border border-white/[.045] bg-white/[.015] px-4 py-3 font-mono text-[8px] uppercase tracking-[.18em] text-slate-700">
            <Sparkles className="size-3 text-violet-300/70" />
            Designed to evolve with every build
          </div>
        </div>
      </Reveal>

      <Reveal delay={.12}>
        <TechnologyLogoLoop />
      </Reveal>
    </section>
  );
}
