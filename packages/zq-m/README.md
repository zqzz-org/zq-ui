# @zqzz/zq-m

基于 [Vant 4](https://vant-ui.github.io/vant/) 的 Vue 3 移动端 / Pad 组件库（**源码分发**）。

- 标签前缀：`<zqm-*>`
- 主题：`data-zqm-theme` / `.zqm-theme-*`
- 文档：https://crazily6617.github.io/zq-ui/mobile/

## 安装

```bash
pnpm add @zqzz/zq-m vant vue@^3.5.0
```

## 使用

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
<zqm-button type="primary">按钮</zqm-button>
```

## 说明

- `vant`、`vue` 为 peerDependencies
- 与 `@zqzz/zq-ui` 平行维护，运行时互不依赖
- 仓库：https://github.com/zqzz-org/zq-ui
