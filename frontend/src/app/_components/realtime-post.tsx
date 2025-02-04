"use client";
import { useEffect } from "react";
import { useWebSocket } from "~/lib/WebsocketContext";
import axios, { type AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { backendUrl } from "~/constants/backendUrl";
import { type Post } from "~/types/Post";

export default function Posts() {
  const { socket } = useWebSocket();
  const { data, refetch } = useQuery("posts", async () => {
    const response: AxiosResponse<Post[]> = await axios.get(
      `${backendUrl}/posts`,
    );
    return response.data;
  });

  useEffect(() => {
    if (socket) {
      socket.on("post_updated", async () => {
        await refetch();
      });
    }
  }, [socket]);

  return (
    <div>
      <p className="text-2xl font-medium">Posts</p>
      <ul>{data?.map((post) => <li key={post.id}>{post.name}</li>)}</ul>
    </div>
  );
}
