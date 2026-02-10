<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { initUser, syncWithClerk } from '$lib/user.svelte';
  import { initClerk } from '$lib/clerk';

  let { children } = $props();

  onMount(async () => {
    // Initialize Clerk first
    await initClerk();
    // Sync user state (handles both guest and logged in)
    syncWithClerk();
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap"
    rel="stylesheet"
  />
  <title>One-Minute Dungeon</title>
  <meta name="description" content="A 60-second micro-adventure. Make choices. Roll dice. Get a title. Share your fate." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#1a1a1a" />
</svelte:head>

{@render children()}
