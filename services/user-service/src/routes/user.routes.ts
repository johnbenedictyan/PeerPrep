import express from "express";
import { createUser } from "../../controllers/user.controller";

const router = express.Router();

router.route("/").post(createUser);

export default router;
