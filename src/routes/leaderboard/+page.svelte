<script lang="ts">
  import { convex } from '$lib/convex-client';
  import { api } from '$convex/_generated/api';
  import { onMount } from 'svelte';

  let runs = $state<any[]>([]);
  let isLoading = $state(true);

  onMount(async () => {
    try {
      runs = await convex.query(api.runs.getLeaderboard, {});
    } catch (e) {
      console.error("Failed to fetch leaderboard:", e);
    } finally {
      isLoading = false;
    }
  });

  const rarityColors: Record<string, string> = {
    COMMON: 'text-gray-400',
    RARE: 'text-blue-400',
    EPIC: 'text-purple-400',
    LEGENDARY: 'text-gold'
  };
</script>

<div class="min-h-dvh flex flex-col p-6 max-w-2xl mx-auto">
  <div class="mb-10 text-center">
    <h1 class="font-display text-4xl md:text-5xl font-black text-parchment uppercase tracking-tighter">
      Hall of Fate
    </h1>
    <p class="text-parchment/40 font-mono text-sm mt-2">
      The legends who braved the one-minute dungeon
    </p>
  </div>

  {#if isLoading}
    <div class="flex-1 flex items-center justify-center">
      <div class="animate-pulse text-gold font-display text-xl">Loading Legends...</div>
    </div>
  {:else if runs.length === 0}
    <div class="flex-1 flex flex-col items-center justify-center text-center space-y-4">
      <div class="text-6xl grayscale opacity-30">🛡️</div>
      <p class="text-parchment/40 font-mono">No heroes have left their mark yet.</p>
      <a href="/dungeon" class="text-gold hover:underline">Be the first!</a>
    </div>
  {:else}
    <div class="space-y-4 flex-1">
      {#each runs as run, i}
        <div class="group relative bg-dungeon-light/40 border border-parchment/10 rounded-xl p-4 transition-all hover:border-gold/30 hover:bg-dungeon-light/60">
          <div class="flex items-center gap-4">
            <div class="w-8 font-mono text-xl font-bold {i < 3 ? 'text-gold' : 'text-parchment/20'}">
              #{i + 1}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-display text-lg text-parchment truncate font-bold">{run.userName}</span>
                <span class="px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono uppercase tracking-widest {rarityColors[run.rarity] || 'text-gray-400'} border border-current opacity-60">
                  {run.rarity}
                </span>
              </div>
              <div class="font-display text-sm {run.outcome === 'WIN' ? 'text-green-400/80' : 'text-blood/80'} italic truncate">
                "{run.endingTitle}"
              </div>
            </div>
            <div class="text-right">
              <div class="font-mono text-xs text-parchment/30 uppercase">HP</div>
              <div class="font-mono font-bold {run.finalHp > 0 ? 'text-green-400' : 'text-blood'}">
                {run.finalHp}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <div class="mt-12 text-center pb-6">
    <a href="/" class="p-4 border-2 border-parchment/20 rounded-xl text-parchment/60 font-display text-lg font-bold uppercase tracking-wider transition-all hover:border-parchment/40 hover:text-parchment">
      Back to Title
    </a>
  </div>
</div>
