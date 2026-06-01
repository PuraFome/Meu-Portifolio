# Architecture

> Monorepo architecture for Meu Portfolio.

🇧🇷 [Ver em Português](ARCHITECTURE.pt-BR.md)

---

## Overview

This is an Nx monorepo managing three applications and two shared libraries. The workspace uses Nx 22.7.5 with dedicated plugins for Angular, NestJS, and Jest. TypeScript ~5.9 across the board with strict mode enabled.

### Stack summary

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Monorepo     | Nx 22.7.5                         |
| Frontend     | Angular 21.2 standalone           |
| Styling      | Tailwind v4 CSS-first             |
| Backend      | NestJS 11                         |
| Database     | CockroachDB via Prisma 7.8        |
| Language     | TypeScript ~5.9 (strict)          |

---

## Folder structure

```
meu-portifolio/
├── apps/
│   ├── api/                         # NestJS REST API
│   │   ├── prisma/
│   │   │   └── schema.prisma        # User + Project models
│   │   └── src/
│   │       ├── main.ts              # Bootstrap, port 3000, global prefix /api
│   │       ├── app/
│   │       │   ├── app.module.ts    # Root module (imports PrismaModule)
│   │       │   ├── app.controller.ts # GET /api → { message: "Hello API" }
│   │       │   ├── app.service.ts
│   │       │   └── prisma/
│   │       │       ├── prisma.module.ts
│   │       │       └── prisma.service.ts  # PrismaClient + PrismaPg adapter
│   │       └── generated/prisma/    # Prisma client (gitignored)
│   │
│   ├── admin/                       # Angular admin dashboard
│   │   └── src/
│   │       ├── main.ts              # bootstrapApplication (standalone)
│   │       ├── styles.css           # @import "tailwindcss" + @theme tokens
│   │       └── app/
│   │           ├── app.ts           # Root standalone component
│   │           ├── app.config.ts    # Router + error listeners
│   │           ├── app.routes.ts    # /login, /projects, /projects/new, /projects/:id/edit
│   │           ├── guards/
│   │           │   └── auth.guard.ts      # Frontend-only guard (checks localStorage)
│   │           ├── services/
│   │           │   └── auth.service.ts    # Token get/set/logout (no real API)
│   │           ├── login/
│   │           │   └── login.component.ts # Stub: <p>login works!</p>
│   │           └── projects/
│   │               ├── project-list/
│   │               │   └── project-list.component.ts  # Stub
│   │               └── project-form/
│   │                   └── project-form.component.ts  # Stub
│   │
│   └── portfolio-public/            # Angular public portfolio
│       └── src/
│           ├── main.ts              # bootstrapApplication (standalone)
│           ├── styles.css           # @import "tailwindcss" + @theme tokens
│           └── app/
│               ├── app.ts
│               ├── app.config.ts
│               ├── app.routes.ts    # /projects, /projects/:id
│               └── projects/
│                   ├── project-list/
│                   │   └── project-list.component.ts   # Stub: "Carregando projetos..."
│                   └── project-detail/
│                       └── project-detail.component.ts # Stub: "Carregando projeto..."
│
├── libs/
│   ├── shared-types/                # TypeScript interfaces and DTOs
│   │   └── src/lib/
│   │       └── project.interface.ts # Project, CreateProjectDto, UpdateProjectDto, LoginDto, AuthResponse
│   │
│   └── shared-ui/                   # Reusable Angular standalone components
│       └── src/lib/
│           ├── project-card/
│           │   └── project-card.component.ts      # Card with image, tech badges, links
│           ├── loading-spinner/
│           │   └── loading-spinner.component.ts    # SVG spinner (sm/md/lg)
│           ├── empty-state/
│           │   └── empty-state.component.ts        # Empty state with message
│           └── error-message/
│               └── error-message.component.ts      # Alert-style error banner
│
├── nx.json                         # Nx config: plugins, caching, generators
├── package.json                    # Dependencies and scripts
├── tsconfig.base.json              # Shared TS config with path aliases
├── prisma.config.ts                # Prisma CLI config
└── .env                            # DATABASE_URL (one variable)
```

---

## Data flow (current)

```
                  ┌──────────────────┐
                  │  CockroachDB     │
                  │  localhost:26257 │
                  └────────┬─────────┘
                           │
                  ┌────────▼─────────┐
                  │  API (NestJS)    │
                  │  localhost:3000  │
                  │  GET /api only   │
                  └────────┬─────────┘
                           │
          ┌────────────────┴────────────────┐
          │                                 │
┌─────────▼──────────┐          ┌──────────▼─────────┐
│  portfolio-public   │          │  admin              │
│  localhost:4200     │          │  localhost:4201     │
│  Public portfolio   │          │  Admin dashboard    │
│  No auth required   │          │  Has auth guard     │
└────────────────────┘          └────────────────────┘
```

