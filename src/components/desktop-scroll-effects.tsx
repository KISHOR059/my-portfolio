"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

function ActiveDesktopEffects() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 105, damping: 26, mass: 0.28 });
  const leftOrbY = useTransform(progress, [0, 1], ["12vh", "76vh"]);
  const rightOrbY = useTransform(progress, [0, 1], ["74vh", "18vh"]);
  const orbOpacity = useTransform(progress, [0, 0.08, 0.92, 1], [0, 0.45, 0.45, 0]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
      <div className="absolute left-0 right-0 top-0 h-px bg-white/[.035]">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-violet-500 via-blue-400 to-cyan-300 shadow-[0_0_14px_rgba(103,232,249,.72)]"
          style={{ scaleX: progress }}
        />
      </div>
      <motion.span
        className="absolute -left-1 size-2 rounded-full bg-violet-300 shadow-[0_0_18px_4px_rgba(124,58,237,.38)]"
        style={{ top: leftOrbY, opacity: orbOpacity }}
      />
      <motion.span
        className="absolute -right-1 size-2 rounded-full bg-cyan-200 shadow-[0_0_18px_4px_rgba(34,211,238,.35)]"
        style={{ top: rightOrbY, opacity: orbOpacity }}
      />
    </div>
  );
}

export function DesktopScrollEffects() {
  const desktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useReducedMotion();

  if (!desktop || reducedMotion) return null;
  return <ActiveDesktopEffects />;
}
