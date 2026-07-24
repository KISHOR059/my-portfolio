"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const bootSteps = ["Interface", "Experience", "Systems"];

export function PortfolioLoader() {
  const [visible, setVisible] = useState(true);
  const [compactMotion, setCompactMotion] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const updateMotionBudget = () => {
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
      setCompactMotion(media.matches || (navigator.hardwareConcurrency ?? 8) <= 4 || memory <= 4);
    };
    updateMotionBudget();
    media.addEventListener("change", updateMotionBudget);
    return () => media.removeEventListener("change", updateMotionBudget);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timeout = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      setVisible(false);
    }, reducedMotion ? 500 : compactMotion ? 1800 : 2200);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [compactMotion, reducedMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="portfolio-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading Kishor's portfolio"
          className="fixed inset-0 z-[999] grid min-h-dvh place-items-center overflow-hidden bg-[#050816] px-6 [contain:strict]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.12 : compactMotion ? 0.3 : 0.42, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(156,0,229,.25),transparent_28%),radial-gradient(circle_at_50%_55%,rgba(34,211,238,.08),transparent_42%)]" />
          <div className="absolute inset-0 hidden opacity-25 sm:block [background-image:radial-gradient(circle,rgba(148,163,184,.48)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />

          <motion.div
            className="relative flex w-full max-w-sm transform-gpu flex-col items-center"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative grid size-36 place-items-center sm:size-40">
              <motion.div
                className="absolute inset-0 transform-gpu rounded-full border border-violet-400/25 will-change-transform"
                animate={reducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute left-1/2 top-[-4px] size-2 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_18px_#9c00e5]" />
              </motion.div>
              {!compactMotion ? (
                <motion.div
                  className="absolute inset-4 transform-gpu rounded-full border border-dashed border-cyan-300/25 will-change-transform"
                  animate={reducedMotion ? undefined : { rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              ) : null}
              <motion.div
                className="absolute inset-5 transform-gpu rounded-full bg-[radial-gradient(circle,rgba(156,0,229,.34),rgba(156,0,229,.08)_48%,transparent_72%)] will-change-transform"
                animate={reducedMotion ? undefined : compactMotion ? { opacity: [0.55, 0.82, 0.55] } : { scale: [0.92, 1.12, 0.92], opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-8 rounded-[1.65rem] border border-white/10 bg-[linear-gradient(145deg,rgba(156,0,229,.2),rgba(9,13,32,.94)_48%,rgba(34,211,238,.1))] shadow-[0_0_38px_rgba(156,0,229,.26),inset_0_1px_0_rgba(255,255,255,.14)]" />
              <motion.span
                className="relative font-mono text-2xl font-bold tracking-[-.12em] text-white"
                animate={reducedMotion || compactMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                &lt;/&gt;
              </motion.span>
            </div>

            <div className="mt-7 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[.32em] text-cyan-300/75">Initializing workspace</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                kishor<span className="text-cyan-300">.dev</span>
              </h2>
            </div>

            <div className="mt-8 w-full">
              <div className="h-px overflow-hidden bg-white/10">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300 shadow-[0_0_14px_rgba(34,211,238,.8)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reducedMotion ? 0.35 : compactMotion ? 1.45 : 1.85, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 font-mono text-[8px] uppercase tracking-[.16em] text-slate-500 sm:text-[9px]">
                {bootSteps.map((step, index) => (
                  <motion.span
                    key={step}
                    initial={{ opacity: 0.28 }}
                    animate={{ opacity: 1 }}
                    className={index === bootSteps.length - 1 ? "text-cyan-300" : "text-slate-400"}
                    transition={{ delay: reducedMotion ? 0 : (compactMotion ? 0.18 : 0.3) + index * (compactMotion ? 0.18 : 0.28), duration: 0.3 }}
                  >
                    {String(index + 1).padStart(2, "0")} / {step}
                  </motion.span>
                ))}
              </div>
            </div>

            <span className="sr-only">Loading portfolio</span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
