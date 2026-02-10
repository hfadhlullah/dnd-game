# Story: Gameplay UI (Nodes & Choices)

**ID:** `OMD-004`
**Title:** Implement Main Game Screen and Choice Buttons
**Role:** Frontend (Svelte)
**Est. Effort:** 3 Hours

## Objective
Build the primary visual interface where the user reads the encounter and makes choices.

## Specifications
*   **Component:** `src/routes/dungeon/[runId]/+page.svelte`.
*   **Design:** Match `docs/design-system.md` (Dark mode, chunky buttons).
*   **Interactions:**
    *   Display `Encounter Text` (Typewriter effect optional).
    *   Render 2 `ActionButton` components.
    *   Show `HP` bar (Visual hearts or bar).
    *   Show `Stats` badges.

## Acceptance Criteria
- [ ] Page loads run data from Convex.
- [ ] Clicking a choice triggers the mutation.
- [ ] Optimistic UI update (optional) or loading state.
- [ ] Result text (You hit the goblin!) is displayed after the roll.
