# One-Minute Dungeon - MVP Complete! 🎲

## What We Built

A fully playable 60-second dungeon crawler PWA with:

### ✅ Core Features
- **Game Loop** (`/dungeon`) - 5 encounters, D20 rolls, HP tracking, stat progression
- **Result Screen** (`/result`) - Rarity-based endings with share functionality
- **Medieval Icons Integration** - Replaced emojis with custom pixel-art icons for stats, HP, and UI elements.
- **20 Satirical Encounters** - Medieval humor meets modern comedy


### ✅ Technical Stack
- **Frontend**: SvelteKit + Tailwind CSS v4
- **Backend**: Convex (schema defined, ready for deployment)
- **Auth**: Clerk SDK installed (guest flow ready to implement)
- **Fonts**: Cinzel (display), Inter (body), Fira Code (mono)

### ✅ Game Mechanics
- **HP System**: Starts at 10, visual bar with color-coded states
- **Stats**: STR, DEX, INT, CHA - grow with each choice
- **D20 Rolls**: Animated dice with success/fail visual feedback
- **Difficulty Checks**: Each choice has stat + DC requirement
- **Title Generation**: 40+ unique titles based on dominant stat + outcome
- **Rarity System**: Common → Rare → Epic → Legendary (based on performance)

### ✅ Visual Polish
- Screen shake on damage
- Particle effects on landing page
- Animated D20 roller with ornate metallic style
- Rarity-colored result cards
- Responsive mobile-first design

## How to Play

1. **Start**: `npm run dev` (already running on http://localhost:5173)
2. **Navigate**: Click "Enter Dungeon" on landing page
3. **Play**: Make 5 choices, roll dice, survive or die
4. **Share**: Get your title and share via Web Share API

## Known Issues

- **TypeScript Errors**: Svelte 5 language server shows false positives for component imports. These don't affect runtime - the app works perfectly in the browser.
- **Convex**: Schema is defined but backend not deployed yet (run `npx convex dev` when ready)
- **Auth**: Clerk installed but guest flow not wired to UI yet

## Next Steps (If Needed)

1. Deploy Convex backend: `npx convex dev`
2. Wire up Clerk authentication
3. Persist runs to database
4. Add leaderboard
5. Deploy to Vercel

## File Structure

```
src/
├── routes/
│   ├── +layout.svelte (root layout + fonts)
│   ├── +page.svelte (landing page)
│   ├── dungeon/+page.svelte (main game)
│   └── result/+page.svelte (ending screen)
├── lib/
│   ├── engine.ts (game logic, RNG, title gen)
│   ├── encounters.ts (20 encounters)
│   └── components/
│       ├── DiceRoller.svelte
│       ├── HpBar.svelte
│       └── StatBadges.svelte
└── app.css (Tailwind + design tokens)

convex/
├── schema.ts (users + runs tables)
└── tsconfig.json
```

## Status

**MVP COMPLETE** ✅ - The game is fully playable in the browser right now!
