# 介绍

**Feel UI（栖羽）** 是安徽九问信息科技有限公司推出的跨框架 UI 组件库，同时提供 **Vue 3** 与 **React 19** 两套组件包。

- 遵循 [Shadcn UI](https://ui.shadcn.com/) 的设计理念与交互规范；
- 基于 `Tailwind CSS` + 设计令牌驱动样式；
- 采用 `pnpm` Monorepo 统一管理，配置收敛、开箱即用。

## 核心特性

- **设计令牌驱动**：主题色、圆角、间距集中于 `@feel-ui/tokens`，改一处全局生效，天然支持暗黑模式；
- **双框架 API 对齐**：Vue 3 与 React 19 两套组件包保持一致的 props、样式变体与交互行为，通过契约测试保证一致；
- **配置统一收敛**：分层 `tsconfig`、统一 Vite 库打包模板、全局 ESLint / Vitest 规则，类库包零重复配置。

## 适用场景

需要同时覆盖 Vue 3 与 React 19 技术栈的中后台系统、组件驱动型业务应用、希望基于 Shadcn UI 规范做二次定制的团队。

## 术语约定

| 本文用语 | 含义 / 别名 |
| --- | --- |
| 暗黑模式 | 对应 `class="dark"`，也称暗色主题 |
| 设计令牌（Design Tokens） | 简称令牌、`tokens` |
| 组合式函数 | Vue 侧称 Composables，React 侧称 Hooks |
| 类库包 | `packages/` 下可发布的 npm 包，scope 为 `@feel-ui` |
| 宿主项目 | 集成本组件库的业务项目，也称消费方、使用者 |

> 产品英文名 **Feel UI**，中文名 **栖羽**——取「栖于界面之上」之意。
