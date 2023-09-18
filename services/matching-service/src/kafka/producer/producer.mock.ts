import { Producer } from "kafkajs";

import { jest } from "@jest/globals";
import {
  ICreatedMatching,
  ICreatedMatchingRequest,
} from "../../interfaces/IMatching";
import { IMatchingEventProducer } from "./producer.interface";

class MatchingEventProducerMock implements IMatchingEventProducer {
  private producer: Producer;

  constructor() {
    this.producer = jest.fn() as unknown as Producer;
  }
  requestMatch(_matchingRequest: ICreatedMatchingRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
  successfulMatch(_matching: ICreatedMatching): Promise<void> {
    throw new Error("Method not implemented.");
  }
  unsuccessfulMatch(_matchingRequest: ICreatedMatchingRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default MatchingEventProducerMock;
