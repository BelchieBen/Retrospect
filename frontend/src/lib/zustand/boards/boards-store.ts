import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";
import { type Prisma, type Column } from "@prisma/client";

// Define the Column type without cards (cards will be handled separately)

// Keep the old types for backward compatibility during migration
export type ColumnWithCards = Prisma.ColumnGetPayload<{
  include: {
    cards: {
      include: {
        comments: { include: { createdBy: true } };
        createdBy: true;
        column: true;
      };
    };
  };
}>;

export type CardWithDetails = Prisma.CardGetPayload<{
  include: {
    comments: { include: { createdBy: true } };
    createdBy: true;
    column: true;
  };
}>;

// State interface - simplified to handle only columns and board-level settings
export type BoardsState = {
  // Store columns by board ID to support multiple boards
  columnsByBoardId: Record<string, Column[]>;
  // Board-level setting for showing archived cards
  showArchivedCards: Record<string, boolean>;
};

// Actions interface - focused only on columns and board-level settings
export type BoardsActions = {
  // Set columns for a specific board (accepts both old and new column types)
  setColumns: (boardId: string, columns: Column[] | ColumnWithCards[]) => void;

  // Toggle archived cards visibility for a specific board
  toggleShowArchivedCards: (boardId: string) => void;

  // Set archived cards visibility for a specific board
  setShowArchivedCards: (boardId: string, show: boolean) => void;

  // Clear all data for a specific board (useful when navigating away)
  clearBoardData: (boardId: string) => void;

  // Add a new column to a board
  addColumn: (boardId: string, column: Column) => void;

  // Remove a column from a board
  removeColumn: (boardId: string, columnId: string) => void;

  // Update column properties (like name)
  updateColumn: (
    boardId: string,
    columnId: string,
    updates: Partial<Column>,
  ) => void;
};

export type BoardsStore = BoardsState & BoardsActions;

export const defaultInitState: BoardsState = {
  columnsByBoardId: {},
  showArchivedCards: {},
};

export const createBoardsStore = (
  initState: BoardsState = defaultInitState,
) => {
  return createStore<BoardsStore>()(
    devtools(
      (set, _get) => ({
        ...initState,

        setColumns: (
          boardId: string,
          columns: Column[] | ColumnWithCards[],
        ) => {
          // Extract only column data, ignoring cards
          const columnsOnly = columns.map((col) => ({
            id: col.id,
            name: col.name,
            position: col.position,
            boardId: col.boardId,
            createdAt: col.createdAt,
            updatedAt: col.updatedAt,
            archived: "archived" in col ? col.archived : false,
            archivedAt: "archivedAt" in col ? col.archivedAt : null,
          })) as Column[];

          set(
            (state) => ({
              columnsByBoardId: {
                ...state.columnsByBoardId,
                [boardId]: columnsOnly,
              },
            }),
            undefined,
            "boards/setColumns",
          );
        },

        toggleShowArchivedCards: (boardId: string) => {
          set(
            (state) => ({
              showArchivedCards: {
                ...state.showArchivedCards,
                [boardId]: !state.showArchivedCards[boardId],
              },
            }),
            undefined,
            "boards/toggleShowArchivedCards",
          );
        },

        setShowArchivedCards: (boardId: string, show: boolean) => {
          set(
            (state) => ({
              showArchivedCards: {
                ...state.showArchivedCards,
                [boardId]: show,
              },
            }),
            undefined,
            "boards/setShowArchivedCards",
          );
        },

        clearBoardData: (boardId: string) => {
          set(
            (state) => {
              const newColumnsByBoardId = { ...state.columnsByBoardId };
              const newShowArchivedCards = { ...state.showArchivedCards };

              delete newColumnsByBoardId[boardId];
              delete newShowArchivedCards[boardId];

              return {
                columnsByBoardId: newColumnsByBoardId,
                showArchivedCards: newShowArchivedCards,
              };
            },
            undefined,
            "boards/clearBoardData",
          );
        },

        addColumn: (boardId: string, column: Column) => {
          set(
            (state) => {
              const currentColumns = state.columnsByBoardId[boardId] ?? [];
              return {
                columnsByBoardId: {
                  ...state.columnsByBoardId,
                  [boardId]: [...currentColumns, column],
                },
              };
            },
            undefined,
            "boards/addColumn",
          );
        },

        removeColumn: (boardId: string, columnId: string) => {
          set(
            (state) => {
              const columns = state.columnsByBoardId[boardId];
              if (!columns) return state;

              return {
                columnsByBoardId: {
                  ...state.columnsByBoardId,
                  [boardId]: columns.filter((col) => col.id !== columnId),
                },
              };
            },
            undefined,
            "boards/removeColumn",
          );
        },

        updateColumn: (
          boardId: string,
          columnId: string,
          updates: Partial<Column>,
        ) => {
          set(
            (state) => {
              const columns = state.columnsByBoardId[boardId];
              if (!columns) return state;

              const columnIndex = columns.findIndex(
                (col) => col.id === columnId,
              );
              if (columnIndex === -1) return state;

              // Apply updates while preserving existing values and filtering undefined
              const currentColumn = columns[columnIndex]!; // We already checked it exists
              const updatedColumns = [...columns];
              updatedColumns[columnIndex] = {
                id: updates.id ?? currentColumn.id,
                name:
                  updates.name !== undefined
                    ? updates.name
                    : currentColumn.name,
                position: updates.position ?? currentColumn.position,
                boardId: updates.boardId ?? currentColumn.boardId,
                createdAt: updates.createdAt ?? currentColumn.createdAt,
                updatedAt: updates.updatedAt ?? currentColumn.updatedAt,
              };

              return {
                columnsByBoardId: {
                  ...state.columnsByBoardId,
                  [boardId]: updatedColumns,
                },
              };
            },
            undefined,
            "boards/updateColumn",
          );
        },
      }),
      {
        name: "Retrospect/boards-store", // Custom name for Redux DevTools
        enabled: process.env.NODE_ENV === "development", // Only enable in development
      },
    ),
  );
};
