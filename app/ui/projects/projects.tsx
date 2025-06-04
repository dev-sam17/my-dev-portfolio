"use client";

import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import type { Project } from "@/lib/types";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlides, setCurrentSlides] = useState<number[]>(
    Array(projects.length).fill(0)
  );
  const [autoplay, setAutoplay] = useState<boolean>(true);

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

  return (
    <div className="container h-full w-full bg-gradient-to-b from-white to-neutral-100 dark:from-gray-900 dark:to-black py-16">
      <div className="space-y-8">
        <div className="text-4xl font-bold dark:text-white text-black text-center">
          <h2>Featured Projects</h2>
        </div>

        <div className="mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className="overflow-hidden h-full border border-neutral-200 dark:border-neutral-800">
                {/* Carousel with 16:9 aspect ratio for larger screens */}
                <div className="relative w-full overflow-hidden">
                  {/* 16:9 aspect ratio container */}
                  <div className="relative w-full pb-[56.25%] md:pb-[56.25%] lg:pb-[56.25%]">
                    {/* Image slides */}
                    {project.images.map((image, imgIndex) => (
                      <Image
                        key={imgIndex}
                        src={image}
                        alt={project.name}
                        fill
                        className={cn(
                          "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
                          currentSlides[index] === imgIndex
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    ))}

                    {/* Carousel navigation - Fixed with proper event handling */}
                    <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={(e) => handlePrevSlide(e, index)}
                        className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1 md:p-2 backdrop-blur-sm transition-colors"
                        aria-label="Previous slide"
                        type="button"
                      >
                        <IconChevronLeft size={20} />
                      </button>
                      <button
                        onClick={(e) => handleNextSlide(e, index)}
                        className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1 md:p-2 backdrop-blur-sm transition-colors"
                        aria-label="Next slide"
                        type="button"
                      >
                        <IconChevronRight size={20} />
                      </button>
                    </div>

                    {/* Slide indicators - Fixed with proper event handling */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-10">
                      {project.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={(e) => handleDotClick(e, index, imgIndex)}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all",
                            currentSlides[index] === imgIndex
                              ? "bg-white w-3"
                              : "bg-white/50 hover:bg-white/80"
                          )}
                          aria-label={`Go to slide ${imgIndex + 1}`}
                          type="button"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 dark:from-slate-800 dark:to-slate-900 rounded-lg">
                  <h3 className="text-xl font-bold dark:text-white">
                    {project.name}
                  </h3>
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
                    {project.demoUrl && (
                      <Button asChild variant="default" size="sm">
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
    </div>
  );
}
