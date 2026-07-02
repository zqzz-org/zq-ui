---
name: theme-system
description: 主题体系——CSS 变量覆盖 Element Plus + 品牌专属变量 + 加载顺序
metadata:
  type: project
---

主题分三层，按顺序加载：`vars.css` → 组件样式 → 用户覆盖。

### CSS 变量覆盖
- `--el-color-primary: #2f6bff`，含 light-3/5/7/8/9 和 dark-2 全套色阶
- success `#19be6b`、warning `#ff9900`、danger `#ed4014`
- 圆角 `--el-border-radius-base: 6px`

### 品牌专属变量
- `--zq-shadow-*`、`--zq-spacing-*`、`--zq-gradient-*`、`--zq-font-size-*`
- 渐变按钮用 `--zq-gradient-primary` 控制颜色，用户可在 `:root` 覆盖或单按钮 style 覆盖

### 组件样式
- 组件样式用 `!important` 确保覆盖 Element Plus 默认值
- 三态分离：`:hover`、`:focus-visible`（仅显示轮廓线）、`:active`
- `:focus` 捆绑 `:hover` 会导致点击后状态残留

### 消费方引入顺序（关键）
消费方必须把 `element-plus/dist/index.css` 放在 `zq-ui/styles` **之前**引入，确保 ZQ-UI 的覆盖生效。

**Why:** CSS 变量是 Element Plus 官方主题体系的唯一入口，SCSS 变量编译后 EP 不认识。

**How to apply:** 主题改动只改 `vars.css`；新增组件颜色优先引用已有 CSS 变量；`:hover` 和 `:focus` 必须分离。
