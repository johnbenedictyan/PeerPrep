"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const createUser_schema_1 = __importDefault(require("../../util/validation/user/createUser.schema"));
const router_abstract_1 = __importDefault(require("../router.abstract"));
class UserRouter extends router_abstract_1.default {
    registerRoutes() {
        this.router
            .route("/")
            .post((0, express_validator_1.checkSchema)(createUser_schema_1.default), this.controller.create);
        this.router.route("/healthCheck").get(this.controller.healthCheck);
        return this.router;
    }
}
exports.default = UserRouter;
