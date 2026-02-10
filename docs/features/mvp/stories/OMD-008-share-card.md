# Story: Share Card Generation

**ID:** `OMD-008`
**Title:** Implement Share Card Image Generation
**Role:** Frontend
**Est. Effort:** 4 Hours

## Objective
Generate a 9:16 image of the ending for social sharing.

## Specifications
*   **Tech:** `html-to-image` or `dom-to-image` (Client-side generation).
*   **Layout:** See `docs/design-system.md`.
*   **Trigger:** "Share" button on Result screen.
*   **Flow:**
    1.  Render hidden HTML container with high-res assets.
    2.  Capture as PNG blob.
    3.  `navigator.share({ files: [blob] })` if mobile.
    4.  Fallback: Download or Copy to Clipboard.

## Acceptance Criteria
- [ ] Generates a PNG matching the design specs.
- [ ] Text is legible.
- [ ] Web Share API triggers on supported mobile devices.
