"use client";

import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
  IconBrandGithub,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/lib/types";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlides, setCurrentSlides] = useState<number[]>(
    Array(projects.length).fill(0)
  );
  const [dialogSlides, setDialogSlides] = useState<number[]>(
    Array(projects.length).fill(0)
  );
  const [autoplay, setAutoplay] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentSlides((prev) =>
        prev.map((slide, idx) => (slide + 1) % projects[idx].images.length)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [autoplay]);

  // Pause autoplay when hovering
  useEffect(() => {
    if (hoveredIndex !== null) {
      setAutoplay(false);
    } else {
      setAutoplay(true);
    }
  }, [hoveredIndex]);

  // Fixed navigation functions with proper event handling
  const handlePrevSlide = (
    e: MouseEvent<HTMLButtonElement>,
    projectIndex: number
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setCurrentSlides((prev) => {
      const newSlides = [...prev];
      newSlides[projectIndex] =
        (newSlides[projectIndex] - 1 + projects[projectIndex].images.length) %
        projects[projectIndex].images.length;
      return newSlides;
    });
  };

  const handleNextSlide = (
    e: MouseEvent<HTMLButtonElement>,
    projectIndex: number
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setCurrentSlides((prev) => {
      const newSlides = [...prev];
      newSlides[projectIndex] =
        (newSlides[projectIndex] + 1) % projects[projectIndex].images.length;
      return newSlides;
    });
  };

  const handleDotClick = (
    e: MouseEvent<HTMLButtonElement>,
    projectIndex: number,
    slideIndex: number
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setCurrentSlides((prev) => {
      const newSlides = [...prev];
      newSlides[projectIndex] = slideIndex;
      return newSlides;
    });
  };

  // Dialog-specific navigation functions
  const handleDialogPrevSlide = (
    e: MouseEvent<HTMLButtonElement>,
    projectIndex: number
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setDialogSlides((prev) => {
      const newSlides = [...prev];
      newSlides[projectIndex] =
        (newSlides[projectIndex] - 1 + projects[projectIndex].images.length) %
        projects[projectIndex].images.length;
      return newSlides;
    });
  };

  const handleDialogNextSlide = (
    e: MouseEvent<HTMLButtonElement>,
    projectIndex: number
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setDialogSlides((prev) => {
      const newSlides = [...prev];
      newSlides[projectIndex] =
        (newSlides[projectIndex] + 1) % projects[projectIndex].images.length;
      return newSlides;
    });
  };

  const handleDialogDotClick = (
    e: MouseEvent<HTMLButtonElement>,
    projectIndex: number,
    slideIndex: number
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setDialogSlides((prev) => {
      const newSlides = [...prev];
      newSlides[projectIndex] = slideIndex;
      return newSlides;
    });
  };

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-white to-neutral-100 dark:from-gray-900 dark:to-black py-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-3xl font-bold dark:text-white text-black text-center">
          <h2>Featured Projects</h2>
        </div>

        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card
                className="overflow-hidden h-full border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-slate-800 dark:to-slate-900"
                onClick={() => handleCardClick(project)}
              >
                {/* Carousel with 16:9 aspect ratio */}
                <div className="relative w-full overflow-hidden">
                  {/* 16:9 aspect ratio container */}
                  <div className="relative w-full pb-[56.25%]">
                    {/* Image slides */}
                    {project.images.map((image, imgIndex) => (
                      <Image
                        key={imgIndex}
                        src={image}
                        alt={project.name}
                        fill
                        className={cn(
                          "absolute inset-0 object-cover transition-opacity duration-500",
                          currentSlides[index] === imgIndex
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    ))}

                    {/* Carousel navigation */}
                    <div className="absolute inset-0 flex items-center justify-between p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={(e) => handlePrevSlide(e, index)}
                        className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1 backdrop-blur-sm transition-colors"
                        aria-label="Previous slide"
                        type="button"
                      >
                        <IconChevronLeft size={16} />
                      </button>
                      <button
                        onClick={(e) => handleNextSlide(e, index)}
                        className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1 backdrop-blur-sm transition-colors"
                        aria-label="Next slide"
                        type="button"
                      >
                        <IconChevronRight size={16} />
                      </button>
                    </div>

                    {/* Slide indicators */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
                      {project.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={(e) => handleDotClick(e, index, imgIndex)}
                          className={cn(
                            "w-1 h-1 rounded-full transition-all",
                            currentSlides[index] === imgIndex
                              ? "bg-white w-2"
                              : "bg-white/50 hover:bg-white/80"
                          )}
                          aria-label={`Go to slide ${imgIndex + 1}`}
                          type="button"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-white truncate">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-100 dark:text-gray-300 line-clamp-3 h-14">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-white/20 text-white"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-white/20 text-white">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    {project.demoUrl && (
                      <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="h-8 text-sm px-3"
                      >
                        <Link
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-8 text-sm px-3 bg-white/10 hover:bg-white/20 border-white/20"
                      >
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
              </Card>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                className="absolute -inset-px rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-70 blur-sm"
                style={{ zIndex: -1 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedProject.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image Carousel */}
                <div className="relative w-full overflow-hidden rounded-lg">
                  <div className="relative w-full pb-[56.25%]">
                    {selectedProject.images.map((image, imgIndex) => {
                      const projectIndex = projects.findIndex(
                        (p) => p.id === selectedProject.id
                      );
                      return (
                        <Image
                          key={imgIndex}
                          src={image}
                          alt={selectedProject.name}
                          fill
                          className={cn(
                            "absolute inset-0 object-cover transition-opacity duration-500",
                            dialogSlides[projectIndex] === imgIndex
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      );
                    })}

                    {/* Navigation buttons */}
                    {selectedProject.images.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between p-4">
                        <button
                          onClick={(e) =>
                            handleDialogPrevSlide(
                              e,
                              projects.findIndex(
                                (p) => p.id === selectedProject.id
                              )
                            )
                          }
                          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                          aria-label="Previous slide"
                          type="button"
                        >
                          <IconChevronLeft size={20} />
                        </button>
                        <button
                          onClick={(e) =>
                            handleDialogNextSlide(
                              e,
                              projects.findIndex(
                                (p) => p.id === selectedProject.id
                              )
                            )
                          }
                          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                          aria-label="Next slide"
                          type="button"
                        >
                          <IconChevronRight size={20} />
                        </button>
                      </div>
                    )}

                    {/* Slide indicators */}
                    {selectedProject.images.length > 1 && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {selectedProject.images.map((_, imgIndex) => {
                          const projectIndex = projects.findIndex(
                            (p) => p.id === selectedProject.id
                          );
                          return (
                            <button
                              key={imgIndex}
                              onClick={(e) =>
                                handleDialogDotClick(e, projectIndex, imgIndex)
                              }
                              className={cn(
                                "w-2 h-2 rounded-full transition-all",
                                dialogSlides[projectIndex] === imgIndex
                                  ? "bg-white w-3"
                                  : "bg-white/50 hover:bg-white/80"
                              )}
                              aria-label={`Go to slide ${imgIndex + 1}`}
                              type="button"
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    {selectedProject.demoUrl && (
                      <Button asChild className="flex items-center gap-2">
                        <Link
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconExternalLink size={16} />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button
                        asChild
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Link
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconBrandGithub size={16} />
                          View Code
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
