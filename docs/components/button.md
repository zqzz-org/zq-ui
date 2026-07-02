# Button 按钮

基于 Element Plus Button 二次封装，扩展了 `variant` 样式变体。未列出的属性、插槽、事件均继承自 [Element Plus Button](https://element-plus.org/zh-CN/component/button.html)。

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

<details>
<summary>查看代码</summary>

```vue
<zq-button variant="gradient">默认渐变</zq-button>
<zq-button variant="gradient" size="large">大号渐变</zq-button>
<zq-button variant="gradient" round>圆角渐变</zq-button>
<zq-button variant="gradient" loading>加载中</zq-button>
<zq-button variant="gradient" disabled>禁用渐变</zq-button>
```

</details>

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

<details>
<summary>查看代码</summary>

```vue
<zq-button variant="soft">默认浅色</zq-button>
<zq-button type="primary" variant="soft">Primary 浅色</zq-button>
<zq-button type="success" variant="soft">Success 浅色</zq-button>
<zq-button type="danger" variant="soft">Danger 浅色</zq-button>
<zq-button variant="soft" disabled>禁用浅色</zq-button>
```

</details>

## Button API

### Button Attributes

以下为 `zq-button` 新增属性，其余属性（`size`、`type`、`disabled`、`loading`、`round`、`circle`、`plain`、`text`、`bg`、`icon`、`autofocus`、`native-type` 等）完全继承自 [Element Plus Button](https://element-plus.org/zh-CN/component/button.html#button-attributes)。

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
