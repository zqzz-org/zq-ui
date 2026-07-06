# 主题定制

ZQ-UI 使用 CSS 变量（CSS Custom Properties）实现主题定制。所有变量定义在 `:root` 下，全局生效。

## 覆盖 Element Plus 变量

ZQ-UI 覆盖了以下 Element Plus 核心 CSS 变量，你可以通过重新声明来进一步定制：

### 品牌色

```css
:root {
  --el-color-primary: #2f6bff;
  --el-color-success: #19be6b;
  --el-color-warning: #ff9900;
  --el-color-danger: #ed4014;
  --el-color-info: #909399;
}
```

Element Plus 会自动基于主色生成浅色变体（`light-3`、`light-5`、`light-7`、`light-8`、`light-9`）和深色变体（`dark-2`）。

### 圆角

| 变量                     | 默认值 | 说明     |
| ------------------------ | ------ | -------- |
| `--el-border-radius-base`  | `6px`  | 默认圆角 |
| `--el-border-radius-small` | `4px`  | 小圆角   |
| `--el-border-radius-round` | `20px` | 胶囊圆角 |

### 边框

| 变量                    | 默认值   | 说明       |
| ----------------------- | -------- | ---------- |
| `--el-border-color-base`  | `#dcdfe6` | 默认边框色 |
| `--el-border-color-light` | `#e4e7ed` | 浅色边框   |

## ZQ-UI 专属变量

以下是 ZQ-UI 额外定义的品牌变量，可在自定义组件或业务代码中使用。

### 字号

| 变量                | 默认值 | 说明       |
| ------------------- | ------ | ---------- |
| `--zq-font-size-xs`   | `12px` | 超小字号   |
| `--zq-font-size-sm`   | `13px` | 小字号     |
| `--zq-font-size-base` | `14px` | 默认字号   |
| `--zq-font-size-lg`   | `16px` | 大字号     |
| `--zq-font-size-xl`   | `20px` | 超大字号   |
| `--zq-font-size-xxl`  | `24px` | 特大字号   |

### 阴影

| 变量                | 默认值                                  | 说明     |
| ------------------- | --------------------------------------- | -------- |
| `--zq-shadow-soft`    | `0 2px 12px 0 rgba(0, 0, 0, 0.06)`     | 柔和阴影 |
| `--zq-shadow-base`    | `0 2px 12px 0 rgba(0, 0, 0, 0.1)`      | 默认阴影 |
| `--zq-shadow-strong`  | `0 4px 16px 0 rgba(0, 0, 0, 0.14)`     | 强烈阴影 |

### 间距

| 变量                  | 默认值 | 说明     |
| --------------------- | ------ | -------- |
| `--zq-spacing-xs`       | `4px`  | 超小间距 |
| `--zq-spacing-sm`       | `8px`  | 小间距   |
| `--zq-spacing-base`     | `12px` | 默认间距 |
| `--zq-spacing-md`       | `16px` | 中等间距 |
| `--zq-spacing-lg`       | `24px` | 大间距   |
| `--zq-spacing-xl`       | `32px` | 超大间距 |

### 过渡

| 变量                   | 默认值        | 说明       |
| ---------------------- | ------------- | ---------- |
| `--zq-transition-fast`   | `0.15s ease`  | 快速过渡   |
| `--zq-transition-base`   | `0.3s ease`   | 默认过渡   |
| `--zq-transition-slow`   | `0.5s ease`   | 慢速过渡   |

### 品牌渐变

| 变量                      | 默认值                                         | 说明     |
| ------------------------- | ---------------------------------------------- | -------- |
| `--zq-gradient-primary`     | `linear-gradient(135deg, #667eea, #764ba2)`    | 主色渐变 |
| `--zq-gradient-success`     | `linear-gradient(135deg, #11998e, #38ef7d)`    | 成功渐变 |

## 自定义覆盖

只需在你的全局 CSS 中重新声明变量即可覆盖默认值：

```css
:root {
  --el-color-primary: #ff6b35;
  --zq-shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

> **注意**：确保自定义变量的引入顺序在 `zq-ui/styles` **之后**，否则会被默认值覆盖。
