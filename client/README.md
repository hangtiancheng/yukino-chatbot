# client

The **frontend** of [`yukino-chatbot`](../..) — a full-stack AI chat application
with RAG-powered knowledge-base Q&A. A React 19 + Vite 8 + Tailwind CSS 4 app
with streaming Markdown, multi-user/multi-session support, i18n, and theming.

## Features

- **Streaming chat** — SSE token-by-token responses with real-time Markdown
  rendering via `streamdown`.
- **RAG knowledge base** — upload `.md` / `.txt` / `.json` documents, switch to
  the `openai-rag` model to get answers grounded in private data.
- **Multi-user & multi-session** — email login, isolated per-user sessions.
- **i18n & theming** — Chinese/English locales, light/dark/system theme.
- **State** — Jotai for client state, TanStack Query/Form for server state and forms.

## Getting started

Run from the repository root:

```sh
pnpm install
pnpm dev:client   # Vite dev server
```

| Command              | Description              |
| -------------------- | ------------------------ |
| `pnpm dev:client`    | Vite dev server with HMR |
| `pnpm format:client` | Format with Prettier     |
| `pnpm lint:client`   | Lint with ESLint         |
| `pnpm build:client`  | Production build         |

## Layout

```
client/
├── src/
│   ├── pages/        # chat / sessions / document upload / login
│   ├── components/   # chat bubble, input, sidebar, markdown renderer
│   ├── api/          # typed API client (axios)
│   ├── stores/       # Jotai atoms
│   ├── hooks/        # app hooks
│   ├── i18n/         # localization resources
│   └── router/       # React Router 7 routes
└── vite.config.ts
```
