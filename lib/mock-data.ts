import type { Project, FreelanceProject } from "./types"

export const mockProjects: Project[] = [
  {
    id: 1,
    name: "E-commerce Platform",
    description: "A full-stack e-commerce platform with payment integration and admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/ecommerce",
  },
  {
    id: 2,
    name: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    images: ["/placeholder.svg?height=300&width=400"],
    demoUrl: "https://tasks.example.com",
    githubUrl: "https://github.com/example/tasks",
  },
  {
    id: 3,
    name: "Weather Dashboard",
    description: "A responsive weather dashboard with location-based forecasts.",
    technologies: ["Vue.js", "Express.js", "OpenWeather API"],
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    githubUrl: "https://github.com/example/weather",
  },
]

export const mockFreelanceProjects: FreelanceProject[] = [
  {
    id: 1,
    clientName: "TechCorp Inc.",
    projectName: "Corporate Website Redesign",
    description: "Complete redesign of corporate website with modern UI/UX and CMS integration.",
    technologies: ["Next.js", "Tailwind CSS", "Sanity CMS", "Vercel"],
    timeline: "6 weeks",
    projectUrl: "https://techcorp.example.com",
    githubUrl: "https://github.com/freelance/techcorp",
  },
  {
    id: 2,
    clientName: "StartupXYZ",
    projectName: "Mobile App Development",
    description: "Cross-platform mobile application for food delivery service.",
    technologies: ["React Native", "Firebase", "Stripe", "Google Maps API"],
    timeline: "12 weeks",
    projectUrl: "https://startupxyz.app",
  },
  {
    id: 3,
    clientName: "Local Business",
    projectName: "Inventory Management System",
    description: "Custom inventory management system with barcode scanning and reporting.",
    technologies: ["Python", "Django", "PostgreSQL", "React"],
    timeline: "8 weeks",
    githubUrl: "https://github.com/freelance/inventory",
  },
]
