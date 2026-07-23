"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  colors?: string[];
  fillOpacity?: number;
};

const positions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const colorMap = [0, 1, 2, 0, 1, 2, 1];

function parseHsl(value: string) {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  return match ? { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) } : { h: 270, s: 80, l: 72 };
}

function buildGlow(color: string, intensity: number) {
  const { h, s, l } = parseHsl(color);
  return [
    [1, 55], [3, 45], [7, 34], [15, 24], [28, 15], [48, 8],
  ].flatMap(([blur, alpha]) => [false, true].map((inset) => `${inset ? "inset " : ""}0 0 ${blur}px ${blur > 20 ? 2 : 0}px hsl(${h}deg ${s}% ${l}% / ${Math.min(alpha * intensity, 100)}%)`)).join(", ");
}

export function BorderGlow({
  children,
  className,
  edgeSensitivity = 24,
  glowColor = "270 86 72",
  backgroundColor = "#0b0e20",
  borderRadius = 24,
  glowRadius = 30,
  glowIntensity = .72,
  coneSpread = 24,
  colors = ["#a78bfa", "#3b82f6", "#67e8f9"],
  fillOpacity = .32,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [angle, setAngle] = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(0);
  const pointerFrame = useRef(0);
  const mobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useReducedMotion();

  const gradients = useMemo(() => {
    const mesh = positions.map((position, index) => `radial-gradient(at ${position}, ${colors[Math.min(colorMap[index], colors.length - 1)]} 0px, transparent 50%)`);
    return [...mesh, `linear-gradient(${colors[0]} 0 100%)`];
  }, [colors]);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (mobile || reducedMotion || pointerFrame.current) return;
    const clientX = event.clientX;
    const clientY = event.clientY;
    pointerFrame.current = requestAnimationFrame(() => {
      pointerFrame.current = 0;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = x - cx;
      const dy = y - cy;
      const kx = dx === 0 ? Infinity : cx / Math.abs(dx);
      const ky = dy === 0 ? Infinity : cy / Math.abs(dy);
      setEdgeProximity(Math.min(Math.max(1 / Math.min(kx, ky), 0), 1));
      const degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      setAngle(degrees < 0 ? degrees + 360 : degrees);
    });
  }, [mobile, reducedMotion]);

  useEffect(() => () => cancelAnimationFrame(pointerFrame.current), []);

  const colorSensitivity = edgeSensitivity + 20;
  const borderOpacity = hovered && !mobile ? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity)) : mobile ? .2 : 0;
  const glowOpacity = hovered && !mobile ? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity)) : 0;
  const angleValue = `${angle.toFixed(3)}deg`;
  const coneMask = `conic-gradient(from ${angleValue} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`;

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => { cancelAnimationFrame(pointerFrame.current); pointerFrame.current = 0; setHovered(false); setEdgeProximity(0); }}
      className={cn("relative isolate grid border border-white/10", className)}
      style={{ background: backgroundColor, borderRadius, transform: "translate3d(0,0,0.01px)" }}
    >
      <motion.div
        className="absolute inset-0 -z-[1] rounded-[inherit]"
        animate={{ opacity: borderOpacity }}
        transition={{ duration: hovered ? .2 : .55, ease: "easeOut" }}
        style={{
          border: "1px solid transparent",
          background: [`linear-gradient(${backgroundColor} 0 100%) padding-box`, "linear-gradient(transparent 0 100%) border-box", ...gradients.map((gradient) => `${gradient} border-box`)].join(", "),
          maskImage: coneMask,
          WebkitMaskImage: coneMask,
        }}
      />

      <motion.div
        className="absolute inset-0 -z-[1] rounded-[inherit]"
        animate={{ opacity: borderOpacity * fillOpacity }}
        transition={{ duration: hovered ? .22 : .6 }}
        style={{
          border: "1px solid transparent",
          background: gradients.map((gradient) => `${gradient} padding-box`).join(", "),
          maskImage: `radial-gradient(ellipse at 50% 50%, transparent 38%, black 72%), ${coneMask}`,
          WebkitMaskImage: `radial-gradient(ellipse at 50% 50%, transparent 38%, black 72%), ${coneMask}`,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
          mixBlendMode: "soft-light",
        } as CSSProperties}
      />

      <motion.span
        className="pointer-events-none absolute z-[1] rounded-[inherit]"
        animate={{ opacity: glowOpacity }}
        transition={{ duration: hovered ? .2 : .55 }}
        style={{
          inset: -glowRadius,
          maskImage: `conic-gradient(from ${angleValue} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
          WebkitMaskImage: `conic-gradient(from ${angleValue} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
          mixBlendMode: "plus-lighter",
        }}
      >
        <span className="absolute rounded-[inherit]" style={{ inset: glowRadius, boxShadow: buildGlow(glowColor, glowIntensity) }} />
      </motion.span>

      <div className="relative z-[2] flex h-full flex-col overflow-hidden rounded-[inherit]">{children}</div>
    </div>
  );
}
