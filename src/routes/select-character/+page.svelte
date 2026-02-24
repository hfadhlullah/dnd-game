<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { userState } from '$lib/user.svelte';
  import { getCharacters, setActiveCharacter, deleteCharacter as removeCharacter, type Character } from '$lib/character-store';

  let url = $derived(page.url);
  let redirectUrl = $derived(url.searchParams.get('redirect') || '/dungeon');

  const CLASS_ICONS: Record<string, string> = {
    warrior: '/icons/1.png',
    rogue: '/icons/6.png',
    mage: '/icons/7.png',
    bard: '/icons/4.png',
  };

  const CLASS_COLORS: Record<string, string> = {
    warrior: 'border-red-500/50 hover:border-red-400',
    rogue: 'border-emerald-500/50 hover:border-emerald-400',
    mage: 'border-blue-500/50 hover:border-blue-400',
    bard: 'border-purple-500/50 hover:border-purple-400',
  };

  const STAT_LABELS = { str: 'STR', dex: 'DEX', int: 'INT', cha: 'CHA' };

  let characters = $state<Character[]>([]);

  // Reload characters whenever the clerk user resolves
  $effect(() => {
    const uid = userState.clerkUser?.id;
    if (!uid) { characters = []; return; }
    characters = getCharacters(uid);
  });

  function selectCharacter(char: Character) {
    const uid = userState.clerkUser?.id;
    if (!uid) return;
    setActiveCharacter(uid, char);
    goto(redirectUrl);
  }

  function handleDelete(id: string) {
    const uid = userState.clerkUser?.id;
    if (!uid) return;
    removeCharacter(uid, id);
    characters = getCharacters(uid);
  }
</script>

<div class="min-h-dvh flex flex-col items-center justify-center px-4 py-10 text-center relative overflow-hidden">
  <!-- Ambient particles -->
  <div class="absolute inset-0 pointer-events-none">
    {#each Array(20) as _, i}
      <div
        class="absolute w-1 h-1 bg-gold/30 rounded-full animate-float"
        style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 5}s; animation-duration: {3 + Math.random() * 4}s;"
      ></div>
    {/each}
  </div>

  <div class="relative z-10 w-full max-w-lg space-y-8">
    <!-- Header -->
    <div class="space-y-2">
      <div class="flex justify-center gap-4 text-gold/60 text-xs font-mono uppercase tracking-[0.3em]">
        <img src="/icons/8.png" alt="" class="w-5 h-5 object-contain" />
        <span>Who Enters?</span>
        <img src="/icons/8.png" alt="" class="w-5 h-5 object-contain" />
      </div>
      <h1 class="font-display text-4xl md:text-5xl font-bold text-parchment drop-shadow-lg">
        Choose Your Hero
      </h1>
      {#if userState.clerkUser}
        <p class="text-parchment/50 font-sans italic text-sm">Welcome back, {userState.clerkUser.firstName || 'Adventurer'}.</p>
      {/if}
    </div>

    <!-- Character List -->
    {#if characters.length > 0}
      <div class="space-y-3 text-left">
        {#each characters as char}
          <div class="flex items-center gap-3 p-4 rounded-xl border-2 bg-dungeon-dark/60 transition-all duration-200 {CLASS_COLORS[char.class] || 'border-parchment/20'}">
            <!-- Icon + Info -->
            <button
              onclick={() => selectCharacter(char)}
              class="flex items-center gap-3 flex-1 cursor-pointer text-left"
            >
              <img src={CLASS_ICONS[char.class] || '/icons/5.png'} alt={char.class} class="w-10 h-10 object-contain" />
              <div class="flex-1">
                <div class="font-display text-parchment font-bold uppercase tracking-wide">{char.name}</div>
                <div class="text-parchment/50 text-xs font-mono capitalize">{char.class}</div>
                <div class="flex gap-3 mt-1">
                  {#each Object.entries(char.stats) as [stat, val]}
                    <span class="text-gold/70 font-mono text-[10px]">{STAT_LABELS[stat as keyof typeof STAT_LABELS]} {val}</span>
                  {/each}
                </div>
              </div>
              <div class="text-gold/40 hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            <!-- Delete -->
            <button
              onclick={() => handleDelete(char.id)}
              class="text-parchment/20 hover:text-blood transition-colors p-1 cursor-pointer"
              title="Delete character"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        {/each}
      </div>
    {:else}
      <div class="py-8 text-parchment/30 font-sans italic text-sm">
        No heroes yet. Create your first character below.
      </div>
    {/if}

    <!-- Create New Character -->
    <a
      href="/create-character?redirect={encodeURIComponent('/select-character?redirect=' + encodeURIComponent(redirectUrl))}"
      class="block w-full py-4 border-2 border-gold/40 rounded-xl text-gold font-display text-lg font-bold uppercase tracking-wider
             transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]"
    >
      <div class="flex items-center justify-center gap-2">
        <span class="text-2xl leading-none">+</span>
        <span>Create New Hero</span>
      </div>
    </a>
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
