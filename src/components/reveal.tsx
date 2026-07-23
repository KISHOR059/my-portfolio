"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const mobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useReducedMotion();

  if (mobile || reducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-6% 0px -8%", amount: 0.12 }}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.58, delay },
      }}
    >
      {children}
    </motion.div>
  );
}
