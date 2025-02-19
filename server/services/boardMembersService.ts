import { db } from "../db";

interface AddToBoardArgs {
  id: string;
  boardId: string;
}

interface RemoveFromBoardArgs {
  id: string;
  boardId: string;
}

interface FindByIdArgs {
  id: string;
  boardId: string;
}

export default class BoardMembersService {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async addToBoard({ id, boardId }: AddToBoardArgs) {
    try {
      // Add implementation here
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeFromBoard({ id, boardId }: RemoveFromBoardArgs) {
    try {
      // Add implementation here
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById({ id, boardId }: FindByIdArgs) {
    try {
      // Add implementation here
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
