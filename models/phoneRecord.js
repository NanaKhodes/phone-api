const db = require("../config/db");

const PhoneRecord = {
  insert: (phone_number, run_time, callback) => {
    const sql = "INSERT INTO call_logs (phone_number, run_time) VALUES (?, ?)";
    db.query(sql, [phone_number, run_time], callback);
  },

  findById: (id, callback) => {
    const sql = "SELECT * FROM call_logs WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = PhoneRecord;
