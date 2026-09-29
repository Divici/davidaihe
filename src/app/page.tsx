import { Dock } from '@/components/Dock';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Choreography } from '@/motion/Choreography';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to content
      </a>

      <div className="ambient" aria-hidden="true">
        <span className="ambient__pill js-amb-1" data-motion />
        <span className="ambient__pill js-amb-2" data-motion />
        <span className="ambient__pill js-amb-3" data-motion />
      </div>

      <main>
        <Hero />
        <div className="js-dock-start" aria-hidden="true" />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Contact />
        <div className="js-dock-end" aria-hidden="true" />
      </main>

      <Footer />
      <Dock />
      <Choreography />
    </>
  );
}
