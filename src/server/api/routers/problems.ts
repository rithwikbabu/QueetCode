import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const problemsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.problem.findMany();
  }),
});
