export type Shot = {
  /** Path under /public, starting with a slash. */
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * How the screenshots are staged:
 * - wide: one landscape browser or desktop capture
 * - widgets: several small window captures side by side
 * - phone: portrait captures inside a phone outline
 */
export type ProjectLayout = 'wide' | 'widgets' | 'phone';

export type Project = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  summary: string;
  highlights: string[];
  stack: string[];
  repo: string;
  live?: { label: string; href: string };
  layout: ProjectLayout;
  shots: Shot[];
};

export type SkillGroup = {
  title: string;
  blurb: string;
  skills: string[];
};

export type ExperienceEntry = {
  org: string;
  role: string;
  /** ISO year-month, used for ordering. */
  start: string;
  period: string;
  kind: 'work' | 'contract' | 'training';
  points: string[];
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};
