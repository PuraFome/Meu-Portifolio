# API Reference

Base URL: `http://localhost:3000/api`

All endpoints are prefixed with `/api`. The API is built with NestJS and serves the Meu Portifolio project.

---

## ✅ Implemented

### `GET /api`

Health check endpoint. Returns a simple welcome message.

**Response** `200 OK`

```json
{
  "message": "Hello API"
}
```

**Notes**

- No authentication required.
- This is the only working endpoint. Every other endpoint below is planned but not yet built.

---

## 🚧 Planned

These endpoints do not exist yet. They are part of the roadmap and will be implemented in future iterations.

### Authentication

#### `POST /api/auth/login`

Authenticates an admin user and returns a JWT access token.

**Request Body**

```json
{
  "email": "admin@example.com",
  "senha": "your-password"
}
```

**Response** `201 Created`

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "admin@example.com"
  }
}
```

**Status Codes**

| Code | Description |
|------|-------------|
| 201  | Login successful, token returned |
| 401  | Invalid email or password |

---

### Projects

#### `GET /api/projects`

Lists all projects. Public endpoint, no auth required.

**Query Parameters** (optional)

| Parameter | Type    | Description |
|-----------|---------|-------------|
| destaque  | boolean | Filter by featured projects only |
| page      | number  | Page number (default: 1) |
| limit     | number  | Items per page (default: 10) |

**Response** `200 OK`

```json
{
  "data": [
    {
      "id": "uuid",
      "titulo": "Project Name",
      "descricao": "Project description",
      "tecnologias": ["TypeScript", "Angular", "NestJS"],
      "imagemUrl": "https://example.com/image.png",
      "linkDemo": "https://demo.example.com",
      "linkRepo": "https://github.com/user/repo",
      "destaque": true,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 10,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

#### `GET /api/projects/:id`

Returns a single project by ID. Public endpoint, no auth required.

**Response** `200 OK`

```json
{
  "id": "uuid",
  "titulo": "Project Name",
  "descricao": "Project description",
  "tecnologias": ["TypeScript", "Angular", "NestJS"],
  "imagemUrl": "https://example.com/image.png",
  "linkDemo": "https://demo.example.com",
  "linkRepo": "https://github.com/user/repo",
  "destaque": true,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

**Status Codes**

| Code | Description |
|------|-------------|
| 200  | Project found |
| 404  | Project not found |

---

#### `POST /api/projects`

Creates a new project. Requires JWT authentication (admin only).

**Request Body**

```json
{
  "titulo": "New Project",
  "descricao": "Project description",
  "tecnologias": ["TypeScript", "NestJS"],
  "imagemUrl": "https://example.com/image.png",
  "linkDemo": "https://demo.example.com",
  "linkRepo": "https://github.com/user/repo",
  "destaque": false
}
```

**Response** `201 Created`

```json
{
  "id": "uuid",
  "titulo": "New Project",
  "descricao": "Project description",
  "tecnologias": ["TypeScript", "NestJS"],
  "imagemUrl": "https://example.com/image.png",
  "linkDemo": "https://demo.example.com",
  "linkRepo": "https://github.com/user/repo",
  "destaque": false,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

**Status Codes**

| Code | Description |
|------|-------------|
| 201  | Project created |
| 400  | Validation error (missing or invalid fields) |
| 401  | Unauthorized (missing or invalid JWT) |

---

#### `PUT /api/projects/:id`

Updates an existing project. Requires JWT authentication (admin only).

**Request Body** (all fields optional, only provided fields are updated)

```json
{
  "titulo": "Updated Title",
  "descricao": "Updated description",
  "tecnologias": ["TypeScript", "React"],
  "imagemUrl": "https://example.com/new-image.png",
  "linkDemo": "https://new-demo.example.com",
  "linkRepo": "https://github.com/user/new-repo",
  "destaque": true
}
```

**Response** `200 OK`

```json
{
  "id": "uuid",
  "titulo": "Updated Title",
  "descricao": "Updated description",
  "tecnologias": ["TypeScript", "React"],
  "imagemUrl": "https://example.com/new-image.png",
  "linkDemo": "https://new-demo.example.com",
  "linkRepo": "https://github.com/user/new-repo",
  "destaque": true,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-06-01T00:00:00.000Z"
}
```

**Status Codes**

| Code | Description |
|------|-------------|
| 200  | Project updated |
| 400  | Validation error |
| 401  | Unauthorized (missing or invalid JWT) |
| 404  | Project not found |

---

#### `DELETE /api/projects/:id`

Deletes a project by ID. Requires JWT authentication (admin only).

**Response** `200 OK`

```json
{
  "message": "Project deleted successfully"
}
```

**Status Codes**

| Code | Description |
|------|-------------|
| 200  | Project deleted |
| 401  | Unauthorized (missing or invalid JWT) |
| 404  | Project not found |

---

## Data Models

### Project

Represents a portfolio project entry.

| Field        | Type       | Required | Description |
|-------------|------------|----------|-------------|
| id          | string     | yes      | UUID v4 |
| titulo      | string     | yes      | Project title |
| descricao   | string     | yes      | Project description |
| tecnologias | string[]   | yes      | List of technologies used |
| imagemUrl   | string?    | no       | Screenshot or cover image URL |
| linkDemo    | string?    | no       | Live demo URL |
| linkRepo    | string?    | no       | Source repository URL |
| destaque    | boolean    | yes      | Whether the project is featured |
| createdAt   | string     | yes      | ISO 8601 timestamp |
| updatedAt   | string     | yes      | ISO 8601 timestamp |

### CreateProjectDto

Payload for creating a new project.

| Field        | Type       | Required | Description |
|-------------|------------|----------|-------------|
| titulo      | string     | yes      | Project title |
| descricao   | string     | yes      | Project description |
| tecnologias | string[]   | yes      | List of technologies used |
| imagemUrl   | string?    | no       | Screenshot or cover image URL |
| linkDemo    | string?    | no       | Live demo URL |
| linkRepo    | string?    | no       | Source repository URL |
| destaque    | boolean?   | no       | Whether the project is featured (default: false) |

### UpdateProjectDto

Payload for updating an existing project. All fields are optional. Same shape as `CreateProjectDto` but every field is optional.

```typescript
interface UpdateProjectDto extends Partial<CreateProjectDto> {}
```

### LoginDto

Payload for admin authentication.

| Field  | Type   | Required | Description |
|--------|--------|----------|-------------|
| email  | string | yes      | Admin email |
| senha  | string | yes      | Admin password |

### AuthResponse

Response returned on successful login.

| Field        | Type                           | Description |
|-------------|--------------------------------|-------------|
| access_token | string                         | JWT Bearer token |
| user         | `{ id: string; email: string }` | Authenticated user info |

---

## Authentication

JWT Bearer token authentication is planned via **Passport.js** with the following strategy:

1. The client sends `POST /api/auth/login` with `email` and `senha`.
2. The server validates credentials against the database (bcrypt hash comparison).
3. On success, the server returns a signed JWT (`access_token`) and basic user info.
4. For protected endpoints, the client includes the token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

**Status: Not implemented.** No Passport setup, no auth controller, no token generation exists yet on the API side.

---

[🇧🇷 Ler em Português](API.pt-BR.md)
