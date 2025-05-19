// routes/phoneRoutes.js
const express = require("express");
const router = express.Router();
const {
  insertPhoneRecord,
  getPhoneRecordById,
} = require("../controllers/phoneController");

router.post("/phones", insertPhoneRecord); // POST /api/phones
router.get("/phones/:id", getPhoneRecordById); // GET /api/phones/:id

module.exports = router;
