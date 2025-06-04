import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  Github,
  User,
  Clock,
} from "lucide-react";
import { getFreelanceProjectById } from "@/lib/actions/freelance";

interface FreelanceProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FreelanceProjectDetailPage({
  params,
}: FreelanceProjectDetailPageProps) {
  const project = await getFreelanceProjectById((await params).id);

  if (!project || "error" in project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/admin/freelance-projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {project.projectName}
          </h1>
          <p className="text-muted-foreground flex items-center gap-1">
            <User className="h-4 w-4" />
            {project.clientName}
          </p>
        </div>
        <Button asChild className="bg-slate-600 hover:bg-slate-700">
          <Link href={`/admin/freelance-projects/edit/${project.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technologies Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Client</p>
                  <p className="text-sm text-muted-foreground">
                    {project.clientName}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Timeline</p>
                  <p className="text-sm text-muted-foreground">
                    {project.timeline}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.projectUrl && (
                <Button asChild className="w-full" variant="outline">
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Project
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild className="w-full" variant="outline">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Source Code
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Project ID
                </span>
                <span className="text-sm font-medium">{project.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Technologies
                </span>
                <span className="text-sm font-medium">
                  {project.technologies.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="text-sm font-medium">{project.timeline}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
