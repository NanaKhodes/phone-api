"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const PhoneRecord = {
    insert: (phone_number, run_time, callback) => {
        const sql = "INSERT INTO call_logs (phone_number, run_time) VALUES (?, ?)";
        db_1.default.query(sql, [phone_number, run_time], callback);
    },
    findById: (id, callback) => {
        const sql = "SELECT * FROM call_logs WHERE id = ?";
        db_1.default.query(sql, [id], callback);
    },
};
exports.default = PhoneRecord;
