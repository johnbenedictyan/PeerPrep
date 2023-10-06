"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../topics/user/user"));
const main_interface_1 = __importDefault(require("../main.interface"));
class UserProducer extends main_interface_1.default {
    create(object) {
        this.sendEvent(user_1.default.CREATE, [
            {
                key: object.id.toString(),
                value: JSON.stringify(object),
            },
        ]);
    }
    update(object) {
        this.sendEvent(user_1.default.CREATE, [
            {
                key: object.id.toString(),
                value: JSON.stringify(object),
            },
        ]);
    }
    delete(object) {
        this.sendEvent(user_1.default.CREATE, [
            {
                key: object.id.toString(),
                value: JSON.stringify(object),
            },
        ]);
    }
}
exports.default = UserProducer;
