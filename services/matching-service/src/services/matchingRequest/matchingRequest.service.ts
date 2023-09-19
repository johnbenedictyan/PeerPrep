import { PrismaClient } from "@prisma/client";

import { MatchingRequestDTO } from "../../interfaces/matchingRequest/DTO";
import MatchingRequest from "../../interfaces/matchingRequest/object";

class MatchingRequestService {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async createMatchingRequest(
    body: MatchingRequestDTO
  ): Promise<MatchingRequest> {
    try {
      return await this.prismaClient.matchingRequest.create({
        data: body,
      });
    } catch (error) {
      throw new Error("Failed to create matching request.");
    }
  }

  public async getMatchingRequest(
    id: number | undefined
  ): Promise<MatchingRequest | null> {
    if (!id) throw new Error("No id provided");

    try {
      return await this.prismaClient.matchingRequest.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Failed to create matching request.");
    }
  }

  public async getMatchingRequests(): Promise<MatchingRequest[]> {
    return await this.prismaClient.matchingRequest.findMany();
  }

  public async updateMatchingRequest(
    id: number | undefined,
    body: MatchingRequestDTO
  ): Promise<MatchingRequest> {
    if (!id) throw new Error("No id provided");

    try {
      return await this.prismaClient.matchingRequest.update({
        where: {
          id: id,
        },
        data: body,
      });
    } catch (error) {
      throw new Error("Failed to update matching request.");
    }
  }

  public async deleteMatchingRequest(
    id: number | undefined
  ): Promise<MatchingRequest> {
    if (!id) throw new Error("No id provided");

    try {
      return await this.prismaClient.matchingRequest.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Failed to delete matching request.");
    }
  }
}

export default MatchingRequestService;
