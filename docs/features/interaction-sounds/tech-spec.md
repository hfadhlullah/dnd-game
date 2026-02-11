# Tech Spec: Interaction Sounds (Procedural Audio)

## Overview
This feature implements a lightweight, procedural audio system using the Web Audio API. It provides immediate auditory feedback for key game interactions (UI clicks, combat hits, damage taken, and success states) without requiring external audio assets.

## Architecture

### 1. SoundManager (Singleton/Service)
A dedicated `SoundManager` class will handle all `AudioContext` operations. It will expose high-level methods for game events, encapsulating the synthesis logic.

#### Interface
```typescript
interface SoundManager {
  init(): void; // Initialize AudioContext (must be triggered by user interaction first)
  playClick(): void;
  playHit(): void; // Enemy hit / strong impact
  playDamage(): void; // Player taking damage
  playSuccess(): void; // Positive chime/chord
  playFailure(): void; // Negative sound (optional, for failed rolls)
}
```

### 2. Audio Synthesis Strategy (Web Audio API)
Instead of loading `.mp3` files, we will synthesize sounds in real-time. This ensures zero load time and extremely low latency.

*   **Click**: Short, high-pitch `sine` or `triangle` wave envelope (10ms-50ms).
*   **Hit**: White noise burst mixed with a low-frequency `square` wave punch.
*   **Damage**: Low-frequency `sawtooth` wave with a rough decay, potentially bit-crushed or distorted if possible, or just a dissonant low cluster.
*   **Success**: A rapid arpeggio of a major chord (e.g., C-E-G) using `sine` or `triangle` waves with a bell-like envelope.

## Integration Points

### 1. Global Initialization
*   **File**: `src/routes/dungeon/+page.svelte`
*   **Logic**: Initialize `SoundManager` on the first user interaction (click anywhere) to unlock the `AudioContext`.

### 2. UI Buttons
*   **File**: `src/routes/dungeon/+page.svelte`
*   **Event**: `handleChoice` (Choice button clicks).
*   **Action**: Call `SoundManager.playClick()`.

### 3. Combat/Dice Outcomes
*   **File**: `src/routes/dungeon/+page.svelte` (specifically in `onDiceComplete`).
*   **Logic**:
    *   If `outcome === 'SUCCESS'`: Call `SoundManager.playSuccess()` (and/or `playHit()` if it was an attack).
    *   If `outcome === 'FAIL'`: Call `SoundManager.playFailure()` (optional) or just silence.
    *   If `damage > 0`: Call `SoundManager.playDamage()`.

## Data Model Changes
None. This is purely a frontend service.

## Implementation Plan

1.  **Create `src/lib/sound.ts`**: Implement the `SoundManager` class with procedural synthesis methods.
2.  **Update `src/routes/dungeon/+page.svelte`**:
    *   Import `soundManager`.
    *   Add `onclick` global handler (once) to resume `AudioContext`.
    *   Add `soundManager.playClick()` to choice buttons.
    *   Add `soundManager.playSuccess()`, `playHit()`, `playDamage()` inside `onDiceComplete` based on game state integration.

## Constraints & Edge Cases
*   **Browser Autoplay Policy**: AudioContext must be resumed after a user gesture. We will handle this by checking state on the first click.
*   **Mobile**: Web Audio works well on mobile, but volume should be conservative to avoid distortion on small speakers.
