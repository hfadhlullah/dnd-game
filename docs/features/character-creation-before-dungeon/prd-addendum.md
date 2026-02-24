# Character Creation Before Entering Dungeon - PRD Addendum

## Overview
| Item | Details |
| --- | --- |
| **Feature Name** | Character creation before entering dungeon |
| **Release Timeline** | [ASSUMPTION] Next Sprint |
| **Target Audience** | Unregistered users, Registered users without characters |

## Quick Links
- [Design/Figma] (TBD)
- [Technical Design Document] (TBD)
- [Project Board] (TBD)

## Background
Currently, users may enter the dungeon flow without an account or an active character. The core problem is that gameplay requires persistent characters and user accounts. We need to ensure unregistered users sign in, and users without characters create one, before entering a dungeon.

## Objectives
- **Business:** Increase the number of registered accounts.
- **Product:** Ensure everyone playing the game has a character.
- **User:** Provide a seamless flow from attempting to enter a dungeon, to onboarding/sign-in, to character creation, and seamlessly returning to the dungeon entry.

## Success Metrics
| Metric | Baseline | Target | Measurement Method | Timeline |
| --- | --- | --- | --- | --- |
| Registered Accounts | [Current] | +[X]% Growth | Sign-up Events | Post-launch |
| Character Creation Rate | [Current] | 95% of new sign-ups | Analytics Funnel | Post-launch |
| Onboarding Completion | 0 | 85% | Funnel tracking (Entry -> Sign in -> Create -> Dungeon) | Post-launch |

## Scope
✅ **In-Scope**
- Intercepting the routing logic when a user attempts to enter a dungeon.
- Redirecting unauthenticated users to the sign-in clerk.
- Redirecting authenticated users without characters to the character creation flow.
- Resuming the dungeon entry routing after the user successfully completes sign-in and character creation.
- Tracking completion rates and funnel analytics for this flow.

❌ **Out-of-Scope**
- Redesigning the character creation system itself.
- Changes to dungeon gameplay.

## User Flow
```
[User Clicks "Enter Dungeon"]
       │
       ▼
[Is User Authenticated?] ───(No)───► [Redirect to Sign-In Clerk]
       │                                     │
     (Yes)                                 (Success)
       │                                     │
       ▼                                     ▼
[Does User Have Character?] ──(No)──► [Redirect to Character Creation]
       │                                     │
     (Yes)                                 (Success)
       │                                     │
       ▼                                     ▼
[Resume Dungeon Entry] ◄─────────────────────┘
```

## User Stories
| ID | Story | Acceptance Criteria | Platform |
| --- | --- | --- | --- |
| US-01 | As an unregistered user trying to enter a dungeon, I want to be prompted to sign in so I can save my progress. | Given an unauthenticated user clicks to enter a dungeon, When they do, Then they are redirected to the sign-in clerk page. | Web |
| US-02 | As a signed-in user without a character, I want to be redirected to character creation so I can play the game. | Given an authenticated user with no characters tries to enter a dungeon, When the check occurs, Then they are redirected to the character creation view. | Web |
| US-03 | As a user who was forced to sign in/create a character, I want to immediately enter the dungeon afterward so I don't lose my place. | Given a user completes the required onboarding steps triggered by the dungeon entry attempt, When they finish, Then they are automatically routed back to the dungeon they were trying to enter. | Web |

## Analytics & Tracking
| Event Name | Trigger | Properties |
| --- | --- | --- |
| `dungeon_entry_attempt` | User attempts to enter a dungeon. | `{"authenticated": boolean, "has_character": boolean, "dungeon_id": string}` |
| `onboarding_redirect` | User is redirected to sign-in or create character. | `{"reason": "unauthenticated" \| "no_character", "dungeon_id": string}` |
| `onboarding_resume_dungeon` | User completes onboarding and resumes entry. | `{"dungeon_id": string}` |

## Open Questions
| Question | Owner | Status | Notes |
| --- | --- | --- | --- |
| Are there specific parameters we need to pass through the URLs during the redirect chain to remember the intended dungeon? | Eng | Open | Need to review frontend routing state management. |

## Notes & Considerations
- **Technical Consideration:** Ensure URL parameters or local state accurately store the destination `dungeon_id` so the resume flow works smoothly without breaking browser back navigation.
