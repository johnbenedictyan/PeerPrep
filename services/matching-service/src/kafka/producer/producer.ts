import { Producer } from "kafkajs";

import {
  ICreatedMatching,
  ICreatedMatchingRequest,
} from "../../interfaces/IMatching";
import { kafka } from "../kafka";
import { MATCHING_SERVICE_TOPICS } from "../topics/matching";
import { IMatchingEventProducer } from "./producer.interface";

class MatchingEventProducer implements IMatchingEventProducer {
  private producer: Producer;

  constructor() {
    this.producer = kafka.producer();
  }

  public async requestMatch(matchingRequest: ICreatedMatchingRequest) {
    await this.producer.connect();
    await this.producer.send({
      topic: MATCHING_SERVICE_TOPICS.CREATE_MATCHING_REQUEST,
      messages: [
        {
          key: matchingRequest.id.toString(),
          value: JSON.stringify(matchingRequest),
        },
      ],
    });
    await this.producer.disconnect();
  }

  public async successfulMatch(matching: ICreatedMatching) {
    await this.producer.connect();
    await this.producer.send({
      topic: MATCHING_SERVICE_TOPICS.SUCCESS_MATCHING,
      messages: [
        {
          key: matching.id.toString(),
          value: JSON.stringify(matching),
        },
      ],
    });
    await this.producer.disconnect();
  }

  public async unsuccessfulMatch(matchingRequest: ICreatedMatchingRequest) {
    await this.producer.connect();
    await this.producer.send({
      topic: MATCHING_SERVICE_TOPICS.UNSUCCESSFUL_MATCHING,
      messages: [
        {
          key: matchingRequest.id.toString(),
          value: JSON.stringify(matchingRequest),
        },
      ],
    });
    await this.producer.disconnect();
  }
}

export default MatchingEventProducer;
