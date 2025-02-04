import express from "express";
import cors from "cors";
import { db } from "./db";
import { Server } from "socket.io";
import http from "http";
import PostgresNotifier from "pg-realtime";
import "dotenv/config";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const port = 8000;

const notifier = new PostgresNotifier(process.env.DATABASE_URL!);
const postsChannel = notifier.channel("posts");

io.on("connection", (socket) => {
  socket.join("posts");
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

postsChannel.subscribe((payload) => {
  io.to("posts").emit("post_updated", payload);
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hi from backend");
});

app.get("/posts", async (req, res) => {
  const posts = await db.post.findMany();
  res.json(posts);
});

app.post("/post", async (req, res) => {
  const { title } = req.body as { title: string };
  const post = await db.post.create({
    data: {
      name: title,
    },
  });

  postsChannel.notify(JSON.stringify(post));
  res.json(post);
});

app.post("/user", async (req, res) => {
  const { name } = req.body as { name: string };
  const post = await db.user.create({
    data: {
      name: name,
    },
  });
  res.json(post);
});
