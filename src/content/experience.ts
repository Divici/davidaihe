import type { ExperienceEntry } from './types';

export const experience: ExperienceEntry[] = [
  {
    org: 'Gauntlet AI',
    role: 'AI Engineering Fellowship',
    start: '2026-02',
    period: 'Feb 2026 – Apr 2026',
    kind: 'training',
    points: [
      'Intensive applied AI program covering RAG, knowledge graphs, agents, evaluations, and cloud deployment.',
      'Shipped a new production-grade AI system most weeks, including FortranLens, CollabBoard, and Nerdy Ads.',
    ],
  },
  {
    org: 'JPMorgan Chase',
    role: 'Full Stack Software Engineer',
    start: '2022-10',
    period: 'Oct 2022 – Jun 2026',
    kind: 'work',
    points: [
      'Built reusable React and TypeScript components with Redux, cutting redundant web calls and improving application performance by 30%.',
      'Helped lead the rebuild of a company-wide enterprise platform, replacing legacy front-end patterns with TypeScript and shared components.',
      'Established Cypress end-to-end and JUnit testing practices, holding 90–100% coverage where measured.',
      'Benchmarked with BlazeMeter to find bottlenecks, supporting a 20% gain in throughput and reliability for more than 30,000 users.',
      'Created and led React training sessions and mentored developers on architecture, state, testing, and accessibility.',
      'Introduced AI-assisted development, including a knowledge-graph workflow for navigating a large enterprise codebase.',
    ],
  },
  {
    org: 'BloomTech',
    role: 'Full Stack Web Development',
    start: '2021-10',
    period: 'Oct 2021 – May 2022',
    kind: 'training',
    points: [
      'Full-time program covering HTML, CSS, JavaScript, React, Node.js, Express, and SQL.',
    ],
  },
];
