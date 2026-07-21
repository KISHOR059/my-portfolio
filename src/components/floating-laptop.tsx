"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";

export function FloatingLaptop() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 18 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 18 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div className="relative mx-auto w-full max-w-[590px]" onPointerMove={handlePointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <div className="absolute inset-[8%] rounded-full bg-violet-600/20 blur-[90px]" />
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        animate={reducedMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 5.4, ease: "easeInOut", repeat: Infinity }}
        className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#050816]/30 shadow-[0_40px_120px_rgba(35,20,100,.34)]"
      >
        <Image
          src="/images/floating-workspace.png"
          alt="Futuristic floating laptop with a code screen, coffee mug, glass code panel and glowing planet"
          width={1140}
          height={1425}
          priority
          sizes="(max-width: 1024px) 92vw, 48vw"
          className="h-auto w-full select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/25 via-transparent to-transparent" />
      </motion.div>
      <motion.div
        className="absolute -right-3 top-[20%] hidden rounded-2xl border border-cyan-300/20 bg-[#081128]/70 px-4 py-3 shadow-[0_0_30px_rgba(34,211,238,.12)] backdrop-blur-xl sm:block"
        animate={reducedMotion ? undefined : { y: [0, 8, 0], rotate: [2, 4, 2] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="font-mono text-[10px] text-cyan-300">system.status</p>
        <p className="mt-1 text-xs font-semibold text-white"><span className="mr-2 inline-block size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />All systems ready</p>
      </motion.div>
    </div>
  );
}
