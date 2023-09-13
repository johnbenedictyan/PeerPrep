import { PrismaClient } from "@prisma/client";
import matchingEventProducer from "../kafka/producer";

const prisma = new PrismaClient();

export interface IMatchingRequestCreateInput {
  userId: number;
  questionId?: number;
  difficulty: string;
  dateRequested?: Date | string;
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
};
