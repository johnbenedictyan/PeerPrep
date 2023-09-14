import {
  ICreatedMatching,
  ICreatedMatchingRequest,
} from "../interfaces/IMatching";
import { kafka } from "./kafka";
import { MATCHING_SERVICE_TOPICS } from "./topics/matching";

const producer = kafka.producer();

const matchingEventProducer = {
  createMatchingRequest: async (matchingRequest: ICreatedMatchingRequest) => {
    await producer.connect();
    await producer.send({
      topic: MATCHING_SERVICE_TOPICS.CREATE_MATCHING_REQUEST,
      messages: [
        {
          key: matchingRequest.id.toString(),
          value: JSON.stringify(matchingRequest),
        },
      ],
    });
    await producer.disconnect();
  },
  successfulMatch: async (matching: ICreatedMatching) => {
    await producer.connect();
    await producer.send({
      topic: MATCHING_SERVICE_TOPICS.SUCCESS_MATCHING,
      messages: [
        {
          key: matching.id.toString(),
          value: JSON.stringify(matching),
        },
      ],
    });
    await producer.disconnect();
  },
  unsuccessfulMatch: async (matchingRequest: ICreatedMatchingRequest) => {
    await producer.connect();
    await producer.send({
      topic: MATCHING_SERVICE_TOPICS.UNSUCCESSFUL_MATCHING,
      messages: [
        {
          key: matchingRequest.id.toString(),
          value: JSON.stringify(matchingRequest),
        },
      ],
    });
    await producer.disconnect();
  },
};

export default matchingEventProducer;
