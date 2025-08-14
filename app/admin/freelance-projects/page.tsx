"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { FreelanceProjectCard } from "./freelance-project-card";
import type { FreelanceProject } from "@/lib/types";
import { getFreelanceProjects } from "@/lib/actions/freelance";

export default function FreelanceProjectsPage() {
  const [projects, setProjects] = useState<FreelanceProject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleDelete = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  // Fetch all freelance projects in a useEffect hook
  useEffect(() => {
    const fetchProjects = async () => {
      const projectsResponse = await getFreelanceProjects();
      if ("error" in projectsResponse) {
        console.error(
          "Error fetching freelance projects:",
          projectsResponse.error
        );
      } else {
        setProjects(projectsResponse);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="space-y-6 mx-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Freelance Projects
          </h1>
          <p className="text-muted-foreground">Manage your client projects</p>
        </div>
        <Button asChild className="bg-slate-600 hover:bg-slate-700">
          <Link href="/admin/freelance-projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Freelance Project
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search freelance projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No freelance projects found.</p>
          <Button asChild className="mt-4 bg-slate-600 hover:bg-slate-700">
            <Link href="/admin/freelance-projects/new">
              <Plus className="mr-2 h-4 w-4" />
              Create your first freelance project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <FreelanceProjectCard
              key={project.id}
              project={project}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
