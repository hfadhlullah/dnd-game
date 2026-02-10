# Story: Dungeon Logic Engine

**ID:** `OMD-003`
**Title:** Implement Dungeon State & RNG Logic
**Role:** Backend (Convex)
**Est. Effort:** 3 Hours

## Objective
Implement step-by-step game logic: Node traversal, RNG rolls, stat tracking, and HP deduction.

## Specifications
*   **State:** Use Convex to store active run state (or client-side + validation).
*   **Mutations:**
    *   `api.runs.start`: Initialize HP=10, Stats=0, Seed=Random.
    *   `api.runs.submitChoice(runId, choiceIndex)`:
        *   Validate current node.
        *   Calculate Roll `(d20 + stat)`.
        *   Update State (Dedup HP, Add Stat).
        *   Return Result (Success/Fail, Damage, Next Node Text).

## Acceptance Criteria
- [ ] Can start a new run and get a Run ID.
- [ ] Submitting a choice returns a valid Roll (1-20) and outcome.
- [ ] HP is correctly deducted on failure.
- [ ] Reaching 0 HP flags the run as `LOSS`.
- [ ] Reaching Node 5 victory flags the run as `WIN`.
