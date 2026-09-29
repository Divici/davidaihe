import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/content/types';

const base: Project = {
  slug: 'demo',
  name: 'Demo Project',
  kind: 'Web app',
  tagline: 'A short line about the project.',
  summary: 'A longer paragraph that explains what the project does and why it matters.',
  highlights: ['First result', 'Second result'],
  stack: ['React', 'TypeScript', 'PostgreSQL'],
  repo: 'https://github.com/Divici/demo',
  live: { label: 'Live demo', href: 'https://demo.example.com' },
  layout: 'wide',
  shots: [{ src: '/projects/demo/01.png', alt: 'The demo dashboard in use', width: 1600, height: 1000 }],
};

describe('ProjectCard', () => {
  it('renders the project as a labelled article', () => {
    render(<ProjectCard project={base} index={0} />);
    const card = screen.getByRole('article', { name: 'Demo Project' });
    expect(within(card).getByRole('heading', { name: 'Demo Project', level: 3 })).toBeVisible();
    expect(within(card).getByText(base.tagline)).toBeVisible();
    expect(within(card).getByText('First result')).toBeVisible();
  });

  it('links to the repo and the live demo in a new tab, named for screen readers', () => {
    render(<ProjectCard project={base} index={0} />);
    const repo = screen.getByRole('link', { name: 'Demo Project source on GitHub' });
    expect(repo).toHaveAttribute('href', base.repo);
    expect(repo).toHaveAttribute('target', '_blank');
    expect(repo).toHaveAttribute('rel', expect.stringContaining('noopener'));

    const live = screen.getByRole('link', { name: 'Demo Project live demo' });
    expect(live).toHaveAttribute('href', 'https://demo.example.com');
  });

  it('leaves out the live link when there is no deployment', () => {
    render(<ProjectCard project={{ ...base, live: undefined }} index={0} />);
    expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument();
  });

  it('shows every screenshot with its alt text', () => {
    const shots = [
      base.shots[0],
      { src: '/projects/demo/02.png', alt: 'The demo settings panel', width: 368, height: 448 },
    ];
    render(<ProjectCard project={{ ...base, layout: 'widgets', shots }} index={1} />);
    expect(screen.getByAltText('The demo dashboard in use')).toBeInTheDocument();
    expect(screen.getByAltText('The demo settings panel')).toBeInTheDocument();
  });

  it('lists the stack', () => {
    render(<ProjectCard project={base} index={0} />);
    const stack = screen.getByRole('list', { name: 'Built with' });
    expect(within(stack).getAllByRole('listitem').map((li) => li.textContent)).toEqual(base.stack);
  });

  it('marks its animated parts for the motion kill switch', () => {
    const { container } = render(<ProjectCard project={base} index={0} />);
    expect(container.querySelector('.js-cardtilt')).not.toBeNull();
    expect(container.querySelector('.js-wipe-group[data-motion]')).not.toBeNull();
    expect(container.querySelector('.js-wipe[data-motion]')).not.toBeNull();
  });
});
