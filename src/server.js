import express from "express";
import { runMigrations } from "./config/db.js";

runMigrations();

const app = express();

app.get("/", (req, res) => {
    res.send("PassPort Inc Auth API funcionando ✅ (con DB)");
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});
