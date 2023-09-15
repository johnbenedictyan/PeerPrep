import { PrismaClient } from "@prisma/client";

import {
  ICreatedMatchingRequest,
  IMatchingCreateInput,
  IMatchingRequestCreateInput,
} from "../interfaces/IMatching";
import matchingEventProducer from "../kafka/producer";

const prisma = new PrismaClient();

export const matchingService = {
  updateMatchingRequest: async (body: ICreatedMatchingRequest) => {
    const matchingRequest = await prisma.matchingRequest.update({
      where: {
        id: body.id,
      },
      data: body,
    });
    return matchingRequest;
  },

  createMatchingRequest: async (body: IMatchingRequestCreateInput) => {
    const matchingRequest = await prisma.matchingRequest.create({
      data: body,
    });
    if (matchingRequest) {
      await matchingEventProducer.createMatchingRequest(matchingRequest);
    }
    return matchingRequest;
  },

  createMatching: async (body: IMatchingCreateInput) => {
    const matching = await prisma.matching.create({
      data: body,
    });
    return matching;
  },

  findMatchRequest: async (
    body: ICreatedMatchingRequest
  ): Promise<ICreatedMatchingRequest | null> => {
    return prisma.matchingRequest.findFirst({
      where: {
        id: body.id,
      },
    });
  },

  findMatch: async (
    body: ICreatedMatchingRequest
  ): Promise<ICreatedMatchingRequest | null> => {
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
    } else {
      foundMatchRequest = await prisma.matchingRequest.findFirst({
        where: {
          difficulty: body.difficulty,
          userId: {
            not: body.userId,
          },
          success: false,
        },
      });
    }
    return foundMatchRequest;
  },
};
