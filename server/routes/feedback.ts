import { Router } from "express";
import { db, poolConfig } from "../db";
import PostgresNotifier from "pg-realtime";

const router = Router();
const notifier = new PostgresNotifier(poolConfig);
const feedbackChannel = notifier.channel("feedback");

// Get all feedback (admin endpoint)
router.get("/", async (req, res) => {
  try {
    const feedback = await db.feedback.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

// Create new feedback
router.post("/", async (req, res) => {
  const { type, subject, message, email, anonymous, userId } = req.body as {
    type: string;
    subject: string;
    message: string;
    email?: string;
    anonymous: boolean;
    userId?: string;
  };

  try {
    // Validate required fields
    if (!type || !subject || !message) {
      res
        .status(400)
        .json({ error: "Type, subject, and message are required" });
      return;
    }

    // Validate feedback type
    const validTypes = ["bug", "feature", "improvement", "general"];
    if (!validTypes.includes(type)) {
      res.status(400).json({ error: "Invalid feedback type" });
      return;
    }

    // Create feedback entry
    const feedback = await db.feedback.create({
      data: {
        type,
        subject,
        message,
        email: anonymous ? null : email,
        anonymous,
        userId: anonymous ? null : userId,
      },
      include: { user: true },
    });

    // Notify about new feedback (for admin dashboard)
    feedbackChannel.notify(JSON.stringify(feedback));

    res.status(201).json(feedback);
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ error: "Failed to create feedback" });
  }
});

// Get feedback by user ID (for user's own feedback)
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const feedback = await db.feedback.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(feedback);
  } catch (error) {
    console.error("Error fetching user feedback:", error);
    res.status(500).json({ error: "Failed to fetch user feedback" });
  }
});

// Get single feedback item by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await db.feedback.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!feedback) {
      res.status(404).json({ error: "Feedback not found" });
      return;
    }

    res.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

export default router;
