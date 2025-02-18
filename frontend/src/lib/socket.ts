import { io, type Socket } from "socket.io-client";
import { env } from "~/env";

let socket: Socket;

export const connectSocket = () => {
  socket = io(env.NEXT_PUBLIC_SOCKET_URL);
  return socket;
};

export function disconnectSocket() {
  if (socket) {
    console.log("Disconnecting socket...");
    socket.disconnect();
  }
}

export function getSocket() {
  return socket;
}
