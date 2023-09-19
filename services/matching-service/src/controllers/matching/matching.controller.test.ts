import { getMockReq, getMockRes } from "@jest-mock/express";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import httpStatus from "http-status";
import { IMatchingRequestCreateInput } from "../../interfaces/IMatching";
import MatchingController from "./matching.controller";

describe("Test matching controller", () => {
  beforeEach(() => {
    jest.mock("../services/matching.service");
    jest.mock("../kafka/producer/producer");
    jest.mock("../kafka/kafka");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Health Check should be 200", () => {
    const kafka = require("../kafka/kafka").default;
    const MatchingService = require("../services/matching.service").default;
    const MatchingEventProducer = require("../kafka/producer/producer").default;

    const { res } = getMockRes({ locals: {} });
    const req = getMockReq({});

    const ctrl = new MatchingController(
      new MatchingService(new MatchingEventProducer(kafka))
    );
    ctrl.healthCheck(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.stringMatching("OK"));
  });

  test("Happy Path: Complete Create Matching Request should be 200", async () => {
    const mockedKafka = require("../kafka/kafka").default;
    const mockedMatchingService =
      require("../services/matching.service").default;
    const mockedMatchingEventProducer =
      require("../kafka/producer/producer").default;

    const completedMatchingRequestInput: IMatchingRequestCreateInput = {
      userId: "123",
      questionId: 12,
      difficulty: "easy",
      dateRequested: new Date(),
    };

    const { res } = getMockRes({ locals: {} });
    const req = getMockReq({ body: completedMatchingRequestInput });

    const controller = new MatchingController(
      new mockedMatchingService(new mockedMatchingEventProducer(mockedKafka))
    );
    await controller.createMatchingRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
  });

  test("Happy Path: No Optional Create Matching Request should be 200", async () => {
    const mockedKafka = require("../kafka/kafka").default;
    const mockedMatchingService =
      require("../services/matching.service").default;
    const mockedMatchingEventProducer =
      require("../kafka/producer/producer").default;

    const completedMatchingRequestInput: IMatchingRequestCreateInput = {
      userId: "123",
      difficulty: "easy",
    };

    const { res } = getMockRes({ locals: {} });
    const req = getMockReq({ body: completedMatchingRequestInput });

    const controller = new MatchingController(
      new mockedMatchingService(new mockedMatchingEventProducer(mockedKafka))
    );
    await controller.createMatchingRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
  });

  test("Unhappy Path: User ID Missing Create Matching Request should be 400", async () => {
    const mockedKafka = require("../kafka/kafka").default;
    const mockedMatchingService =
      require("../services/matching.service").default;
    const mockedMatchingEventProducer =
      require("../kafka/producer/producer").default;

    const requiredMissingMatchingRequestInput = {
      difficulty: "easy",
    };

    const { res } = getMockRes({ locals: {} });
    const req = getMockReq({ body: requiredMissingMatchingRequestInput });

    const controller = new MatchingController(
      new mockedMatchingService(new mockedMatchingEventProducer(mockedKafka))
    );
    await controller.createMatchingRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
  });

  test("Unhappy Path: Difficulty Missing Create Matching Request should be 400", async () => {
    const mockedKafka = require("../kafka/kafka").default;
    const mockedMatchingService =
      require("../services/matching.service").default;
    const mockedMatchingEventProducer =
      require("../kafka/producer/producer").default;

    const requiredMissingMatchingRequestInput = {
      userId: "abc123",
    };

    const { res } = getMockRes({ locals: {} });
    const req = getMockReq({ body: requiredMissingMatchingRequestInput });

    const controller = new MatchingController(
      new mockedMatchingService(new mockedMatchingEventProducer(mockedKafka))
    );
    await controller.createMatchingRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
  });
});
