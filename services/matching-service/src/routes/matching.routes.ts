import express from "express";
import { checkSchema } from "express-validator";

import MatchingController from "../controllers/matching.controller";
import MatchingEventProducer from "../kafka/producer/producer";
import MatchingService from "../services/matching.service";
import createMatchingRequestSchema from "../validation/createMatchingRequest.schema";

const matchingRouter = express.Router();

const ctrl = new MatchingController(
  new MatchingService(new MatchingEventProducer())
);

matchingRouter.post(
  "/matchingRequest",
  checkSchema(createMatchingRequestSchema),
  ctrl.createMatchingRequest
);

matchingRouter.route("/matching").post(ctrl.createMatching);

matchingRouter.route("/healthCheck").get(ctrl.healthCheck);

export default matchingRouter;
