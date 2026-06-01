# Backend Overview

> **Language:** English &mdash; [Read in Portuguese](overview.pt-BR.md)

## Stack

| Technology     | Version  |
| -------------- | -------- |
| NestJS         | 11       |
| Prisma         | 7.8      |
| CockroachDB    | (driver) |
| Nx             | 22.7.5   |
| TypeScript     | ~5.9     |

## Project Structure

```
apps/api/src/app/
├── app.controller.ts      # Root controller (GET /api)
├── app.module.ts          # Root module
├── app.service.ts         # Root service
└── prisma/
    ├── prisma.module.ts   # Global Prisma module
    └── prisma.service.ts  # PrismaClient wrapper (CockroachDB)
```

The database schema lives at `apps/api/prisma/schema.prisma`. Prisma client output is generated to `apps/api/src/generated/prisma/`.

## Implemented Features

These parts are working and in place:

### AppModule + PrismaModule
- `AppModule` imports `PrismaModule` and registers `AppController` + `AppService`.
- `PrismaModule` is a global module that provides `PrismaService` (extends `PrismaClient`) configured with the CockroachDB adapter (`@prisma/adapter-pg`).

### Root Endpoint
- **`GET /api`** returns `{ "message": "Hello API" }`.
- The API has a global prefix `/api` applied at the `main.ts` level.

### Prisma Schema
Two models are defined:

**User**
| Field     | Type     | Notes                |
|-----------|----------|----------------------|
| id        | String   | UUID (auto)          |
| email     | String   | Unique               |
| senha     | String   | bcrypt hash (planned)|
| createdAt | DateTime | Auto                 |
| updatedAt | DateTime | Auto                 |

**Project**
| Field        | Type     | Notes                |
|--------------|----------|----------------------|
| id           | String   | UUID (auto)          |
| titulo       | String   |                      |
| descricao    | String   |                      |
| tecnologias  | String[] | Array of tech names  |
| imagemUrl    | String?  | Optional             |
| linkDemo     | String?  | Optional             |
| linkRepo     | String?  | Optional             |
| destaque     | Boolean  | Default false        |
| createdAt    | DateTime | Auto                 |
| updatedAt    | DateTime | Auto                 |

## Planned Features

These items are not yet implemented:

### AuthModule
- JWT authentication with Passport.
- `POST /api/auth/login` endpoint to validate credentials and return a token.
- `@UseGuards(JwtAuthGuard)` decorator for protected routes.
- The frontend `AuthService` already expects `{ access_token, user }` as response format.

### ProjectsModule
- Full CRUD for projects:
  - `GET /api/projects` &mdash; list all projects
  - `GET /api/projects/:id` &mdash; get project by ID
  - `POST /api/projects` &mdash; create project (admin only)
  - `PUT /api/projects/:id` &mdash; update project (admin only)
  - `DELETE /api/projects/:id` &mdash; delete project (admin only)
- Input validation with `class-validator` and `class-transformer`.

### UsersModule
- User management endpoints.
- Admin user creation and role management.

### Migrations & Seed
- Prisma migrations are not yet created.
- No seed script exists for development data.

### Docker Compose
- No Docker Compose setup for CockroachDB or the API.

## API Design

- **Style:** RESTful
- **Prefix:** `/api` (set globally)
- **Validation:** `class-validator` / `class-transformer` packages available but not wired up
- **Auth strategy:** JWT via `@nestjs/jwt` + `@nestjs/passport` (planned)

## Environment Variables

| Variable       | Required | Default | Description                             |
| -------------- | -------- | ------- | --------------------------------------- |
| `DATABASE_URL` | Yes      | -       | CockroachDB connection string           |
| `JWT_SECRET`   | No       | -       | Secret key for JWT (not yet implemented) |
| `PORT`         | No       | 3000    | API server port                         |

## Running the API

```bash
npx nx serve api
```

The server starts on `http://localhost:3000`.

---

[🇧🇷 Versão em Português](overview.pt-BR.md)
