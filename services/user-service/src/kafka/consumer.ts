import { kafka } from './kafka';
import { QUESTION_SERVICE_TOPICS } from './topics/question';

const USER_SUBSCRIBED_TOPICS: string[] = [
  QUESTION_SERVICE_TOPICS.CREATE_QUESTION,
];

const consumer = kafka.consumer({ groupId: "user-service" });

const userEventConsumer = async () => {
  console.log("User Service Starting to Listen");
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();

  for (const topic of USER_SUBSCRIBED_TOPICS) {
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

export default userEventConsumer;
