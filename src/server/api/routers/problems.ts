import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
