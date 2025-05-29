import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

export interface IUserInput {
  id?: number;
  name: string;
  email: string;
  password:  string;
}
  
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const register = (req: Request, res: Response): void => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err || !hashedPassword) {
      res.status(500).json({ error: err?.message });
      return;
    }

    const newUser: IUserInput = { name, email, password: hashedPassword };

    UserModel.create(newUser, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  UserModel.findByEmail(email, (err, results) => {
    if (err || !results || results.length === 0) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Login successful", token });
    });
  });
};
