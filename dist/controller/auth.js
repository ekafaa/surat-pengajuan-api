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
exports.loggingIn = void 0;
const errorHandling_1 = __importDefault(require("../util/errorHandling"));
const user_1 = __importDefault(require("../model/user"));
const admin_1 = __importDefault(require("../model/admin"));
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loggingIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body)
            throw (0, errorHandling_1.default)({
                statusCode: 400,
                message: "Missing Request Body"
            });
        const userInput = req.body;
        if (!userInput.username || !userInput.password)
            throw (0, errorHandling_1.default)({
                statusCode: 400,
                message: "Missing Required Field"
            });
        let foundedUser;
        if (req.path === "/admin") {
            foundedUser = yield admin_1.default.findOne({ username: userInput.username });
        }
        else {
            foundedUser = yield user_1.default.findOne({ username: userInput.username });
        }
        if (!foundedUser)
            throw (0, errorHandling_1.default)({
                statusCode: 404,
                message: "Username not found"
            });
        // const userInput = req.body as ILoginInput;
        // console.log(userInput);
        // if (!userInput.username || !userInput.password)
        //   throw ErrorHandling({
        //     statusCode: 400,
        //     message: "Missing Required Field",
        //     res: res,
        //   });
        // const foundedUser = await User.findOne({ username: userInput.username });
        // if (!foundedUser)
        //   throw ErrorHandling({
        //     statusCode: 404,
        //     message: "Username not found",
        //     res: res,
        //   });
        const hashedInput = (0, crypto_1.createHmac)("sha256", process.env.SECRET_HASH)
            .update(userInput.password)
            .digest("hex");
        const passwordValid = foundedUser.password === hashedInput;
        if (!passwordValid)
            throw (0, errorHandling_1.default)({
                statusCode: 403,
                message: "Password salah"
            });
        const at = jsonwebtoken_1.default.sign({ id: foundedUser._id, role: foundedUser.role, name: foundedUser.bio.name }, process.env.SECRET_HASH);
        res.setHeader("Authorization", `Bearer ${at}`);
        return res.status(200).json({
            access_token: at,
        });
    }
    catch (err) {
        next(err);
    }
    ;
});
exports.loggingIn = loggingIn;
exports.default = exports.loggingIn;
