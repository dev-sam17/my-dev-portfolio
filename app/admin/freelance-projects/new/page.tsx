import { FreelanceProjectForm } from "../freelance-project-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NewFreelanceProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/admin/freelance-projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Freelance Project</h1>
          <p className="text-muted-foreground">Add a new client project to your portfolio</p>
        </div>
      </div>
      <FreelanceProjectForm />
    </div>
  )
}
