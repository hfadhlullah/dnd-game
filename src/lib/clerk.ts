import { Clerk } from '@clerk/clerk-js';
import { env } from '$env/dynamic/public';

export const clerk = typeof window !== 'undefined' && env.PUBLIC_CLERK_PUBLISHABLE_KEY 
  ? new Clerk(env.PUBLIC_CLERK_PUBLISHABLE_KEY) 
  : null;

export async function initClerk() {
  if (!clerk) return;
  try {
    await clerk.load();
  } catch (e) {
    console.error("Clerk load failed:", e);
  }
}
