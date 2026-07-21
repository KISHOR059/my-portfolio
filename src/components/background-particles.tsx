"use client";

import { motion, useReducedMotion } from "framer-motion";

const stars = Array.from({ length: 38 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 96}%`,
  size: index % 7 === 0 ? 2 : 1,
  delay: (index % 9) * 0.38,
  duration: 2.8 + (index % 5) * 0.7,
}));

export function BackgroundParticles() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(76,54,180,.22),transparent_40%),radial-gradient(circle_at_85%_45%,rgba(19,88,160,.1),transparent_32%)]" />
      <div className="absolute inset-0 opacity-[.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      {stars.map((star, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-cyan-100 shadow-[0_0_8px_rgba(103,232,249,.9)]"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          animate={reducedMotion ? undefined : { opacity: [0.18, 0.9, 0.18], scale: [1, 1.7, 1] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {!reducedMotion && (
        <>
          <motion.span
            className="shooting-star absolute left-[10%] top-[18%] h-px w-28 -rotate-[24deg] bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
            animate={{ x: [0, 820], y: [0, 360], opacity: [0, 1, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 7, ease: "easeOut" }}
          />
          <motion.span
            className="shooting-star absolute right-[18%] top-[38%] h-px w-20 -rotate-[20deg] bg-gradient-to-r from-transparent via-violet-200 to-transparent"
            animate={{ x: [0, 440], y: [0, 190], opacity: [0, 0.8, 0] }}
            transition={{ duration: 3.4, delay: 5, repeat: Infinity, repeatDelay: 10, ease: "easeOut" }}
          />
        </>
      )}
    </div>
  );
}
