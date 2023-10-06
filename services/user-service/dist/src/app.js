"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./controllers/user/user.controller"));
const kafka_1 = __importDefault(require("./events/kafka"));
const producer_1 = __importDefault(require("./events/producers/user/producer"));
const user_parser_1 = __importDefault(require("./parsers/user/user.parser"));
const router_1 = __importDefault(require("./routers/user/router"));
const user_service_1 = __importDefault(require("./services/user/user.service"));
const client_1 = __importDefault(require("./util/prisma/client"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Event Producer
const userEventProducer = new producer_1.default(kafka_1.default.producer());
// Services
const userService = new user_service_1.default(userEventProducer, client_1.default);
// Parsers
const userParser = new user_parser_1.default();
// Controllers
const userController = new user_controller_1.default(userService, userParser);
// Routers
const userRouter = new router_1.default(userController, express_1.default.Router());
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/api/healthCheck", (_req, res) => {
    res.send("OK");
});
app.use("/api/user", userRouter.registerRoutes());
exports.default = app;
