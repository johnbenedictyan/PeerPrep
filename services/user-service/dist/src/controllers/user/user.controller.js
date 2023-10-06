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
const express_validator_1 = require("express-validator");
const controller_abstract_1 = __importDefault(require("../controller.abstract"));
class UserController extends controller_abstract_1.default {
    constructor(service, parser) {
        super();
        this.service = service;
        this.parser = parser;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return UserController.handleValidationError(res, errors);
            }
            try {
                const parsedUserRequest = this.parser.parseCreateInput(req.body);
                const userRequest = yield this.service.create(parsedUserRequest);
                return UserController.handleSuccess(res, userRequest);
            }
            catch (e) {
                return UserController.handleBadRequest(res, e.message);
            }
        });
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return UserController.handleValidationError(res, errors);
            }
            try {
                const parsedId = this.parser.parseFindByIdInput(req.params.id);
                const userRequest = yield this.service.findById(parsedId);
                return UserController.handleSuccess(res, userRequest);
            }
            catch (e) {
                return UserController.handleBadRequest(res, e.message);
            }
        });
        this.findOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return UserController.handleValidationError(res, errors);
            }
            try {
                const parsedFindOneInput = this.parser.parseFindOneInput(req.body);
                const userRequest = yield this.service.findOne(parsedFindOneInput);
                return UserController.handleSuccess(res, userRequest);
            }
            catch (e) {
                return UserController.handleBadRequest(res, e.message);
            }
        });
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return UserController.handleValidationError(res, errors);
            }
            try {
                const userRequests = this.service.findAll();
                return UserController.handleSuccess(res, userRequests);
            }
            catch (e) {
                return UserController.handleBadRequest(res, e.message);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return UserController.handleValidationError(res, errors);
            }
            try {
                const parsedId = this.parser.parseFindByIdInput(req.params.id);
                const parsedUpdateInput = this.parser.parseUpdateInput(req.body);
                const userRequest = this.service.update(parsedId, parsedUpdateInput);
                return UserController.handleSuccess(res, userRequest);
            }
            catch (e) {
                return UserController.handleBadRequest(res, e.message);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return UserController.handleValidationError(res, errors);
            }
            try {
                const parsedId = this.parser.parseFindByIdInput(req.params.id);
                const userRequest = this.service.delete(parsedId);
                return UserController.handleSuccess(res, userRequest);
            }
            catch (e) {
                return UserController.handleBadRequest(res, e.message);
            }
        });
    }
}
exports.default = UserController;
