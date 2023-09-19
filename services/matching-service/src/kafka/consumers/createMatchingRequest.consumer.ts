import {
  ICreatedMatching,
  ICreatedMatchingRequest,
} from "../../interfaces/IMatching";
import MatchingService from "../../services/matching/matching.service";
import prismaClient from "../../util/prisma/client";
import { IMessageConsumerFunc } from "../consumer";
import { kafka } from "../kafka";
import MatchingEventProducer from "../producer/producer";

const producer = new MatchingEventProducer(kafka);
const service = new MatchingService(producer, prismaClient);

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
      producer.unsuccessfulMatch(matchReqFromDB);
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

    producer.successfulMatch(matching);
  }
};

export default createMatchingRequestConsumer;
