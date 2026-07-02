# Button 按钮

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

### 浅色按钮

<ClientOnly>
  <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:16px 0;">
    <zq-button variant="soft">默认</zq-button>
    <zq-button variant="soft" type="primary">Primary</zq-button>
    <zq-button variant="soft" type="success">Success</zq-button>
    <zq-button variant="soft" type="warning">Warning</zq-button>
    <zq-button variant="soft" type="danger">Danger</zq-button>
    <zq-button variant="soft" type="info">Info</zq-button>
    <zq-button variant="soft" disabled>Disabled</zq-button>
  </div>
</ClientOnly>

<details>
<summary>查看代码</summary>

```vue
<zq-button variant="soft">默认</zq-button>
<zq-button variant="soft" type="primary">Primary</zq-button>
<zq-button variant="soft" type="success">Success</zq-button>
<zq-button variant="soft" type="warning">Warning</zq-button>
<zq-button variant="soft" type="danger">Danger</zq-button>
<zq-button variant="soft" type="info">Info</zq-button>
<zq-button variant="soft" disabled>Disabled</zq-button>
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
      <td>variant</td>
      <td>按钮样式变体</td>
      <td>
        <code>string</code>
        <ClientOnly>
          <el-popover placement="top" :width="180" trigger="hover">
            <template #reference>
              <span class="type-info">?</span>
            </template>
            <code style="font-size:13px">'gradient' | 'soft'</code>
          </el-popover>
        </ClientOnly>
      </td>
      <td>—</td>
    </tr>
  </tbody>
</table>

### Button Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮文本内容 |
| loading | 自定义加载图标 |
| icon | 自定义图标 |

### Button Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| ref | 按钮 HTML 元素 | `Ref<HTMLButtonElement>` |
| size | 按钮尺寸 | `Ref<string>` |
| type | 按钮类型 | `Ref<string>` |
| disabled | 按钮禁用状态 | `Ref<boolean>` |
