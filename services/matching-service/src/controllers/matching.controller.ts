import { Request, Response } from "express";
import { validationResult } from "express-validator";
import httpStatus from "http-status";
import createMatchingRequestParser from "../parser/createMatchingRequest.parser";
import { matchingService } from "../services/matching.service";

const createMatchingRequest = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  // if there is error then return Error
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  } else {
    const matching = await matchingService.createMatchingRequest(
      createMatchingRequestParser(req.body)
    );
    res.status(httpStatus.CREATED).send(matching);
  }
};

const createMatching = async (req: Request, res: Response) => {
  const matching = await matchingService.createMatching(req.body);
  res.status(httpStatus.CREATED).send(matching);
};

export { createMatching, createMatchingRequest };

