import { EachMessagePayload, KafkaMessage } from "kafkajs";
import isInEnum from "../../isInEnum";
import { kafka } from "../kafka";
import { COLLABORATION_SERVICE_TOPICS } from "../topics/collaboration";

export type IMessageConsumerFunc = (message: KafkaMessage) => void;

const COLLABORATION_SUBSCRIBED_TOPIC_MAPPER: Map<string, IMessageConsumerFunc> =
  new Map([]);

const consumer = kafka.consumer({ groupId: "collaboration-service" });

const CollaborationEventConsumer = async () => {
  console.log("Collaboration Service Starting to Listen");
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();

  await consumer.subscribe({
    topics: Array.from(COLLABORATION_SUBSCRIBED_TOPIC_MAPPER.keys()),
  });

  await consumer.run({
    // this function is called every time the consumer gets a new message
    eachMessage: async ({ topic, message }: EachMessagePayload) => {
      // here, we just log the message to the standard output
      if (
        isInEnum(COLLABORATION_SERVICE_TOPICS, topic) &&
        COLLABORATION_SUBSCRIBED_TOPIC_MAPPER.has(topic)
      ) {
        COLLABORATION_SUBSCRIBED_TOPIC_MAPPER.get(topic)!(message);
      }
    },
  });
};

export default CollaborationEventConsumer;
