# Button 按钮

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Edit } from '@element-plus/icons-vue'

function handleDebounceDemoClick() {
  ElMessage.success('防抖点击触发')
}

function handleThrottleDemoClick() {
  ElMessage.success('节流点击触发')
}
</script>

## 基础用法

### 渐变按钮

<ClientOnly>
  <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:16px 0;">
    <zq-button variant="gradient">默认</zq-button>
    <zq-button variant="gradient" type="primary">Primary</zq-button>
    <zq-button variant="gradient" type="success">Success</zq-button>
    <zq-button variant="gradient" type="warning">Warning</zq-button>
    <zq-button variant="gradient" type="danger">Danger</zq-button>
    <zq-button variant="gradient" type="info">Info</zq-button>
    <zq-button variant="gradient" disabled>Disabled</zq-button>
  </div>
</ClientOnly>

<details>
<summary>查看代码</summary>

```vue
<zq-button variant="gradient">默认</zq-button>
<zq-button variant="gradient" type="primary">Primary</zq-button>
<zq-button variant="gradient" type="success">Success</zq-button>
<zq-button variant="gradient" type="warning">Warning</zq-button>
<zq-button variant="gradient" type="danger">Danger</zq-button>
<zq-button variant="gradient" type="info">Info</zq-button>
<zq-button variant="gradient" disabled>Disabled</zq-button>
```

</details>

### 命名变体

<ClientOnly>
  <div style="display:flex;flex-direction:column;gap:16px;padding:16px;background:var(--el-color-primary-light-9);border-radius:8px;">
    <div>
      <p style="margin:0 0 8px;color:var(--vp-c-text-2);font-size:13px;">Default</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <zq-button type="primary">默认</zq-button>
        <zq-button type="primary" round>Round</zq-button>
        <zq-button type="primary" dashed>Dashed</zq-button>
        <zq-button type="primary" disabled>Disabled</zq-button>
        <zq-button type="primary" link>Link</zq-button>
      </div>
    </div>
    <div>
      <p style="margin:0 0 8px;color:var(--vp-c-text-2);font-size:13px;">soft</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <zq-button variant="soft">默认</zq-button>
        <zq-button variant="soft" round>Round</zq-button>
        <zq-button variant="soft" dashed>Dashed</zq-button>
        <zq-button variant="soft" disabled>Disabled</zq-button>
      </div>
    </div>
    <div>
      <p style="margin:0 0 8px;color:var(--vp-c-text-2);font-size:13px;">crisp</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <zq-button variant="crisp">默认</zq-button>
        <zq-button variant="crisp" round>Round</zq-button>
        <zq-button variant="crisp" dashed>Dashed</zq-button>
        <zq-button variant="crisp" disabled>Disabled</zq-button>
      </div>
    </div>
    <div>
      <p style="margin:0 0 8px;color:var(--vp-c-text-2);font-size:13px;">ring</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <zq-button variant="ring">默认</zq-button>
        <zq-button variant="ring" round>Round</zq-button>
        <zq-button variant="ring" dashed>Dashed</zq-button>
        <zq-button variant="ring" disabled>Disabled</zq-button>
      </div>
    </div>
    <div>
      <p style="margin:0 0 8px;color:var(--vp-c-text-2);font-size:13px;">ghost</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <zq-button variant="ghost">默认</zq-button>
        <zq-button variant="ghost" round>Round</zq-button>
        <zq-button variant="ghost" dashed>Dashed</zq-button>
        <zq-button variant="ghost" disabled>Disabled</zq-button>
      </div>
    </div>
    <div>
      <p style="margin:0 0 8px;color:var(--vp-c-text-2);font-size:13px;">reveal</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <zq-button variant="reveal">默认</zq-button>
        <zq-button variant="reveal" round>Round</zq-button>
        <zq-button variant="reveal" dashed>Dashed</zq-button>
        <zq-button variant="reveal" disabled>Disabled</zq-button>
      </div>
    </div>
  </div>
</ClientOnly>

<details>
<summary>查看代码</summary>

```vue
<zq-button variant="soft">默认</zq-button>
<zq-button variant="soft" round>Round</zq-button>
<zq-button variant="soft" dashed>Dashed</zq-button>
<zq-button variant="soft" disabled>Disabled</zq-button>

<zq-button variant="crisp">默认</zq-button>
<zq-button variant="crisp" round>Round</zq-button>
<zq-button variant="crisp" link>Link</zq-button>
<zq-button variant="crisp" dashed>Dashed</zq-button>
<zq-button variant="crisp" disabled>Disabled</zq-button>

<zq-button variant="ring">默认</zq-button>
<zq-button variant="ring" round>Round</zq-button>
<zq-button variant="ring" dashed>Dashed</zq-button>
<zq-button variant="ring" disabled>Disabled</zq-button>

<zq-button variant="ghost">默认</zq-button>
<zq-button variant="ghost" round>Round</zq-button>
<zq-button variant="ghost" dashed>Dashed</zq-button>
<zq-button variant="ghost" disabled>Disabled</zq-button>

<zq-button variant="reveal">默认</zq-button>
<zq-button variant="reveal" round>Round</zq-button>
<zq-button variant="reveal" dashed>Dashed</zq-button>
<zq-button variant="reveal" disabled>Disabled</zq-button>
```

</details>

### 尺寸

`size` 属性在 EP 原生值（`large` / `default` / `small`）之外扩展了两类自定义尺寸：

- **block-\*** — 固定宽度，适合表单提交、对话框底部按钮
- **inline-\*** — 自适应宽度，适合工具栏、表格操作列

