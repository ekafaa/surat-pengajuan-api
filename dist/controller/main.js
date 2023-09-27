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
exports.generateSurat = exports.deleteSurat = exports.getSurat = exports.createNewUser = exports.getUser = void 0;
const validate_1 = require("../util/validate");
const errorHandling_1 = __importDefault(require("../util/errorHandling"));
const user_1 = __importDefault(require("../model/user"));
const node_crypto_1 = require("node:crypto");
const acara_1 = __importDefault(require("../model/surat/acara"));
const domisili_1 = __importDefault(require("../model/surat/domisili"));
const kelahiran_1 = __importDefault(require("../model/surat/kelahiran"));
const pengantar_1 = __importDefault(require("../model/surat/pengantar"));
const renovasi_1 = __importDefault(require("../model/surat/renovasi"));
const helper_1 = require("../helper/helper");
const hari_1 = require("../util/hari");
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!id)
            throw (0, errorHandling_1.default)({
                statusCode: 400,
                message: "Missing required params"
            });
        const foundedUser = yield user_1.default.findById(id);
        if (!foundedUser)
            throw (0, errorHandling_1.default)({
                statusCode: 404,
                message: "User not found"
            });
        return res.status(200).json(foundedUser);
    }
    catch (err) {
        next(err);
    }
    ;
});
exports.getUser = getUser;
const createNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body) {
            throw (0, errorHandling_1.default)({
                statusCode: 400,
                message: "Request Body is required"
            });
        }
        ;
        const userBody = req.body;
        if (!(0, validate_1.validateNewUser)(userBody)) {
            throw (0, errorHandling_1.default)({
                statusCode: 400,
                message: "User is invalid"
            });
        }
        ;
        const hashedPassword = (0, node_crypto_1.createHmac)('sha256', process.env.SECRET_HASH).update(userBody.password).digest('hex');
        const newUser = new user_1.default(Object.assign(Object.assign({}, userBody), { password: hashedPassword, role: 'user' }));
        yield newUser.save();
        return res.status(201).json(newUser);
    }
    catch (err) {
        next(err);
    }
    ;
});
exports.createNewUser = createNewUser;
const getSurat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jenis = (0, helper_1.queryJenisSurat)(req, res);
        if (!jenis) {
            throw (0, errorHandling_1.default)({
                statusCode: 400,
                message: 'Invalid Query'
            });
        }
        ;
        const userId = req.user._id;
        const suratId = req.params.suratId;
        let foundedSurat;
        if (jenis === 'kelahiran') {
            foundedSurat = suratId ? yield kelahiran_1.default.findOne({ _id: suratId, userId: userId }) : yield kelahiran_1.default.find({ userId: userId });
        }
        ;
        if (jenis === 'domisili') {
            foundedSurat = suratId ? yield domisili_1.default.findOne({ _id: suratId, userId: userId }) : yield domisili_1.default.find({ userId: userId });
        }
        ;
        if (jenis === 'pengantar') {
            foundedSurat = suratId ? yield pengantar_1.default.findOne({ _id: suratId, userId: userId }) : yield pengantar_1.default.find({ userId: userId });
        }
        ;
        if (jenis === 'renovasi') {
            foundedSurat = suratId ? yield renovasi_1.default.findOne({ _id: suratId, userId: userId }) : yield renovasi_1.default.find({ userId: userId });
        }
        ;
        if (jenis === 'acara') {
            foundedSurat = suratId ? yield acara_1.default.findOne({ _id: suratId, userId: userId }) : yield acara_1.default.find({ userId: userId });
        }
        ;
        if (!foundedSurat) {
            throw (0, errorHandling_1.default)({
                message: 'Surat not found',
                statusCode: 404
            });
        }
        ;
        return res.status(200).json(foundedSurat);
    }
    catch (err) {
        next(err);
    }
    ;
});
exports.getSurat = getSurat;
const deleteSurat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jenis = (0, helper_1.queryJenisSurat)(req, res);
        if (!jenis) {
            throw (0, errorHandling_1.default)({
                statusCode: 400,
                message: 'Invalid Query'
            });
        }
        ;
        const userId = req.user._id;
        const suratId = req.params.suratId;
        let deletedSurat;
        if (jenis === 'kelahiran') {
            deletedSurat = yield kelahiran_1.default.deleteOne({ _id: suratId, userId: userId });
        }
        ;
        if (jenis === 'domisili') {
            deletedSurat = yield domisili_1.default.deleteOne({ _id: suratId, userId: userId });
        }
        ;
        if (jenis === 'pengantar') {
            deletedSurat = yield pengantar_1.default.deleteOne({ _id: suratId, userId: userId });
        }
        ;
        if (jenis === 'renovasi') {
            deletedSurat = yield renovasi_1.default.deleteOne({ _id: suratId, userId: userId });
        }
        ;
        if (jenis === 'acara') {
            deletedSurat = yield acara_1.default.deleteOne({ _id: suratId, userId: userId });
        }
        ;
        if ((deletedSurat === null || deletedSurat === void 0 ? void 0 : deletedSurat.deletedCount) === 0) {
            throw (0, errorHandling_1.default)({
                message: "Delete failed",
                statusCode: 404
            });
        }
        ;
        console.log(deletedSurat);
        return res.status(200).json(deletedSurat);
    }
    catch (err) {
        next(err);
    }
    ;
});
exports.deleteSurat = deleteSurat;
const generateSurat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jenis = (0, helper_1.queryJenisSurat)(req, res);
        if (!jenis) {
            throw (0, errorHandling_1.default)({
                statusCode: 400,
                message: 'Invalid Query'
            });
        }
        ;
        const suratId = req.params.suratId;
        let surat;
        if (jenis === 'kelahiran') {
            if (!(0, validate_1.validateSKelahiran)(req)) {
                throw (0, errorHandling_1.default)({
                    statusCode: 400,
                    message: 'Missing required fields',
                });
            }
            ;
            surat = yield (0, helper_1.generatorNewSurat)(req, kelahiran_1.default, suratId);
        }
        ;
        if (jenis === 'domisili') {
            if (!(0, validate_1.validateSDomisili)(req)) {
                throw (0, errorHandling_1.default)({
                    statusCode: 400,
                    message: 'Missing required body field in ' + jenis,
                });
            }
            ;
            surat = yield (0, helper_1.generatorNewSurat)(req, domisili_1.default, suratId);
        }
        ;
        if (jenis === 'pengantar') {
            if (!(0, validate_1.validateSPengantar)(req)) {
                throw (0, errorHandling_1.default)({
                    statusCode: 400,
                    message: 'Missing required fields',
                });
            }
            ;
            surat = yield (0, helper_1.generatorNewSurat)(req, pengantar_1.default, suratId);
        }
        ;
        if (jenis === 'renovasi') {
            if (!(0, validate_1.validateSRenovasi)(req)) {
                throw (0, errorHandling_1.default)({
                    statusCode: 400,
                    message: 'Missing required fields',
                });
            }
            ;
            surat = yield (0, helper_1.generatorNewSurat)(req, renovasi_1.default, suratId);
        }
        ;
        if (jenis === 'acara') {
            if (!(0, validate_1.validateSAcara)(req)) {
                throw (0, errorHandling_1.default)({
                    statusCode: 400,
                    message: 'Missing required fields',
                });
            }
            ;
            //tindak lanjut
            req.body;
            const { date } = req.body;
            req.body.day = (0, hari_1.getHari)(new Date(date).getDay());
            req.body.time = `${new Date(date).getHours()} : ${new Date(date).getMinutes()}  - Selesai `;
            surat = yield (0, helper_1.generatorNewSurat)(req, acara_1.default, suratId);
        }
        ;
        return res.status(200).json(surat);
    }
    catch (err) {
        next(err);
    }
    ;
});
exports.generateSurat = generateSurat;
