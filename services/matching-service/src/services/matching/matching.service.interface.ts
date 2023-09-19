import {
  ICreatedMatching,
  ICreatedMatchingRequest,
  IMatchingCreateInput,
  IMatchingRequestCreateInput,
} from "../../interfaces/IMatching";

export interface IMatchingService {
  updateMatchingRequest(
    body: ICreatedMatchingRequest
  ): Promise<ICreatedMatchingRequest>;
  createMatchingRequest(
    body: IMatchingRequestCreateInput
  ): Promise<ICreatedMatchingRequest>;
  createMatching(body: IMatchingCreateInput): Promise<ICreatedMatching>;
  findMatchRequest(
    body: ICreatedMatchingRequest
  ): Promise<ICreatedMatchingRequest | null>;
  findMatch(
    body: ICreatedMatchingRequest
  ): Promise<ICreatedMatchingRequest | null>;
}
