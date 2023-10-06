"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const main_1 = __importDefault(require("./events/consumers/main"));
const logger_1 = __importDefault(require("./util/logger"));
const port = process.env.SERVER_PORT;
app_1.default.listen(port, () => {
    logger_1.default.info(`⚡️[server]: Matching Service is running at http://localhost:${port}`);
    if (process.env.NODE_ENV !== "test") {
        (0, main_1.default)().catch((err) => {
            logger_1.default.error("Error in Matching Service Consumer: ", err);
        });
    }
});
