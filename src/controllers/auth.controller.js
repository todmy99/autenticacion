import { db } from "../config/db.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { signJwt } from "../utils/jwt.js";

const MAX_FAILS = 5;
const LOCK_MINUTES = 10;

function now() {
    return Date.now();
}


/**
 * REGISTRO DE USUARIO
 * POST /auth/register
 */
export async function register(req, res) {
    const { email, password, role } = req.body;

    // Validación mínima
    if (!email || !password) {
        return res.status(400).json({ error: "email and password are required" });
    }

    try {
        // Hashear contraseña
        const password_hash = await hashPassword(password);

        // Guardar usuario en la DB
        const safeRole = role === "ADMIN" ? "ADMIN" : "USER";

        const stmt = db.prepare(
            "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)"
        );

        const result = stmt.run(email, password_hash, safeRole);

        return res.status(201).json({
            id: result.lastInsertRowid,
            email,
            role: safeRole,
        });
    } catch (error) {
        // Email duplicado
        return res.status(409).json({ error: "email already exists" });
    }
}

/**
 * LOGIN DE USUARIO
 * POST /auth/login
 * mode: "session" | undefined
 */
export async function login(req, res) {
    const { email, password, mode } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "email and password are required" });
    }

    // Buscar usuario
    const user = db
        .prepare("SELECT * FROM users WHERE email = ?")
        .get(email);

    if (!user) {
        return res.status(401).json({ error: "invalid credentials" });
    }

    if (user.locked_until && user.locked_until > now()) {
        return res.status(423).json({ error: "Account locked. Try later." });
    }


    // Verificar password
    const validPassword = await verifyPassword(
        password,
        user.password_hash
    );

    if (!validPassword) {
        const fails = user.failed_attempts + 1;

        if (fails >= MAX_FAILS) {
            const lockedUntil = now() + LOCK_MINUTES * 60 * 1000;

            db.prepare(
                "UPDATE users SET failed_attempts = 0, locked_until = ? WHERE id = ?"
            ).run(lockedUntil, user.id);

            return res.status(423).json({ error: "Account locked. Try later." });
        }

        db.prepare(
            "UPDATE users SET failed_attempts = ? WHERE id = ?"
        ).run(fails, user.id);

        return res.status(401).json({ error: "invalid credentials" });
    }

    db.prepare(
        "UPDATE users SET failed_attempts = 0, locked_until = NULL WHERE id = ?"
    ).run(user.id);


    // 👉 LOGIN CON SESIÓN
    if (mode === "session") {
        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        return res.json({
            ok: true,
            mode: "session",
            user: req.session.user,
        });
    }

    // 👉 LOGIN CON JWT
    if (mode === "jwt") {
        const token = signJwt({
            sub: String(user.id),
            role: user.role,
            email: user.email
        });

        return res.json({ ok: true, mode: "jwt", token });
    }

    // 👉 LOGIN SIMPLE (sin sesión todavía)
    return res.json({
        ok: true,
        mode: "none",
        id: user.id,
        email: user.email,
        role: user.role,
    });
}

/**
 * LOGOUT (sesión)
 * POST /auth/logout
 */
export function logout(req, res) {
    if (!req.session) {
        return res.json({ ok: true });
    }

    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ ok: true });
    });
}
