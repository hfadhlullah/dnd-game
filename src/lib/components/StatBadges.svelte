<script lang="ts">
  import type { PlayerStats } from '$lib/engine';

  let { stats }: { stats: PlayerStats } = $props();

  const statConfig = [
    { key: 'str' as const, label: 'STR', icon: '/icons/1.png' },
    { key: 'dex' as const, label: 'DEX', icon: '/icons/2.png' },
    { key: 'int' as const, label: 'INT', icon: '/icons/3.png' },
    { key: 'cha' as const, label: 'CHA', icon: '/icons/36.png' },
  ];

  function hasValue(val: number) { return val !== 0; }
  function noValue(val: number) { return val === 0; }
</script>

<div class="flex gap-2 flex-wrap justify-center">
  {#each statConfig as stat}
    {@const active = hasValue(stats[stat.key])}
    {@const inactive = noValue(stats[stat.key])}
    <div
      class="flex items-center gap-1.5 px-2.5 py-1 bg-dungeon-light/80 rounded border text-xs font-mono uppercase tracking-wider {active ? 'border-gold/40 text-gold' : 'border-dungeon-border text-parchment/40'}"
    > 
      <img src={stat.icon} alt={stat.label} class="w-4 h-4 object-contain" class:grayscale={inactive} />
      <span>{stat.label}</span>
      <span class="font-bold">{stats[stat.key]}</span>
    </div>
  {/each}
</div>
