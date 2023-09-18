import { PrismaClient } from "@prisma/client";

import {
  ICreatedMatchingRequest,
  IMatchingCreateInput,
  IMatchingRequestCreateInput,
} from "../interfaces/IMatching";
import MatchingEventProducer from "../kafka/producer/producer";
import { IMatchingService } from "./matching.service.interface";

const prisma = new PrismaClient();

class MatchingService implements IMatchingService {
  private producer: MatchingEventProducer;

  constructor(producer: MatchingEventProducer) {
    this.producer = producer;
  }

  public async updateMatchingRequest(body: ICreatedMatchingRequest) {
    const matchingRequest = await prisma.matchingRequest.update({
      where: {
        id: body.id,
      },
      data: body,
    });
    return matchingRequest;
  }

  public async createMatchingRequest(body: IMatchingRequestCreateInput) {
    const matchingRequest = await prisma.matchingRequest.create({
      data: body,
    });
    if (matchingRequest) {
      await this.producer.requestMatch(matchingRequest);
    }
    return matchingRequest;
  }

  public async createMatching(body: IMatchingCreateInput) {
    const matching = await prisma.matching.create({
      data: body,
    });
    return matching;
  }

  public async findMatchRequest(
    body: ICreatedMatchingRequest
  ): Promise<ICreatedMatchingRequest | null> {
    return prisma.matchingRequest.findFirst({
      where: {
        id: body.id,
      },
    });
  }

  public async findMatch(
    body: ICreatedMatchingRequest
  ): Promise<ICreatedMatchingRequest | null> {
    let foundMatchRequest;
    if (body.questionId) {
      foundMatchRequest = await prisma.matchingRequest.findFirst({
        where: {
          questionId: body.questionId,
          userId: {
            not: body.userId,
          },
          success: false,
        },
      });
    }
    foundMatchRequest = await prisma.matchingRequest.findFirst({
      where: {
        difficulty: body.difficulty,
        userId: {
          not: body.userId,
        },
        success: false,
      },
    });
    return foundMatchRequest;
  }
}

export default MatchingService;
