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
exports.generatorNewSurat = exports.queryJenisSurat = void 0;
const validate_1 = require("../util/validate");
const queryJenisSurat = (req, res) => {
    let jenis;
    if (!req.query.jenis) {
        return false;
    }
    ;
    //Validate tambahan
    if (!(0, validate_1.validateJenisSurat)(req.query.jenis)) {
        return false;
    }
    ;
    jenis = req.query.jenis;
    return jenis;
};
exports.queryJenisSurat = queryJenisSurat;
const generatorNewSurat = (req, Surat, suratId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    req.body;
    let surat;
    if (suratId) {
        surat = yield Surat.updateOne({ _id: suratId, userId: userId }, Object.assign(Object.assign({}, req.body), { userId: userId }));
    }
    else {
        surat = new Surat(Object.assign(Object.assign({}, req.body), { userId: userId }));
        yield surat.save();
    }
    ;
    if (!surat) {
        return null;
    }
    ;
    return surat;
});
exports.generatorNewSurat = generatorNewSurat;
