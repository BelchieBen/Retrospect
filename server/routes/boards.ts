import { Router } from "express";
import { db } from "../db";
import PostgresNotifier from "pg-realtime";

const router = Router();
const notifier = new PostgresNotifier(process.env.DATABASE_URL!);
const boardMembersChannel = notifier.channel("board_members");

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

export default router;
