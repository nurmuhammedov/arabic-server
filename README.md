# arabic-server

NestJS API for a Quranic Arabic vocabulary trainer. It serves every lemma in
the Quran — 4,763 words under 1,651 roots, with all 74,685 verse occurrences —
plus the ṣarf, ḥurūf, naḥw and pattern curricula and an FSRS study loop.

The web client lives in [`nurmuhammedov/arabic`](https://github.com/nurmuhammedov/arabic).

## Start here

- **[HANDBOOK.md](./HANDBOOK.md)** — what the system is, why it is built this
  way, the traps that fail silently, and what is left to do. Read it first.
- **[DEPLOY.md](./DEPLOY.md)** — Neon, Fly and Vercel, step by step.

## Running it

Needs Node 22+, pnpm 10+, and a Postgres database named `arabic`.

```
pnpm install
cp .env.example .env.development     # then fill in the database and JWT values
pnpm seed                            # about nine minutes
pnpm run create-admin <username> <password>
pnpm run start:dev                   # port 8080
```

The seed rebuilds everything from the Quranic Arabic Corpus vendored under
`src/database/seeds/data`. Confirm it logs **4,763 lemmas** and **60,499
particle tokens**; anything else means the corpus file was mangled on checkout,
which HANDBOOK.md explains.

## Data source

Quranic Arabic Corpus v0.4, GNU GPL. See `src/database/seeds/data/SOURCE.md`.
