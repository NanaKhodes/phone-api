const express = require("express");
const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");
const PhoneRecord = require("../models/phoneRecord");

const { isValidPhoneNumber, isValidDateTime } = require("../utils/validators");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Upload route
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      console.log(data);
      results.push(data);
    })
    .on("end", () => {
      let errors = [];
      let insertedCount = 0;

      results.forEach((record) => {
        const { phone_number, run_time } = record;

        // Check for missing values
        if (!phone_number || !run_time) {
          errors.push({ record, error: "Missing phone_number or run_time" });
          return;
        }

        // Run validation functions
        if (!isValidPhoneNumber(phone_number)) {
          errors.push({ record, error: "Invalid phone_number format" });
          return;
        }

        if (!isValidDateTime(run_time)) {
          errors.push({ record, error: "Invalid run_time format" });
          return;
        }

        // Insert into DB if valid
        PhoneRecord.insert(phone_number, run_time, (err) => {
          if (err) {
            errors.push({ record, error: err.message });
          } else {
            insertedCount++;
          }
        });
      });

      // Delay response slightly to let async inserts finish
      setTimeout(() => {
        res.status(200).json({
          message: "File processed",
          inserted: insertedCount,
          errors,
        });
      }, 1000);
    });
});

module.exports = router;

