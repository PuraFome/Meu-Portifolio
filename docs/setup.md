# Local Development Setup

This guide walks through setting up the Meu Portfólio project for local development. For an overview of the project, stack, and current status, see the [README](../README.md).

---

## Prerequisites

Make sure you have the following installed:

| Tool          | Minimum Version | Notes                                    |
| ------------- | --------------- | ---------------------------------------- |
| **Node.js**   | 20+             | [nodejs.org](https://nodejs.org)         |
| **npm**       | 10+             | Comes with Node.js                       |
| **Docker Desktop** | Latest     | [docker.com](https://www.docker.com/products/docker-desktop/) |
| **Git**       | Latest          | [git-scm.com](https://git-scm.com)       |

To check your versions:

```bash
node --version   # e.g. v20.18.0
npm --version    # e.g. 10.8.2
docker --version # e.g. Docker version 27.0.3
git --version    # e.g. git version 2.45.2
```

---

## Step 1: Clone and install

```bash
git clone https://github.com/your-username/Meu-Portifolio.git
cd Meu-Portifolio
npm install
```

The install may take a few minutes. Nx generates cache files and compiles native bindings on first run.

---

## Step 2: Environment variables

Create a `.env` file in the project root. Copy the variables below:

```env
DATABASE_URL="postgresql://root@localhost:26257/defaultdb?sslmode=disable"
JWT_SECRET=your-secret-key
PORT=3000
```

| Variable       | Required | Default | Description                                         |
| -------------- | -------- | ------- | --------------------------------------------------- |
| `DATABASE_URL` | Yes      | -       | CockroachDB connection string (Prisma adapter)      |
| `JWT_SECRET`   | No       | -       | Secret key for JWT (placeholder; not yet implemented on the API) |
| `PORT`         | No       | 3000    | Port the NestJS API listens on                      |

---

## Step 3: Start CockroachDB

Run CockroachDB in a Docker container:

```bash
docker run -d \
  --name cockroachdb \
  -p 26257:26257 \
  cockroachdb/cockroach:latest start-single-node --insecure
```

This starts a single-node CockroachDB cluster on port **26257** with `root` access and no TLS.

To stop the container later:

```bash
docker stop cockroachdb
docker rm cockroachdb
```

To verify it is running:

```bash
docker ps --filter name=cockroachdb
```

---

## Step 4: Set up the database schema

Generate the Prisma client and push the schema to CockroachDB:

```bash
npx prisma generate --schema=apps/api/prisma/schema.prisma
npx prisma db push --schema=apps/api/prisma/schema.prisma
```

- `prisma generate` creates the typed client in `node_modules/.prisma/client`.
- `prisma db push` syncs the `User` and `Project` models from the schema to the running CockroachDB instance.

**Note:** A database seed script does not exist yet. This is planned for a future iteration. After running `db push`, the tables will exist but will be empty.

---

## Step 5: Run the apps

You need three separate terminals. Each command runs a different part of the monorepo.

### Terminal 1: API (NestJS)

```bash
npx nx serve api
```

The API starts on **http://localhost:3000**. You should see `Hello API` at `GET /api`.

### Terminal 2: Public portfolio (Angular)

```bash
npx nx serve portfolio-public
```

The public portfolio starts on **http://localhost:4200**.

### Terminal 3: Admin dashboard (Angular)

```bash
npx nx serve admin
```

The admin dashboard starts on **http://localhost:4201**.

All three apps use Nx's computation caching, so rebuilds after the first run are fast.

---

## Running tests

| Command                    | Description                       |
| -------------------------- | --------------------------------- |
| `npm test`                 | Run all tests across the monorepo |
| `npm run test:coverage`    | Run all tests with coverage       |
| `npx nx test api`          | Run only the API tests            |
| `npx nx test admin`        | Run only the admin app tests      |
| `npx nx test portfolio-public` | Run only the portfolio tests  |
| `npx nx test <project> --watch` | Run tests in watch mode       |

**Note:** Tests currently exist only as generated scaffolding. Real test coverage is planned.

---

## Troubleshooting

### Port conflicts

If port 3000, 4200, or 4201 is already in use, find and stop the process:

```bash
# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
# macOS / Linux
lsof -i :3000
kill -9 <PID>
```

For the Angular apps, you can also change the port:

```bash
npx nx serve portfolio-public --port 4202
```

### Prisma generate fails

- Make sure CockroachDB is running (`docker ps`).
- If the Prisma client cache is stale, clean it:

  ```bash
  npx prisma generate --schema=apps/api/prisma/schema.prisma --force
  ```

- If you see `Can't reach database server`, verify the Docker container is up and the `DATABASE_URL` in `.env` is correct.

### Docker not starting

- Open Docker Desktop and check the dashboard for errors.
- Ensure virtualization is enabled in your BIOS/UEFI.
- On Windows, make sure WSL 2 is installed and configured.

### npm install errors

- Delete `node_modules` and `package-lock.json`, then retry:

  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

- If you hit network timeouts, try a different registry:

  ```bash
  npm install --registry=https://registry.npmmirror.com
  ```

- Make sure your npm version is 10+ (`npm --version`).

### Nx cache issues

If Nx behaves unexpectedly, reset its cache:

```bash
npx nx reset
```

---

## Next steps

- Read the [README](../README.md) for the project overview, highlights, and roadmap.
- See the [ARCHITECTURE](../ARCHITECTURE.md) guide for the monorepo structure and design decisions.
- Check the [API docs](../API.md) for endpoint details.
- See the [CHANGELOG](../CHANGELOG.md) for recent updates.

---

🇧🇷 [Ver em Português](setup.pt-BR.md)
