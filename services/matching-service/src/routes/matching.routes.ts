import express from "express";
import { checkSchema } from "express-validator";
import MatchingController from "../controllers/matching.controller";
import createMatchingRequestSchema from "../validation/createMatchingRequest.schema";

const matchingRouter = express.Router();

const ctrl = new MatchingController();

matchingRouter.post(
  "/matchingRequest",
  checkSchema(createMatchingRequestSchema),
  ctrl.createMatchingRequest
);

matchingRouter.route("/matching").post(ctrl.createMatching);

export default matchingRouter;
