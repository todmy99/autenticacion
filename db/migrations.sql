PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('USER','ADMIN')) DEFAULT 'USER',
    failed_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until INTEGER
);

CREATE TABLE IF NOT EXISTS audit_login (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    success INTEGER NOT NULL,
    ip TEXT,
    created_at INTEGER NOT NULL
);
