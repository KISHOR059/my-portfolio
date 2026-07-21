"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Radio, Sparkles } from "lucide-react";
import { FloatingLaptop } from "@/components/floating-laptop";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { TypingText } from "@/components/typing-text";
import { buttonVariants } from "@/components/ui/button";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="home" className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden px-3 pb-16 pt-28 sm:px-4 lg:pb-8">
      <HeroAtmosphere />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-8">
        <motion.div initial="hidden" animate="visible" transition={{ delayChildren: 0.12, staggerChildren: 0.095 }} className="relative z-10 max-w-2xl">
          <motion.div variants={item} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-6 inline-flex items-center gap-2 overflow-hidden rounded-full border border-violet-400/20 bg-violet-500/[.08] px-3.5 py-2 text-xs font-medium text-violet-100 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_0_30px_rgba(124,58,237,.1)] backdrop-blur-xl">
            <motion.span animate={reducedMotion ? undefined : { rotate: [0, 14, -10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}><Sparkles className="size-3.5 text-cyan-300" /></motion.span>
            Welcome to my portfolio
            <motion.span className="ml-1 h-3 w-px bg-gradient-to-b from-transparent via-white/70 to-transparent" animate={reducedMotion ? undefined : { x: [-120, 150] }} transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2 }} />
          </motion.div>

          <motion.p variants={item} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-3 text-lg font-medium text-slate-400 sm:text-xl">Hi, I&apos;m <span className="text-white">{portfolio.name}</span></motion.p>
          <motion.h1 variants={item} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-balance text-5xl font-extrabold leading-[.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[5.3rem]">
            Software{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={reducedMotion ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            >Engineer</motion.span>
          </motion.h1>

          <motion.div variants={item} transition={{ duration: 0.7 }} className="mt-6 flex items-center gap-3">
            <span className="relative flex size-2.5"><motion.span className="absolute inline-flex size-full rounded-full bg-cyan-300" animate={reducedMotion ? undefined : { scale: [1, 2.1, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 1.8, repeat: Infinity }} /><span className="relative inline-flex size-2.5 rounded-full bg-cyan-400" /></span>
            <TypingText words={portfolio.roles} />
          </motion.div>
          <motion.p variants={item} transition={{ duration: 0.7 }} className="mt-6 max-w-xl text-pretty text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">{portfolio.intro}</motion.p>

          <motion.div variants={item} transition={{ duration: 0.7 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.a whileHover={{ scale: 1.035, y: -2 }} whileTap={{ scale: 0.98 }} href="#projects" className={cn(buttonVariants({ variant: "glow", size: "lg" }), "group relative overflow-hidden")}>
              <motion.span className="absolute inset-y-0 w-16 -skew-x-12 bg-white/15 blur-lg" animate={reducedMotion ? undefined : { left: ["-40%", "130%"] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.2 }} />
              <span className="relative">Explore projects</span><ArrowRight className="relative size-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} href={portfolio.resumeUrl} download className={buttonVariants({ variant: "outline", size: "lg" })}><Download className="size-4" /> Download resume</motion.a>
          </motion.div>

          <motion.div variants={item} transition={{ duration: 0.7 }} className="mt-9 flex w-fit items-center gap-4 rounded-2xl border border-white/[.07] bg-white/[.025] p-2.5 pr-4 backdrop-blur-xl">
            <div className="relative grid size-10 place-items-center rounded-xl border border-emerald-300/15 bg-emerald-400/[.06] text-emerald-300"><Radio className="size-4" /><motion.span className="absolute inset-0 rounded-xl border border-emerald-300/20" animate={reducedMotion ? undefined : { scale: [1, 1.32], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} /></div>
            <div><strong className="block text-xs font-semibold text-slate-200">Currently building</strong><span className="text-[11px] text-slate-500">Scalable products · thoughtful interactions</span></div>
            <div className="ml-1 hidden items-end gap-0.5 sm:flex" aria-hidden="true">{[7, 13, 9, 17, 11, 15].map((height, index) => <motion.span key={index} className="w-0.5 rounded-full bg-cyan-300/60" animate={reducedMotion ? undefined : { height: [height, Math.max(5, 20 - height), height] }} transition={{ duration: 1.1 + index * 0.11, repeat: Infinity, ease: "easeInOut" }} style={{ height }} />)}</div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.86, x: 45, filter: "blur(14px)" }} animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }} transition={{ duration: 1.25, delay: 0.28, ease: [0.16, 1, 0.3, 1] }} className="relative lg:-mr-8">
          <FloatingLaptop />
        </motion.div>
      </div>

      <motion.a href="#about" aria-label="Scroll to about" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[.25em] text-slate-500 lg:flex" animate={reducedMotion ? undefined : { y: [0, 6, 0], opacity: [0.55, 1, 0.55] }} transition={{ duration: 2, repeat: Infinity }}>
        Scroll <span className="grid size-7 place-items-center rounded-full border border-white/10 bg-white/[.03]"><ArrowDown className="size-3.5" /></span>
      </motion.a>
    </section>
  );
}
