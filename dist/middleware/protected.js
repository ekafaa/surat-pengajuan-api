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
exports.verifiedAdmin = exports.verifiedUser = void 0;
const errorHandling_1 = __importDefault(require("../util/errorHandling"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user"));
const admin_1 = __importDefault(require("../model/admin"));
const verifiedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw (0, errorHandling_1.default)({
                message: "Invalid or missing bearer token"
            });
        }
        const token = authHeader.substring(7);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_HASH);
        if (!decoded.id) {
            throw (0, errorHandling_1.default)({
                statusCode: 403,
                message: "Invalid token",
            });
        }
        const validUser = yield user_1.default.findById(decoded.id);
        if (!validUser) {
            throw (0, errorHandling_1.default)({
                statusCode: 403,
                message: "Invalid token",
            });
        }
        req.user = validUser;
        next();
    }
    catch (err) {
        err.statusCode = 401;
        next(err);
    }
});
exports.verifiedUser = verifiedUser;
const verifiedAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw (0, errorHandling_1.default)({
                statusCode: 400,
                message: "No Bearer Token Provided"
            });
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw (0, errorHandling_1.default)({
                statusCode: 400,
                message: "No Bearer Token Provided"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_HASH);
        if (!decoded.id) {
            throw (0, errorHandling_1.default)({
                message: "Invalid Token"
            });
        }
        ;
        console.log(decoded);
        const validAdmin = yield admin_1.default.findById(decoded.id);
        if (!validAdmin || validAdmin.role !== "admin") {
            throw (0, errorHandling_1.default)({
                message: "Invalid Token"
            });
        }
        req.admin = validAdmin;
        next();
    }
    catch (err) {
        err.statusCode = 403;
        next(err);
    }
});
exports.verifiedAdmin = verifiedAdmin;
