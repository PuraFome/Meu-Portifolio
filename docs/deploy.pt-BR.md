# Guia de Deploy

> Status: A infraestrutura de deploy está planejada, mas ainda não foi implementada.

Este projeto é um MVP. Não existe Dockerfile, `docker-compose.yml` ou pipeline de CI/CD. Os comandos de build abaixo funcionam hoje, mas você precisará montar a infraestrutura ao redor por conta própria.

---

## Docker Compose planejado

A intenção é adicionar um `docker-compose.yml` na raiz do projeto com a seguinte estrutura:

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

Essa configuração **ainda não foi testada**. Ainda é preciso escrever um Dockerfile para `apps/api/`. Os frontends Angular (portfolio-public e admin) não estão incluídos no plano do Compose por enquanto. Eles poderão ser servidos via Nginx a partir dos artefatos de build ou por meio de um proxy reverso.

---

## Comandos de build (funcionam hoje)

Estes comandos produzem artefatos prontos para produção em `dist/`:

```bash
# Instalar dependências (uma vez)
npm install

# Gerar o cliente Prisma
npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build da API
npx nx build api

# Build do portfólio público
npx nx build portfolio-public --configuration=production

# Build do painel admin
npx nx build admin --configuration=production
```

### Onde os artefatos são gerados

| App                | Diretório de saída                     |
| ------------------ | -------------------------------------- |
| API                | `dist/apps/api/`                       |
| portfolio-public   | `dist/apps/portfolio-public/browser/`  |
| admin              | `dist/apps/admin/browser/`             |

Os builds Angular produzem arquivos estáticos. Você pode servi-los com qualquer servidor web (Nginx, Caddy, Apache etc.).

---

## Variáveis de ambiente (produção)

| Variável        | Obrigatória | Padrão | Descrição                               |
| --------------- | ----------- | ------ | --------------------------------------- |
| `DATABASE_URL`  | Sim         | -      | String de conexão do CockroachDB        |
| `JWT_SECRET`    | Sim         | -      | Chave secreta para assinar tokens JWT   |
| `PORT`          | Não         | 3000   | Porta em que a API escuta               |
| `CORS_ORIGINS`  | Não         | *      | Lista de origens permitidas (separadas por vírgula) |

Exemplo de arquivo `.env`:

```env
DATABASE_URL="postgresql://root@cockroachdb:26257/defaultdb?sslmode=disable"
JWT_SECRET=change-this-to-a-strong-random-secret
PORT=3000
CORS_ORIGINS=https://your-domain.com,https://admin.your-domain.com
```

---

## Como fazer deploy manual

Você pode fazer deploy agora mesmo sem Docker. Execute os builds acima e então:

1. Copie `dist/apps/api/` para o seu servidor.
2. Instale as dependências de produção dentro dessa pasta.
3. Configure as variáveis de ambiente no servidor.
4. Inicie a API com `node main.js`.
5. Envie `dist/apps/portfolio-public/browser/` e `dist/apps/admin/browser/` para um host de arquivos estáticos ou CDN.

Esse processo é manual. A automação está planejada.

---

## Próximos passos

- [ ] Escrever Dockerfiles para cada aplicação
- [ ] Criar um `docker-compose.yml` funcional
- [ ] Montar pipeline de CI/CD (GitHub Actions, GitLab CI ou similar)
- [ ] Enviar imagens Docker para um registry (Docker Hub, GitHub Container Registry)
- [ ] Provisionar um servidor de produção ou usar uma plataforma como serviço (Render, Railway, Fly.io)
- [ ] Configurar um proxy reverso (Nginx, Caddy) para os apps Angular
- [ ] Definir uma estratégia de backup do banco de dados
- [ ] Adicionar health checks e monitoramento

Nenhum desses passos foi testado ainda. Se você passar por eles, por favor relate o que encontrar.

---

🇺🇸 [Read in English](deploy.md)
