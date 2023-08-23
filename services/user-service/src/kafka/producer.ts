import { IUser } from "../interfaces/IUser";
import { kafka } from "./kafka";
import { USER_SERVICE_TOPICS } from "./topics/user";

const producer = kafka.producer();

const userEventProducer = {
  createUser: async (user: IUser) => {
    await producer.connect();
    await producer.send({
      topic: USER_SERVICE_TOPICS.CREATE_USER,
      messages: [{ value: `User Created: ${user.name}`, user: user }],
    });
    await producer.disconnect();
  },
};

export default userEventProducer;
