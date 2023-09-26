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
  socket.on("session-begin", (data) => {
    const roomId = data.matchingId;
    socket.join(roomId);
    console.log(`User:${data.userId} joined Room:${roomId}`);
    io.to(roomId).emit("joined", `User:${data.userId} joined Room:${roomId}`);
  });
  socket.on("edit-code", (data) => {
    console.log(`Editing Code Matching: ${data.requestId} \t User Id: ${data.userId} \t Code: ${data.code}`);
    io.to(data.requestId).emit("edit-code", data);
  });
  socket.on("cancel-match", (data) => {
    console.log(`Cancelling Matching: ${data.requestId} \t User Id: ${data.userId} \t Code: ${data.code}`);
    io.to(data.requestId).emit("edit-code", data);
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
