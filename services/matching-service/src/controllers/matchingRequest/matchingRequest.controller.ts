import { Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import httpStatus from "http-status";

import MatchingRequestParser from "../../parser/matchingRequest/matchingRequest.parser";
import MatchingRequestService from "../../services/matchingRequest/matchingRequest.service";

class MatchingRequestController {
  constructor(
    private readonly service: MatchingRequestService,
    private readonly parser: MatchingRequestParser
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
      const parsedMatchingRequest = this.parser.parseCreateInput(req.body);
      const matchingRequest = await this.service.create(parsedMatchingRequest);
      return this.handleSuccess(res, matchingRequest);
    } catch (e: any) {
      return this.handleBadRequest(res, e.message);
    }
  }

  public healthCheck(_req: Request, res: Response) {
    console.log("Health Check");
    return this.handleSuccess(res, { message: "OK" });
  }
}

export default MatchingRequestController;
