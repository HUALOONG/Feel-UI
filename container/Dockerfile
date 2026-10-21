# Feel UI 文档站点容器（演示用）
# 多阶段构建：Node 构建静态产物 → Nginx 托管
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml .npmrc ./
COPY . .

RUN pnpm install --frozen-lockfile \
  && pnpm build:all \
  && pnpm build:docs \
  && pnpm build:demo

FROM nginx:alpine

COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html/docs
COPY --from=builder /app/packages/demo/dist /usr/share/nginx/html/demo
COPY container/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
