import { Router } from "express";
import { requireJwtAuth } from "../middlewares/requireJwtAuth.js";
import { requireRole } from "../middlewares/requireRole.js";
import { db } from "../config/db.js";

export const adminRoutes = Router();

// Solo ADMIN usando JWT
adminRoutes.get("/users", requireJwtAuth, requireRole("ADMIN"), (req, res) => {
    const users = db.prepare("SELECT id, email, role FROM users").all();
    res.json({ users });
});
