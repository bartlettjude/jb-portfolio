## Overview

Personal tech portfolio built with Next.js App Router, TypeScript, and Tailwind CSS (light theme with teal accent). Content is data-driven—update one file to add projects.

## Quick start

Install dependencies:
```bash
npm install
```

Run the dev server:
```bash
npm run dev
# visit http://localhost:3000
```

Build for production:
```bash
npm run build
```

Start the production build locally:
```bash
npm run start
```

## Editing your info

- Update name, role, tagline, location, email, and social links in `data/siteConfig.ts`.
- Global styling (light background, accent color, font) lives in `app/globals.css`.

## Adding or editing projects (single file)

1) Open `data/projects.ts`.
2) Copy the commented example at the top of the file.
3) Paste it into the `projects` array and fill in the fields:
   - Required: `slug`, `name`, `shortDescription`, `fullDescription`, `techStack`, `status`, `type`.
   - Optional: `role`, `githubUrl`, `demoUrl`, `createdAt`, `updatedAt`, `highlighted`.
4) Save. The Home, Projects list, and Project detail pages all update automatically.

Helpers available:
- `getAllProjects()` sorts projects (newest first).
- `getProjectBySlug(slug)` retrieves one project.
- `getHighlightedProjects()` returns featured items for the Home page.

## Auto-sync from GitHub (pinned repos)

- Pulls pinned repos for `bartlettjude` (up to 6) and rewrites `data/projects.ts`.
- Local run: set `GITHUB_TOKEN` then `npm run sync:projects`.
- CI run: GitHub Actions workflow `.github/workflows/sync-projects.yml` runs nightly and opens a PR with updates.

## Page structure (app router)

- `/` – Hero plus highlighted projects.
- `/projects` – All projects grouped by status.
- `/projects/[slug]` – Individual project detail pages.
- `/about` – Bio and skills.
- `/contact` – Email and social links.

## Components

- `Container`, `PageShell`, `Section` keep spacing consistent.
- `Navbar`, `Footer` pull data from `siteConfig`.
- `ProjectCard`, `ProjectGrid`, `Tag`, `Button` are reusable UI pieces.

## Notes

- The accent color and base theme are defined in `app/globals.css`.
- Navigation is responsive; the navbar collapses on small screens.
- All text strings that should change over time live in `data/siteConfig.ts` or `data/projects.ts`.
