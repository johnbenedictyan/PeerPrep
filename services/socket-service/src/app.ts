import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import consume from "./kafka/consumer";

dotenv.config();

const app: Express = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Socket Server");
});

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.userId);
    console.log(`User ${data.userId} joined`);
    io.to(data.userId).emit("joined", `User ${data.userId} joined`);
  });
});

server.listen(port, () => {
  console.log(
    `⚡️[server]: Question Service is running at http://localhost:${port}`
  );

  consume().catch((err: any) => {
    console.error("Error in Question Service Consumer: ", err);
  });
});
