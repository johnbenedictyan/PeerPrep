import { Request, Response } from "express";
import httpStatus from "http-status";
import { questionService } from "../../services/question.service";

const createQuestion = async (req: Request, res: Response) => {
  const question = await questionService.createQuestion(req.body);
  res.status(httpStatus.CREATED).send(question);
};

export { createQuestion };
