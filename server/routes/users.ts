import { Router } from "express";
import { db } from "../db";

const router = Router();

router.post("/", async (req, res) => {
  const { name } = req.body as { name: string };
  const user = await db.user.create({
    data: {
      name: name,
    },
  });
  res.json(user);
});

export default router;
