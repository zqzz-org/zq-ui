# 移动端（zq-m）总览

`@zqzz/zq-m` 是基于 [Vant 4](https://vant-ui.github.io/vant/) 的移动端 / Pad 组件库，标签前缀为 **`zqm-`**（如 `<zqm-button>`）。

## 与 zq-ui 的关系

|            | zq-ui（PC）     | zq-m（移动）     |
| ---------- | --------------- | ---------------- |
| 基础 UI    | Element Plus    | Vant             |
| 标签       | `<zq-*>`        | `<zqm-*>`        |
| 主题属性   | `data-zq-theme` | `data-zqm-theme` |
| 局部 class | `.zq-theme-*`   | `.zqm-theme-*`   |
| npm 包     | `@zqzz/zq-ui`   | `@zqzz/zq-m`     |

两套库**运行时互不 import**，主题色值对齐但各自维护。同一业务项目可以同时安装，由业务侧按路由/页面选择使用哪一套。

## 快速试用

```bash
pnpm add @zqzz/zq-m vant
```

```ts
import { createApp } from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import ZQM from '@zqzz/zq-m'
import '@zqzz/zq-m/styles'
import '@zqzz/zq-m/styles/themes'

const app = createApp(App)
app.use(Vant)
app.use(ZQM, { theme: 'aiedu' })
```

```vue
<template>
  <zqm-theme-provider theme="aiedu">
    <zqm-button type="primary">主按钮</zqm-button>
    <zqm-field v-model="value" label="用户名" placeholder="请输入" />
  </zqm-theme-provider>
</template>
```

## 当前进度

- 主题体系与 `zqm-theme-provider` 已就绪
- 常用 Vant 组件已透明代理为 `zqm-*`
- 自定义 variant 等深度封装按需推进，文档页会随组件落地补充

更多：

- [主题](/mobile/theme)
- [代理组件列表](/mobile/proxy-components)
- [快速开始（含双包装载）](/guide/getting-started)
