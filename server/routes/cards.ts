import { Router } from "express";
import { db } from "../db";
import PostgresNotifier from "pg-realtime";

const router = Router();
const notifier = new PostgresNotifier(process.env.DATABASE_URL!);
const columns = notifier.channel("columns");

router.get("/", async (req, res) => {
  const posts = await db.post.findMany();
  res.json(posts);
});

router.post("/", async (req, res) => {
  const { title, userId, columnId, boardId } = req.body as {
    title: string | null;
    userId: string;
    columnId: string;
    boardId: string;
  };
  const post = await db.card.create({
    data: {
      name: title,
      position: 0,
      createdById: userId,
      boardId: boardId,
      columnId: columnId,
    },
  });

  columns.notify(JSON.stringify(post));
  res.json(post);
});

export default router;
