This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Clonar el repositorio.

2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.

3. Instalar dependencias
```bash
npm install
```
4. Levantar la base de datos 
```bash
docker compose up -d
```
5. Correr las migraciones de Prisma
```bash
npx prisma migrate dev
```
6. Ejecutar seed 
```bash
npm run seed
```
7. Correr el proyecto
```bash
npm run dev
```

