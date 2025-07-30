import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

export const feedbackRouter = createTRPCRouter({
  // Get all feedback - admin only
  getAllFeedback: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.feedback.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Get feedback statistics - admin only
  getFeedbackStats: adminProcedure.query(async ({ ctx }) => {
    const [total, byType, recent] = await Promise.all([
      ctx.db.feedback.count(),
      ctx.db.feedback.groupBy({
        by: ["type"],
        _count: { type: true },
      }),
      ctx.db.feedback.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
      }),
    ]);

    const typeStats = byType.reduce(
      (acc, item) => {
        acc[item.type] = item._count.type;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      total,
      recent,
      byType: typeStats,
    };
  }),

  // Delete feedback - admin only
  deleteFeedback: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.feedback.delete({
        where: { id: input.id },
      });
    }),
});
