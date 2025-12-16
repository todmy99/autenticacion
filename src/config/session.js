import session from "express-session";
import SQLiteStoreFactory from "connect-sqlite3";
import { env } from "./env.js";

const SQLiteStore = SQLiteStoreFactory(session);

export function sessionMiddleware() {
    return session({
        store: new SQLiteStore({ db: "sessions.db", dir: "./db" }),
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,          // ✅ obligatorio
            secure: env.COOKIE_SECURE, // ✅ en prod debería ser true (HTTPS)
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
        },
    });
}
