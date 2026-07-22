"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export function ReactBitsHeroBackground() {
  const mobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(700);
  const pointerY = useMotionValue(340);
  const smoothX = useSpring(pointerX, { stiffness: 95, damping: 24, mass: 0.55 });
  const smoothY = useSpring(pointerY, { stiffness: 95, damping: 24, mass: 0.55 });
  const mask = useMotionTemplate`radial-gradient(360px circle at ${smoothX}px ${smoothY}px, black 5%, rgba(0,0,0,.7) 42%, transparent 76%)`;
  const calmMotion = mobile || reducedMotion;

  useEffect(() => {
    if (mobile) return;
    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mobile, pointerX, pointerY]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-15%,rgba(124,58,237,.18),transparent_38%),linear-gradient(to_bottom,#050816_0%,#070817_58%,#050816_100%)]" />

      <motion.div
        className="absolute inset-0 hidden opacity-55 md:block [background-image:radial-gradient(circle,rgba(203,213,225,.38)_1px,transparent_1.25px)] [background-size:17px_17px]"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />
      <div className="absolute inset-0 opacity-20 md:hidden [background-image:radial-gradient(circle,rgba(203,213,225,.35)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />

      <motion.div
        className="absolute -bottom-[52%] left-[-12%] h-[112%] w-[124%] rounded-[50%] bg-[conic-gradient(from_215deg_at_50%_50%,transparent_0deg,rgba(124,58,237,.55)_55deg,rgba(59,130,246,.42)_102deg,rgba(34,211,238,.23)_132deg,transparent_185deg)] blur-[54px] mix-blend-screen md:blur-[72px]"
        animate={calmMotion ? undefined : { rotate: [-4, 3, -4], scaleX: [1, 1.08, 1], y: [0, -22, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[46%] left-[8%] h-[96%] w-[100%] rounded-[48%] border-[2px] border-violet-300/20 bg-violet-500/[.08] blur-[22px] mix-blend-screen"
        animate={calmMotion ? undefined : { rotate: [2, -3, 2], scaleY: [1, 1.1, 1], x: [0, 32, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[8%] left-[18%] h-px w-[64%] bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent shadow-[0_0_25px_rgba(34,211,238,.26)]"
        animate={calmMotion ? undefined : { scaleX: [0.72, 1.05, 0.72], opacity: [0.2, 0.75, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-b from-transparent via-[#050816]/55 to-[#050816]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050816] via-[#050816]/60 to-transparent" />
    </div>
  );
}
