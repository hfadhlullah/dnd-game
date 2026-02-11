<script lang="ts">
  import { createNewGame, resolveChoice, advanceToNextNode, generateEnding, type GameState } from '$lib/engine';
  import DiceRoller from '$lib/components/DiceRoller.svelte';
  import HpBar from '$lib/components/HpBar.svelte';
  import StatBadges from '$lib/components/StatBadges.svelte';
  import { goto } from '$app/navigation';
  import { userState } from '$lib/user.svelte';
  import { convex } from '$lib/convex-client';
  import { api } from '$convex/api';
  import { soundManager } from '$lib/sound';

  let game = $state<GameState>(createNewGame());
  let showDice = $state(false);
  let pendingRoll = $state<{ value: number; outcome: 'SUCCESS' | 'FAIL'; stat: string } | null>(null);
  let isTransitioning = $state(false);
  let damageFlash = $state(false);

  function ensureAudio() {
    soundManager.init();
    soundManager.resume();
  }

  function handleChoice(choiceIndex: 0 | 1) {
    if (game.phase !== 'ENCOUNTER' || isTransitioning) return;
    ensureAudio();
    soundManager.playClick();

    // Resolve the choice (calculates roll + outcome)
    const result = resolveChoice(game, choiceIndex);
    const choice = game.currentEncounter!.choices[choiceIndex];

    pendingRoll = {
      value: result.lastRoll!,
      outcome: result.lastOutcome!,
      stat: choice.stat,
    };
    showDice = true;

    // Store the result to apply after dice animation
    game = { ...game, phase: 'ROLLING' };

    // The result will be applied when dice animation completes
    (window as any).__pendingResult = result;
  }

  function onDiceComplete() {
    showDice = false;
    const result = (window as any).__pendingResult as GameState;
    game = result;

    // Audio Feedback
    if (game.lastOutcome === 'SUCCESS') {
      if (pendingRoll?.stat === 'str') {
        soundManager.playHit(); // Heavy impact for STR success
      } else {
        soundManager.playSuccess(); // Chime for other successes
      }
    } else if (game.lastOutcome === 'FAIL' && game.lastDamage > 0) {
      soundManager.playDamage();
    }

    // Flash damage
    if (game.lastOutcome === 'FAIL' && game.lastDamage > 0) {
      damageFlash = true;
      setTimeout(() => { damageFlash = false; }, 500);
    }

    // Check if dead
    if (game.phase === 'DEAD') {
      const ending = generateEnding(game);
      saveRun(ending);
      setTimeout(() => {
        goto(`/result?title=${encodeURIComponent(ending.title)}&desc=${encodeURIComponent(ending.description)}&rarity=${ending.rarity}&outcome=${ending.outcome}&hp=${game.hp}&maxHp=${game.maxHp}&str=${game.stats.str}&dex=${game.stats.dex}&int=${game.stats.int}&cha=${game.stats.cha}&killedBy=${encodeURIComponent(ending.killedBy || '')}`);
      }, 1500);
    }
  }

  async function saveRun(ending: any) {
    if (!userState.userId) return;
    
    try {
      await convex.mutation(api.runs.create, {
        userId: userState.userId,
        outcome: ending.outcome,
        finalHp: game.hp,
        endingTitle: ending.title,
        endingDescription: ending.description,
        snapshot: game.stats,
        rarity: ending.rarity,
        seed: game.seed,
        killedBy: ending.killedBy ?? undefined,
      });
    } catch (e) {
      console.error("Failed to save run:", e);
    }
  }

  function handleContinue() {
    if (game.phase !== 'RESULT') return;
    ensureAudio();
    soundManager.playClick();
    isTransitioning = true;

    setTimeout(() => {
      game = advanceToNextNode(game);
      isTransitioning = false;

      // Check victory
      if (game.phase === 'VICTORY') {
        const ending = generateEnding(game);
        saveRun(ending);
        setTimeout(() => {
          goto(`/result?title=${encodeURIComponent(ending.title)}&desc=${encodeURIComponent(ending.description)}&rarity=${ending.rarity}&outcome=${ending.outcome}&hp=${game.hp}&maxHp=${game.maxHp}&str=${game.stats.str}&dex=${game.stats.dex}&int=${game.stats.int}&cha=${game.stats.cha}`);
        }, 800);
      }
    }, 300);
  }

  let nodeProgress = $derived(`${game.nodeIndex + 1} / ${game.totalNodes}`);
</script>

<!-- Screen shake on damage -->
<div
  class="min-h-dvh flex flex-col px-4 py-6 max-w-lg mx-auto"
  class:animate-shake={damageFlash}
