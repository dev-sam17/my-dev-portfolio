import TypewriterEffectSmoothDemo from "./ui/hero-section/typewriter";
import { TeckStack } from "./ui/tech-stack/tech-stack";
import { ToggleButton } from "./ui/nav/toggleButton";

export default function Home() {
  return (
    <>
      <ToggleButton />
      <section id="hero">
        <TypewriterEffectSmoothDemo />
      </section>
      <section id="teck-stack">
        <TeckStack />
      </section>
    </>
  );
}
