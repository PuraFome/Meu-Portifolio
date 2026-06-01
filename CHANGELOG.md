# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- JWT authentication with Passport.js
- Projects CRUD endpoints
- Docker Compose setup
- Database seed scripts and migrations
- Login component and project management UI
- CI/CD pipeline

## [0.0.0] - 2026-06-01

### Added

- Monorepo Nx with 3 apps (`api`, `admin`, `portfolio-public`) and 2 libs (`shared-types`, `shared-ui`)
- NestJS API with `PrismaModule` and `PrismaService` configured for CockroachDB
- Prisma schema with `User` and `Project` models, adapter for CockroachDB via `@prisma/adapter-pg`
- Angular 21 apps using standalone components (`portfolio-public` on port 4200, `admin` on port 4201)
- Tailwind v4 CSS-first setup (`@import "tailwindcss"`) with custom theme tokens in both Angular apps
- `shared-types` library: `Project`, `CreateProjectDto`, `UpdateProjectDto`, `LoginDto`, `AuthResponse` interfaces
- `shared-ui` library: `ProjectCard`, `LoadingSpinner`, `EmptyState`, `ErrorMessage` components
- Admin app: `AuthService` (frontend token management), `AuthGuard` (route guard), `LoginComponent` placeholder
- README with project overview, stack, setup instructions, and environment variables

[308d288](https://github.com/Pura-Fome/Meu-Portifolio/commit/308d288) - Initial commit
[975831f](https://github.com/Pura-Fome/Meu-Portifolio/commit/975831f) - docs(readme): add complete README with project overview and stack
