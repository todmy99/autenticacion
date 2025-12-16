Sistema de Autenticación
================================

Proyecto que implementa un sistema de autenticación seguro,
pensado para principiantes.

--------------------------------
Tecnologías usadas
--------------------------------
- Node.js
- Express
- SQLite
- bcrypt (hashing de contraseñas)
- express-session (sesiones con cookies)
- JSON Web Tokens (JWT)
- CSRF Protection (csurf)
- Helmet (headers de seguridad)

--------------------------------
Instalación
--------------------------------
1. Clonar el repositorio
2. Instalar dependencias:

   npm install

3. Crear archivo .env en la raíz:

   PORT=3000
   SESSION_SECRET=supersecret_session
   JWT_SECRET=supersecret_jwt
   COOKIE_SECURE=false

4. Iniciar el servidor:

   npm run dev

El servidor se ejecutará en:
http://localhost:3000

--------------------------------
Estructura del proyecto
--------------------------------
```
autenticacion/
│
├── src/
│   ├── controllers/     Lógica de autenticación
│   ├── routes/          Rutas de la API
│   ├── middlewares/     Seguridad (CSRF, RBAC, JWT, etc.)
│   ├── config/          DB, sesiones y variables de entorno
│   └── utils/           Hashing y JWT
│
├── db/
│   └── passport.db     Base de datos SQLite (no se sube a GitHub)
│
├── .env.example
├── package.json
└── README.txt
```
--------------------------------
Endpoints principales
--------------------------------

Registro de usuario:
POST /auth/register
Body:
{
  "email": "user@test.com",
  "password": "1234"
}

Login con JWT:
POST /auth/login-jwt
Body:
{
  "email": "user@test.com",
  "password": "1234"
}

Login con sesión (requiere CSRF):
POST /auth/login-session

Obtener token CSRF:
GET /csrf-token

Usuario autenticado (JWT):
GET /me/jwt

Usuario autenticado (sesión):
GET /me/session

Ruta solo para administradores:
GET /admin/users

--------------------------------
Seguridad implementada
--------------------------------
- Contraseñas hasheadas con bcrypt
- Sesiones con cookies httpOnly
- JWT en header Authorization
- Protección CSRF para sesiones
- Sanitización de inputs (XSS)
- Rate limit y bloqueo por fuerza bruta
- Control de acceso por roles (USER / ADMIN)

--------------------------------
Notas finales
--------------------------------
Este proyecto tiene fines educativos.
La configuración está pensada para desarrollo local.
En producción se debe usar HTTPS y COOKIE_SECURE=true.
