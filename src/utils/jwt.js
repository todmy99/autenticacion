import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecret_jwt_dev"; // luego lo pasamos a .env

export function signJwt(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
}

export function verifyJwt(token) {
    return jwt.verify(token, JWT_SECRET);
}
