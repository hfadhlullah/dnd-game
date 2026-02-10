import pkg from '@clerk/clerk-js';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

const { Clerk } = pkg;

export const clerk = typeof window !== 'undefined' ? new Clerk(PUBLIC_CLERK_PUBLISHABLE_KEY) : null;

export async function initClerk() {
  if (!clerk) return;
  try {
    await clerk.load();
  } catch (e) {
    console.error("Clerk load failed:", e);
  }
}
