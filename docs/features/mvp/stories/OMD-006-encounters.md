# Story: Encounter Content Bank

**ID:** `OMD-006`
**Title:** Generate and Seed Encounter JSON
**Role:** Content / Backend
**Est. Effort:** 1 Hour

## Objective
Create the static content bank for the dungeon nodes.

## Specifications
*   **Format:** JSON file `convex/encounters.json`.
*   **Structure:**
    ```json
    [
      {
        "id": "e_001",
        "text": "A goblin is stealing your boots!",
        "choices": [
          { "text": "Kick him", "stat": "str", "difficulty": 12 },
          { "text": "Reason with him", "stat": "cha", "difficulty": 15 }
        ]
      }
    ]
    ```
*   **Volume:** ~20-50 encounters (AI Generated).

## Acceptance Criteria
- [ ] JSON file exists with valid schema.
- [ ] Imports successfully into Convex (or used directly in logic).
- [ ] Contains at least 10 entries for testing.
