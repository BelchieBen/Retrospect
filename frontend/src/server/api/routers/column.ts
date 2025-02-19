import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const columnRouter = createTRPCRouter({
  getColumns: protectedProcedure
    .input(z.object({ boardId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.column.findMany({
        where: { boardId: input.boardId },
        include: { cards: true },
      });
    }),
});
