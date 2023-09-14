import { ICreatedMatching } from "../../interfaces/IMatching";
import { IMessageConsumerFunc } from "../consumer";

const successfulMatchingConsumer: IMessageConsumerFunc = (message) => {
  // Parse ICreatedMatchRequest from message
  if (message.value) {
    const matching: ICreatedMatching = JSON.parse(message.value.toString());

    console.log(
      `YOU HAVE A FRIEND User: ${matching.user1Id}, it is USER: ${matching.user2Id}`
    );
  }
};

export default successfulMatchingConsumer;