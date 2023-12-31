import { problemsRouter } from "~/server/api/routers/problems";
import { createTRPCRouter } from "~/server/api/trpc";
import { likesRouter } from "./routers/likes";
import { saveStatesRouter } from "./routers/saveStates";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  problems: problemsRouter,
  likes: likesRouter,
  saveStates: saveStatesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
