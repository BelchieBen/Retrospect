import { db } from "../db";
export default class BoardService {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async create(title: string, ownerId: string) {
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

  async update(boardId: string, title: string) {
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

  async delete(boardId: string) {
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

  async findById(boardId: string) {
    try {
      const board = await db.boards.findFirst({
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
}
