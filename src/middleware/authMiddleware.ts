import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string | number;
    }
  }
}

const JWT_SECRET: Secret = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    res.status(401).json({ message: "Authentication token required." });
    return; 
  }

  try {
    const user = (await jwt.verify(token, JWT_SECRET)) as JwtPayload;
    req.userId = user.userId;
    next(); 
  } catch (err: any) {
    console.error("JWT verification failed:", err.message);
    res.status(403).json({ message: "Invalid or expired token." });
    return; 
  }
};
