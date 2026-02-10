import { convex } from './convex-client';
import { api } from '$convex/_generated/api';
import type { Id } from '$convex/_generated/dataModel';
import { clerk } from './clerk';

export const userState = $state({
  userId: null as Id<"users"> | null,
  isLoaded: false,
  clerkUser: null as any
});

export async function initUser(clerkId?: string, name: string = "Mysterious Hero") {
  try {
    const id = await convex.mutation(api.users.getOrCreateUser, {
      clerkId,
      name,
      isGuest: !clerkId,
    });
    userState.userId = id;
    userState.isLoaded = true;
    return id;
  } catch (error) {
    console.error("Failed to init user:", error);
    return null;
  }
}

export function syncWithClerk() {
  if (!clerk) return;
  
  // Set initial state
  userState.clerkUser = clerk.user;
  if (clerk.user) {
    initUser(clerk.user.id, clerk.user.fullName || clerk.user.username || "Authenticated Hero");
  } else {
    initUser(undefined, "Guest Hero");
  }

  // Watch for changes
  clerk.addListener((state) => {
    userState.clerkUser = state.user;
    if (state.user) {
      initUser(state.user.id, state.user.fullName || state.user.username || "Authenticated Hero");
    }
  });
}
