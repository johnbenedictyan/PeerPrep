import { IQuestion } from "../interfaces/IQuestion";
import { kafka } from "./kafka";
import { QUESTION_SERVICE_TOPICS } from "./topics/question";

const producer = kafka.producer();

const questionEventProducer = {
  createQuestion: async (question: IQuestion) => {
    await producer.connect();
    await producer.send({
      topic: QUESTION_SERVICE_TOPICS.CREATE_QUESTION,
      messages: [
        { value: `Question Created: ${question.title}`, question: question },
      ],
    });
    await producer.disconnect();
  },
};

export default questionEventProducer;
