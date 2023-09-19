import { PrismaClient } from "@prisma/client";

import {
  IMatchingCreateInput,
  IMatchingRequestCreateInput,
} from "../../interfaces/IMatching";
import MatchingRequest from "../../interfaces/matchingRequest/object";
import MatchingEventProducer from "../../kafka/producer/producer";

class MatchingService {
  constructor(
    private readonly producer: MatchingEventProducer,
    private readonly prismaClient: PrismaClient
  ) {}

  public async updateMatchingRequest(body: MatchingRequest) {
    try {
      const matchingRequest = await this.prismaClient.matchingRequest.update({
        where: {
          id: body.id,
        },
        data: body,
      });
      return matchingRequest;
    } catch (error) {
      throw new Error("Failed to find matching request.");
    }
  }

  public async createMatchingRequest(body: IMatchingRequestCreateInput) {
    try {
      const matchingRequest = await this.prismaClient.matchingRequest.create({
        data: body,
      });
      if (matchingRequest) {
        await this.producer.requestMatch(matchingRequest);
      }
      return matchingRequest;
    } catch (error) {
      throw new Error("Failed to create matching request.");
    }
  }

  public async createMatching(body: IMatchingCreateInput) {
    try {
      const matching = await this.prismaClient.matching.create({
        data: body,
      });
      return matching;
    } catch (error) {
      throw new Error("Failed to create matching.");
    }
  }

  public async findMatchRequest(
    body: MatchingRequest
  ): Promise<MatchingRequest | null> {
    try {
      return this.prismaClient.matchingRequest.findFirst({
        where: {
          id: body.id,
        },
      });
    } catch (error) {
      throw new Error("Failed to find matching request.");
    }
  }

  public async findMatch(
    body: MatchingRequest
  ): Promise<MatchingRequest | null> {
    try {
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
    } catch (error) {
      throw new Error("Failed to find matching request.");
    }
  }
}

export default MatchingService;
