import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";

import MatchingController from "./controllers/matching.controller";
import { kafka } from "./kafka/kafka";
import MatchingEventProducer from "./kafka/producer/producer";
import prismaClient from "./prismaClient/client";
import MatchingRouter from "./routes/matching.routes";
import MatchingService from "./services/matching.service";

dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const eventProducer = new MatchingEventProducer(kafka);
const service = new MatchingService(eventProducer, prismaClient);
const controller = new MatchingController(service);
const router = new MatchingRouter(controller);

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api", router.registerRoutes());

export default app;
