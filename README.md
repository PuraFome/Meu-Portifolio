# Meu Portfólio

![Nx](https://img.shields.io/badge/Nx-22.7.5-blue)
![Angular](https://img.shields.io/badge/Angular-21.2-red)
![NestJS](https://img.shields.io/badge/NestJS-11-ea2845)
![Prisma](https://img.shields.io/badge/Prisma-7.8-2d3748)
![Tailwind](https://img.shields.io/badge/Tailwind-4.3.0-06b6d4)
![License](https://img.shields.io/badge/License-MIT-green)

Personal portfolio monorepo in MVP stage. Built with Nx, NestJS API, Angular frontends, Prisma + CockroachDB.

---

## ✨ Highlights

What already works:

- **Nx monorepo** with 3 apps and 2 libs
- **NestJS API** (port 3000) with `/api` global prefix, `PrismaModule` + `PrismaService` configured for CockroachDB
- **Prisma schema** with `User` and `Project` models, adapter for CockroachDB via `@prisma/adapter-pg`
- **Angular 21** apps using standalone components (`portfolio-public` on port 4200, `admin` on port 4201)
- **Tailwind v4** CSS-first setup (`@import "tailwindcss"`) with custom theme tokens
- **shared-types** library: `Project`, `CreateProjectDto`, `UpdateProjectDto`, `LoginDto`, `AuthResponse` interfaces
- **shared-ui** library: `ProjectCard`, `LoadingSpinner`, `EmptyState`, `ErrorMessage` components
- **Admin app**: `AuthService` (frontend token management), `AuthGuard` (route guard), `LoginComponent` placeholder

---

## 🚧 In development

Honest status of what's still missing:

- **JWT authentication** is not implemented on the API side. No Passport, no auth controller, no token generation. The admin app has a frontend guard and a stub `LoginComponent`, but there's nowhere to log in to.
- **CRUD endpoints** for projects do not exist. The API only has a `GET /api` that returns `{ message: "Hello API" }`.
- **Real project data** is not being fetched. `ProjectListComponent` and `ProjectDetailComponent` show placeholder text.
- **Docker Compose** setup does not exist yet.
- **Seed scripts** and **migrations** have not been set up.
- **Tests** exist only as generated scaffolding, no real test coverage.

---

## Stack

| Layer        | Technology                            |
| ------------ | ------------------------------------- |
| Monorepo     | Nx 22.7.5                             |
| Frontend     | Angular 21.2, Tailwind 4.3.0          |
| Backend      | NestJS 11                              |
| Database     | CockroachDB via Prisma 7.8             |
| Language     | TypeScript ~5.9                        |

---

## Monorepo structure

```
apps/
├── api/                    # NestJS REST API
├── admin/                  # Angular admin dashboard
└── portfolio-public/       # Angular public portfolio
libs/
├── shared-types/           # TypeScript interfaces & DTOs
└── shared-ui/              # Reusable UI components
```

---

## Prerequisites

- **Node.js** 20+
- **npm** (comes with Node)
- **Docker** (if running CockroachDB locally)

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
# Create a .env file at the project root with:
# DATABASE_URL="postgresql://root@localhost:26257/defaultdb?sslmode=disable"
# JWT_SECRET=your-secret-key
# PORT=3000

# 3. Generate Prisma client
npx prisma generate --schema=apps/api/prisma/schema.prisma

# 4. Start the API (port 3000)
npx nx serve api

# 5. In another terminal, start the public portfolio (port 4200)
npx nx serve portfolio-public

# 6. Or start the admin dashboard (port 4201)
npx nx serve admin
```

---

## Available scripts

| Script                           | Description                    |
| -------------------------------- | ------------------------------ |
| `npx nx serve api`               | Start NestJS API               |
| `npx nx serve portfolio-public`  | Start public portfolio         |
| `npx nx serve admin`             | Start admin dashboard          |
| `npx nx test <project>`          | Run tests for a project        |
| `npx nx run-many -t test`        | Run all tests                  |

---

## Environment variables

| Variable       | Required | Default | Description                             |
| -------------- | -------- | ------- | --------------------------------------- |
| `DATABASE_URL` | Yes      | -       | CockroachDB connection string           |
| `JWT_SECRET`   | No       | -       | Secret key for JWT (not yet implemented) |
| `PORT`         | No       | 3000    | API server port                         |

---

## Deploy

Coming soon. Docker Compose setup is planned. No live URL yet.

---

## License

[MIT](LICENSE)

---

🇧🇷 [Ver em Português](README.pt-BR.md)
