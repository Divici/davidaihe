import Image from 'next/image';
import { ArrowDown, Download } from 'lucide-react';
import { navLinks, site } from '@/content/site';
import { GitHubIcon, LinkedInIcon } from '../icons';
import { MotionToggle } from '../MotionToggle';

export function Hero() {
  return (
    <section id="top" className="hero js-parallax" aria-labelledby="hero-title">
      <div className="hero__dots js-plx-far" data-motion aria-hidden="true" />

      <header className="site-header js-mv-5" data-motion>
        <a className="site-header__mark" href="#top" aria-label={`${site.name}, back to top`}>
          {site.initials}
        </a>
        <nav aria-label="Primary">
          <ul className="site-header__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <MotionToggle />
      </header>

      <div className="hero__grid">
        <div className="hero__copy">
          <div className="js-mv-3" data-motion>
            <p className="eyebrow">{site.role}</p>
            <h1 id="hero-title" className="hero__title">
              I build the front end, then the <em>agents</em> behind it.
            </h1>
          </div>

          <div className="js-mv-4" data-motion>
            <p className="hero__lead">
              I&rsquo;m {site.name}. Four years of React and TypeScript at enterprise scale, plus
              agentic and retrieval systems shipped end to end.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#work">
                View my work
                <ArrowDown size={18} aria-hidden="true" />
              </a>
              <a className="btn btn--ghost" href={site.resume} download>
                <Download size={18} aria-hidden="true" />
                Résumé
              </a>
            </div>
            <ul className="socials" aria-label="Profiles">
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hero__art">
          <div className="hero__pills js-plx-mid" data-motion aria-hidden="true">
            <div className="js-mv-1" data-motion>
              <span className="pill pill--a" />
              <span className="pill pill--b" />
              <span className="pill pill--c" />
              <span className="hero__disc" />
            </div>
          </div>

          <div className="hero__portrait js-plx-near" data-motion>
            <div className="js-mv-2" data-motion>
              <Image
                className="hero__photo"
                src={site.portrait}
                alt={`Portrait of ${site.name}, smiling, outdoors`}
                width={1000}
                height={1000}
                sizes="(min-width: 1001px) 480px, 78vw"
                priority
              />
            </div>
          </div>

          <div className="hero__chips js-plx-front" data-motion>
            <div className="js-mv-5" data-motion>
              <p className="chip chip--status float">
                <span className="chip__dot" aria-hidden="true" />
                Open to new roles
              </p>
              <p className="chip chip--fact float float--slow">
                <strong>4 yrs</strong> at JPMorgan Chase
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
