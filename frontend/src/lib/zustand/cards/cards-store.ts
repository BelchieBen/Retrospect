import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";
import { type Prisma } from "@prisma/client";

// Define the Card type with all necessary relations
export type CardWithDetails = Prisma.CardGetPayload<{
  include: {
    comments: { include: { createdBy: true } };
    createdBy: true;
    column: true;
  };
}>;

// State interface - organize cards by column ID for efficient lookups
export type CardsState = {
  // Store cards by column ID
  cardsByColumnId: Record<string, CardWithDetails[]>;
  // Track which columns are currently loading
  loadingColumns: Set<string>;
  // Store the currently active (dragging) card
  activeCard: CardWithDetails | null;
  // Track if archived cards should be shown for specific columns
  showArchivedCards: Record<string, boolean>;
};

// Actions interface
export type CardsActions = {
  // Set cards for a specific column
  setCardsForColumn: (columnId: string, cards: CardWithDetails[]) => void;

  // Add a single card to a column (optimistic update)
  addCard: (columnId: string, card: CardWithDetails) => void;

  // Update a single card (optimistic update)
  updateCard: (cardId: string, updates: Partial<CardWithDetails>) => void;

  // Remove a card (optimistic update)
  removeCard: (cardId: string) => void;

  // Move a card between columns (optimistic update)
  moveCard: (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    newPosition: number,
  ) => void;

  // Reorder a card within the same column (optimistic update)
  reorderCard: (columnId: string, cardId: string, newPosition: number) => void;

  // Set the currently active (dragging) card
  setActiveCard: (card: CardWithDetails | null) => void;

  // Set loading state for a column
  setColumnLoading: (columnId: string, loading: boolean) => void;

  // Clear all cards for a column
  clearColumn: (columnId: string) => void;

  // Clear all data (useful when navigating away from board)
  clearAllData: () => void;

  // Set archived cards visibility for a column
  setShowArchivedCards: (columnId: string, show: boolean) => void;

  // Helper to find a card across all columns
  findCard: (
    cardId: string,
  ) => { card: CardWithDetails; columnId: string } | null;
};

export type CardsStore = CardsState & CardsActions;

export const defaultInitState: CardsState = {
  cardsByColumnId: {},
  loadingColumns: new Set(),
  activeCard: null,
  showArchivedCards: {},
};

