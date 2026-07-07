# 代码规范

## 基础原则

ZQ-UI 使用 Vue 3、TypeScript、ESLint、Prettier 作为基础约束。代码提交前需要通过类型检查、单元测试、构建与格式检查。

## 命令

```bash
pnpm format        # 自动格式化
pnpm format:check  # 检查格式
pnpm lint          # ESLint 自动修复
pnpm lint:check    # ESLint 检查，不自动修复
pnpm typecheck     # TypeScript 类型检查
pnpm test:run      # 单元测试
pnpm quality:check # 格式、ESLint、类型、单元测试
```

## 格式化

统一使用 Prettier，配置位于 `.prettierrc.json`。

- 不使用分号。
- 字符串使用单引号。
- 缩进为 2 个空格。
- 最大行宽为 100。
- 多行结构保留尾随逗号。
- 换行符使用 LF。

## TypeScript

- 禁止使用 `any`。
- 无法确定类型时优先使用 `unknown`，并在使用前完成类型收窄。
- 尽量不写类型断言。
- 需要类型断言时，优先补充类型声明、泛型或中间变量，让 TypeScript 自然推导。
- 禁止用 `@ts-ignore` 跳过类型错误。
- `@ts-expect-error` 必须附带说明，并且只用于明确的兼容性边界。

## Vue

- 组件使用 Vue 3 Composition API。
- SFC 使用 `<script setup lang="ts">`。
- SFC 顺序为 `<script>`、`<template>`、`<style>`。
- 响应式状态保持最小化，能用 `computed` 派生的内容不要额外存储。
- primitive 状态优先使用 `shallowRef`。
- 组件边界清晰，公共行为优先通过 props、emits、slots 表达。

## 组件库约定

- 有自定义逻辑的组件放在 `packages/zq-ui/components/`。
- 透明代理组件在 `packages/zq-ui/index.ts` 中注册。
- 组件样式放在 `packages/zq-ui/styles/components/`。
- 主题变量放在 `packages/zq-ui/styles/themes/`。
- 公共 token 放在 `packages/zq-ui/styles/tokens/`。
- 新增能力需要同步补充 Playground、文档和测试。

## 提交前检查

项目使用 Husky 和 lint-staged 做本地提交前检查。

- `pre-commit`：执行 `pnpm lint-staged`，只处理本次暂存文件。
- `pre-push`：执行 `pnpm typecheck` 和 `pnpm test:run`。

本地 hook 可以提前暴露问题，但不能作为唯一质量门禁。开发者仍可通过 `--no-verify` 跳过 hook，因此主分支质量必须由 Jenkins 兜底。

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

发布前运行：

```bash
pnpm lint:check
pnpm format:check
pnpm typecheck
pnpm test:run
pnpm build
pnpm docs:build
npm pack --dry-run
```

## VSCode

项目提供 `.vscode/extensions.json` 与 `.vscode/settings.json`。

推荐安装：

- Vue Official
- ESLint
- Prettier
- EditorConfig
- Vitest

保存文件时会自动执行 Prettier 格式化，并触发 ESLint 可自动修复项。

## Jenkins

项目根目录提供 `Jenkinsfile`，用于服务端质量门禁。

推荐 Jenkins 配置：

- 使用 Multibranch Pipeline 或普通 Pipeline 指向仓库根目录的 `Jenkinsfile`。
- Jenkins Agent 需要安装 Node.js，并支持 Corepack。
- PR / MR 与主分支构建都执行 Jenkinsfile。
- Git 服务端保护主分支，禁止直接 push，必须通过 PR / MR 合并。
- 合并前要求 Jenkins 构建通过。

Jenkins 阶段：

- Install：启用 Corepack，安装 pnpm 依赖。
- Quality：并行执行格式检查、ESLint、类型检查。
- Test：执行单元测试。
- Build：并行构建 Playground 与文档。
- Package Dry Run：执行包发布预检查。
