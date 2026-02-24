# Sprint Stories: Character Creation Before Entering Dungeon

## Epic
**Character Creation Before Entering Dungeon**

## Stories

### DND-001: Implement Routing Interceptor for Dungeon Entry
**Role:** Frontend
**Description:** Create a route guard or middleware that intercepts navigation to the dungeon entry page (`/dungeon/[id]`). 
**Acceptance Criteria:**
- **Given** an unauthenticated user attempts to enter a dungeon,
- **When** the route is requested,
- **Then** they are redirected to `/sign-in` with `?redirect=/dungeon/[id]`.
- **Given** an authenticated user with 0 characters attempts to enter,
- **When** the route is requested,
- **Then** they are redirected to `/create-character` with `?redirect=/dungeon/[id]`.

### DND-002: Update Sign-In Flow to Support Redirect Parameter
**Role:** Frontend
**Description:** Update the existing Sign-In formulation to respect the `redirect` query parameter.
**Acceptance Criteria:**
- **Given** a user successfully signs in,
- **When** the `redirect` parameter is present in the URL,
- **Then** the application pushes the user to the parsed redirect relative URL rather than the default dashboard.

### DND-003: Update Character Creation Flow to Support Redirect Parameter
**Role:** Frontend
**Description:** Update the Character Creation form submission to respect the `redirect` query parameter.
**Acceptance Criteria:**
- **Given** a user successfully creates their first character,
- **When** the `redirect` parameter is present in the URL,
- **Then** the application pushes the user to the parsed redirect relative URL rather than the default dashboard.

### DND-004: Add Onboarding Analytics Tracking
**Role:** Frontend
**Description:** Fire telemetry events during the dungeon onboarding flow.
**Acceptance Criteria:**
- Fire `dungeon_entry_attempt` when the interceptor runs.
- Fire `onboarding_redirect` when a redirect to sign-in or create-character happens.
- Fire `onboarding_resume_dungeon` when the redirect logic successfully lands the user back on the dungeon page.

## Dependencies
- DND-002 and DND-003 can be done in parallel.
- DND-001 depends on DND-002 and DND-003 being ready for a seamless test flow.
- DND-004 should be implemented alongside DND-001.
