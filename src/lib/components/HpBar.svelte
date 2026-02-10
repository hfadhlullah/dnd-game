<script lang="ts">
  let { hp, maxHp }: { hp: number; maxHp: number } = $props();

  let percentage = $derived(Math.max(0, Math.min(100, (hp / maxHp) * 100)));
  let color = $derived(
    percentage > 60 ? 'bg-green-500' :
    percentage > 30 ? 'bg-yellow-500' :
    'bg-blood'
  );
  let glowColor = $derived(
    percentage > 60 ? 'shadow-green-500/30' :
    percentage > 30 ? 'shadow-yellow-500/30' :
    'shadow-blood/30'
  );
</script>

<div class="flex items-center gap-3">
  <img src="/icons/37.png" alt="HP" class="w-5 h-5 object-contain" />
  <div class="flex-1 h-3 bg-dungeon-light rounded-full overflow-hidden border border-dungeon-border">
    <div
      class="h-full rounded-full transition-all duration-500 ease-out shadow-lg {color} {glowColor}"
      style="width: {percentage}%;"
    ></div>
  </div>
  <span class="font-mono text-sm font-bold min-w-[3ch] text-right" class:text-blood={percentage <= 30} class:text-yellow-500={percentage > 30 && percentage <= 60} class:text-green-400={percentage > 60}>
    {hp}
  </span>
</div>
