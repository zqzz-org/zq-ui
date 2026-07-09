# 快速开始

ZQ-UI 是基于 [Element Plus](https://element-plus.org) 的团队自定义组件库，在完全兼容 Element Plus 的基础上提供扩展组件和团队定制主题。

## 安装

> **前置依赖**：项目需要预先安装 `vue`（^3.5.0）和 `element-plus`（>=2.13.7 <2.14.0）。

```bash
pnpm install zq-ui
```

如果项目中尚未安装 Element Plus：

```bash
pnpm install element-plus@~2.13.7
```

## 引入样式

ZQ-UI 的主题样式建立在 Element Plus CSS 变量体系之上，**必须在 Element Plus 样式之后引入**：

```ts
// main.ts
import 'element-plus/dist/index.css' // Element Plus 默认样式
import 'zq-ui/styles' // ZQ-UI 主题变量 + 组件样式（覆盖 Element Plus）
```

如果需要按域名或局部区域切换内置主题，再额外引入主题包：

```ts
import 'zq-ui/styles/themes'
```

## 全局注册

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import ZQUI from 'zq-ui'
import 'zq-ui/styles'
import 'zq-ui/styles/themes'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus) // 必须先注册 Element Plus
app.use(ZQUI) // 注册 ZQ-UI 组件，并按 UI 库内置规则自动应用主题

app.mount('#app')
```

注册后即可在模板中直接使用 `<zq-xxx>` 组件。

## 组件透传机制

`app.use(ZQUI)` 注册后，可直接使用的组件分为两类：

### 自定义封装组件

对 Element Plus 组件做了二次封装，扩展了团队定制属性。目前有：

| 组件   | 标签          | 扩展内容                                             |
| ------ | ------------- | ---------------------------------------------------- |
| Button | `<zq-button>` | `variant` 变体样式、`debounce` 防抖、`throttle` 节流 |

这类组件有专属的 `.vue` 源文件，后续会持续扩展。

### 自动代理组件

对于**不需要自定义逻辑**的 Element Plus 组件，ZQ-UI 自动生成透明代理——无需编写任何封装文件，注册后直接用 `zq-xxx` 标签即可，所有属性、事件、插槽完整透传到对应的 `el-xxx` 组件。

完整列表见 [代理组件列表](./proxy-components)。

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

| 依赖         | 最低版本         |
| ------------ | ---------------- |
| Vue          | ^3.5.0           |
| Element Plus | >=2.13.7 <2.14.0 |
| TypeScript   | ^5.0.0（推荐）   |
