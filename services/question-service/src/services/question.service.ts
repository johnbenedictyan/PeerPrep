import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IQuestionCreateInput {
  title: string;
  content: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  authorId: number;
}

export const questionService = {
  createQuestion: async (body: IQuestionCreateInput) => {
    const question = await prisma.question.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: body.authorId,
      },
    });
    return question;
  },
};
