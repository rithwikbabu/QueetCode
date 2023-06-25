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

export const saveStatesRouter = createTRPCRouter({
  getSaveState: publicProcedure
    .input(
      z.object({
        problemId: z.number(),
        clerkId: z.string(),
        language: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.saveState.findFirst({
        where: {
          problemId: input.problemId,
          clerkId: input.clerkId,
          language: input.language,
        },
      });
    }),
  saveProblemCode: publicProcedure
    .input(
      z.object({
        problemId: z.number(),
        language: z.string(),
        codeText: z.string(),
        clerkId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { success } = await ratelimit.limit(input.clerkId);

      if (!success) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      }

      const existingSaveState = await ctx.prisma.saveState.findFirst({
        where: {
          problemId: input.problemId,
          clerkId: input.clerkId,
          language: input.language,
        },
      });
      if (existingSaveState) {
        await ctx.prisma.saveState.update({
          where: { id: existingSaveState.id },
          data: { code: input.codeText },
        });
      } else {
        await ctx.prisma.saveState.create({
          data: {
            clerkId: input.clerkId,
            problemId: input.problemId,
            language: input.language,
            code: input.codeText,
          },
        });
      }
    }),
});
