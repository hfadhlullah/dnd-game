# Story: Project Setup

**ID:** `OMD-001`
**Title:** Initialize Project with SvelteKit, Convex, and Tailwind
**Role:** Fullstack
**Est. Effort:** 1 Hour

## Objective
Set up the repository and core infrastructure to support the "One-Minute Dungeon" PWA.

## Specifications
*   **Framework:** SvelteKit (latest)
*   **Styling:** Tailwind CSS (via `svelte-add` or manual config)
*   **Backend:** Convex (init project)
*   **Auth:** Clerk (install SDK)
*   **Fonts:** Configure `Cinzel` and `Inter` via `@fontsource` or Google Fonts.

## Acceptance Criteria
- [ ] `npm run dev` starts the SvelteKit server without errors.
- [ ] `npx convex dev` starts the backend sync.
- [ ] Tailwind classes work (verify with a `bg-red-500` test).
- [ ] Global font variables (`font-display`, `font-sans`) are available.
- [ ] Project is committed to Git.
