"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Radio, Sparkles } from "lucide-react";
import { InteractiveDeveloperPanel } from "@/components/interactive-developer-panel";
import { ReactBitsHeroBackground } from "@/components/react-bits-hero-background";
import { buttonVariants } from "@/components/ui/button";
import { portfolio } from "@/data/portfolio";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  const mobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useReducedMotion();
  const calmMotion = mobile || reducedMotion;

  return (
    <section id="home" className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden px-4 pb-18 pt-28 sm:px-6 lg:pt-32">
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

          <motion.p variants={item} transition={{ duration: .76 }} className="max-w-[44ch] text-pretty text-[15px] leading-7 text-slate-400 sm:text-base sm:leading-8">
            I build scalable web platforms, dependable APIs, and thoughtful interfaces—from cloud applications to national fiber infrastructure.
          </motion.p>

          <motion.div variants={item} transition={{ duration: .76 }} className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-[10px] text-slate-500 lg:justify-start">
            {portfolio.roles.map((role) => <span key={role} className="rounded-lg border border-white/[.07] bg-white/[.025] px-2.5 py-1.5">{role}</span>)}
          </motion.div>

          <motion.div variants={item} transition={{ duration: .76 }} className="flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <motion.a whileHover={{ y: -2, scale: 1.025 }} whileTap={{ scale: .98 }} href="#projects" className={cn(buttonVariants({ variant: "glow", size: "lg" }), "group rounded-xl px-6")}>
              Explore projects <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: .98 }} href={portfolio.resumeUrl} download className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-xl px-6")}><Download className="size-4" /> Download resume</motion.a>
          </motion.div>

          <motion.div variants={item} transition={{ duration: .76 }} className="mt-1 flex items-center gap-2.5 font-mono text-[10px] text-slate-500">
            <span className="relative grid size-7 place-items-center rounded-lg border border-emerald-300/15 bg-emerald-400/[.06] text-emerald-300"><Radio className="size-3" /><motion.span className="absolute inset-0 rounded-lg border border-emerald-300/20" animate={calmMotion ? undefined : { scale: [1, 1.35], opacity: [.55, 0] }} transition={{ duration: 2, repeat: Infinity }} /></span>
            Available for meaningful opportunities
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 28, scale: .97 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1, delay: .2, ease: [0.16, 1, 0.3, 1] }} className="w-full min-w-0 lg:pt-4">
          <InteractiveDeveloperPanel />
        </motion.div>
      </div>
    </section>
  );
}