>
  <!-- Header: Node Progress + HP -->
  <div class="space-y-3 mb-8">
    <div class="flex items-center justify-between">
      <span class="flex items-center gap-1.5 font-mono text-xs text-parchment/40 uppercase tracking-widest">
        <img src="/icons/5.png" alt="" class="w-3 h-3 object-contain" /> Node {nodeProgress}
      </span>
      <span class="font-mono text-xs text-parchment/40">
        Seed: {game.seed}
      </span>
    </div>
    <HpBar hp={game.hp} maxHp={game.maxHp} />
    <StatBadges stats={game.stats} />
  </div>

  <!-- Encounter Area -->
  <div class="flex-1 flex flex-col justify-center">
    {#if game.phase === 'ENCOUNTER' || game.phase === 'ROLLING'}
      <!-- Encounter Text -->
      <div class="mb-10 text-center" class:opacity-50={game.phase === 'ROLLING'}>
        {#if game.currentEncounter?.image}
          <div class="mb-6 flex justify-center">
            <img 
              src={game.currentEncounter.image} 
              alt="Encounter" 
              class="rounded-xl border-4 border-parchment/20 shadow-lg max-h-64 object-cover"
            />
          </div>
        {/if}
        <p class="text-parchment text-lg md:text-xl leading-relaxed font-sans">
          {game.currentEncounter?.text}
        </p>
      </div>

      <!-- Choice Buttons -->
      <div class="space-y-4">
        {#each game.currentEncounter?.choices ?? [] as choice, i}
          <button
            onclick={() => handleChoice(i as 0 | 1)}
            disabled={game.phase === 'ROLLING'}
            class="w-full p-5 border-2 border-parchment/20 rounded-xl bg-dungeon-light/60
                   text-parchment font-display text-lg font-bold uppercase tracking-wide
                   transition-all duration-200 cursor-pointer
                   hover:border-gold/60 hover:bg-gold/5 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]
                   active:translate-y-1 active:shadow-none
                   disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-parchment/20
                   text-left"
          >
            <div class="flex items-center gap-3">
              <span class="text-gold/60 text-sm font-mono">{i === 0 ? 'A' : 'B'}</span>
              <span>{choice.text}</span>
            </div>
            <div class="mt-1 ml-7 text-xs font-mono text-parchment/30 normal-case tracking-normal">
              {choice.stat.toUpperCase()} check · DC {choice.difficulty}
            </div>
          </button>
        {/each}

      </div>
    {:else if game.phase === 'RESULT'}
      <!-- Result Display -->
      <div class="text-center space-y-6">
        <div
          class="text-6xl"
          class:animate-bounce={game.lastOutcome === 'SUCCESS'}
        >
          {game.lastOutcome === 'SUCCESS' ? '✨' : '💥'}
        </div>

        <div>
          <p
            class="text-xl font-bold font-display uppercase tracking-wide mb-3"
            class:text-green-400={game.lastOutcome === 'SUCCESS'}
            class:text-blood={game.lastOutcome === 'FAIL'}
          >
            {game.lastOutcome === 'SUCCESS' ? 'Success!' : 'Failed!'}
          </p>
          <p class="text-parchment/80 text-base leading-relaxed">
            {game.lastResultText}
          </p>
          {#if game.lastDamage > 0}
            <p class="text-blood font-mono text-sm mt-2 animate-pulse">
              -{game.lastDamage} HP
            </p>
          {/if}
        </div>

        <div class="flex items-center justify-center gap-2 text-parchment/30 text-xs font-mono">
          <img src="/icons/5.png" alt="rolls" class="w-4 h-4 object-contain grayscale" /> 
          Rolled: {game.lastRoll}
        </div>

        <button
          onclick={handleContinue}
          class="px-10 py-4 border-2 border-gold/50 rounded-xl bg-gold/5
                 text-gold font-display text-xl font-bold uppercase tracking-wider
                 transition-all duration-200 cursor-pointer
                 hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]
                 active:translate-y-1"
        >
          Continue →
        </button>
      </div>
    {:else if game.phase === 'DEAD'}
      <!-- Death Screen -->
      <div class="text-center space-y-6 animate-fade-in">
        <div class="text-7xl">💀</div>
        <h2 class="font-display text-3xl text-blood font-bold uppercase tracking-wide">
          You Died
        </h2>
        <p class="text-parchment/60 text-base">
          {game.lastResultText}
        </p>
        <p class="text-blood/60 font-mono text-sm">
          Final HP: 0/{game.maxHp}
        </p>
      </div>
    {:else if game.phase === 'VICTORY'}
      <!-- Victory flash -->
      <div class="text-center space-y-6 animate-fade-in">
        <div class="text-7xl">🏆</div>
        <h2 class="font-display text-3xl text-gold font-bold uppercase tracking-wide">
          Victory!
        </h2>
        <p class="text-parchment/60 text-base">
          You survived the dungeon!
        </p>
      </div>
    {/if}
  </div>
</div>

<!-- Dice Overlay -->
{#if showDice && pendingRoll}
  <DiceRoller
    value={pendingRoll.value}
    outcome={pendingRoll.outcome}
    onComplete={onDiceComplete}
  />
{/if}

<style>
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
  .animate-shake {
    animation: shake 0.4s ease-out;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }
</style>
