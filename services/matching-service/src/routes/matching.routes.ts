import express from "express";
import { checkSchema } from "express-validator";

import MatchingController from "../controllers/matching/matching.controller";
import MatchingRequestController from "../controllers/matchingRequest/matchingRequest.controller";
import createMatchingSchema from "../util/validation/matching/createMatching.schema";
import createMatchingRequestSchema from "../util/validation/matchingRequest/createMatchingRequest.schema";

class MatchingRouter {
  constructor(
    private readonly matchingController: MatchingController,
    private readonly MatchingRequestController: MatchingRequestController,
    private router: express.Router
  ) {}

  registerRoutes(): express.Router {
    this.router
      .route("/matchingRequest")
      .post(
        checkSchema(createMatchingRequestSchema),
        this.MatchingRequestController.create
      );

    this.router
      .route("/matchingRequest/healthCheck")
      .get(this.MatchingRequestController.healthCheck);

    this.router
      .route("/matching")
      .post(
        checkSchema(createMatchingSchema),
        this.matchingController.create
      );

    this.router
      .route("/matching/healthCheck")
      .get(this.matchingController.healthCheck);

    return this.router;
  }
}

export default MatchingRouter;
