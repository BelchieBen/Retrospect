import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const boardRouter = createTRPCRouter({
  createFromTemplate: protectedProcedure
    .input(
      z.object({
        templateId: z.string(),
        boardName: z.string(),
        columns: z.array(
          z.object({
            name: z.string(),
            position: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Create the board with columns in a transaction
      const board = await ctx.db.boards.create({
        data: {
          name: input.boardName,
          ownerId: userId,
          BoardMembers: {
            create: {
              userId: userId,
            },
          },
          columns: {
            create: input.columns.map((column) => ({
              name: column.name,
              position: column.position,
            })),
          },
        },
        include: {
          columns: true,
          BoardMembers: {
            include: {
              user: true,
            },
          },
        },
      });

      return board;
    }),

  getBoards: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        BoardMembers: {
          include: { board: true },
          orderBy: {
            board: {
              archived: "asc", // false (not archived) first, then true (archived)
            },
          },
        },
      },
    });
  }),

  getRecentBoards: protectedProcedure.query(async ({ ctx }) => {
    const userWithBoards = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        BoardMembers: {
          include: { board: true },
          orderBy: { createdAt: "desc" },
          take: 3,
        },
      },
    });
    return userWithBoards?.BoardMembers ?? [];
  }),

  getBoard: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.boards.findUnique({
        where: { id: input.id },
        include: {
          columns: true,
          BoardMembers: {
            include: {
              user: true,
            },
          },
        },
      });
    }),

  getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const [totalBoards, teamMembers, recentActivity] = await Promise.all([
      // Count total boards where user is a member
      ctx.db.boardMembers.count({
        where: {
          userId: userId,
        },
      }),

      // Count unique team members across all user's boards
      ctx.db.boardMembers
        .findMany({
          where: {
            board: {
              BoardMembers: {
                some: {
                  userId: userId,
                },
              },
            },
          },
          include: {
            user: true,
          },
        })
        .then((members) => new Set(members.map((m) => m.userId)).size),

      // Count cards created in the last week across user's boards
      ctx.db.card.count({
        where: {
          board: {
            BoardMembers: {
              some: {
                userId: userId,
              },
            },
          },
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
      }),
    ]);

    return {
      totalBoards,
      teamMembers,
      recentActivity,
    };
  }),
});
