import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  {
    title: 'AI & LLM',
    blurb: 'Agents, retrieval, and the evaluations that keep them honest.',
    skills: [
      'LLM applications',
      'Agent workflows',
      'RAG',
      'Prompt design',
      'Tool calling',
      'Evaluations',
      'OpenAI API',
      'Anthropic API',
      'LangGraph',
      'Claude Code',
      'Codex',
    ],
  },
  {
    title: 'Backend & Data',
    blurb: 'Services and schemas built to be depended on.',
    skills: ['Java', 'Spring Boot', 'Node.js', 'REST APIs', 'SQL', 'PostgreSQL', 'SQLite'],
  },
  {
    title: 'Frontend',
    blurb: 'Interfaces and component systems that stay fast and accessible.',
    skills: [
      'React',
      'Next.js',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Redux',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Jest',
      'Cypress',
    ],
  },
  {
    title: 'Cloud & Tools',
    blurb: 'Deployments, performance testing, and the workflow around them.',
    skills: ['AWS', 'Git', 'Firebase', 'Vercel', 'Render', 'Agile/Scrum', 'BlazeMeter'],
  },
];

export const certifications = ['AWS Certified Developer – Associate'];
