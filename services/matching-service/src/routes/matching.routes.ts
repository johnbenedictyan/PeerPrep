import express from "express";
import { checkSchema } from "express-validator";
import {
  createMatching,
  createMatchingRequest,
} from "../controllers/matching.controller";
import createMatchingRequestSchema from "../validation/createMatchingRequest.schema";

const matchingRouter = express.Router();

matchingRouter.post(
  "/matchingRequest",
  checkSchema(createMatchingRequestSchema),
  createMatchingRequest
);

matchingRouter.route("/matching").post(createMatching);

export default matchingRouter;
