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

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const port = 8000;

const postsNotifier = new PostgresNotifier(process.env.DATABASE_URL!);
const postsChannel = postsNotifier.channel("posts");

const columnsNotifier = new PostgresNotifier(process.env.DATABASE_URL!);
const columnsChannel = columnsNotifier.channel("columns");

const boardMembersNotifier = new PostgresNotifier(process.env.DATABASE_URL!);
const boardMembersChannel = boardMembersNotifier.channel("board_members");

const cardsNotifier = new PostgresNotifier(process.env.DATABASE_URL!);
const cardsChannel = cardsNotifier.channel("cards");

const commentsNotifier = new PostgresNotifier(process.env.DATABASE_URL!);
const commentsChannel = commentsNotifier.channel("comments");

io.on("connection", (socket) => {
  socket.join("posts");
  socket.join("columns");
  socket.join("cards");
  socket.join("comments");
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
