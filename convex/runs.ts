import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    userId: v.id("users"),
    outcome: v.union(v.literal("WIN"), v.literal("LOSS")),
    finalHp: v.number(),
    endingTitle: v.string(),
    endingDescription: v.string(),
    snapshot: v.object({
      str: v.number(),
      dex: v.number(),
      int: v.number(),
      cha: v.number(),
    }),
    rarity: v.union(
      v.literal("COMMON"),
      v.literal("RARE"),
      v.literal("EPIC"),
      v.literal("LEGENDARY")
    ),
    seed: v.string(),
    killedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("runs", {
      userId: args.userId,
      outcome: args.outcome,
      finalHp: args.finalHp,
      endingTitle: args.endingTitle,
      endingDescription: args.endingDescription,
      statsSnapshot: args.snapshot,
      rarity: args.rarity,
      seed: args.seed,
      killedBy: args.killedBy,
    });
  },
});

export const getLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    const runs = await ctx.db
      .query("runs")
      .order("desc")
      .take(50);
    
    // Join with user names
    return await Promise.all(
      runs.map(async (run) => {
        const user = await ctx.db.get(run.userId);
        return {
          ...run,
          userName: user?.name ?? "Unknown Hero",
        };
      })
    );
  },
});
