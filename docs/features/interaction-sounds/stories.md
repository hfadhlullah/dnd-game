# Implementation Stories: Interaction Sounds

## stories

### STORY-005: Implement SoundManager Class
- **Description**: Create a singleton `SoundManager` class that handles Web Audio API context management and procedural sound generation.
- **Technical Details**:
    -   File: `src/lib/sound.ts`
    -   Class: `SoundManager`
    -   Methods:
        -   `init()`: Resumes/creates AudioContext.
        -   `playClick()`: Oscillator-based blip (high freq sine/triangle).
        -   `playHit()`: Noise buffer + low freq impact.
        -   `playDamage()`: Sawtooth/square wave with distortion/low-pass filter.
        -   `playSuccess()`: Major arpeggio (e.g., C-E-G) or coherent chime.
- **Acceptance Criteria**:
    -   `SoundManager` can be imported and instantiated (or accessed as singleton).
    -   Calling methods generates audible sound in a browser console test.
    -   No external assets are required.

### STORY-006: Integrate Sounds into Game Loop
- **Description**: Hook up the `SoundManager` to the game's existing event handlers in the Svelte page.
- **Technical Details**:
    -   File: `src/routes/dungeon/+page.svelte`
    -   Import `soundManager`.
    -   Add `onclick` listener to `svelte:window` or main container to trigger `soundManager.init()` once.
    -   In `handleChoice()`: Call `playClick()`.
    -   In `onDiceComplete()`:
        -   If `outcome === 'SUCCESS'`, call `playSuccess()` (and maybe `playHit()` if it was a combat roll - check context if possible, or just default to success sound).
        -   If `damage > 0` (implies failure/damage), call `playDamage()`.
- **Acceptance Criteria**:
    -   Clicking choice buttons plays a sound.
    -   Completing a dice roll plays a Success or Damage sound based on the result.
    -   Audio context starts reliably on first user interaction.
