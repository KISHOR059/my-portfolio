"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { GitHubLogo, LinkedInLogo } from "@/components/brand-icons";
import { navigation, portfolio } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-4 pt-5 sm:px-6 sm:pt-6">
      <div className="-mx-4 w-[calc(100%+2rem)] overflow-hidden border-y border-white/[.08] bg-white/[.025] shadow-[0_24px_80px_rgba(0,0,0,.25),inset_0_1px_0_rgba(255,255,255,.045)] sm:-mx-6 sm:w-[calc(100%+3rem)]">
        <div className="h-px bg-gradient-to-r from-violet-500/70 via-cyan-300/60 to-transparent" />
        <div className="flex w-full flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <a href="#home" className="group flex items-center gap-3" aria-label="Return to home">
            <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-[#10132b] font-mono text-xs font-bold text-cyan-200 transition-colors group-hover:border-cyan-300/40">&lt;/&gt;</span>
            <span><span className="block text-sm font-bold tracking-tight text-white">kishor<span className="text-cyan-300">.dev</span></span><span className="mt-0.5 block text-[10px] text-slate-400">Software Engineer · India</span></span>
          </a>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Footer navigation">
            {navigation.map((item) => <a key={item} href={item === "Home" ? "#home" : "#" + item.toLowerCase()} className="text-[11px] text-slate-400 transition-colors hover:text-white">{item}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href={portfolio.social.github} target="_blank" rel="noreferrer" className="footer-icon group" aria-label="GitHub"><GitHubLogo className="size-[16px] transition-transform group-hover:scale-110" /></a>
            <a href={portfolio.social.linkedin} target="_blank" rel="noreferrer" className="footer-icon group hover:text-blue-400" aria-label="LinkedIn"><LinkedInLogo className="size-[16px] transition-transform group-hover:scale-110" /></a>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: .97 }} href="#home" className="ml-2 inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[.035] px-3 py-2 text-[11px] text-slate-300 transition-colors hover:border-cyan-300/30 hover:text-white">Top <ArrowUp className="size-3" /></motion.a>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-1.5 border-t border-white/[.06] px-4 py-3 text-center sm:flex-row sm:px-5 sm:text-left">
          <p className="text-[10px] text-slate-500">Designed &amp; engineered with intention</p>
          <p className="font-mono text-[10px] text-slate-500">© {new Date().getFullYear()} Kishor</p>
        </div>
      </div>
    </footer>
  );
}
