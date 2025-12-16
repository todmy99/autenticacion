import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { csrfProtection } from "../middlewares/csrf.js";
import { loginRateLimit } from "../middlewares/loginRateLimit.js";

export const authRoutes = Router();

// Registro: lo dejamos SIN CSRF (simple)
authRoutes.post("/register", register);

// Login JWT: SIN CSRF (porque va por Authorization)
authRoutes.post("/login-jwt", loginRateLimit, (req, res, next) => {
    req.body.mode = "jwt";
    return login(req, res, next);
});

// Login sesión: CON CSRF (obligatorio y correcto)
authRoutes.post("/login-session", csrfProtection, loginRateLimit, (req, res, next) => {
    req.body.mode = "session";
    return login(req, res, next);
});

// Logout sesión: CON CSRF
authRoutes.post("/logout", csrfProtection, logout);
