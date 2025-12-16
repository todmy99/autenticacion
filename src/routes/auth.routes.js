import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { loginRateLimit } from "../middlewares/loginRateLimit.js";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/login", loginRateLimit, login);
