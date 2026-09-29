import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { projects } from './projects';
import { certifications, skillGroups } from './skills';
import { experience } from './experience';
import { about, site, navLinks, stats } from './site';

const publicDir = path.resolve(__dirname, '../../public');

describe('projects', () => {
  it('lists the six chosen projects in order', () => {
    expect(projects.map((p) => p.slug)).toEqual([
      'jane',
      'taskyard',
      'collabboard',
      'nerdyads',
      'fortran-lens',
      'pocket-meadery',
    ]);
  });

  it.each(projects)('$name links to a Divici GitHub repo', (project) => {
    expect(project.repo).toMatch(/^https:\/\/github\.com\/Divici\/[\w.-]+$/);
  });

  it.each(projects)('$name has copy, a stack, and highlights', (project) => {
    expect(project.tagline.length).toBeGreaterThan(10);
    expect(project.summary.length).toBeGreaterThan(40);
    expect(project.stack.length).toBeGreaterThanOrEqual(3);
    expect(project.highlights.length).toBeGreaterThanOrEqual(2);
  });

  it.each(projects)('$name only uses https links for live demos', (project) => {
    if (project.live) expect(project.live.href).toMatch(/^https:\/\//);
  });

  it.each(projects)('$name screenshots exist on disk with alt text and size', (project) => {
    expect(project.shots.length).toBeGreaterThanOrEqual(1);
    for (const shot of project.shots) {
      expect(shot.alt.length).toBeGreaterThan(10);
      expect(shot.width).toBeGreaterThan(0);
      expect(shot.height).toBeGreaterThan(0);
      expect(existsSync(path.join(publicDir, shot.src)), `${shot.src} missing`).toBe(true);
    }
  });

  it('offers a download for the two desktop apps', () => {
    for (const slug of ['jane', 'taskyard']) {
      const project = projects.find((p) => p.slug === slug);
      expect(project?.live?.label).toBe('Download');
      expect(project?.live?.href).toMatch(
        /^https:\/\/github\.com\/Divici\/[\w.-]+\/releases\/latest$/,
      );
    }
  });

  it('has unique slugs', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });
});

describe('skills', () => {
  it('has the four groups from the résumé', () => {
    expect(skillGroups.map((g) => g.title).sort()).toEqual([
      'AI & LLM',
      'Backend & Data',
      'Cloud & Tools',
      'Frontend',
    ]);
  });

  it('leads with AI and backend so the page does not read as front-end only', () => {
    expect(skillGroups.slice(0, 2).map((g) => g.title)).toEqual(['AI & LLM', 'Backend & Data']);
  });

  it('lists the AWS certification', () => {
    expect(certifications).toContain('AWS Certified Developer – Associate');
  });

  it('never lists a skill twice', () => {
    const all = skillGroups.flatMap((g) => g.skills);
    expect(new Set(all).size).toBe(all.length);
  });
});

describe('experience', () => {
  it('starts with the current Sandstorm Design contract', () => {
    expect(experience[0]).toMatchObject({
      org: 'Sandstorm Design',
      kind: 'contract',
      period: 'Sep 2026 – Present',
    });
  });

  it('lists roles newest first', () => {
    const starts = experience.map((e) => e.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });
});

describe('site', () => {
  it('nav links point at section ids', () => {
    expect(navLinks.map((l) => l.href)).toEqual([
      '#work',
      '#about',
      '#skills',
      '#experience',
      '#contact',
    ]);
  });

  it('presents a full-stack and applied AI engineer, not a front-end specialist', () => {
    expect(site.role).toBe('Full-Stack Software Engineer · Applied AI Engineer');
    expect(site.description).toMatch(/full-stack/i);
    expect(site.description).toMatch(/applied AI/i);
  });

  it('never rounds the JPMorgan Chase tenure up to four years', () => {
    const copy = JSON.stringify({ site, about, stats });
    expect(copy).not.toMatch(/four years|\b4 yrs\b|\b4 years\b/i);
    expect(stats[0]).toMatchObject({ value: 3.5, decimals: 1, suffix: '+ yrs' });
  });

  it('never exposes a phone number', () => {
    expect(JSON.stringify(site)).not.toMatch(/\d{3}[-.\s]\d{3}[-.\s]\d{4}/);
  });

  it('serves the résumé from public', () => {
    expect(existsSync(path.join(publicDir, site.resume))).toBe(true);
  });
});
