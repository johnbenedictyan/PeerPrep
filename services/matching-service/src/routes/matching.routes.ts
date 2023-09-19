import express from "express";
import { checkSchema } from "express-validator";
import MatchingController from "../controllers/matching/matching.controller";
import createMatchingRequestSchema from "../util/validation/matchingRequest/createMatchingRequest.schema";
import createMatchingSchema from "../util/validation/matching/createMatching.schema";

class MatchingRouter {
  private controller: MatchingController;
  private router: express.Router;

  constructor(controller: MatchingController) {
    this.controller = controller;
    this.router = express.Router();
  }

  registerRoutes(): express.Router {
    this.router
      .route("/matchingRequest")
      .post(
        checkSchema(createMatchingRequestSchema),
        this.controller.createMatchingRequest
      );

    this.router
      .route("/matching")
      .post(checkSchema(createMatchingSchema), this.controller.createMatching);

    this.router.route("/healthCheck").get(this.controller.healthCheck);

    return this.router;
  }
}

export default MatchingRouter;
