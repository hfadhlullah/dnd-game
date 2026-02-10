import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.optional(v.string()),
    isGuest: v.boolean(),
    name: v.string(),
    highestTitle: v.optional(v.string()),
    tokens: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  runs: defineTable({
    userId: v.id("users"),
    outcome: v.union(v.literal("WIN"), v.literal("LOSS")),
    finalHp: v.number(),
    endingTitle: v.string(),
    endingDescription: v.string(),
    rarity: v.union(
      v.literal("COMMON"),
      v.literal("RARE"),
      v.literal("EPIC"),
      v.literal("LEGENDARY")
    ),
    seed: v.string(),
    killedBy: v.optional(v.string()),
    statsSnapshot: v.object({
      str: v.number(),
      dex: v.number(),
      int: v.number(),
      cha: v.number(),
    }),
  }).index("by_user_id", ["userId"]),
});
