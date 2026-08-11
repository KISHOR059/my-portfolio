"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Download, Radio, Sparkles } from "lucide-react";
import { ProfilePortrait } from "@/components/profile-portrait";
import { ReactBitsHeroBackground } from "@/components/react-bits-hero-background";
import { portfolio } from "@/data/portfolio";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAccentColor } from "@/components/accent-color-provider";
import { useHeroTheme } from "@/components/hero-theme-provider";

const LightPillar = dynamic(() => import("@/components/light-pillar"), { ssr: false });
const DotField = dynamic(() => import("@/components/dot-field"), { ssr: false });
const Lightfall = dynamic(() => import("@/components/lightfall"), { ssr: false });
const LightRays = dynamic(() => import("@/components/ui/light-rays").then((module) => module.LightRays), { ssr: false });
const SoftAurora = dynamic(() => import("@/components/soft-aurora"), { ssr: false });

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const parsed = Number.parseInt(value, 16);
  return `${(parsed >> 16) & 255}, ${(parsed >> 8) & 255}, ${parsed & 255}`;
}

function mixHex(hex: string, target: string, amount: number) {
  const a = hex.replace("#", "");
  const b = target.replace("#", "");
  const mix = (i: number) => {
    const from = Number.parseInt(a.slice(i, i + 2), 16);
    const to = Number.parseInt(b.slice(i, i + 2), 16);
    return Math.round(from + (to - from) * amount)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${mix(0)}${mix(2)}${mix(4)}`;
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const mobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { margin: "120px 0px" });
  const calmMotion = mobile || reducedMotion || !heroInView;
  const { accentColor } = useAccentColor();
  const { theme } = useHeroTheme();
  const lightfallColors = useMemo(
    () => [mixHex(accentColor, "#ffffff", 0.65), accentColor, mixHex(accentColor, "#ffffff", 0.25)],
    [accentColor],
  );
  const lightfallBackground = useMemo(() => mixHex(accentColor, "#000000", 0.75), [accentColor]);

  return (
    <section ref={heroRef} id="home" className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden px-4 pb-18 pt-28 sm:px-6 lg:pt-32">
      {theme === "Halo" && <ReactBitsHeroBackground accentColor={accentColor} />}
      {theme === "pillar" && (
        <>
          <LightPillar
            className="pointer-events-none"
            topColor={accentColor}
            bottomColor={mixHex(accentColor, "#ffffff", 0.45)}
            intensity={1.0}
            rotationSpeed={0.3}
            glowAmount={0.005}
            pillarWidth={3.0}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={45}
            interactive={false}
            mixBlendMode="screen"
          />
          <div className="absolute inset-0 hidden md:block">
            <DotField
              className="pointer-events-none"
              dotRadius={1.5}
              dotSpacing={14}
              cursorRadius={500}
              cursorForce={0.1}
              bulgeOnly
              bulgeStrength={67}
              sparkle={false}
              waveAmplitude={0}
              gradientFrom={`rgba(${hexToRgb(accentColor)}, 0.62)`}
              gradientTo={`rgba(${hexToRgb(accentColor)}, 0.46)`}
            />
          </div>
        </>
      )}
      {theme === "lightfall" && (
        <div className="absolute inset-0">
          <Lightfall
            colors={lightfallColors}
            backgroundColor={lightfallBackground}
            speed={1}
            streakCount={8}
            streakWidth={1}
            streakLength={1}
            glow={1}
            density={0.2}
            twinkle={1}
            zoom={2}
            backgroundGlow={1}
            opacity={1}
            mouseInteraction={true}
            mouseStrength={0.5}
            mouseRadius={0.6}
          />
        </div>
      )}
      {theme === "rays" && (
        <div className="absolute inset-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3.0}
            pulsating
            fadeDistance={1.0}
            saturation={1.4}
            followMouse
            mouseInfluence={0.12}
            noiseAmount={0.03}
            distortion={0.05}
            opacity={1.6}
          />
        </div>
      )}
      {theme === "softAurora" && (
        <div className="absolute inset-0">
          <SoftAurora
            speed={0.6}
            scale={1.5}
            brightness={1.0}
            color1="#f7f7f7"
            color2="#e100ff"
            noiseFrequency={2.5}
            noiseAmplitude={1.0}
            bandHeight={0.5}
            bandSpread={1.0}
            octaveDecay={0.1}
            layerOffset={0}
            colorSpeed={1.0}
            enableMouseInteraction={true}
            mouseInfluence={0.25}
          />
        </div>
      )}
      <div className="relative z-10 mx-auto grid w-full max-w-[82.75rem] items-start gap-12 lg:grid-cols-2 lg:gap-5 xl:gap-8">
        <motion.div initial="hidden" animate="visible" transition={{ delayChildren: .08, staggerChildren: .1 }} className="flex max-w-2xl flex-col items-center gap-5 text-center lg:items-start lg:pt-5 lg:text-left">
          <motion.div variants={item} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }} className="inline-flex items-center gap-2 rounded-xl border border-white/[.09] bg-[#120f17]/55 p-1 pr-3 font-mono text-[10px] uppercase text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-2xl sm:text-xs">
            <span className="rounded-md bg-violet-500 px-2.5 py-1 font-semibold text-white">Hello</span>
            <Sparkles className="size-3 text-cyan-300" /> Welcome to my portfolio
          </motion.div>

          <motion.h1 variants={item} transition={{ duration: .82, ease: [0.16, 1, 0.3, 1] }} className="text-balance text-[clamp(2.65rem,5.4vw,4.45rem)] font-medium leading-[1.04] tracking-[-0.045em] text-white">
            Hi, I&apos;m Kishor.<br />
            <motion.span className="inline-block bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent" style={{ backgroundSize: "200% 100%" }} animate={calmMotion ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>Software Engineer</motion.span><br />
            <span className="text-slate-300">for real-world systems.</span>
          </motion.h1>

          <motion.div variants={item} transition={{ duration: .76 }} className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-[10px] text-slate-500 lg:justify-start">
            {portfolio.roles.map((role) => <span key={role} className="rounded-lg border border-white/[.07] bg-white/[.025] px-2.5 py-1.5">{role}</span>)}
          </motion.div>

          <motion.div variants={item} transition={{ duration: .76 }} className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row lg:justify-start">
            <motion.a
              whileHover={calmMotion ? undefined : { y: -3, scale: 1.02 }}
              whileTap={{ scale: .98 }}
              href="#projects"
              className="group relative isolate inline-flex h-14 min-w-[196px] items-center justify-center gap-3 overflow-hidden rounded-2xl border border-violet-300/35 bg-[linear-gradient(115deg,rgba(109,40,217,.95),rgba(67,56,202,.92)_52%,rgba(8,145,178,.88))] px-5 font-mono text-xs font-semibold uppercase tracking-[.06em] text-white shadow-[0_12px_38px_rgba(91,33,182,.38),0_0_26px_rgba(59,130,246,.2),inset_0_1px_0_rgba(255,255,255,.24)] transition-[border-color,box-shadow] duration-300 hover:border-cyan-200/55 hover:shadow-[0_16px_46px_rgba(91,33,182,.48),0_0_34px_rgba(34,211,238,.28),inset_0_1px_0_rgba(255,255,255,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
            >
              <span className="absolute inset-[1px] -z-10 rounded-[15px] bg-[linear-gradient(120deg,rgba(255,255,255,.08),transparent_38%,rgba(34,211,238,.09))]" />
              <motion.span
                className="absolute inset-y-[-40%] left-[-35%] w-[28%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent blur-sm"
                animate={calmMotion ? undefined : { x: ["0%", "520%"] }}
                transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
              />
              <span className="relative">Explore projects</span>
              <span className="relative grid size-8 place-items-center rounded-xl border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,.15)] transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/15">
                <ArrowRight className="size-4" />
              </span>
            </motion.a>

            <motion.a
              whileHover={calmMotion ? undefined : { y: -3, scale: 1.015 }}
              whileTap={{ scale: .98 }}
              href={portfolio.resumeUrl}
              download
              className="group relative inline-flex h-14 min-w-[196px] items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/[.13] bg-[linear-gradient(145deg,rgba(19,22,43,.94),rgba(10,12,27,.88))] px-5 font-mono text-xs font-semibold uppercase tracking-[.06em] text-slate-100 shadow-[0_12px_34px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-2xl transition-[border-color,box-shadow,color] duration-300 hover:border-cyan-300/35 hover:text-white hover:shadow-[0_14px_38px_rgba(0,0,0,.34),0_0_28px_rgba(34,211,238,.12),inset_0_1px_0_rgba(255,255,255,.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
            >
              <span className="absolute inset-x-[18%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
              <span className="relative grid size-8 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/[.06] text-cyan-200 transition-[border-color,background-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-cyan-300/30 group-hover:bg-cyan-300/[.1]">
                <Download className="size-4" />
              </span>
              <span className="relative">Download resume</span>
            </motion.a>
          </motion.div>

          <motion.div variants={item} transition={{ duration: .76 }} className="mt-1 flex items-center gap-2.5 font-mono text-[10px] text-slate-500">
            <span className="relative grid size-7 place-items-center rounded-lg border border-emerald-300/15 bg-emerald-400/[.06] text-emerald-300"><Radio className="size-3" /><motion.span className="absolute inset-0 rounded-lg border border-emerald-300/20" animate={calmMotion ? undefined : { scale: [1, 1.35], opacity: [.55, 0] }} transition={{ duration: 2, repeat: Infinity }} /></span>
            Available for meaningful opportunities
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 28, scale: .97 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1, delay: .2, ease: [0.16, 1, 0.3, 1] }} className="flex w-full min-w-0 justify-center lg:pt-4">
          <ProfilePortrait preload noGlow={theme === "rays" || theme === "softAurora"} className="max-w-[34rem]" />
        </motion.div>
      </div>
    </section>
  );
}
