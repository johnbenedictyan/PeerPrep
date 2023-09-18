import { Request, Response } from "express";
import { validationResult } from "express-validator";
import httpStatus from "http-status";
import MatchingParser from "../parser/matching.parser";
import MatchingRequestParser from "../parser/matchingRequest.parser";
import MatchingService from "../services/matching.service";

class MatchingController {
  private matchingService: MatchingService;
  private matchingParser: MatchingParser;
  private matchingRequestParser: MatchingRequestParser;

  constructor(matchingService: MatchingService) {
    this.matchingService = matchingService;
    this.matchingParser = new MatchingParser();
    this.matchingRequestParser = new MatchingRequestParser();
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

    let parsedInput;

    try {
      parsedInput = this.matchingRequestParser.parseCreateInput(req.body);
    } catch (e: any) {
      return res.status(400).json({
        success: false,
        errors: e.message,
      });
    }

    const matchingRequest = await this.matchingService.createMatchingRequest(
      parsedInput
    );
    return res.status(httpStatus.CREATED).send(matchingRequest);
  }

  public async createMatching(req: Request, res: Response) {
    let parsedInput;
    try {
      parsedInput = this.matchingParser.parseCreateInput(req.body);
    } catch (e: any) {
      return res.status(400).json({
        success: false,
        errors: e.message,
      });
    }

    const matching = await this.matchingService.createMatching(parsedInput);
    return res.status(httpStatus.CREATED).send(matching);
  }

  public healthCheck(_req: Request, res: Response) {
    console.log("Health Check");
    return res.status(httpStatus.OK).json("OK");
  }
}

export default MatchingController;
