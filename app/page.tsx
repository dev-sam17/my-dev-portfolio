import TypewriterEffectSmoothDemo from "./ui/hero-section/typewriter";
import { TeckStack } from "./ui/tech-stack/tech-stack";
import { ToggleButton } from "./ui/nav/toggleButton";
import { FloatingNavDemo } from "./ui/nav/navBar";
import { Footer } from "@/components/ui/footer";
import { ProjectsSection } from "./ui/projects/projects";
import { FreelanceSection } from "./ui/freelance/freelance";


export default function Home() {
  return (
    <>
      <ToggleButton />
      <FloatingNavDemo />
      <section id="hero">
        <TypewriterEffectSmoothDemo />
      </section>
      <section id="teck-stack">
        <TeckStack />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="freelance">
        <FreelanceSection />
      </section>
      <Footer />
    </>
  );
}
