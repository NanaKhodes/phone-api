"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/phoneRoutes.js
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const phoneController_1 = require("../controllers/phoneController");
router.post("/phones", phoneController_1.insertPhoneRecord); // POST /api/phones
router.get("/phones/:id", phoneController_1.getPhoneRecordById); // GET /api/phones/:id
exports.default = router;
