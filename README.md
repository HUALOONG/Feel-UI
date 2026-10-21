# Feel UI - 基于 Shadcn UI 规范的跨框架组件库

**安徽九问信息科技有限公司**（Anhui Jiuwen Information Technology Co., Ltd.）出品的跨框架 UI 组件库，
同时提供 **Vue 3** 与 **React 19** 两套组件包。

> Feel UI 是安徽九问信息科技有限公司推出的跨框架 UI 组件库。
> 产品英文名 **Feel UI**，中文名 **栖羽**——取"栖于界面之上"之意，
> 遵循 [Shadcn UI](https://ui.shadcn.com/) 的设计理念与交互规范，基于 `Tailwind CSS` + 设计令牌驱动样式，
> 采用 `pnpm` Monorepo 统一管理，配置收敛、开箱即用。

**核心特性**

- 🎨 **设计令牌驱动**：主题色、圆角、间距集中于 `@feel-ui/tokens`，改一处全局生效，天然支持暗黑模式
- 🔄 **双框架 API 对齐**：Vue 3 与 React 19 两套组件包保持一致的 props、样式变体与交互行为，通过契约测试保证一致
- 🧰 **配置统一收敛**：分层 `tsconfig`、统一 Vite 库打包模板、全局 ESLint / Vitest 规则，类库包零重复配置

**适用场景**：需要同时覆盖 Vue 3 与 React 19 技术栈的中后台系统、组件驱动型业务应用、希望基于 Shadcn UI 规范做二次定制的团队。

**环境要求**：Node.js >= 18、`pnpm` >= 8（开发实测 Node 22 / pnpm 11）。使用方构建工具需支持 ESM 入口（Vite / Webpack 5 / Rollup / esbuild 均可）。

**包名与安装防错**：npm 包名为 **`@feel-ui/*`**（ **含连字符**）。

```bash
# 正确
pnpm add @feel-ui/vue @feel-ui/styles

# 错误：会装到一个无关的语音合成组件库
pnpm add feelui
```

**术语约定**：本文统一使用以下表述，出现括号别名时视为同义——

| 本文用语                  | 含义 / 别名                                           |
|---------------------------|-------------------------------------------------------|
| 暗黑模式                  | 对应 `class="dark"`，也称暗色主题                     |
| 设计令牌（Design Tokens） | 简称令牌、`tokens`                                    |
| 组合式函数                | Vue 侧称 Composables，React 侧称 Hooks                |
| 类库包                    | `packages/` 下可发布的 npm 包，scope 为 `@feel-ui`    |
| 宿主项目                  | 集成本组件库的业务项目，也称消费方、使用者            |
| 九问 / Jiuwen             | 公司中文名与英文名；产品品牌 `Feel UI` 即取自「九问」 |

---

## 目录导航

> 以下为文档章节导航，缩进层级对应 ## / ### 标题层级。

- [快速开始](#快速开始)
    - [环境要求](#环境要求)
    - [安装与运行](#安装与运行)
    - [常见失败处理](#常见失败处理)
    - [30 秒上手](#30-秒上手)
- [项目脚本](#项目脚本)
- [目录结构](#目录结构)
- [架构概览](#架构概览)
    - [双框架实现机制](#双框架实现机制)
    - [技术栈](#技术栈)
- [包说明](#包说明)
    - [核心包](#核心包)
    - [工程化配置（不发布）](#工程化配置不发布)
- [使用指南](#使用指南)
    - [主题定制](#主题定制)
    - [暗黑模式](#暗黑模式)
- [兼容性](#兼容性)
- [开发指南](#开发指南)
    - [模块与 TypeScript](#模块与-typescript)
    - [组件开发约定](#组件开发约定)
    - [包依赖约定](#包依赖约定)
    - [测试要求](#测试要求)
- [当前状态与规划](#当前状态与规划)
- [已知限制](#已知限制)
- [贡献指南](#贡献指南)
- [许可协议](#许可协议)

---

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8（`workspace` 协议与锁定文件格式依赖此版本）

### 安装与运行

1. **获取源码**（请将 `<repository-url>` 替换为实际仓库地址）

   ```bash
   git clone <repository-url>
   cd feel-ui
   ```

   > 若项目尚未托管至 Git 仓库，可下载源码压缩包并解压后进入项目根目录。

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **构建所有类库包**（必须先于演示运行）

   ```bash
   pnpm build:all
   ```

   > 本项目遵循「先构建库，再运行演示」的顺序：框架组件包依赖 `tokens`、`styles`、`cva` 等底层包的构建产物。

4. **启动文档站点或演示应用**

   ```bash
   # 文档站点
   pnpm dev:docs

   # 演示应用
   pnpm dev:demo
   ```

   启动成功后终端会出现 `Listening on http://localhost:xxxx`，浏览器打开该地址即可预览组件效果并切换暗黑模式。

### 常见失败处理

| 现象                                   | 原因与处理                                         |
|----------------------------------------|----------------------------------------------------|
| `ERR_PNPM_OUTDATED_LOCKFILE`           | 删除 `pnpm-lock.yaml` 后重跑 `pnpm install`        |
| `Cannot find module '@feel-ui/tokens'` | 未执行 `pnpm build:all`，先完成构建                |
| 端口占用                               | 文档站点 / 演示应用支持通过 `--port` 指定端口，或关闭占用进程 |

### 30 秒上手

**Vue 3**——在应用入口挂载全局样式，再按需引入组件：

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import '@feel-ui/styles'   // 必须：注入设计令牌 CSS 变量与全局默认样式
import { Button } from '@feel-ui/vue'

createApp(App).mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <Button variant="primary">点击我</Button>
</template>
```

> 如需避免与第三方组件冲突，可将 Vue 组件注册为 `FeelButton`（Feel 前缀即 Feel UI）：
> `createApp(App).component('FeelButton', Button).mount('#app')`。

**React 19**——等价写法：

```tsx
// app.tsx
import '@feel-ui/styles'   // 必须：注入设计令牌 CSS 变量与全局默认样式
import { Button } from '@feel-ui/react'

export default function App() {
  return <Button variant="primary">点击我</Button>
}
```

> Vue 与 React 两套组件的 API、样式变体与交互行为保持一致，差异仅停留在框架适配层。

---

## 兼容性

| 维度     | 支持范围                                                |
|----------|---------------------------------------------------------|
| Node.js  | >= 18（开发实测 22.23.2）                               |
| 包管理   | pnpm >= 8（开发实测 11.7.0，依赖 `workspace` 协议）     |
| Vue      | 3.x（声明为 `peerDependencies`，由宿主指定）            |
| React    | 19.x（声明为 `peerDependencies`，由宿主指定）           |
| 模块格式 | 仅 ESM，不提供 CJS / UMD                                |
| 构建工具 | Vite、Webpack 5、Rollup、esbuild 等支持 ESM 入口的工具  |
| 浏览器   | Chrome >= 80、Firefox >= 78、Safari >= 13.1、Edge >= 80 |

版本演进与破坏性变更记录见 [CHANGELOG](./CHANGELOG.md)。

---

## 项目脚本

根目录 `package.json` 声明的全局脚本如下（✅ 表示已声明并落地，⚠️ 表示规划中）：

```bash
# 单独构建指定包
pnpm build:tokens   # ✅ 构建设计令牌
pnpm build:styles   # ✅ 构建全局样式（tokens 构建后执行）
pnpm build:cva      # ✅ 构建变体工具
pnpm build:hooks    # ✅ 构建通用逻辑
pnpm build:utils    # ✅ 构建通用工具
pnpm build:vue      # ✅ 构建 Vue 组件库
pnpm build:react    # ✅ 构建 React 组件库

# 一次性构建所有类库包
pnpm build:all      # ✅ 按拓扑序构建 packages/ 下全部类库包

# 代码检查与测试
pnpm lint           # ✅ 运行 ESLint 代码检查
pnpm lint:fix       # ✅ 自动修复可修复的代码问题
pnpm test           # ✅ 运行 Vitest 单元测试（含契约测试）
pnpm test:watch     # ✅ 监听模式运行测试

# 文档站点与演示应用
pnpm dev:docs       # ✅ 启动文档站点
pnpm build:docs     # ✅ 构建文档站点静态产物
pnpm dev:demo       # ✅ 启动演示应用
pnpm build:demo     # ✅ 构建演示应用
```

脚本的实现细节与参数说明集中在 `tooling/scripts/`，各脚本目录内另附 README 说明。

---

## 目录结构

```text
feel-ui/
├─ .github/                   # GitHub Actions CI/CD
│  └─ workflows/
│     ├─ ci.yml               # 构建、测试、Lint
│     ├─ release.yml          # 自动发布到 npm
│     └─ docs.yml             # 文档部署（GitHub Pages）
├─ docs/                      # 项目文档（VitePress 驱动，@feel-ui/docs）
│  ├─ .vitepress/
│  ├─ guide/                  # 指南：介绍 / 快速开始 / 主题定制 / 开发
│  └─ components/             # 组件文档
├─ packages/                  # 核心组件与工具包
│  ├─ design/                 # 设计系统核心
│  │  ├─ tokens/              # 设计令牌：CSS 变量、色板、间距、字体
│  │  │  └─ package.json      # @feel-ui/tokens
│  │  └─ styles/              # 样式集成：Tailwind 插件与全局样式
│  │     └─ package.json      # @feel-ui/styles
│  ├─ shared/                 # 跨框架共享逻辑
│  │  ├─ cva/                 # 组件变体管理工具
│  │  │  └─ package.json      # @feel-ui/cva
│  │  ├─ hooks/               # 通用 Hooks 核心（createIdGenerator、createUseControllableState、mergeSlotProps）
│  │  │  └─ package.json      # @feel-ui/hooks
│  │  └─ utils/               # 通用工具函数
│  │     └─ package.json      # @feel-ui/utils
│  ├─ frameworks/             # 框架适配包
│  │  ├─ vue/                 # Vue 3 组件库
│  │  │  └─ package.json      # @feel-ui/vue
│  │  └─ react/               # React 19 组件库
│  │     └─ package.json      # @feel-ui/react
│  └─ demo/                   # 演示应用（Vue 3 + Vite）
│     └─ package.json         # @feel-ui/demo
├─ tooling/                   # 工程化配置（不发布，仅项目内使用）
│  ├─ configs/                # 通用配置对象
│  │  ├─ eslint/              # 统一 ESLint 规则（flat config）
│  │  ├─ tsconfig/            # 分层 TS 配置（base / ui / test）
│  │  ├─ vite/                # 统一 Vite 库打包模板（lib mode）
│  │  ├─ vitest/              # 统一 Vitest 测试配置
│  │  └─ postcss/             # PostCSS 配置模板
│  └─ scripts/                # 构建、发布、部署脚本
│     ├─ build/               # release.js（发布校验）
│     └─ deploy/              # docker.js / nginx.js
├─ container/                 # 容器化
│  ├─ Dockerfile
│  ├─ nginx.conf
│  └─ .dockerignore
├─ package.json               # 根项目配置与全局脚本
├─ pnpm-workspace.yaml        # pnpm workspace 包范围声明
├─ CHANGELOG.md               # 版本演进与破坏性变更记录
└─ LICENSE                    # MIT 许可证（MIT 协议）
```

> 内部架构细节见[架构文档](./docs/architecture.md)（待补充）。

---

## 架构概览

### 双框架实现机制

Vue 3 与 React 19 两套组件包采用 **独立实现、契约对齐**的策略：

- 逻辑层与样式层下沉为共享包（`@feel-ui/hooks`、`@feel-ui/cva`、`@feel-ui/utils`、`@feel-ui/tokens`、`@feel-ui/styles`
  ），两套组件包各自消费同一份逻辑与样式，避免重复；
- 组件层分别在 `packages/frameworks/vue` 与 `packages/frameworks/react` 内实现，通过 **契约测试**保证两边的 props
  名称、类型、默认值、样式变体（variant）与交互行为一致；
- 差异点仅停留在框架适配层（Vue 的 `<script setup>` + 模板 vs React 的 TSX + hooks），对外 API 保持统一。

> 该机制意味着新增组件需同时在两个框架包内实现并补齐对应测试，具体流程见[组件开发约定](#组件开发约定)。

### 技术栈

| 层次   | 选型                                                               |
|--------|--------------------------------------------------------------------|
| 框架   | Vue 3、React 19（均声明为 `peerDependencies`，版本由宿主项目控制） |
| 构建   | Vite（库打包 + 应用开发）                                          |
| 语言   | TypeScript（严格模式，全量类型约束）                               |
| 样式   | Tailwind CSS + CSS 变量（遵循 Shadcn UI 规范）                     |
| 工具库 | `clsx` + `tailwind-merge`（类名合并）、自研 `cva`（变体管理）      |
| 包管理 | pnpm + Monorepo（`pnpm-workspace.yaml` 声明包范围）                |
| 工程化 | 分层 `tsconfig`、统一 Vite 库打包模板、ESLint、Vitest              |

## 包说明

以下为 `packages/` 下可发布的类库包清单，各包路径与职责对应关系见[目录结构](#目录结构)。

### 核心包

| 包名              | 路径                         | 职责                                                                                                        |
|-------------------|------------------------------|-------------------------------------------------------------------------------------------------------------|
| `@feel-ui/tokens` | `packages/design/tokens/`    | 设计令牌：亮色/暗色 HSL 色值、圆角、间距、字体，自动生成全局 CSS 变量，是样式的唯一数据源                   |
| `@feel-ui/styles` | `packages/design/styles/`    | 全局样式：注入设计令牌 CSS 变量与默认样式，导出 Tailwind 插件（`@feel-ui/styles/plugin`）                   |
| `@feel-ui/cva`    | `packages/shared/cva/`       | 变体管理：提供 `cva` 函数，基于 props 值动态生成 CSS 类名                                                   |
| `@feel-ui/hooks`  | `packages/shared/hooks/`     | 通用逻辑核心：`createIdGenerator`、`createUseControllableState`、`mergeSlotProps`，框架无关，由两侧适配      |
| `@feel-ui/utils`  | `packages/shared/utils/`     | 通用工具：当前导出 `cn`（合并 class 类名，结合 `clsx` 与 `tailwind-merge`），后续计划扩展类型工具与断言函数 |
| `@feel-ui/vue`    | `packages/frameworks/vue/`   | Vue 3 组件库：基于 `<script setup>` + 模板开发，纯 ESM 输出并附完整类型声明                                 |
| `@feel-ui/react`  | `packages/frameworks/react/` | React 19 组件库：基于 TSX + hooks 开发，props 类型完整约束，与 Vue 包 API 对齐                              |

### 工程化配置（不发布）

以下为 `tooling/configs/` 下的配置目录， **不进入 npm 分发**，由类库包通过文件路径引用，用于复用公共配置、避免重复编写：

| 配置目录                    | 作用                                 |
|-----------------------------|--------------------------------------|
| `tooling/configs/tsconfig/` | 区分「类库包」与「应用」两套 TS 配置 |
| `tooling/configs/vite/`     | 统一库打包配置，仅需传入入口与插件   |
| `tooling/configs/eslint/`   | 全局代码检查规则（flat config）      |
| `tooling/configs/vitest/`   | 单元测试公共配置                     |
| `tooling/configs/postcss/`  | PostCSS 处理模板                     |

---

## 使用指南

### 主题定制

主题色、圆角、间距等全部收敛在 `@feel-ui/tokens`，定制只需修改令牌源文件并重新构建：

1. 打开 `packages/design/tokens/src/` 下的令牌定义文件；
2. 按既定命名修改对应 CSS 变量值（颜色使用 HSL 格式，与 Shadcn UI 色板对齐）；
3. 重新执行 `pnpm build:tokens`，CSS 变量自动同步到所有消费者。

**CSS 变量命名约定**：`--{namespace}-{scale}-{step}`，例如 `--primary-500`、`--radius-lg`、`--spacing-4`。

**覆盖方式**：业务侧如需局部覆盖，可在入口样式中重新赋值同名 CSS 变量，无需修改组件代码：

```css
/* 业务入口样式 */
:root {
  --primary-500: 220 90% 56%;
  --radius-lg: 0.75rem;
}
```

**新增令牌**：在 `tokens` 包中按既有分组追加变量并同步生成类型声明，随后在 `styles` 包中挂载即可全局使用。

### 暗黑模式

采用 `class` 模式（Shadcn UI 标准）：为 `html` 元素添加 `.dark` 类名即切换暗黑模式。

**防闪烁（FOUC）处理**：在应用入口（如 `main.ts` 或根布局）同步读取持久化偏好并立即设置类名，避免刷新时先闪亮色再切暗色：

```ts
// 应用入口，需同步执行
const theme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

if (theme === 'dark' || (!theme && prefersDark)) {
  document.documentElement.classList.add('dark')
}
```

**切换逻辑**：在用户交互事件（如切换按钮点击）的处理函数中调用：

```ts
const toggleDark = () => {
  document.documentElement.classList.toggle('dark')
  localStorage.setItem(
    'theme',
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )
}
```

> 服务端渲染（SSR）场景需在首屏 HTML 中内联上述同步脚本，防止客户端水合前后主题不一致。

---

## 开发指南

### 模块与 TypeScript

- 所有类库包仅输出 ESM，不提供 CJS / UMD；
- 每个包的 `package.json` 须完善 `exports` 映射中的 `types` 条件（如 `"./package.json": { "types": "./dist/index.d.ts" }`
  ），保证类型可正常导入；顶层 `types` 字段可选，用于兼容旧版编辑器；
- TypeScript 全局开启 `strict: true`；
- 类库包开启 `declaration` 生成 `.d.ts`；应用包（Demo）关闭类型输出，由 Vite 编译。

### 组件开发约定

- 同功能组件在 Vue 与 React 两侧保持 props、API、样式变体一致；
- 组件样式使用 `cn` 合并类名；
- 多变体组件优先使用 `cva` 管理样式分支；
- 组件内仅编写 Tailwind 原子类，不硬编码颜色与尺寸。

### 包依赖约定

- 内部包统一使用 `workspace:*` 声明本地依赖；
- 框架相关依赖（Vue / React）设为 `peerDependencies`，版本由宿主项目控制（选型细节见[技术栈](#技术栈））；
- 公共工具与样式统一抽离为独立包，禁止代码冗余。

### 提交规范

提交 commit 时请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范，常用前缀（`feat:` / `fix:` /
`docs:` / `style:` / `refactor:` / `test:` / `chore:`）及示例见[贡献指南 → 提交 Pull Request](#提交-pull-request)。

### 测试要求

- 新增组件须配套单元测试；
- 跨框架组件通过 **契约测试**保证行为一致：契约测试是对比 Vue 与 React 两侧组件在相同 props 输入下的 **输出类名、DOM
  结构与交互行为**是否一致的专项测试，用例统一放在 `packages/frameworks/{vue,react}/__tests__/contract/`，随 `pnpm test`
  一并运行；
- 提交前须通过 `pnpm lint` 与 `pnpm test`。

---

## 当前状态与规划

**已实现**：pnpm monorepo 骨架与统一工程化配置；设计令牌（`tokens`）；全局样式与 Tailwind 插件（`styles`）；变体管理（`cva`）；通用工具与 Hooks 核心（`utils` / `hooks`）；Vue 3 与 React 19 组件库骨架（`Button` 及契约测试）；文档站点（VitePress）与演示应用（Vue 3）；CI 流水线与容器化配置。

**进行中**：补齐基础组件清单（Button、Input、Dialog、Select 等）、契约测试覆盖、CHANGELOG 维护。

**后续计划**：`useTheme` 组合式封装、SSR 内联脚本工具函数、类型工具与断言函数扩展。

详细计划见[架构文档](./docs/architecture.md)（待补充）。

---

## 发布前必读

以下内容涉及品牌与法律合规，发布前请逐项确认：

- [ ] **锁定 npm scope**：执行 `npm org create feel-ui` 创建组织，防止 scope 被他人占用；
- [ ] **版权行逐字核对**：`Copyright (c)` 行的公司英文名必须与营业执照一致——
  `Anhui Jiuwen Information Technology Co., Ltd.`，不得缩写为 `Jiuwen Tech`；
- [ ] **包名带连字符**：发布包名为 `@feel-ui/*`，同时在 README 与安装文档中保留防错提示；
- [ ] **补齐合规文件**：`LICENSE`（含版权行）、`NOTICE`、`AUTHORS`、`CONTRIBUTING.md`（含 CLA 条款）；
- [ ] **源码头部声明**：所有源文件添加 `SPDX-License-Identifier: MIT` 与版权行；
- [ ] **商标检索**：在国内商标第 9 类（软件）与第 42 类（技术服务）检索「九问」与「Feel UI」，评估异议风险后再做长期品牌投入；
- [ ] **注册防御性资产**：GitHub 组织 `github.com/feel-ui`、`github.com/jiuwen`，以及 npm scope `@jiuwen`、`@jiuwen-ui`
  建议一并注册占位。

> 以上任一项未完成前，不建议以正式版本号（≥ 1.0.0）对外发布。

---

## 已知限制

以下内容为当前版本的能力边界，接入前请先确认：

- `@feel-ui/utils` 目前仅导出 `cn`，类型工具与断言函数待扩展；
- `@feel-ui/hooks` 提供框架无关核心（`createIdGenerator` / `createUseControllableState` / `mergeSlotProps`），Vue / React 侧提供薄适配层；`useTheme` 组合式封装与 SSR 内联脚本工具函数尚待提供，使用者需自行接入持久化与 SSR 同步逻辑；
- 文档站点的持久化主题偏好同步示例需使用者自行补齐；
- `docs/architecture.md` 尚未编写；
- 组件清单目前仅有 `Button`，其余基础组件按[当前状态与规划](#当前状态与规划)逐步补齐。

---

## 贡献指南

欢迎社区贡献。参与流程如下：

### 提交 Issue

通过 GitHub Issues 提交 Bug 报告或功能建议：

- Bug 报告请包含：复现步骤、预期行为、实际行为、环境信息；
- 功能建议请说明使用场景与预期 API。

### 提交 Pull Request

1. **先沟通**：提交前先开 Issue 或在已有 Issue 下留言说明意图，确认该需求未被实现、也无人正在处理；
2. Fork 本仓库并基于 `main` 最新代码创建特性分支：`git checkout -b feature/your-feature`；
3. 保持与主干同步：提交前执行 `git fetch origin && git rebase origin/main`，避免冲突；
4. 确保通过 `pnpm lint` 与 `pnpm test`；
5. 提交 commit 时遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范，常用前缀包括：
    - `feat:` 新增功能
    - `fix:` 修复 bug
    - `docs:` 文档变更
    - `style:` 代码格式调整（不影响代码运行的变动）
    - `refactor:` 代码重构（既不是新增功能，也不是修复 bug）
    - `test:` 测试用例变更
    - `chore:` 构建过程或辅助工具的变动
6. 推送分支并在 PR 描述中说明：变更类型、受影响的包、测试情况，并关联对应 Issue 编号（如 `Closes #123`）。

### 代码规范

- 遵循项目统一的 ESLint + Prettier 配置；
- 组件代码须包含完整 TypeScript 类型定义；
- 新增组件须同时在 Vue 与 React 两侧实现并补齐测试。

### 贡献者许可协议（CLA）

本项目采用 MIT 许可证开源，版权归属 **安徽九问信息科技有限公司**。
提交 Pull Request 即表示您同意：

1. 将所贡献代码的版权授予安徽九问信息科技有限公司；
2. 您有权做出上述授权，且贡献内容不侵犯第三方知识产权；
3. 您已阅读并同意 [MIT 许可证](./LICENSE) 的全部条款。

如需签署正式的 CLA 文件，请在 PR 中留言，由维护者协助处理。

---

## 许可协议

本项目基于 [MIT 许可证](./LICENSE) 开源，由 **安徽九问信息科技有限公司** 维护与发布。

**版权声明**

```text
Copyright (c) 2020-2026 Anhui Jiuwen Information Technology Co., Ltd.
安徽九问信息科技有限公司
All rights reserved.
```

**合规文件**

| 文件                              | 作用                            |
|-----------------------------------|---------------------------------|
| [LICENSE](./LICENSE)              | MIT 许可证全文，含上述版权行    |
| [NOTICE](./NOTICE)                | 第三方依赖与版权归属清单        |
| [AUTHORS](./AUTHORS)              | 维护者与主要贡献者列表          |
| [CONTRIBUTING](./CONTRIBUTING.md) | 贡献流程详细说明（含 CLA 条款） |

**源码声明**：各源文件顶部须包含 SPDX 标识，格式为：

```ts
// SPDX-License-Identifier: MIT
// Copyright (c) 2020-2026 Anhui Jiuwen Information Technology Co., Ltd.
```

> 许可证仅约束源码分发与使用行为，不转移版权归属。商业使用、再分发与商标使用请另行联系维护者。
