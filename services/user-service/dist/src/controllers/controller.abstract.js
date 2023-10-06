"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
class Controller {
    static handleValidationError(res, errors) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            errors: errors.array(),
        });
    }
    static handleSuccess(res, data) {
        return res.status(http_status_1.default.OK).json(data);
    }
    static handleBadRequest(res, message) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            errors: message,
        });
    }
    healthCheck(_req, res) {
        return Controller.handleSuccess(res, { message: "OK" });
    }
}
exports.default = Controller;
