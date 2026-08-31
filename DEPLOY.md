# Deploying

Three free services, one per layer. Everything the browser sees comes from one
origin, so the auth cookies and CORS stay simple: Vercel serves the app and
forwards `/api/*` to Fly.

```
browser ──► Vercel (app + /api rewrite) ──► Fly.io (NestJS) ──► Neon (Postgres)
```

The steps below need accounts on Neon, Fly and Vercel. Create those yourself —
the config in this repo is already prepared for them.

## 1. Database — Neon

Already set up and loaded: project `arabic`, database `neondb`, region
Frankfurt. Take the connection string from the console's Connect panel, and use
the direct endpoint rather than the `-pooler` one for DDL and seeding.

The database is about 32 MB, so it sits well inside the free storage limit.

## 2. Load the data — from your own machine

The seed reads a 6 MB corpus file and takes roughly nine minutes, so it runs
from here rather than from the server. The corpus is deliberately excluded from
the Docker image.

Point `.env.development` at Neon, keeping a copy of the local values first:

```
DB_HOST=ep-xxx.eu-central-1.aws.neon.tech
DB_PORT=5432
DB_USERNAME=<neon user>
DB_PASSWORD=<neon password>
DB_NAME=<neon database>
DB_SSL=true
```

Then run, in this directory:

```
pnpm run seed
pnpm run create-admin <username> <password>
```

Put the local values back afterwards.

## 3. Backend — Fly.io

```
fly auth login
fly launch --no-deploy --copy-config --name arabic-server
```

Set the secrets. `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` must be long
random strings, and they must not be the ones used locally:

```
fly secrets set \
  DB_HOST=ep-xxx.eu-central-1.aws.neon.tech \
  DB_PORT=5432 \
  DB_USERNAME=<neon user> \
  DB_PASSWORD=<neon password> \
  DB_NAME=<neon database> \
  JWT_ACCESS_SECRET=<random> \
  JWT_REFRESH_SECRET=<random> \
  JWT_ACCESS_EXPIRATION=30d \
  JWT_REFRESH_EXPIRATION=365d \
  JWT_ACCESS_COOKIE_MAX_AGE=2592000000 \
  JWT_REFRESH_COOKIE_MAX_AGE=31536000000 \
  CORS_ORIGINS=https://arabiy.vercel.app \
  BASE_URL=https://arabic-server.fly.dev

fly deploy --remote-only
```

`--remote-only` builds on Fly's machines, so Docker is not needed locally.

`fly.toml` lets the machine stop when idle and start again on the next request,
which is what keeps this inside the free allowance. The first request after a
pause takes a second or two.

The sessions are deliberately long — a month for the access token, a year for
the refresh — so the installed app does not ask for a password every week.
The cost is that a stolen token stays usable for that long, since nothing
revokes one before it expires.

## 4. Frontend — Vercel

Already set up: the `arabic` project tracks `nurmuhammedov/arabic` on `main`
and serves `arabiy.vercel.app`, with the generated `arabic-silk.vercel.app`
kept as a redirect.

`vercel.json` already forwards `/api/*` to `https://arabic-server.fly.dev`.
Change that host if the Fly app is named differently. The rewrite has to stay
above the SPA catch-all, or the catch-all swallows it.

Leave `VITE_BASE_URL` unset. Over HTTPS the client asks for a relative `/api`
path, which the rewrite turns into the Fly URL — so the browser only ever sees
one origin.

## After the first deploy

- Check `https://arabiy.vercel.app/api/v1/words` returns 401 rather than
  404. A 404 means the rewrite is not matching.
- Sign in with the admin account created in step 2.
- Reinstall the PWA: the service worker caches aggressively, so an old build
  can linger. Uninstall and add to the home screen again.

## Reseeding later

A reseed clears the Quranic catalogue and rebuilds it. Verified glosses survive
— `seedWords` reads them back before the delete and re-applies them — but draft
glosses come from the glossary files, so edit those rather than the database.
