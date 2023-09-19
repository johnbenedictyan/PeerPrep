import { MatchingRequest } from "@prisma/client";

import { Matching } from "../../interfaces/matching/object";
import MatchingService from "../../services/matching/matching.service";
import MatchingRequestService from "../../services/matchingRequest/matchingRequest.service";
import prismaClient from "../../util/prisma/client";
import { IMessageConsumerFunc } from "../consumer";
import { kafka } from "../kafka";
import MatchingEventProducer from "../producer/producer";

const producer = new MatchingEventProducer(kafka);
const matchingService = new MatchingService(prismaClient);
const matchingRequestService = new MatchingRequestService(
  producer,
  prismaClient
);

const createMatchingRequestConsumer: IMessageConsumerFunc = async (message) => {
  console.log(
    "WE HAVE RECEIVED A MESSAGE FOR THE CREATION OF A MATCHING REQUEST"
  );
  if (message.value) {
    // Parse the json message
    const inputMatchingReq: MatchingRequest = JSON.parse(
      message.value.toString()
    );

    const matchReqFromDB: MatchingRequest | null =
      await matchingRequestService.findOne(inputMatchingReq);

    if (!matchReqFromDB || matchReqFromDB.success) {
      return;
    }

    const counterPartyMatchReq: MatchingRequest | null =
      await matchingService.findMatch(inputMatchingReq);

    if (!counterPartyMatchReq) {
      producer.unsuccessfulMatch(matchReqFromDB);
      return;
    }

    const matching: Matching = await matchingService.create({
      user1Id: counterPartyMatchReq.userId,
      user2Id: matchReqFromDB.userId,
      requestId: matchReqFromDB.id,
    });

    // Update matching request
    await matchingRequestService.update(counterPartyMatchReq.id, {
      ...counterPartyMatchReq,
      success: true,
    });

    await matchingRequestService.update(matchReqFromDB.id, {
      ...matchReqFromDB,
      success: true,
    });

    producer.successfulMatch(matching);
  }
};

export default createMatchingRequestConsumer;
