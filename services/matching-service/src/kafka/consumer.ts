import { EachMessagePayload, KafkaMessage } from "kafkajs";
import isInEnum from "../util/isInEnum";
import createMatchingRequestConsumer from "./consumers/createMatchingRequest.consumer";
import successfulMatchingConsumer from "./consumers/successfulMatching.consumer";
import unsuccessfulMatchingConsumer from "./consumers/unsuccessfulMatching.consumer";
import { kafka } from "./kafka";
import { MATCHING_SERVICE_TOPICS } from "./topics/matching";

export type IMessageConsumerFunc = (message: KafkaMessage) => void;

const MATCHING_SUBSCRIBED_TOPIC_MAPPER: Map<string, IMessageConsumerFunc> =
  new Map([
    [
      MATCHING_SERVICE_TOPICS.CREATE_MATCHING_REQUEST,
      createMatchingRequestConsumer,
    ],
    [MATCHING_SERVICE_TOPICS.SUCCESS_MATCHING, successfulMatchingConsumer],
    [
      MATCHING_SERVICE_TOPICS.UNSUCCESSFUL_MATCHING,
      unsuccessfulMatchingConsumer,
    ],
  ]);

const consumer = kafka.consumer({ groupId: "matching-service" });

const matchingEventConsumer = async () => {
  console.log("Matching Service Starting to Listen");
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();

  await consumer.subscribe({
    topics: Array.from(MATCHING_SUBSCRIBED_TOPIC_MAPPER.keys()),
  });

  await consumer.run({
    // this function is called every time the consumer gets a new message
    eachMessage: async ({ topic, message }: EachMessagePayload) => {
      // here, we just log the message to the standard output
      if (
        isInEnum(MATCHING_SERVICE_TOPICS, topic) &&
        MATCHING_SUBSCRIBED_TOPIC_MAPPER.has(topic)
      ) {
        MATCHING_SUBSCRIBED_TOPIC_MAPPER.get(topic)!(message);
      }
    },
  });
};

export default matchingEventConsumer;
