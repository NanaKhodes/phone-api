"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
require('dotenv').config();
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};
const pool = mysql2_1.default.createPool(dbConfig);
pool.getConnection((err, connection) => {
    if (err) {
        console.error('DB connection failed:', err);
    }
    else {
        console.log('Connected to MySQL database!');
        connection.release();
    }
});
console.log("ENV VARS:", process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME);
exports.default = pool;
