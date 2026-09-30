# server

The **backend** of [`yukino-chatbot`](../..) — a full-stack AI chat application
with RAG-powered knowledge-base Q&A. A Koa 3 API server with LangChain for AI,
MySQL (Knex) for persistence, and Redis with an in-process LRU fallback for caching.

## Highlights

- **Streaming SSE responses** — token-by-token delivery to the client.
- **RAG pipeline** — document chunking, embedding, and `MemoryVectorStore`
  retrieval over a private knowledge base, exposed through the `openai-rag` model.
- **JWT auth** — email registration/login; each user keeps isolated sessions.
- **Resilient caching** — Redis preferred, automatic in-process LRU fallback so
  the server runs with zero external dependencies.
- **OpenAI-compatible endpoints** — both chat and embedding models are configured
  via `baseURL`, so any compatible provider works.

## Architecture

The server follows a layered structure:

```
router → controller → service → dao → db
        (middleware: auth, error handling)
```

The `ai/` module wraps LangChain (`ChatOpenAI`, `OpenAIEmbeddings`,
`RecursiveCharacterTextSplitter`), and `rag/` implements ingestion and retrieval.

## Getting started

Run from the repository root:

```sh
pnpm install
cp .env.example .env   # configure MySQL / Redis / OpenAI endpoints
pnpm dev:server        # tsx watch src/main.ts
```

| Command              | Description             |
| -------------------- | ----------------------- |
| `pnpm dev:server`    | Dev server (watch)      |
| `pnpm format:server` | Format with Biome       |
| `pnpm lint:server`   | `biome check --write`   |
| `pnpm build:server`  | Rollup production build |

## Layout

```
server/
├── src/
│   ├── ai/            # LangChain model wiring
│   ├── rag/           # chunking, embedding, retrieval
│   ├── controller/    # request handlers
│   ├── service/       # business logic
│   ├── dao/           # data access (Knex)
│   ├── db/            # MySQL / Redis connections
│   ├── middleware/    # auth, error handling
│   └── main.ts        # Koa app bootstrap
└── rollup.config.js
```
