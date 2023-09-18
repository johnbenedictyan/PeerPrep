import { Kafka, Producer } from "kafkajs";
import { COLLABORATION_SERVICE_TOPICS } from "../topics/collaboration";

class CollaborationEventProducer {
  private producer: Producer;

  constructor(kafkaInstance: Kafka) {
    this.producer = kafkaInstance.producer();
  }

  public async createSubmission(collaborationRequest: any) {
    await this.producer.connect();
    await this.producer.send({
      topic: COLLABORATION_SERVICE_TOPICS.CREATE_SUBMISSION,
      messages: [
        {
          key: collaborationRequest.id.toString(),
          value: JSON.stringify(collaborationRequest),
        },
      ],
    });
    await this.producer.disconnect();
  }
}

export default CollaborationEventProducer;
