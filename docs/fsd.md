# Functional Specification Document (FSD): One-Minute Dungeon

> **Source:** [PRD](./prd.md)
> **Status:** Draft
> **Version:** 1.0

## 1. Feature Overview

One-Minute Dungeon is a web-based micro-adventure game where users navigate a 5-node dungeon by making binary choices, relying on RNG and hidden stats to survive.

## 2. User Roles

| Role | Description |
| :--- | :--- |
| **Guest** | Unauthenticated user. Can play but results may not persist if session is cleared. (Soft Auth). |
| **Player** | Authenticated user. Runs are saved to their profile. |

## 3. Functional Requirements

### 3.1. Authentication
| ID | Requirement | Acceptance Criteria |
| :--- | :--- | :--- |
| **FR-001** | **Soft Auth / Guest Access** | **Given** a new user lands on the app,<br>**Then** a silent "Guest" account is created immediately.<br>**And** they can start playing without entering credentials. |
| **FR-002** | **Full Sign-Up / Upgrade** | **Given** a Guest user finishes a run,<br>**When** they click "Save My Title" or "Login",<br>**Then** they can link their account via Clerk (Google/Email).<br>**And** previous runs are merged to the new account. |

### 3.2. Dungeon Core Loop
| ID | Requirement | Acceptance Criteria |
| :--- | :--- | :--- |
| **FR-003** | **Dungeon Initialization** | **When** a run starts,<br>**Then** the system generates a seed-based dungeon with 5 sequential nodes.<br>**And** initializes Player HP to 10.<br>**And** initializes Hidden Stats (Str, Dex, Int, Cha) to 0. |
| **FR-004** | **Encounter Presentation** | **Given** the player is at Node N,<br>**Then** display the Encounter Text (e.g., "A wild Goblin appears!").<br>**And** display 2 specific Action Choices (e.g., "Attack" vs "Run"). |
| **FR-005** | **Action Resolution** | **When** the player clicks an Action,<br>**Then** trigger a visual D20 dice roll.<br>**And** calculate Success/Failure based on: `Roll + HiddenStat > Difficulty`. |
| **FR-006** | **HP & Consequence** | **If** the result is Failure,<br>**Then** deduct HP (e.g., -2 to -4).<br>**And** show damage animation.<br>**If** HP <= 0, transition to Death Screen. |
| **FR-007** | **Hidden Stat Growth** | **When** an action is taken (Success or Fail),<br>**Then** increment the associated Hidden Stat (e.g., +1 Str for "Attack"). |

### 3.3. Ending & Share Card
| ID | Requirement | Acceptance Criteria |
| :--- | :--- | :--- |
| **FR-008** | **Ending Generation** | **When** the run ends (Death or Node 5 specific victory),<br>**Then** generate a Title based on highest Hidden Stat + Outcome.<br>*Logic:* `HighestStat="Str"` + `Outcome="Win"` -> "The Mighty Warlord". |
| **FR-009** | **Rarity Calculation** | **Given** the run Outcome,<br>**Then** assign a Rarity (Common [50%], Rare [30%], Epic [15%], Legendary [5%]). |
| **FR-010** | **Share Card Generation** | **When** the Result Screen loads,<br>**Then** generate a 9:16 image (DOM-to-Image/Canvas).<br>**Content:** Title, Rarity Badge, "Killed by X" (if dead), QR Code. |
| **FR-011** | **Social Share** | **When** "Share" is clicked,<br>**Then** use the Web Share API to share the image/text.<br>**Or** fallback to "Copy to Clipboard" / "Download Image". |

## 4. Data Model (Schema Recommendations)

### 4.1. Entity: `users` (Convex)
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `id` | Unique User ID. |
| `clerkId` | `string` | Link to Auth provider. |
| `isGuest` | `boolean` | Flag for soft auth. |
| `highestTitle` | `string` | Cache of best title. |

### 4.2. Entity: `runs` (Convex)
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `id` | Unique Run ID. |
| `userId` | `id` | Link to User. |
| `outcome` | `enum` | `WIN` | `LOSS`. |
| `finalHp` | `number` | HP at end. |
| `endingTitle` | `string` | Generated Title. |
| `rarity` | `enum` | `COMMON`...`LEGENDARY`. |
| `seed` | `string` | For replayability (Future proofing). |

## 5. API / Mutations (Convex)

*   `mutation startRun()`: Initializes a new run, returns `runId` and `node_1`.
*   `mutation submitChoice({ runId, choiceIndex })`:
    *   Validates move.
    *   Calculates RNG (server-side for anti-cheat).
    *   Updates HP/Stats.
    *   Returns `{ outcome: "SUCCESS"|"FAIL", roll: 15, damage: 0, nextNode: ... }`.
*   `query getLeaderboard()`: (Future use).
*   `mutation linkGuestAccount()`: Merges Guest data to Auth data.

## 6. Open Questions / Assumptions

*   **Assumption:** We will use a predefined JSON list of ~50 encounters for the "AI Generated" content for Day 1 to ensure standard formatting, unless we hook up a live LLM (Latency concern). *Decision: Pre-generate a JSON bank of 50 encounters using ChatGPT/Claude before coding.*
