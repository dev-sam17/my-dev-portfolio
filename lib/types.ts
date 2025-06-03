import { Prisma } from "./prisma";

export type Project = Prisma.Project;
export type ProjectForm = Omit<Project, "id" | "images" | "demoUrl" | "githubUrl">;


export type FreelanceProject = Prisma.FreelanceProject;
export type FreelanceProjectForm = Omit<FreelanceProject, "id" | "images" | "demoUrl" | "githubUrl">;

