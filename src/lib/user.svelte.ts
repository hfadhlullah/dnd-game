import { convex } from './convex-client';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

export const userState = $state({
  userId: null as Id<"users"> | null,
  isLoaded: false
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
