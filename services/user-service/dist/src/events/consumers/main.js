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
const kafka_1 = __importDefault(require("../kafka"));
// TODO: FIX THIS FILE
// const USER_TOPIC_MAPPER: Map<string, ConsumerFunction> = new Map([
//   [UserTopics.CREATE, successfulUserConsumer],
// ]);
// const USER_REQUEST_TOPIC_MAPPER: Map<string, ConsumerFunction> = new Map([
//   [UserRequestTopics.CREATE, createUserRequestConsumer],
//   [UserRequestTopics.FAIL, unsuccessfulUserConsumer],
// ]);
const consumer = kafka_1.default.consumer({ groupId: "user-service" });
const userEventConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    // first, we wait for the client to connect and subscribe to the given topic
    yield consumer.connect();
    //   await consumer.subscribe({
    //     topics: Array.from(USER_TOPIC_MAPPER.keys()).concat(
    //       Array.from(USER_REQUEST_TOPIC_MAPPER.keys()),
    //     ),
    //   });
    //   await consumer.run({
    //     // this function is called every time the consumer gets a new message
    //     eachMessage: async ({ topic, message }: EachMessagePayload) => {
    //       // here, we just log the message to the standard output
    //       if (isInEnum(UserTopics, topic) && USER_TOPIC_MAPPER.has(topic)) {
    //         USER_TOPIC_MAPPER.get(topic)!(message);
    //       }
    //       if (
    //         isInEnum(UserRequestTopics, topic) &&
    //         USER_REQUEST_TOPIC_MAPPER.has(topic)
    //       ) {
    //         USER_REQUEST_TOPIC_MAPPER.get(topic)!(message);
    //       }
    //     },
    //   });
});
exports.default = userEventConsumer;
