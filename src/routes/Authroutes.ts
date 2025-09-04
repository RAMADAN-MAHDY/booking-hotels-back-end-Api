import { Router } from "express";
import { register, login, logout ,veryfayToken} from "../controllers/Auth.controller.js";
import { refreshToken } from "../controllers/refresh.controller.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/veryfayToken",authMiddleware , veryfayToken);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

export default router;
