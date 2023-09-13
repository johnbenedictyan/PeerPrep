import { kafka } from "./kafka";

const MATCHING_SUBSCRIBED_TOPICS: string[] = [];

const consumer = kafka.consumer({ groupId: "test-group" });

const matchingEventConsumer = async () => {
  console.log("Matching Service Starting to Listen");
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();

  for (const topic of MATCHING_SUBSCRIBED_TOPICS) {
    await consumer.subscribe({ topic: topic });
  }

  await consumer.run({
    // this function is called every time the consumer gets a new message
    eachMessage: ({ message }: any) => {
      // here, we just log the message to the standard output
      console.log(`received message: ${message.value}, ${message.key}`);
    },
  });
};

export default matchingEventConsumer;
