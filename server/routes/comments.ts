import { Router } from "express";
import { db, poolConfig } from "../db";
import PostgresNotifier from "pg-realtime";

const router = Router();
const notifier = new PostgresNotifier(poolConfig);
const comments = notifier.channel("comments");
const notifications = notifier.channel("notifications");

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

  try {
    const comment = await db.comment.create({
      data: {
        value,
        createdById: userId,
        cardId,
      },
    });

    // Get card and user info for notification
    const [card, commenter] = await Promise.all([
      db.card.findUnique({
        where: { id: cardId },
        select: { createdById: true, name: true, boardId: true },
      }),
      db.user.findUnique({
        where: { id: userId },
        select: { name: true },
      }),
    ]);

    // Create notification for card owner if someone else commented
    if (card && commenter && card.createdById !== userId) {
      const truncatedComment = value;

      await db.notification.create({
        data: {
          title: "New Comment",
          content: `${commenter.name} commented on your card "${card.name || "Untitled"}": ${truncatedComment}`,
          type: "CARD_COMMENTED",
          userId: card.createdById,
          createdByUserId: userId,
          boardId: card.boardId,
          cardId: cardId,
        },
      });

      // Trigger notification via pg-realtime
      const payload = JSON.stringify({
        action: "create",
        userId: card.createdById,
      });
      notifications.notify(payload);
    }

    comments.notify(JSON.stringify(comment));
    res.json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
});

export default router;
