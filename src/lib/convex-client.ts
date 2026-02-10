import { ConvexClient } from "convex/browser";
import { env } from "$env/dynamic/public";

const CONVEX_URL = env.PUBLIC_CONVEX_URL || "https://dummy.convex.cloud";
export const convex = new ConvexClient(CONVEX_URL);
