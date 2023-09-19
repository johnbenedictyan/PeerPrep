import { PrismaClient } from "@prisma/client";

import {
  ICreatedMatchingRequest,
  IMatchingCreateInput,
  IMatchingRequestCreateInput,
} from "../../interfaces/IMatching";
import MatchingEventProducer from "../../kafka/producer/producer";
import { IMatchingService } from "./matching.service.interface";

class MatchingService implements IMatchingService {
  private producer: MatchingEventProducer;
  private prismaClient: PrismaClient;

  constructor(producer: MatchingEventProducer, prismaClient: PrismaClient) {
    this.producer = producer;
    this.prismaClient = prismaClient;
  }

  public async updateMatchingRequest(body: ICreatedMatchingRequest) {
    const matchingRequest = await this.prismaClient.matchingRequest.update({
      where: {
        id: body.id,
      },
      data: body,
    });
    return matchingRequest;
  }

  public async createMatchingRequest(body: IMatchingRequestCreateInput) {
    const matchingRequest = await this.prismaClient.matchingRequest.create({
      data: body,
    });
    if (matchingRequest) {
      await this.producer.requestMatch(matchingRequest);
    }
    return matchingRequest;
  }

  public async createMatching(body: IMatchingCreateInput) {
    const matching = await this.prismaClient.matching.create({
      data: body,
    });
    return matching;
  }

  public async findMatchRequest(
    body: ICreatedMatchingRequest
  ): Promise<ICreatedMatchingRequest | null> {
    return this.prismaClient.matchingRequest.findFirst({
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
      foundMatchRequest = await this.prismaClient.matchingRequest.findFirst({
        where: {
          questionId: body.questionId,
          userId: {
            not: body.userId,
          },
          success: false,
        },
      });
    }
    foundMatchRequest = await this.prismaClient.matchingRequest.findFirst({
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
