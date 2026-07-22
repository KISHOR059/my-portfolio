"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

type HeroColorBandProps = {
  className?: string;
  color?: string;
  rotation?: number;
  speed?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  noise?: number;
  bandWidth?: number;
  yOffset?: number;
  fadeTop?: number;
  mouseInfluence?: number;
  iterations?: number;
  intensity?: number;
};

type Vec2 = [number, number];
type Vec3 = [number, number, number];

const vertex = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = `
  precision mediump float;
  uniform vec2 uCanvas;
  uniform float uTime;
  uniform float uSpeed;
  uniform vec2 uRot;
  uniform vec3 uColor;
  uniform float uScale;
  uniform float uFrequency;
  uniform float uWarpStrength;
  uniform float uNoise;
  uniform float uBandWidth;
  uniform float uYOffset;
  uniform float uFadeTop;
  uniform vec2 uPointer;
  uniform float uMouseInfluence;
  uniform int uIterations;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    float t = uTime * uSpeed;
    vec2 uv = vUv;
    uv.y += uYOffset;
    vec2 p = uv * 2.0 - 1.0;
    vec2 rotated = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
    float aspect = uCanvas.x / uCanvas.y;
    vec2 q = vec2(rotated.x * aspect, rotated.y);
    q *= 1.0 / max(uScale, 0.0001);
    q /= 0.5 + 0.2 * dot(q, q);
    q += (uPointer - rotated) * uMouseInfluence * 0.2;
    q += 0.2 * cos(t) - 7.56;

    for (int i = 0; i < 5; i++) {
      if (i >= uIterations) break;
      vec2 r = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
      q += (r - q) * uWarpStrength;
    }

    float m = length(q + sin(5.0 * q.y * uFrequency - 3.0 * t) * 0.25);
    float wave = 1.0 - exp(-6.0 / exp(6.0 * m));
    wave = pow(clamp(wave, 0.0, 1.0), uBandWidth);
    wave *= smoothstep(uFadeTop, 0.0, vUv.y);
    wave *= uIntensity;

    vec3 color = uColor * wave;
    color += (fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * uNoise;
    color = clamp(color, 0.0, 1.0) * wave;
    gl_FragColor = vec4(color, wave);
  }
`;

function hexToRgb(hex: string): Vec3 {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  ];
}

export function HeroColorBand({
  className = "",
  color = "#8b5cf6",
  rotation = 90,
  speed = 0.2,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  noise = 0.15,
  bandWidth = 0.14,
  yOffset = 0.3,
  fadeTop = 0.75,
  mouseInfluence = 0.3,
  iterations = 1,
  intensity = 1.25,
}: HeroColorBandProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, mobile ? .72 : 1.35) });
    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    container.appendChild(gl.canvas);

    const radians = rotation * Math.PI / 180;
    const uniforms = {
      uCanvas: { value: [1, 1] as Vec2 },
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uRot: { value: [Math.cos(radians), Math.sin(radians)] as Vec2 },
      uColor: { value: hexToRgb(color) },
      uScale: { value: scale },
      uFrequency: { value: frequency },
      uWarpStrength: { value: warpStrength },
      uNoise: { value: noise },
      uBandWidth: { value: bandWidth },
      uYOffset: { value: yOffset },
      uFadeTop: { value: fadeTop },
      uPointer: { value: [0, 0] as Vec2 },
      uMouseInfluence: { value: mouseInfluence },
      uIterations: { value: iterations },
      uIntensity: { value: intensity },
    };
    const program = new Program(gl, { vertex, fragment, uniforms, transparent: true, depthTest: false, depthWrite: false });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const pointerTarget: Vec2 = [0, 0];
    const pointerCurrent: Vec2 = [0, 0];
    let frame = 0;
    let visible = true;
    let lastTime = performance.now();
    const startedAt = lastTime;

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height);
      uniforms.uCanvas.value = [width, height];
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerTarget[0] = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerTarget[1] = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const render = (now: number) => {
      if (!visible || document.hidden) return;
      const delta = Math.min(0.05, Math.max(0, now - lastTime) / 1000);
      lastTime = now;
      uniforms.uTime.value = reducedMotion ? 0 : (now - startedAt) / 1000;
      const amount = Math.min(1, delta * 4);
      pointerCurrent[0] += (pointerTarget[0] - pointerCurrent[0]) * amount;
      pointerCurrent[1] += (pointerTarget[1] - pointerCurrent[1]) * amount;
      uniforms.uPointer.value = [pointerCurrent[0], pointerCurrent[1]];
      renderer.render({ scene: mesh });
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      lastTime = performance.now();
      frame = requestAnimationFrame(render);
    };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else cancelAnimationFrame(frame);
    }, { threshold: 0.01 });
    const onVisibilityChange = () => { if (!document.hidden && visible) start(); };

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
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
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, [bandWidth, color, fadeTop, frequency, intensity, iterations, mouseInfluence, noise, rotation, scale, speed, warpStrength, yOffset]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
