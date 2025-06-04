"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  IconHome,
  IconCode,
  IconUserCode,
  IconRocket,
} from "@tabler/icons-react";

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Skillset",
      link: "/#teck-stack",
      icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Projects",
      link: "/#projects",
      icon: <IconRocket className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Freelance",
      link: "/#freelance",
      icon: (
        <IconUserCode className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
