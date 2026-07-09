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
- 每次修改代码后**必须**执行完整验证链：`pnpm typecheck && pnpm test:run && pnpm build && pnpm docs:build`。

## 提交流程

开发主分支通过 Pull Request 进入 main 分支。提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范（如 `feat:`、`fix:`、`chore:`）。

详细的贡献流程、质量门禁和 CI 配置见 [贡献指南](./contribution)。
