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

const technologies: Array<{ name: string; icon: IconType }> = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Java", icon: SiOpenjdk },
  { name: "PHP", icon: SiPhp },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Laravel", icon: SiLaravel },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MySQL", icon: SiMysql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Redis", icon: SiRedis },
  { name: "Docker", icon: SiDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "GitHub Actions", icon: SiGithubactions },
  { name: "Linux", icon: SiLinux },
  { name: "Git", icon: SiGit },
  { name: "Postman", icon: SiPostman },
  { name: "IntelliJ IDEA", icon: SiIntellijidea },
];

const logos: LogoItem[] = technologies.map(({ name, icon: Icon }) => ({
  title: name,
  ariaLabel: name,
  node: <Icon className="size-12 shrink-0 text-white" aria-hidden="true" />,
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
        logoHeight={48}
        gap={40}
        pauseOnHover
        fadeOut
        fadeOutColor="#080b1b"
        ariaLabel="Technologies I work with"
      />
    </div>
  );
}
