import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import PostgresNotifier from "pg-realtime";
import "dotenv/config";
import postsRoutes from "./routes/posts";
import usersRoutes from "./routes/users";
import boardRoutes from "./routes/boards";
import columnRoutes from "./routes/columns";
import cardRoutes from "./routes/cards";
import commentRoutes from "./routes/comments";
import feedbackRoutes from "./routes/feedback";
import notificationRoutes from "./routes/notifications";
import memberRoutes from "./routes/member";
import { poolConfig } from "db";
import { logger, loggerUtils } from "./logger";
import client from "prom-client";
import { hmacAuthMiddleware } from "middleware/hmac-auth";

const app = express();
const server = http.createServer(app);

// Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "endpoint", "status_code"],
  registers: [register], // Register the counter
});

const requestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "endpoint", "status_code"],
  buckets: [0.1, 0.5, 1, 2, 5], // Define buckets for response times
  registers: [register],
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const port = 8000;

const postsNotifier = new PostgresNotifier(poolConfig);
const postsChannel = postsNotifier.channel("posts");

const columnsNotifier = new PostgresNotifier(poolConfig);
const columnsChannel = columnsNotifier.channel("columns");

const boardMembersNotifier = new PostgresNotifier(poolConfig);
const boardMembersChannel = boardMembersNotifier.channel("board_members");

const boardNotifier = new PostgresNotifier(poolConfig);
const boardChannel = boardNotifier.channel("boards");

const cardsNotifier = new PostgresNotifier(poolConfig);
const cardsChannel = cardsNotifier.channel("cards");

const commentsNotifier = new PostgresNotifier(poolConfig);
const commentsChannel = commentsNotifier.channel("comments");

const feedbackNotifier = new PostgresNotifier(poolConfig);
const feedbackChannel = feedbackNotifier.channel("feedback");

const notificationsNotifier = new PostgresNotifier(poolConfig);
const notificationsChannel = notificationsNotifier.channel("notifications");

io.on("connection", (socket) => {
  socket.join("posts");
  socket.join("columns");
  socket.join("cards");
  socket.join("comments");
  socket.join("boards");
  socket.join("feedback");
  socket.join("notifications");
  loggerUtils.socketLogger.info({ socketId: socket.id }, "User connected");

  socket.on("disconnect", () => {
    loggerUtils.socketLogger.info({ socketId: socket.id }, "User disconnected");
  });
});

postsChannel.subscribe((payload) => {
  io.to("posts").emit("post_updated", payload);
});

columnsChannel.subscribe((payload) => {
  io.to("columns").emit("column_updated", payload);
});

cardsChannel.subscribe((payload) => {
  io.to("cards").emit("card_updated", payload);
});

commentsChannel.subscribe((payload) => {
  io.to("comments").emit("comment_updated", payload);
});

boardChannel.subscribe((payload) => {
  loggerUtils.notificationLogger.debug(
    { payload },
    "Board channel payload received"
  );
  const data = JSON.parse(payload ?? "{}");
  if (data?.action === "join") {
    io.to("boards").emit("user_joined", { userId: data.userId });
  } else {
    io.to("boards").emit("board_updated", payload);
  }
});

feedbackChannel.subscribe((payload) => {
  io.to("feedback").emit("feedback_updated", payload);
});

notificationsChannel.subscribe((payload) => {
  loggerUtils.notificationLogger.debug(
    { payload },
    "Notification channel payload received"
  );
  const data = JSON.parse(payload ?? "{}");
  if (data?.action === "create") {
    // Emit to specific user room
    io.to(`user-${data.userId}`).emit(
      "notification_created",
      data.notification
    );
    // Also emit to general notifications room for count updates
    io.to("notifications").emit("notification_updated", payload);
  }
});

server.listen(port, () => {
  logger.info(
    { port, environment: process.env.NODE_ENV },
    "Server started successfully"
  );
});

app.use(
  cors({
    origin: "*",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-hmac-signature",
      "x-hmac-payload",
    ],
  })
);
app.use(express.json());
app.use(hmacAuthMiddleware);

// Request logging middleware - log all incoming requests
app.use(loggerUtils.requestLogger);

// Metrics middleware - MUST be before routes to capture all requests
app.use((req, res, next) => {
  // Skip metrics collection for the /metrics endpoint itself
  if (req.url === "/metrics") {
    return next();
  }

  const start = Date.now();

  // Capture response when it finishes
  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000; // Convert to seconds
    const endpoint = req.route?.path || req.url; // Use route path if available, fallback to URL

    const labels = {
      method: req.method,
      endpoint: endpoint,
      status_code: res.statusCode.toString(),
    };

    requestCounter.inc(labels);
    requestDuration.observe(labels, duration);
  });

  next();
});

app.get("/", (req, res) => {
  res.json("Hi from backend");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);
app.use("/boards", boardRoutes);
app.use("/columns", columnRoutes);
app.use("/cards", cardRoutes);
app.use("/comments", commentRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/notifications", notificationRoutes);
app.use("/members", memberRoutes);
