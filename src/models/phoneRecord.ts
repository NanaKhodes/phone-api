import db from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2"; // 

export interface IPhoneRecord {
  id?: number;
  phone_number: string;
  run_time: string;
}

const PhoneRecord = {
  insert: (phoneNumber: string, runTime: string): Promise<ResultSetHeader> => {
    const sql = "INSERT INTO call_logs (phone_number, run_time) VALUES (?, ?)"; // Assuming your table is `phone_records`
    return new Promise((resolve, reject) => {
      db.query(sql, [phoneNumber, runTime], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result as ResultSetHeader);
      });
    });
  },

  
  findById: (id: number): Promise<IPhoneRecord | undefined> => {
    const sql = "SELECT * FROM call_logs WHERE id = ?"; // Assuming your table is `phone_records`
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        const records = results as IPhoneRecord[];
        resolve(records.length > 0 ? records[0] : undefined);
      });
    });
  },

  bulkInsert: (records: (string | number)[][]): Promise<ResultSetHeader> => {
    if (records.length === 0) {
      return Promise.resolve({ affectedRows: 0, insertId: 0, warningStatus: 0, fieldCount: 0 } as ResultSetHeader);
    }
    const sql = "INSERT INTO call_logs (phone_number, run_time) VALUES ?"; // MySQL's special syntax for bulk insert
    return new Promise((resolve, reject) => {
    
      db.query(sql, [records], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result as ResultSetHeader);
      });
    });
  },
};

export default PhoneRecord;