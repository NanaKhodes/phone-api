import db from "../config/db";

import { PoolConnection } from "mysql2";

import { RowDataPacket } from "mysql2";

export interface User {
  id?: number;

  name: string;

  email: string;

  password: string;
}

const UserModel = {
  create: (user: User, callback: (err: Error | null, result?: any) => void) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [user.name, user.email, user.password], callback);
  },

  findByEmail: (
    email: string,

    callback: (err: Error | null, result?: any[]) => void
  ) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {
      if (err) {
        callback(err);

        return;
      }

      callback(null, results as User[]);
    });
  },
};

export default UserModel;
