import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import matchingEventConsumer from "./kafka/consumer";
import matchingRouter from "./routes/matching.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api", matchingRouter);

app.get("/", (req: Request, res: Response) => {
  // Get All Matchings
  res.send("Matching Service Server");
});

app.post("/", (req: Request, res: Response) => {
  // Create a single Matching
  res.send("Create single Matching");
});

app.put("/", (req: Request, res: Response) => {
  // Update a single Matching
  res.send("Update single Matching");
});

app.delete("/", (req: Request, res: Response) => {
  // Delete a single Matching
  res.send("Delete single Matching");
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Matching Service is running at http://localhost:${port}`
  );

  matchingEventConsumer().catch((err: any) => {
    console.error("Error in Matching Service Consumer: ", err);
  });
});
