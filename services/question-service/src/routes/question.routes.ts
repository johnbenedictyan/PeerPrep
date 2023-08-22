import express from "express";
import { createQuestion } from "../controllers/question.controller";

const router = express.Router();

router.route("/").post(createQuestion);

export default router;
