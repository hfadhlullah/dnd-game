<script lang="ts">
  import { page } from '$app/state';
  import StatBadges from '$lib/components/StatBadges.svelte';

  const params = $derived(page.url.searchParams);

  const title = $derived(params.get('title') || 'The Unknown');
  const description = $derived(params.get('desc') || 'Your fate remains a mystery.');
  const rarity = $derived((params.get('rarity') || 'COMMON') as 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY');
  const outcome = $derived((params.get('outcome') || 'LOSS') as 'WIN' | 'LOSS');
  const hp = $derived(Number(params.get('hp') || 0));
  const maxHp = $derived(Number(params.get('maxHp') || 10));
  const killedBy = $derived(params.get('killedBy') || undefined);
  const stats = $derived({
    str: Number(params.get('str') || 0),
    dex: Number(params.get('dex') || 0),
    int: Number(params.get('int') || 0),
    cha: Number(params.get('cha') || 0),
  });

  const rarityConfig = $derived({
    COMMON: { color: 'text-gray-400', border: 'border-gray-500/40', glow: '', bg: 'bg-gray-500/5', label: '⬜ Common' },
    RARE: { color: 'text-blue-400', border: 'border-blue-500/40', glow: 'shadow-[0_0_30px_rgba(59,130,246,0.15)]', bg: 'bg-blue-500/5', label: '🟦 Rare' },
    EPIC: { color: 'text-purple-400', border: 'border-purple-500/40', glow: 'shadow-[0_0_30px_rgba(168,85,247,0.2)]', bg: 'bg-purple-500/5', label: '🟪 Epic' },
    LEGENDARY: { color: 'text-gold', border: 'border-gold/50', glow: 'shadow-[0_0_40px_rgba(255,215,0,0.25)]', bg: 'bg-gold/5', label: '🟨 Legendary' },
  }[rarity]);

  let shareCardRef: HTMLDivElement;
  let isSharing = $state(false);

  async function shareResult() {
    isSharing = true;

    try {
      // Try native Web Share API first (mobile)
      if (navigator.share) {
        await navigator.share({
          title: `One-Minute Dungeon: ${title}`,
          text: `I got "${title}" (${rarity}) in One-Minute Dungeon! ${outcome === 'WIN' ? '🏆' : '💀'}`,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `One-Minute Dungeon Result:\n"${title}" · ${rarity}\n${outcome === 'WIN' ? 'Victory!' : 'Defeated!'}\nHP: ${hp}/${maxHp}\n\nPlay: ${window.location.origin}`
        );
        alert('Result copied to clipboard! 📋');
      }
    } catch (e) {
      // User cancelled share
    }
    isSharing = false;
  }

  function playAgain() {
    window.location.href = '/dungeon';
  }
</script>

<svelte:head>
  <title>{title} · One-Minute Dungeon</title>
  <meta name="description" content="{description}" />
</svelte:head>

<div class="min-h-dvh flex flex-col items-center justify-center px-4 py-8 max-w-lg mx-auto">
  <!-- Share Card Preview -->
  <div
    bind:this={shareCardRef}
    class="w-full rounded-2xl border-2 {rarityConfig.border} {rarityConfig.bg} {rarityConfig.glow} p-8 mb-8 animate-card-appear"
  >
    <!-- Outcome Badge -->
    <div class="text-center mb-6">
      {#if outcome === 'WIN'}
        <img src="/icons/8.png" alt="Victory" class="w-16 h-16 mx-auto object-contain" />
      {:else}
        <img src="/icons/4.png" alt="Defeat" class="w-16 h-16 mx-auto object-contain grayscale" />
      {/if}
    </div>

    <!-- Title -->
    <h1 class="font-display text-3xl md:text-4xl font-black text-center {rarityConfig.color} mb-2 leading-tight">
      "{title}"
    </h1>

    <!-- Rarity Badge -->
    <div class="text-center mb-6">
      <span class="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest {rarityConfig.color} border {rarityConfig.border}">
        {rarityConfig.label}
      </span>
    </div>

    <!-- Description -->
    <p class="text-parchment/60 text-center text-sm leading-relaxed mb-6">
      {description}
    </p>

    <!-- Stats -->
    <div class="mb-4">
      <StatBadges {stats} />
    </div>

    <!-- HP -->
    <div class="text-center font-mono text-sm {outcome === 'WIN' ? 'text-green-400' : 'text-blood'}">
      HP: {hp}/{maxHp}
    </div>

    <!-- Killed By -->
    {#if killedBy}
      <div class="text-center mt-2 text-xs text-parchment/30 font-mono">
        ☠️ {killedBy}
      </div>
    {/if}

    <!-- Logo -->
    <div class="mt-6 pt-4 border-t border-parchment/10 text-center">
      <span class="font-display text-xs text-parchment/20 uppercase tracking-[0.2em]">
        One-Minute Dungeon
      </span>
    </div>
  </div>

  <!-- Actions -->
  <div class="w-full space-y-3">
    <button
      onclick={shareResult}
      disabled={isSharing}
      class="w-full p-4 border-2 border-gold/50 rounded-xl bg-gold/5
             text-gold font-display text-lg font-bold uppercase tracking-wider
             transition-all duration-200 cursor-pointer
             hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]
             active:translate-y-1
             disabled:opacity-50"
    >
      {isSharing ? '⏳ Sharing...' : '📤 Share Your Fate'}
    </button>

    <button
      onclick={playAgain}
      class="w-full p-4 border-2 border-parchment/20 rounded-xl
             text-parchment/60 font-display text-lg font-bold uppercase tracking-wider
             transition-all duration-200 cursor-pointer
             hover:border-parchment/40 hover:text-parchment
             active:translate-y-1"
    >
      <div class="flex items-center justify-center gap-2">
        <img src="/icons/8.png" alt="" class="w-5 h-5 object-contain" />
        <span>Play Again</span>
      </div>
    </button>

    <a
      href="/"
      class="block w-full p-2 text-center
             text-parchment/30 text-sm font-mono
             transition-colors hover:text-parchment/60"
    >
      ← Back to Title
    </a>
    <a
      href="/leaderboard"
      class="block w-full p-2 text-center
             text-gold/40 text-xs font-mono uppercase tracking-widest
             transition-colors hover:text-gold"
    >
      📜 View Hall of Fate
    </a>
  </div>
</div>

<style>
  @keyframes card-appear {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  .animate-card-appear {
    animation: card-appear 0.8s ease-out;
  }
</style>
