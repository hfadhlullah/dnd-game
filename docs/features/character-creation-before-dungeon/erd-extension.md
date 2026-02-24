# ERD Extension: Character Creation Before Entering Dungeon

## Overview
Based on the PRD Addendum and the requirements for the "Character Creation Before Entering Dungeon" feature, **no new database entities or schema changes are strictly required**. 

The feature purely relies on routing logic utilizing the existing authentication state and character association state.

## Entities Involved (Existing)
1. **User** (Represents the authenticated account)
2. **Character** (Represents the player's avatar in the game)

## Relationships (Existing)
- A **User** `has_many` **Characters**.
- The routing logic checks if the count of a User's associated Characters is `> 0`. 

## No Schema Changes Required
There are no new tables, fields, or relationships introduced by this feature. All tracking can be handled via frontend application state (URL parameters or local storage) and existing analytics event structures.
