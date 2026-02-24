# Epic: Character Creation Before Entering Dungeon

## Overview
This epic covers the necessary work to ensure that any user attempting to enter a dungeon flow first has a registered account and an active character. 

## Objectives
- Intercept entry to dungeons for unauthenticated users and redirect them to the sign-in clerk.
- Intercept entry to dungeons for authenticated users without characters and redirect them to character creation.
- Seamlessly route users back to their intended dungeon once onboarding is complete.
- Track analytics for the onboarding funnel.

## User Stories
- **US-01:** As an unregistered user trying to enter a dungeon, I want to be prompted to sign in so I can save my progress.
- **US-02:** As a signed-in user without a character, I want to be redirected to character creation so I can play the game.
- **US-03:** As a user who was forced to sign in/create a character, I want to immediately enter the dungeon afterward so I don't lose my place.

## Technical Scope
- **Frontend Routing:** Update dungeon entry navigation to check authentication and character state.
- **State Management:** Persist the intended `dungeon_id` destination through the sign-in and character creation flows.
- **Analytics Integration:** Add event tracking for `dungeon_entry_attempt`, `onboarding_redirect`, and `onboarding_resume_dungeon`.

## Dependencies
- Existing Sign-in Clerk Flow
- Existing Character Creation Flow
- Analytics Tracking System
