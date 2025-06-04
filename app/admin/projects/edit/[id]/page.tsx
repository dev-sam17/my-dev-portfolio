import { notFound } from "next/navigation";
import { ProjectForm } from "../../project-form";
import { getProjectById } from "@/lib/actions/projects";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const project = await getProjectById((await params).id);

  if (!project || "error" in project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">Update your project information</p>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
