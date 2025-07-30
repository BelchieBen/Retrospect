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
import { poolConfig } from "db";

const app = express();
const server = http.createServer(app);
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

io.on("connection", (socket) => {
  socket.join("posts");
  socket.join("columns");
  socket.join("cards");
  socket.join("comments");
  socket.join("boards");
  socket.join("feedback");
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
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
  console.log("Board channel payload:", payload);
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

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hi from backend");
});

app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);
app.use("/boards", boardRoutes);
app.use("/columns", columnRoutes);
app.use("/cards", cardRoutes);
app.use("/comments", commentRoutes);
app.use("/feedback", feedbackRoutes);
