import { Request, Response } from "express";
import { validationResult } from "express-validator";

import UserParser from "../../parsers/user/user.parser";
import UserService from "../../services/user/user.service";
import Controller from "../controller.abstract";
import CRUDController from "../crudController.interface";

class UserController extends Controller implements CRUDController {
  constructor(
    private readonly service: UserService,
    private readonly parser: UserParser,
  ) {
    super();
  }

  public create = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return UserController.handleValidationError(res, errors);
    }
    try {
      const parsedUserRequest = this.parser.parseCreateInput(req.body);
      const userRequest = await this.service.create(parsedUserRequest);
      return UserController.handleSuccess(res, userRequest);
    } catch (e: any) {
      return UserController.handleBadRequest(res, e.message);
    }
  };

  public findById = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return UserController.handleValidationError(res, errors);
    }

    try {
      const parsedId = this.parser.parseFindByIdInput(req.params.id);
      const userRequest = await this.service.findById(parsedId);
      return UserController.handleSuccess(res, userRequest);
    } catch (e: any) {
      return UserController.handleBadRequest(res, e.message);
    }
  };

  public findOne = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return UserController.handleValidationError(res, errors);
    }

    try {
      const parsedFindOneInput = this.parser.parseFindOneInput(req.body);
      const userRequest = await this.service.findOne(parsedFindOneInput);
      return UserController.handleSuccess(res, userRequest);
    } catch (e: any) {
      return UserController.handleBadRequest(res, e.message);
    }
  };

  public findAll = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return UserController.handleValidationError(res, errors);
    }

    try {
      const userRequests = this.service.findAll();
      return UserController.handleSuccess(res, userRequests);
    } catch (e: any) {
      return UserController.handleBadRequest(res, e.message);
    }
  };

  public update = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return UserController.handleValidationError(res, errors);
    }

    try {
      const parsedId = this.parser.parseFindByIdInput(req.params.id);
      const parsedUpdateInput = this.parser.parseUpdateInput(req.body);
      const userRequest = this.service.update(parsedId, parsedUpdateInput);
      return UserController.handleSuccess(res, userRequest);
    } catch (e: any) {
      return UserController.handleBadRequest(res, e.message);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return UserController.handleValidationError(res, errors);
    }

    try {
      const parsedId = this.parser.parseFindByIdInput(req.params.id);
      const userRequest = this.service.delete(parsedId);
      return UserController.handleSuccess(res, userRequest);
    } catch (e: any) {
      return UserController.handleBadRequest(res, e.message);
    }
  };
}

export default UserController;
