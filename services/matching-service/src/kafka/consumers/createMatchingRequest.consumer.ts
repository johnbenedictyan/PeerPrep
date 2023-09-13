import { ICreatedMatchingRequest } from "../../interfaces/IMatching";
import { IMessageConsumerFunc } from "../consumer";

const createMatchingRequestConsumer: IMessageConsumerFunc = (message) => {
  console.log(
    "WE HAVE RECEIVED A MESSAGE FOR THE CREATION OF A MATCHING REQUEST"
  );
  if (message.value) {
    // Parse the json message
    const matchingRequest: ICreatedMatchingRequest = JSON.parse(
      message.value.toString()
    );
  }
};

export default createMatchingRequestConsumer;
