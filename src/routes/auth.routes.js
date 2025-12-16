import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { csrfProtection } from "../middlewares/csrf.js";
import { loginRateLimit } from "../middlewares/loginRateLimit.js";

export const authRoutes = Router();

// Registro: simple (sin CSRF)
authRoutes.post("/register", register);

// Login JWT: sin CSRF
authRoutes.post("/login-jwt", loginRateLimit, (req, res, next) => {
    req.body.mode = "jwt";
    return login(req, res, next);
});

// ✅ Login sesión: con CSRF
authRoutes.post("/login-session", csrfProtection, loginRateLimit, (req, res, next) => {
    req.body.mode = "session";
    return login(req, res, next);
});

// ✅ Logout sesión: con CSRF
authRoutes.post("/logout", csrfProtection, logout);
