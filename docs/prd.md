# Product Requirements Document (PRD): One-Minute Dungeon

> **Status:** Draft
> **Target Launch:** Tomorrow 🚀
> **Owner:** RZR

## 1. Overview

| Item | Details |
| :--- | :--- |
| **Product** | One-Minute Dungeon |
| **Platform** | PWA (Mobile First) |
| **Engine** | Svelte (Frontend), Recommended: Convex (Backend) |
| **Goal** | Launch a viral, 60-second dungeon crawler with collectible endings. |

## 2. Objectives

1.  **Launch Speed:** Ship a playable MVP by EOD Tomorrow.
2.  **User Acquisition:** Achieve a K-Factor > 1.0 via the viral "Ending Card".
3.  **Retention:** Users play >3 times per session (due to "Just one more turn" loop).

## 3. Scope (MVP - "Tomorrow" Release)

| Feature | Scope | Implementation Notes |
| :--- | :--- | :--- |
| **Auth** | ✅ In-Scope | Full Auth (Google/Email). Tie runs to persistent account. |
| **Core Loop** | ✅ In-Scope | 5 Nodes per Dungeon. Choice -> Roll -> Result. |
| **Health System** | ✅ In-Scope | Player starts with **10 HP**. Damage persists across nodes. 0 HP = Death. |
| **Dice Mechanics** | ✅ In-Scope | Visual D20 roll animation on every choice. |
| **Ending Generation** | ✅ In-Scope | "Title" + "Rarity" generated based on survival & hidden stats. |
| **Share Card** | ✅ In-Scope | 9:16 Vertical image generation (Canvas/DOM-to-Image). |
| **Leaderboards** | ❌ Out-of-Scope | Post-MVP. |
| **Inventory** | ❌ Out-of-Scope | Complex inventory out. "Hidden Stats" (Str/Dex) only. |
| **Paid Tiers** | ❌ Out-of-Scope | Freemium/IAP hooks in UI, but payments disabled for Day 1. |

## 4. User Flow

```mermaid
graph TD
    A[Landing Page] -->|Login/Start| B[Dungeon Entrance]
    B --> C{Encounter 1}
    C -->|Choice A| D[Dice Roll Animation]
    D -->|Success| E[Result: You Win! (-0 HP)]
    D -->|Fail| F[Result: Ouch! (-3 HP)]
    E --> G{Encounter 2...}
    F --> G
    G -->|...| H{Check HP > 0?}
    H -->|No| I[Death Screen]
    H -->|Yes| J[Victory Screen]
    I --> K[Generate Share Card]
    J --> K
    K --> L[Share / Restart]
```

## 5. Functional Requirements

### 5.1. Authentication
*   **Requirement:** Users must sign in to play (or sign in to save results). *Correction based on "Full Auth" request:* Forced login or "Play as Guest then Link" (Soft Auth).
*   **MVP Decision:** Recommended **Soft Auth** (Play immediately, account created in background or prompted to save Title). If "Strict Auth" is required, user logs in first.

### 5.2. The Dungeon Engine
*   **State:**
    *   `HP`: Max 10.
    *   `Hidden_Stats`: { Str: 0, Dex: 0, Int: 0, Cha: 0 }.
    *   `Node_Index`: 1 to 5.
*   **Encounters:** text-based scenarios with 2 choices.
    *   *Example:* "A Goblin blocks the path."
        *   Option A: Attack (Checks Str).
        *   Option B: Sneak (Checks Dex).

### 5.3. Dice & Outcome
*   **Visual:** A 3D or CSS-animated D20 dice must roll overlaying the screen.
*   **Logic:** `Roll (1-20) + Hidden_Stat > Difficulty (10-15)`.
*   **Feedback:** "Critical Success!" (Green), "Failure" (Red).

### 5.4. The Share Card
*   **Format:** 9:16 Vertical Image (PNG/JPG).
*   **Content:**
    *   User's Title (e.g., "The Lucky Peasant").
    *   Rarity Badge (Common to Legendary).
    *   Cause of Death / Victory Quote.
    *   "Play at [URL]" QR Code or Link.

## 6. Technical Stack Recommendation

Given the **"Tomorrow"** timeline, speed and effective type-safety are paramount.

*   **Frontend:** **SvelteKit**
    *   *Why?* Best-in-class performance, small bundle size (PWA friendly), great animation primitives for the "Dice Roll".
*   **Backend:** **Convex**
    *   *Why?* Zero-setup database, real-time updates (essential for the "Dice Roll" sync if we go multiplayer later, but great for instant UI now), and seamless TypeScript integration. No wrestling with SQL migrations for a 24h build.
*   **Auth:** **Clerk** (Integrated with Convex)
    *   *Why?* Drop-in UI components. Don't build your own login form for a 24h deadline.

## 7. Success Metrics

| Metric | Target (Day 1) | Tracking |
| :--- | :--- | :--- |
| **Shares** | 20% of finished games shared | Track "Share Button" clicks. |
| **Completion** | 90% of started runs finished | Track "Game End" events. |
| **Signups** | 50% conversion from Guest to Reg | Track `user_created` events. |

## 8. Open Questions

1.  **Content Content:** Who is writing the ~50 encounter scenarios? (AI generated?) yes AI generated
2.  **Art Assets:** Do we have the "Frame" for the share card, or use CSS generation? yes CSS generation
