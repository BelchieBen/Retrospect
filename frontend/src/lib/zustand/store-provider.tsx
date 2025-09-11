"use client";

import { type ReactNode } from "react";
import { BoardsStoreProvider } from "~/lib/zustand/boards/boards-store-provider";
import { CardsStoreProvider } from "~/lib/zustand/cards/cards-store-provider";

interface StoreProviderProps {
  children: ReactNode;
}

/**
 * Root store provider that wraps all Zustand stores
 * This allows us to centrally manage all stores and maintain a clean provider hierarchy
 */
export default function StoreProvider({ children }: StoreProviderProps) {
  return (
    <BoardsStoreProvider>
      <CardsStoreProvider>{children}</CardsStoreProvider>
    </BoardsStoreProvider>
  );
}
