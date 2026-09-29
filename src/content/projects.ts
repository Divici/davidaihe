import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'jane',
    name: 'Jane 1.0',
    kind: 'Windows desktop app',
    tagline: 'Hold a key, speak, release. The text lands wherever you were typing.',
    summary:
      'System-wide push-to-talk dictation that runs entirely on your own machine. Speech recognition, clean-up, and voice editing all happen locally, so no audio ever leaves the device.',
    highlights: [
      'Recognizes a one-second utterance in 80 ms, about 18× faster than real time, on the CPU',
      'Edit Mode rewrites selected text from a spoken instruction',
      'Reads the focused window so names and jargon come out spelled correctly',
    ],
    stack: ['C#', '.NET 10', 'WPF', 'Parakeet-TDT', 'Ollama', 'SQLite'],
    repo: 'https://github.com/Divici/Jane1.0',
    live: {
      label: 'Download',
      href: 'https://github.com/Divici/Jane1.0/releases/latest',
    },
    layout: 'wide',
    shots: [
      {
        src: '/projects/jane/01.png',
        alt: 'Jane settings window on the Dictation tab, showing the push-to-talk key and hold timing',
        width: 1066,
        height: 773,
      },
    ],
  },
  {
    slug: 'taskyard',
    name: 'Taskyard',
    kind: 'Windows desktop app',
    tagline: 'A desktop organizer for Windows 11 with glass groups and a focus timer.',
    summary:
      'Taskyard sits on the desktop layer and sorts your icons into named glass groups you can move, resize, roll up, and hide. A floating widget holds a to-do list, countdown timer, and stopwatch.',
    highlights: [
      'Seats one window per monitor directly above the Windows desktop through Win32 calls',
      'Tracks files by NTFS file id, so renaming in Explorer keeps every icon in place',
      'Real blur over its own copy of the wallpaper holds 60 fps while dragging',
    ],
    stack: ['Electron', 'React', 'TypeScript', 'Win32', 'koffi'],
    repo: 'https://github.com/Divici/Taskyard',
    live: {
      label: 'Download',
      href: 'https://github.com/Divici/Taskyard/releases/latest',
    },
    layout: 'widgets',
    shots: [
      {
        src: '/projects/taskyard/first-run.png',
        alt: 'Taskyard first-run card on frosted glass over the desktop wallpaper',
        width: 500,
        height: 455,
      },
      {
        src: '/projects/taskyard/tasks-dark.png',
        alt: 'Taskyard tools widget showing the Tasks tab with three to-do items',
        width: 368,
        height: 448,
      },
      {
        src: '/projects/taskyard/timer-dark.png',
        alt: 'Taskyard tools widget showing the focus timer in the dark theme',
        width: 368,
        height: 448,
      },
    ],
  },
  {
    slug: 'collabboard',
    name: 'CollabBoard',
    kind: 'Web app',
    tagline: 'A real-time collaborative whiteboard with an AI agent that builds the board for you.',
    summary:
      'An infinite canvas with sticky notes, shapes, frames, and connectors, synced live between everyone on the board. Ask the AI assistant for a SWOT analysis or a retrospective and it lays one out.',
    highlights: [
      'Multiplayer cursors and presence with real-time state sync',
      'Planner and executor agent turns plain language into board objects',
      'Idempotent requests and server reconciliation prevent duplicate objects',
    ],
    stack: ['React', 'TypeScript', 'Konva', 'Firebase', 'Vercel'],
    repo: 'https://github.com/Divici/collabBoard',
    live: { label: 'Live demo', href: 'https://theboardforge.vercel.app/' },
    layout: 'wide',
    shots: [
      {
        src: '/projects/collabboard/01.png',
        alt: 'CollabBoard canvas with an AI-generated SWOT analysis and sprint retrospective',
        width: 1914,
        height: 908,
      },
    ],
  },
  {
    slug: 'nerdyads',
    name: 'Nerdy Ads',
    kind: 'Multi-agent system',
    tagline: 'Four AI agents that write, score, and rewrite ads until they pass.',
    summary:
      'An autonomous ad generation engine for SAT prep campaigns. A researcher, writer, evaluator, and editor work through an orchestrator, and only ads that clear the quality bar survive.',
    highlights: [
      'Accepts an ad only at a 7.5+ weighted score with every dimension above 6.0',
      'Evaluator calibrated against a tiered set of real, long-running ads',
      'Covered by 240 unit, integration, and evaluation tests',
    ],
    stack: ['TypeScript', 'Gemini', 'React', 'Vite', 'Langfuse', 'Railway'],
    repo: 'https://github.com/Divici/nerdyAds',
    layout: 'wide',
    shots: [
      {
        src: '/projects/nerdyads/01.png',
        alt: 'Nerdy Ads campaign dashboard with the accepted ads panel and the generate ads controls',
        width: 1600,
        height: 1000,
      },
    ],
  },
  {
    slug: 'fortran-lens',
    name: 'FortranLens',
    kind: 'RAG application',
    tagline: 'Ask plain-English questions about 250,000 lines of compiler source.',
    summary:
      'Code intelligence for the gfortran compiler. It retrieves the relevant source, then answers with explanations that cite the exact file and line they came from.',
    highlights: [
      'RAG Fusion expands each question into variants and blends the rankings',
      'Every answer is grounded with file and line references',
      'Maps dependencies, callers, and the impact of changing a function',
    ],
    stack: ['Next.js', 'TypeScript', 'Pinecone', 'OpenAI', 'Tailwind CSS'],
    repo: 'https://github.com/Divici/fortran-lens',
    layout: 'wide',
    shots: [
      {
        src: '/projects/fortran-lens/01.png',
        alt: 'FortranLens search screen inviting a question about the gfortran codebase',
        width: 1600,
        height: 1000,
      },
    ],
  },
  {
    slug: 'pocket-meadery',
    name: 'Pocket Meadery',
    kind: 'iOS app',
    tagline: 'A local-first brewing log for tracking mead from first pitch to bottle.',
    summary:
      'Track batches, log each step with gravity readings, and get reminders when something needs attention. Everything is stored on the phone in a relational schema designed to sync later.',
    highlights: [
      'Normalized SQLite schema with six tables and hand-written migrations',
      'Goal, expected, and current ABV calculated from gravity readings',
      'Local reminders scheduled from preset brewing templates',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'SQLite'],
    repo: 'https://github.com/Divici/pocketMeadery',
    layout: 'phone',
    shots: [
      {
        src: '/projects/pocket-meadery/02.png',
        alt: 'Pocket Meadery batch screen for Wildflower Traditional with reminders, ABV figures, and timeline',
        width: 1170,
        height: 2532,
      },
      {
        src: '/projects/pocket-meadery/01.png',
        alt: 'Pocket Meadery dashboard listing upcoming reminders and active batches',
        width: 1170,
        height: 2532,
      },
    ],
  },
];
