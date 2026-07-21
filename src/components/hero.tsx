"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Sparkles } from "lucide-react";
import { FloatingLaptop } from "@/components/floating-laptop";
import { TypingText } from "@/components/typing-text";
import { buttonVariants } from "@/components/ui/button";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden px-3 pb-16 pt-28 sm:px-4 lg:pb-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-8">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1 }} className="relative z-10 max-w-2xl">
          <motion.div variants={item} transition={{ duration: 0.55 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[.08] px-3.5 py-2 text-xs font-medium text-violet-100 backdrop-blur-xl">
            <Sparkles className="size-3.5 text-cyan-300" />
            Welcome to my portfolio
          </motion.div>
          <motion.p variants={item} transition={{ duration: 0.55 }} className="mb-3 text-lg font-medium text-slate-400 sm:text-xl">Hi, I&apos;m <span className="text-white">{portfolio.name}</span></motion.p>
          <motion.h1 variants={item} transition={{ duration: 0.65 }} className="text-balance text-5xl font-extrabold leading-[.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[5.3rem]">
            Software <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">Engineer</span>
          </motion.h1>
          <motion.div variants={item} transition={{ duration: 0.55 }} className="mt-6"><TypingText words={portfolio.roles} /></motion.div>
          <motion.p variants={item} transition={{ duration: 0.55 }} className="mt-6 max-w-xl text-pretty text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">{portfolio.intro}</motion.p>
          <motion.div variants={item} transition={{ duration: 0.55 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="#projects" className={buttonVariants({ variant: "glow", size: "lg" })}>Explore projects <ArrowRight className="size-4" /></motion.a>
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href={portfolio.resumeUrl} download className={cn(buttonVariants({ variant: "outline", size: "lg" }))}><Download className="size-4" /> Download resume</motion.a>
          </motion.div>
          <motion.div variants={item} transition={{ duration: 0.55 }} className="mt-10 flex items-center gap-4 text-xs text-slate-500">
            <span className="flex -space-x-2" aria-hidden="true">
              {["K", "S", "+"].map((letter) => <span key={letter} className="grid size-8 place-items-center rounded-full border-2 border-[#050816] bg-gradient-to-br from-violet-500/40 to-blue-500/20 text-[10px] font-semibold text-white">{letter}</span>)}
            </span>
            <span><strong className="block font-semibold text-slate-200">Building with purpose</strong>Available for meaningful work</span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="relative lg:-mr-8">
          <FloatingLaptop />
        </motion.div>
      </div>
      <motion.a href="#about" aria-label="Scroll to about" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[.25em] text-slate-500 lg:flex" animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        Scroll <ArrowDown className="size-3.5" />
      </motion.a>
    </section>
  );
}
