import kafka from "../kafka";

// TODO: FIX THIS FILE

// const USER_TOPIC_MAPPER: Map<string, ConsumerFunction> = new Map([
//   [UserTopics.CREATE, successfulUserConsumer],
// ]);

// const USER_REQUEST_TOPIC_MAPPER: Map<string, ConsumerFunction> = new Map([
//   [UserRequestTopics.CREATE, createUserRequestConsumer],
//   [UserRequestTopics.FAIL, unsuccessfulUserConsumer],
// ]);

const consumer = kafka.consumer({ groupId: "user-service" });

const userEventConsumer = async () => {
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();

  //   await consumer.subscribe({
  //     topics: Array.from(USER_TOPIC_MAPPER.keys()).concat(
  //       Array.from(USER_REQUEST_TOPIC_MAPPER.keys()),
  //     ),
  //   });

  //   await consumer.run({
  //     // this function is called every time the consumer gets a new message
  //     eachMessage: async ({ topic, message }: EachMessagePayload) => {
  //       // here, we just log the message to the standard output
  //       if (isInEnum(UserTopics, topic) && USER_TOPIC_MAPPER.has(topic)) {
  //         USER_TOPIC_MAPPER.get(topic)!(message);
  //       }

  //       if (
  //         isInEnum(UserRequestTopics, topic) &&
  //         USER_REQUEST_TOPIC_MAPPER.has(topic)
  //       ) {
  //         USER_REQUEST_TOPIC_MAPPER.get(topic)!(message);
  //       }
  //     },
  //   });
};

export default userEventConsumer;
