"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandling = ({ statusCode = 500, message = 'Unexpected error occured' }) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
};
exports.default = ErrorHandling;
