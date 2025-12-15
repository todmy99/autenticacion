import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db", "passport.db");
const migrationsPath = path.join(process.cwd(), "db", "migrations.sql");

export const db = new Database(dbPath);

export function runMigrations() {
    const sql = fs.readFileSync(migrationsPath, "utf-8");
    db.exec(sql);
}
