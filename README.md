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

```

---

## 🛠 Setup Instructions

### 1. Start the Docker Container

```bash
docker compose up -d --build
```

This will start the PostgreSQL database, Vite+React app, and the Nestjs+Prisma app  in a Docker container.

---
### 2. Run the Prisma Migrations and Seed the Database

```bash
docker compose exec backend npx prisma migrate deploy
docker compose exec backend npx prisma db seed
```

---

### 3. Visit the Application in your browser

- Launch React frontend on http://localhost
- Launch NestJS backend on http://localhost:3000

---


### 🔑 Default Login

You can log in using the seeded user:

```
Email:    alice@example.com
Password: 1234
```

---

## 📦 Useful Scripts

---

## 📄 License

MIT License. See [LICENSE](./LICENSE).
