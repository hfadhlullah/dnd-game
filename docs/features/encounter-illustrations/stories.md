# User Stories: Encounter Illustrations

## Stories

### STORY-001: Encounter Data Model Update
- **As a** developer
- **I want to** update the `Encounter` interface to include an `image` property
- **So that** I can associate an illustration with each encounter.
- **Acceptance Criteria**:
  - `Encounter` interface has `image: string` field.
  - All 20 items in `ENCOUNTERS` array have a valid image path.

### STORY-002: Encounter Image Generation
- **As a** designer
- **I want to** generate unique illustrations for each encounter
- **So that** the game is visually engaging.
- **Acceptance Criteria**:
  - 20 unique images generated (or best effort with placeholders).
  - Images stored in `static/encounters/`.
  - Images are optimized for web (e.g., WebP/PNG).

### STORY-003: Display Encounter Image
- **As a** player
- **I want to** see the illustration above the encounter text
- **So that** I can visualize the scenario.
- **Acceptance Criteria**:
  - Image is displayed in the encounter view.
  - Image is centered and has a border/frame.
  - Image scales responsively on mobile.
