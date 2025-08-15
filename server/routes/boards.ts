import { Router } from "express";
import { db, poolConfig } from "../db";
import PostgresNotifier from "pg-realtime";

const router = Router();
const notifier = new PostgresNotifier(poolConfig);
const boardMembersChannel = notifier.channel("board_members");
const boardsChannel = notifier.channel("boards");

router.get("/", async (req, res) => {
  try {
    const userId = req.userId;
    req.logger.info({ userId }, "Fetching user boards");
    const boards = await db.user.findUnique({
      where: { id: userId },
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
    res.json(boards);
  } catch (error) {
    req.logger.error({ error }, "Error fetching user teams");
    res.status(500).json({
      error: "Failed to fetch user teams",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const board = await db.boards.findUnique({
    where: { id },
    include: {
      columns: true,
      BoardMembers: {
        include: {
          user: true,
        },
      },
    },
  });
  res.json(board);
});

router.post("/", async (req, res) => {
  const { title, ownerId } = req.body as { title: string; ownerId: string };
  const board = await db.boards.create({
    data: {
      name: title,
      ownerId: ownerId,
      BoardMembers: {
        create: {
          userId: ownerId,
        },
      },
    },
  });

  boardMembersChannel.notify(JSON.stringify(board));
  res.json(board);
});

router.post("/join", async (req, res) => {
  const { userId, boardId } = req.body as { userId: string; boardId: string };

  // Check if user is already a member
  const existingMember = await db.boardMembers.findFirst({
    where: {
      userId: userId,
      boardId: boardId,
    },
  });

  // If not already a member, add them
  if (!existingMember) {
    await db.boardMembers.create({
      data: {
        userId: userId,
        boardId: boardId,
      },
    });
  }
  boardsChannel.notify(JSON.stringify({ userId, boardId, action: "join" }));
  res.json({ success: true, alreadyMember: !!existingMember });
});

router.get("/:id/members", async (req, res) => {
  const { id } = req.params;
  const members = await db.boardMembers.findMany({
    where: { boardId: id },
    include: { user: true },
  });

  res.json(members);
});

// Archive/Unarchive board
router.patch("/:id/archive", async (req, res) => {
  const { id } = req.params;
  const { archived, userId } = req.body as {
    archived: boolean;
    userId: string;
  };

  try {
    // Check if user is a member of the board
    const boardMember = await db.boardMembers.findFirst({
      where: {
        boardId: id,
        userId: userId,
      },
      include: { board: true },
    });

    if (!boardMember) {
      res.status(403).json({ error: "User is not a member of this board" });
      return;
    }

    // Update board archive status
    const updatedBoard = await db.boards.update({
      where: { id },
      data: {
        archived,
        archivedAt: archived ? new Date() : null,
      },
    });

    // Notify via socket.io
    boardsChannel.notify(
      JSON.stringify({
        boardId: id,
        archived,
        userId,
        action: archived ? "archived" : "unarchived",
      })
    );

    res.json(updatedBoard);
  } catch (error) {
    console.error("Error archiving/unarchiving board:", error);
    res.status(500).json({ error: "Failed to archive/unarchive board" });
  }
});

// Delete board
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body as { userId: string };

  try {
    // Check if user is the owner of the board
    const board = await db.boards.findUnique({
      where: { id },
      select: { ownerId: true, name: true },
    });

    if (!board) {
      res.status(404).json({ error: "Board not found" });
      return;
    }

    if (board.ownerId !== userId) {
      res
        .status(403)
        .json({ error: "Only the board owner can delete the board" });
      return;
    }

    // Delete the board (cascade will handle related data)
    await db.boards.delete({
      where: { id },
    });

    // Notify via socket.io
    boardsChannel.notify(
      JSON.stringify({
        boardId: id,
        userId,
        boardName: board.name,
        action: "deleted",
      })
    );

    res.json({ success: true, message: "Board deleted successfully" });
  } catch (error) {
    console.error("Error deleting board:", error);
    res.status(500).json({ error: "Failed to delete board" });
  }
});

export default router;
