import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Project } from '@/content/types';
import { GitHubIcon } from './icons';

const SIZES = '(min-width: 1001px) 640px, 92vw';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const headingId = `project-${project.slug}`;
  const flipped = index % 2 === 1;

  return (
    <article
      className={`project project--${project.layout} ${flipped ? 'project--flipped' : ''}`}
      aria-labelledby={headingId}
    >
      <div className="project__media js-wipe-group" data-motion>
        <div className="js-wipe" data-motion>
          <div className="js-cardtilt">
            <div className="project__stage js-cardtilt_rotate">
              <div className={`shots shots--${project.layout}`}>
                {project.shots.map((shot) => (
                  <Image
                    key={shot.src}
                    className="shots__img"
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes={SIZES}
                    // Eager on purpose: reveals need the art present when they fire.
                    priority
                  />
                ))}
              </div>
              <div className="js-cardtilt_flare" />
              <div className="js-cardtilt_holo" />
            </div>
          </div>
        </div>
      </div>

      <div className="project__body">
        <p className="eyebrow js-scroll" style={{ '--i': 0 } as CSSProperties}>
          <span className="project__index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          {project.kind}
        </p>
        <h3 id={headingId} className="project__name js-scroll" style={{ '--i': 1 } as CSSProperties}>
          {project.name}
        </h3>
        <p className="project__tagline js-scroll" style={{ '--i': 2 } as CSSProperties}>
          {project.tagline}
        </p>
        <p className="project__summary js-scroll" style={{ '--i': 3 } as CSSProperties}>
          {project.summary}
        </p>

        <ul className="project__highlights js-scroll" style={{ '--i': 4 } as CSSProperties}>
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <ul
          className="chips js-scroll"
          aria-label="Built with"
          style={{ '--i': 5 } as CSSProperties}
        >
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="project__links js-scroll" style={{ '--i': 6 } as CSSProperties}>
          {project.live && (
            <a
              className="btn btn--primary"
              href={project.live.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} ${project.live.label.toLowerCase()}`}
            >
              {project.live.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          )}
          <a
            className="btn btn--ghost"
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} source on GitHub`}
          >
            <GitHubIcon width={18} height={18} />
            Source
          </a>
        </div>
      </div>
    </article>
  );
}
