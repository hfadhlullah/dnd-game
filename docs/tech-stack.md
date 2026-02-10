# Tech Stack & Architecture Decision

> **Project:** One-Minute Dungeon
> **Type:** PWA (Mobile First)
> **Status:** Approved for MVP

## 1. Overview
A viral, micro-adventure web app built for speed of development ("launch tomorrow") and instant user feedback. The architecture prioritizes **Developer Experience (DX)** and **Type Safety** to minimize bugs during the 24-hour build cycle.

## 2. Architecture Style
**Serverless Monolith (Logical).**
We are using a "Backend-as-a-Service" (BaaS) pattern with Convex. This allows us to write backend logic as simple TypeScript functions without managing servers, containers, or database connections.

## 3. Technology Decisions

| Layer | Choice | Alternatives | Why This Choice |
| :--- | :--- | :--- | :--- |
| **Frontend** | **SvelteKit** | React, Vue | Best-in-class performance for hybrid PWAs. Built-in animations (essential for the "Dice Roll"). Smaller bundle size than React. |
| **Backend** | **Convex** | Firebase, Supabase | Zero-config. Real-time by default. End-to-end type safety with the frontend (no manual API types). Perfect for "speedruns". |
| **Database** | **Convex (Document)** | PostgreSQL, MongoDB | Integrated directly into the backend functions. No ORM setup required. |
| **Auth** | **Clerk** | Auth0, NextAuth | Best pre-built UI components. Seamless integration with Convex. Supporting "Guest" to "Registered" upgrades easily. |
| **Styling** | **Basic CSS / Tailwind** | Styled Components | *Decision:* **Tailwind CSS** (via Svelte Add). Fastest way to build responsive layouts without writing custom CSS files. |
| **Hosting** | **Vercel** | Netlify, AWS | Native support for SvelteKit. Zero-config deployment. |
| **Language** | **TypeScript** | JavaScript | Mandatory for standardizing data shapes (Entities, Rolls, Stats) across the full stack. |

## 4. Key Architecture Decisions (ADRs)

### ADR-001: Backend-as-a-Service (Convex)
*   **Context:** We need to ship in 24 hours. Setting up a Node/Express server + Postgres + Prisma + Migration scripts takes 2-4 hours of "plumbing".
*   **Decision:** Use Convex.
*   **Consequence:** Vendor lock-in. We are tied to Convex's platform. Accepted trade-off for speed.

### ADR-002: Guest-First Authentication
*   **Context:** Users will bounce if forced to login before playing a 60-second game.
*   **Decision:** Auto-generate a session token (Guest) on load. Prompt for Clerk login only upon death (to save the Title).
*   **Consequence:** Might have some "orphan" data if users clear cache. Accepted.

## 5. Development Environment
*   **Runtime:** `bun` (preferred) or `npm`.
*   **Repo:** Monorepo (Frontend + Convex folder).
*   **Local Dev:** `npx convex dev` + `npm run dev`.
