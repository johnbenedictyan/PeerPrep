import { Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import httpStatus from "http-status";
import MatchingParser from "../../parser/matching/matching.parser";
import MatchingRequestParser from "../../parser/matchingRequest/matchingRequest.parser";
import MatchingService from "../../services/matching/matching.service";

class MatchingController {
  constructor(
    private readonly matchingService: MatchingService,
    private readonly matchingParser: MatchingParser,
    private readonly matchingRequestParser: MatchingRequestParser
  ) {}

  private handleValidationError(
    res: Response,
    errors: Result<ValidationError>
  ) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      errors: errors.array(),
    });
  }

  private handleSuccess(res: Response, data: any) {
    return res.status(httpStatus.OK).json(data);
  }

  private handleBadRequest(res: Response, message: string) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      errors: message,
    });
  }

  public async createMatchingRequest(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return this.handleValidationError(res, errors);
    }

    try {
      const parsedMatchingRequest = this.matchingRequestParser.parseCreateInput(
        req.body
      );
      const matchingRequest = await this.matchingService.createMatchingRequest(
        parsedMatchingRequest
      );
      return this.handleSuccess(res, matchingRequest);
    } catch (e: any) {
      return this.handleBadRequest(res, e.message);
    }
  }

  public async createMatching(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return this.handleValidationError(res, errors);
    }

    try {
      const parsedMatching = this.matchingParser.parseCreateInput(req.body);
      const matching = await this.matchingService.createMatching(
        parsedMatching
      );
      return this.handleSuccess(res, matching);
    } catch (e: any) {
      return this.handleBadRequest(res, e.message);
    }
  }

  public healthCheck(_req: Request, res: Response) {
    console.log("Health Check");
    return this.handleSuccess(res, { message: "OK" });
  }
}

export default MatchingController;
