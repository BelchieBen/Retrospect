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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, columnId, position, attachments } = req.body as {
    name: string | null;
    columnId: string | null;
    position: number | null;
    attachments: { name: string; url: string }[] | null;
  };

  try {
    const updatedCard = await db.card.update({
      where: { id: id },
      data: {
        name: name ?? undefined,
        columnId: columnId ?? undefined,
        position: position ?? undefined,
        attachments: attachments
          ? {
              deleteMany: {},
              create: attachments.map((attachment) => ({
                name: attachment.name,
                url: attachment.url,
              })),
            }
          : undefined,
      },
    });

    columns.notify(JSON.stringify(updatedCard));
    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Failed to update card" });
  }
});

export default router;
