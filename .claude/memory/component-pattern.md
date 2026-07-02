---
name: component-pattern
description: 组件封装模式——基于 Element Plus 的 attrs/slots 透传 + 扩展 props + forwardedBindings
metadata:
  type: project
---

新增组件遵循 `zq-button.vue` 的统一范式。

### Template
单个 `<el-xxx>` 包裹，做两件事：
1. **Slot 转发** — `v-for` 遍历 `useSlots()`，动态 `#[name]` 转发所有插槽
2. **Attrs 转发** — `v-bind="forwardedBindings"` 计算属性：
   - 从 `props` 中拆出自定义属性（如 `variant`、`debounce`），其余 EP 属性原样透传
   - 从 `useAttrs()` 中拆出 `onClick`，按需包一层防抖逻辑后放回
   - 其他事件（`onDblclick`、`onMouseenter` 等）和 HTML 属性直接透传

### Props
- `interface ZqXxxProps extends Partial<XxxProps>`，只加自定义属性
- 例如 `zq-button`：`variant?: 'gradient' | 'soft'` 对应 CSS class `zq-btn--{variant}`
- EP 原生属性通过 `Partial<XxxProps>` 继承，不重复声明

### 注册
`packages/zq-ui/index.ts` 中：
1. import 组件
2. 加入 `components` 对象
3. 加一行 `export`

### 样式
- 全局 CSS 放 `packages/zq-ui/styles/`，通过 CSS 变量引用主题色，不写 scoped
- 样式文件在 `styles/index.ts` 中 import

**Why:** 这是团队组件库的统一封装范式，确保每个组件的行为一致、可预测。

**How to apply:** 新建组件时复制 `zq-button.vue` 的结构，替换组件名和自定义 props。
