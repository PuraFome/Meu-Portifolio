# Frontend Overview

> **Language:** English &mdash; [Read in Portuguese](overview.pt-BR.md)

## Stack

| Technology     | Version  |
| -------------- | -------- |
| Angular        | 21.2     |
| Tailwind CSS   | 4.3.0    |
| Nx             | 22.7.5   |
| TypeScript     | ~5.9     |

## Project Structure

```
apps/
├── portfolio-public/       # Public portfolio site (port 4200)
│   └── src/app/
│       └── projects/
│           ├── project-list/    # Project list page (stub)
│           └── project-detail/  # Project detail page (stub)
└── admin/                  # Admin dashboard (port 4201)
    └── src/app/
        ├── login/                # Login page (stub)
        ├── projects/
        │   ├── project-list/     # Admin project list (stub)
        │   └── project-form/     # Create/edit project form (stub)
        ├── services/
        │   └── auth.service.ts   # Frontend token management
        └── guards/
            └── auth.guard.ts     # Route guard (frontend only)
libs/
├── shared-types/           # TypeScript interfaces & DTOs
│   └── src/lib/
│       ├── project.interface.ts  # Project, CreateProjectDto, UpdateProjectDto
│       └── auth.interface.ts     # LoginDto, AuthResponse
└── shared-ui/              # Reusable UI components
    └── src/lib/
        ├── project-card/         # Project card display component
        ├── loading-spinner/      # Loading indicator
        ├── empty-state/          # Empty state placeholder
        └── error-message/        # Error message display
```

## Implemented Features

These parts are working and in place:

### Shared UI Components (shared-ui)
All four components are exported from the library and ready to use:

- **`ProjectCardComponent`** &mdash; Displays a project thumbnail with title, tech tags, and links.
- **`LoadingSpinnerComponent`** &mdash; Animated loading indicator for async operations.
- **`EmptyStateComponent`** &mdash; Placeholder shown when no data is available.
- **`ErrorMessageComponent`** &mdash; Displays error messages to the user.

### Shared Types (shared-types)
The library exports all interfaces needed across frontend apps:

- `Project` &mdash; Full project entity.
- `CreateProjectDto` &mdash; Payload for creating a project.
- `UpdateProjectDto` &mdash; Partial type for updates.
- `LoginDto` &mdash; Email + password payload.
- `AuthResponse` &mdash; Expected token response `{ access_token, user }`.

### Public App (portfolio-public)
- Standalone Angular application served on port 4200.
- Two routes defined via `app.routes.ts`:
  - `/projects` &mdash; `ProjectListComponent` (lazy loaded)
  - `/projects/:id` &mdash; `ProjectDetailComponent` (lazy loaded)
- Default redirect from `/` to `/projects`.

### Admin App (admin)
- Standalone Angular application served on port 4201.
- Routes defined via `app.routes.ts`:
  - `/login` &mdash; `LoginComponent` (public)
  - `/projects` &mdash; `ProjectListComponent` (guarded by `AuthGuard`)
  - `/projects/new` &mdash; `ProjectFormComponent` (guarded)
  - `/projects/:id/edit` &mdash; `ProjectFormComponent` (guarded)
  - Default redirect from `/` to `/projects`.

### AuthService
- Manages an `admin_token` in `localStorage`.
- Provides `getToken()`, `isAuthenticated()`, and `logout()` methods.
- **Frontend only** &mdash; there is no backend JWT endpoint yet.

### AuthGuard
- Route guard that checks `AuthService.isAuthenticated()`.
- Redirects to `/login` if no token is found.
- **Frontend only** &mdash; does not validate the token against the server.

## Placeholder Content (Stubs)

These components exist but show placeholder text. They are not connected to any API:

| Component            | App               | Template Content         |
|----------------------|-------------------|--------------------------|
| ProjectListComponent | portfolio-public  | `Carregando projetos...` |
| ProjectDetailComponent | portfolio-public| `Carregando projeto...`  |
| LoginComponent       | admin             | `login works!`           |
| ProjectListComponent | admin             | `project-list works!`    |
| ProjectFormComponent | admin             | `project-form works!`    |

## Planned Features

These items are not yet implemented:

### API Integration
- `ProjectListComponent` and `ProjectDetailComponent` in the public app do not fetch real data.
- No HTTP client calls exist for any endpoint.
- No loading, error, or empty states are wired to real data sources.

### Backend Authentication
- `AuthService` can store a token but has no `login()` method that calls an API.
- `AuthGuard` checks `localStorage` only. It does not verify token expiry or validity.
- The `LoginComponent` is a stub with no form or submit logic.
- The `AuthResponse` interface is defined but never produced by any backend endpoint.

### Project CRUD in Admin
- `ProjectListComponent` in admin displays a static placeholder.
- `ProjectFormComponent` has no form fields, validation, or submit handler.
- No HTTP service layer exists for project operations.

### Tests
- No meaningful test coverage exists for any frontend component or service.

## Running the Frontend

```bash
# Public portfolio (port 4200)
npx nx serve portfolio-public

# Admin dashboard (port 4201)
npx nx serve admin
```

---

[🇧🇷 Versão em Português](overview.pt-BR.md)
