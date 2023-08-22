import { kafka } from "./kafka";

const consumer = kafka.consumer({ groupId: "test-group" });
const consume = async () => {
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();
  await consumer.subscribe({ topic: "create-user" });
  await consumer.run({
    // this function is called every time the consumer gets a new message
    eachMessage: ({ message }: any) => {
      // here, we just log the message to the standard output
      console.log(`received message: ${message.value}, ${message.key}`);
    },
  });
};

export default consume;
