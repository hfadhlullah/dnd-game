<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { clerk, clerkState } from '$lib/clerk.svelte';
  import { onMount } from 'svelte';

  let url = $derived(page.url);
  let redirectUrl = $derived(url.searchParams.get('redirect') || '/');

  onMount(() => {
    const doRedirect = () => {
      if (!clerkState.isLoaded || !clerk) {
        setTimeout(doRedirect, 100);
        return;
      }

      // If already signed in (e.g. returning from OAuth), go straight to destination
      if (clerk.user) {
        goto(redirectUrl, { replaceState: true });
        return;
      }

      // Redirect to Clerk's hosted sign-in page — avoids Turnstile loop in dev mode
      clerk.redirectToSignIn({
        redirectUrl: window.location.origin + redirectUrl,
      });
    };

    doRedirect();
  });
</script>

<div class="min-h-dvh flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
  <!-- Ambient particles (from homepage) -->
  <div class="absolute inset-0 pointer-events-none">
    {#each Array(20) as _, i}
      <div
        class="absolute w-1 h-1 bg-gold/30 rounded-full animate-float"
        style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 5}s; animation-duration: {3 + Math.random() * 4}s;"
      ></div>
    {/each}
  </div>

  <div class="relative z-10 mb-8">
    <div class="flex justify-center gap-4 text-gold/60 text-sm font-mono uppercase tracking-[0.3em] mb-4">
      <img src="/icons/8.png" alt="" class="w-6 h-6 object-contain" />
      <span>Identify Yourself</span>
      <img src="/icons/8.png" alt="" class="w-6 h-6 object-contain" />
    </div>
    <h1 class="font-display text-4xl md:text-5xl font-bold text-parchment leading-tight mb-2 drop-shadow-lg">
      Enter the Tavern
    </h1>
    <p class="text-parchment/70 font-sans italic">Sign in to claim your destiny.</p>
  </div>

  <!-- Redirect state -->
  <div class="relative z-10 flex flex-col items-center gap-3 text-parchment/40">
    <div class="w-8 h-8 border-2 border-gold/40 border-t-gold rounded-full animate-spin"></div>
    <span class="font-mono text-xs uppercase tracking-widest">Opening the gates...</span>
  </div>
</div>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
    50% { transform: translateY(-30px) scale(1.5); opacity: 0.8; }
  }
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
</style>
