import { Matching } from "../../interfaces/matching/object";
import { MatchingRequest } from "../../interfaces/matchingRequest/object";

export interface IMatchingEventProducer {
  requestMatch(matchingRequest: MatchingRequest): Promise<void>;
  successfulMatch(matching: Matching): Promise<void>;
  unsuccessfulMatch(matchingRequest: MatchingRequest): Promise<void>;
}
