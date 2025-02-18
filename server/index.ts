import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import PostgresNotifier from "pg-realtime";
import "dotenv/config";
import postsRoutes from "./routes/posts";
import usersRoutes from "./routes/users";

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

app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);
