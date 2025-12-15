import session from "express-session";
import SQLiteStoreFactory from "connect-sqlite3";

const SQLiteStore = SQLiteStoreFactory(session);

export function sessionMiddleware() {
    return session({
        store: new SQLiteStore({ db: "sessions.db", dir: "./db" }),
        secret: "supersecret_session_dev", // luego lo pasamos a .env
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,   // luego lo hacemos configurable
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        },
    });
}
