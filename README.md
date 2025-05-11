# Altametrics Invoice App

This is a full-stack web application built with:

- **Backend**: NestJS + Prisma + PostgreSQL
- **Frontend**: React + Vite + TailwindCSS
- **Auth**: JWT-based login
- **State Management**: Redux Toolkit & React Query
- **Styling**: TailwindCSS v4.1

---

## 🚀 Getting Started (Local Dev)

### Prerequisites

- Docker
- Docker Compose
- Node.js (v18 recommended)
- pnpm or npm

---

### 📦 Project Structure

```
client/         # React + Vite frontend
server/         # NestJS + Prisma backend(inside server/)
docker-compose.yml
Dockerfile
```

---

## 🛠 Setup Instructions

### 1. Install dependencies

```bash
pnpm install
# or
npm install
```

This will install root + client + server dependencies.

---
### 2. Configure environment variables
- Create a `.env` file in the `server/` directory.
- Copy the contents of `.env.example` to `.env` and update the values as needed.
- Make sure to set the `DATABASE_URL` to match your the docker PostgreSQL setup.
- Add your JWT secret key to the `.env` file.

---

### 3. Start the app with Dockerized DB + local frontend/backend

```bash
npm run dev
```

This will:
- Start the Postgres DB in Docker
- Run `prisma migrate dev` and `prisma db seed` inside `server/`
- Launch React frontend on http://localhost:5173
- Launch NestJS backend on http://localhost:3000

---


### 🔑 Default Login

You can log in using the seeded user:

```
Email:    alice@example.com
Password: password123
```

---

## 📦 Useful Scripts

```json
"scripts": {
  "start:db": "docker compose up -d",
  "start:app": "concurrently -k -n \"backend,frontend\" -c \"cyan,green\" \"npm run dev --prefix server\" \"npm run dev --prefix client\"",
  "prisma:deploy": "cd server && npx prisma migrate dev --name init && cd ..",
  "prisma:seed": "cd server && npx prisma db seed && cd ..",
  "dev": "npm run start:db && sleep 5 && npm run prisma:deploy && npm run prisma:seed && npm run start:app"
}
```

---

## 📄 License

MIT License. See [LICENSE](./LICENSE).
