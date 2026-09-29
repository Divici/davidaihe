# davidaihe

Portfolio site for David Aihe, software engineer.

One statically rendered page: hero, selected work, about, skills, experience,
and contact. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and
GSAP.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Unit and component tests (Vitest) |
| `npm run test:e2e` | End-to-end tests on desktop and phone (Playwright) |

## Where things live

| Path | Contents |
|---|---|
| `src/content/` | Everything the page says: projects, skills, experience, site details |
| `src/components/sections/` | One component per page section |
| `src/motion/` | Motion provider, load mask, and `buildMotion()`, which owns all GSAP setup |
| `src/motion/vendor/` | Pattern library files, copied unchanged apart from an `export` line |
| `src/styles/` | Styles, split by area |
| `public/projects/` | Project screenshots |
| `tests/e2e/` | Playwright specs |

## Editing content

Add or change a project in `src/content/projects.ts`. Put its screenshots in
`public/projects/<slug>/` and list them under `shots` with their real pixel
size. `layout` controls the staging: `wide` for one landscape capture,
`widgets` for several small windows, `phone` for portrait captures.

`npm test` fails if a listed screenshot is missing from disk.

## Motion

Every scroll trigger shares one trigger point (`TOGGLE` in
`src/motion/buildMotion.ts`). Animated elements carry `data-motion`.

The switch in the header and dock turns all motion off, resets every element
to its finished state, and remembers the choice. The operating system's
reduced-motion setting is honoured on first paint.

## Configuration

All optional. Defaults are in the source.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in metadata and the sitemap |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service for the contact form |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |

## Deployment

Vercel builds every push. `vercel.json` sets the framework to Next.js.
