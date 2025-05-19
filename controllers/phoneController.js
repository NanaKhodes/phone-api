const PhoneRecord = require("../models/phoneRecord");

const insertPhoneRecord = (req, res) => {
  const { phone_number, run_time } = req.body;

  if (!phone_number || !run_time) {
    return res
      .status(400)
      .json({ message: "phone_number and run_time are required" });
  }

  PhoneRecord.insert(phone_number, run_time, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Record inserted", id: result.insertId });
  });
};

const getPhoneRecordById = (req, res) => {
  const id = req.params.id;

  PhoneRecord.findById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length)
      return res.status(404).json({ message: "Record not found" });
    res.json(results[0]);
  });
};

module.exports = { insertPhoneRecord, getPhoneRecordById };
