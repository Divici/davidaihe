import type { CSSProperties } from 'react';
import { Mail } from 'lucide-react';
import { site } from '@/content/site';
import { ContactPanel } from '../ContactPanel';
import { LinkedInIcon } from '../icons';

export function Contact() {
  return (
    <section id="contact" className="section contact js-spy" aria-labelledby="contact-title">
      <p className="eyebrow contact__eyebrow js-scroll">Get in touch</p>
      <h2 id="contact-title" className="cutin js-cutin" aria-label="Let's build together.">
        <span className="cutin__plate" data-motion aria-hidden="true">
          Let&rsquo;s
        </span>
        <span className="cutin__plate" data-motion aria-hidden="true">
          build
        </span>
        <span className="cutin__plate" data-motion aria-hidden="true">
          together.
        </span>
      </h2>

      <div className="contact__grid">
        <div className="contact__options">
          <article className="option js-scroll" style={{ '--i': 0 } as CSSProperties}>
            <Mail className="option__icon" size={26} aria-hidden="true" />
            <h3>Email</h3>
            <p className="option__value">{site.email}</p>
            <a href={`mailto:${site.email}`}>Send an email</a>
          </article>
          <article className="option js-scroll" style={{ '--i': 1 } as CSSProperties}>
            <LinkedInIcon className="option__icon" width={26} height={26} />
            <h3>LinkedIn</h3>
            <p className="option__value">{site.name}</p>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              Message me on LinkedIn
            </a>
          </article>
        </div>

        <div className="js-scroll" style={{ '--i': 2 } as CSSProperties}>
          <ContactPanel />
        </div>
      </div>
    </section>
  );
}
