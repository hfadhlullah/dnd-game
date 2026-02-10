# Tech Spec: Encounter Illustrations

## Overview
Add visual illustrations to all encounter nodes in the dungeon crawl to improve immersion. Each of the 20 unique encounters will display a generated image that matches its textual description.

## Data Model Changes
### `src/lib/encounters.ts`
Update `Encounter` interface:
```typescript
export interface Encounter {
  id: string;
  text: string;
  image: string; // New field: Path to image (e.g., "/encounters/e_001.webp")
  choices: [EncounterChoice, EncounterChoice];
}
```

## detailed Implementation Plan

### 1. Asset Generation
Generate 20 images using text-to-image AI.
- **Style**: Dark fantasy, hand-drawn or painterly style, matching the "One-Minute Dungeon" vibe.
- **Format**: WebP for performance.
- **Location**: `static/encounters/`
- **Naming**: `e_001.webp`, `e_002.webp`, etc.

### 2. Code Updates
- **`src/lib/encounters.ts`**:
    - Add `image` property to the interface.
    - Update the `ENCOUNTERS` array to include the image path for each of the 20 items.
- **`src/routes/dungeon/+page.svelte`**:
    - Add an `<img>` tag inside the "Encounter Area".
    - Position: Above the encounter text (`<p class="text-parchment...">`).
    - Styling: Rounded corners, border (parchment/gold), max-height constrained (e.g., `h-48` or `h-64`).

## UI/UX
- **Layout**:
  - [Header: HP/Stats]
  - [Image: Centered, ~300px height]
  - [Text: Encounter Description]
  - [Buttons: Choices]
- **Responsive**: Image should scale down on smaller screens.

## Security & Performance
- Images will be served from `static/` which is cached by the CDN/Adapter.
- Images should be optimized (< 100KB ideally).
