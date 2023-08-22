import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import consume from "./kafka/consumer";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

consume().catch((err: any) => {
  console.error("error in consumer: ", err);
});

app.get("/", (req: Request, res: Response) => {
  // Get All Questions
  res.send("Question Service Server");
});

app.post("/", (req: Request, res: Response) => {
  // Create a single question
  res.send("Create single question");
});

app.put("/", (req: Request, res: Response) => {
  // Update a single question
  res.send("Update single question");
});

app.delete("/", (req: Request, res: Response) => {
  // Delete a single question
  res.send("Delete single question");
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Question Service is running at http://localhost:${port}`
  );
});
