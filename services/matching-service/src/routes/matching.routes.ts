import express from "express";
import {
  createMatching,
  createMatchingRequest,
} from "../../controllers/matching.controller";

const matchingRouter = express.Router();

matchingRouter.route("/matchingRequest").post(createMatchingRequest);

matchingRouter.route("/matching").post(createMatching);

export default matchingRouter;
