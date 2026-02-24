<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { userState } from '$lib/user.svelte';
  import { saveCharacter, setActiveCharacter } from '$lib/character-store';

  let url = $derived(page.url);
  let redirectUrl = $derived(url.searchParams.get('redirect') || '/dungeon');

  const CLASSES = [
    {
      id: 'warrior',
      name: 'Warrior',
      icon: '/icons/1.png',
      tagline: 'Might over mind',
      stats: { str: 5, dex: 2, int: 1, cha: 2 },
      color: 'border-red-500/60 hover:border-red-400',
      activeColor: 'border-red-400 bg-red-900/30',
    },
    {
      id: 'rogue',
      name: 'Rogue',
      icon: '/icons/6.png',
      tagline: 'Swift and silent',
      stats: { str: 2, dex: 5, int: 2, cha: 1 },
      color: 'border-emerald-500/60 hover:border-emerald-400',
      activeColor: 'border-emerald-400 bg-emerald-900/30',
    },
    {
      id: 'mage',
      name: 'Mage',
      icon: '/icons/7.png',
      tagline: 'Power of the arcane',
      stats: { str: 1, dex: 2, int: 5, cha: 2 },
      color: 'border-blue-500/60 hover:border-blue-400',
      activeColor: 'border-blue-400 bg-blue-900/30',
    },
    {
      id: 'bard',
      name: 'Bard',
      icon: '/icons/4.png',
      tagline: 'Words sharper than steel',
      stats: { str: 2, dex: 1, int: 2, cha: 5 },
      color: 'border-purple-500/60 hover:border-purple-400',
      activeColor: 'border-purple-400 bg-purple-900/30',
    },
  ] as const;

  const STAT_LABELS = { str: 'Strength', dex: 'Dexterity', int: 'Intellect', cha: 'Charisma' };
  const STAT_ICONS = { str: '/icons/2.png', dex: '/icons/3.png', int: '/icons/10.png', cha: '/icons/11.png' };

  let name = $state('');
  let selectedClass = $state<typeof CLASSES[number] | null>(null);
  let isEntering = $state(false);

  let canEnter = $derived(name.trim().length > 1 && selectedClass !== null);

  function selectClass(cls: typeof CLASSES[number]) {
    selectedClass = cls;
  }

  function handleEnter() {
    if (!canEnter || !selectedClass) return;
    const uid = userState.clerkUser?.id;
    if (!uid) return;
    isEntering = true;

    const character = {
      id: Date.now().toString(36),
      name: name.trim(),
      class: selectedClass.id,
      stats: selectedClass.stats,
    };

    saveCharacter(uid, character);
    setActiveCharacter(uid, character);

    setTimeout(() => goto(redirectUrl), 600);
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
        <img src="/icons/5.png" alt="" class="w-5 h-5 object-contain" />
        <span>A Hero Arises</span>
        <img src="/icons/5.png" alt="" class="w-5 h-5 object-contain" />
      </div>
      <h1 class="font-display text-4xl md:text-5xl font-bold text-parchment drop-shadow-lg">
        Create Your Hero
      </h1>
      <p class="text-parchment/50 font-sans italic text-sm">
        {#if userState.clerkUser}
          Welcome, {userState.clerkUser.firstName || 'Adventurer'}. Choose your fate.
        {:else}
          Name your hero and choose your calling.
        {/if}
      </p>
    </div>

    <!-- Name Input -->
    <div class="text-left space-y-1">
      <label for="hero-name" class="text-gold/70 font-mono text-xs uppercase tracking-widest">Hero Name</label>
      <input
        id="hero-name"
        type="text"
        bind:value={name}
        maxlength="24"
        placeholder="e.g. Gorrak the Bold"
        class="w-full px-4 py-3 bg-dungeon-dark/80 border-2 border-parchment/20 rounded-lg
               text-parchment font-sans placeholder:text-parchment/30
               focus:outline-none focus:border-gold/50 transition-colors"
      />
    </div>

    <!-- Class Selection -->
    <div class="space-y-3 text-left">
      <p class="text-gold/70 font-mono text-xs uppercase tracking-widest">Choose Your Class</p>
      <div class="grid grid-cols-2 gap-3">
        {#each CLASSES as cls}
          {@const isSelected = selectedClass?.id === cls.id}
          <button
            onclick={() => selectClass(cls)}
            class="p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer
                   {isSelected ? cls.activeColor : cls.color + ' bg-dungeon-dark/60'}"
          >
            <div class="flex items-center gap-2 mb-2">
              <img src={cls.icon} alt={cls.name} class="w-7 h-7 object-contain" />
              <span class="font-display text-parchment text-base font-bold uppercase tracking-wide">{cls.name}</span>
            </div>
            <p class="text-parchment/50 font-sans text-xs italic mb-3">{cls.tagline}</p>
            <div class="grid grid-cols-2 gap-x-3 gap-y-1">
              {#each Object.entries(cls.stats) as [stat, val]}
                <div class="flex items-center gap-1">
                  <img src={STAT_ICONS[stat as keyof typeof STAT_ICONS]} alt={stat} class="w-3 h-3 object-contain opacity-60" />
                  <span class="text-parchment/40 font-mono text-[10px] uppercase">{stat}</span>
                  <span class="font-mono text-xs text-gold/80 ml-auto">+{val}</span>
                </div>
              {/each}
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Stat Preview -->
    {#if selectedClass}
      <div class="rounded-xl border border-gold/20 bg-dungeon-dark/50 px-5 py-4 space-y-2 text-left">
        <p class="text-gold/60 font-mono text-xs uppercase tracking-widest mb-3">Starting Stats — {selectedClass.name}</p>
        <div class="grid grid-cols-2 gap-2">
          {#each Object.entries(selectedClass.stats) as [stat, val]}
            <div class="flex items-center gap-2">
              <img src={STAT_ICONS[stat as keyof typeof STAT_ICONS]} alt={stat} class="w-4 h-4 object-contain" />
              <span class="text-parchment/60 font-sans text-sm">{STAT_LABELS[stat as keyof typeof STAT_LABELS]}</span>
              <span class="font-mono text-gold ml-auto">+{val}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Enter Button -->
    <button
      onclick={handleEnter}
      disabled={!canEnter || isEntering}
      class="w-full py-4 border-2 border-gold/60 rounded-xl bg-dungeon-light/80 backdrop-blur-sm
             text-gold font-display text-xl font-bold uppercase tracking-wider
             transition-all duration-300
             hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]
             active:translate-y-1 active:shadow-none
             disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {#if isEntering}
        <span class="animate-pulse">Entering the Dungeon...</span>
      {:else if !name.trim()}
        Name Your Hero First
      {:else if !selectedClass}
        Choose a Class
      {:else}
        <div class="flex items-center justify-center gap-3">
          <img src="/icons/8.png" alt="" class="w-6 h-6 object-contain" />
          <span>Enter as {name.trim()}, the {selectedClass.name}</span>
        </div>
      {/if}
    </button>
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

