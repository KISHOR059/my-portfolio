export const portfolio = {
  name: "Kishor",
  initials: "KS",
  role: "Software Engineer",
  availability: "Available for select opportunities",
  location: "India · Open to remote",
  email: "hello@kishor.dev",
  intro:
    "I build reliable, thoughtful digital products across the stack—turning complex ideas into fast, intuitive experiences people enjoy using.",
  about:
    "I'm a software engineer who enjoys working at the intersection of clean architecture and expressive interfaces. From robust Java services to polished React experiences, I care about the details that make software feel effortless.",
  aboutSecondary:
    "My approach is practical: understand the real problem, design the smallest strong solution, and keep improving it with feedback.",
  roles: ["Full Stack Developer", "Java Developer", "React Developer"],
  resumeUrl: "/kishor-resume.txt",
  social: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  stats: [
    { value: "12+", label: "Projects" },
    { value: "2+", label: "Years experience" },
    { value: "18+", label: "Technologies" },
    { value: "4", label: "Certifications" },
  ],
  skillGroups: [
    { category: "Frontend", icon: "PanelsTopLeft", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", icon: "ServerCog", skills: ["Java", "Spring Boot", "Node.js", "REST APIs"] },
    { category: "Database", icon: "Database", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
    { category: "Cloud", icon: "CloudCog", skills: ["AWS", "Vercel", "Cloudflare", "Firebase"] },
    { category: "DevOps", icon: "Container", skills: ["Docker", "GitHub Actions", "CI/CD", "Linux"] },
    { category: "Tools", icon: "Wrench", skills: ["Git", "Postman", "Figma", "IntelliJ IDEA"] },
  ],
  projects: [
    {
      title: "Orbit Analytics",
      description: "A realtime analytics workspace that turns product events into clear funnels, retention signals, and decisions.",
      tech: ["Next.js", "TypeScript", "PostgreSQL"],
      github: "https://github.com/",
      live: "#contact",
      visual: "analytics",
      accent: "violet",
    },
    {
      title: "Nexus Commerce",
      description: "A fast, composable storefront with a considered checkout flow, inventory sync, and an accessible design system.",
      tech: ["React", "Spring Boot", "Redis"],
      github: "https://github.com/",
      live: "#contact",
      visual: "commerce",
      accent: "blue",
    },
    {
      title: "Pulse Workspace",
      description: "A focused collaboration hub for distributed teams to align projects, conversations, and weekly momentum.",
      tech: ["Next.js", "Node.js", "MongoDB"],
      github: "https://github.com/",
      live: "#contact",
      visual: "workspace",
      accent: "cyan",
    },
  ],
  experience: [
    {
      period: "2024 — Present",
      role: "Software Engineer",
      company: "Product Engineering",
      description: "Building scalable web products, owning features from architecture through launch, and improving delivery quality across the stack.",
      highlights: ["Full-stack product delivery", "Performance & accessibility", "Reusable platform systems"],
    },
    {
      period: "2023 — 2024",
      role: "Java Developer",
      company: "Backend Systems",
      description: "Developed Spring Boot services and reliable APIs with an emphasis on maintainability, observability, and predictable performance.",
      highlights: ["REST API design", "Database optimization", "Automated testing"],
    },
    {
      period: "2022 — 2023",
      role: "Frontend Developer",
      company: "Digital Experiences",
      description: "Created responsive React interfaces and translated product ideas into accessible, component-driven user experiences.",
      highlights: ["React interfaces", "Design systems", "Responsive UX"],
    },
  ],
} as const;

export const navigation = ["Home", "About", "Skills", "Projects", "Experience", "Contact"] as const;

export type Project = (typeof portfolio.projects)[number];
