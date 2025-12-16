import rateLimit from "express-rate-limit";

export const loginRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    limit: 20,                // max 20 requests por IP
    standardHeaders: true,
    legacyHeaders: false,
});
