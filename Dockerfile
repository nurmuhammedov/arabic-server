# syntax=docker/dockerfile:1

# Dependencies are installed twice on purpose: once with dev packages so nest
# can build, then again production-only, so the image ships without the compiler.
FROM node:22-alpine AS build
WORKDIR /app

# The prepare script installs git hooks, which have no meaning in an image and
# fail outright once dev dependencies are skipped.
ENV HUSKY=0

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

COPY tsconfig*.json nest-cli.json ./
COPY src ./src
RUN pnpm run build


FROM node:22-alpine AS deps
WORKDIR /app

ENV HUSKY=0

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile --prod


FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

EXPOSE 8080

USER node

CMD ["node", "dist/main"]