<ClientOnly>
  <div style="display:flex;flex-direction:column;gap:16px;padding:16px 0;">
    <div>
      <p style="margin:0 0 8px;color:var(--vp-c-text-2);font-size:13px;">block-hefty（240×56 / 20px）</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <zq-button variant="gradient" size="block-hefty" :icon="Edit">确认支付</zq-button>
        <zq-button variant="crisp" size="block-hefty">取消</zq-button>
      </div>
    </div>
    <div>
      <p style="margin:0 0 8px;color:var(--vp-c-text-2);font-size:13px;">block-stout（240×56 / 18px）</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <zq-button variant="gradient" size="block-stout" :icon="Edit">确认支付</zq-button>
        <zq-button variant="crisp" size="block-stout">取消</zq-button>
      </div>
    </div>
    <div>
      <p style="margin:0 0 8px;color:var(--vp-c-text-2);font-size:13px;">block-lean（248×40 / 16px）</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <zq-button variant="gradient" size="block-lean" :icon="Edit">确认支付</zq-button>
        <zq-button variant="crisp" size="block-lean">取消</zq-button>
      </div>
    </div>
    <div>
      <p style="margin:0 0 8px;color:var(--vp-c-text-2);font-size:13px;">inline-roomy（H40 / 18px）</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <zq-button variant="soft" size="inline-roomy" :icon="Edit">编辑</zq-button>
        <zq-button variant="ghost" size="inline-roomy">查看</zq-button>
      </div>
    </div>
    <div>
      <p style="margin:0 0 8px;color:var(--vp-c-text-2);font-size:13px;">inline-comfy（H36 / 18px）</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <zq-button variant="soft" size="inline-comfy" :icon="Edit">编辑</zq-button>
        <zq-button variant="ghost" size="inline-comfy">查看</zq-button>
      </div>
    </div>
    <div>
      <p style="margin:0 0 8px;color:var(--vp-c-text-2);font-size:13px;">inline-trim（H32 / 16px）</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <zq-button variant="soft" size="inline-trim" :icon="Edit">编辑</zq-button>
        <zq-button variant="ghost" size="inline-trim">查看</zq-button>
      </div>
    </div>
  </div>
</ClientOnly>

<details>
<summary>查看代码</summary>

```vue
<zq-button variant="gradient" size="block-hefty">确认支付</zq-button>
<zq-button variant="crisp" size="block-stout">取消</zq-button>
<zq-button variant="gradient" size="block-lean">确认支付</zq-button>

<zq-button variant="soft" size="inline-roomy">编辑</zq-button>
<zq-button variant="ghost" size="inline-comfy">查看</zq-button>
<zq-button variant="reveal" size="inline-trim">删除</zq-button>
```

</details>

### 防抖与节流

<ClientOnly>
  <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:16px 0;">
    <zq-button type="primary" :debounce="600" @click="handleDebounceDemoClick">
      600ms 防抖
    </zq-button>
    <zq-button variant="crisp" :throttle="1000" @click="handleThrottleDemoClick">
      1000ms 节流
    </zq-button>
  </div>
</ClientOnly>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ElMessage } from 'element-plus'

function submit() {
  ElMessage.success('防抖点击触发')
}

function save() {
  ElMessage.success('节流点击触发')
}
</script>

<template>
  <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
    <zq-button type="primary" :debounce="600" @click="submit"> 600ms 防抖 </zq-button>
    <zq-button variant="crisp" :throttle="1000" @click="save"> 1000ms 节流 </zq-button>
  </div>
</template>
```

</details>

## Button API

### Button Attributes

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>size</td>
      <td>按钮尺寸，EP 原生 <code>large</code> / <code>default</code> / <code>small</code> + 自定义 <code>block-hefty</code> / <code>block-stout</code> / <code>block-lean</code> / <code>inline-roomy</code> / <code>inline-comfy</code> / <code>inline-trim</code></td>
      <td><code>string</code></td>
      <td>—</td>
    </tr>
    <tr>
      <td>variant</td>
      <td>按钮样式变体</td>
      <td>
        <code>string</code>
        <ClientOnly>
          <el-popover placement="top" :width="220" trigger="hover">
            <template #reference>
              <span class="type-info">?</span>
            </template>
            <code style="font-size:13px">'gradient' | 'soft' | 'crisp' | 'ring' | 'ghost' | 'reveal'</code>
          </el-popover>
        </ClientOnly>
      </td>
      <td>—</td>
    </tr>
    <tr>
      <td>debounce</td>
      <td>防抖延迟时间，单位 ms；最后一次点击后触发，不传或小于等于 0 时不启用</td>
      <td><code>number</code></td>
      <td>0</td>
    </tr>
    <tr>
      <td>throttle</td>
      <td>节流间隔时间，单位 ms；首次点击立即触发，间隔内忽略重复点击；与 debounce 同时传入时优先</td>
      <td><code>number</code></td>
      <td>0</td>
    </tr>
  </tbody>
</table>

### Button Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 按钮文本内容   |
| loading | 自定义加载图标 |
| icon    | 自定义图标     |

### Button Exposes

| 名称     | 说明           | 类型                     |
| -------- | -------------- | ------------------------ |
| ref      | 按钮 HTML 元素 | `Ref<HTMLButtonElement>` |
| size     | 按钮尺寸       | `Ref<string>`            |
| type     | 按钮类型       | `Ref<string>`            |
| disabled | 按钮禁用状态   | `Ref<boolean>`           |
