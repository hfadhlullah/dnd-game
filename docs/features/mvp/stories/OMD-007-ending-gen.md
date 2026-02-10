# Story: Ending Generation Engine

**ID:** `OMD-007`
**Title:** Implement Title Generation Logic
**Role:** Backend (Convex)
**Est. Effort:** 2 Hours

## Objective
Generate a funny/cool title based on the player's final stats and outcome.

## Specifications
*   **Logic:**
    *   Find Highest Stat (e.g., `STR`).
    *   Check Outcome (`WIN` vs `LOSS`).
    *   Select Adjective + Noun from lookup tables.
    *   *Example:* High STR + Win = "The Mighty Warlord".
    *   *Example:* High STR + Loss = "The Muscles-For-Brains".
*   **Rarity:** Assign rarity based on probability buckets (Common 50% -> Legendary 5%).
*   **Persistence:** Save to `runs` table.

## Acceptance Criteria
- [ ] `generateEnding(stats, outcome)` function returns a Title string.
- [ ] Titles vary based on the dominant stat.
- [ ] Rarity distribution is roughly correct (mocked with simple RNG).
