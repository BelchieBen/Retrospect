import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  // Get all users - admin only
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        image: true,
        _count: {
          select: {
            Boards: true,
            Card: true,
            Comment: true,
            Feedback: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });
  }),

  // Get user statistics - admin only
  getUserStats: adminProcedure.query(async ({ ctx }) => {
    const [total, adminCount, verifiedCount, recentUsers] = await Promise.all([
      ctx.db.user.count(),
      ctx.db.user.count({
        where: { role: "ADMIN" },
      }),
      ctx.db.user.count({
        where: { emailVerified: { not: null } },
      }),
      ctx.db.user.count({
        where: {
          accounts: {
            some: {},
          },
        },
      }),
    ]);

    return {
      total,
      adminCount,
      verifiedCount,
      recentUsers,
    };
  }),

  // Update user role - admin only
  updateUserRole: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.enum(["USER", "ADMIN"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Prevent admins from demoting themselves to avoid lockout
      if (input.userId === ctx.session.user.id && input.role !== "ADMIN") {
        throw new Error("You cannot change your own admin role");
      }

      return ctx.db.user.update({
        where: { id: input.userId },
        data: { role: input.role },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    }),

  // Get user details - admin only
  getUserById: adminProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { id: input.userId },
        include: {
          accounts: {
            select: {
              provider: true,
            },
          },
          _count: {
            select: {
              Boards: true,
              Card: true,
              Comment: true,
              Feedback: true,
            },
          },
        },
      });
    }),
});
