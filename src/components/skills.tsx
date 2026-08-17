"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CloudCog, Container, Database, Layers3, PanelsTopLeft, ServerCog, Sparkles, Wrench } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { TechnologyLogoLoop } from "@/components/technology-logo-loop";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const icons = { PanelsTopLeft, ServerCog, Database, CloudCog, Container, Wrench };

/**
 * Bento layout: alternating wide (lg:col-span-2) and narrow (lg:col-span-1) per row.
 * Row 1 → Frontend (2) + Backend  (1)
 * Row 2 → Database  (1) + Cloud   (2)
 * Row 3 → DevOps    (1) + Tools   (2)
 * Enhanced brightness, neon glow watermarks, and high contrast typography.
 */
const skillConfigs = [
  // 0 Frontend — violet — wide
  {
    number: "01", colorClass: "text-violet-300 font-semibold", hex: "#a78bfa",
    iconClass: "border-violet-400/40 bg-violet-500/[.12] text-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.2)]",
    topBar: "bg-gradient-to-r from-violet-400 via-violet-400/40 to-transparent",
    numWatermark: "text-violet-400/[.08]",
    pillBase: "border-violet-400/[.26] bg-violet-500/[.08] text-violet-200",
    pillHover: "hover:border-violet-300/80 hover:bg-violet-400/[.2] hover:text-white hover:shadow-[0_0_15px_rgba(167,139,250,.45)]",
    dotClass: "bg-violet-300 shadow-[0_0_10px_rgba(167,139,250,1)]",
    glowHex: "rgba(167,139,250,0.14)",
    colSpan: "lg:col-span-2",
    wide: true,
  },
  // 1 Backend — blue — narrow
  {
    number: "02", colorClass: "text-blue-300 font-semibold", hex: "#60a5fa",
    iconClass: "border-blue-400/40 bg-blue-500/[.12] text-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.2)]",
    topBar: "bg-gradient-to-r from-blue-400 via-blue-400/40 to-transparent",
    numWatermark: "text-blue-400/[.08]",
    pillBase: "border-blue-400/[.26] bg-blue-500/[.08] text-blue-200",
    pillHover: "hover:border-blue-300/80 hover:bg-blue-400/[.2] hover:text-white hover:shadow-[0_0_15px_rgba(96,165,250,.45)]",
    dotClass: "bg-blue-300 shadow-[0_0_10px_rgba(96,165,250,1)]",
    glowHex: "rgba(96,165,250,0.14)",
    colSpan: "lg:col-span-1",
    wide: false,
  },
  // 2 Database — cyan — narrow
  {
    number: "03", colorClass: "text-cyan-300 font-semibold", hex: "#67e8f9",
    iconClass: "border-cyan-400/40 bg-cyan-500/[.12] text-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.2)]",
    topBar: "bg-gradient-to-r from-cyan-400 via-cyan-400/40 to-transparent",
    numWatermark: "text-cyan-400/[.08]",
    pillBase: "border-cyan-400/[.26] bg-cyan-500/[.08] text-cyan-200",
    pillHover: "hover:border-cyan-300/80 hover:bg-cyan-400/[.2] hover:text-white hover:shadow-[0_0_15px_rgba(103,232,249,.45)]",
    dotClass: "bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,1)]",
    glowHex: "rgba(103,232,249,0.14)",
    colSpan: "lg:col-span-1",
    wide: false,
  },
  // 3 Cloud — fuchsia — wide
  {
    number: "04", colorClass: "text-fuchsia-300 font-semibold", hex: "#e879f9",
    iconClass: "border-fuchsia-400/40 bg-fuchsia-500/[.12] text-fuchsia-300 shadow-[0_0_12px_rgba(232,121,249,0.2)]",
    topBar: "bg-gradient-to-r from-fuchsia-400 via-fuchsia-400/40 to-transparent",
    numWatermark: "text-fuchsia-400/[.08]",
    pillBase: "border-fuchsia-400/[.26] bg-fuchsia-500/[.08] text-fuchsia-200",
    pillHover: "hover:border-fuchsia-300/80 hover:bg-fuchsia-400/[.2] hover:text-white hover:shadow-[0_0_15px_rgba(232,121,249,.45)]",
    dotClass: "bg-fuchsia-300 shadow-[0_0_10px_rgba(232,121,249,1)]",
    glowHex: "rgba(232,121,249,0.14)",
    colSpan: "lg:col-span-2",
    wide: true,
  },
  // 4 DevOps — emerald — narrow
  {
    number: "05", colorClass: "text-emerald-300 font-semibold", hex: "#34d399",
    iconClass: "border-emerald-400/40 bg-emerald-500/[.12] text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.2)]",
    topBar: "bg-gradient-to-r from-emerald-400 via-emerald-400/40 to-transparent",
    numWatermark: "text-emerald-400/[.08]",
    pillBase: "border-emerald-400/[.26] bg-emerald-500/[.08] text-emerald-200",
    pillHover: "hover:border-emerald-300/80 hover:bg-emerald-400/[.2] hover:text-white hover:shadow-[0_0_15px_rgba(52,211,153,.45)]",
    dotClass: "bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,1)]",
    glowHex: "rgba(52,211,153,0.14)",
    colSpan: "lg:col-span-1",
    wide: false,
  },
  // 5 Tools — amber — wide
  {
    number: "06", colorClass: "text-amber-300 font-semibold", hex: "#fbbf24",
    iconClass: "border-amber-400/40 bg-amber-500/[.12] text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.2)]",
    topBar: "bg-gradient-to-r from-amber-400 via-amber-400/40 to-transparent",
    numWatermark: "text-amber-400/[.08]",
    pillBase: "border-amber-400/[.26] bg-amber-500/[.08] text-amber-200",
    pillHover: "hover:border-amber-300/80 hover:bg-amber-400/[.2] hover:text-white hover:shadow-[0_0_15px_rgba(251,191,36,.45)]",
    dotClass: "bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,1)]",
    glowHex: "rgba(251,191,36,0.14)",
    colSpan: "lg:col-span-2",
    wide: true,
  },
] as const;

