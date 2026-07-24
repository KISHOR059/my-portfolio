"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { HeroDotField } from "@/components/ui/hero-dot-field";

const HeroColorBand = dynamic(
  () => import("@/components/ui/hero-color-band").then((module) => module.HeroColorBand),
  { ssr: false },
);

export function ReactBitsHeroBackground() {
  const reducedMotion = useReducedMotion();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const inView = useInView(backgroundRef, { margin: "120px 0px" });
  const animateBackground = !reducedMotion && inView;

  return (
    <div ref={backgroundRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-15%,rgba(179,0,179,.16),transparent_40%),linear-gradient(to_bottom,#050816_0%,#070817_58%,#050816_100%)]" />

      <HeroDotField
        className="hidden md:block"
        dotRadius={1.5}
        dotSpacing={14}
        cursorRadius={500}
        cursorForce={.1}
        bulgeOnly
        bulgeStrength={67}
        glowRadius={160}
        gradientFrom="rgba(179, 0, 179, 0.62)"
        gradientTo="rgba(179, 0, 179, 0.46)"
      />

      <motion.div
        className="absolute -bottom-[30%] left-[-45%] h-[170%] w-[190%] md:-bottom-[42%] md:left-[-22%] md:h-[205%] md:w-[144%]"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={animateBackground ? {
          opacity: 1,
          x: ["-14%", "9%", "15%", "-7%", "-14%"],
          y: ["14%", "-13%", "-4%", "11%", "14%"],
          rotate: [-3, 3, -2, 4, -3],
          scale: [1.02, 1.1, 1.04, 1.08, 1.02],
        } : undefined}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", opacity: { duration: .7, delay: .05, repeat: 0 } }}
      >
        <HeroColorBand
          className="absolute inset-0 opacity-100 mix-blend-screen"
          color="#B300B3"
          rotation={90}
          speed={.24}
          scale={1.24}
          frequency={1}
          warpStrength={1}
          noise={.055}
          bandWidth={.14}
          yOffset={.08}
          fadeTop={1.05}
          mouseInfluence={.36}
          iterations={1}
          intensity={1.38}
        />
      </motion.div>

      <motion.div
        className="absolute -left-[16%] top-[-12%] hidden size-[62vw] rounded-full bg-[radial-gradient(circle,rgba(179,0,179,.58)_0%,rgba(179,0,179,.3)_34%,rgba(179,0,179,.1)_56%,transparent_72%)] blur-[72px] mix-blend-screen md:block"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={animateBackground ? {
          opacity: 1,
          x: ["0vw", "54vw", "30vw", "7vw", "0vw"],
          y: ["0vh", "42vh", "12vh", "54vh", "0vh"],
          scale: [.9, 1.12, .98, 1.08, .9],
        } : undefined}
        transition={{ duration: 31, repeat: Infinity, ease: "easeInOut", opacity: { duration: .7, delay: .14, repeat: 0 } }}
      />

      <motion.div
        className="absolute -right-[10%] bottom-[-18%] hidden size-[46vw] rounded-full bg-[radial-gradient(circle,rgba(179,0,179,.52)_0%,rgba(179,0,179,.24)_38%,rgba(179,0,179,.08)_58%,transparent_74%)] blur-[64px] mix-blend-screen md:block"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={animateBackground ? {
          opacity: 1,
          x: ["0vw", "-42vw", "-18vw", "-55vw", "0vw"],
          y: ["0vh", "-48vh", "-12vh", "-30vh", "0vh"],
          scale: [.94, 1.08, 1.16, 1, .94],
        } : undefined}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut", opacity: { duration: .7, delay: .23, repeat: 0 } }}
      />

      <motion.div
        className="absolute left-[32%] top-[-20%] hidden size-[38vw] rounded-full bg-[radial-gradient(circle,rgba(179,0,179,.5)_0%,rgba(179,0,179,.22)_36%,rgba(179,0,179,.08)_60%,transparent_75%)] blur-[58px] mix-blend-screen md:block"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={animateBackground ? {
          opacity: 1,
          x: ["0vw", "30vw", "8vw", "-34vw", "0vw"],
          y: ["0vh", "32vh", "58vh", "22vh", "0vh"],
          scale: [.88, 1.14, 1, 1.1, .88],
        } : undefined}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", opacity: { duration: .7, delay: .32, repeat: 0 } }}
      />

      <motion.div
        className="absolute right-[-18%] top-[-24%] hidden size-[50vw] rounded-full bg-[radial-gradient(circle,rgba(179,0,179,.56)_0%,rgba(179,0,179,.28)_35%,rgba(179,0,179,.09)_58%,transparent_74%)] blur-[66px] mix-blend-screen md:block"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={animateBackground ? {
          opacity: 1,
          x: ["0vw", "-18vw", "-46vw", "-12vw", "0vw"],
          y: ["0vh", "18vh", "52vh", "35vh", "0vh"],
          scale: [.92, 1.1, 1.02, 1.14, .92],
        } : undefined}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut", opacity: { duration: .7, delay: .41, repeat: 0 } }}
      />

      <motion.div
        className="absolute left-[24%] top-[14%] z-[1] hidden size-[52vw] md:block"
        initial={reducedMotion ? false : { opacity: 0, scale: .55 }}
        animate={{ opacity: .88, scale: 1 }}
        transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(179,0,179,.78)_0%,rgba(179,0,179,.42)_34%,rgba(179,0,179,.13)_58%,transparent_74%)] blur-[62px] mix-blend-screen"
          animate={animateBackground ? {
            x: ["0vw", "13vw", "-12vw", "6vw", "0vw"],
            y: ["0vh", "17vh", "-12vh", "9vh", "0vh"],
            scale: [1, 1.1, .96, 1.07, 1],
          } : undefined}
          transition={{ duration: 29, delay: .55, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="absolute inset-0 opacity-20 md:hidden [background-image:radial-gradient(circle,rgba(203,213,225,.35)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      <div className="absolute left-[-28%] top-[4%] h-[62%] w-[156%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(179,0,179,.26),rgba(179,0,179,.1)_38%,transparent_70%)] blur-[48px] mix-blend-screen md:hidden" />

      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,transparent_0%,transparent_48%,rgba(5,8,22,.03)_58%,rgba(5,8,22,.12)_68%,rgba(5,8,22,.32)_78%,rgba(5,8,22,.68)_88%,#050816_100%)]" />
      <div className="absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-[#050816]/75 via-[#050816]/20 to-transparent" />
    </div>
  );
}
