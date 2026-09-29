import type { Stat } from './types';

export const site = {
  name: 'David Aihe',
  initials: 'DA',
  role: 'Full-Stack Software Engineer · Applied AI Engineer',
  location: 'Bowie, Maryland',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://david-aihe.com',
  description:
    'David Aihe is a full-stack software engineer and applied AI engineer. He spent more than three and a half years building enterprise applications at JPMorgan Chase with React, TypeScript, Java, and Spring Boot, and now ships agentic, RAG, and multimodal AI systems.',
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
  heading: 'Enterprise software for 30,000+ users.',
  paragraphs: [
    'I spent more than three and a half years at JPMorgan Chase building and modernizing enterprise applications across the stack: Java and Spring Boot services, React and TypeScript interfaces, AWS deployments, and the tests that let teams ship with confidence.',
    'In 2026 I completed the Gauntlet AI engineering fellowship and have been building applied AI products since: multi-agent pipelines, retrieval over legacy code, voice-first desktop tools, and the evaluations that prove they work.',
    'I care about systems that hold up under load, code that the next engineer can read, and numbers that back up the claim.',
  ],
};

export const stats: Stat[] = [
  {
    value: 3.5,
    decimals: 1,
    suffix: '+ yrs',
    label: 'building enterprise software at JPMorgan Chase',
  },
  { value: 30000, suffix: '+', label: 'users on the applications I supported' },
  { value: 30, suffix: '%', label: 'faster app performance after cutting redundant calls' },
  { value: 90, suffix: '%+', label: 'test coverage on the features I owned' },
];
