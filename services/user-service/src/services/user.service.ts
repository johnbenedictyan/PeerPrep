import { PrismaClient } from "@prisma/client";
import { kafka } from "../kafka/kafka";

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
    const producer = kafka.producer();
    await producer.connect();
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    await producer.send({
      topic: "create-user",
      messages: [{ value: "User Created:", key: user.id.toString() }],
    });
    await producer.disconnect();
    return user;
  },
};
