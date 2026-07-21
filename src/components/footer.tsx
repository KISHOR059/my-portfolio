"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { GitHubLogo, LinkedInLogo } from "@/components/brand-icons";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[.06] px-3 py-7 sm:px-4">
      <div className="mx-auto flex max-w-none flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div><p className="text-sm font-semibold text-white">Kishor<span className="text-cyan-300">.dev</span></p><p className="mt-1 text-xs text-slate-600">Designed &amp; engineered with intention · © {new Date().getFullYear()}</p></div>
        <div className="flex items-center gap-2">
          <a href={portfolio.social.github} target="_blank" rel="noreferrer" className="footer-icon group" aria-label="GitHub"><GitHubLogo className="size-[17px] transition-transform group-hover:scale-110" /></a>
          <a href={portfolio.social.linkedin} target="_blank" rel="noreferrer" className="footer-icon group hover:text-blue-400" aria-label="LinkedIn"><LinkedInLogo className="size-[17px] transition-transform group-hover:scale-110" /></a>
          <motion.a whileHover={{ y: -3 }} href="#home" className="ml-2 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-slate-400 transition-colors hover:border-cyan-300/25 hover:text-white">Back to top <ArrowUp className="size-3.5" /></motion.a>
        </div>
      </div>
    </footer>
  );
}
