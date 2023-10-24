import { getMockReq, getMockRes } from "@jest-mock/express";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import { Kafka } from "kafkajs";

import MatchingEventProducer from "../../events/producers/matching/producer";
import { MatchingCreateDTO } from "../../interfaces/matching/createDTO";
import { Matching } from "../../interfaces/matching/object";
import MatchingParser from "../../parsers/matching/matching.parser";
import MatchingService from "../../services/matching/matching.service";
import MatchingController from "./matching.controller";

jest.mock("kafkajs");
jest.mock("@prisma/client");
jest.mock("../../events/producers/matching/producer");
jest.mock("../../parsers/matching/matching.parser");
jest.mock("../../services/matching/matching.service");

const MockRequestService = jest.mocked(MatchingService);
const MockPrisma = jest.mocked(PrismaClient);
const MockKafka = jest.mocked(Kafka);
const MockMatchingEventProducer = jest.mocked(MatchingEventProducer);
const MockMatchingParser = jest.mocked(MatchingParser);

const MockKafkaInstance = new MockKafka({
  brokers: ["localhost:9092"],
  clientId: "matching-service",
});
const MockMatchingEventProducerInstance = new MockMatchingEventProducer(
  MockKafkaInstance.producer(),
);
const MockMatchingParserInstance = new MockMatchingParser();
const MockPrismaInstance = new MockPrisma();
const MockMatchingServiceInstance = new MockRequestService(MockPrismaInstance);

describe("Test matching request controller", () => {
  beforeEach(() => {
    MockRequestService.mockClear();
    MockMatchingEventProducer.mockClear();
  });

  test("Health Check should be 200", () => {
    const { res } = getMockRes({ locals: {} });
    const req = getMockReq({});

    const controller = new MatchingController(
      MockMatchingServiceInstance,
      MockMatchingParserInstance,
      MockMatchingEventProducerInstance,
    );
    controller.healthCheck(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "OK" });
  });

  test("Controller-Service: Valid Input To Service -> Return Object", async () => {
    const input: MatchingCreateDTO = {
      user1Id: "abc",
      user2Id: "qwe",
      requestId: 123,
    };

    const expectedMatching: Matching = {
      ...input,
      id: 1,
      dateTimeMatched: new Date(),
    };

    const serviceCreateMethod = jest.spyOn(
      MockMatchingServiceInstance,
      "create",
    );

    const eventProducerMethod = jest.spyOn(
      MockMatchingEventProducerInstance,
      "create",
    );

    serviceCreateMethod.mockResolvedValue(expectedMatching);

    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new MatchingController(
      MockMatchingServiceInstance,
      MockMatchingParserInstance,
      MockMatchingEventProducerInstance,
    );
    await controller.create(req, res);

    expect(serviceCreateMethod).toBeCalled();
    expect(eventProducerMethod).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(expectedMatching);
  });

  test("Controller-Service: Invalid Input To Service -> Return Error", async () => {
    const serviceCreateMethod = jest.spyOn(
      MockMatchingServiceInstance,
      "create",
    );

    serviceCreateMethod.mockImplementation(() => {
      throw new Error("Service Error");
    });

    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new MatchingController(
      MockMatchingServiceInstance,
      MockMatchingParserInstance,
      MockMatchingEventProducerInstance,
    );
    await controller.create(req, res);

    expect(serviceCreateMethod).toThrowError();
    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
  });

  test("Controller-Parser: Create Matching Request, All Fields -> Test Pass Information to Parser", async () => {
    const inputAllFields: MatchingCreateDTO = {
      user1Id: "abc",
      user2Id: "qwe",
      requestId: 123,
    };
    const { res } = getMockRes({});
    const req = getMockReq({
      body: inputAllFields,
    });

    const controller = new MatchingController(
      MockMatchingServiceInstance,
      MockMatchingParserInstance,
      MockMatchingEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockMatchingParserInstance,
      "parseCreateInput",
    );

    await controller.create(req, res);

    expect(parserParseMethod).toBeCalledWith(inputAllFields);
  });

  test("Controller-Parser: Create Matching Request, All Required Fields -> Test Pass Information to Parser", async () => {
    const inputAllRequiredFields: MatchingCreateDTO = {
      user1Id: "abc",
      user2Id: "qwe",
      requestId: 123,
    };
    const { res } = getMockRes({});
    const req = getMockReq({
      body: inputAllRequiredFields,
    });

    const controller = new MatchingController(
      MockMatchingServiceInstance,
      MockMatchingParserInstance,
      MockMatchingEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockMatchingParserInstance,
      "parseCreateInput",
    );

    await controller.create(req, res);

    expect(parserParseMethod).toBeCalledWith(inputAllRequiredFields);
  });

  test("Controller-Parser: Invalid Input To Parser -> Return Error", async () => {
    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new MatchingController(
      MockMatchingServiceInstance,
      MockMatchingParserInstance,
      MockMatchingEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockMatchingParserInstance,
      "parseCreateInput",
    );

    parserParseMethod.mockImplementation(() => {
      throw new Error("Parser Error");
    });

    await controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
  });
});