export const createCardsStore = (initState: CardsState = defaultInitState) => {
  return createStore<CardsStore>()(
    devtools(
      (set, get) => ({
        ...initState,

        setCardsForColumn: (columnId: string, cards: CardWithDetails[]) => {
          set(
            (state) => ({
              cardsByColumnId: {
                ...state.cardsByColumnId,
                [columnId]: cards,
              },
            }),
            undefined,
            "cards/setCardsForColumn",
          );
        },

        addCard: (columnId: string, card: CardWithDetails) => {
          set(
            (state) => {
              const currentCards = state.cardsByColumnId[columnId] ?? [];
              return {
                cardsByColumnId: {
                  ...state.cardsByColumnId,
                  [columnId]: [...currentCards, card],
                },
              };
            },
            undefined,
            "cards/addCard",
          );
        },

        updateCard: (cardId: string, updates: Partial<CardWithDetails>) => {
          set(
            (state) => {
              const newCardsByColumnId = { ...state.cardsByColumnId };
              let updated = false;

              // Find the card across all columns and update it
              Object.keys(newCardsByColumnId).forEach((columnId) => {
                const cards = newCardsByColumnId[columnId];
                if (cards) {
                  const cardIndex = cards.findIndex(
                    (card) => card.id === cardId,
                  );
                  if (cardIndex !== -1) {
                    const updatedCards = [...cards];
                    const currentCard = updatedCards[cardIndex]!; // We know it exists

                    // Apply updates while filtering out undefined values
                    updatedCards[cardIndex] = {
                      id: updates.id ?? currentCard.id,
                      name:
                        updates.name !== undefined
                          ? updates.name
                          : currentCard.name,
                      description:
                        updates.description !== undefined
                          ? updates.description
                          : currentCard.description,
                      position: updates.position ?? currentCard.position,
                      columnId: updates.columnId ?? currentCard.columnId,
                      boardId: updates.boardId ?? currentCard.boardId,
                      createdById:
                        updates.createdById ?? currentCard.createdById,
                      archived: updates.archived ?? currentCard.archived,
                      archivedAt:
                        updates.archivedAt !== undefined
                          ? updates.archivedAt
                          : currentCard.archivedAt,
                      gifUrl:
                        updates.gifUrl !== undefined
                          ? updates.gifUrl
                          : currentCard.gifUrl,
                      createdAt: updates.createdAt ?? currentCard.createdAt,
                      updatedAt: updates.updatedAt ?? currentCard.updatedAt,
                      comments: updates.comments ?? currentCard.comments,
                      createdBy: updates.createdBy ?? currentCard.createdBy,
                      column:
                        updates.column !== undefined
                          ? updates.column
                          : currentCard.column,
                    };
                    newCardsByColumnId[columnId] = updatedCards;
                    updated = true;
                  }
                }
              });

              return updated ? { cardsByColumnId: newCardsByColumnId } : state;
            },
            undefined,
            "cards/updateCard",
          );
        },

        removeCard: (cardId: string) => {
          set(
            (state) => {
              const newCardsByColumnId = { ...state.cardsByColumnId };
              let removed = false;

              // Find and remove the card from its column
              Object.keys(newCardsByColumnId).forEach((columnId) => {
                const cards = newCardsByColumnId[columnId];
                if (cards) {
                  const filteredCards = cards.filter(
                    (card) => card.id !== cardId,
                  );
                  if (filteredCards.length !== cards.length) {
                    newCardsByColumnId[columnId] = filteredCards;
                    removed = true;
                  }
                }
              });

              return removed ? { cardsByColumnId: newCardsByColumnId } : state;
            },
            undefined,
            "cards/removeCard",
          );
        },

        moveCard: (
          cardId: string,
          fromColumnId: string,
          toColumnId: string,
          newPosition: number,
        ) => {
          set(
            (state) => {
              const newCardsByColumnId = { ...state.cardsByColumnId };
              const fromCards = newCardsByColumnId[fromColumnId] ?? [];
              const toCards = newCardsByColumnId[toColumnId] ?? [];

              // Find the card to move
              const cardIndex = fromCards.findIndex(
                (card) => card.id === cardId,
              );
              if (cardIndex === -1) return state;

              const cardToMove = fromCards[cardIndex];
              if (!cardToMove) return state;

              // Remove from source column
              const updatedFromCards = fromCards.filter(
                (card) => card.id !== cardId,
              );

              // Update card's column reference and position
              const updatedCard = {
                ...cardToMove,
                columnId: toColumnId,
                position: newPosition,
              };

              // Add to target column at the specified position
              const updatedToCards = [...toCards];
              const insertPosition = Math.min(
                newPosition,
                updatedToCards.length,
              );
              updatedToCards.splice(insertPosition, 0, updatedCard);

              // Update positions of other cards in target column
              updatedToCards.forEach((card, index) => {
                if (index >= insertPosition && card.id !== cardId) {
                  card.position = index;
                }
              });

              return {
                cardsByColumnId: {
                  ...newCardsByColumnId,
                  [fromColumnId]: updatedFromCards,
                  [toColumnId]: updatedToCards,
                },
              };
            },
            undefined,
            "cards/moveCard",
          );
        },

        reorderCard: (
          columnId: string,
          cardId: string,
          newPosition: number,
        ) => {
          set(
            (state) => {
              const cards = state.cardsByColumnId[columnId];
              if (!cards) return state;

              const cardIndex = cards.findIndex((card) => card.id === cardId);
              if (cardIndex === -1) return state;

              const updatedCards = [...cards];
              const [movedCard] = updatedCards.splice(cardIndex, 1);
              if (!movedCard) return state;

              // Update the card's position
              movedCard.position = newPosition;

              // Insert at new position
              const insertPosition = Math.min(newPosition, updatedCards.length);
              updatedCards.splice(insertPosition, 0, movedCard);

              // Update positions of affected cards
              updatedCards.forEach((card, index) => {
                card.position = index;
              });

              return {
                cardsByColumnId: {
                  ...state.cardsByColumnId,
                  [columnId]: updatedCards,
                },
              };
            },
            undefined,
            "cards/reorderCard",
          );
        },

        setActiveCard: (card: CardWithDetails | null) => {
          set({ activeCard: card }, undefined, "cards/setActiveCard");
        },

        setColumnLoading: (columnId: string, loading: boolean) => {
          set(
            (state) => {
              const newLoadingColumns = new Set(state.loadingColumns);
              if (loading) {
                newLoadingColumns.add(columnId);
              } else {
                newLoadingColumns.delete(columnId);
              }
              return { loadingColumns: newLoadingColumns };
            },
            undefined,
            "cards/setColumnLoading",
          );
        },

        clearColumn: (columnId: string) => {
          set(
            (state) => {
              const newCardsByColumnId = { ...state.cardsByColumnId };
              delete newCardsByColumnId[columnId];

              const newLoadingColumns = new Set(state.loadingColumns);
              newLoadingColumns.delete(columnId);

              const newShowArchivedCards = { ...state.showArchivedCards };
              delete newShowArchivedCards[columnId];

              return {
                cardsByColumnId: newCardsByColumnId,
                loadingColumns: newLoadingColumns,
                showArchivedCards: newShowArchivedCards,
              };
            },
            undefined,
            "cards/clearColumn",
          );
        },

        clearAllData: () => {
          set(defaultInitState, undefined, "cards/clearAllData");
        },

        setShowArchivedCards: (columnId: string, show: boolean) => {
          set(
            (state) => ({
              showArchivedCards: {
                ...state.showArchivedCards,
                [columnId]: show,
              },
            }),
            undefined,
            "cards/setShowArchivedCards",
          );
        },

        findCard: (cardId: string) => {
          const state = get();
          for (const [columnId, cards] of Object.entries(
            state.cardsByColumnId,
          )) {
            const card = cards.find((c) => c.id === cardId);
            if (card) {
              return { card, columnId };
            }
          }
          return null;
        },
      }),
      {
        name: "Retrospect/cards-store", // Custom name for Redux DevTools
        enabled: process.env.NODE_ENV === "development", // Only enable in development
      },
    ),
  );
};
