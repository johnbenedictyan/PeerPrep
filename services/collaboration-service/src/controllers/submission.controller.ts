import { Request, Response } from "express";

import { Submission } from "../interfaces/submission.interface";
import SubmissionParser from "../parsers/submission.parser";
import SubmissionService from "../services/submission.service";

class SubmissionController {
  private service: SubmissionService;
  private parser: SubmissionParser;

  constructor(service: SubmissionService) {
    this.service = service;
    this.parser = new SubmissionParser();
  }

  async createSubmission(req: Request, res: Response) {
    const parsedBody = this.parser.parseCreateBody(req.body);
    const submission: Submission = await this.service.createSubmission(
      parsedBody
    );
    res.status(201).json(submission);
  }

  async getSubmission(req: Request, res: Response) {
    const parsedId = this.parser.parseId(req.params.id);
    const submission: Submission | null = await this.service.getSubmission(
      parsedId
    );
    res.status(200).json(submission);
  }

  async getSubmissions(_req: Request, res: Response) {
    const submissions: Submission[] = await this.service.getSubmissions();
    res.status(200).json(submissions);
  }

  async updateSubmission(req: Request, res: Response) {
    const parsedId = this.parser.parseId(req.params.id);
    const parsedBody = this.parser.parseUpdateBody(req.body);
    const submission: Submission = await this.service.updateSubmission(
      parsedId,
      parsedBody
    );
    res.status(200).json(submission);
  }

  async deleteSubmission(req: Request, res: Response) {
    const parsedId = this.parser.parseId(req.params.id);
    const submission: Submission = await this.service.deleteSubmission(
      parsedId
    );
    res.status(200).json(submission);
  }
}

export default SubmissionController;
