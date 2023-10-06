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
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    constructor(eventProducer, prismaClient) {
        this.eventProducer = eventProducer;
        this.prismaClient = prismaClient;
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prismaClient.user.create({
                    data: body,
                });
                return user;
            }
            catch (error) {
                throw new Error("Failed to create user.");
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prismaClient.user.findUnique({
                    where: {
                        id,
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error("Failed to find user.");
            }
        });
    }
    findOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prismaClient.user.findFirst({
                    where: body,
                });
                return user;
            }
            catch (error) {
                throw new Error("Failed to find user.");
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.prismaClient.user.findMany();
                return users;
            }
            catch (error) {
                throw new Error("Failed to find users.");
            }
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prismaClient.user.update({
                    where: {
                        id,
                    },
                    data: body,
                });
            }
            catch (error) {
                throw new Error("Failed to update user.");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prismaClient.user.delete({
                    where: {
                        id,
                    },
                });
            }
            catch (error) {
                throw new Error("Failed to delete user.");
            }
        });
    }
}
exports.default = UserService;
