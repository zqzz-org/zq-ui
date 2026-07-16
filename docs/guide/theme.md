# 主题

ZQ-UI 使用 CSS 变量实现主题定制。默认入口 `@zqzz/zq-ui/styles` 会引入基础 token 和组件样式，不覆盖 Element Plus 默认主题色。

## 默认引入

```ts
import 'element-plus/dist/index.css'
import '@zqzz/zq-ui/styles'
```

## 内置主题

需要运行时切换主题时，引入内置主题包：

```ts
import '@zqzz/zq-ui/styles/themes'
```

`app.use(ZQUI)` 会默认按 UI 库内置域名规则自动应用主题。

新增内置主题时，需要同步维护 `packages/zq-ui/theme/index.ts` 的 `ZqThemeName`、`zqThemeOptions` 和 `defaultZqThemeHostRules`，并在 `packages/zq-ui/styles/themes/index.ts` 中引入对应主题样式。

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

## 弹层组件的主题适配

Element Plus 的下拉 / 弹层类组件（Select、DatePicker、Cascader、TreeSelect、TimePicker、TimeSelect、Dropdown、Tooltip、Popover、ColorPicker）默认会把浮层 **teleport 到 `<body>`**。

- **全局主题**：`applyZqTheme()` 默认把 `data-zq-theme` 写在 `<html>` 上，teleport 出去的浮层仍是 `<html>` 的后代，会自动继承主色变量，**无需任何额外处理**。
- **局部主题**：手写 `.zq-theme-aiedu` 只作用于某个容器 div 时，浮层 teleport 后就脱离了这个作用域，拿不到被覆盖的 `--el-color-primary`，导致 `.el-select-dropdown__item.is-selected` 等直接使用主色变量的样式回退到默认色。

用 `<zq-theme-provider>` 包裹即可解决：它既给容器写上 `.zq-theme-*` class，又通过 `provide` 把主题名传给内部的弹层组件，弹层代理会自动把主题 class 注入到浮层的 `popper-class`，让浮层重新进入主题作用域。

```vue
<template>
  <!-- 同一页面并排多套主题，弹层各自正确适配 -->
  <zq-theme-provider theme="aiedu">
    <zq-select v-model="a">
      <zq-option label="现金管理" value="cash" />
    </zq-select>
  </zq-theme-provider>

  <zq-theme-provider theme="xk">
    <zq-select v-model="b">
      <zq-option label="债券组合" value="bond" />
    </zq-select>
  </zq-theme-provider>
</template>
```

`<zq-theme-provider>` 的 props：

| 属性    | 类型          | 默认值    | 说明                             |
| ------- | ------------- | --------- | -------------------------------- |
| `theme` | `ZqThemeName` | `default` | 作用域主题，`default` 不加 class |
| `tag`   | `string`      | `div`     | 渲染的容器标签                   |

> 若整站只用一套主题，直接走全局 `applyZqTheme()` 即可，**不需要** `<zq-theme-provider>`。它是为「同页多主题」场景准备的。

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

直接引入 `@zqzz/zq-ui/styles` 即可，入口文件会按顺序聚合基础 token 和组件样式。

> 自定义变量的引入顺序需要在 `@zqzz/zq-ui/styles` 之后。

## 移动端主题（zq-m）

移动端使用**独立**主题实现，与上文 PC 逻辑平行：

|            | PC（zq-ui）           | 移动（zq-m）           |
| ---------- | --------------------- | ---------------------- |
| 属性       | `data-zq-theme`       | `data-zqm-theme`       |
| 局部 class | `.zq-theme-*`         | `.zqm-theme-*`         |
| Provider   | `<zq-theme-provider>` | `<zqm-theme-provider>` |
| 主色变量   | `--el-color-primary`  | `--van-primary-color`  |
| 业务语义   | `--zq-color-brand`    | `--zqm-color-brand`    |

主题名相同：`default` | `aiedu` | `xk` | `qedu` | `aistudy`。色值对齐，**源码不互相 import**。

```ts
import { applyZqmTheme } from '@zqzz/zq-m/theme'
applyZqmTheme('aiedu')
```

```vue
<zqm-theme-provider theme="aiedu">
  <zqm-button type="primary">通识主色</zqm-button>
</zqm-theme-provider>
```

引入顺序：

```ts
import 'vant/lib/index.css'
import '@zqzz/zq-m/styles'
import '@zqzz/zq-m/styles/themes'
```

移动端专用说明见 [移动端主题](/mobile/theme)。
