import { db } from "../db";

interface CreateCommentArgs {
  data: any;
}

interface UpdateCommentArgs {
  id: string;
  data: any;
}

interface RemoveCommentArgs {
  id: string;
}

interface DestroyAllCommentsArgs {
  ids: string[];
}

interface FindCommentByIdArgs {
  id: string;
}

interface RearrangeCommentArgs {
  id: string;
  order: number;
}

export default class CommentService {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async create({ data }: CreateCommentArgs) {
    try {
      // Add implementation here
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update({ id, data }: UpdateCommentArgs) {
    try {
      // Add implementation here
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove({ id }: RemoveCommentArgs) {
    try {
      // Add implementation here
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async destroyAll({ ids }: DestroyAllCommentsArgs) {
    try {
      // Add implementation here
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById({ id }: FindCommentByIdArgs) {
    try {
      // Add implementation here
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async rearrange({ id, order }: RearrangeCommentArgs) {
    try {
      // Add implementation here
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
