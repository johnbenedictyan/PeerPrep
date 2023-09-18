import { Request, Response } from "express";
import SubmissionService from "../services/submission.service";

class SubmissionController {
  private service: SubmissionService;
  private parser: SubmissionParser;

  constructor(service: SubmissionService) {
    this.service = service;
    this.parser = new SubmissionParser();
  }

  async createSubmission(req: Request, res: Response) {
    const submission = await this.service.createSubmission(req.body);
    res.status(201).json(submission);
  }

  async getSubmission(req: Request, res: Response) {
    const id = this.parser.parseId(req.params["id"]);
    const submission = await this.service.getSubmission(id);
    res.status(200).json(submission);
  }

  async getSubmissions(_req: Request, res: Response) {
    const submissions = await this.service.getSubmissions();
    res.status(200).json(submissions);
  }

  async updateSubmission(req: Request, res: Response) {
    const id = this.parser.parseId(req.params["id"]);
    const submission = await this.service.updateSubmission(id, req.body);
    res.status(200).json(submission);
  }

  async deleteSubmission(req: Request, res: Response) {
    const id = this.parser.parseId(req.params["id"]);
    const submission = await this.service.deleteSubmission(id);
    res.status(200).json(submission);
  }
}

export default SubmissionController;
