# 快速开始

ZQ-UI 是基于 [Element Plus](https://element-plus.org) 的团队自定义组件库，在完全兼容 Element Plus 的基础上提供扩展组件和团队定制主题。

## 安装

> **前置依赖**：项目需要预先安装 `vue`（^3.5.0）和 `element-plus`（^2.13.7）。

```bash
pnpm install zq-ui
```

如果项目中尚未安装 Element Plus：

```bash
pnpm install element-plus@^2.13.7
```

## 引入样式

ZQ-UI 的主题样式建立在 Element Plus CSS 变量体系之上，**必须在 Element Plus 样式之后引入**：

```ts
// main.ts
import 'element-plus/dist/index.css' // Element Plus 默认样式
import 'zq-ui/styles' // ZQ-UI 主题变量 + 组件样式（覆盖 Element Plus）
```

## 全局注册

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import ZQUI from 'zq-ui'
import 'zq-ui/styles'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus) // 必须先注册 Element Plus
app.use(ZQUI) // 注册 ZQ-UI 组件

app.mount('#app')
```

注册后即可在模板中直接使用 `<zq-xxx>` 组件。

## 组件透传机制

`app.use(ZQUI)` 注册后，可直接使用的组件分为两类：

### 自定义封装组件

对 Element Plus 组件做了二次封装，扩展了团队定制属性。目前有：

| 组件   | 标签          | 扩展内容           |
| ------ | ------------- | ------------------ |
| Button | `<zq-button>` | `variant` 变体样式、`debounce` 防抖、`throttle` 节流 |

这类组件有专属的 `.vue` 源文件，后续会持续扩展。

### 自动代理组件

对于**不需要自定义逻辑**的 Element Plus 组件，ZQ-UI 自动生成透明代理——无需编写任何封装文件，注册后直接用 `zq-xxx` 标签即可，所有属性、事件、插槽完整透传到对应的 `el-xxx` 组件。

以下组件已内置自动代理，开箱即用：

<table>
  <thead>
    <tr><th>标签</th><th>代理到</th><th>标签</th><th>代理到</th></tr>
  </thead>
  <tbody>
    <tr><td><code>&lt;zq-scrollbar&gt;</code></td><td>el-scrollbar</td><td><code>&lt;zq-input&gt;</code></td><td>el-input</td></tr>
    <tr><td><code>&lt;zq-select&gt;</code></td><td>el-select</td><td><code>&lt;zq-table&gt;</code></td><td>el-table</td></tr>
    <tr><td><code>&lt;zq-dialog&gt;</code></td><td>el-dialog</td><td><code>&lt;zq-drawer&gt;</code></td><td>el-drawer</td></tr>
    <tr><td><code>&lt;zq-form&gt;</code></td><td>el-form</td><td><code>&lt;zq-form-item&gt;</code></td><td>el-form-item</td></tr>
    <tr><td><code>&lt;zq-tag&gt;</code></td><td>el-tag</td><td><code>&lt;zq-tooltip&gt;</code></td><td>el-tooltip</td></tr>
    <tr><td><code>&lt;zq-popover&gt;</code></td><td>el-popover</td><td><code>&lt;zq-dropdown&gt;</code></td><td>el-dropdown</td></tr>
    <tr><td><code>&lt;zq-menu&gt;</code></td><td>el-menu</td><td><code>&lt;zq-tabs&gt;</code></td><td>el-tabs</td></tr>
    <tr><td><code>&lt;zq-card&gt;</code></td><td>el-card</td><td><code>&lt;zq-collapse&gt;</code></td><td>el-collapse</td></tr>
    <tr><td><code>&lt;zq-pagination&gt;</code></td><td>el-pagination</td><td><code>&lt;zq-badge&gt;</code></td><td>el-badge</td></tr>
    <tr><td><code>&lt;zq-avatar&gt;</code></td><td>el-avatar</td><td><code>&lt;zq-skeleton&gt;</code></td><td>el-skeleton</td></tr>
    <tr><td><code>&lt;zq-empty&gt;</code></td><td>el-empty</td><td><code>&lt;zq-result&gt;</code></td><td>el-result</td></tr>
    <tr><td><code>&lt;zq-descriptions&gt;</code></td><td>el-descriptions</td><td><code>&lt;zq-timeline&gt;</code></td><td>el-timeline</td></tr>
    <tr><td><code>&lt;zq-divider&gt;</code></td><td>el-divider</td><td><code>&lt;zq-link&gt;</code></td><td>el-link</td></tr>
    <tr><td><code>&lt;zq-text&gt;</code></td><td>el-text</td><td><code>&lt;zq-image&gt;</code></td><td>el-image</td></tr>
    <tr><td><code>&lt;zq-icon&gt;</code></td><td>el-icon</td><td><code>&lt;zq-alert&gt;</code></td><td>el-alert</td></tr>
    <tr><td><code>&lt;zq-progress&gt;</code></td><td>el-progress</td><td><code>&lt;zq-tree&gt;</code></td><td>el-tree</td></tr>
    <tr><td><code>&lt;zq-date-picker&gt;</code></td><td>el-date-picker</td><td><code>&lt;zq-time-picker&gt;</code></td><td>el-time-picker</td></tr>
    <tr><td><code>&lt;zq-cascader&gt;</code></td><td>el-cascader</td><td><code>&lt;zq-transfer&gt;</code></td><td>el-transfer</td></tr>
    <tr><td><code>&lt;zq-checkbox&gt;</code></td><td>el-checkbox</td><td><code>&lt;zq-radio&gt;</code></td><td>el-radio</td></tr>
    <tr><td><code>&lt;zq-switch&gt;</code></td><td>el-switch</td><td><code>&lt;zq-slider&gt;</code></td><td>el-slider</td></tr>
    <tr><td><code>&lt;zq-rate&gt;</code></td><td>el-rate</td><td><code>&lt;zq-color-picker&gt;</code></td><td>el-color-picker</td></tr>
    <tr><td><code>&lt;zq-upload&gt;</code></td><td>el-upload</td><td><code>&lt;zq-popconfirm&gt;</code></td><td>el-popconfirm</td></tr>
    <tr><td><code>&lt;zq-backtop&gt;</code></td><td>el-backtop</td><td><code>&lt;zq-affix&gt;</code></td><td>el-affix</td></tr>
    <tr><td><code>&lt;zq-space&gt;</code></td><td>el-space</td><td><code>&lt;zq-config-provider&gt;</code></td><td>el-config-provider</td></tr>
  </tbody>
</table>

::: tip 使用方式
自动代理组件与 Element Plus 原生组件写法完全一致，只是标签名把 `el-` 换成 `zq-`：

```vue
<zq-scrollbar height="200px">
  <p>内容...</p>
</zq-scrollbar>

<zq-tag type="success" closable>标签</zq-tag>

<zq-divider content-position="left">分割线</zq-divider>
```

:::

## 按需引入

如果不想全局注册，也可以按需引入单个组件：

```vue
<script setup lang="ts">
import { ZqButton } from 'zq-ui'
import 'zq-ui/styles'
</script>

<template>
  <ZqButton type="primary">按钮</ZqButton>
</template>
```

## 版本要求

| 依赖         | 最低版本       |
| ------------ | -------------- |
| Vue          | ^3.5.0         |
| Element Plus | ^2.13.7        |
| TypeScript   | ^5.0.0（推荐） |
