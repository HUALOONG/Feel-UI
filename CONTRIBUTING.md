# Contributing to Feel UI

欢迎为 Feel UI（栖羽）贡献代码。参与即表示您同意文末的[贡献者许可协议（CLA）](#贡献者许可协议cla)。

## 提交 Issue

通过 GitHub Issues 提交 Bug 报告或功能建议：

- Bug 报告请包含：复现步骤、预期行为、实际行为、环境信息；
- 功能建议请说明使用场景与预期 API。

## 提交 Pull Request

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

## 代码规范

- 遵循项目统一的 ESLint + Prettier 配置；
- 组件代码须包含完整 TypeScript 类型定义；
- 新增组件须同时在 Vue 与 React 两侧实现并补齐测试。

## 贡献者许可协议（CLA）

本项目采用 MIT 许可证开源，版权归属 **安徽九问信息科技有限公司**。
提交 Pull Request 即表示您同意：

1. 将所贡献代码的版权授予安徽九问信息科技有限公司；
2. 您有权做出上述授权，且贡献内容不侵犯第三方知识产权；
3. 您已阅读并同意 [MIT 许可证](./LICENSE) 的全部条款。

如需签署正式的 CLA 文件，请在 PR 中留言，由维护者协助处理。
