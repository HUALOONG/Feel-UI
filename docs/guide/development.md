# 开发指南

## 模块与 TypeScript

- 所有类库包仅输出 ESM，不提供 CJS / UMD；
- 每个包的 `package.json` 须完善 `exports` 映射中的 `types` 条件，保证类型可正常导入；
- TypeScript 全局开启 `strict: true`；
- 类库包开启 `declaration` 生成 `.d.ts`；应用包（Demo）关闭类型输出，由 Vite 编译。

## 组件开发约定

- 同功能组件在 Vue 与 React 两侧保持 props、API、样式变体一致；
- 组件样式使用 `cn` 合并类名；
- 多变体组件优先使用 `cva` 管理样式分支；
- 组件内仅编写 Tailwind 原子类，不硬编码颜色与尺寸。

## 包依赖约定

- 内部包统一使用 `workspace:*` 声明本地依赖；
- 框架相关依赖（Vue / React）设为 `peerDependencies`，版本由宿主项目控制；
- 公共工具与样式统一抽离为独立包，禁止代码冗余。

## 提交规范

提交 commit 时请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范，常用前缀：`feat:` / `fix:` / `docs:` / `style:` / `refactor:` / `test:` / `chore:`。

## 测试要求

- 新增组件须配套单元测试；
- 跨框架组件通过**契约测试**保证行为一致：对比 Vue 与 React 两侧组件在相同 props 输入下的输出类名、DOM 结构与交互行为。用例统一放在 `packages/frameworks/{vue,react}/__tests__/contract/`，随 `pnpm test` 一并运行；
- 提交前须通过 `pnpm lint` 与 `pnpm test`。
