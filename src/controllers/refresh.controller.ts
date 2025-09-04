import { Request, Response } from "express";
import { verifyRefreshToken, generateToken } from "../utils/jwt.js";

export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  const { valid, decoded } = verifyRefreshToken(token);
  if (!valid || !decoded) return res.status(403).json({ message: "Invalid refresh token" });

  const newAccessToken = generateToken({ id: decoded.id });

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 min
  });

  res.json({ message: "Token refreshed" });
};