The API exposes a single `GET /api` endpoint returning `{ message: "Hello API" }`. There are no CRUD endpoints yet. Both Angular apps display placeholder content. No real data flows between the database and the frontends.

---

## Architecture decisions

### Why Nx

- **Incremental builds and caching**: Nx caches `build`, `test`, and `lint` outputs. Re-running a target on unchanged code returns instantly from cache.
- **Dependency graph**: `nx graph` surfaces the relationship between apps and libs, making it obvious when a change in `shared-types` affects both Angular apps.
- **Code generation**: Nx generators scaffold Angular apps, libs, and components consistently with preconfigured defaults (standalone, CSS, Jest, ESLint).
- **Unified tooling**: One `nx.json` controls all targets, inputs, and cache policies across the monorepo.

### Angular standalone (no NgModules)

Both frontend apps use `bootstrapApplication` instead of `platformBrowserDynamic` with an `AppModule`. All components are `standalone: true`.

- **Simpler mental model**: No need to declare components in NgModules. Each component imports exactly what it needs.
- **Smaller bundles**: Tree-shaking works better without NgModule wrappers. The framework can drop unused directives and pipes at build time.
- **Lazy loading with `loadComponent`**: Routes point directly to component classes instead of NgModules, reducing boilerplate.

### Tailwind v4 CSS-first (no JS config)

- **`@import "tailwindcss"`**: Tailwind v4 shifts configuration from `tailwind.config.js` into native CSS. The only setup is a single `@import` in the stylesheet.
- **`@theme` tokens**: Custom design tokens (colors, fonts) are declared as CSS variables in `@theme` blocks. No JavaScript config file to maintain.
- **No PostCSS complexity**: Tailwind v4 works as a Vite/Angular plugin without additional PostCSS configuration.

Both `admin` and `portfolio-public` share the same theme configuration:

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #1e293b;
  --font-family-sans: "Inter", sans-serif;
}
```

### CockroachDB with Prisma

- **CockroachDB**: PostgreSQL-compatible, horizontally scalable, resilient. It runs locally on `localhost:26257` via a single-node cluster.
- **Prisma ORM**: Type-safe database access with auto-generated client. The schema defines `User` and `Project` models.
- **`@prisma/adapter-pg`**: Prisma 7.8 uses an adapter pattern. The `PrismaPg` adapter connects to CockroachDB's PostgreSQL wire protocol.
- **PrismaModule is global**: `PrismaService` is registered as a `@Global()` module in NestJS, so any feature module can inject it without re-importing.

---

## Port reference

| Application       | Port  | Framework |
| ----------------- | ----- | --------- |
| portfolio-public  | 4200  | Angular   |
| admin             | 4201  | Angular   |
| api (NestJS)      | 3000  | NestJS    |
| CockroachDB       | 26257 | CockroachDB |

---

## Path aliases

Defined in `tsconfig.base.json`:

| Alias                           | Resolves to                         |
| ------------------------------- | ----------------------------------- |
| `@meu-portifolio/shared-types`  | `libs/shared-types/src/index.ts`    |
| `@meu-portifolio/shared-ui`     | `libs/shared-ui/src/index.ts`       |

---

## 🚧 Planned evolution

These are the next steps for the project. They are **not implemented yet**.

### JWT authentication (API side)

- Add `@nestjs/passport` and `@nestjs/jwt` to the API.
- Create an `AuthController` with `POST /api/auth/login` and `POST /api/auth/register`.
- Implement `LocalStrategy` (email + password) and `JwtStrategy` (bearer token).
- Return a signed JWT on successful login. Protect project endpoints with `@UseGuards(AuthGuard('jwt'))`.
- The admin frontend already has `AuthService` and `AuthGuard` ready on the client side. They will call the real endpoints once the API is ready.

### CRUD projects endpoints

- `GET /api/projects` - list all projects (public).
- `GET /api/projects/:id` - get one project (public).
- `POST /api/projects` - create project (admin only, JWT required).
- `PUT /api/projects/:id` - update project (admin only, JWT required).
- `DELETE /api/projects/:id` - delete project (admin only, JWT required).
- The Prisma schema already has the `Project` model. The `PrismaService` is ready to be injected into a `ProjectsController`.

### Docker Compose

- A `docker-compose.yml` will define two services: `api` (NestJS) and `cockroachdb`.
- The API container will use the built output from `dist/apps/api`.
- CockroachDB will use the official `cockroachdb/cockroach` image with a persistent volume.
- Environment variables will be injected via a `.env` file.

### CI/CD pipeline

- A GitHub Actions workflow (`.github/workflows/ci.yml`) will run on every push.
- Steps: install dependencies, lint, test, build.
- Deployment to a cloud provider will be added later.

---

## License

MIT
