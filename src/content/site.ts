import type { Stat } from './types';

export const site = {
  name: 'David Aihe',
  initials: 'DA',
  role: 'Software Engineer · Applied AI',
  location: 'Bowie, Maryland',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://david-aihe.com',
  description:
    'David Aihe is a full-stack software engineer with four years at JPMorgan Chase building React and TypeScript platforms, now shipping agentic, RAG, and multimodal AI systems.',
  email: 'doa9200@gmail.com',
  github: 'https://github.com/Divici',
  linkedin: 'https://www.linkedin.com/in/david-aihe/',
  resume: '/David-Aihe-Resume.pdf',
  portrait: '/images/david-aihe.png',
} as const;

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

export const about = {
  heading: 'Four years shipping for 30,000+ users.',
  paragraphs: [
    'I spent nearly four years at JPMorgan Chase building and modernizing enterprise applications: reusable React and TypeScript components, Java and Spring Boot services, and the tests that let teams ship with confidence.',
    'In 2026 I completed the Gauntlet AI engineering fellowship and have been building applied AI products since: multi-agent pipelines, retrieval over legacy code, voice-first desktop tools, and the evaluations that prove they work.',
    'I care about interfaces that feel considered, code that the next engineer can read, and numbers that back up the claim.',
  ],
};

export const stats: Stat[] = [
  { value: 4, suffix: ' yrs', label: 'building enterprise software at JPMorgan Chase' },
  { value: 30000, suffix: '+', label: 'users on the applications I supported' },
  { value: 30, suffix: '%', label: 'faster app performance from shared React components' },
  { value: 90, suffix: '%+', label: 'test coverage on the features I owned' },
];
