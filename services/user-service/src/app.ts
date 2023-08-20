import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  // Get All Users
  res.send("User Service Server");
});

app.post("/", (req: Request, res: Response) => {
  // Create a single User
  res.send("Create single User");
});

app.put("/", (req: Request, res: Response) => {
  // Update a single User
  res.send("Update single User");
});

app.delete("/", (req: Request, res: Response) => {
  // Delete a single User
  res.send("Delete single User");
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: User Service is running at http://localhost:${port}`
  );
});
