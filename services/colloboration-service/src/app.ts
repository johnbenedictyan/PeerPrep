import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';

import CollaborationController from './controllers/submission.controller';
import CollaborationRouter from './routers/collaboration.routers';
import CollaborationService from './services/submission.service';
import prismaClient from './util/prisma/client';

dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Initialization
// const eventProducer = new CollaborationEventProducer(kafka);
const service = new CollaborationService(prismaClient);
const controller = new CollaborationController(service);
const router = new CollaborationRouter(controller);

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api", router.registerRoutes());

export default app;
