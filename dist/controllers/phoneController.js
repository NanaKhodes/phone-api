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
exports.getPhoneRecordById = exports.insertPhoneRecord = void 0;
const PhoneRecord = require("../models/phoneRecord");
const insertPhoneRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone_number, run_time } = req.body;
    if (!phone_number || !run_time) {
        res
            .status(400)
            .json({ message: "phone_number and run_time are required" });
    }
    PhoneRecord.insert(Number(phone_number), run_time, (err, result) => {
        if (err)
            res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Record inserted", id: result.insertId });
    });
});
exports.insertPhoneRecord = insertPhoneRecord;
const getPhoneRecordById = (req, res) => {
    const id = req.params.id;
    PhoneRecord.findById(id, (err, results) => {
        if (err)
            res.status(500).json({ error: err.message });
        if (!results.length)
            res.status(404).json({ message: "Record not found" });
        res.json(results[0]);
    });
};
exports.getPhoneRecordById = getPhoneRecordById;
