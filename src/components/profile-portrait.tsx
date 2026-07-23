"use client";

import { motion } from "framer-motion";
import { Code2, Coffee } from "lucide-react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function ProfilePortrait({ className, preload = false }: { className?: string; preload?: boolean }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-md", className)}>
      <div className="pointer-events-none absolute -inset-7 rounded-[3rem] bg-violet-600/18 blur-3xl" />
      <motion.div
        whileHover={{ y: -6, rotate: 1, scale: 1.012 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative aspect-square rounded-[2.25rem] bg-gradient-to-br from-violet-400 via-blue-500 to-cyan-300 p-px shadow-[0_28px_90px_rgba(0,0,0,.34),0_0_70px_rgba(124,58,237,.28)]"
      >
        <div className="relative size-full overflow-hidden rounded-[calc(2.25rem-1px)] border-[9px] border-[#070a18] bg-[#080b1b]">
          <Image
            src={portfolio.profileImage}
            alt="Portrait of Kishor"
            fill
            preload={preload}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 28rem, 42vw"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/75 via-transparent to-violet-950/10" />
          <span className="pointer-events-none absolute left-4 top-4 size-8 border-l border-t border-violet-200/60" />
          <span className="pointer-events-none absolute bottom-4 right-4 size-8 border-b border-r border-cyan-200/60" />
          <Code2 className="absolute right-4 top-4 size-11 rounded-xl border border-cyan-300/20 bg-[#071022]/75 p-2.5 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,.2)] backdrop-blur-xl" />
          <Coffee className="absolute bottom-4 left-4 size-11 rounded-xl border border-violet-300/20 bg-[#0b0820]/75 p-2.5 text-violet-300 shadow-[0_0_24px_rgba(124,58,237,.2)] backdrop-blur-xl" />
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#050816]/70 px-4 py-2 text-xs text-slate-200 shadow-[0_8px_30px_rgba(0,0,0,.28)] backdrop-blur-xl">
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" /> Open to create
          </div>
        </div>
      </motion.div>
    </div>
  );
}
