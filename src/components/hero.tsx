"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Download, Radio, Sparkles } from "lucide-react";
import { ProfilePortrait } from "@/components/profile-portrait";
import { ReactBitsHeroBackground } from "@/components/react-bits-hero-background";
import { portfolio } from "@/data/portfolio";
import { useMediaQuery } from "@/hooks/use-media-query";

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const mobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { margin: "120px 0px" });
  const calmMotion = mobile || reducedMotion || !heroInView;

  return (
    <section ref={heroRef} id="home" className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden px-4 pb-18 pt-28 sm:px-6 lg:pt-32">
      <ReactBitsHeroBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-[82.75rem] items-start gap-12 lg:grid-cols-2 lg:gap-5 xl:gap-8">
        <motion.div initial="hidden" animate="visible" transition={{ delayChildren: .08, staggerChildren: .1 }} className="flex max-w-2xl flex-col items-center gap-5 text-center lg:items-start lg:pt-5 lg:text-left">
          <motion.div variants={item} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }} className="inline-flex items-center gap-2 rounded-xl border border-white/[.09] bg-[#120f17]/55 p-1 pr-3 font-mono text-[10px] uppercase text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-2xl sm:text-xs">
            <span className="rounded-md bg-violet-500 px-2.5 py-1 font-semibold text-white">Hello</span>
            <Sparkles className="size-3 text-cyan-300" /> Welcome to my portfolio
          </motion.div>

          <motion.h1 variants={item} transition={{ duration: .82, ease: [0.16, 1, 0.3, 1] }} className="text-balance text-[clamp(2.65rem,5.4vw,4.45rem)] font-medium leading-[1.04] tracking-[-0.045em] text-white">
            Hi, I&apos;m Kishor.<br />
            <motion.span className="inline-block bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent" style={{ backgroundSize: "200% 100%" }} animate={calmMotion ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>Software Engineer</motion.span><br />
            <span className="text-slate-300">for real-world systems.</span>
          </motion.h1>

          <motion.div variants={item} transition={{ duration: .76 }} className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-[10px] text-slate-500 lg:justify-start">
            {portfolio.roles.map((role) => <span key={role} className="rounded-lg border border-white/[.07] bg-white/[.025] px-2.5 py-1.5">{role}</span>)}
          </motion.div>

          <motion.div variants={item} transition={{ duration: .76 }} className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row lg:justify-start">
            <motion.a
              whileHover={calmMotion ? undefined : { y: -3, scale: 1.02 }}
              whileTap={{ scale: .98 }}
              href="#projects"
              className="group relative isolate inline-flex h-14 min-w-[196px] items-center justify-center gap-3 overflow-hidden rounded-2xl border border-violet-300/35 bg-[linear-gradient(115deg,rgba(109,40,217,.95),rgba(67,56,202,.92)_52%,rgba(8,145,178,.88))] px-5 font-mono text-xs font-semibold uppercase tracking-[.06em] text-white shadow-[0_12px_38px_rgba(91,33,182,.38),0_0_26px_rgba(59,130,246,.2),inset_0_1px_0_rgba(255,255,255,.24)] transition-[border-color,box-shadow] duration-300 hover:border-cyan-200/55 hover:shadow-[0_16px_46px_rgba(91,33,182,.48),0_0_34px_rgba(34,211,238,.28),inset_0_1px_0_rgba(255,255,255,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
            >
              <span className="absolute inset-[1px] -z-10 rounded-[15px] bg-[linear-gradient(120deg,rgba(255,255,255,.08),transparent_38%,rgba(34,211,238,.09))]" />
              <motion.span
                className="absolute inset-y-[-40%] left-[-35%] w-[28%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent blur-sm"
                animate={calmMotion ? undefined : { x: ["0%", "520%"] }}
                transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
              />
              <span className="relative">Explore projects</span>
              <span className="relative grid size-8 place-items-center rounded-xl border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,.15)] transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/15">
                <ArrowRight className="size-4" />
              </span>
            </motion.a>

            <motion.a
              whileHover={calmMotion ? undefined : { y: -3, scale: 1.015 }}
              whileTap={{ scale: .98 }}
              href={portfolio.resumeUrl}
              download
              className="group relative inline-flex h-14 min-w-[196px] items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/[.13] bg-[linear-gradient(145deg,rgba(19,22,43,.94),rgba(10,12,27,.88))] px-5 font-mono text-xs font-semibold uppercase tracking-[.06em] text-slate-100 shadow-[0_12px_34px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-2xl transition-[border-color,box-shadow,color] duration-300 hover:border-cyan-300/35 hover:text-white hover:shadow-[0_14px_38px_rgba(0,0,0,.34),0_0_28px_rgba(34,211,238,.12),inset_0_1px_0_rgba(255,255,255,.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
            >
              <span className="absolute inset-x-[18%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
              <span className="relative grid size-8 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/[.06] text-cyan-200 transition-[border-color,background-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-cyan-300/30 group-hover:bg-cyan-300/[.1]">
                <Download className="size-4" />
              </span>
              <span className="relative">Download resume</span>
            </motion.a>
          </motion.div>

          <motion.div variants={item} transition={{ duration: .76 }} className="mt-1 flex items-center gap-2.5 font-mono text-[10px] text-slate-500">
            <span className="relative grid size-7 place-items-center rounded-lg border border-emerald-300/15 bg-emerald-400/[.06] text-emerald-300"><Radio className="size-3" /><motion.span className="absolute inset-0 rounded-lg border border-emerald-300/20" animate={calmMotion ? undefined : { scale: [1, 1.35], opacity: [.55, 0] }} transition={{ duration: 2, repeat: Infinity }} /></span>
            Available for meaningful opportunities
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 28, scale: .97 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1, delay: .2, ease: [0.16, 1, 0.3, 1] }} className="flex w-full min-w-0 justify-center lg:pt-4">
          <ProfilePortrait preload className="max-w-[34rem]" />
        </motion.div>
      </div>
    </section>
  );
}
