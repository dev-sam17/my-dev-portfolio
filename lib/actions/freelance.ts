'use server'
import { prisma } from "../prisma"
import { FreelanceProject, FreelanceProjectForm } from "../types"

export async function createFreelanceProject(
  project: FreelanceProjectForm
): Promise<FreelanceProject | { error: string }> {
  try {
    return await prisma.freelanceProject.create({
      data: project
    })
  } catch (error) {
    console.error('Error creating freelance project:', error)
    return { error: 'Failed to create freelance project' }
  }
}

export async function getFreelanceProjects(): Promise<FreelanceProject[] | { error: string }> {
  try {
    return await prisma.freelanceProject.findMany()
  } catch (error) {
    console.error('Error fetching freelance projects:', error)
    return { error: 'Failed to fetch freelance projects' }
  }
}

export async function getFreelanceProjectById(
  id: string
): Promise<FreelanceProject | null | { error: string }> {
  try {
    return await prisma.freelanceProject.findUnique({
      where: { id }
    })
  } catch (error) {
    console.error(`Error fetching freelance project ${id}:`, error)
    return { error: `Failed to fetch freelance project ${id}` }
  }
}

export async function updateFreelanceProject(
  id: string, 
  project: Partial<FreelanceProjectForm>
): Promise<FreelanceProject | { error: string }> {
  try {
    return await prisma.freelanceProject.update({
      where: { id },
      data: project
    })
  } catch (error) {
    console.error(`Error updating freelance project ${id}:`, error)
    return { error: `Failed to update freelance project ${id}` }
  }
}

export async function deleteFreelanceProject(
  id: string
): Promise<FreelanceProject | { error: string }> {
  try {
    return await prisma.freelanceProject.delete({
      where: { id }
    })
  } catch (error) {
    console.error(`Error deleting freelance project ${id}:`, error)
    return { error: `Failed to delete freelance project ${id}` }
  }
}