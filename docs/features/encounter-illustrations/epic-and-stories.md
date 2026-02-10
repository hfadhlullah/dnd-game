# Feature Epic: Encounter Illustrations

## Overview
This feature aims to enhance player immersion in the One-Minute Dungeon game by adding visual illustrations to each encounter node. Currently, encounters are text-only. Visuals will help set the tone and make the gameplay more engaging.

## Key User Stories
1. **Visual Immersion**: As a player, I want to see a unique illustration for each encounter node so that I can feel more connected to the game world.
2. **Contextual Consistency**: As a player, I want the illustration to match the textual description of the encounter (e.g., a goblin image for a goblin encounter) so that the narrative is coherent.
3. **Responsive Layout**: As a player, I want the illustration to be displayed prominently but not obstructed by text or buttons on both desktop and mobile devices.

## Requirements
- **Asset Generation**: Generate unique illustrations for all 20 existing encounters.
- **Data Model Update**: Update the `Encounter` interface to include an `image` property.
- **UI Update**: Modify the encounter view component to display the image.
- **Asset Storage**: Store images in a public directory (e.g., `static/encounters/`).
