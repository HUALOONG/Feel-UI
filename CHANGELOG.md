# Changelog

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 与 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Added

- Monorepo 骨架：pnpm workspace、根 `package.json` 全局脚本
- `@feel-ui/tokens`：设计令牌（亮/暗 HSL 色板、圆角、间距、字体），生成全局 CSS 变量
- `@feel-ui/styles`：Tailwind 插件与全局样式（挂载 tokens CSS 变量）
- `@feel-ui/cva`：组件变体管理
- `@feel-ui/utils`：`cn` 类名合并（clsx + tailwind-merge）
- `@feel-ui/hooks`：`useId`、`useControllableState`（框架无关核心）、`mergeSlotProps`
- `@feel-ui/vue` / `@feel-ui/react`：`Button` 组件骨架与契约测试
- `docs/`：VitePress 文档站点骨架
- `packages/demo`：演示应用
- 工程化：分层 `tsconfig`、统一 Vite 库打包模板、ESLint、Vitest
- CI 流水线（`.github/workflows/ci.yml`）
