import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const boardRouter = createTRPCRouter({
  getBoards: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { BoardMembers: { include: { board: true } } },
    });
  }),

  getBoard: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.boards.findUnique({
        where: { id: input.id },
        include: { columns: true },
      });
    }),
});
