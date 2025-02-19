"use client";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { WebSocketProvider } from "~/lib/WebsocketContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Providers({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session | null }>) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>
          <WebSocketProvider>{children}</WebSocketProvider>
        </DndProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
