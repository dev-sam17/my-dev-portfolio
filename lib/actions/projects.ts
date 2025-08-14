"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { Project, ProjectForm } from "../types";

export async function createProject(
  project: ProjectForm
): Promise<Project | { error: string }> {
  try {
    const createdProject = await prisma.project.create({
      data: project,
    });
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    return createdProject;
  } catch (error) {
    console.error("Error creating project:", error);
    return { error: "Failed to create project" };
  }
}

export async function getProjects(): Promise<Project[] | { error: string }> {
  try {
    return await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { error: "Failed to fetch projects" };
  }
}

export async function getProjectById(
  id: string
): Promise<Project | null | { error: string }> {
  try {
    return await prisma.project.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return { error: `Failed to fetch project ${id}` };
  }
}

export async function updateProject(
  id: string,
  project: Partial<ProjectForm>
): Promise<Project | { error: string }> {
  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: project,
    });
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    return updatedProject;
  } catch (error) {
    console.error(`Error updating project ${id}:`, error);
    return { error: `Failed to update project ${id}` };
  }
}

export async function deleteProject(
  id: string
): Promise<Project | { error: string }> {
  try {
    const deletedProject = await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    return deletedProject;
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    return { error: `Failed to delete project ${id}` };
  }
}
