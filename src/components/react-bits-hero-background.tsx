"use client";

import { HeroColorBand } from "@/components/ui/hero-color-band";
import { HeroDotField } from "@/components/ui/hero-dot-field";

export function ReactBitsHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-15%,rgba(124,58,237,.16),transparent_40%),linear-gradient(to_bottom,#050816_0%,#070817_58%,#050816_100%)]" />

      <HeroDotField
        className="hidden md:block"
        dotRadius={1.5}
        dotSpacing={14}
        cursorRadius={500}
        cursorForce={.1}
        bulgeOnly
        bulgeStrength={67}
        glowRadius={160}
        gradientFrom="rgba(168, 85, 247, 0.62)"
        gradientTo="rgba(103, 232, 249, 0.46)"
      />

      <HeroColorBand
        className="absolute -bottom-[34%] left-0 right-0 hidden h-[150%] opacity-100 mix-blend-screen md:block"
        color="#a855f7"
        rotation={90}
        speed={.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        noise={.15}
        bandWidth={.14}
        yOffset={.3}
        fadeTop={.75}
        mouseInfluence={.3}
        iterations={1}
        intensity={1.9}
      />

      <div className="absolute inset-0 opacity-20 md:hidden [background-image:radial-gradient(circle,rgba(203,213,225,.35)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      <div className="absolute -bottom-[42%] left-[-15%] h-[86%] w-[130%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,.2),rgba(59,130,246,.09)_38%,transparent_70%)] blur-[54px] mix-blend-screen md:hidden" />

      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,transparent_0%,transparent_48%,rgba(5,8,22,.03)_58%,rgba(5,8,22,.12)_68%,rgba(5,8,22,.32)_78%,rgba(5,8,22,.68)_88%,#050816_100%)]" />
      <div className="absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-[#050816]/75 via-[#050816]/20 to-transparent" />
    </div>
  );
}
