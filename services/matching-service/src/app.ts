import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";

import MatchingController from "./controllers/matching/matching.controller";
import { kafka } from "./kafka/kafka";
import MatchingEventProducer from "./kafka/producer/producer";
import MatchingParser from "./parser/matching/matching.parser";
import MatchingRequestParser from "./parser/matchingRequest/matchingRequest.parser";
import MatchingRouter from "./routes/matching.routes";
import MatchingService from "./services/matching/matching.service";
import prismaClient from "./util/prisma/client";

dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Event Producer
const eventProducer = new MatchingEventProducer(kafka);

// Services
const service = new MatchingService(eventProducer, prismaClient);

// Parsers
const matchingParser = new MatchingParser();
const matchingRequestParser = new MatchingRequestParser();

// Controllers
const controller = new MatchingController(
  service,
  matchingParser,
  matchingRequestParser
);

// Routers
const router = new MatchingRouter(controller);

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api", router.registerRoutes());

export default app;
