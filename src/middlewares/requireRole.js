export function requireRole(role) {
    return (req, res, next) => {
        const sessionRole = req.session?.user?.role;
        const jwtRole = req.jwt?.role;

        const currentRole = sessionRole || jwtRole;

        if (currentRole !== role) {
        return res.status(403).json({ error: "Forbidden" });
        }

        next();
    };
}