type Config = (typeof skillConfigs)[number];

const uniqueSkillCount = new Set(portfolio.skillGroups.flatMap((g) => g.skills)).size;

function SkillCell({
  group,
  index,
  config,
  reducedMotion,
}: {
  group: (typeof portfolio.skillGroups)[number];
  index: number;
  config: Config;
  reducedMotion: boolean | null;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = icons[group.icon as keyof typeof icons];

  return (
    <div
      className={cn(
        "group relative overflow-hidden bg-[#080d1e] transition-colors duration-500",
        config.colSpan,
        hovered && "bg-[#0b132e]",
        config.wide ? "p-6 sm:p-7" : "p-5 sm:p-6",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Colored top accent bar */}
      <div className={cn("absolute inset-x-0 top-0 h-[2px]", config.topBar)} />

      {/* Hover radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at 5% 5%, ${config.glowHex}, transparent 65%)` }}
      />

      {/* Content — wide cells: flex row on lg */}
      <div className={cn("relative z-10", config.wide && "lg:flex lg:items-start lg:gap-7")}>
        {/* Category header */}
        <div className={cn("flex items-start gap-3", config.wide ? "mb-5 lg:mb-0 lg:min-w-[210px] lg:flex-shrink-0" : "mb-4")}>
          <motion.span
            whileHover={{ rotate: -8, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className={cn("grid size-10 shrink-0 place-items-center rounded-xl border", config.iconClass)}
          >
            <Icon className="size-4.5" />
          </motion.span>
          <div>
            <h3 className="text-[14px] font-bold tracking-tight text-white">{group.category}</h3>
            <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-widest text-slate-400">
              {String(group.skills.length).padStart(2, "0")} technologies
            </p>
          </div>
        </div>

        {/* Vertical hairline divider — wide cells, desktop only */}
        {config.wide && (
          <div className="mb-5 h-px w-full bg-white/[.12] lg:mb-0 lg:h-auto lg:w-px lg:self-stretch" />
        )}

        {/* Skill pills */}
        <div className={cn("flex flex-wrap gap-2", config.wide && "lg:flex-1 lg:pt-0.5")}>
          {group.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 9, scale: 0.88 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.48,
                delay: reducedMotion ? 0 : 0.04 * index + 0.08 * skillIndex,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "inline-flex cursor-default items-center gap-1.5 rounded-lg border font-mono text-[11.5px] font-medium px-3 py-1.5 transition-[background-color,border-color,color,box-shadow] duration-300",
                config.pillBase,
                config.pillHover,
              )}
              style={{ willChange: "transform, opacity" }}
            >
              <span className={cn("size-1.5 shrink-0 rounded-full", config.dotClass)} />
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills" className="section-shell scroll-mt-20">
      {/* Section background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-[22%] -z-10 h-[34rem] bg-[radial-gradient(ellipse_at_center,rgba(91,33,182,.2),transparent_68%)]" />

      <Reveal>
        <SectionHeading eyebrow="02 / Expertise" title="A modern stack engineered for impact." description="A practical technology system for building secure, scalable products—from interface to infrastructure." />
      </Reveal>

      <Reveal delay={.04}>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[.14] bg-[#070b18] p-4 sm:p-5 shadow-[0_30px_100px_rgba(0,0,0,.55),0_0_80px_rgba(91,33,182,.14),inset_0_1px_0_rgba(255,255,255,.08)]">

          {/* Background grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[.38] [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:linear-gradient(to_bottom,black_15%,transparent_88%)]" />

          {/* Ambient corner glows */}
          <div className="pointer-events-none absolute -left-24 -top-20 size-80 rounded-full bg-violet-600/[.15] blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 right-0 size-72 rounded-full bg-cyan-500/[.12] blur-[90px]" />

          {/* HUD corner brackets — positioned in the padding margins */}
          <span className="pointer-events-none absolute left-3 top-3 size-4 border-l-2 border-t-2 border-violet-400/60" />
          <span className="pointer-events-none absolute right-3 top-3 size-4 border-r-2 border-t-2 border-cyan-400/60" />
          <span className="pointer-events-none absolute bottom-3 left-3 size-4 border-b-2 border-l-2 border-violet-400/60" />
          <span className="pointer-events-none absolute bottom-3 right-3 size-4 border-b-2 border-r-2 border-cyan-400/60" />

          {/* Animated scan line */}
          {!reducedMotion && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/45 to-transparent"
              initial={{ top: "0%" }}
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
            />
          )}

          {/* Inner futuristic console box */}
          <div className="relative overflow-hidden rounded-[1.35rem] border border-white/[.07] bg-[#050810] shadow-inner">
            {/* Header bar */}
            <div className="relative flex items-center justify-between border-b border-white/[.12] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-violet-300/30 bg-violet-400/[.15] text-violet-200">
                  <Layers3 className="size-4" />
                </span>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-slate-200">Technology matrix</p>
                  <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[.14em] text-slate-400">
                    {uniqueSkillCount} capabilities · 06 systems
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[.08] px-3.5 py-1.5 font-mono text-[8.5px] uppercase tracking-[.14em] text-emerald-300">
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <span className="hidden sm:inline">All systems</span> operational
              </div>
            </div>

            {/* ── Bento grid ────────────────────────────────────────────────────
                 gap-px + parent bg-white/[.12] = hairline dividers between cells,
                 no individual card borders needed.
            ─────────────────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 gap-px bg-white/[.12] sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.skillGroups.map((group, index) => (
                <SkillCell
                  key={group.category}
                  group={group}
                  index={index}
                  config={skillConfigs[index]}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>

            {/* Footer bar */}
            <div className="relative flex items-center justify-center gap-2 border-t border-white/[.08] px-6 py-3.5 font-mono text-[8.5px] uppercase tracking-[.18em] text-slate-400">
              <Sparkles className="size-3.5 text-violet-300" />
              Designed to evolve with every build
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={.12}>
        <TechnologyLogoLoop />
      </Reveal>
    </section>
  );
}
