# Guia de Setup Local

Este guia explica como configurar o projeto Meu Portfólio para desenvolvimento local. Para uma visão geral do projeto, stack e status atual, veja o [README](../README.pt-BR.md).

---

## Pré-requisitos

Verifique se você tem as seguintes ferramentas instaladas:

| Ferramenta        | Versão Mínima | Observações                               |
| ----------------- | ------------- | ----------------------------------------- |
| **Node.js**       | 20+           | [nodejs.org](https://nodejs.org)          |
| **npm**           | 10+           | Já vem com o Node.js                      |
| **Docker Desktop** | Mais recente  | [docker.com](https://www.docker.com/products/docker-desktop/) |
| **Git**           | Mais recente  | [git-scm.com](https://git-scm.com)        |

Para verificar suas versões:

```bash
node --version   # ex.: v20.18.0
npm --version    # ex.: 10.8.2
docker --version # ex.: Docker version 27.0.3
git --version    # ex.: git version 2.45.2
```

---

## Passo 1: Clonar e instalar

```bash
git clone https://github.com/seu-usuario/Meu-Portifolio.git
cd Meu-Portifolio
npm install
```

A instalação pode levar alguns minutos. O Nx gera arquivos de cache e compila bindings nativos na primeira execução.

---

## Passo 2: Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto. Copie as variáveis abaixo:

```env
DATABASE_URL="postgresql://root@localhost:26257/defaultdb?sslmode=disable"
JWT_SECRET=sua-chave-secreta
PORT=3000
```

| Variável       | Obrigatória | Padrão | Descrição                                            |
| -------------- | ----------- | ------ | ---------------------------------------------------- |
| `DATABASE_URL` | Sim         | -      | String de conexão do CockroachDB (adaptador Prisma)  |
| `JWT_SECRET`   | Não         | -      | Chave secreta para JWT (placeholder; ainda não implementado na API) |
| `PORT`         | Não         | 3000   | Porta onde a API NestJS escuta                       |

---

## Passo 3: Iniciar o CockroachDB

Execute o CockroachDB em um contêiner Docker:

```bash
docker run -d \
  --name cockroachdb \
  -p 26257:26257 \
  cockroachdb/cockroach:latest start-single-node --insecure
```

Isso inicia um cluster single-node do CockroachDB na porta **26257** com acesso `root` e sem TLS.

Para parar o contêiner depois:

```bash
docker stop cockroachdb
docker rm cockroachdb
```

Para verificar se está rodando:

```bash
docker ps --filter name=cockroachdb
```

---

## Passo 4: Configurar o esquema do banco de dados

Gere o cliente Prisma e envie o esquema para o CockroachDB:

```bash
npx prisma generate --schema=apps/api/prisma/schema.prisma
npx prisma db push --schema=apps/api/prisma/schema.prisma
```

- `prisma generate` cria o cliente tipado em `node_modules/.prisma/client`.
- `prisma db push` sincroniza os modelos `User` e `Project` do esquema com a instância do CockroachDB em execução.

**Observação:** Um script de seed para o banco de dados ainda não existe. Isso está planejado para uma iteração futura. Após executar `db push`, as tabelas existirão mas estarão vazias.

---

## Passo 5: Rodar as aplicações

Você precisa de três terminais separados. Cada comando roda uma parte diferente do monorepo.

### Terminal 1: API (NestJS)

```bash
npx nx serve api
```

A API inicia em **http://localhost:3000**. Você deve ver `Hello API` em `GET /api`.

### Terminal 2: Portfólio público (Angular)

```bash
npx nx serve portfolio-public
```

O portfólio público inicia em **http://localhost:4200**.

### Terminal 3: Dashboard admin (Angular)

```bash
npx nx serve admin
```

O dashboard admin inicia em **http://localhost:4201**.

Os três apps usam o cache de computação do Nx, então rebuilds após a primeira execução são rápidos.

---

## Rodar testes

| Comando                       | Descrição                             |
| ----------------------------- | ------------------------------------- |
| `npm test`                    | Rodar todos os testes do monorepo     |
| `npm run test:coverage`       | Rodar todos os testes com cobertura   |
| `npx nx test api`             | Rodar apenas os testes da API         |
| `npx nx test admin`           | Rodar apenas os testes do admin       |
| `npx nx test portfolio-public` | Rodar apenas os testes do portfólio  |
| `npx nx test <projeto> --watch` | Rodar testes em modo watch           |

**Observação:** Os testes atualmente existem apenas como scaffolding gerado. Cobertura real de testes está planejada.

---

## Solução de problemas

### Conflito de portas

Se a porta 3000, 4200 ou 4201 já estiver em uso, encontre e pare o processo:

```bash
# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
# macOS / Linux
lsof -i :3000
kill -9 <PID>
```

Para os apps Angular, você também pode mudar a porta:

```bash
npx nx serve portfolio-public --port 4202
```

### Falha ao gerar Prisma

- Verifique se o CockroachDB está rodando (`docker ps`).
- Se o cache do cliente Prisma estiver desatualizado, limpe-o:

  ```bash
  npx prisma generate --schema=apps/api/prisma/schema.prisma --force
  ```

- Se aparecer `Can't reach database server`, verifique se o contêiner Docker está ativo e se a `DATABASE_URL` no `.env` está correta.

### Docker não inicia

- Abra o Docker Desktop e verifique o dashboard por erros.
- Certifique-se de que a virtualização está habilitada na BIOS/UEFI.
- No Windows, verifique se o WSL 2 está instalado e configurado.

### Erros no npm install

- Delete `node_modules` e `package-lock.json` e tente novamente:

  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

- Se houver timeouts de rede, tente um registro diferente:

  ```bash
  npm install --registry=https://registry.npmmirror.com
  ```

- Verifique se sua versão do npm é 10+ (`npm --version`).

### Problemas de cache do Nx

Se o Nx se comportar de forma inesperada, reinicie o cache:

```bash
npx nx reset
```

---

## Próximos passos

- Leia o [README](../README.pt-BR.md) para visão geral do projeto, destaques e roadmap.
- Veja o guia de [ARQUITETURA](../ARCHITECTURE.pt-BR.md) para estrutura do monorepo e decisões de design.
- Consulte a [API](../API.pt-BR.md) para detalhes dos endpoints.
- Veja o [CHANGELOG](../CHANGELOG.pt-BR.md) para atualizações recentes.

---

🇺🇸 [View in English](setup.md)
