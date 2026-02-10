import * as ClerkModule from '@clerk/clerk-js';
import { env } from '$env/dynamic/public';

const Clerk = (ClerkModule as any).Clerk || (ClerkModule as any).default;

export const clerk = typeof window !== 'undefined' && env.PUBLIC_CLERK_PUBLISHABLE_KEY 
  ? new Clerk(env.PUBLIC_CLERK_PUBLISHABLE_KEY) 
  : null;

export let isClerkLoaded = false;

export async function initClerk() {
  if (!clerk || isClerkLoaded) return;
  try {
    await clerk.load();
    isClerkLoaded = true;
  } catch (e) {
    console.error("Clerk load failed:", e);
  }
}
