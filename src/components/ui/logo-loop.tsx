"use client";

import type { CSSProperties, Key, ReactNode, RefObject } from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
  
export type LogoItem =
  | { node: ReactNode; href?: string; title?: string; ariaLabel?: string }
  | { src: string; alt: string; href?: string; title?: string; width?: number; height?: number };

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
};

const MIN_COPIES = 2;
const COPY_HEADROOM = 2;
const SMOOTH_TAU = 0.25;

function useResizeObserver(
  callback: () => void,
  refs: Array<RefObject<HTMLElement | null>>,
  dependencies: React.DependencyList,
) {
  useEffect(() => {
    const observers = refs.flatMap((ref) => {
      if (!ref.current) return [];
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return [observer];
    });
    callback();
    return () => observers.forEach((observer) => observer.disconnect());
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 70,
  direction = "left",
  logoHeight = 32,
  gap = 44,
  pauseOnHover = true,
  hoverSpeed,
  fadeOut = true,
  fadeOutColor = "#050816",
  scaleOnHover = true,
  ariaLabel = "Technology logos",
  className = "",
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const visibleRef = useRef(true);
  const resumeRef = useRef<(() => void) | null>(null);
  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [hovered, setHovered] = useState(false);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const width = sequenceRef.current?.getBoundingClientRect().width ?? 0;
    if (width <= 0) return;
    const roundedWidth = Math.ceil(width);
    setSequenceWidth(roundedWidth);
    setCopyCount(Math.max(MIN_COPIES, Math.ceil(containerWidth / roundedWidth) + COPY_HEADROOM));
  }, []);

  useResizeObserver(updateDimensions, [containerRef, sequenceRef], [logos, gap, logoHeight]);

  const effectiveHoverSpeed = hoverSpeed ?? (pauseOnHover ? 0 : undefined);
  const targetVelocity = Math.abs(speed) * (direction === "left" ? 1 : -1) * (speed < 0 ? -1 : 1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || sequenceWidth <= 0) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    offsetRef.current = ((offsetRef.current % sequenceWidth) + sequenceWidth) % sequenceWidth;

    if (reducedMotion) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const animate = (timestamp: number) => {
      if (!visibleRef.current || document.hidden) {
        lastTimeRef.current = null;
        frameRef.current = null;
        return;
      }
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const delta = Math.min(0.064, Math.max(0, timestamp - lastTimeRef.current) / 1000);
      lastTimeRef.current = timestamp;
      const desiredVelocity = hovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : targetVelocity;
      const easing = 1 - Math.exp(-delta / SMOOTH_TAU);
      velocityRef.current += (desiredVelocity - velocityRef.current) * easing;
      offsetRef.current = ((offsetRef.current + velocityRef.current * delta) % sequenceWidth + sequenceWidth) % sequenceWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      frameRef.current = requestAnimationFrame(animate);
    };

    const start = () => {
      if (frameRef.current !== null || !visibleRef.current || document.hidden) return;
      frameRef.current = requestAnimationFrame(animate);
    };
    resumeRef.current = start;
    start();
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTimeRef.current = null;
      resumeRef.current = null;
    };
  }, [effectiveHoverSpeed, hovered, sequenceWidth, targetVelocity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) resumeRef.current?.();
      else if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
        lastTimeRef.current = null;
      }
    }, { threshold: 0.01 });
    const onVisibilityChange = () => {
      if (!document.hidden && visibleRef.current) resumeRef.current?.();
    };
    observer.observe(container);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const renderLogo = useCallback((item: LogoItem, key: Key) => {
    const isNode = "node" in item;
    const content = isNode ? item.node : (
      // A regular image keeps the component reusable for local or remote logo assets.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={item.src} alt={item.alt} width={item.width} height={item.height ?? logoHeight} draggable={false} />
    );
    const label = isNode ? item.ariaLabel ?? item.title : item.alt;
    const inner = item.href ? (
      <a href={item.href} target="_blank" rel="noreferrer" aria-label={label}>{content}</a>
    ) : content;

    return (
      <li
        key={key}
        className={`group/logo flex shrink-0 items-center justify-center text-slate-400 transition-[color,transform,filter] duration-300 hover:text-white ${scaleOnHover ? "hover:scale-110" : ""}`}
        style={{ height: logoHeight }}
        title={item.title}
      >
        {inner}
      </li>
    );
  }, [logoHeight, scaleOnHover]);

  const copies = useMemo(() => Array.from({ length: copyCount }, (_, copyIndex) => (
    <ul
      key={copyIndex}
      ref={copyIndex === 0 ? sequenceRef : undefined}
      className="flex shrink-0 items-center"
      style={{ gap, paddingRight: gap }}
      aria-hidden={copyIndex > 0}
    >
      {logos.map((logo, logoIndex) => renderLogo(logo, `${copyIndex}-${logoIndex}`))}
    </ul>
  )), [copyCount, gap, logos, renderLogo]);

  const fadeStyle = fadeOut ? {
    WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    "--logo-loop-fade": fadeOutColor,
  } as CSSProperties : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={fadeStyle}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={() => effectiveHoverSpeed !== undefined && setHovered(true)}
      onMouseLeave={() => effectiveHoverSpeed !== undefined && setHovered(false)}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">{copies}</div>
    </div>
  );
});
