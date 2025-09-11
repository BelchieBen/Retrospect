"use client";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WebSocketProvider } from "~/lib/WebsocketContext";
import StoreProvider from "~/lib/zustand/store-provider";

export default function Providers({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session | null }>) {
  const queryClient = new QueryClient();
  return (
    <StoreProvider>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <WebSocketProvider>{children}</WebSocketProvider>
        </QueryClientProvider>
      </SessionProvider>
    </StoreProvider>
  );
}
