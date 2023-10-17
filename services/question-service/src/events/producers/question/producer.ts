import { Question } from "../../../interfaces/question/object";
import QuestionTopics from "../../topics/question";
import EventProducer from "../main.interface";

class QuestionProducer extends EventProducer<Question> {
  override create(object: Question): void {
    this.sendEvent(QuestionTopics.CREATE, [
      {
        key: object.id.toString(),
        value: JSON.stringify(object),
      },
    ]);
  }

  override update(object: Question): void {
    this.sendEvent(QuestionTopics.CREATE, [
      {
        key: object.id.toString(),
        value: JSON.stringify(object),
      },
    ]);
  }

  override delete(object: Question): void {
    this.sendEvent(QuestionTopics.CREATE, [
      {
        key: object.id.toString(),
        value: JSON.stringify(object),
      },
    ]);
  }
}

export default QuestionProducer;
