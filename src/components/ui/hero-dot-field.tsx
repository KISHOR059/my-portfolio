"use client";

import { memo, useEffect, useId, useRef } from "react";

type Dot = { ax: number; ay: number; sx: number; sy: number; vx: number; vy: number; x: number; y: number };

type HeroDotFieldProps = {
  className?: string;
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
};

const TWO_PI = Math.PI * 2;

export const HeroDotField = memo(function HeroDotField({
  className = "",
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = "rgba(168, 85, 247, 0.42)",
  gradientTo = "rgba(103, 232, 249, 0.28)",
}: HeroDotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const gradientId = useId().replace(/:/g, "");

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent || window.matchMedia("(max-width: 767px)").matches) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4 || deviceMemory <= 4;
    const frameInterval = 1000 / (lowPower ? 45 : 60);
    const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.2);
    const dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999, previousX: -9999, previousY: -9999, speed: 0 };
    const size = { width: 0, height: 0 };
    let frame = 0;
    let frameCount = 0;
    let engagement = 0;
    let glowOpacity = 0;
    let visible = true;
    let lastTime = performance.now();
    let lastRenderedAt = 0;
    let fillStyle: CanvasGradient | string = gradientFrom;

    const buildDots = () => {
      dots.length = 0;
      const step = dotRadius + dotSpacing;
      const columns = Math.floor(size.width / step);
      const rows = Math.floor(size.height / step);
      const paddingX = (size.width % step) / 2;
      const paddingY = (size.height % step) / 2;
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const ax = paddingX + column * step + step / 2;
          const ay = paddingY + row * step + step / 2;
          dots.push({ ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay });
        }
      }
    };
    const resize = () => {
      const rect = parent.getBoundingClientRect();
      size.width = rect.width;
      size.height = rect.height;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
      const gradient = context.createLinearGradient(0, 0, size.width, size.height);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);
      fillStyle = gradient;
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      if (mouse.previousX < -9000) {
        mouse.previousX = mouse.x;
        mouse.previousY = mouse.y;
      }
      if (frame === 0 && visible && !document.hidden) start();
    };
    const draw = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (!reducedMotion && now - lastRenderedAt < frameInterval) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastRenderedAt = now;
      const delta = Math.min(2.5, Math.max(0.5, (now - lastTime) / (1000 / 60)));
      lastTime = now;
      frameCount += 1;
      const distanceX = mouse.previousX - mouse.x;
      const distanceY = mouse.previousY - mouse.y;
      const pointerDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      mouse.speed += (pointerDistance - mouse.speed) * Math.min(1, 0.5 * delta);
      if (mouse.speed < 0.001) mouse.speed = 0;
      mouse.previousX = mouse.x;
      mouse.previousY = mouse.y;

      const targetEngagement = Math.min(mouse.speed / 5, 1);
      engagement += (targetEngagement - engagement) * Math.min(1, 0.06 * delta);
      if (engagement < 0.001) engagement = 0;
      glowOpacity += (engagement - glowOpacity) * Math.min(1, 0.08 * delta);

      if (glowRef.current) {
        glowRef.current.setAttribute("cx", String(mouse.x));
        glowRef.current.setAttribute("cy", String(mouse.y));
        glowRef.current.style.opacity = String(glowOpacity);
      }

      context.clearRect(0, 0, size.width, size.height);
      context.fillStyle = fillStyle;
      context.beginPath();
      const cursorRadiusSquared = cursorRadius * cursorRadius;
      const radius = dotRadius / 2;
      const time = frameCount * 0.02;

      for (let index = 0; index < dots.length; index++) {
        const dot = dots[index];
        const dx = mouse.x - dot.ax;
        const dy = mouse.y - dot.ay;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < cursorRadiusSquared && engagement > 0.01) {
          const distance = Math.max(1, Math.sqrt(distanceSquared));
          const angle = Math.atan2(dy, dx);
          if (bulgeOnly) {
            const proximity = 1 - distance / cursorRadius;
            const push = proximity * proximity * bulgeStrength * engagement;
            dot.sx += (dot.ax - Math.cos(angle) * push - dot.sx) * Math.min(1, 0.15 * delta);
            dot.sy += (dot.ay - Math.sin(angle) * push - dot.sy) * Math.min(1, 0.15 * delta);
          } else {
            const movement = (500 / distance) * (mouse.speed * cursorForce);
            dot.vx -= Math.cos(angle) * movement;
            dot.vy -= Math.sin(angle) * movement;
          }
        } else if (bulgeOnly) {
          dot.sx += (dot.ax - dot.sx) * Math.min(1, 0.1 * delta);
          dot.sy += (dot.ay - dot.sy) * Math.min(1, 0.1 * delta);
        }

        if (!bulgeOnly) {
          dot.vx *= Math.pow(0.9, delta);
          dot.vy *= Math.pow(0.9, delta);
          dot.x = dot.ax + dot.vx;
          dot.y = dot.ay + dot.vy;
          dot.sx += (dot.x - dot.sx) * Math.min(1, 0.1 * delta);
          dot.sy += (dot.y - dot.sy) * Math.min(1, 0.1 * delta);
        }

        let drawX = dot.sx;
        let drawY = dot.sy;
        if (waveAmplitude > 0) {
          drawY += Math.sin(dot.ax * 0.03 + time) * waveAmplitude;
          drawX += Math.cos(dot.ay * 0.03 + time * 0.7) * waveAmplitude * 0.5;
        }
        const sparkles = sparkle && ((((index * 2654435761) ^ (frameCount >> 3)) >>> 0) % 100) < 3;
        const renderRadius = sparkles ? radius * 1.8 : radius;
        context.moveTo(drawX + renderRadius, drawY);
        context.arc(drawX, drawY, renderRadius, 0, TWO_PI);
      }
      context.fill();
      const unsettled = sparkle || waveAmplitude > 0 || mouse.speed > 0.001 || engagement > 0.001 || dots.some((dot) => Math.abs(dot.sx - dot.ax) > 0.05 || Math.abs(dot.sy - dot.ay) > 0.05);
      if (!reducedMotion && unsettled) frame = requestAnimationFrame(draw);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      lastTime = performance.now();
      frame = requestAnimationFrame(draw);
    };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else cancelAnimationFrame(frame);
    }, { threshold: 0.01 });
    const onVisibilityChange = () => { if (!document.hidden && visible) start(); };

    resizeObserver.observe(parent);
    intersectionObserver.observe(parent);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    start();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [bulgeOnly, bulgeStrength, cursorForce, cursorRadius, dotRadius, dotSpacing, gradientFrom, gradientTo, sparkle, waveAmplitude]);

  return (
    <div className={`pointer-events-none absolute inset-0 size-full ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <svg className="absolute inset-0 size-full" focusable="false">
        <defs>
          <radialGradient id={gradientId}>
            <stop offset="0%" stopColor="#050816" />
            <stop offset="100%" stopColor="#050816" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle ref={glowRef} cx="-9999" cy="-9999" r={glowRadius} fill={`url(#${gradientId})`} style={{ opacity: 0, willChange: "opacity" }} />
      </svg>
    </div>
  );
});
