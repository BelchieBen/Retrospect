import { db } from "../db";

interface CreateUserArgs {
  name: string;
  email: string;
}

interface UpdateUserArgs {
  userId: string;
  name: string;
}

interface DeleteUserArgs {
  userId: string;
}

interface FindByIdArgs {
  userId: string;
}

export default class UserService {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async create({ name, email }: CreateUserArgs) {
    try {
      const user = await db.user.create({
        data: {
          name: name,
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update({ userId, name }: UpdateUserArgs) {
    try {
      const user = await db.user.update({
        data: {
          name: name,
        },
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete({ userId }: DeleteUserArgs) {
    try {
      await db.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById({ userId }: FindByIdArgs) {
    try {
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
