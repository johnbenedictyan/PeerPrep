import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IUserCreateInput {
  email: string;
  name?: string | null;
  password: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export const userService = {
  createUser: async (body: IUserCreateInput) => {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    return user;
  },
};
