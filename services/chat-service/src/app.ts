import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT;

app.get("/", (req: Request, res: Response) => {
  // Get All Chats
  res.send("Chat Service Server");
});

app.post("/", (req: Request, res: Response) => {
  // Create a single Chat
  res.send("Create single Chat");
});

app.put("/", (req: Request, res: Response) => {
  // Update a single Chat
  res.send("Update single Chat");
});

app.delete("/", (req: Request, res: Response) => {
  // Delete a single Chat
  res.send("Delete single Chat");
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Chat Service is running at http://localhost:${port}`
  );
});
