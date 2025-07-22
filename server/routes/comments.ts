import { Router } from "express";
import { db, poolConfig } from "../db";
import PostgresNotifier from "pg-realtime";

const router = Router();
const notifier = new PostgresNotifier(poolConfig);
const comments = notifier.channel("comments");

router.get("/:cardId", async (req, res) => {
  const { cardId } = req.params;
  const comments = await db.comment.findMany({
    where: { cardId },
    include: { createdBy: true },
  });
  res.json(comments);
});

router.post("/", async (req, res) => {
  const { value, userId, cardId } = req.body as {
    value: string;
    userId: string;
    cardId: string;
  };
  const comment = await db.comment.create({
    data: {
      value,
      createdById: userId,
      cardId,
    },
  });

  comments.notify(JSON.stringify(comment));
  res.json(comment);
});

export default router;
