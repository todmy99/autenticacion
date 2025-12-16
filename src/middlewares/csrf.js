import csrf from "csurf";

// usa session (cookie) para guardar el secret
export const csrfProtection = csrf({ cookie: false });

export function csrfTokenRoute(req, res) {
    res.json({ csrfToken: req.csrfToken() });
}
