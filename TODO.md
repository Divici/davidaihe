# To do

## Replace project screenshots

Three projects use captures that undersell them. Drop the new files in place
and update `width`, `height`, and `alt` in `src/content/projects.ts`.
`npm test` fails if a listed file is missing.

- [ ] **Nerdy Ads**: `public/projects/nerdyads/01.png`. Current capture is the
      empty Campaign tab. Wanted: accepted ads with evaluation scores, ideally
      1600×1000.
- [ ] **FortranLens**: `public/projects/fortran-lens/01.png`. Current capture
      is the empty search screen with no indexed files. Wanted: an answered
      question with code snippets and citations, ideally 1600×1000.
- [ ] **Pocket Meadery**: `public/projects/pocket-meadery/01.png` and
      `02.png`. Current captures come from a browser and show triangle
      placeholders for the tab icons. Wanted: captures from an iPhone or the
      iOS simulator.

## Optional

- [ ] **Jane 1.0**: add a second capture, such as the status pill while
      dictating. Only the Settings window is shown now.
- [ ] **FortranLens live demo**: the Railway deployment returns 404. Once it
      is back, add `live: { label: 'Live demo', href: '…' }` to its entry.
