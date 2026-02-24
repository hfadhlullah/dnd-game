import * as ClerkModule from '@clerk/clerk-js';
import { env } from '$env/dynamic/public';

const Clerk = (ClerkModule as any).Clerk || (ClerkModule as any).default;

export const clerk = typeof window !== 'undefined' && env.PUBLIC_CLERK_PUBLISHABLE_KEY 
  ? new Clerk(env.PUBLIC_CLERK_PUBLISHABLE_KEY) 
  : null;

// Make this reactive for Svelte 5
export const clerkState = $state({
  isLoaded: false
});

export async function initClerk() {
  if (!clerk || clerkState.isLoaded) return;
  try {
    await clerk.load();
    clerkState.isLoaded = true;
  } catch (e) {
    console.error("Clerk load failed:", e);
  }
}
