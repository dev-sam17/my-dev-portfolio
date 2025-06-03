"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { ProjectCard } from "./project-card"
import type { Project } from "@/lib/types"
import { getProjects, deleteProject } from "@/lib/actions/projects"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const fetchProjects = async () => {
    const response = await getProjects()
    if("error" in response){
      console.error(response.error)
      return
    }
    setProjects(response)
  }

  useEffect(() => {  
    fetchProjects()
  }, [])

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleDelete = (id: string) => {
    const deleteProjectById = async () => {
      const response = await deleteProject(id)
      if("error" in response){  
        console.error(response.error)
        return
      }
      setProjects((prev) => prev.filter((project) => project.id !== id))
    }
    deleteProjectById()
  }

  return (
    <div className="space-y-6 mx-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your development projects</p>
        </div>
        <Button asChild className="bg-slate-600 hover:bg-slate-700">
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found.</p>
          <Button asChild className="mt-4 bg-slate-600 hover:bg-slate-700">
            <Link href="/admin/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              Create your first project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
