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
    const inputMatchingReq: ICreatedMatchingRequest = JSON.parse(
      message.value.toString()
    );

    const matchReqFromDB: ICreatedMatchingRequest | null =
      await matchingService.findMatchRequest(inputMatchingReq);

    if (!matchReqFromDB || matchReqFromDB.success) {
      return;
    }

    const counterPartyMatchReq: ICreatedMatchingRequest | null =
      await matchingService.findMatch(inputMatchingReq);

    if (!counterPartyMatchReq) {
      matchingEventProducer.unsuccessfulMatch(matchReqFromDB);
      return;
    }

    const matching: ICreatedMatching = await matchingService.createMatching({
      user1Id: counterPartyMatchReq.userId,
      user2Id: matchReqFromDB.userId,
      dateTimeMatched: new Date(),
    });

    // Update matching request
    await matchingService.updateMatchingRequest({
      ...counterPartyMatchReq,
      success: true,
    });

    await matchingService.updateMatchingRequest({
      ...matchReqFromDB,
      success: true,
    });

    matchingEventProducer.successfulMatch(matching);
  }
};

export default createMatchingRequestConsumer;
