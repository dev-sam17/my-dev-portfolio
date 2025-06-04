import { notFound } from "next/navigation";
import { FreelanceProjectForm } from "../../freelance-project-form";
import { getFreelanceProjectById } from "@/lib/actions/freelance";

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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Edit Freelance Project
        </h1>
        <p className="text-muted-foreground">
          Update your freelance project information
        </p>
      </div>
      <FreelanceProjectForm project={project} />
    </div>
  );
}
