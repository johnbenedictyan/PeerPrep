import { Request, Response } from "express";
import { validationResult } from "express-validator";
import httpStatus from "http-status";
import createMatchingRequestParser from "../parser/createMatchingRequest.parser";
import MatchingService from "../services/matching.service";

class MatchingController {
  private matchingService;

  constructor() {
    this.matchingService = new MatchingService();
  }

  public async createMatchingRequest(req: Request, res: Response) {
    const errors = validationResult(req);

    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const matchingRequest = await this.matchingService.createMatchingRequest(
      createMatchingRequestParser(req.body)
    );
    return res.status(httpStatus.CREATED).send(matchingRequest);
  }

  public async createMatching(req: Request, res: Response) {
    const matching = await this.matchingService.createMatching(req.body);
    return res.status(httpStatus.CREATED).send(matching);
  }
}

export default MatchingController;
