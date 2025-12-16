import validator from "validator";

export function sanitizeBody(req, res, next) {
    if (req.body && typeof req.body === "object") {
        for (const key of Object.keys(req.body)) {
            const val = req.body[key];
            if (typeof val === "string") {
                req.body[key] = validator.escape(val.trim());
            }
        }
    }
    next();
}
