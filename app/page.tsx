import HeroSection from "./ui/hero-section/hero-section";
import { TechStack } from "./ui/tech-stack/tech-stack";
import { ToggleButton } from "./ui/nav/toggleButton";
import { FloatingNavDemo } from "./ui/nav/navBar";
import { Footer } from "@/components/ui/footer";
import { ProjectsSection } from "./ui/projects/projects";
import { FreelanceSection } from "./ui/freelance/freelance";
import { getProjects } from "@/lib/actions/projects";
import { FreelanceProject, Project } from "@/lib/types";
import { getFreelanceProjects } from "@/lib/actions/freelance";

export default async function Home() {
  const projects = await getProjects();
  const freelanceProjects = await getFreelanceProjects();

  return (
    <>
      <ToggleButton />
      <FloatingNavDemo />
      <section id="hero">
        <HeroSection />
      </section>
      <section id="tech-stack">
        <TechStack />
      </section>
      <section id="projects">
        <ProjectsSection projects={projects as Project[]} />
      </section>
      <section id="freelance">
        <FreelanceSection
          freelanceProjects={freelanceProjects as FreelanceProject[]}
        />
      </section>
      <Footer />
    </>
  );
}
