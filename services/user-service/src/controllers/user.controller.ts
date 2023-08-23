import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "../services/user.service";

const createUser = async (req: Request, res: Response) => {
    console.log(req.body);
  if (!req.body || !req.body.email || !req.body.name || !req.body.password) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Invalid Request Body" });
  } else {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
  }
};

export { createUser };
