import { Request, Response } from "express";
import httpStatus from "http-status";
import { matchingService } from "../services/matching.service";

const createMatchingRequest = async (req: Request, res: Response) => {
  if (
    !req.body ||
    !req.body.userId ||
    !req.body.dateRequested ||
    !req.body.difficulty
  ) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Invalid Request Body" });
  } else {
    const matching = await matchingService.createMatchingRequest(req.body);
    res.status(httpStatus.CREATED).send(matching);
  }
};

const createMatching = async (req: Request, res: Response) => {
  const matching = await matchingService.createMatching(req.body);
  res.status(httpStatus.CREATED).send(matching);
};

export { createMatchingRequest, createMatching };
