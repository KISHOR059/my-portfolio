"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

const stars = Array.from({ length: 56 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 96}%`,
  size: index % 11 === 0 ? 2.5 : index % 5 === 0 ? 1.5 : 1,
  delay: (index % 12) * 0.32,
  duration: 2.8 + (index % 6) * 0.65,
}));

export function BackgroundParticles() {
  const reducedMotion = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const calmMotion = reducedMotion || mobile;
  const { scrollYProgress } = useScroll();
  const nearStarsY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const farStarsY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(76,54,180,.24),transparent_40%),radial-gradient(circle_at_85%_45%,rgba(19,88,160,.11),transparent_32%)]" />
      <motion.div className="absolute -left-40 hidden sm:block top-[22%] size-[28rem] rounded-full bg-violet-600/[.055] blur-[120px]" animate={calmMotion ? undefined : { x: [0, 180, 40, 0], y: [0, -60, 80, 0], scale: [1, 1.18, 0.9, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute -right-44 hidden sm:block top-[55%] size-[32rem] rounded-full bg-cyan-500/[.045] blur-[130px]" animate={calmMotion ? undefined : { x: [0, -160, -20, 0], y: [0, 80, -50, 0], scale: [1, 0.9, 1.2, 1] }} transition={{ duration: 29, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute inset-0 opacity-[.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" style={mobile ? undefined : { y: farStarsY }} />

      <motion.div className="absolute inset-0" style={mobile ? undefined : { y: nearStarsY }}>
        {(mobile ? stars.slice(0, 16) : stars).map((star, index) => (
          <motion.span
            key={index}
            className={index % 4 === 0 ? "absolute rounded-full bg-violet-100 shadow-[0_0_9px_rgba(167,139,250,.85)]" : "absolute rounded-full bg-cyan-100 shadow-[0_0_8px_rgba(103,232,249,.85)]"}
            style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
            animate={calmMotion ? undefined : { opacity: [0.14, index % 6 === 0 ? 1 : 0.72, 0.14], scale: [1, index % 8 === 0 ? 2.2 : 1.55, 1] }}
            transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      {!calmMotion && (
        <>
          <motion.span className="absolute left-[5%] top-[14%] h-px w-36 -rotate-[22deg] bg-gradient-to-r from-transparent via-cyan-100 to-transparent shadow-[0_0_8px_rgba(103,232,249,.5)]" animate={{ x: [0, 1000], y: [0, 430], opacity: [0, 1, 0] }} transition={{ duration: 4.6, repeat: Infinity, repeatDelay: 6.5, ease: "easeOut" }} />
          <motion.span className="absolute right-[24%] top-[32%] h-px w-24 -rotate-[18deg] bg-gradient-to-r from-transparent via-violet-100 to-transparent" animate={{ x: [0, 520], y: [0, 210], opacity: [0, 0.85, 0] }} transition={{ duration: 3.5, delay: 4.5, repeat: Infinity, repeatDelay: 9, ease: "easeOut" }} />
          <motion.div className="absolute left-[28%] top-[9%] size-1 rounded-full bg-white shadow-[0_0_16px_4px_rgba(255,255,255,.35)]" animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.5, 0.7] }} transition={{ duration: 4.4, repeat: Infinity }} />
        </>
      )}
    </div>
  );
}
