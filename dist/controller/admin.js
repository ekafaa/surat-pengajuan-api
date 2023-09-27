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
exports.adminGetAllSurat = exports.adminGetAllUser = void 0;
const errorHandling_1 = __importDefault(require("../util/errorHandling"));
const user_1 = __importDefault(require("../model/user"));
const acara_1 = __importDefault(require("../model/surat/acara"));
const domisili_1 = __importDefault(require("../model/surat/domisili"));
const kelahiran_1 = __importDefault(require("../model/surat/kelahiran"));
const pengantar_1 = __importDefault(require("../model/surat/pengantar"));
const renovasi_1 = __importDefault(require("../model/surat/renovasi"));
const adminGetAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqAdmin = req.admin;
        if (!reqAdmin)
            throw (0, errorHandling_1.default)({
                statusCode: 403,
                message: "Invalid Cookie"
            });
        const users = yield user_1.default.find();
        return res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
    ;
});
exports.adminGetAllUser = adminGetAllUser;
const adminGetAllSurat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqAdmin = req.admin;
        if (!reqAdmin)
            throw (0, errorHandling_1.default)({
                statusCode: 403,
                message: "Invalid Cookie"
            });
        const result = { acara: [], domisili: [], kelahiran: [], pengantar: [], renovasi: [] };
        const acaras = yield acara_1.default.find({});
        result.acara = acaras;
        const domisili = yield domisili_1.default.find({});
        result.domisili = domisili;
        const kelahiran = yield kelahiran_1.default.find({});
        result.kelahiran = kelahiran;
        const pengantar = yield pengantar_1.default.find({});
        result.pengantar = pengantar;
        const renovasi = yield renovasi_1.default.find({});
        result.renovasi = renovasi;
        return res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
    ;
});
exports.adminGetAllSurat = adminGetAllSurat;
