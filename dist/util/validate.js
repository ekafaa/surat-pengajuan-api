"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewUser = exports.validateSRenovasi = exports.validateSPengantar = exports.validateSKelahiran = exports.validateSDomisili = exports.validateSAcara = exports.validateJenisSurat = void 0;
const validateJenisSurat = (qry) => {
    return ['kelahiran', 'domisili', 'acara', 'pengantar', 'renovasi'].indexOf(qry) > -1;
};
exports.validateJenisSurat = validateJenisSurat;
const validateSAcara = ({ body }) => {
    return 'date' in body && 'eventManager' in body && 'place' in body;
};
exports.validateSAcara = validateSAcara;
const validateSDomisili = ({ body }) => {
    return 'address' in body && 'birthplace' in body && 'country' in body && 'gender' in body && 'job' in body && 'name' in body && 'religion' in body && 'status' in body;
};
exports.validateSDomisili = validateSDomisili;
const validateSKelahiran = ({ body }) => {
    return 'address' in body && 'birthplace' in body && 'childOrder' in body && 'fatherName' in body && 'motherName' in body && 'gender' in body && 'job' in body && 'name' in body;
};
exports.validateSKelahiran = validateSKelahiran;
const validateSPengantar = ({ body }) => {
    return 'address' in body && 'birthplace' in body &&
        'country' in body && 'religion' in body && 'report' in body && 'status' in body && 'nik' in body && 'name' in body;
};
exports.validateSPengantar = validateSPengantar;
const validateSRenovasi = ({ body }) => {
    return 'address' in body && 'name' in body && 'noHp' in body && 'renovAddress' in body;
};
exports.validateSRenovasi = validateSRenovasi;
const validateNewUser = (user) => {
    let condition = true;
    if (!user ||
        !user.username ||
        !user.password ||
        !user.bio ||
        !user.bio.address ||
        !user.bio.birthplace ||
        !user.bio.country ||
        !user.bio.job ||
        !user.bio.name ||
        !user.bio.nik ||
        !user.bio.noHp ||
        !user.bio.religion ||
        !user.bio.status)
        condition = false;
    return condition;
};
exports.validateNewUser = validateNewUser;
