"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FreelanceProject {
  id: number;
  clientName: string;
  projectName: string;
  description: string;
  technologies: string[];
  timeline: string;
  projectUrl?: string;
  githubUrl?: string;
}

const freelanceProjects: FreelanceProject[] = [
  {
    id: 1,
    clientName: "TechStart Inc.",
    projectName: "Customer Portal Redesign",
    description:
      "Redesigned and implemented a customer portal with improved UX, resulting in 40% increase in user engagement and 25% reduction in support tickets.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
    timeline: "Jan 2023 - Mar 2023",
    projectUrl: "https://techstart.com/portal",
  },
  {
    id: 2,
    clientName: "HealthTrack",
    projectName: "Patient Management System",
    description:
      "Developed a secure patient management system with appointment scheduling, medical records, and billing integration.",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Docker", "AWS"],
    timeline: "Apr 2023 - Aug 2023",
    projectUrl: "https://healthtrack-demo.com",
    githubUrl: "https://github.com/username/health-track-demo",
  },
  {
    id: 3,
    clientName: "EduLearn Platform",
    projectName: "Interactive Learning Dashboard",
    description:
      "Built an interactive learning dashboard with real-time progress tracking, quiz functionality, and content recommendation engine.",
    technologies: ["React", "Firebase", "Redux", "Material UI", "Chart.js"],
    timeline: "Sep 2023 - Dec 2023",
    projectUrl: "https://edulearn.io/dashboard",
  },
  {
    id: 4,
    clientName: "FinTech Solutions",
    projectName: "Investment Portfolio Tracker",
    description:
      "Created a responsive investment portfolio tracker with real-time market data integration, performance analytics, and custom alerts.",
    technologies: ["Angular", "TypeScript", "Node.js", "MongoDB", "D3.js"],
    timeline: "Jan 2024 - Apr 2024",
    projectUrl: "https://fintech-portfolio.demo.com",
  },
];

export function FreelanceSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="container h-full w-full bg-gradient-to-b from-neutral-100 to-white dark:from-black dark:to-gray-900 py-16">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold dark:text-white text-black">
            Freelance Work
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Selected client projects where I delivered high-quality solutions
            that helped businesses achieve their goals.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-teal-500 transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 relative">
            {freelanceProjects.map((project, index) => (
              <div
                key={project.id}
                className="relative"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transform -translate-x-1/2 hidden md:block" />

                <div
                  className={`md:grid md:grid-cols-2 md:gap-8 ${
                    index % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Empty space for even items on mobile */}
                  <div
                    className={`${
                      index % 2 === 0 ? "md:block" : "md:order-2"
                    } hidden md:block`}
                  >
                    {index % 2 === 0 ? (
                      <div className="h-full flex items-center justify-end">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm">
                          {project.timeline}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Card - always visible */}
                  <div
                    className={`${
                      index % 2 === 0 ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden border border-neutral-200 dark:border-neutral-800 p-6 relative">
                        {/* Mobile timeline */}
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 md:hidden">
                          {project.timeline}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-bold dark:text-white">
                              {project.projectName}
                            </h3>
                            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                              {project.clientName}
                            </p>
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-3 pt-2">
                            {project.projectUrl && (
                              <Button asChild variant="default" size="sm">
                                <Link
                                  href={project.projectUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Project
                                </Link>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button asChild variant="outline" size="sm">
                                <Link
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  GitHub
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Gradient border on hover */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: activeIndex === index ? 1 : 0 }}
                          className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 opacity-0 transition-opacity"
                          style={{
                            WebkitMask:
                              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                          }}
                        />
                      </Card>
                    </motion.div>
                  </div>

                  {/* Timeline for odd items */}
                  <div
                    className={`${
                      index % 2 === 0 ? "hidden" : "md:block"
                    } hidden md:block`}
                  >
                    {index % 2 !== 0 ? (
                      <div className="h-full flex items-center">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm">
                          {project.timeline}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
