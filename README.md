# Movio (Movies App – Next.js)

A modern movie & TV discovery app built with Next.js 15 (App Router), Tailwind CSS v4, TypeScript, and The Movie Database (TMDB) API.
Search across movies, TV shows, and people; authenticate with TMDB to access account‑based features (e.g. favorites) and experience a responsive, theme‑aware UI.

> This project is a work in progress. Additional features (watchlists, ratings, recommendations) are planned.

---

## Features

- 🔍 Unified search with tabbed results (Movies / TV / People)
- 🎭 TMDB authentication flow (request token → approval → session cookie)
- 🔐 Protected routes (e.g. account favorites) via `middleware`
- 🌓 Light/Dark theme toggle (`next-themes`)
- ⚡ Server Actions + App Router + Suspense for async boundaries
- 🧩 Generated typed API client from TMDB OpenAPI spec (`@hey-api/openapi-ts`)
- 🧱 Reusable UI primitives (Radix + custom components)
- 💅 Tailwind CSS v4 + Prettier + automatic class sorting
- 🧪 Strong typing with TypeScript + strict config
- 🧹 Linting, formatting, and pre-commit hooks (ESLint, Prettier, Husky, lint-staged)

---

## Tech Stack

- Framework: Next.js 15 (App Router, Server Components, Server Actions, Turbopack)
- Language: TypeScript
- Styling: Tailwind CSS v4
- UI Primitives: shadcn/ui + custom components
- Icons: `lucide-react`
- Theme: `next-themes`
- API Client: Generated via `@hey-api/openapi-ts` (custom runtime config for auth header)
- Auth Model: TMDB session (request token → approval → session → cookie)
- Formatting & Quality: ESLint, Prettier, Husky, lint-staged
- Date / List formatting: Intl APIs (`formatDate`, `formatList`)

---

## Project Structure (Key Paths)

```
src/
  app/
    layout.tsx            # Root layout & theme wiring
    page.tsx              # Home (search landing)
    login/page.tsx        # TMDB login start
    auth/callback/route.ts# Handles TMDB redirect + session creation
    account/favorites/    # Example protected area
    search/page.tsx       # Results page (suspense + parallel fetches)
  features/
    auth/actions/         # Server actions: login/logout
    search/               # Search components + server action
  lib/
    api-client/           # OpenAPI schema + generated client
    auth/                 # Session + account helpers
    format/               # Formatting utilities
  components/             # UI + header, theme, buttons, dropdown, etc.
middleware.ts             # Route protection for account paths
openapi-ts.config.ts      # OpenAPI generation config
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```
TMDB_API_URL=https://api.themoviedb.org/3
TMDB_API_KEY=<<your_v3_api_key>>
TMDB_API_READ_ACCESS_TOKEN=<<your_v4_read_access_token>>
TMDB_AUTH_BASE_URL=https://www.themoviedb.org/authenticate
# After approval TMDB redirects here (must be whitelisted in TMDB settings)
TMDB_REDIRECT_BASE_URL=http://localhost:3000/auth/callback
```

Notes:

- `TMDB_API_READ_ACCESS_TOKEN` is used as a Bearer token in `createClientConfig`.
- `TMDB_API_KEY` is appended for endpoints that still expect the `api_key` query param (e.g. account details call).
- `TMDB_REDIRECT_BASE_URL` must match what you configured in TMDB → Settings → API.
- Never commit real secrets; use deployment platform secrets (e.g. Vercel project settings).

---

## Authentication Flow (TMDB)

1. User clicks Sign In (`/login` or header button).
2. `loginAction` calls `authenticationCreateRequestToken()` (TMDB).
3. User is redirected to TMDB approval screen (`TMDB_AUTH_BASE_URL` + token + `redirect_to`).
4. TMDB redirects to `/auth/callback?request_token=...&approved=true`.
5. `GET /auth/callback/route.ts` exchanges the request token for a session (`authenticationCreateSession`).
6. Session ID stored as an HTTP-only cookie: `tmdb_session`.
7. Subsequent server components can fetch account details (`getAccountDetails`).
8. Protected routes (e.g. `/account/favorites`) are gated by `middleware.ts`.

Logout:

- `logoutAction` hits TMDB `authenticationDeleteSession`, deletes cookie, revalidates layout.

---

## Generated API Client

The TMDB schema lives at:
`src/lib/api-client/schema.json`

Generation config:
`openapi-ts.config.ts`

Generate (or re-generate) the client:

```
pnpm openapi
```

This produces:
`src/lib/api-client/generated/`

Custom runtime configuration injects the bearer token:
`src/lib/api-client/custom-client.ts`

---

## Scripts

- `pnpm dev` – Start dev server (Turbopack)
- `pnpm build` – Production build
- `pnpm start` – Run production build
- `pnpm lint` – ESLint (auto-fix)
- `pnpm format` – Prettier format all
- `pnpm openapi` – Regenerate the TMDB client from schema

---

## Getting Started

1. Clone:
   ```
   git clone <repo-url>
   cd movies-app-nextjs
   ```
2. Install deps:
   ```
   pnpm install
   ```
3. Add `.env.local` with required TMDB vars (see above).
4. (Optional) Refresh generated client if you modified the schema:
   ```
   pnpm openapi
   ```
5. Run:
   ```
   pnpm dev
   ```
6. Open http://localhost:3000

---

## Search Implementation

- Server Action: `search.action.ts` validates query and redirects to `/search?query=...`.
- `/search/page.tsx` spins up concurrent promises: `searchMovie`, `searchTv`, `searchPerson`.
- Suspense fallback shows skeletons.
- `SearchResults` component auto-selects the tab with the largest result count.

---

## Styling & Theming

- Tailwind v4 with utility-first approach.
- Component variants powered by `class-variance-authority` (see `button.tsx`).
- Dark/light toggle via `ThemeToggle` and `next-themes` provider in `layout.tsx`.

---

## Middleware Protection

`middleware.ts` ensures routes under `/account` require a `tmdb_session` cookie.
If missing, user is redirected to `/login`.

---

## Potential Next Steps (Roadmap Ideas)

- Watchlist & Favorites synchronization
- Ratings + personal recommendations
- Infinite scrolling / pagination for search results
- Detail pages for Movie / TV / Person
- Improved error boundaries & loading states
- i18n & locale-based formatting
- E2E tests (Playwright) & unit tests (Vitest/Jest)
- Edge runtime optimizations + caching strategies

---

## Contributing

1. Fork & branch: `feat/<name>`
2. Ensure `pnpm format` and `pnpm lint` pass.
3. Open a PR with a clear description.

---

## License

MIT

---

## Attribution / Disclaimer

This product uses the TMDB API but is not endorsed or certified by TMDB.
TMDB logo & branding belong to their respective owners.

---

Happy hacking! 🎬
