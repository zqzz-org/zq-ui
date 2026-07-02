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
import 'element-plus/dist/index.css'   // Element Plus 默认样式
import 'zq-ui/styles'                   // ZQ-UI 主题变量 + 组件样式（覆盖 Element Plus）
```

## 全局注册

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import ZqUI from 'zq-ui'
import 'zq-ui/styles'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)  // 必须先注册 Element Plus
app.use(ZqUI)         // 注册 ZQ-UI 组件

app.mount('#app')
```

注册后，所有 ZQ-UI 组件即可在模板中直接使用（如 `<zq-button>`）。

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

| 依赖         | 最低版本  |
| ------------ | --------- |
| Vue          | ^3.4.0    |
| Element Plus | ^2.13.7   |
| TypeScript   | ^5.0.0（推荐） |
