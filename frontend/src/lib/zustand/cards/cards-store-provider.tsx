"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";

import {
  createCardsStore,
  defaultInitState,
  type CardsStore,
} from "./cards-store";

export type CardsStoreApi = ReturnType<typeof createCardsStore>;

export const CardsStoreContext = createContext<CardsStoreApi | undefined>(
  undefined,
);

export interface CardsStoreProviderProps {
  children: ReactNode;
}

export const CardsStoreProvider = ({ children }: CardsStoreProviderProps) => {
  const storeRef = useRef<CardsStoreApi>();
  storeRef.current ??= createCardsStore(defaultInitState);

  return (
    <CardsStoreContext.Provider value={storeRef.current}>
      {children}
    </CardsStoreContext.Provider>
  );
};

export const useCardsStore = <T,>(selector: (store: CardsStore) => T): T => {
  const cardsStoreContext = useContext(CardsStoreContext);

  if (!cardsStoreContext) {
    throw new Error(`useCardsStore must be used within CardsStoreProvider`);
  }

  return useStore(cardsStoreContext, selector);
};
