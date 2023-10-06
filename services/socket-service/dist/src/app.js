"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const consumer_1 = __importDefault(require("./kafka/consumer"));
const logger_1 = __importDefault(require("./util/logger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const port = process.env.SERVER_PORT;
const events = new Map([
    ["join", "joined"],
    ["begin-collaboration", "collaboration-begun"],
    ["change-code", "code-changed"],
    ["change-language", "language-changed"],
    ["cancel-collaboration", "collaboration-cancelled"],
]);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    socket.on("join", (data) => {
        socket.join(data.userId);
        logger_1.default.info(`User ${data.userId} joined`);
        io.to(data.userId).emit(events.get("join"), `User ${data.userId} joined`);
    });
    socket.on("begin-collaboration", (data) => {
        const roomId = data.requestId;
        socket.join(roomId);
        logger_1.default.info(`User:${data.userId} joined Room:${roomId}`);
        io.to(roomId).emit(events.get("begin-collaboration"), `User:${data.userId} joined Room:${roomId}`);
    });
    socket.on("change-code", (data) => {
        logger_1.default.info(`Editing Code Matching: ${data.requestId} \t User Id: ${data.userId} \t Code: ${data.code}`);
        io.to(data.requestId).emit(events.get("change-code"), data);
    });
    socket.on("change-language", (data) => {
        logger_1.default.info(`Change Language: ${data.requestId} \t User Id: ${data.userId} \t to Language: ${data.language}`);
        io.to(data.requestId).emit(events.get("change-language"), data);
    });
    socket.on("cancel-collaboration", (data) => {
        logger_1.default.info(`Cancelling Matching: ${data.requestId} \t User Id: ${data.userId}`);
        io.to(data.requestId).emit(events.get("cancel-collaboration"), data);
    });
});
app.get("/", (_req, res) => {
    res.send("Socket Server");
});
server.listen(port, () => {
    logger_1.default.info(`⚡️[server]: Question Service is running at http://localhost:${port}`);
    (0, consumer_1.default)(io).catch((err) => {
        logger_1.default.error("Error in Question Service Consumer: ", err);
    });
});
exports.default = server;
