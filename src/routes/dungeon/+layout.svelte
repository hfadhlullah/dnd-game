<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { goto } from '$app/navigation';
  import { userState } from '$lib/user.svelte';
  import { page } from '$app/state';
  import { getActiveCharacter } from '$lib/character-store';

  let { children } = $props();
  let checked = $state(false);

  onMount(async () => {
    // Wait for user state to load
    const checkState = async () => {
      if (!userState.isLoaded) {
        setTimeout(checkState, 50);
        return;
      }
      
      // Feature DND-001: Routing Interceptor
      
      // 1. Unauthenticated check (for this game, if it's a guest)
      // If we want to strictly require real accounts:
      const isActuallySignedIn = !!userState.clerkUser;
      
      // Feature DND-004: Analytics Tracking
      // Fire dungeon_entry_attempt when interceptor runs
      const currentPath = window.location.pathname;
      console.log("[Analytics] dungeon_entry_attempt", { authenticated: isActuallySignedIn, has_character: true, dungeon_id: currentPath });

      if (!isActuallySignedIn) {
        console.log("[Analytics] onboarding_redirect", { reason: "unauthenticated", dungeon_id: currentPath });
        await goto(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      // DND-003: Character check — redirect to selection screen if no active character
      const uid = userState.clerkUser?.id;
      const hasActiveCharacter = uid ? !!getActiveCharacter(uid) : false;

      if (!hasActiveCharacter) {
        console.log("[Analytics] onboarding_redirect", { reason: "no_character", dungeon_id: currentPath });
        await goto(`/select-character?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      // If we made it here, and the URL has a redirect param, it means we just resumed.
      // But we are ALREADY on the requested path, so we can track the resume if they just logged in 
      // in this session, though typically resume is tracked at the login component.
      
      checked = true;
    };
    
    checkState();
  });
</script>

{#if checked}
  {@render children()}
{/if}
