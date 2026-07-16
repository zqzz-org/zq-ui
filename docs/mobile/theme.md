# 移动端主题（zq-m）

与 PC 端共用主题名：`default` | `aiedu` | `xk` | `qedu` | `aistudy`。  
实现上使用 **`data-zqm-theme` / `.zqm-theme-*`**，覆盖 Vant 的 `--van-primary-color` 等变量，与 zq-ui **平行维护**（当前不抽公共包）。

## 全局应用

```ts
import { applyZqmTheme, applyZqmThemeByHost } from '@zqzz/zq-m/theme'

// 强制主题
applyZqmTheme('aiedu')

// 或按域名
applyZqmThemeByHost({ hostname: location.hostname })
```

`app.use(ZQM, { theme: 'aiedu' })` 会在 install 时写入 `document.documentElement` 的 `data-zqm-theme`。

## 局部主题

```vue
<zqm-theme-provider theme="xk">
  <zqm-button type="primary">信息科技主题</zqm-button>
</zqm-theme-provider>
```

Provider 会同时：

1. 在容器上加上 `.zqm-theme-xk`
2. `provide` 主题名，供后续弹层类代理注入 class（`POPPER_COMPONENTS` 名单随组件补齐）

## 样式引入顺序

```ts
import 'vant/lib/index.css'
import '@zqzz/zq-m/styles'
import '@zqzz/zq-m/styles/themes'
```

更完整的双端主题说明见 [指南 · 主题定制](/guide/theme)。
