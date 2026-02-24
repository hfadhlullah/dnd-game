# UI Wireframes: Character Creation Before Entering Dungeon

## Overview
This document outlines the user interface changes required for intercepting dungeon entry and routing users through sign-in and character creation flows. Since we are reusing existing Sign-In and Character Creation screens, the UI changes are minimal and focus primarily on the transition states and potentially adding contextual messaging.

## Trigger Points (No UI Change, Logic Only)
- **Current State:** A user clicks a "Enter Dungeon" or "Play" button on a dungeon details page.
- **Change:** 
  - If unauthenticated -> Route to `/sign-in?redirect=/dungeon/[id]`
  - If authenticated, no character -> Route to `/create-character?redirect=/dungeon/[id]`

## 1. Sign-In Screen Contextual Message (Optional Enhancement)

If feasible within the current design system, displaying a toast or a banner explaining *why* they were redirected improves UX.

**Wireframe Context:**
```
+---------------------------------------------------+
|  [Logo]                                           |
|                                                   |
|  +---------------------------------------------+  |
|  | (Optional Banner)                           |  |
|  | "Please sign in to save your dungeon        |  |
|  |  progress."                                 |  |
|  +---------------------------------------------+  |
|                                                   |
|  [ Existing Sign-In Form                        ] |
|  [ Email Input                                  ] |
|  [ Password Input                               ] |
|  [ Submit Button                                ] |
|                                                   |
+---------------------------------------------------+
```

## 2. Character Creation Contextual Message (Optional Enhancement)

Similarly, explaining why they are here before entering the dungeon.

**Wireframe Context:**
```
+---------------------------------------------------+
|  [Logo]                                           |
|                                                   |
|  +---------------------------------------------+  |
|  | (Optional Banner)                           |  |
|  | "You need a hero to brave the dungeon!      |  |
|  |  Create one below."                         |  |
|  +---------------------------------------------+  |
|                                                   |
|  [ Existing Character Creation Form             ] |
|  [ Class Selection, Name Input, etc.            ] |
|  [ Create Character Button                      ] |
|                                                   |
+---------------------------------------------------+
```

## 3. Seamless Resume (Logic Only)
- **Action:** Upon successful sign-in (if a character exists) or upon successful character creation.
- **Change:** The application reads the `redirect` query parameter or local storage state and immediately navigates the user to `/dungeon/[id]` or triggers the dungeon entry sequence automatically. There is no intermediate "Success! Click here to continue" screen unless required by technical constraints.
