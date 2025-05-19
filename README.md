# Backend API con Node.js, Express y MongoDB 🐳

Este es un proyecto backend construido con **Node.js**, **Express**, **MongoDB** y **Docker**, listo para levantarlo con `docker-compose`.

## 📦 Requisitos

- [Node.js](https://nodejs.org/) (opcional si usas solo Docker)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Instrucciones para correr el proyecto

1. **Clonar el repositorio**

```bash
git clone https://github.com/mishigera/backend
cd backend

2. **Configura las variables de entorno**


Crea un archivo .env en la raíz con el siguiente contenido:

PORT=5050
MONGO_URI=mongodb://mongo:27017/imageapp
JWT_SECRET=12345

3. **Levanta los servicios con Docker**

docker-compose up --build

4. **Verifica que el backend esté corriendo**

http://localhost:5050/api/ping




Estructura del proyecto
.
├── Dockerfile
├── docker-compose.yml
├── server.js          // Punto de entrada que usa app.js
├── app.js             // App Express con rutas y conexión a Mongo
├── routes/
│   ├── auth.routes.js
│   └── image.routes.js
├── controllers/
├── models/
├── uploads/
├── middleware/
└── utils/



Scripts disponibles

npm install
npm run dev


Endpoints principales


GET /api/ping → ping de prueba

POST /api/auth/register → registrar usuario

POST /api/auth/login → login

POST /api/images/upload → subir imagen

GET /api/images/  → obtener imagenes


Desarrollado por Gerardo Melgoza 👨‍💻