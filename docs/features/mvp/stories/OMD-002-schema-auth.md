# Story: Core Schema & Auth Logic

**ID:** `OMD-002`
**Title:** Implement Users, Runs Schema and Guest Auth Logic
**Role:** Backend (Convex)
**Est. Effort:** 2 Hours

## Objective
Define the database schema in `convex/schema.ts` and implement basic auth logic to support Guest users.

## Specifications
*   **Schema:** Implement `users` and `runs` tables as per `docs/erd/core-erd.md`.
*   **Auth Helper:** Create `convex/auth.ts` to handle `convex-clerk` integration.
*   **Mutations:**
    *   `api.users.store` (create/update user on login).
    *   `api.users.createGuest` (create orphan user, return ID).

## Acceptance Criteria
- [ ] `npx convex dev` pushes schema changes successfully.
- [ ] Can inspect `users` table in Convex dashboard.
- [ ] Guest user creation works via API test.
- [ ] Clerk integration is configured (environment variables set).
