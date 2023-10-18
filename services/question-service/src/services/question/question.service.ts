import { PrismaClient } from "@prisma/client";
import assert from "assert";

import EventProducer from "../../events/producers/main.interface";
import { FullQuestionCreateDTO } from "../../interfaces/fullQuestion/createDTO";
import { FullQuestion } from "../../interfaces/fullQuestion/object";
import { FullQuestionUpdateDTO } from "../../interfaces/fullQuestion/updateDTO";
import { QuestionCreateDTO } from "../../interfaces/question/createDTO";
import { OptionalQuestion, Question } from "../../interfaces/question/object";
import { QuestionUpdateDTO } from "../../interfaces/question/updateDTO";
import Service from "../service.interface";

class QuestionService
  implements Service<QuestionCreateDTO, QuestionUpdateDTO, Question>
{
  constructor(
    private readonly eventProducer: EventProducer<Question>,
    private readonly prismaClient: PrismaClient,
  ) {}

  public async create(body: FullQuestionCreateDTO): Promise<FullQuestion> {
    const { initialCodes, ...rest } = body;
    try {
      const question = await this.prismaClient.question.create({
        data: {
          ...rest,
          initialCodes: {
            create: initialCodes,
          },
        },
        include: {
          initialCodes: true,
        },
      });
      return question;
    } catch (error) {
      throw new Error("Failed to create question.");
    }
  }

  public async findById(id: number): Promise<FullQuestion | null> {
    assert(
      id,
      "id should be defined in the question service find by id method",
    );
    try {
      const question = await this.prismaClient.question.findUnique({
        where: {
          id,
        },
        include: {
          initialCodes: true,
        },
      });
      return question;
    } catch (error) {
      throw new Error("Failed to find question.");
    }
  }

  public async findOne(body: OptionalQuestion): Promise<Question | null> {
    const { examples, constraints, ...rest } = body;
    try {
      const question = await this.prismaClient.question.findFirst({
        where: rest,
      });
      return question;
    } catch (error) {
      throw new Error("Failed to find question.");
    }
  }

  public async findAll(): Promise<Question[]> {
    try {
      const questions = await this.prismaClient.question.findMany();
      return questions;
    } catch (error) {
      throw new Error("Failed to find questions.");
    }
  }

  public async update(
    id: number,
    body: Partial<FullQuestionUpdateDTO>,
  ): Promise<FullQuestion> {
    assert(id, "id should be defined in the question service update method");
    const { initialCodes, ...rest } = body;
    try {
      const updatedQuestionXRelations = await this.prismaClient.question.update(
        {
          where: {
            id,
          },
          data: {
            ...rest,
          },
          include: {
            initialCodes: true,
          },
        },
      );

      if (!initialCodes) {
        return updatedQuestionXRelations;
      }

      await this.prismaClient.question.update({
        where: {
          id,
        },
        data: {
          initialCodes: {
            set: [],
          },
        },
      });
      return await this.prismaClient.question.update({
        where: {
          id,
        },
        data: {
          initialCodes: {
            connectOrCreate: initialCodes.map((x) => ({
              where: {
                language_questionId: {
                  language: x.language,
                  questionId: id,
                },
              },
              create: {
                language: x.language,
                code: x.code,
                language_questionId: id,
              },
            })),
          },
        },
        include: {
          initialCodes: true,
        },
      });
    } catch (error) {
      throw new Error("Failed to update question.");
    }
  }

  public async delete(id: number): Promise<Question> {
    assert(id, "id should be defined in the question service delete method");
    try {
      return await this.prismaClient.question.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error("Failed to delete question.");
    }
  }
}

export default QuestionService;
