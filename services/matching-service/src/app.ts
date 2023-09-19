import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";

import MatchingController from "./controllers/matching/matching.controller";
import MatchingRequestController from "./controllers/matchingRequest/matchingRequest.controller";
import { kafka } from "./kafka/kafka";
import MatchingEventProducer from "./kafka/producer/producer";
import MatchingParser from "./parser/matching/matching.parser";
import MatchingRequestParser from "./parser/matchingRequest/matchingRequest.parser";
import MatchingRouter from "./routes/matching.routes";
import MatchingService from "./services/matching/matching.service";
import MatchingRequestService from "./services/matchingRequest/matchingRequest.service";
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
const matchingService = new MatchingService(prismaClient);
const matchingRequestService = new MatchingRequestService(
  eventProducer,
  prismaClient
);

// Parsers
const matchingParser = new MatchingParser();
const matchingRequestParser = new MatchingRequestParser();

// Controllers
const matchingController = new MatchingController(
  matchingService,
  matchingParser
);
const matchingRequestController = new MatchingRequestController(
  matchingRequestService,
  matchingRequestParser
);

// Routers
const matchingRouter = new MatchingRouter(
  matchingController,
  matchingRequestController,
  express.Router()
);

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api", matchingRouter.registerRoutes());

export default app;
