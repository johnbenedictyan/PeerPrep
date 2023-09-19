import { getMockReq, getMockRes } from "@jest-mock/express";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import { Kafka } from "kafkajs";
import { IMatchingRequestCreateInput } from "../../interfaces/IMatching";
import MatchingEventProducer from "../../kafka/producer/producer";
import MatchingService from "../../services/matching/matching.service";
import MatchingController from "./matching.controller";

jest.mock("../../services/matching/matching.service");
jest.mock("../../kafka/producer/producer");
jest.mock("../../kafka/kafka");
jest.mock("../../util/prisma/client");

const mockService = jest.mocked(MatchingService);
const mockPrisma = jest.mocked(PrismaClient);
const mockKafka = jest.mocked(Kafka);
const mockMatchingEventProducer = jest.mocked(MatchingEventProducer);

const mockKafkaInstance = new mockKafka({
  brokers: ["localhost:9092"],
  clientId: "matching-service",
});
const mockMatchingEventProducerInstance = new mockMatchingEventProducer(
  mockKafkaInstance
);
const mockPrismaInstance = new mockPrisma();
const mockServiceInstance = new mockService(
  mockMatchingEventProducerInstance,
  mockPrismaInstance
);

describe("Test matching controller", () => {
  beforeEach(() => {
    mockService.mockClear();
    mockMatchingEventProducer.mockClear();
  });

  test("Health Check should be 200", () => {
    const { res } = getMockRes({ locals: {} });
    const req = getMockReq({});

    const ctrl = new MatchingController(mockServiceInstance);
    ctrl.healthCheck(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.stringMatching("OK"));
  });

  test("Happy Path: Complete Create Matching Request should be 200", async () => {
    const completedMatchingRequestInput: IMatchingRequestCreateInput = {
      userId: "123",
      questionId: 12,
      difficulty: "easy",
      dateRequested: new Date(),
    };

    const expectedMatchingRequest = {
      ...completedMatchingRequestInput,
      id: 1,
      success: false,
    };

    jest
      .spyOn(mockServiceInstance, "createMatchingRequest")
      .mockResolvedValue(expectedMatchingRequest as any);

    const { res } = getMockRes({ locals: {} });
    const req = getMockReq({ body: completedMatchingRequestInput });

    const controller = new MatchingController(mockServiceInstance);
    await controller.createMatchingRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
    expect(res.json).toHaveBeenCalledWith(expectedMatchingRequest);
  });

  test("Happy Path: No Optional Create Matching Request should be 200", async () => {
    const completedMatchingRequestInput: IMatchingRequestCreateInput = {
      userId: "123",
      difficulty: "easy",
    };

    const expectedMatchingRequest = {
      ...completedMatchingRequestInput,
      id: 1,
      success: false,
    };

    const { res } = getMockRes({ locals: {} });
    const req = getMockReq({ body: completedMatchingRequestInput });

    jest
      .spyOn(mockServiceInstance, "createMatchingRequest")
      .mockResolvedValue(expectedMatchingRequest as any);

    const controller = new MatchingController(mockServiceInstance);
    await controller.createMatchingRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
    expect(res.json).toHaveBeenCalledWith(expectedMatchingRequest);
  });

  test("Unhappy Path: User ID Missing Create Matching Request should be 400", async () => {
    const requiredMissingMatchingRequestInput = {
      difficulty: "easy",
    };

    const { res } = getMockRes({ locals: {} });
    const req = getMockReq({ body: requiredMissingMatchingRequestInput });

    const controller = new MatchingController(mockServiceInstance);
    await controller.createMatchingRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
  });

  test("Unhappy Path: Difficulty Missing Create Matching Request should be 400", async () => {
    const requiredMissingMatchingRequestInput = {
      userId: "abc123",
    };

    const { res } = getMockRes({ locals: {} });
    const req = getMockReq({ body: requiredMissingMatchingRequestInput });

    const controller = new MatchingController(mockServiceInstance);
    await controller.createMatchingRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
  });
});
