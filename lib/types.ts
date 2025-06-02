export interface Project {
  id: number
  name: string
  description: string
  technologies: string[]
  images: string[]
  demoUrl?: string
  githubUrl?: string
}

export interface FreelanceProject {
  id: number
  clientName: string
  projectName: string
  description: string
  technologies: string[]
  timeline: string
  projectUrl?: string
  githubUrl?: string
}
