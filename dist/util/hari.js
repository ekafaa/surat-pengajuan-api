"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHari = void 0;
const getHari = (idx) => {
    let day;
    switch (idx) {
        case 0:
            day = 'Senin';
            break;
        case 1:
            day = 'Selasa';
            break;
        case 2:
            day = 'Rabu';
            break;
        case 3:
            day = 'Kamis';
            break;
        case 4:
            day = 'Jumat';
            break;
        case 5:
            day = 'Sabtu';
            break;
        case 6:
            day = 'Minggu';
            break;
    }
    ;
    return day;
};
exports.getHari = getHari;
