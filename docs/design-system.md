# Design System: One-Minute Dungeon

> **Theme:** "Budget Medieval" / Satirical RPG
> **Tech:** Tailwind CSS + Svelte
> **Status:** V1.0

## 1. Visual Identity

### 1.1. Core Principles
1.  **Readability First:** It's a text adventure. Text must be legible on mobile.
2.  **Tactile UI:** Buttons should feel "chunky" and clickable.
3.  **Satirical Contrast:** Serious "High Fantasy" headers (Blackletter) mixed with modern, clean sans-serif body text for comedy timing.

### 1.2. Typography
| Usage | Font Family | Tailwind Class | Fallback |
| :--- | :--- | :--- | :--- |
| **Headings** | *Cinzel* or *UnifrakturMaguntia* | `font-display` | Serif |
| **Body / UI** | *Inter* or *System UI* | `font-sans` | Sans-Serif |
| **Code / Stats** | *Fira Code* | `font-mono` | Monospace |

### 1.3. Color Palette (Tailwind Extended)

| Token | Scoped Value | Description |
| :--- | :--- | :--- |
| **`bg-dungeon`** | `#1a1a1a` | Dark mode default (Dungeon walls). |
| **`bg-parchment`** | `#fdf6e3` | Light mode / Card background. |
| **`text-primary`** | `#fdf6e3` (Dark) | Main text color. |
| **`accent-gold`** | `#ffd700` | Rarity: Legendary / Rewards. |
| **`accent-blood`** | `#ff4444` | Damage / Errors / Death. |
| **`accent-magic`** | `#bd93f9` | Magic / Rare items. |

## 2. Global Components

### 2.1. The "Action Button"
*   **Description:** Primary interaction element for choices.
*   **Style:** Full width, heavy border, slight skeuomorphic "press" effect.
*   **Classes:** `w-full p-4 border-2 border-white rounded-lg active:translate-y-1 transition-transform`

### 2.2. The "Stat Badge"
*   **Description:** Displays generic stats (STR/DEX/INT).
*   **Style:** Small pill shape, monospace font.
*   **Classes:** `px-2 py-1 bg-gray-800 rounded text-xs font-mono uppercase tracking-wider`

### 2.3. The "Dice Container"
*   **Description:** Overlay for the 3D dice roll.
*   **Visual Style:** Realistic, physical PBR rendering matching classic RPG aesthetics (e.g., Die Hard Dice style).
    *   **Texture:** Ornate metallic borders (Gold/Silver/Bronze) with intricate relief patterns.
    *   **Colors:** Deep jewel tones (Emerald, Ruby, Sapphire) or blackened metal with contrasting cages.
    *   **Typography:** High-readability Serif numbers (White or Gold) for maximum legibility.
*   **Z-Index:** `z-50` (Top layer).
*   **Behavior:** Blurred background backdrop when active.

## 3. Share Card Layout (9:16)
*   **Dimensions:** 1080x1920px (Target).
*   **Composition:**
    *   **Top 20%:** Game Logo (Big).
    *   **Middle 40%:** "The Title" (Typography centered, massive).
    *   **Bottom 20%:** Stats & "Killed By..." text.
    *   **Footer 10%:** URL / QR Code.

## 4. Accessibility (A11y)
*   **Contrast:** All text must pass AA standard on `#1a1a1a`.
*   **Motion:** `prefers-reduced-motion` must disable the 3D dice spin (fade in result instead).
*   **Touch Targets:** All clickable areas > 44px height.
