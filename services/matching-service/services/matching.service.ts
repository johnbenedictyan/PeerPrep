import { PrismaClient } from "@prisma/client";
import matchingEventProducer from "../kafka/producer";

const prisma = new PrismaClient();

export interface IMatchingRequestCreateInput {
  userId: number;
  dateRequested: Date | string;
  questionId?: number;
  difficulty: string;
}

interface IMatchingCreateInput {
  user1Id: number;
  user2Id: number;
  dateTimeMatched: Date | string;
}

export const matchingService = {
  createMatchingRequest: async (body: IMatchingRequestCreateInput) => {
    const matchingRequest = await prisma.matchingRequest.create({
      data: body,
    });
    if (matchingRequest) {
      matchingEventProducer.createMatchingRequest(matchingRequest);
    }
    return matchingRequest;
  },
  createMatching: async (body: IMatchingCreateInput) => {
    const matching = await prisma.matching.create({
      data: body,
    });
    return matching;
  },
};
