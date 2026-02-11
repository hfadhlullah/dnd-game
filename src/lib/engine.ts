/**
 * Core game engine for One-Minute Dungeon.
 * Handles state management, RNG, and game progression.
 */

import { ENCOUNTERS, type Encounter } from './encounters';

// ===== Types =====

export interface PlayerStats {
  str: number;
  dex: number;
  int: number;
  cha: number;
}

export type StatKey = keyof PlayerStats;

export interface GameState {
  hp: number;
  maxHp: number;
  stats: PlayerStats;
  nodeIndex: number;
  totalNodes: number;
  encounters: Encounter[];
  currentEncounter: Encounter | null;
  phase: 'INTRO' | 'ENCOUNTER' | 'ROLLING' | 'RESULT' | 'DEAD' | 'VICTORY';
  lastRoll: number | null;
  lastOutcome: 'SUCCESS' | 'FAIL' | null;
  lastResultText: string | null;
  lastDamage: number;
  seed: string;
}

export interface EndingResult {
  title: string;
  description: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  outcome: 'WIN' | 'LOSS';
  killedBy: string | null;
}

// ===== Seeded RNG =====

function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return () => {
    hash = (hash * 1664525 + 1013904223) | 0;
    return ((hash >>> 0) / 4294967296);
  };
}

function generateSeed(): string {
  return Math.random().toString(36).substring(2, 10);
}

// ===== Game Logic =====

export function createNewGame(): GameState {
  const seed = generateSeed();
  const rng = seededRandom(seed);

  // Shuffle and pick 5 encounters
  const shuffled = [...ENCOUNTERS].sort(() => rng() - 0.5);
  const selectedEncounters = shuffled.slice(0, 5);

  return {
    hp: 10,
    maxHp: 10,
    stats: { str: 0, dex: 0, int: 0, cha: 0 },
    nodeIndex: 0,
    totalNodes: 5,
    encounters: selectedEncounters,
    currentEncounter: selectedEncounters[0],
    phase: 'ENCOUNTER',
    lastRoll: null,
    lastOutcome: null,
    lastResultText: null,
    lastDamage: 0,
    seed,
  };
}

export function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1;
}

export function resolveChoice(state: GameState, choiceIndex: 0 | 1 | 2): GameState {
  const encounter = state.currentEncounter;
  if (!encounter) return state;

  const choice = encounter.choices[choiceIndex];
  if (!choice) return state; // Safety check
  const roll = rollD20();
  const statBonus = state.stats[choice.stat];
  const total = roll + statBonus;
  const success = total >= choice.difficulty;

  // Update stats (you learn from every attempt)
  const newStats = { ...state.stats };
  newStats[choice.stat] += 1;

  let newHp = state.hp;
  let damage = 0;

  if (!success) {
    damage = choice.damage;
    newHp = Math.max(0, newHp - damage);
  }

  // Check death
  if (newHp <= 0) {
    return {
      ...state,
      hp: 0,
      stats: newStats,
      phase: 'DEAD',
      lastRoll: roll,
      lastOutcome: 'FAIL',
      lastResultText: choice.failText,
      lastDamage: damage,
    };
  }

  return {
    ...state,
    hp: newHp,
    stats: newStats,
    phase: 'RESULT',
    lastRoll: roll,
    lastOutcome: success ? 'SUCCESS' : 'FAIL',
    lastResultText: success ? choice.successText : choice.failText,
    lastDamage: damage,
  };
}

export function advanceToNextNode(state: GameState): GameState {
  const nextIndex = state.nodeIndex + 1;

  if (nextIndex >= state.totalNodes) {
    return {
      ...state,
      phase: 'VICTORY',
      nodeIndex: nextIndex,
      currentEncounter: null,
    };
  }

  return {
    ...state,
    phase: 'ENCOUNTER',
    nodeIndex: nextIndex,
    currentEncounter: state.encounters[nextIndex],
    lastRoll: null,
    lastOutcome: null,
    lastResultText: null,
    lastDamage: 0,
  };
}

// ===== Title & Ending Generation =====

const TITLE_MAP: Record<StatKey, { win: string[]; lose: string[] }> = {
  str: {
    win: ["The Mighty Warlord", "The Iron Fist", "The Unstoppable Brute", "The Mountain Breaker", "The Battle Titan"],
    lose: ["The Muscles-For-Brains", "The Overconfident Brawler", "The Clumsy Berserker", "The Reckless Charger"],
  },
  dex: {
    win: ["The Shadow Dancer", "The Silent Wind", "The Phantom Thief", "The Nimble Striker", "The Unseen Blade"],
    lose: ["The Clumsy Acrobat", "The Tripping Rogue", "The Fumbling Shadow", "The Butterfingers"],
  },
  int: {
    win: ["The Arcane Scholar", "The Sage of Ages", "The Mind Weaver", "The Lore Keeper", "The Puzzle Master"],
    lose: ["The Overthinking Wizard", "The Book-Smart Fool", "The Theory Crafter", "The Absent-Minded Mage"],
  },
  cha: {
    win: ["The Silver Tongue", "The Dragon Whisperer", "The Beloved Hero", "The Diplomatic Legend", "The Enchanting One"],
    lose: ["The Rambling Bard", "The Awkward Diplomat", "The Try-Hard Charmer", "The Friendzoned Hero"],
  },
};

const RARITY_THRESHOLDS = [
  { rarity: 'LEGENDARY' as const, chance: 0.05 },
  { rarity: 'EPIC' as const, chance: 0.15 },
  { rarity: 'RARE' as const, chance: 0.30 },
  { rarity: 'COMMON' as const, chance: 1.0 },
];

function getHighestStat(stats: PlayerStats): StatKey {
  const entries = Object.entries(stats) as [StatKey, number][];
  entries.sort((a, b) => b[1] - a[1]);
  // Tie-break randomly
  const highest = entries[0][1];
  const tied = entries.filter(e => e[1] === highest);
  return tied[Math.floor(Math.random() * tied.length)][0];
}

function determineRarity(outcome: 'WIN' | 'LOSS', hp: number, maxHp: number): 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' {
  // Legendary: Win with full HP or very lucky
  const roll = Math.random();

  // Boost chances for wins with high HP
  let boost = 0;
  if (outcome === 'WIN') {
    boost = (hp / maxHp) * 0.15;
  }

  const adjustedRoll = roll - boost;

  for (const { rarity, chance } of RARITY_THRESHOLDS) {
    if (adjustedRoll < chance) {
      return rarity;
    }
  }
  return 'COMMON';
}

export function generateEnding(state: GameState): EndingResult {
  const outcome: 'WIN' | 'LOSS' = state.phase === 'VICTORY' ? 'WIN' : 'LOSS';
  const highestStat = getHighestStat(state.stats);
  const titles = TITLE_MAP[highestStat][outcome === 'WIN' ? 'win' : 'lose'];
  const title = titles[Math.floor(Math.random() * titles.length)];
  const rarity = determineRarity(outcome, state.hp, state.maxHp);

  const descriptions: Record<string, string> = {
    WIN: `Survived the dungeon with ${state.hp}/${state.maxHp} HP. A true champion of dubious skill.`,
    LOSS: `Fell in the dungeon at node ${state.nodeIndex + 1}/5. ${state.currentEncounter?.text.split('.')[0] || 'The dungeon claimed another soul'}.`,
  };

  return {
    title,
    description: descriptions[outcome],
    rarity,
    outcome,
    killedBy: outcome === 'LOSS' ? (state.currentEncounter?.text.split('.')[0] || 'Unknown') : null,
  };
}
