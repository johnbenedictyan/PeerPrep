"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_1 = __importDefault(require("./kafka"));
const logger_1 = __importDefault(require("../util/logger"));
const SOCKET_SUBSCRIBED_TOPICS = ["matching-created"];
const consumer = kafka_1.default.consumer({ groupId: "socket-service" });
const questionEventConsumer = (io) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("Question Service Starting to Listen");
    // first, we wait for the client to connect and subscribe to the given topic
    yield consumer.connect();
    SOCKET_SUBSCRIBED_TOPICS.forEach((topic) => __awaiter(void 0, void 0, void 0, function* () {
        yield consumer.subscribe({ topic });
    }));
    yield consumer.run({
        // this function is called every time the consumer gets a new message
        eachMessage: ({ topic, message }) => {
            // here, we just log the message to the standard output
            io.emit(topic, message.value ? message.value.toString() : "");
            return Promise.resolve();
        },
    });
});
exports.default = questionEventConsumer;
