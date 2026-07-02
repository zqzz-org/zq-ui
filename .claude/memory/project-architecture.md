---
name: project-architecture
description: 项目三层结构——组件库（源码分发）/ Playground / VitePress 文档站
metadata:
  type: project
---

ZQ-UI 是基于 Element Plus（`^2.13.7`）二次封装的 Vue 3 组件库，在完全透传 EP 所有属性、事件、插槽的基础上扩展团队定制主题和交互能力。

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

### VitePress 文档

自定义主题入口 `docs/.vitepress/theme/index.ts` 继承 DefaultTheme，通过 `enhanceApp` 注册 Element Plus 和 ZQ-UI，使 markdown 里可以直接写 `<zq-button>`（配合 `<ClientOnly>` 包裹）。宽屏全适配：`--vp-layout-max-width: 100%`，所有内容区 `max-width: none`。

**Why:** 理解三层结构的职责划分——组件库只写组件逻辑，Playground 即时调试，文档站对外展示。

**How to apply:** 改组件去 `packages/zq-ui/`，调试验证去 `src/`，写文档去 `docs/`。不要混淆三层边界。
