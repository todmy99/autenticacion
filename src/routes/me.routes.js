import { Router } from "express";

export const meRoutes = Router();

meRoutes.get("/session", (req, res) => {
    if (!req.session?.user) return res.status(401).json({ error: "Unauthorized (session)" });
    res.json({ me: req.session.user });
});
