import { db } from "../db";

interface CreateBoardArgs {
  title: string;
  ownerId: string;
}

interface UpdateBoardArgs {
  boardId: string;
  title: string;
}

interface DeleteBoardArgs {
  boardId: string;
}

interface FindByIdArgs {
  boardId: string;
}

export default class BoardService {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async create({ title, ownerId }: CreateBoardArgs) {
    try {
      const board = await db.boards.create({
        data: {
          name: title,
          ownerId: ownerId,
          BoardMembers: {
            create: {
              userId: ownerId,
            },
          },
        },
      });
      return board;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update({ boardId, title }: UpdateBoardArgs) {
    try {
      const board = await db.boards.update({
        data: {
          name: title,
        },
        where: {
          id: boardId,
        },
      });
      return board;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete({ boardId }: DeleteBoardArgs) {
    try {
      await db.boards.delete({
        where: {
          id: boardId,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById({ boardId }: FindByIdArgs) {
    try {
      const board = await db.boards.findUnique({
        where: {
          id: boardId,
        },
        include: { columns: { include: { cards: true } } },
      });
      return board;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
