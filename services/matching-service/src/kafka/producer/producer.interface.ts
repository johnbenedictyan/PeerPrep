import { ICreatedMatching } from "../../interfaces/IMatching";
import MatchingRequest from "../../interfaces/matchingRequest/object";

export interface IMatchingEventProducer {
  requestMatch(matchingRequest: MatchingRequest): Promise<void>;
  successfulMatch(matching: ICreatedMatching): Promise<void>;
  unsuccessfulMatch(matchingRequest: MatchingRequest): Promise<void>;
}
