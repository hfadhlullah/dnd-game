<script lang="ts">
  let { value, outcome, onComplete }: {
    value: number;
    outcome: 'SUCCESS' | 'FAIL';
    onComplete?: () => void;
  } = $props();

  let rolling = $state(true);
  let displayValue = $state(Math.floor(Math.random() * 20) + 1);
  let showResult = $state(false);
  let isRolling = $derived(rolling);
  let isSuccess = $derived(!rolling && outcome === 'SUCCESS');
  let isFail = $derived(!rolling && outcome === 'FAIL');

  $effect(() => {
    // Rapid number cycling for 1.5 seconds
    const interval = setInterval(() => {
      displayValue = Math.floor(Math.random() * 20) + 1;
    }, 60);

    const timer = setTimeout(() => {
      clearInterval(interval);
      displayValue = value;
      rolling = false;

      // Show result flash after dice settles
      setTimeout(() => {
        showResult = true;
        // Auto-dismiss after showing result
        setTimeout(() => {
          onComplete?.();
        }, 1200);
      }, 400);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  });
</script>

<!-- Backdrop -->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
  <!-- Dice -->
  <div class="relative">
    <!-- Glow effect -->
    <div
      class="absolute inset-0 rounded-2xl blur-xl transition-colors duration-500 {isRolling ? 'bg-gold/40' : isSuccess ? 'bg-green-500/40' : 'bg-blood/40'}"
    ></div>


    <!-- D20 Shape -->
    <div
      class="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center"
      class:animate-dice-spin={isRolling}
    >
      <!-- Diamond/D20 shape via CSS -->
      <div
        class="absolute inset-0 border-2 rounded-xl rotate-45 transition-all duration-500 {isRolling ? 'border-gold/60 shadow-[0_0_40px_rgba(255,215,0,0.4)]' : isSuccess ? 'border-green-400 shadow-[0_0_40px_rgba(34,197,94,0.5)]' : 'border-blood shadow-[0_0_40px_rgba(255,68,68,0.5)]'}"
        style="background: radial-gradient(circle, rgba(26,26,26,0.95) 0%, rgba(40,40,40,0.95) 100%);"
      ></div>

      <!-- Ornate border detail -->
      <div
        class="absolute inset-2 border rounded-lg rotate-45 transition-colors duration-500 {isRolling ? 'border-gold/30' : isSuccess ? 'border-green-400/30' : 'border-blood/30'}"
      ></div>

      <!-- Number -->
      <span
        class="relative z-10 font-display text-5xl md:text-6xl font-black transition-all duration-300 {isRolling ? 'text-gold' : isSuccess ? 'text-green-400 scale-125' : 'text-blood scale-125'}"
      >
        {displayValue}
      </span>
    </div>

    <!-- Result Badge -->
    {#if showResult}
      <div
        class="absolute -bottom-16 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full font-display text-lg font-bold uppercase tracking-wider animate-result-pop {outcome === 'SUCCESS' ? 'bg-green-500/20 text-green-400 border-green-400/50' : 'bg-blood/20 text-blood border-blood/50'}"
        style="border-width: 1px;"
      >
        {outcome === 'SUCCESS' ? '✨ Success!' : '💀 Failed!'}
      </div>
    {/if}
  </div>
</div>

<style>
  @keyframes dice-spin {
    0% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(90deg) scale(1.1); }
    50% { transform: rotate(180deg) scale(1); }
    75% { transform: rotate(270deg) scale(0.95); }
    100% { transform: rotate(360deg) scale(1); }
  }
  .animate-dice-spin {
    animation: dice-spin 0.4s linear infinite;
  }

  @keyframes result-pop {
    0% { transform: translateX(-50%) scale(0) translateY(10px); opacity: 0; }
    60% { transform: translateX(-50%) scale(1.1) translateY(0); opacity: 1; }
    100% { transform: translateX(-50%) scale(1) translateY(0); opacity: 1; }
  }
  .animate-result-pop {
    animation: result-pop 0.4s ease-out forwards;
  }
</style>
