import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "../../services/user.service";

const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
};

export { createUser };
