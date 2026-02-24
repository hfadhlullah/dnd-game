# API Contract: Character Creation Before Entering Dungeon

## Overview
This feature primarily deals with frontend routing and state logic. However, it relies on two existing backend contexts:
1. Identifying if the current session is authenticated.
2. Identifying if the authenticated user has any active characters.

No **new** API endpoints are strictly required if the application already fetches the user's profile and character list upon authentication or initial load. This document outlines the expected behavior of the existing APIs that support this feature.

## Expected Existing Endpoints

### 1. Check Authentication Status
- **Method:** `GET`
- **Typical Path:** `/api/auth/session` or `/api/user/me`
- **Purpose:** Determine if the user is currently logged in.
- **Expected Response (Success):** Ensure it returns a `200 OK` with user context.
- **Expected Response (Unauthorized):** Ensure it returns a `401 Unauthorized` or null session if not logged in.

### 2. Fetch User Characters
- **Method:** `GET`
- **Typical Path:** `/api/characters` or `/api/user/characters`
- **Purpose:** Retrieve the list of characters owned by the authenticated user.
- **Expected Response (Success):**
  ```json
  {
    "data": [
      {
        "id": "char_123",
        "name": "Thorin",
        "level": 5
      }
    ]
  }
  ```
- **Logic Condition:** The frontend will evaluate `data.length > 0`. If `false`, the user is redirected to the character creation flow.

## New Endpoints
**None.** The routing logic will rely on the responses from the existing authentication and character management endpoints.
