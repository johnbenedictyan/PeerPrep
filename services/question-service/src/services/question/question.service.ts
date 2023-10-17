import { PrismaClient } from "@prisma/client";
import assert from "assert";

import EventProducer from "../../events/producers/main.interface";
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

  public async create(body: QuestionCreateDTO): Promise<Question> {
    try {
      const question = await this.prismaClient.question.create({
        data: body,
      });
      return question;
    } catch (error) {
      throw new Error("Failed to create question.");
    }
  }

  public async findById(id: number): Promise<Question | null> {
    assert(
      id,
      "id should be defined in the question service find by id method",
    );
    try {
      const question = await this.prismaClient.question.findUnique({
        where: {
          id,
        },
      });
      return question;
    } catch (error) {
      throw new Error("Failed to find question.");
    }
  }

  public async findOne(body: OptionalQuestion): Promise<Question | null> {
    try {
      const question = await this.prismaClient.question.findFirst({
        where: body,
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
    body: Partial<QuestionUpdateDTO>,
  ): Promise<Question> {
    assert(id, "id should be defined in the question service update method");
    try {
      return await this.prismaClient.question.update({
        where: {
          id,
        },
        data: body,
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
