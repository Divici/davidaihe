import type { CSSProperties } from 'react';
import { experience } from '@/content/experience';
import type { ExperienceEntry } from '@/content/types';
import { SectionHeading } from '../SectionHeading';

const KIND_LABEL: Record<ExperienceEntry['kind'], string> = {
  work: 'Full-time',
  contract: 'Contract',
  training: 'Training',
};

export function Experience() {
  return (
    <section
      id="experience"
      className="section experience js-spy"
      aria-labelledby="experience-title"
    >
      <SectionHeading id="experience-title" eyebrow="Experience">
        Enterprise scale, then <em>applied AI.</em>
      </SectionHeading>

      <div className="timeline">
        <div className="timeline__rail" aria-hidden="true">
          <span className="timeline__fill js-line" />
        </div>
        <ol className="timeline__list">
          {experience.map((entry) => (
            <li key={entry.org} className="entry js-scroll">
              <span className={`entry__dot entry__dot--${entry.kind}`} aria-hidden="true" />
              <p className="entry__period">{entry.period}</p>
              <h3 className="entry__role">{entry.role}</h3>
              <p className="entry__org">
                {entry.org}
                <span className="entry__kind">
                  {KIND_LABEL[entry.kind]}
                </span>
              </p>
              <ul className="entry__points">
                {entry.points.map((point, i) => (
                  <li key={point} style={{ '--i': i } as CSSProperties}>
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
