# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 命令

```bash
pnpm dev            # 启动 Playground 开发服务器（localhost:3000）
pnpm build          # 类型检查 + 构建 Playground
pnpm docs:dev       # 启动 VitePress 文档开发服务器
pnpm docs:build     # 构建 VitePress 文档
pnpm lint           # ESLint 检查（自动修复）
pnpm format         # Prettier 格式化
pnpm test           # Vitest
pnpm test:run       # Vitest（单次运行）
pnpm typecheck      # vue-tsc --noEmit 类型检查
```

## 架构

ZQ-UI 是基于 Element Plus（`^2.13.7`）二次封装的 Vue 3 组件库，在完全透传 EP 所有属性、事件、插槽的基础上扩展团队定制主题和交互能力。

三层结构：

```
packages/zq-ui/          ← 组件库（源码分发，无构建步骤）
src/                     ← Vite Playground，开发时调试组件
docs/                    ← VitePress 文档站
```

### 组件库（`packages/zq-ui/`）

- **无构建步骤** — 直接分发 `.ts`/`.vue`/`.css` 源文件，由消费方的打包工具处理
- `element-plus` 和 `vue` 为 **peerDependencies**
- `index.ts` 导出各个组件 + `install()` 方法支持 `app.use()`
- 新增组件：在 `components/` 下加 `.vue` 文件，在 `index.ts` 的 `components` 对象里注册一行 + `export` 一行

### 组件封装模式（以 `zq-button.vue` 为例）

模板只包裹一个 `<el-button>`，做两件事：

1. **Slot 转发** — `v-for` 遍历 `useSlots()`，动态 `#[name]` 转发所有插槽
2. **Attrs 转发** — `forwardedBindings` 计算属性：
   - 从 `props` 中拆出自定义属性（`variant`、`debounce`），其余 EP 属性原样透传
   - 从 `useAttrs()` 中拆出 `onClick`，按需包一层防抖逻辑后放回
   - 其他事件（`onDblclick`、`onMouseenter` 等）和 HTML 属性直接透传

自定义 props（通过 `interface ZqButtonProps extends Partial<ButtonProps>`）：
- `variant?: 'gradient' | 'soft'` — 对应 CSS class `zq-btn--{variant}`

### 主题体系（按顺序加载）

1. `vars.css` — `:root` CSS 变量，覆盖 EP 品牌色（`--el-color-primary: #2f6bff` 等）+ 品牌专属变量（`--zq-shadow-*`、`--zq-gradient-*`、`--zq-spacing-*`）
2. `button.css` — `.zq-btn--gradient` / `.zq-btn--soft` 样式，`!important` 确保覆盖 EP 默认值；三态分离：`:hover`、`:focus-visible`（仅显示轮廓线）、`:active`

消费方必须把 `element-plus/dist/index.css` 放在 `zq-ui/styles` **之前**引入。

### Playground（`src/App.vue`）

左右布局：左侧组件列表 + 右侧主区域。Button 有 5 个子标签：变体样式、防抖交互、尺寸形状、透传测试、全量矩阵。新增组件的测试区：在 `components[]` 数组加一条 + 在 `<main>` 内加一个 `<template v-if>` 块。

### VitePress 文档

自定义主题入口 `docs/.vitepress/theme/index.ts` 继承 DefaultTheme，通过 `enhanceApp` 注册 Element Plus 和 ZQ-UI，使 markdown 里可以直接写 `<zq-button>`（配合 `<ClientOnly>` 包裹）。宽屏全适配：`--vp-layout-max-width: 100%`，所有内容区 `max-width: none`。

### 关键约束

- 包管理：**pnpm**（非 npm / yarn）
- Vue：`^3.5.0`
- Element Plus：`^2.13.7`
- `variant` 只有 `gradient` 和 `soft`，EP 原生的 `dashed` 不做二次封装
- Variant 颜色统一跟随主色系，不随 `type` 变化
- 每次修改代码后**必须**做 TS 类型校验（`vue-tsc --noEmit`）+ 跑测试（`vitest run`）
- 禁止使用 `any`，尽量不写类型断言（`as`），优先靠泛型和类型推导
