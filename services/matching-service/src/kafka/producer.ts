import { IMatching, IMatchingRequest } from "../interfaces/IMatching";
import { kafka } from "./kafka";
import { MATCHING_SERVICE_TOPICS } from "./topics/matching";

const producer = kafka.producer();

const matchingEventProducer = {
  createMatchingRequest: async (matchingRequest: IMatchingRequest) => {
    await producer.connect();
    await producer.send({
      topic: MATCHING_SERVICE_TOPICS.CREATE_MATCHING,
      messages: [
        {
          value: `Matching Requested: ${matchingRequest.userId} at ${matchingRequest.dateRequested}`,
          matching: matchingRequest,
        },
      ],
    });
    await producer.disconnect();
  },
  createMatching: async (matching: IMatching) => {
    await producer.connect();
    await producer.send({
      topic: MATCHING_SERVICE_TOPICS.CREATE_MATCHING,
      messages: [
        {
          value: `Matching Created: ${matching.user1Id} and ${matching.user2Id} at ${matching.dateTimeMatched}`,
          matching: matching,
        },
      ],
    });
    await producer.disconnect();
  },
};

export default matchingEventProducer;
