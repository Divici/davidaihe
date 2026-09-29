import type { CSSProperties } from 'react';
import { about, stats } from '@/content/site';
import { formatCount } from '@/lib/countTo';
import { SectionHeading } from '../SectionHeading';

export function About() {
  return (
    <section id="about" className="section about js-spy" aria-labelledby="about-title">
      <div className="about__grid">
        <div>
          <SectionHeading id="about-title" eyebrow="About">
            Four years shipping for <em>30,000+</em> users.
          </SectionHeading>
          <div className="about__copy">
            {about.paragraphs.map((text, i) => (
              <p key={text} className="js-scroll" style={{ '--i': i } as CSSProperties}>
                {text}
              </p>
            ))}
          </div>
        </div>

        <div className="about__band js-scroll">
          <dl className="stats">
            {stats.map((stat) => {
              const final = formatCount(stat.value, stat);
              return (
                <div key={stat.label} className="stat">
                  <dt className="stat__label">{stat.label}</dt>
                  <dd className="stat__value">
                    <span className="sr-only">{final}</span>
                    <span
                      className="js-count"
                      aria-hidden="true"
                      data-value={stat.value}
                      data-prefix={stat.prefix ?? ''}
                      data-suffix={stat.suffix ?? ''}
                    >
                      {final}
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
