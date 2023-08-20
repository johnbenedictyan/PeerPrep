import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

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
});
