# Deploy Guide

> Status: Deployment infrastructure is planned but not yet implemented.

This project is an MVP. There is no Dockerfile, no `docker-compose.yml`, and no CI/CD pipeline yet. The build commands below work today, but you will need to set up the surrounding infrastructure yourself.

---

## Planned Docker Compose

The team intends to add a `docker-compose.yml` at the project root that looks like this:

```yaml
version: '3.8'
services:
  api:
    build: ./apps/api
    ports:
      - '3000:3000'
    env_file: .env
    depends_on:
      - cockroachdb
    restart: unless-stopped

  cockroachdb:
    image: cockroachdb/cockroach:latest
    command: start-single-node --insecure
    ports:
      - '26257:26257'
    volumes:
      - cockroach-data:/cockroach/cockroach-data
    restart: unless-stopped

volumes:
  cockroach-data:
```

This setup is **not yet tested**. A Dockerfile for `apps/api/` still needs to be written. The Angular frontends (portfolio-public and admin) are not included in the Compose plan yet. They could be served via Nginx from their build outputs or through a reverse proxy.

---

## Build commands (work today)

These commands produce production-ready artifacts in `dist/`:

```bash
# Install dependencies (one time)
npm install

# Generate Prisma client
npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build the API
npx nx build api

# Build the public portfolio
npx nx build portfolio-public --configuration=production

# Build the admin dashboard
npx nx build admin --configuration=production
```

### Where the output goes

| App                | Output path                        |
| ------------------ | ---------------------------------- |
| API                | `dist/apps/api/`                   |
| portfolio-public   | `dist/apps/portfolio-public/browser/` |
| admin              | `dist/apps/admin/browser/`         |

The Angular builds produce static files. You can serve them with any web server (Nginx, Caddy, Apache, etc.).

---

## Environment variables (production)

| Variable       | Required | Default | Description                          |
| -------------- | -------- | ------- | ------------------------------------ |
| `DATABASE_URL` | Yes      | -       | CockroachDB connection string        |
| `JWT_SECRET`   | Yes      | -       | Secret key for signing JWT tokens    |
| `PORT`         | No       | 3000    | Port the API listens on              |
| `CORS_ORIGINS` | No       | *       | Comma-separated list of allowed origins |

Example `.env` file:

```env
DATABASE_URL="postgresql://root@cockroachdb:26257/defaultdb?sslmode=disable"
JWT_SECRET=change-this-to-a-strong-random-secret
PORT=3000
CORS_ORIGINS=https://your-domain.com,https://admin.your-domain.com
```

---

## How to deploy manually

You can deploy right now without Docker by running the builds above and then:

1. Copy `dist/apps/api/` to your server.
2. Install production dependencies in that folder.
3. Set the environment variables on your server.
4. Start the API with `node main.js`.
5. Upload `dist/apps/portfolio-public/browser/` and `dist/apps/admin/browser/` to a static file host or CDN.

This is a manual process. Automation is planned.

---

## Next steps

- [ ] Write Dockerfiles for each app
- [ ] Create a working `docker-compose.yml`
- [ ] Set up CI/CD (GitHub Actions, GitLab CI, or similar)
- [ ] Push Docker images to a registry (Docker Hub, GitHub Container Registry)
- [ ] Provision a production server or use a platform as a service (Render, Railway, Fly.io)
- [ ] Configure a reverse proxy (Nginx, Caddy) for the Angular apps
- [ ] Set up a database backup strategy
- [ ] Add health checks and monitoring

None of these steps have been tested yet. If you go through them, please report what you find.

---

🇧🇷 [Ler em Português](deploy.pt-BR.md)
