export const portfolio = {
  name: "Kishor",
  initials: "K",
  profileImage: "/images/kishor-profile.png",
  role: "Software Engineer",
  availability: "Available for select opportunities",
  location: "India · Open to remote",
  email: "mtkishor07@gmail.com",
  intro:
    "Passionate About Technology Driven by Innovation",
  about:
    "I'm a Software Engineer passionate about building scalable, reliable applications with clean architecture and modern technologies. I focus on creating high-performance software that delivers intuitive and meaningful user experiences.",
  aboutSecondary:
    "My engineering approach combines clean architecture, scalable design, and the practical use of AI to build reliable, maintainable, and future-ready applications.",
  roles: ["Software Engineer", "Full Stack Developer", "Cloud & DevOps Enthusiast"],
  resumeUrl: "/resume/kishor_resume.pdf",
  social: {
    github: "https://github.com/KISHOR059",
    linkedin: "https://linkedin.com/in/kishor-m-567b95297",
  },
  stats: [
    { value: "12+", label: "Projects" },
    { value: "2+", label: "Years experience" },
    { value: "18+", label: "Technologies" },
    { value: "4", label: "Certifications" },
  ],
  skillGroups: [
    { category: "Frontend", icon: "PanelsTopLeft", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Javascript"] },
    { category: "Backend", icon: "ServerCog", skills: ["Java", "PHP", "Node.js", "REST APIs", "Laravel"] },
    { category: "Database", icon: "Database", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
    { category: "Cloud", icon: "CloudCog", skills: ["Amazon Web Services (AWS)", "Azure", "Docker", "Kubernetes"] },
    { category: "DevOps", icon: "Container", skills: ["Docker", "GitHub Actions", "CI/CD", "Linux"] },
    { category: "Tools", icon: "Wrench", skills: ["Git", "Postman", "Antigravity", "IntelliJ IDEA"] },
  ],
  projects: [
    {
      title: "AetherMind — AI-Powered Productivity Platform",
      description: "A full-stack AI productivity platform with AI-driven planning, smart rescheduling, productivity analytics, and a contextual AI assistant powered by local Ollama LLMs.",
      highlights: [
        "Built AI-powered daily planning, task breakdown, prioritization, smart rescheduling, and weekly reviews using locally hosted Ollama LLMs.",
        "Developed drag-and-drop task and calendar workflows with optimistic updates and React Query-based state synchronization.",
        "Implemented secure JWT authentication with HttpOnly refresh-token cookies, session rotation, and ownership-scoped REST APIs.",
      ],
      tech: ["React", "TypeScript", "Node.js", "MongoDB", "Ollama"],
      github: "https://github.com/KISHOR059/aethermind-ai",
      visual: "aiProductivity",
      accent: "violet",
      year: "2026",
      private: false,
    },
    {
      title: "EV Charging Station Locator",
      description: "A full-stack platform for finding nearby EV charging stations, viewing live slot availability, and reserving charging slots.",
      highlights: [
        "Designed a relational MySQL schema for station inventory, bookings, and real-time availability.",
        "Implemented secure reservation validation and booking conflict prevention for concurrent users.",
        "Built an efficient end-to-end discovery and reservation experience.",
      ],
      tech: ["Python", "JavaScript", "HTML", "CSS", "MySQL"],
      github: "https://github.com/KISHOR059/EV-Charging-Station-Finder-and-Booking-Application.git",
      visual: "commerce",
      accent: "cyan",
      year: "2025",
      private: false,
    },
    {
      title: "BSNL BharatNet Phase III",
      description: "A national fiber optic infrastructure management system built for reliable, scalable multi-region telecom operations.",
      highlights: [
        "Developed and maintained a scalable Laravel telecom infrastructure platform, implementing backend features and optimizing application performance.",
        "Enhanced data synchronization and GIS-based network visualization for real-time asset tracking, operational visibility, and system reliability.",
        "Designed and optimized RESTful APIs for seamless web and mobile integration, improving data consistency and system efficiency.",
      ],
      tech: ["Laravel", "GIS", "REST APIs", "Data Synchronization"],
      github: "#contact",
      visual: "workspace",
      accent: "blue",
      year: "2025 — Present",
      private: true,
    },
  ],
  experience: [
    {
      period: "May 2025 — Present",
      role: "Junior Software Developer",
      project: "BSNL BharatNet Phase III",
      description: "Developing a national fiber optic infrastructure management system supporting scalable, multi-region telecom operations.",
      highlights: [
        "Scalable telecom platform development and application performance optimization",
        "GIS-powered network visualization and real-time asset intelligence",
        "RESTful API architecture enabling reliable web and mobile data synchronization",
      ],
    },
  ],
} as const;

export const navigation = ["Home", "About", "Skills", "Projects", "Experience", "Contact"] as const;

export type Project = (typeof portfolio.projects)[number];
