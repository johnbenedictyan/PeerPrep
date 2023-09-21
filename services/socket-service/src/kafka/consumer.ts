import { EachMessagePayload } from "kafkajs";
import { io } from "../app";
import { kafka } from "./kafka";

const SOCKET_SUBSCRIBED_TOPICS: string[] = ["matching-created"];

const consumer = kafka.consumer({ groupId: "socket-service" });

const questionEventConsumer = async () => {
  console.log("Question Service Starting to Listen");
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();

  for (const topic of SOCKET_SUBSCRIBED_TOPICS) {
    await consumer.subscribe({ topic: topic });
  }

  await consumer.run({
    // this function is called every time the consumer gets a new message
    eachMessage: ({ topic, message }: EachMessagePayload) => {
      // here, we just log the message to the standard output
      console.log(message.value ? message.value.toString() : "");
      io.emit(topic, message.value ? message.value.toString() : "");
    },
  });
};

export default questionEventConsumer;
