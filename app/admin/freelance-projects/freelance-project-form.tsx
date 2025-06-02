"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X } from "lucide-react"
import type { FreelanceProject } from "@/lib/types"

interface FreelanceProjectFormProps {
  project?: FreelanceProject
}

export function FreelanceProjectForm({ project }: FreelanceProjectFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    clientName: project?.clientName || "",
    projectName: project?.projectName || "",
    description: project?.description || "",
    technologies: project?.technologies || [],
    timeline: project?.timeline || "",
    projectUrl: project?.projectUrl || "",
    githubUrl: project?.githubUrl || "",
  })
  const [newTechnology, setNewTechnology] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call
    console.log("Saving freelance project:", formData)
    router.push("/dashboard/freelance-projects")
  }

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology.trim()],
      })
      setNewTechnology("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/dashboard/freelance-projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{project ? "Edit Freelance Project" : "Create New Freelance Project"}</CardTitle>
          <CardDescription>
            {project
              ? "Update your freelance project information"
              : "Fill in the details for your new freelance project"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  placeholder="Enter project name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the freelance project"
                rows={4}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="e.g., 8 weeks, 3 months"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectUrl">Project URL (Optional)</Label>
                <Input
                  id="projectUrl"
                  type="url"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                  placeholder="https://project.example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL (Optional)</Label>
              <Input
                id="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div className="space-y-4">
              <Label>Technologies</Label>
              <div className="flex space-x-2">
                <Input
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add a technology"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" onClick={addTechnology} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="bg-slate-600 hover:bg-slate-700">
                {project ? "Update Freelance Project" : "Create Freelance Project"}
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/freelance-projects">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
