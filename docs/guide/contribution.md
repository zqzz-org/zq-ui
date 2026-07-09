# 贡献指南

本文档面向希望参与 ZQ-UI 开发的贡献者，涵盖提交流程、质量门禁和开发环境配置。

## 提交前检查

项目使用 Husky 和 lint-staged 做本地提交前检查。

- `pre-commit`：执行 `pnpm lint-staged`，只检查本次暂存文件。
- `pre-push`：执行 `pnpm typecheck` 和 `pnpm test:run`。

本地 hook 可以提前暴露问题，但不能作为唯一质量门禁。开发者仍可通过 `--no-verify` 跳过，因此主分支质量必须由 CI 兜底。

## 本地验证流程

常规代码改动至少运行：

```bash
pnpm typecheck
pnpm test:run
```

涉及 Playground、样式或文档时额外运行：

```bash
pnpm build
pnpm docs:build
```

发布前运行完整检查：

```bash
pnpm lint:check
pnpm format:check
pnpm typecheck
pnpm test:run
pnpm build
pnpm docs:build
npm pack --dry-run
```

## VSCode 配置

项目提供 `.vscode/extensions.json` 与 `.vscode/settings.json`。

推荐安装以下扩展：

- Vue Official
- ESLint
- Prettier
- EditorConfig
- Vitest

保存文件时会自动执行 Prettier 格式化，并触发 ESLint 自动修复。

## Jenkins CI

项目根目录提供 `Jenkinsfile`，用于服务端质量门禁。

推荐配置：

- 使用 Multibranch Pipeline 或普通 Pipeline 指向仓库根目录的 `Jenkinsfile`。
- Jenkins Agent 需要安装 Node.js，并支持 Corepack。
- PR / MR 与主分支构建都执行 Jenkinsfile。
- Git 服务端保护主分支，禁止直接 push，必须通过 PR / MR 合并。
- 合并前要求 Jenkins 构建通过。

Jenkins 阶段：

- **Install**：启用 Corepack，安装 pnpm 依赖。
- **Quality**：并行执行格式检查、ESLint、类型检查。
- **Test**：执行单元测试。
- **Build**：并行构建 Playground 与文档。
- **Package Dry Run**：执行包发布预检查。
