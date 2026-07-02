---
name: vue-ts-constraints
description: Vue/TS 编码约束——禁 any / 少用断言 / 改后必须 vue-tsc + vitest
metadata:
  type: project
---

### 类型约束
- **禁止使用 `any`** — 优先靠泛型和类型推导解决问题
- **尽量不写类型断言（`as`）** — `as const` 等 const 断言是允许的，但 `as SomeType` 类型转换要尽量避免
- 组件 props 通过 `interface ZqXxxProps extends Partial<XxxProps>` 声明，靠泛型继承而非手动复制类型

### 修改后必须验证
每次修改代码后**必须**执行：
1. TS 类型校验：`pnpm typecheck`（底层 `vue-tsc --noEmit`）
2. 单元测试：`pnpm test:run`（底层 `vitest run`）

两项均通过才能声称修改完成。

### 版本约束
- Vue：`^3.5.0`
- Element Plus：`^2.13.7`
- 使用 `<script setup lang="ts">` + Composition API

### Variant 规则
- `variant` 只有 `gradient` 和 `soft`，EP 原生的 `dashed` 不做二次封装
- Variant 颜色统一跟随主色系，不随 `type` 变化

**Why:** 类型安全是组件库的基础要求，任何类型漏洞都可能传导到消费方。修改后验证是最后一道防线。

**How to apply:** 每次修改 `.ts` / `.vue` 文件后，立即运行 `pnpm typecheck && pnpm test:run`。如果失败，修复后再声明完成。
