import { Router } from "express";
import { db, poolConfig } from "../db";
import PostgresNotifier from "pg-realtime";

const router = Router();
const notifier = new PostgresNotifier(poolConfig);
const cardsChannel = notifier.channel("cards");

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

  cardsChannel.notify(JSON.stringify(post));
  res.json(post);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, columnId, position, attachments, gifUrl, userId } =
    req.body as {
      name: string | null;
      description: string | undefined;
      gifUrl: string | undefined;
      columnId: string | null;
      position: number | null;
      attachments: { name: string; url: string }[] | null;
      userId: string;
    };

  try {
    // If position and columnId are provided, handle reordering
    if (position !== null && columnId !== null) {
      // Get the current card to check if it's moving columns
      const currentCard = await db.card.findUnique({
        where: { id },
        select: { columnId: true, position: true },
      });

      if (!currentCard) {
        res.status(404).json({ error: "Card not found" });
        return;
      }

      const isMovingColumns = currentCard.columnId !== columnId;
      const isChangingPosition = currentCard.position !== position;

      if (isMovingColumns || isChangingPosition) {
        const result = await db.$transaction(async (tx) => {
          // If moving to a different column
          if (isMovingColumns) {
            // Update positions in the old column (shift cards up)
            await tx.card.updateMany({
              where: {
                columnId: currentCard.columnId,
                position: { gt: currentCard.position },
              },
              data: {
                position: { decrement: 1 },
              },
            });

            // Update positions in the new column (shift cards down)
            await tx.card.updateMany({
              where: {
                columnId: columnId,
                position: { gte: position },
              },
              data: {
                position: { increment: 1 },
              },
            });
          } else if (currentCard.position < position) {
            // Moving down: shift cards up between old and new position
            await tx.card.updateMany({
              where: {
                columnId: columnId,
                position: {
                  gt: currentCard.position,
                  lte: position,
                },
              },
              data: {
                position: { decrement: 1 },
              },
            });
          } else {
            // Moving up: shift cards down between new and old position
            await tx.card.updateMany({
              where: {
                columnId: columnId,
                position: {
                  gte: position,
                  lt: currentCard.position,
                },
              },
              data: {
                position: { increment: 1 },
              },
            });
          }

          // Update the moved card
          const updatedCard = await tx.card.update({
            where: { id: id },
            data: {
              name: name ?? undefined,
              description: description ?? undefined,
              gifUrl: gifUrl ?? undefined,
              columnId: columnId,
              position: position,
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

          return updatedCard;
        });

        cardsChannel.notify(JSON.stringify({ reorder: true, userId }));
        res.json(result);
        return;
      }
    }

    // No position update or no position change, just update other fields
    const updatedCard = await db.card.update({
      where: { id: id },
      data: {
        name: name ?? undefined,
        description: description ?? undefined,
        gifUrl: gifUrl ?? undefined,
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
    cardsChannel.notify(JSON.stringify(updatedCard));
    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Failed to update card" });
  }
});

// Add archive/unarchive endpoint
router.patch("/:id/archive", async (req, res) => {
  const { id } = req.params;
  const { archived } = req.body as { archived: boolean };

  try {
    const updatedCard = await db.card.update({
      where: { id },
      data: {
        archived,
        archivedAt: archived ? new Date() : null,
      },
    });

    cardsChannel.notify(JSON.stringify(updatedCard));
    res.json(updatedCard);
  } catch (error) {
    console.error("Error archiving/unarchiving card:", error);
    res.status(500).json({ error: "Failed to archive/unarchive card" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.card.delete({ where: { id } });
    cardsChannel.notify(JSON.stringify({ id }));
    res.json({ id });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: "Failed to delete card" });
  }
});

export default router;
