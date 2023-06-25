import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/nodejs";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 s"),
  analytics: true,
});

export const problemsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.problem.findMany();
  }),
  getProblemByUrl: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.problem.findFirst({
        where: { url: input.url },
      });
    }),
  getStarterCode: publicProcedure
    .input(z.object({ url: z.string(), language: z.string() }))
    .query(async ({ ctx, input }) => {
      // Fetch the problem first
      const problem = await ctx.prisma.problem.findFirst({
        where: { url: input.url },
      });

      if (!problem) {
        throw new Error("Problem not found");
      }

      // Then fetch the starter code
      const starterCode = await ctx.prisma.starterCode.findFirst({
        where: { problemId: problem.id, language: input.language },
      });

      if (!starterCode) {
        throw new Error(
          `Starter code not found for language: ${input.language}`
        );
      }

      // Return only the code field
      return starterCode.code;
    }),
});
