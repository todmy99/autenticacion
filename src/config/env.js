import "dotenv/config";

export const env = {
    PORT: Number(process.env.PORT || 3000),
    SESSION_SECRET: process.env.SESSION_SECRET || "dev_session_secret",
    JWT_SECRET: process.env.JWT_SECRET || "dev_jwt_secret",
    COOKIE_SECURE: (process.env.COOKIE_SECURE || "false") === "true",
};
