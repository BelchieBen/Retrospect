import React, {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
  useMemo,
  useState,
} from "react";
import { connectSocket, disconnectSocket } from "./socket";
import { type Socket } from "socket.io-client";

interface WebSocketProviderProps {
  children: ReactNode;
}
interface WebSocketContextType {
  socket: Socket | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = connectSocket();
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to socket in WebSocketProvider");
      });
      setSocket(socket);
    }
    return () => {
      disconnectSocket();
    };
  }, []);

  const value = useMemo(() => {
    return { socket };
  }, [socket]);

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
