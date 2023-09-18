import express from "express";
import { checkSchema } from "express-validator";

import MatchingController from "../controllers/matching.controller";
import createMatchingRequestSchema from "../validation/createMatchingRequest.schema";

class MatchingRouter {
  private controller: MatchingController;
  private router: express.Router;

  constructor(controller: MatchingController) {
    this.controller = controller;
    this.router = express.Router();
  }

  registerRoutes(): express.Router {
    this.router.post(
      "/matchingRequest",
      checkSchema(createMatchingRequestSchema),
      this.controller.createMatchingRequest
    );

    this.router.route("/matching").post(this.controller.createMatching);

    this.router.route("/healthCheck").get(this.controller.healthCheck);

    return this.router;
  }
}

export default MatchingRouter;
