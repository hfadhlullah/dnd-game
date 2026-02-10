---
description: LIGHT complexity feature addition — fast, lean documentation for new features in startups, MVPs, or internal tools.
---

# Add Feature Workflow (LIGHT)

This workflow is for adding new features or modules to **startups, MVPs, internal tools, and fast-iteration projects**. It prioritizes speed and combined documentation.

## Step 1: Feature Epic + Key User Stories

1.  **Interview**: High-level feature scope and user needs.
    *   *Question*: "What is the feature and what are the 3-5 key user stories?"
2.  **Generate**: Execute `skills/epic-generator/SKILL.md` (and use `skills/story-generator/SKILL.md` for stories).
    *   Output: `docs/features/[feature-name]/epic-and-stories.md`.
3.  **Approve**: Wait for user approval before proceeding.

## Step 2: UI Wireframes

1.  **Interview**: Key screens only.
    *   *Question*: "What are the 2-3 critical screens for this feature?"
2.  **Generate**: Execute `skills/wireframe-generator/SKILL.md`.
3.  **Approve**: Wait for user approval before proceeding.

## Step 3: API Contract (Only if External/Critical)

1.  **Check**: Is this API consumed externally or is it critical?
    *   If **No**: Skip this step. Document endpoints inline in the Tech Spec.
    *   If **Yes**: Execute `skills/api-contract-generator/SKILL.md`.
        *   Output: `docs/features/[feature-name]/api-contract.md`.
4.  **Approve**: Wait for user approval before proceeding.

## Step 4: Combined FSD + TDD (Tech Spec)

This is the core document — **FSD and TDD merged into one**.

1.  **Interview**: Functional and technical details together.
    *   *Question*: "Walk me through the feature flow and any technical considerations."
2.  **Gather Details**:
    - Key functional flows and business rules.
    - Data model changes (inline, not separate ERD doc).
    - API endpoints (inline if not external).
    - Technical approach (architecture, patterns).
3.  **Generate**: Execute `skills/tdd-generator/SKILL.md` in **LIGHT mode**.
    *   Output: `docs/features/[feature-name]/tech-spec.md`.
4.  **Approve**: Wait for user approval before proceeding.

## Step 5: Sprint Stories

1.  **Generate**: Break Tech Spec into sprint-ready stories via `skills/story-generator/SKILL.md`.
2.  **Output**: Append to or create `docs/features/[feature-name]/stories.md`.
3.  **Approve**: Wait for user approval before completion.

---

# Completion

*   Notify the user that documentation is complete.
*   Provide a summary of files created.
*   Remind user: Documentation follows development here — iterate as you build.
