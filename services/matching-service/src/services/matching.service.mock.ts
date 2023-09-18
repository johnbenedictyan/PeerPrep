import {
    ICreatedMatching,
    ICreatedMatchingRequest,
    IMatchingCreateInput,
    IMatchingRequestCreateInput,
} from "../interfaces/IMatching";
import { IMatchingService } from "./matching.service.interface";

class MatchingServiceMock implements IMatchingService {
  constructor() {}
  updateMatchingRequest(
    _body: ICreatedMatchingRequest
  ): Promise<ICreatedMatchingRequest> {
    throw new Error("Method not implemented.");
  }
  createMatchingRequest(
    _body: IMatchingRequestCreateInput
  ): Promise<ICreatedMatchingRequest> {
    throw new Error("Method not implemented.");
  }
  createMatching(_body: IMatchingCreateInput): Promise<ICreatedMatching> {
    throw new Error("Method not implemented.");
  }
  findMatchRequest(
    _body: ICreatedMatchingRequest
  ): Promise<ICreatedMatchingRequest | null> {
    throw new Error("Method not implemented.");
  }
  findMatch(
    _body: ICreatedMatchingRequest
  ): Promise<ICreatedMatchingRequest | null> {
    throw new Error("Method not implemented.");
  }
}

export default MatchingServiceMock;
