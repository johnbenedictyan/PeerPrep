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

const port = process.env.SERVER_PORT;

const events = new Map<string, string>([
  ["join", "joined"],
  ["begin-collaboration", "collaboration-begun"],
  ["change-code", "code-changed"],
  ["change-language", "language-changed"],
  ["cancel-collaboration", "collaboration-cancelled"],
]);

app.get("/", (req: Request, res: Response) => {
  res.send("Socket Server");
});

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.userId);
    console.log(`User ${data.userId} joined`);
    io.to(data.userId).emit(events.get("join")!, `User ${data.userId} joined`);
  });

  socket.on("begin-collaboration", (data) => {
    const roomId = data.requestId;
    socket.join(roomId);
    console.log(`User:${data.userId} joined Room:${roomId}`);
    io.to(roomId).emit(
      events.get("begin-collaboration")!,
      `User:${data.userId} joined Room:${roomId}`
    );
  });

  socket.on("change-code", (data) => {
    console.log(
      `Editing Code Matching: ${data.requestId} \t User Id: ${data.userId} \t Code: ${data.code}`
    );
    io.to(data.requestId).emit(events.get("change-code")!, data);
  });

  socket.on("change-language", (data) => {
    console.log(
      `Change Language: ${data.requestId} \t User Id: ${data.userId} \t to Language: ${data.language}`
    );
    io.to(data.requestId).emit(events.get("change-language")!, data);
  });

  socket.on("cancel-collaboration", (data) => {
    console.log(
      `Cancelling Matching: ${data.requestId} \t User Id: ${data.userId}`
    );
    io.to(data.requestId).emit(events.get("cancel-collaboration")!, data);
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
