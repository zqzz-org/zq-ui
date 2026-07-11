# 主题

ZQ-UI 使用 CSS 变量实现主题定制。默认入口 `zq-ui/styles` 会引入基础 token 和组件样式，不覆盖 Element Plus 默认主题色。

## 默认引入

```ts
import 'element-plus/dist/index.css'
import 'zq-ui/styles'
```

## 内置主题

需要运行时切换主题时，引入内置主题包：

```ts
import 'zq-ui/styles/themes'
```

`app.use(ZQUI)` 会默认按 UI 库内置域名规则自动应用主题。

新增内置主题时，需要同步维护 `packages/zq-ui/theme.ts` 的 `ZqThemeName`、`zqThemeOptions` 和 `defaultZqThemeHostRules`，并在 `packages/zq-ui/styles/themes/index.ts` 中引入对应主题样式。

未命中内置域名规则时，不写入 `data-zq-theme`，直接使用 Element Plus 默认主题。

可在特殊项目中强制指定主题：

```ts
app.use(ZQUI, {
  theme: 'aiedu',
})
```

也可以关闭自动主题：

```ts
app.use(ZQUI, {
  theme: false,
})
```

如果项目需要临时覆盖域名规则：

```ts
app.use(ZQUI, {
  theme: {
    rules: [
      { theme: 'aiedu', hosts: ['aiedu.example.com'] },
      { theme: 'aiedu', includes: ['aiedu'] },
    ],
  },
})
```

局部固定某套主题时，不需要通过域名判断：

```vue
<template>
  <zq-button class="zq-theme-aiedu" type="primary" variant="gradient"> 固定后台主题 </zq-button>
</template>
```

## 常用变量

业务样式建议优先使用 ZQ-UI 语义变量：

| 变量                      | 说明             |
| ------------------------- | ---------------- |
| `--zq-color-brand`        | 当前主题品牌主色 |
| `--zq-color-brand-soft`   | 品牌浅色背景     |
| `--zq-color-brand-muted`  | 品牌弱强调色     |
| `--zq-color-brand-strong` | 品牌深色         |
| `--zq-gradient-primary`   | 主色渐变         |
| `--zq-font-size-base`     | 默认字号         |
| `--zq-shadow-soft`        | 柔和阴影         |
| `--zq-spacing-md`         | 中等间距         |
| `--zq-transition-fast`    | 快速过渡         |

Element Plus 变量仍然可以直接覆盖：

```css
:root {
  --el-color-primary: #ff6b35;
  --el-color-primary-light-9: #fff0eb;
  --el-color-primary-dark-2: #cc562a;
}
```

## 文件组织

样式按职责拆分：

| 路径                                 | 说明            |
| ------------------------------------ | --------------- |
| `styles/tokens/base.css`             | 基础 token      |
| `styles/themes/*.css`                | 内置主题        |
| `styles/components/button/index.css` | Button 组件样式 |

直接引入 `zq-ui/styles` 即可，入口文件会按顺序聚合基础 token 和组件样式。

> 自定义变量的引入顺序需要在 `zq-ui/styles` 之后。
