import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getFreelanceProjectById } from "@/lib/actions/freelance";
import { FreelanceProjectForm } from "../../freelance-project-form";

interface EditFreelanceProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditFreelanceProjectPage({
  params,
}: EditFreelanceProjectPageProps) {
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Edit Freelance Project
          </h1>
          <p className="text-muted-foreground">
            Update your freelance project information
          </p>
        </div>
      </div>
      <FreelanceProjectForm project={project} />
    </div>
  );
}
