import { Router } from "express";
import { db, poolConfig } from "db";
import type { Request, Response } from "express";
import PostgresNotifier from "pg-realtime";

const router = Router();
const notifier = new PostgresNotifier(poolConfig);
const notificationsChannel = notifier.channel("notifications");

// Use express.json() middleware for parsing JSON
router.use(require("express").json());

// Get notifications for a user
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const {
      includeRead = "false",
      includeDismissed = "false",
      limit = "50",
    } = req.query;

    const whereClause: any = {
      userId: userId,
    };

    if (includeRead === "false") {
      whereClause.read = false;
    }

    if (includeDismissed === "false") {
      whereClause.dismissed = false;
    }

    const notifications = await db.notification.findMany({
      where: whereClause,
      include: {
        createdByUser: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        board: {
          select: {
            id: true,
            name: true,
          },
        },
        card: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: parseInt(limit as string),
    });

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Get notification count for a user
router.get("/:userId/count", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const unreadCount = await db.notification.count({
      where: {
        userId: userId,
        read: false,
        dismissed: false,
      },
    });

    res.json({ unreadCount });
  } catch (error) {
    console.error("Error fetching notification count:", error);
    res.status(500).json({ error: "Failed to fetch notification count" });
  }
});

// Create a notification
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, content, type, userId, createdByUserId, boardId, cardId } =
      req.body;

    const notification = await db.notification.create({
      data: {
        title,
        content,
        type,
        userId,
        createdByUserId,
        boardId,
        cardId,
      },
      include: {
        createdByUser: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        board: {
          select: {
            id: true,
            name: true,
          },
        },
        card: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Trigger Socket.IO event for real-time notification
    const payload = JSON.stringify({
      action: "create",
      userId: userId,
      notification: notification,
    });

    // Send notification via pg-realtime
    notificationsChannel.notify(payload);

    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Failed to create notification" });
  }
});

// Mark notification as read
router.patch("/:id/read", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const notification = await db.notification.update({
      where: {
        id: id,
        userId: userId, // Ensure user can only update their own notifications
      },
      data: {
        read: true,
      },
    });

    res.json(notification);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
});

// Mark all notifications as read for a user
router.patch("/:userId/read-all", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await db.notification.updateMany({
      where: {
        userId: userId,
        read: false,
      },
      data: {
        read: true,
      },
    });

    res.json({ count: result.count });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({ error: "Failed to mark all notifications as read" });
  }
});

// Dismiss notification
router.patch("/:id/dismiss", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const notification = await db.notification.update({
      where: {
        id: id,
        userId: userId, // Ensure user can only dismiss their own notifications
      },
      data: {
        dismissed: true,
      },
    });

    res.json(notification);
  } catch (error) {
    console.error("Error dismissing notification:", error);
    res.status(500).json({ error: "Failed to dismiss notification" });
  }
});

export default router;
