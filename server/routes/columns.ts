import { Router } from "express";
import { db } from "../db";
import PostgresNotifier from "pg-realtime";

const router = Router();
const notifier = new PostgresNotifier(process.env.DATABASE_URL!);
const columnsChannel = notifier.channel("columns");

router.post("/", async (req, res) => {
  const { boardId, position, name } = req.body as {
    boardId: string;
    position: number;
    name: string | null;
  };
  const column = await db.column.create({
    data: {
      name,
      boardId,
      position,
    },
  });

  columnsChannel.notify(JSON.stringify(column));
  res.json(column);
});

router.get("/:boardId", async (req, res) => {
  const { boardId } = req.params;
  const columns = await db.column.findMany({
    where: {
      boardId: boardId,
    },
  });
  res.json(columns);
});

export default router;
