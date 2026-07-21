import { About } from "@/components/about";
import { BackgroundParticles } from "@/components/background-particles";
import { Contact } from "@/components/contact";
import { CursorGlow } from "@/components/cursor-glow";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Timeline } from "@/components/timeline";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <BackgroundParticles />
      <CursorGlow />
      <Navbar />
      <main id="main-content" className="relative z-10 overflow-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
