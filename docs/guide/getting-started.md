# 快速开始

本 monorepo 提供两套平行组件库：

| 包                    | 端        | 基础 UI      | 标签前缀  |
| --------------------- | --------- | ------------ | --------- |
| [`zq-ui`](/pc/button) | PC / 后台 | Element Plus | `<zq-*>`  |
| [`zq-m`](/mobile/)    | H5 / Pad  | Vant 4       | `<zqm-*>` |

主题名（`aiedu` / `xk` / `qedu` / `aistudy`）两端对齐，**运行时互不依赖**。业务可只装一端，也可同项目双装，由路由/页面自行选择标签。

在线文档：**https://crazily6617.github.io/zq-ui**

---

## PC：zq-ui

> **前置**：`vue` ^3.5.0，`element-plus` >=2.13.7 <2.14.0

```bash
pnpm add zq-ui element-plus@~2.13.7
```

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import ZQUI from 'zq-ui'
import 'zq-ui/styles'
import 'zq-ui/styles/themes' // 需要内置主题切换时再引

import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(ZQUI) // 可按域名自动主题，或 { theme: 'aiedu' } / { theme: false }
app.mount('#app')
```

模板使用 `<zq-button>`、`<zq-select>` 等。自定义能力见 [Button](/pc/button)；代理列表见 [PC 代理组件](/guide/proxy-components)。

### 按需引入（PC）

```vue
<script setup lang="ts">
import { ZqButton } from 'zq-ui'
import 'zq-ui/styles'
</script>

<template>
  <ZqButton type="primary">按钮</ZqButton>
</template>
```

---

## 移动：zq-m

> **前置**：`vue` ^3.5.0，`vant` ^4

```bash
pnpm add zq-m vant
```

```ts
// main.ts
import { createApp } from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'

import ZQM from 'zq-m'
import 'zq-m/styles'
import 'zq-m/styles/themes'

import App from './App.vue'

const app = createApp(App)
app.use(Vant)
app.use(ZQM, { theme: 'aiedu' })
app.mount('#app')
```

模板使用 `<zqm-button>`、`<zqm-field>` 等。详见 [移动端总览](/mobile/)、[移动主题](/mobile/theme)、[移动代理组件](/mobile/proxy-components)。

---

## 同一业务项目双装

允许同时安装 `zq-ui` 与 `zq-m`（以及 Element Plus + Vant）：

```ts
app.use(ElementPlus)
app.use(ZQUI)
app.use(Vant)
app.use(ZQM)
```

**推荐**：按路由/页面拆分 UI（桌面页只用 `zq-*`，H5 页只用 `zqm-*`），不要在同一表单混用两套组件。多端结构由业务自行决定。

---

## 文档站点

| 项       | 说明                                       |
| -------- | ------------------------------------------ |
| 正式地址 | `https://crazily6617.github.io/zq-ui`      |
| 本地预览 | `pnpm docs:dev`                            |
| 构建产物 | `pnpm docs:build` → `docs/.vitepress/dist` |
| 与 npm   | **无关**，文档单独部署，不随组件包发布     |

部署说明见 [文档部署](/guide/deploy)。

---

## 版本要求

| 依赖         | PC（zq-ui）      | 移动（zq-m）   |
| ------------ | ---------------- | -------------- |
| Vue          | ^3.5.0           | ^3.5.0         |
| Element Plus | >=2.13.7 <2.14.0 | —              |
| Vant         | —                | ^4             |
| TypeScript   | ^5.0.0（推荐）   | ^5.0.0（推荐） |
