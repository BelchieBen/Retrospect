import { Router } from "express";
import { db, poolConfig } from "../db";
import PostgresNotifier from "pg-realtime";

const router = Router();
const notifier = new PostgresNotifier(poolConfig);
const columnsChannel = notifier.channel("columns");

router.post("/", async (req, res) => {
  const { boardId, name } = req.body as {
    boardId: string;
    name: string | null;
  };
  const lastColumn = await db.column.findFirst({
    where: { boardId },
    orderBy: { position: "desc" },
  });
  const columnPoistion = lastColumn ? lastColumn.position + 1 : 0;
  const column = await db.column.create({
    data: {
      name,
      boardId,
      position: columnPoistion,
    },
  });

  columnsChannel.notify(JSON.stringify(column));
  res.json(column);
});

router.get("/:boardId", async (req, res) => {
  const { boardId } = req.params;
  const { includeArchived } = req.query as { includeArchived?: string };

  const columns = await db.column.findMany({
    where: {
      boardId: boardId,
    },
    include: {
      cards: {
        where: includeArchived === "true" ? {} : { archived: false },
        include: {
          comments: { include: { createdBy: true } },
          createdBy: true,
          column: true,
        },
        orderBy: { position: "asc" },
      },
    },
    orderBy: { position: "asc" },
  });
  res.json(columns);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, userId } = req.body as { name: string; userId: string };
  const column = await db.column.update({
    where: { id },
    data: { name },
  });

  columnsChannel.notify(JSON.stringify({ ...column, userId }));
  res.json(column);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.column.delete({ where: { id } });
  columnsChannel.notify(JSON.stringify({ id }));
  res.json({ id });
});

export default router;
