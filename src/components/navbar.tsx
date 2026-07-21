"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ContactRound as Linkedin, GitFork as Github, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, portfolio } from "@/data/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  useEffect(() => {
    const observers = navigation.map((item) => {
      const element = document.getElementById(item.toLowerCase());
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(item),
        { rootMargin: "-40% 0px -54%", threshold: 0 },
      );
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300",
        scrolled && "border-white/[.07] bg-[#050816]/75 shadow-[0_12px_40px_rgba(0,0,0,.22)] backdrop-blur-2xl",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Primary navigation">
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Kishor — home">
          <span className="grid size-9 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/10 font-mono text-sm font-bold text-white shadow-[0_0_20px_rgba(124,58,237,.2)] transition-transform group-hover:rotate-6">K</span>
          <span className="font-bold tracking-tight text-white">kishor<span className="text-cyan-300">.dev</span></span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn("relative rounded-full px-3.5 py-2 text-xs font-medium text-slate-400 transition-colors hover:text-white", active === item && "text-white")}
            >
              {active === item && <motion.span layoutId="active-nav" className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[.06]" />}
              {item}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-1.5 lg:flex">
          <a href={portfolio.social.github} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label="GitHub"><Github className="size-4" /></a>
          <a href={portfolio.social.linkedin} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label="LinkedIn"><Linkedin className="size-4" /></a>
          <a href={portfolio.resumeUrl} download className={cn(buttonVariants({ variant: "outline", size: "sm" }), "ml-2")}>Resume</a>
        </div>

        <button className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-white/[.07] bg-[#070a18]/95 px-5 backdrop-blur-2xl lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 py-4">
              {navigation.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className={cn("rounded-xl px-4 py-3 text-sm text-slate-300", active === item && "bg-white/[.06] text-cyan-300")}>{item}</a>
              ))}
              <a href={portfolio.resumeUrl} download className={cn(buttonVariants({ variant: "glow" }), "mt-3")}>Download resume</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
