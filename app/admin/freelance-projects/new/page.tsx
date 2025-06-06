import { FreelanceProjectForm } from "../freelance-project-form"

export default function NewFreelanceProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Freelance Project</h1>
        <p className="text-muted-foreground">Add a new client project to your portfolio</p>
      </div>
      <FreelanceProjectForm />
    </div>
  )
}
