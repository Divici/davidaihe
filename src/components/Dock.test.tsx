import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Dock } from './Dock';
import { MotionProvider } from '@/motion/MotionProvider';
import { navLinks } from '@/content/site';

describe('Dock', () => {
  it('offers every section as a link inside a labelled navigation landmark', () => {
    render(
      <MotionProvider>
        <Dock />
      </MotionProvider>,
    );
    const nav = screen.getByRole('navigation', { name: 'Sections' });
    const links = within(nav).getAllByRole('link');
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '#top',
      ...navLinks.map((l) => l.href),
    ]);
  });

  it('includes the motion switch', () => {
    render(
      <MotionProvider>
        <Dock />
      </MotionProvider>,
    );
    expect(screen.getByRole('button', { name: 'Reduce motion' })).toBeInTheDocument();
  });
});
