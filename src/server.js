import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";

import { runMigrations } from "./config/db.js";
import { sessionMiddleware } from "./config/session.js";

import { authRoutes } from "./routes/auth.routes.js";
import { meRoutes } from "./routes/me.routes.js";
import { adminRoutes } from "./routes/admin.routes.js";

import { sanitizeBody } from "./middlewares/sanitize.js";
import { csrfProtection, csrfTokenRoute } from "./middlewares/csrf.js";

runMigrations();

const app = express();

app.use(helmet());
app.use(express.json());

app.use(cookieParser());
app.use(sessionMiddleware());

app.use(sanitizeBody);

app.get("/", (req, res) => {
    res.send("PassPort Inc Auth API funcionando ✅ (con DB)");
});

// endpoint para pedir CSRF token (usa sesión)
app.get("/csrf-token", csrfProtection, csrfTokenRoute);

// 👇 authRoutes ahora decide qué endpoints llevan CSRF
app.use("/auth", authRoutes);

app.use("/me", meRoutes);
app.use("/admin", adminRoutes);

app.listen(env.PORT, () => {
    console.log(`Servidor en http://localhost:${env.PORT}`);
});
