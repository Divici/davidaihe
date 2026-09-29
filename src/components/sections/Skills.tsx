import type { CSSProperties } from 'react';
import { certifications, skillGroups } from '@/content/skills';
import { SectionHeading } from '../SectionHeading';

export function Skills() {
  return (
    <section id="skills" className="section skills js-spy" aria-labelledby="skills-title">
      <SectionHeading
        id="skills-title"
        eyebrow="Skills"
        lead="The tools I reach for, grouped by the job they do."
      >
        The full stack, with <em>AI</em> built in.
      </SectionHeading>

      <ul className="skills__grid">
        {skillGroups.map((group, i) => (
          // Grid siblings share a y-position, so each one carries its own delay.
          <li key={group.title} className="skill-card js-scroll" style={{ '--i': i } as CSSProperties}>
            <h3 className="skill-card__title">{group.title}</h3>
            <p className="skill-card__blurb">{group.blurb}</p>
            <ul className="chips" aria-label={`${group.title} skills`}>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="certs js-scroll">
        <h3 className="certs__title">Certification</h3>
        <ul className="certs__list">
          {certifications.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
