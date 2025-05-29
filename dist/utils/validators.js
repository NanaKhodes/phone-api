"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPhoneNumber = isValidPhoneNumber;
exports.isValidDateTime = isValidDateTime;
function isValidDateTime(datetime) {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return regex.test(datetime);
}
function isValidPhoneNumber(phone) {
    const regex = /^\+234[789][01]\d{8}$/;
    return regex.test(phone);
}
