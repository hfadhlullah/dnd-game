# Story: 3D Dice Roller Component

**ID:** `OMD-005`
**Title:** Implement Visual D20 Animation
**Role:** Frontend
**Est. Effort:** 3 Hours

## Objective
Create a visual "Dice Roll" overlay that triggers when a choice is made, providing the core "dopamine hit" of the game.

## Specifications
*   **Tech:** CSS 3D Transforms or `threlte` (Svelte Three.js) or a lightweight canvas library. *Decision: CSS3D for performance/size.*
*   **Visuals:** Match `docs/design-system.md` (Metallic, Ornate).
*   **Animation:**
    *   State 1: Hidden.
    *   State 2: Rolling (Spinning wildy).
    *   State 3: Landed (Shows specific number passed via prop).
*   **Feedback:** Flash Green/Red borders based on `Outcome`.

## Acceptance Criteria
- [ ] Component accepts `targetNumber` (1-20) and `outcome` (WIN/LOSS).
- [ ] Triggers animation on mount or prop change.
- [ ] "Landed" state matches the `targetNumber` exactly.
- [ ] Animation duration is < 2 seconds (snappy).
