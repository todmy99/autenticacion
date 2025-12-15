import { Router } from "express";
import { requireJwtAuth } from "../middlewares/requireJwtAuth.js";

export const meRoutes = Router();

meRoutes.get("/session", (req, res) => {
    if (!req.session?.user) return res.status(401).json({ error: "Unauthorized (session)" });
    res.json({ me: req.session.user });
});

meRoutes.get("/jwt", requireJwtAuth, (req, res) => {
    res.json({ me: { sub: req.jwt.sub, role: req.jwt.role, email: req.jwt.email } });
});