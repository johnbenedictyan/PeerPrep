import express from "express";
import SubmissionController from "../controllers/submission.controller";

class CollaborationRouter {
  private controller: SubmissionController;
  private router: express.Router;

  constructor(controller: SubmissionController) {
    this.controller = controller;
    this.router = express.Router();
  }

  registerRoutes(): express.Router {
    this.router
      .route("/submission")
      .post(this.controller.createSubmission)
      .get(this.controller.getSubmissions);

    this.router
      .route("/submission/:id")
      .get(this.controller.getSubmission)
      .put(this.controller.updateSubmission)
      .delete(this.controller.deleteSubmission);

    return this.router;
  }
}

export default CollaborationRouter;
