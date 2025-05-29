"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const phoneRecord_1 = __importDefault(require("../models/phoneRecord"));
const validators_1 = require("../utils/validators");
const router = express_1.default.Router();
// Configure multer storage
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads");
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
    }
    const results = [];
    fs_1.default.createReadStream(req.file.path)
        .pipe((0, csv_parser_1.default)())
        .on("data", (data) => {
        results.push(data);
    })
        .on("end", () => {
        const errors = [];
        let insertedCount = 0;
        results.forEach((record) => {
            const { phone_number, run_time } = record;
            if (!phone_number || !run_time) {
                errors.push({ record, error: "Missing phone_number or run_time" });
                return;
            }
            if (!(0, validators_1.isValidPhoneNumber)(phone_number)) {
                errors.push({ record, error: "Invalid phone_number format" });
                return;
            }
            if (!(0, validators_1.isValidDateTime)(run_time)) {
                errors.push({ record, error: "Invalid run_time format" });
                return;
            }
            phoneRecord_1.default.insert(phone_number, run_time, (err) => {
                if (err) {
                    errors.push({ record, error: err.message });
                }
                else {
                    insertedCount++;
                }
            });
        });
        // Wait for async inserts before sending response
        setTimeout(() => {
            res.status(200).json({
                message: "File processed",
                inserted: insertedCount,
                errors,
            });
        }, 1000);
    });
});
exports.default = router;
