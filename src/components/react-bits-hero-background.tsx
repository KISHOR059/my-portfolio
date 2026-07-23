"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroColorBand } from "@/components/ui/hero-color-band";
import { HeroDotField } from "@/components/ui/hero-dot-field";

export function ReactBitsHeroBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-15%,rgba(147,51,234,.3),transparent_42%),linear-gradient(to_bottom,#040613_0%,#09061b_58%,#040613_100%)]" />

      <HeroDotField
        className="hidden md:block"
        dotRadius={1.5}
        dotSpacing={14}
        cursorRadius={500}
        cursorForce={.1}
        bulgeOnly
        bulgeStrength={67}
        glowRadius={160}
        gradientFrom="rgba(216, 180, 254, 0.82)"
        gradientTo="rgba(168, 85, 247, 0.66)"
      />

      <motion.div
        className="absolute left-[-14%] top-[18%] h-[66%] w-[128%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,.68)_0%,rgba(126,34,206,.46)_30%,rgba(76,29,149,.24)_52%,transparent_74%)] blur-[34px]"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={reducedMotion ? undefined : {
          opacity: 1,
          x: ["-4%", "4%", "-2%", "-4%"],
          y: ["3%", "-5%", "4%", "3%"],
          scale: [1, 1.06, .98, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", opacity: { duration: .8, repeat: 0 } }}
      />

      <motion.div
        className="absolute -bottom-[30%] left-[-45%] h-[170%] w-[190%] md:-bottom-[42%] md:left-[-22%] md:h-[205%] md:w-[144%]"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={reducedMotion ? undefined : {
          opacity: 1,
          x: ["-14%", "9%", "15%", "-7%", "-14%"],
          y: ["14%", "-13%", "-4%", "11%", "14%"],
          rotate: [-3, 3, -2, 4, -3],
          scale: [1.02, 1.1, 1.04, 1.08, 1.02],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", opacity: { duration: .7, delay: .05, repeat: 0 } }}
      >
        <HeroColorBand
          className="absolute inset-0 opacity-100"
          color="#7c3aed"
          rotation={90}
          speed={.24}
          scale={1.24}
          frequency={1}
          warpStrength={1}
          noise={.055}
          bandWidth={.2}
          yOffset={.08}
          fadeTop={1.05}
          mouseInfluence={.36}
          iterations={1}
          intensity={1.76}
        />
      </motion.div>

      <motion.div
        className="absolute -left-[16%] top-[-12%] hidden size-[62vw] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,.72)_0%,rgba(126,34,206,.44)_34%,rgba(76,29,149,.18)_56%,transparent_70%)] blur-[68px] md:block"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={reducedMotion ? undefined : {
          opacity: 1,
          x: ["0vw", "54vw", "30vw", "7vw", "0vw"],
          y: ["0vh", "42vh", "12vh", "54vh", "0vh"],
          scale: [.9, 1.12, .98, 1.08, .9],
        }}
        transition={{ duration: 31, repeat: Infinity, ease: "easeInOut", opacity: { duration: .7, delay: .14, repeat: 0 } }}
      />

      <motion.div
        className="absolute -right-[10%] bottom-[-18%] hidden size-[46vw] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,.7)_0%,rgba(109,40,217,.42)_38%,rgba(76,29,149,.16)_58%,transparent_72%)] blur-[60px] md:block"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={reducedMotion ? undefined : {
          opacity: 1,
          x: ["0vw", "-42vw", "-18vw", "-55vw", "0vw"],
          y: ["0vh", "-48vh", "-12vh", "-30vh", "0vh"],
          scale: [.94, 1.08, 1.16, 1, .94],
        }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut", opacity: { duration: .7, delay: .23, repeat: 0 } }}
      />

      <motion.div
        className="absolute left-[32%] top-[-20%] hidden size-[38vw] rounded-full bg-[radial-gradient(circle,rgba(126,34,206,.58)_0%,rgba(147,51,234,.3)_36%,rgba(88,28,135,.12)_60%,transparent_75%)] blur-[58px] md:block"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={reducedMotion ? undefined : {
          opacity: 1,
          x: ["0vw", "30vw", "8vw", "-34vw", "0vw"],
          y: ["0vh", "32vh", "58vh", "22vh", "0vh"],
          scale: [.88, 1.14, 1, 1.1, .88],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", opacity: { duration: .7, delay: .32, repeat: 0 } }}
      />

      <motion.div
        className="absolute right-[-18%] top-[-24%] hidden size-[50vw] rounded-full bg-[radial-gradient(circle,rgba(107,33,168,.62)_0%,rgba(126,34,206,.34)_35%,rgba(76,29,149,.12)_58%,transparent_74%)] blur-[66px] md:block"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={reducedMotion ? undefined : {
          opacity: 1,
          x: ["0vw", "-18vw", "-46vw", "-12vw", "0vw"],
          y: ["0vh", "18vh", "52vh", "35vh", "0vh"],
          scale: [.92, 1.1, 1.02, 1.14, .92],
        }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut", opacity: { duration: .7, delay: .41, repeat: 0 } }}
      />

      <motion.div
        className="absolute left-[24%] top-[14%] z-[1] hidden size-[52vw] md:block"
        initial={reducedMotion ? false : { opacity: 0, scale: .55 }}
        animate={{ opacity: .88, scale: 1 }}
        transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,.88)_0%,rgba(126,34,206,.58)_34%,rgba(76,29,149,.22)_58%,transparent_72%)] blur-[58px]"
          animate={reducedMotion ? undefined : {
            x: ["0vw", "13vw", "-12vw", "6vw", "0vw"],
            y: ["0vh", "17vh", "-12vh", "9vh", "0vh"],
            scale: [1, 1.1, .96, 1.07, 1],
          }}
          transition={{ duration: 29, delay: .55, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="absolute inset-0 opacity-20 md:hidden [background-image:radial-gradient(circle,rgba(203,213,225,.35)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      <div className="absolute left-[-28%] top-[4%] h-[68%] w-[156%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,.56),rgba(109,40,217,.28)_42%,transparent_70%)] blur-[40px] md:hidden" />

      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,transparent_0%,transparent_48%,rgba(5,8,22,.03)_58%,rgba(5,8,22,.12)_68%,rgba(5,8,22,.32)_78%,rgba(5,8,22,.68)_88%,#050816_100%)]" />
      <div className="absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-[#050816]/75 via-[#050816]/20 to-transparent" />
    </div>
  );
}
