"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isInEnum = (enumObject, value) => Object.values(enumObject).includes(value);
exports.default = isInEnum;
