"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

export type RaysOrigin =
  | "top-center" | "top-left" | "top-right" | "left" | "right"
  | "bottom-center" | "bottom-left" | "bottom-right";

type LightRaysProps = {
  className?: string;
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
};

type Vec2 = [number, number];
type Vec3 = [number, number, number];
type RayUniforms = {
  iTime: { value: number }; iResolution: { value: Vec2 }; rayPos: { value: Vec2 };
  rayDir: { value: Vec2 }; raysColor: { value: Vec3 }; raysSpeed: { value: number };
  lightSpread: { value: number }; rayLength: { value: number }; pulsating: { value: number };
  fadeDistance: { value: number }; saturation: { value: number }; mousePos: { value: Vec2 };
  mouseInfluence: { value: number }; noiseAmount: { value: number }; distortion: { value: number };
};

const vertex = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() { vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = `
  precision highp float;
  uniform float iTime; uniform vec2 iResolution; uniform vec2 rayPos; uniform vec2 rayDir;
  uniform vec3 raysColor; uniform float raysSpeed; uniform float lightSpread; uniform float rayLength;
  uniform float pulsating; uniform float fadeDistance; uniform float saturation; uniform vec2 mousePos;
  uniform float mouseInfluence; uniform float noiseAmount; uniform float distortion;
  varying vec2 vUv;

  float noise(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
  float rayStrength(vec2 source, vec2 referenceDirection, vec2 coord, float seedA, float seedB, float speed) {
    vec2 sourceToCoord = coord - source;
    vec2 direction = normalize(sourceToCoord);
    float cosine = dot(direction, referenceDirection);
    float distorted = cosine + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
    float spread = pow(max(distorted, 0.0), 1.0 / max(lightSpread, 0.001));
    float distanceFromSource = length(sourceToCoord);
    float maxDistance = iResolution.x * rayLength;
    float lengthFalloff = clamp((maxDistance - distanceFromSource) / maxDistance, 0.0, 1.0);
    float fadeFalloff = clamp((iResolution.x * fadeDistance - distanceFromSource) / (iResolution.x * fadeDistance), 0.5, 1.0);
    float pulse = pulsating > 0.5 ? 0.82 + 0.18 * sin(iTime * speed * 3.0) : 1.0;
    float base = clamp((0.45 + 0.15 * sin(distorted * seedA + iTime * speed)) +
      (0.3 + 0.2 * cos(-distorted * seedB + iTime * speed)), 0.0, 1.0);
    return base * lengthFalloff * fadeFalloff * spread * pulse;
  }

  void main() {
    vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
    vec2 finalDirection = rayDir;
    if (mouseInfluence > 0.0) {
      vec2 mouseDirection = normalize(mousePos * iResolution.xy - rayPos);
      finalDirection = normalize(mix(rayDir, mouseDirection, mouseInfluence));
    }
    vec4 rayA = vec4(1.0) * rayStrength(rayPos, finalDirection, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
    vec4 rayB = vec4(1.0) * rayStrength(rayPos, finalDirection, coord, 22.3991, 18.0234, 1.1 * raysSpeed);
    vec4 color = rayA * 0.5 + rayB * 0.4;
    if (noiseAmount > 0.0) {
      float grain = noise(coord * 0.01 + iTime * 0.1);
      color.rgb *= 1.0 - noiseAmount + noiseAmount * grain;
    }
    float brightness = 1.0 - coord.y / iResolution.y;
    color.r *= 0.2 + brightness * 0.8;
    color.g *= 0.45 + brightness * 0.55;
    color.b *= 0.65 + brightness * 0.35;
    if (saturation != 1.0) {
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      color.rgb = mix(vec3(gray), color.rgb, saturation);
    }
    gl_FragColor = vec4(color.rgb * raysColor, color.a);
  }
`;

function hexToRgb(hex: string): Vec3 {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match ? [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255] : [1, 1, 1];
}

function getPlacement(origin: RaysOrigin, width: number, height: number) {
  const outside = 0.2;
  switch (origin) {
    case "top-left": return { anchor: [0, -outside * height] as Vec2, direction: [0, 1] as Vec2 };
    case "top-right": return { anchor: [width, -outside * height] as Vec2, direction: [0, 1] as Vec2 };
    case "left": return { anchor: [-outside * width, height * 0.5] as Vec2, direction: [1, 0] as Vec2 };
    case "right": return { anchor: [(1 + outside) * width, height * 0.5] as Vec2, direction: [-1, 0] as Vec2 };
    case "bottom-left": return { anchor: [0, (1 + outside) * height] as Vec2, direction: [0, -1] as Vec2 };
    case "bottom-center": return { anchor: [width * 0.5, (1 + outside) * height] as Vec2, direction: [0, -1] as Vec2 };
    case "bottom-right": return { anchor: [width, (1 + outside) * height] as Vec2, direction: [0, -1] as Vec2 };
    default: return { anchor: [width * 0.5, -outside * height] as Vec2, direction: [0, 1] as Vec2 };
  }
}

export function LightRays({
  className = "", raysOrigin = "top-center", raysColor = "#8b5cf6", raysSpeed = 0.45,
  lightSpread = 0.82, rayLength = 1.8, pulsating = true, fadeDistance = 1.2,
  saturation = 1.15, followMouse = true, mouseInfluence = 0.08, noiseAmount = 0.035,
  distortion = 0.025,
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia("(max-width: 767px)").matches) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio, 1.35) });
    const gl = renderer.gl;
    gl.canvas.style.width = "100%"; gl.canvas.style.height = "100%"; gl.canvas.style.display = "block";
    container.appendChild(gl.canvas);

    const uniforms: RayUniforms = {
      iTime: { value: 0 }, iResolution: { value: [1, 1] }, rayPos: { value: [0, 0] },
      rayDir: { value: [0, 1] }, raysColor: { value: hexToRgb(raysColor) }, raysSpeed: { value: raysSpeed },
      lightSpread: { value: lightSpread }, rayLength: { value: rayLength }, pulsating: { value: pulsating ? 1 : 0 },
      fadeDistance: { value: fadeDistance }, saturation: { value: saturation }, mousePos: { value: [0.5, 0.5] },
      mouseInfluence: { value: mouseInfluence }, noiseAmount: { value: noiseAmount }, distortion: { value: distortion },
    };
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program: new Program(gl, { vertex, fragment, uniforms }) });
    const pointer = { x: 0.5, y: 0.5 };
    const smoothPointer = { x: 0.5, y: 0.5 };
    let frame = 0;
    let visible = true;

    const resize = () => {
      const width = container.clientWidth; const height = container.clientHeight;
      renderer.setSize(width, height);
      const scaledWidth = width * renderer.dpr; const scaledHeight = height * renderer.dpr;
      uniforms.iResolution.value = [scaledWidth, scaledHeight];
      const placement = getPlacement(raysOrigin, scaledWidth, scaledHeight);
      uniforms.rayPos.value = placement.anchor; uniforms.rayDir.value = placement.direction;
    };
    const render = (time: number) => {
      if (!visible || document.hidden) return;
      uniforms.iTime.value = reducedMotion ? 0 : time * 0.001;
      smoothPointer.x += (pointer.x - smoothPointer.x) * 0.075;
      smoothPointer.y += (pointer.y - smoothPointer.y) * 0.075;
      uniforms.mousePos.value = [smoothPointer.x, smoothPointer.y];
      renderer.render({ scene: mesh });
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    const start = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(render); };
    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width; pointer.y = (event.clientY - rect.top) / rect.height;
    };
    const onVisibilityChange = () => { if (!document.hidden && visible) start(); };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else cancelAnimationFrame(frame);
    }, { threshold: 0.02 });

    resizeObserver.observe(container); intersectionObserver.observe(container);
    if (followMouse) container.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize(); start();

    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); intersectionObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.getExtension("WEBGL_lose_context")?.loseContext(); gl.canvas.remove();
    };
  }, [distortion, fadeDistance, followMouse, lightSpread, mouseInfluence, noiseAmount, pulsating, rayLength, raysColor, raysOrigin, raysSpeed, saturation]);

  return <div ref={containerRef} className={`absolute inset-0 ${className}`} aria-hidden="true" />;
}
