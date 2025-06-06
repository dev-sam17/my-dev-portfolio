import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderOpen, Briefcase, Plus, BarChart3 } from "lucide-react"
import Link from "next/link"
import { getProjects } from "@/lib/actions/projects"
import { getFreelanceProjects } from "@/lib/actions/freelance"

export default async function adminPage() {

  const projects = await getProjects();
  const freelanceProjects = await getFreelanceProjects();

  if("error" in projects || "error" in freelanceProjects){
    console.error((projects as { error: string }).error || (freelanceProjects as { error: string }).error)
    return
  }

  return (
    <div className="space-y-6 mx-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your admin portal. Manage your projects and freelance work.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">Active development projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Freelance Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{freelanceProjects.length}</div>
            <p className="text-xs text-muted-foreground">Client projects completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Technologies</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                new Set([
                  ...projects.flatMap((p) => p.technologies),
                  ...freelanceProjects.flatMap((p) => p.technologies),
                ]).size
              }
            </div>
            <p className="text-xs text-muted-foreground">Unique technologies used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild size="sm" className="w-full bg-slate-600 hover:bg-slate-700">
              <Link href="/admin/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href="/admin/freelance-projects/new">
                <Plus className="mr-2 h-4 w-4" />
                New Freelance
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your latest development projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <FolderOpen className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{project.name}</p>
                  <p className="text-sm text-muted-foreground">{project.technologies.slice(0, 2).join(", ")}</p>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/projects/${project.id}`}>View</Link>
                </Button>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/projects">View All Projects</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Freelance Work</CardTitle>
            <CardDescription>Your latest client projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {freelanceProjects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{project.projectName}</p>
                  <p className="text-sm text-muted-foreground">{project.clientName}</p>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/freelance-projects/${project.id}`}>View</Link>
                </Button>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/freelance-projects">View All Freelance</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
