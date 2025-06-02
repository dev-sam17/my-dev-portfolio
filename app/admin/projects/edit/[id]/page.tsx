import { notFound } from "next/navigation"
import { ProjectForm } from "../../project-form"
import { mockProjects } from "@/lib/mock-data"

interface EditProjectPageProps {
  params: {
    id: string
  }
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const project = mockProjects.find((p) => p.id === Number.parseInt(params.id))

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">Update your project information</p>
      </div>
      <ProjectForm project={project} />
    </div>
  )
}
