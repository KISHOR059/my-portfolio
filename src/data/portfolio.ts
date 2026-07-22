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
      title: "Cloud-Based File Storage",
      description: "A secure, scalable cloud file management platform with role-based access control and production-ready deployment workflows.",
      highlights: [
        "Integrated AWS S3 for secure file storage, uploads, downloads, and access management.",
        "Containerized the application with Docker and automated delivery through GitHub Actions.",
        "Built authenticated REST APIs with validation and optimized backend processing.",
      ],
      tech: ["Laravel", "Docker", "AWS S3", "REST APIs"],
      github: "https://github.com/KISHOR059/Cloud-Based-File-Storage-Web-Application.git",
      visual: "analytics",
      accent: "violet",
      year: "2025",
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
      period: "January 2025 — Present",
      role: "Junior Software Developer",
      company: "Azotos Software Technologies Pvt. Ltd.",
      project: "BSNL BharatNet Phase III",
      description: "Developing a national fiber optic infrastructure management system supporting scalable, multi-region telecom operations.",
      highlights: [
        "Laravel platform development and application performance optimization",
        "GIS network visualization and real-time asset tracking",
        "REST API design for consistent web and mobile synchronization",
      ],
    },
  ],
} as const;

export const navigation = ["Home", "About", "Skills", "Projects", "Contact"] as const;

export type Project = (typeof portfolio.projects)[number];
