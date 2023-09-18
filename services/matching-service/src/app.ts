import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

import matchingRouter from './routes/matching.routes';

dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api", matchingRouter);

app.get("/", (_req: Request, res: Response) => {
  // Get All Matchings
  res.send("Matching Service Server");
});

app.post("/", (_req: Request, res: Response) => {
  // Create a single Matching
  res.send("Create single Matching");
});

app.put("/", (_req: Request, res: Response) => {
  // Update a single Matching
  res.send("Update single Matching");
});

app.delete("/", (_req: Request, res: Response) => {
  // Delete a single Matching
  res.send("Delete single Matching");
});

export default app;
