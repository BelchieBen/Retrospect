import { Router } from "express";
import { db, poolConfig } from "../db";
import PostgresNotifier from "pg-realtime";

const router = Router();
const notifier = new PostgresNotifier(poolConfig);
const postsChannel = notifier.channel("posts");

router.get("/", async (req, res) => {
  const posts = await db.post.findMany();
  res.json(posts);
});

router.post("/", async (req, res) => {
  const { title } = req.body as { title: string };
  const post = await db.post.create({
    data: {
      name: title,
    },
  });

  postsChannel.notify(JSON.stringify(post));
  res.json(post);
});

export default router;
