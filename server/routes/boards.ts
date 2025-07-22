import { Router } from "express";
import { db, poolConfig } from "../db";
import PostgresNotifier from "pg-realtime";

const router = Router();
const notifier = new PostgresNotifier(poolConfig);
const boardMembersChannel = notifier.channel("board_members");
const boardsChannel = notifier.channel("boards");

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

export default router;
