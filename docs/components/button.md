<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

# Button 按钮

基于 Element Plus Button 二次封装，扩展了 `variant` 样式变体和 `debounce` 防抖能力。未列出的属性、插槽、事件均继承自 [Element Plus Button](https://element-plus.org/zh-CN/component/button.html)。

## 基础用法

### 渐变按钮

<ClientOnly>
  <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:16px 0;">
    <zq-button variant="gradient">默认渐变</zq-button>
    <zq-button variant="gradient" size="large">大号渐变</zq-button>
    <zq-button variant="gradient" round>圆角渐变</zq-button>
    <zq-button variant="gradient" loading>加载中</zq-button>
    <zq-button variant="gradient" disabled>禁用渐变</zq-button>
  </div>
</ClientOnly>

```vue
<zq-button variant="gradient">默认渐变</zq-button>
<zq-button variant="gradient" size="large">大号渐变</zq-button>
<zq-button variant="gradient" round>圆角渐变</zq-button>
<zq-button variant="gradient" loading>加载中</zq-button>
<zq-button variant="gradient" disabled>禁用渐变</zq-button>
```

### 浅色按钮

<ClientOnly>
  <div style="display:flex;flex-wrap:wrap;gap:10px;padding:16px 0;">
    <zq-button variant="soft">默认浅色</zq-button>
    <zq-button type="primary" variant="soft">Primary 浅色</zq-button>
    <zq-button type="success" variant="soft">Success 浅色</zq-button>
    <zq-button type="danger" variant="soft">Danger 浅色</zq-button>
    <zq-button variant="soft" disabled>禁用浅色</zq-button>
  </div>
</ClientOnly>

```vue
<zq-button variant="soft">默认浅色</zq-button>
<zq-button type="primary" variant="soft">Primary 浅色</zq-button>
<zq-button type="success" variant="soft">Success 浅色</zq-button>
<zq-button type="danger" variant="soft">Danger 浅色</zq-button>
<zq-button variant="soft" disabled>禁用浅色</zq-button>
```

### 防抖按钮

<ClientOnly>
  <div style="padding:16px 0;">
    <p style="margin:0 0 10px;font-size:14px;">
      点击次数：<strong>{{ count }}</strong>
    </p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <zq-button type="primary" :debounce="800" @click="count++">
        防抖按钮（800ms）
      </zq-button>
      <zq-button size="small" @click="count = 0">重置</zq-button>
    </div>
    <p style="margin:8px 0 0;color:#999;font-size:12px;">
      快速连击 → 每 800ms 最多触发一次
    </p>
  </div>
</ClientOnly>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <p>点击次数：{{ count }}</p>
  <zq-button type="primary" :debounce="800" @click="count++">
    防抖按钮（800ms）
  </zq-button>
</template>
```

## Button API

### Button Attributes

以下为 `zq-button` 新增属性，其余属性（`size`、`type`、`disabled`、`loading`、`round`、`circle`、`plain`、`text`、`bg`、`icon`、`autofocus`、`native-type` 等）完全继承自 [Element Plus Button](https://element-plus.org/zh-CN/component/button.html#button-attributes)。

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| variant | 按钮样式变体 | `string` | `gradient` / `soft` | — |
| debounce | 防抖延迟时间（毫秒），0 表示不启用 | `number` | — | `0` |

### Button Slots

完全继承 [Element Plus Button Slots](https://element-plus.org/zh-CN/component/button.html#button-%E6%8F%92%E6%A7%BD)。

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮文本内容 |
| loading | 自定义加载图标 |
| icon | 自定义图标 |

### Button Exposes

完全继承 [Element Plus Button Exposes](https://element-plus.org/zh-CN/component/button.html#button-%E6%9A%B4%E9%9C%B2)。

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| ref | 按钮 HTML 元素 | `Ref<HTMLButtonElement>` |
| size | 按钮尺寸 | `Ref<string>` |
| type | 按钮类型 | `Ref<string>` |
| disabled | 按钮禁用状态 | `Ref<boolean>` |
