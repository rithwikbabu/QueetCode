import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
      } else {
        // if no like/dislike exists, create a new one
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
      const result = await ctx.prisma.like.findFirst({
        where: {
          clerkId: input.clerkId,
          problemId: input.problemId,
        },
      });
      return result;
    }),
});
