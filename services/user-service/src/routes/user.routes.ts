import bodyParser from "body-parser";
import express from "express";
import { createUser } from "../controllers/user.controller";

const router = express.Router();

const jsonParser = bodyParser.json();

router.route("/").post(jsonParser, createUser);

export default router;
