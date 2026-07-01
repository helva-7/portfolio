# Fahd Elhaloui Portfolio

Manga campaign-style personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run build
```

`npm run lint` runs TypeScript checking with `tsc --noEmit`.

## Replace Placeholder Images

Replace these files with your real assets:

```txt
public/images/profile.jpg
public/images/project-1.jpg
public/images/project-2.jpg
public/images/project-3.jpg
```

Current usage:

- `profile.jpg`: main hero cutout and origin image.
- `project-1.jpg`: Dokkaebi/security platform panel, also used as the pressure story placeholder.
- `project-2.jpg`: fraud detection/cloud craft panel.
- `project-3.jpg`: Smart Check-Up/project selection panel.

Recommended image direction:

- Use high-contrast portraits, screenshots, or symbolic personal images.
- Keep the important subject centered with breathing room.
- The site applies grayscale, sepia, contrast, halftone, and manga-panel styling automatically.
- Use wide images when possible, around `1400x1000` or larger.

## Content

Portfolio data lives in:

```txt
src/data/portfolio.ts
```

Update projects, skills, timeline items, and contact links there.

## Design Note

The design is original and only uses the reference as moodboard inspiration. It does not include copyrighted logos, official manga panels, characters, or copied brand assets.
