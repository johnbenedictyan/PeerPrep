import { getMockReq, getMockRes } from "@jest-mock/express";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
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
});
