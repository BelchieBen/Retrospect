"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type BoardsStore,
  createBoardsStore,
  defaultInitState,
} from "~/lib/zustand/boards/boards-store";

export type BoardsStoreApi = ReturnType<typeof createBoardsStore>;

export const BoardsStoreContext = createContext<BoardsStoreApi | undefined>(
  undefined,
);

export interface BoardsStoreProviderProps {
  children: ReactNode;
}

export const BoardsStoreProvider = ({ children }: BoardsStoreProviderProps) => {
  const storeRef = useRef<BoardsStoreApi>();
  storeRef.current ??= createBoardsStore(defaultInitState);

  return (
    <BoardsStoreContext.Provider value={storeRef.current}>
      {children}
    </BoardsStoreContext.Provider>
  );
};

export const useBoardsStore = <T,>(selector: (store: BoardsStore) => T): T => {
  const boardsStoreContext = useContext(BoardsStoreContext);

  if (!boardsStoreContext) {
    throw new Error(`useBoardsStore must be used within BoardsStoreProvider`);
  }

  return useStore(boardsStoreContext, selector);
};
