import express from "express";
import { runMigrations } from "./config/db.js";
import { authRoutes } from "./routes/auth.routes.js";

runMigrations();

const app = express();

// para leer JSON del body
app.use(express.json());

app.get("/", (req, res) => {
    res.send("PassPort Inc Auth API funcionando ✅ (con DB)");
});

app.use("/auth", authRoutes);

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});
