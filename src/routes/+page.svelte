<script lang="ts">
  import { userState } from '$lib/user.svelte';
  import { clerk } from '$lib/clerk';

  let isEntering = $state(false);

  function enterDungeon() {
    isEntering = true;
    // Will navigate to /dungeon once logic is wired
    setTimeout(() => {
      window.location.href = '/dungeon';
    }, 600);
  }
</script>

<div class="min-h-dvh flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
  <!-- Ambient particles -->
  <div class="absolute inset-0 pointer-events-none">
    {#each Array(20) as _, i}
      <div
        class="absolute w-1 h-1 bg-gold/30 rounded-full animate-float"
        style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 5}s; animation-duration: {3 + Math.random() * 4}s;"
      ></div>
    {/each}
  </div>

  <!-- Logo / Title -->
  <div class="relative z-10 mb-12" class:scale-95={isEntering} class:opacity-0={isEntering} style="transition: all 0.5s ease">
    <div class="flex justify-center gap-4 text-gold/60 text-sm font-mono uppercase tracking-[0.3em] mb-4">
      <img src="/icons/8.png" alt="" class="w-6 h-6 object-contain" />
      <span>A Micro-Adventure</span>
      <img src="/icons/8.png" alt="" class="w-6 h-6 object-contain" />
    </div>
    <h1 class="font-display text-5xl md:text-7xl font-bold text-parchment leading-tight mb-2 drop-shadow-lg">
      One-Minute<br />Dungeon
    </h1>
    <div class="flex flex-col items-center gap-2 mt-4">
      {#if userState.clerkUser}
        <div class="flex items-center gap-2 px-3 py-1 rounded bg-gold/5 border border-gold/20">
          <img src={userState.clerkUser.imageUrl} alt="" class="w-5 h-5 rounded-full" />
          <span class="text-gold font-mono text-xs uppercase tracking-wider">{userState.clerkUser.firstName}</span>
          <button onclick={() => clerk?.signOut()} class="text-parchment/30 hover:text-blood text-[10px] font-mono uppercase ml-2 transition-colors cursor-pointer">Sign Out</button>
        </div>
      {:else}
        <button onclick={() => clerk?.openSignIn()} class="text-parchment/40 hover:text-gold text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer border-b border-transparent hover:border-gold/30">
          Sign In to Save Progress
        </button>
      {/if}
      <p class="text-parchment/40 text-sm md:text-base max-w-md mx-auto mt-2 italic font-sans px-4">
        3 choices. 60 seconds. One fate.
      </p>
    </div>
  </div>

  <!-- Enter Button -->
  <button
    onclick={enterDungeon}
    disabled={isEntering}
    class="relative z-10 group cursor-pointer"
  >
    <div
      class="px-12 py-5 border-2 border-gold/60 rounded-lg bg-dungeon-light/80 backdrop-blur-sm
             text-gold font-display text-2xl font-bold uppercase tracking-wider
             transition-all duration-300
             hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]
             active:translate-y-1 active:shadow-none
             disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {#if isEntering}
        <span class="animate-pulse">Entering...</span>
      {:else}
        <div class="flex items-center gap-3">
          <img src="/icons/8.png" alt="" class="w-8 h-8 object-contain transition-transform group-hover:rotate-12" />
          <span>Enter Dungeon</span>
        </div>
      {/if}
    </div>
    <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-parchment/30 text-xs font-mono">
      ~ 60 seconds ~
    </div>
  </button>

  <!-- Footer -->
  <div class="absolute bottom-16 flex flex-col items-center gap-4">
    <a href="/leaderboard" class="font-display text-gold/40 hover:text-gold text-xs uppercase tracking-widest transition-colors">
      📜 View Hall of Fate
    </a>
  </div>

  <div class="absolute bottom-6 text-parchment/20 text-xs font-mono">
    v0.1 · Made with <img src="/icons/33.png" alt="fish" class="w-3 h-3 inline-block align-middle" /> and <img src="/icons/31.png" alt="carrot" class="w-3 h-3 inline-block align-middle" />
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
