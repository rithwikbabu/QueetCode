import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const GetProblemByUrlInput = z.object({
  url: z.string(),
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
});
