"use client";

import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const bootSteps = ["Interface", "Experience", "Systems"];

export function PortfolioLoader() {
  const [visible, setVisible] = useState(true);
  const [compactMotion, setCompactMotion] = useState(false);
  const [progressComplete, setProgressComplete] = useState(false);
  const progress = useMotionValue(0);
  const percentage = useTransform(progress, (value) => `${Math.round(value * 100)}%`);
  const orbitRotation = useTransform(progress, [0, 1], [0, 360]);
  const reverseOrbitRotation = useTransform(progress, [0, 1], [0, -360]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const updateMotionBudget = () => {
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
      const low = media.matches || (navigator.hardwareConcurrency ?? 8) <= 4 || memory <= 4;
      setCompactMotion(low);
      if (low) document.documentElement.dataset.motionBudget = "low";
      else delete document.documentElement.dataset.motionBudget;
    };
    updateMotionBudget();
    media.addEventListener("change", updateMotionBudget);
    return () => {
      media.removeEventListener("change", updateMotionBudget);
      delete document.documentElement.dataset.motionBudget;
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [compactMotion, reducedMotion]);

  useEffect(() => {
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: reducedMotion ? 0.45 : compactMotion ? 4.5 : 5.5,
      ease: "linear",
      onComplete: () => setProgressComplete(true),
    });
    return () => controls.stop();
  }, [compactMotion, progress, reducedMotion]);

  useEffect(() => {
    if (!progressComplete || !visible) return;
    const timeout = window.setTimeout(() => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("portfolio-loading");
      setVisible(false);
    }, reducedMotion ? 80 : compactMotion ? 140 : 180);
    return () => window.clearTimeout(timeout);
  }, [compactMotion, progressComplete, reducedMotion, visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="portfolio-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading Kishor's portfolio"
          data-portfolio-loader
          className="fixed inset-0 z-[999] grid min-h-dvh place-items-center overflow-hidden bg-[#050816] px-6 [contain:strict]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.08 : compactMotion ? 0.24 : 0.3, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(179,0,179,.25),transparent_28%),radial-gradient(circle_at_50%_55%,rgba(34,211,238,.08),transparent_42%)]" />
          <div className="absolute inset-0 hidden opacity-25 sm:block [background-image:radial-gradient(circle,rgba(148,163,184,.48)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />

          <motion.div
            className="relative flex w-full max-w-sm transform-gpu flex-col items-center"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative grid size-36 place-items-center sm:size-40">
              <motion.div
                className="absolute inset-0 transform-gpu rounded-full border border-[#b300b3]/25 will-change-transform"
                style={{ rotate: orbitRotation }}
              >
                <span className="absolute left-1/2 top-[-4px] size-2 -translate-x-1/2 rounded-full bg-[#b300b3] shadow-[0_0_18px_#b300b3]" />
              </motion.div>
              {!compactMotion ? (
                <motion.div
                  className="absolute inset-4 transform-gpu rounded-full border border-dashed border-cyan-300/25 will-change-transform"
                  style={{ rotate: reverseOrbitRotation }}
                />
              ) : null}
              <motion.div
                className="absolute inset-5 transform-gpu rounded-full bg-[radial-gradient(circle,rgba(179,0,179,.34),rgba(179,0,179,.08)_48%,transparent_72%)] will-change-transform"
                animate={reducedMotion ? undefined : compactMotion ? { opacity: [0.55, 0.82, 0.55] } : { scale: [0.92, 1.12, 0.92], opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-8 rounded-[1.65rem] border border-white/10 bg-[linear-gradient(145deg,rgba(179,0,179,.2),rgba(9,13,32,.94)_48%,rgba(34,211,238,.1))] shadow-[0_0_38px_rgba(179,0,179,.26),inset_0_1px_0_rgba(255,255,255,.14)]" />
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
                  className="h-full origin-left bg-gradient-to-r from-[#b300b3] via-fuchsia-400 to-cyan-300 shadow-[0_0_14px_rgba(34,211,238,.8)]"
                  style={{ scaleX: progress }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center justify-between gap-2 font-mono text-[8px] uppercase tracking-[.16em] text-slate-500 sm:gap-3 sm:text-[9px]">
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
                <motion.span className="shrink-0 font-mono text-sm font-semibold tabular-nums text-cyan-200">{percentage}</motion.span>
              </div>
            </div>

            <span className="sr-only">Loading portfolio</span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
