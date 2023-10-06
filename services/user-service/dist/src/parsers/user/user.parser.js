"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserParser {
    parseCreateInput(input) {
        if (!input.email || !input.name) {
            throw new Error("Invalid input");
        }
        return {
            email: input.email,
            name: input.name,
        };
    }
    parseFindByIdInput(id) {
        if (!id) {
            throw new Error("Invalid input");
        }
        return parseInt(id, 10);
    }
    parseFindOneInput(input) {
        const parsedInput = {};
        if (input.id) {
            parsedInput.id = parseInt(input.id, 10);
        }
        if (input.email) {
            parsedInput.email = input.email;
        }
        if (input.name) {
            parsedInput.name = input.name;
        }
        if (input.questionsAuthored) {
            parsedInput.questionsAuthored = parseInt(input.questionsAuthored, 10);
        }
        return parsedInput;
    }
    parseUpdateInput(input) {
        if (!input.email || !input.name || !input.questionsAuthored) {
            throw new Error("Invalid input");
        }
        return {
            email: input.email,
            name: input.name,
            questionsAuthored: parseInt(input.questionsAuthored, 10),
        };
    }
    parseDeleteInput(id) {
        if (!id) {
            throw new Error("Invalid input");
        }
        return parseInt(id, 10);
    }
}
exports.default = UserParser;
