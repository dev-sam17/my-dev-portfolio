import { notFound } from "next/navigation"
import { FreelanceProjectForm } from "../../freelance-project-form"
import { mockFreelanceProjects } from "@/lib/mock-data"

interface EditFreelanceProjectPageProps {
  params: {
    id: string
  }
}

export default function EditFreelanceProjectPage({ params }: EditFreelanceProjectPageProps) {
  const project = mockFreelanceProjects.find((p) => p.id === Number.parseInt(params.id))

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Freelance Project</h1>
        <p className="text-muted-foreground">Update your freelance project information</p>
      </div>
      <FreelanceProjectForm project={project} />
    </div>
  )
}
