"use client";

import { motion, useReducedMotion } from "framer-motion";

const orbitDots = [
  { size: 5, color: "bg-cyan-300", duration: 9 },
  { size: 4, color: "bg-violet-300", duration: 13 },
  { size: 3, color: "bg-blue-300", duration: 17 },
];

export function HeroAtmosphere() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-[12%] top-[8%] h-[34rem] w-[34rem] rounded-full bg-violet-600/[.11] blur-[110px]"
        animate={reducedMotion ? undefined : { x: [0, 90, 20, 0], y: [0, 45, -20, 0], scale: [1, 1.14, 0.94, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[10%] top-[14%] h-[32rem] w-[32rem] rounded-full bg-blue-500/[.1] blur-[105px]"
        animate={reducedMotion ? undefined : { x: [0, -70, 15, 0], y: [0, -25, 55, 0], scale: [1, 0.92, 1.16, 1] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-[-15%] top-[22%] h-28 w-[42%] -rotate-12 bg-gradient-to-r from-transparent via-cyan-300/[.055] to-transparent blur-2xl"
        animate={reducedMotion ? undefined : { x: ["-30%", "310%"], opacity: [0, 0.8, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-28%] left-1/2 h-[55%] w-[125%] -translate-x-1/2 opacity-[.075] [background-image:linear-gradient(rgba(103,232,249,.75)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,.8)_1px,transparent_1px)] [background-size:58px_58px] [mask-image:linear-gradient(to_bottom,transparent,black_28%,transparent_86%)] [transform:perspective(520px)_rotateX(62deg)]"
        animate={reducedMotion ? undefined : { y: [0, 22, 0], opacity: [0.045, 0.085, 0.045] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute right-[4%] top-[14%] hidden size-[34rem] place-items-center lg:grid">
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-white/[.055]"
            style={{ width: `${62 + ring * 19}%`, height: `${62 + ring * 19}%`, rotateX: 67, rotateZ: -18 }}
            animate={reducedMotion ? undefined : { rotateZ: ring % 2 ? [0, -360] : [0, 360] }}
            transition={{ duration: 28 + ring * 9, repeat: Infinity, ease: "linear" }}
          >
            <span className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-full ${orbitDots[ring].color}`} style={{ width: orbitDots[ring].size, height: orbitDots[ring].size, boxShadow: "0 0 14px currentColor" }} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-cyan-300/15 to-transparent"
        animate={reducedMotion ? undefined : { left: ["8%", "92%"], opacity: [0, 1, 0] }}
        transition={{ duration: 7, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
      />
    </div>
  );
}
