# Referencia da API

URL Base: `http://localhost:3000/api`

Todos os endpoints sao prefixados com `/api`. A API e construida com NestJS e serve o projeto Meu Portifolio.

---

## ✅ Implementado

### `GET /api`

Endpoint de health check. Retorna uma mensagem de boas-vindas simples.

**Resposta** `200 OK`

```json
{
  "message": "Hello API"
}
```

**Observacoes**

- Nao requer autenticacao.
- Este e o unico endpoint funcional. Todos os demais endpoints abaixo estao planejados, mas ainda nao foram construidos.

---

## 🚧 Planejado

Estes endpoints ainda nao existem. Fazem parte do roteiro de desenvolvimento e serao implementados em iteracoes futuras.

### Autenticacao

#### `POST /api/auth/login`

Autentica um usuario administrador e retorna um token JWT.

**Corpo da Requisicao**

```json
{
  "email": "admin@example.com",
  "senha": "sua-senha"
}
```

**Resposta** `201 Created`

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "admin@example.com"
  }
}
```

**Codigos de Status**

| Codigo | Descricao |
|--------|-----------|
| 201    | Login realizado com sucesso, token retornado |
| 401    | Email ou senha invalidos |

---

### Projetos

#### `GET /api/projects`

Lista todos os projetos. Endpoint publico, nao requer autenticacao.

**Parametros de Consulta** (opcionais)

| Parametro | Tipo    | Descricao |
|-----------|---------|-----------|
| destaque  | boolean | Filtrar apenas projetos em destaque |
| page      | number  | Numero da pagina (padrao: 1) |
| limit     | number  | Itens por pagina (padrao: 10) |

**Resposta** `200 OK`

```json
{
  "data": [
    {
      "id": "uuid",
      "titulo": "Nome do Projeto",
      "descricao": "Descricao do projeto",
      "tecnologias": ["TypeScript", "Angular", "NestJS"],
      "imagemUrl": "https://example.com/imagem.png",
      "linkDemo": "https://demo.example.com",
      "linkRepo": "https://github.com/usuario/repo",
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

Retorna um projeto pelo ID. Endpoint publico, nao requer autenticacao.

**Resposta** `200 OK`

```json
{
  "id": "uuid",
  "titulo": "Nome do Projeto",
  "descricao": "Descricao do projeto",
  "tecnologias": ["TypeScript", "Angular", "NestJS"],
  "imagemUrl": "https://example.com/imagem.png",
  "linkDemo": "https://demo.example.com",
  "linkRepo": "https://github.com/usuario/repo",
  "destaque": true,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

**Codigos de Status**

| Codigo | Descricao |
|--------|-----------|
| 200    | Projeto encontrado |
| 404    | Projeto nao encontrado |

---

#### `POST /api/projects`

Cria um novo projeto. Requer autenticacao JWT (somente admin).

**Corpo da Requisicao**

```json
{
  "titulo": "Novo Projeto",
  "descricao": "Descricao do projeto",
  "tecnologias": ["TypeScript", "NestJS"],
  "imagemUrl": "https://example.com/imagem.png",
  "linkDemo": "https://demo.example.com",
  "linkRepo": "https://github.com/usuario/repo",
  "destaque": false
}
```

**Resposta** `201 Created`

```json
{
  "id": "uuid",
  "titulo": "Novo Projeto",
  "descricao": "Descricao do projeto",
  "tecnologias": ["TypeScript", "NestJS"],
  "imagemUrl": "https://example.com/imagem.png",
  "linkDemo": "https://demo.example.com",
  "linkRepo": "https://github.com/usuario/repo",
  "destaque": false,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

**Codigos de Status**

| Codigo | Descricao |
|--------|-----------|
| 201    | Projeto criado |
| 400    | Erro de validacao (campos ausentes ou invalidos) |
| 401    | Nao autorizado (JWT ausente ou invalido) |

---

#### `PUT /api/projects/:id`

Atualiza um projeto existente. Requer autenticacao JWT (somente admin).

**Corpo da Requisicao** (todos os campos opcionais, apenas os fornecidos serao atualizados)

```json
{
  "titulo": "Titulo Atualizado",
  "descricao": "Descricao atualizada",
  "tecnologias": ["TypeScript", "React"],
  "imagemUrl": "https://example.com/nova-imagem.png",
  "linkDemo": "https://novo-demo.example.com",
  "linkRepo": "https://github.com/usuario/novo-repo",
  "destaque": true
}
```

**Resposta** `200 OK`

```json
{
  "id": "uuid",
  "titulo": "Titulo Atualizado",
  "descricao": "Descricao atualizada",
  "tecnologias": ["TypeScript", "React"],
  "imagemUrl": "https://example.com/nova-imagem.png",
  "linkDemo": "https://novo-demo.example.com",
  "linkRepo": "https://github.com/usuario/novo-repo",
  "destaque": true,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-06-01T00:00:00.000Z"
}
```

**Codigos de Status**

| Codigo | Descricao |
|--------|-----------|
| 200    | Projeto atualizado |
| 400    | Erro de validacao |
| 401    | Nao autorizado (JWT ausente ou invalido) |
| 404    | Projeto nao encontrado |

---

#### `DELETE /api/projects/:id`

Remove um projeto pelo ID. Requer autenticacao JWT (somente admin).

**Resposta** `200 OK`

```json
{
  "message": "Projeto removido com sucesso"
}
```

**Codigos de Status**

| Codigo | Descricao |
|--------|-----------|
| 200    | Projeto removido |
| 401    | Nao autorizado (JWT ausente ou invalido) |
| 404    | Projeto nao encontrado |

---

## Modelos de Dados

### Project

Representa um projeto do portfolio.

| Campo       | Tipo       | Obrigatorio | Descricao |
|-------------|------------|-------------|-----------|
| id          | string     | sim         | UUID v4 |
| titulo      | string     | sim         | Titulo do projeto |
| descricao   | string     | sim         | Descricao do projeto |
| tecnologias | string[]   | sim         | Lista de tecnologias utilizadas |
| imagemUrl   | string?    | nao         | URL da screenshot ou imagem de capa |
| linkDemo    | string?    | nao         | URL do demo ao vivo |
| linkRepo    | string?    | nao         | URL do repositorio fonte |
| destaque    | boolean    | sim         | Se o projeto esta em destaque |
| createdAt   | string     | sim         | Timestamp ISO 8601 |
| updatedAt   | string     | sim         | Timestamp ISO 8601 |

### CreateProjectDto

Dados para criacao de um novo projeto.

| Campo       | Tipo       | Obrigatorio | Descricao |
|-------------|------------|-------------|-----------|
| titulo      | string     | sim         | Titulo do projeto |
| descricao   | string     | sim         | Descricao do projeto |
| tecnologias | string[]   | sim         | Lista de tecnologias utilizadas |
| imagemUrl   | string?    | nao         | URL da screenshot ou imagem de capa |
| linkDemo    | string?    | nao         | URL do demo ao vivo |
| linkRepo    | string?    | nao         | URL do repositorio fonte |
| destaque    | boolean?   | nao         | Se o projeto esta em destaque (padrao: false) |

### UpdateProjectDto

Dados para atualizacao de um projeto existente. Todos os campos sao opcionais. Mesma estrutura que `CreateProjectDto`, mas todos os campos sao opcionais.

```typescript
interface UpdateProjectDto extends Partial<CreateProjectDto> {}
```

### LoginDto

Dados para autenticacao do administrador.

| Campo  | Tipo   | Obrigatorio | Descricao |
|--------|--------|-------------|-----------|
| email  | string | sim         | Email do admin |
| senha  | string | sim         | Senha do admin |

### AuthResponse

Resposta retornada apos login bem-sucedido.

| Campo        | Tipo                           | Descricao |
|-------------|--------------------------------|-----------|
| access_token | string                         | Token JWT Bearer |
| user         | `{ id: string; email: string }` | Informacoes do usuario autenticado |

---

## Autenticacao

A autenticacao via token JWT Bearer esta planejada para ser implementada com **Passport.js** seguindo a seguinte estrategia:

1. O cliente envia `POST /api/auth/login` com `email` e `senha`.
2. O servidor valida as credenciais no banco de dados (comparacao de hash bcrypt).
3. Em caso de sucesso, o servidor retorna um JWT assinado (`access_token`) e informacoes basicas do usuario.
4. Para endpoints protegidos, o cliente inclui o token no cabecalho `Authorization`:

```
Authorization: Bearer <access_token>
```

**Status: Nao implementado.** Nao ha configuracao Passport, nem controller de autenticacao, nem geracao de tokens no lado da API.

---

[🇺🇸 Read in English](API.md)
