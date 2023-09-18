import { ICreatedMatching, ICreatedMatchingRequest } from "../../interfaces/IMatching";

export interface IMatchingEventProducer {
  requestMatch(matchingRequest: ICreatedMatchingRequest): Promise<void>;
  successfulMatch(matching: ICreatedMatching): Promise<void>;
  unsuccessfulMatch(matchingRequest: ICreatedMatchingRequest): Promise<void>;
}
