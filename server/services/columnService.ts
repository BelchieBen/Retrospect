import { db } from "../db";

interface CreateColumnArgs {
  boardId: string;
  position: number;
  name: string;
}

interface UpdateColumnArgs {
  boardId: string;
  columnId: string;
  name: string;
  position: number;
}

interface DeleteColumnArgs {
  boardId: string;
  columnId: string;
}

interface FindColumnsByBoardIdArgs {
  boardId: string;
}

export default class ColumnService {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async create({ boardId, position, name }: CreateColumnArgs) {
    try {
      const column = await db.column.create({
        data: {
          name,
          boardId,
          position,
        },
      });
      return column;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update({ boardId, columnId, name, position }: UpdateColumnArgs) {
    try {
      const column = await db.column.update({
        data: {
          name: name,
          position: position,
          boardId: boardId,
        },
        where: {
          id: columnId,
        },
      });
      return column;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete({ boardId, columnId }: DeleteColumnArgs) {
    try {
      await db.column.delete({
        where: {
          id: columnId,
          boardId: boardId,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findColumnsByBoardId({ boardId }: FindColumnsByBoardIdArgs) {
    try {
      const board = await db.column.findMany({
        where: {
          boardId: boardId,
        },
      });
      return board;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
