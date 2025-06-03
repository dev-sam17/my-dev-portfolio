import { Prisma } from "./prisma";

export type Project = Prisma.Project;
export type ProjectForm = Omit<Project, "id">;


export type FreelanceProject = Prisma.FreelanceProject;
export type FreelanceProjectForm = Omit<FreelanceProject, "id">;

