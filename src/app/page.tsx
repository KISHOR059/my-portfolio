import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Timeline } from "@/components/timeline";
import { DesktopScrollEffects } from "@/components/desktop-scroll-effects";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { Reveal } from "@/components/reveal";
import { Skills } from "@/components/skills";
import { SmoothScroll } from "@/components/smooth-scroll";
import SplashCursor from "@/components/splash-cursor";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SmoothScroll />
      <DesktopScrollEffects />
      <Navbar />
      <main id="main-content" className="relative z-10 overflow-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <SplashCursor RAINBOW_MODE={false} COLOR="#a855f7" />
      <Reveal><Footer /></Reveal>
    </>
  );
}
