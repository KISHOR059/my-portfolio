"use client";

import {
  SiDocker,
  SiGit,
  SiGithubactions,
  SiIntellijidea,
  SiJavascript,
  SiKubernetes,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { LogoLoop, type LogoItem } from "@/components/ui/logo-loop";

const technologies: Array<{ name: string; icon: IconType; color: string }> = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Java", icon: SiOpenjdk, color: "#E76F00" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Redis", icon: SiRedis, color: "#FF4438" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "IntelliJ IDEA", icon: SiIntellijidea, color: "#FE5F86" },
];

const logos: LogoItem[] = technologies.map(({ name, icon: Icon, color }) => ({
  title: name,
  ariaLabel: name,
  node: (
    <div className="flex items-center gap-3 rounded-2xl border border-white/[.075] bg-white/[.035] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.04)] transition-[border-color,background-color,box-shadow] duration-300 group-hover/logo:border-white/15 group-hover/logo:bg-white/[.065] group-hover/logo:shadow-[0_0_24px_rgba(124,58,237,.14)]">
      <Icon className="size-7 shrink-0" style={{ color }} aria-hidden="true" />
      <span className="whitespace-nowrap text-sm font-semibold text-slate-300 group-hover/logo:text-white">{name}</span>
    </div>
  ),
}));

export function TechnologyLogoLoop() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/[.07] bg-[#080b1b]/65 py-5 shadow-[0_24px_80px_rgba(0,0,0,.2),inset_0_1px_0_rgba(255,255,255,.04)] sm:mt-14 sm:py-6">
      <div className="pointer-events-none absolute inset-x-1/4 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent shadow-[0_0_20px_rgba(139,92,246,.5)]" />
      <div className="mb-5 flex items-center justify-center gap-3 px-5 font-mono text-[10px] uppercase tracking-[.24em] text-slate-500">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400/50" />
        Technology ecosystem
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400/50" />
      </div>
      <LogoLoop
        logos={logos}
        speed={62}
        logoHeight={54}
        gap={18}
        pauseOnHover
        fadeOut
        fadeOutColor="#080b1b"
        scaleOnHover
        ariaLabel="Technologies I work with"
      />
    </div>
  );
}
