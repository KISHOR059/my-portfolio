"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const smoothX = useSpring(x, { stiffness: 140, damping: 24 });
  const smoothY = useSpring(y, { stiffness: 140, damping: 24 });
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 180);
      y.set(event.clientY - 180);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-30 size-[360px] rounded-full bg-cyan-400/[.035] blur-3xl"
      style={{ x: smoothX, y: smoothY }}
    />
  );
}
