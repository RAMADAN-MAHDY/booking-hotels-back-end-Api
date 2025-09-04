import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  user?: any; // هتخزن فيها البيانات اللي جوه التوكن (id, email, role ...)
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // ناخد التوكن من الكوكيز
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // نتحقق من التوكن
    const decoded = jwt.verify(token, secretKey);

    // نخزن بيانات المستخدم في req.user
    req.user = decoded;

    next(); // نكمل للـ controller
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
