import { Request, Response } from "express";
import { validationResult } from "express-validator";

import MatchingRequestParser from "../../parser/matchingRequest/matchingRequest.parser";
import MatchingRequestService from "../../services/matchingRequest/matchingRequest.service";
import Controller from "../controller.abstract";
import CRUDController from "../crudController.interface";

class MatchingRequestController extends Controller implements CRUDController {
  constructor(
    private readonly service: MatchingRequestService,
    private readonly parser: MatchingRequestParser
  ) {
    super();
  }

  public async create(req: Request, res: Response) {
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

  public async findById(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return this.handleValidationError(res, errors);
    }

    try {
      const parsedId = this.parser.parseFindByIdInput(req.params["id"]);
      const matchingRequest = await this.service.findById(parsedId);
      return this.handleSuccess(res, matchingRequest);
    } catch (e: any) {
      return this.handleBadRequest(res, e.message);
    }
  }

  public async findOne(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return this.handleValidationError(res, errors);
    }

    try {
      const parsedFindOneInput = this.parser.parseFindOneInput(req.body);
      const matchingRequest = await this.service.findOne(parsedFindOneInput);
      return this.handleSuccess(res, matchingRequest);
    } catch (e: any) {
      return this.handleBadRequest(res, e.message);
    }
  }

  findAll(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return this.handleValidationError(res, errors);
    }

    try {
      const matchingRequests = this.service.findAll();
      return this.handleSuccess(res, matchingRequests);
    } catch (e: any) {
      return this.handleBadRequest(res, e.message);
    }
  }

  update(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return this.handleValidationError(res, errors);
    }

    try {
      const parsedId = this.parser.parseFindByIdInput(req.params["id"]);
      const parsedUpdateInput = this.parser.parseUpdateInput(req.body);
      const matchingRequest = this.service.update(parsedId, parsedUpdateInput);
      return this.handleSuccess(res, matchingRequest);
    } catch (e: any) {
      return this.handleBadRequest(res, e.message);
    }
  }

  delete(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return this.handleValidationError(res, errors);
    }

    try {
      const parsedId = this.parser.parseFindByIdInput(req.params["id"]);
      const matchingRequest = this.service.delete(parsedId);
      return this.handleSuccess(res, matchingRequest);
    } catch (e: any) {
      return this.handleBadRequest(res, e.message);
    }
  }
}

export default MatchingRequestController;
