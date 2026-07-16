# @zqzz/zq-ui

基于 [Element Plus](https://element-plus.org) 的 Vue 3 组件库（**源码分发**，无构建步骤）。

- 标签前缀：`<zq-*>`
- 主题：`data-zq-theme` / `.zq-theme-*`
- 文档：https://crazily6617.github.io/zq-ui/

## 安装

```bash
pnpm add @zqzz/zq-ui element-plus@~2.13.7 vue@^3.5.0
```

## 使用

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ZQUI from '@zqzz/zq-ui'
import '@zqzz/zq-ui/styles'
import '@zqzz/zq-ui/styles/themes'

const app = createApp(App)
app.use(ElementPlus)
app.use(ZQUI, { theme: 'aiedu' }) // 或 false / { hostname }
```

```vue
<zq-button type="primary" variant="gradient">按钮</zq-button>
```

## 说明

- `element-plus`、`vue` 为 peerDependencies，需由业务项目安装
- 消费方打包工具需能处理 `.vue` / `.ts` / CSS（如 Vite）
- 仓库 monorepo：https://github.com/zqzz-org/zq-ui
