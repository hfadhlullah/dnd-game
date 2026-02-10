---
description: HEAVY complexity project kickoff — generates full documentation suite for enterprise, platform, regulated, or multi-team projects.
---

# Project Kickoff Workflow (HEAVY)

This workflow is for **enterprise, platform, regulated, or multi-team projects** where predictability and scale are critical. Each feature is independently deployable and documentation is versioned.

## When to Use HEAVY

Use this workflow if ANY of the following apply:
- Multi-team project
- External API consumers
- Regulated or compliance-heavy domain
- Data model changes affecting multiple services
- Long-lived platform with multiple stakeholders

---

# Global Artifacts (Once Per Project)

These are created **once** and governed centrally.

## Step 1: Product Brief (bisa di skip)

1.  **Read**: Load `skills/product-brief/SKILL.md` for interview guidance.
2.  **Interview**: Follow the skill's data-gathering process to collect product overview, problem, solution, key features, business model, competitive advantage, and success metrics.
3.  **Confirm**: Summarize and confirm with the user.
4.  **Generate**: Execute the skill to produce the Product Brief.
5.  **Approve**: Wait for user approval before proceeding.

## Step 2: PRD (Signed-Off)

1.  **Read**: Load `skills/prd-generator/SKILL.md` for interview guidance.
2.  **Interview**: Follow the skill's data-gathering process to collect requirements, user stories, acceptance criteria, constraints, and dependencies.
3.  **Confirm**: Require explicit sign-off before proceeding.
4.  **Generate**: Execute the skill to produce the PRD.
5.  **Approve**: Wait for user approval before proceeding.

## Step 3: Functional Specification Document (FSD)

1.  **Read**: Load `skills/fsd-generator/SKILL.md` for interview guidance.
2.  **Interview**: Follow the skill's data-gathering process to collect detailed functional flows and business rules.
3.  **Generate**: Execute the skill to produce `docs/features/[feature-name]/fsd.md`.
4.  **Approve**: Wait for user approval before proceeding.

## Step 4: Tech Stack & Architecture Decision

1.  **Read**: Load `skills/tech-stack/SKILL.md` for interview guidance.
2.  **Interview**: Follow the skill's data-gathering process to collect application type, team expertise, frontend/backend frameworks, database, auth strategy, hosting/infra, CI/CD, and third-party integrations.
3.  **Confirm**: Summarize stack choices and trade-offs.
4.  **Generate**: Execute the skill to produce `docs/tech-stack.md`.
5.  **Approve**: Wait for user approval before proceeding.

## Step 5: Design System

1.  **Read**: Load `skills/design-system/SKILL.md` for interview guidance.
2.  **Interview**: Follow the skill's data-gathering process to collect brand identity, colors, typography, component styles, and accessibility requirements.
3.  **Confirm**: Summarize the design direction.
4.  **Generate**: Execute the skill to produce the Design System.
5.  **Approve**: Wait for user approval before proceeding.

## Step 6: Core ERD  (bisa di skip)

1.  **Read**: Load `skills/erd-generator/SKILL.md` for interview guidance.
2.  **Interview**: Follow the skill's data-gathering process to collect core entities, attributes, relationships, cardinalities, and constraints.
3.  **Confirm**: Review entity diagram.
4.  **Generate**: Execute the skill to produce `docs/erd/core-erd.md` with Mermaid ERD.
5.  **Approve**: Wait for user approval before proceeding.

## Step 7: Core API Standards & Governance (bisa di skip)

1.  **Interview**: Define platform-wide API conventions.
    *   *Question*: "What are your standards for authentication, error handling, versioning, and rate limiting?"
2.  **Document**: Create `docs/api-standards.md` covering:
    - Auth flow (OAuth, JWT, API keys)
    - Error response format
    - Versioning strategy
    - Rate limiting policy
3.  **Approve**: Wait for user approval before proceeding.

---

# Per-Feature Artifacts (Repeat Per Feature)

These are created **for each feature or module**.

## Step 8: Feature PRD Addendum  & PRD

1.  **Read**: Load `skills/prd-generator/SKILL.md`, `skills/prd-generator/SKILL.md` for interview guidance.
2.  **Context**: Read `docs/prd.md` to understand the current product state and constraints.
3.  **Interview**: Follow the skill's data-gathering process, scoped to this specific feature.
4.  **Generate**: Execute the skill to produce `docs/features/[feature-name]/prd-addendum.md`.
5.  **Approve**: Wait for user approval before proceeding.

## Step 9: Sprint Stories

1.  **Read**: Load `skills/story-generator/SKILL.md` for guidance.
2.  **Generate**: Execute the skill to break TDD into sprint-ready, estimated stories.
3.  **Output**: Create a directory of individual story files at `docs/features/[feature-name]/stories/`.
    *   Ensure each story is in its own markdown file (e.g., `VORA-001-login.md`).
4.  **Approve**: Wait for user approval before completion.

## Step 10: Master Data Integration

1.  **Objective**: Merge feature-specific artifacts back into the core documentation to maintain a single source of truth for the next feature.
2.  **Update PRD**:
    *   Read `docs/features/[feature-name]/prd-addendum.md`.
    *   Update `docs/prd.md` to include verified requirements and user stories from the addendum.
3.  **Update FSD**:
    *   Read `docs/features/[feature-name]/fsd-addendum.md`.
    *   Update `docs/fsd.md` to include verified requirements and user stories from the addendum.
4.  **Approve**: Wait for user approval to confirm core documentation is up-to-date.

---

# Completion

*   Notify the user that all documents have been generated.
*   Provide a summary of files created and their locations.
*   Remind user that ERD changes are explicit and audited, and stories are written *after* FSD/TDD approval.

.
