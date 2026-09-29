import type { CSSProperties, ReactNode } from 'react';

export function SectionHeading({
  id,
  eyebrow,
  children,
  lead,
}: {
  id: string;
  eyebrow: string;
  children: ReactNode;
  lead?: string;
}) {
  return (
    <header className="section-head">
      <p className="eyebrow js-scroll" style={{ '--i': 0 } as CSSProperties}>
        {eyebrow}
      </p>
      <h2 id={id} className="section-head__title js-scroll" style={{ '--i': 1 } as CSSProperties}>
        {children}
      </h2>
      {lead && (
        <p className="section-head__lead js-scroll" style={{ '--i': 2 } as CSSProperties}>
          {lead}
        </p>
      )}
    </header>
  );
}
