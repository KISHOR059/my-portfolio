"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CodeXml, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { GitHubLogo, LinkedInLogo } from "@/components/brand-icons";
import { navigation, portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [active, setActive] = useState("Home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 50;
      setScrolled((current) => current === next ? current : next);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

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
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6">
      <div
        className={cn(
          "pointer-events-auto relative mx-auto w-full max-w-[105rem] rounded-2xl border border-transparent transition-[max-width,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-in-out",
          scrolled && "max-w-[79.75rem] border-white/[.055] bg-[#120f17]/70 shadow-[0_8px_34px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.035)] backdrop-blur-2xl",
        )}
      >
        <nav className="flex h-14 items-center justify-between px-2 pl-4 sm:pl-5" aria-label="Primary navigation">
          <div className="flex min-w-0 items-center">
            <a href="#home" className="group flex shrink-0 items-center gap-2.5" aria-label="Kishor — home">
              <span className="relative grid h-9 w-11 place-items-center overflow-hidden rounded-xl border border-violet-300/30 bg-gradient-to-br from-violet-500/30 via-blue-500/15 to-cyan-400/10 text-white shadow-[0_0_24px_rgba(124,58,237,.24),inset_0_1px_0_rgba(255,255,255,.16)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-cyan-300/40 group-hover:shadow-[0_0_30px_rgba(59,130,246,.32),inset_0_1px_0_rgba(255,255,255,.2)]">
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,.2),transparent_42%)]" />
                <CodeXml className="relative size-[19px] drop-shadow-[0_0_7px_rgba(103,232,249,.55)]" strokeWidth={2.2} />
              </span>
              <span className="hidden font-bold tracking-tight text-white sm:inline">kishor<span className="text-cyan-300">.dev</span></span>
            </a>

            <span className="mx-4 hidden select-none text-lg font-light text-white/45 lg:block">/</span>

            <div className="relative hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
              {navigation.map((item) => {
                const highlighted = hovered === item || (hovered === null && active === item);
                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onMouseEnter={() => setHovered(item)}
                    className={cn(
                      "relative z-10 rounded-xl px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[.04em] text-slate-400 transition-colors hover:text-white",
                      active === item && "text-white",
                    )}
                  >
                    {highlighted && (
                      <motion.span
                        layoutId="navbar-highlight"
                        className="absolute inset-0 -z-10 rounded-xl border border-white/[.08] bg-[#120f17]/55 shadow-[0_2px_16px_rgba(0,0,0,.2),inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-xl"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {item}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={portfolio.social.github} target="_blank" rel="noreferrer" className="group grid size-9 place-items-center rounded-[10px] border border-white/[.08] bg-[#120f17]/50 text-slate-400 shadow-[0_2px_16px_rgba(0,0,0,.18)] backdrop-blur-2xl transition-colors hover:border-white/15 hover:bg-[#120f17]/70 hover:text-white" aria-label="GitHub">
              <GitHubLogo className="size-[17px] transition-transform group-hover:scale-110" />
            </a>
            <a href={portfolio.social.linkedin} target="_blank" rel="noreferrer" className="group grid size-9 place-items-center rounded-[10px] border border-white/[.08] bg-[#120f17]/50 text-slate-400 shadow-[0_2px_16px_rgba(0,0,0,.18)] backdrop-blur-2xl transition-colors hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-400" aria-label="LinkedIn">
              <LinkedInLogo className="size-[17px] transition-transform group-hover:scale-110" />
            </a>
          </div>

          <button
            className="flex size-9 flex-col items-center justify-center gap-1 rounded-[10px] border border-white/[.08] bg-[#120f17]/50 p-2.5 text-white shadow-[0_2px_16px_rgba(0,0,0,.18)] backdrop-blur-2xl lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -7, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: .98 }}
              transition={{ duration: .2 }}
              className="absolute inset-x-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-white/[.07] bg-[#120f17]/95 p-2 shadow-[0_18px_50px_rgba(0,0,0,.42)] backdrop-blur-2xl lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className={cn("rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-[.04em] text-slate-300 transition-colors hover:bg-white/[.06] hover:text-white", active === item && "bg-white/[.06] text-cyan-300")}>{item}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
