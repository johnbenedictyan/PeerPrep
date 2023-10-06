"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const devKafkaConfig = {
    clientId: "my-app",
    brokers: ["broker:29092"],
};
const prodKafkaConfig = {
    clientId: "my-app",
    brokers: [process.env.KAFKA_BROKER_URL],
    connectionTimeout: 45000,
    // authenticationTimeout: 10000,
    // reauthenticationThreshold: 10000,
    ssl: true,
    sasl: {
        mechanism: "plain",
        username: process.env.KAFKA_BROKER_USERNAME,
        password: process.env.KAFKA_BROKER_PASSWORD,
    },
};
const kafka = new kafkajs_1.Kafka(process.env.NODE_ENV === "production" ? prodKafkaConfig : devKafkaConfig);
exports.default = kafka;
