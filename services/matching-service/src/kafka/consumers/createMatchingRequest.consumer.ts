import {
  ICreatedMatching,
  ICreatedMatchingRequest,
} from "../../interfaces/IMatching";
import matchingService from "../../services/matching.service";
import { IMessageConsumerFunc } from "../consumer";
import matchingEventProducer from "../producer";

const service = new matchingService();

const createMatchingRequestConsumer: IMessageConsumerFunc = async (message) => {
  console.log(
    "WE HAVE RECEIVED A MESSAGE FOR THE CREATION OF A MATCHING REQUEST"
  );
  if (message.value) {
    // Parse the json message
    const inputMatchingReq: ICreatedMatchingRequest = JSON.parse(
      message.value.toString()
    );

    const matchReqFromDB: ICreatedMatchingRequest | null =
      await service.findMatchRequest(inputMatchingReq);

    if (!matchReqFromDB || matchReqFromDB.success) {
      return;
    }

    const counterPartyMatchReq: ICreatedMatchingRequest | null =
      await service.findMatch(inputMatchingReq);

    if (!counterPartyMatchReq) {
      matchingEventProducer.unsuccessfulMatch(matchReqFromDB);
      return;
    }

    const matching: ICreatedMatching = await service.createMatching({
      user1Id: counterPartyMatchReq.userId,
      user2Id: matchReqFromDB.userId,
      dateTimeMatched: new Date(),
    });

    // Update matching request
    await service.updateMatchingRequest({
      ...counterPartyMatchReq,
      success: true,
    });

    await service.updateMatchingRequest({
      ...matchReqFromDB,
      success: true,
    });

    matchingEventProducer.successfulMatch(matching);
  }
};

export default createMatchingRequestConsumer;
