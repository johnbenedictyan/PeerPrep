import {
  ICreatedMatching,
  ICreatedMatchingRequest,
} from "../../interfaces/IMatching";
import { matchingService } from "../../services/matching.service";
import { IMessageConsumerFunc } from "../consumer";
import matchingEventProducer from "../producer";

const createMatchingRequestConsumer: IMessageConsumerFunc = async (message) => {
  const TIME_TO_WAIT = 2000;
  console.log(
    "WE HAVE RECEIVED A MESSAGE FOR THE CREATION OF A MATCHING REQUEST"
  );
  if (message.value) {
    // Parse the json message
    const matchingRequest: ICreatedMatchingRequest = JSON.parse(
      message.value.toString()
    );

    setTimeout(async () => {
      const foundMatchingRequest = await matchingService.findMatchRequest(
        matchingRequest
      );

      if (foundMatchingRequest) {
        const matching: ICreatedMatching = await matchingService.createMatching(
          {
            user1Id: foundMatchingRequest.userId,
            user2Id: matchingRequest.userId,
            dateTimeMatched: new Date(),
          }
        );

        matchingEventProducer.successfulMatch(matching);
      } else {
        matchingEventProducer.unsuccessfulMatch(matchingRequest);
      }
    }, TIME_TO_WAIT);
  }
};

export default createMatchingRequestConsumer;
