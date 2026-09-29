import type { ExperienceEntry } from './types';

export const experience: ExperienceEntry[] = [
  {
    org: 'Sandstorm Design',
    role: 'Software Engineer',
    start: '2026-09',
    period: 'Sep 2026 – Present',
    kind: 'contract',
    points: [
      'Developing Next.js experiences for client web applications and CMS-driven sites, working with designers and developers to deliver production updates.',
      'Building reusable Sitefinity widgets and React components that turn design and content requirements into configurable experiences.',
      'Supporting CMS modernization and upgrades across multiple client sites, validating changes through release.',
    ],
  },
  {
    org: 'Gauntlet AI',
    role: 'AI Engineering Fellowship',
    start: '2026-02',
    period: 'Feb 2026 – Apr 2026',
    kind: 'training',
    points: [
      'Intensive applied AI engineering fellowship focused on RAG, knowledge graphs, AI agents, evaluations, cloud deployment, and enterprise AI systems.',
      'Built and deployed ClawdForge, an agentic software factory using LangGraph and the Claude Agent SDK.',
      'Built and deployed FortranLens, a RAG platform over 250,000+ lines of legacy Fortran using Pinecone and OpenAI embeddings.',
      'Shipped multimodal and scheduling applications using Claude, OpenAI, PostgreSQL, and Docker.',
    ],
  },
  {
    org: 'JPMorgan Chase',
    role: 'Full Stack Software Engineer',
    start: '2022-10',
    period: 'Oct 2022 – Jun 2026',
    kind: 'work',
    points: [
      'Built Java and Spring Boot REST APIs for internal applications, improving data reliability and supporting the teams that depended on those services.',
      'Built reusable React and TypeScript components with Redux, reducing duplicate web calls and improving application performance by 30%.',
      'Used BlazeMeter to test performance and support changes that improved throughput and reliability by 20% for more than 30,000 users.',
      'Added Cypress and JUnit tests across assigned features, maintaining 90–100% test coverage where measured.',
      'Helped modernize a company-wide internal platform by replacing legacy patterns with TypeScript and shared components.',
      'Led React training sessions and worked with product owners, designers, and engineers through planning, code reviews, and delivery.',
      'Proposed and demonstrated AI-assisted development workflows, including a knowledge-graph approach for tracking context across a large application.',
    ],
  },
  {
    org: 'BloomTech',
    role: 'Full Stack Web Development',
    start: '2021-10',
    period: 'Oct 2021 – May 2022',
    kind: 'training',
    points: [
      'Intensive full-stack web development program covering HTML, CSS, JavaScript, React, Node.js, Express.js, and SQL.',
    ],
  },
];
