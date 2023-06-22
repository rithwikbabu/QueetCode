import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

export const likesRouter = createTRPCRouter({
  handleLikes: publicProcedure
    .input(
      z.object({
        clerkId: z.string(),
        problemId: z.number(),
        value: z.number().min(-1).max(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { success } = await ratelimit.limit(input.clerkId);

      if (!success) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      }

      const existingLike = await ctx.prisma.like.findFirst({
        where: {
          clerkId: input.clerkId,
          problemId: input.problemId,
        },
      });
      if (existingLike) {
        // if a like/dislike already exists, update its value
        await ctx.prisma.like.update({
          where: { id: existingLike.id },
          data: { value: input.value },
        });
      } else if (input.value !== 0) {
        // if no like/dislike exists and input value is not 0, create a new one
        await ctx.prisma.like.create({
          data: {
            clerkId: input.clerkId,
            problemId: input.problemId,
            value: input.value,
          },
        });
      }

      return null;
    }),
  getTotalLikesAndDislikes: publicProcedure
    .input(
      z.object({
        problemId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.like.groupBy({
        by: ["value"],
        _sum: {
          value: true,
        },
        where: {
          problemId: input.problemId,
        },
      });

      const likes = result.find((r) => r.value === 1)?._sum.value || 0;
      const dislikes = Math.abs(
        result.find((r) => r.value === -1)?._sum.value || 0
      );

      return { likes, dislikes };
    }),
  getLikesByUser: publicProcedure
    .input(
      z.object({
        clerkId: z.string(),
        problemId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userLike = await ctx.prisma.like.findFirst({
        where: {
          clerkId: input.clerkId,
          problemId: input.problemId,
        },
      });
      return userLike;
    }),
});
