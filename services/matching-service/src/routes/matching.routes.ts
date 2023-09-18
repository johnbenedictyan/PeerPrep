import express from "express";
import { checkSchema } from "express-validator";

import MatchingController from "../controllers/matching.controller";
import { kafka } from "../kafka/kafka";
import MatchingEventProducer from "../kafka/producer/producer";
import prismaClient from "../prismaClient/client";
import MatchingService from "../services/matching.service";
import createMatchingRequestSchema from "../validation/createMatchingRequest.schema";

const matchingRouter = express.Router();

const ctrl = new MatchingController(
  new MatchingService(new MatchingEventProducer(kafka), prismaClient)
);

matchingRouter.post(
  "/matchingRequest",
  checkSchema(createMatchingRequestSchema),
  ctrl.createMatchingRequest
);

matchingRouter.route("/matching").post(ctrl.createMatching);

matchingRouter.route("/healthCheck").get(ctrl.healthCheck);

export default matchingRouter;
