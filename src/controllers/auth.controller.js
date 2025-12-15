import { db } from "../config/db.js";
import { hashPassword } from "../utils/password.js";

export async function register(req, res) {
    const { email, password } = req.body;

    // 1) Validación mínima (simple)
    if (!email || !password) {
        return res.status(400).json({ error: "email and password are required" });
    }

    // 2) Hashear password
    const password_hash = await hashPassword(password);

    // 3) Insertar en SQLite
    try {
        const stmt = db.prepare(
        "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)"
        );
        const info = stmt.run(email, password_hash, "USER");

        return res.status(201).json({
        id: info.lastInsertRowid,
        email,
        role: "USER",
        });
    } catch (err) {
        // email unique => si ya existe, falla
        return res.status(409).json({ error: "email already exists" });
    }
}

import { verifyPassword } from "../utils/password.js";

// ...

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "email and password are required" });
    }

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!user) {
        return res.status(401).json({ error: "invalid credentials" });
    }

    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) {
        return res.status(401).json({ error: "invalid credentials" });
    }

    // por ahora solo confirmamos login correcto
    return res.json({ ok: true, id: user.id, email: user.email, role: user.role });
}
