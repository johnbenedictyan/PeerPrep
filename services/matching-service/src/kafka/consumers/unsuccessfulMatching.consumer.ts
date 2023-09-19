import { MatchingRequest } from "../../interfaces/matchingRequest/object";
import { IMessageConsumerFunc } from "../consumer";

const unsuccessfulMatchingConsumer: IMessageConsumerFunc = (message) => {
  // Parse ICreatedMatchRequest from message
  if (message.value) {
    const matchingRequest: MatchingRequest = JSON.parse(
      message.value.toString()
    );

    console.log(`YOU HAVE NO FRIENDS User: ${matchingRequest.userId}`);
  }
};

export default unsuccessfulMatchingConsumer;
