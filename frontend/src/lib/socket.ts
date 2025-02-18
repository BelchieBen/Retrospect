import { io, type Socket } from "socket.io-client";

const URL = process.env.SOCKET_URL;

let socket: Socket;

export const connectSocket = () => {
  socket = io(URL);
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
