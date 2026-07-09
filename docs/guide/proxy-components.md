# 代理组件列表

ZQ-UI 对不需要自定义逻辑的 Element Plus 组件自动生成透明代理——无需编写封装文件，注册后直接用 `zq-xxx` 标签即可，所有属性、事件、插槽完整透传到对应的 `el-xxx` 组件。

## 使用方式

代理组件与 Element Plus 原生用法完全一致，仅把标签前缀从 `el-` 换成 `zq-`：

```vue
<zq-scrollbar height="200px">
  <p>内容...</p>
</zq-scrollbar>

<zq-tag type="success" closable>标签</zq-tag>

<zq-divider content-position="left">分割线</zq-divider>
```

## 已支持的代理组件

<table>
  <thead>
    <tr><th>zq 标签</th><th>代理到</th><th>zq 标签</th><th>代理到</th></tr>
  </thead>
  <tbody>
    <tr><td><code>&lt;zq-scrollbar&gt;</code></td><td>el-scrollbar</td><td><code>&lt;zq-input&gt;</code></td><td>el-input</td></tr>
    <tr><td><code>&lt;zq-select&gt;</code></td><td>el-select</td><td><code>&lt;zq-table&gt;</code></td><td>el-table</td></tr>
    <tr><td><code>&lt;zq-dialog&gt;</code></td><td>el-dialog</td><td><code>&lt;zq-drawer&gt;</code></td><td>el-drawer</td></tr>
    <tr><td><code>&lt;zq-form&gt;</code></td><td>el-form</td><td><code>&lt;zq-form-item&gt;</code></td><td>el-form-item</td></tr>
    <tr><td><code>&lt;zq-tag&gt;</code></td><td>el-tag</td><td><code>&lt;zq-tooltip&gt;</code></td><td>el-tooltip</td></tr>
    <tr><td><code>&lt;zq-popover&gt;</code></td><td>el-popover</td><td><code>&lt;zq-dropdown&gt;</code></td><td>el-dropdown</td></tr>
    <tr><td><code>&lt;zq-menu&gt;</code></td><td>el-menu</td><td><code>&lt;zq-tabs&gt;</code></td><td>el-tabs</td></tr>
    <tr><td><code>&lt;zq-card&gt;</code></td><td>el-card</td><td><code>&lt;zq-collapse&gt;</code></td><td>el-collapse</td></tr>
    <tr><td><code>&lt;zq-pagination&gt;</code></td><td>el-pagination</td><td><code>&lt;zq-badge&gt;</code></td><td>el-badge</td></tr>
    <tr><td><code>&lt;zq-avatar&gt;</code></td><td>el-avatar</td><td><code>&lt;zq-skeleton&gt;</code></td><td>el-skeleton</td></tr>
    <tr><td><code>&lt;zq-empty&gt;</code></td><td>el-empty</td><td><code>&lt;zq-result&gt;</code></td><td>el-result</td></tr>
    <tr><td><code>&lt;zq-descriptions&gt;</code></td><td>el-descriptions</td><td><code>&lt;zq-timeline&gt;</code></td><td>el-timeline</td></tr>
    <tr><td><code>&lt;zq-divider&gt;</code></td><td>el-divider</td><td><code>&lt;zq-link&gt;</code></td><td>el-link</td></tr>
    <tr><td><code>&lt;zq-text&gt;</code></td><td>el-text</td><td><code>&lt;zq-image&gt;</code></td><td>el-image</td></tr>
    <tr><td><code>&lt;zq-icon&gt;</code></td><td>el-icon</td><td><code>&lt;zq-alert&gt;</code></td><td>el-alert</td></tr>
    <tr><td><code>&lt;zq-progress&gt;</code></td><td>el-progress</td><td><code>&lt;zq-tree&gt;</code></td><td>el-tree</td></tr>
    <tr><td><code>&lt;zq-date-picker&gt;</code></td><td>el-date-picker</td><td><code>&lt;zq-time-picker&gt;</code></td><td>el-time-picker</td></tr>
    <tr><td><code>&lt;zq-cascader&gt;</code></td><td>el-cascader</td><td><code>&lt;zq-transfer&gt;</code></td><td>el-transfer</td></tr>
    <tr><td><code>&lt;zq-checkbox&gt;</code></td><td>el-checkbox</td><td><code>&lt;zq-radio&gt;</code></td><td>el-radio</td></tr>
    <tr><td><code>&lt;zq-switch&gt;</code></td><td>el-switch</td><td><code>&lt;zq-slider&gt;</code></td><td>el-slider</td></tr>
    <tr><td><code>&lt;zq-rate&gt;</code></td><td>el-rate</td><td><code>&lt;zq-color-picker&gt;</code></td><td>el-color-picker</td></tr>
    <tr><td><code>&lt;zq-upload&gt;</code></td><td>el-upload</td><td><code>&lt;zq-popconfirm&gt;</code></td><td>el-popconfirm</td></tr>
    <tr><td><code>&lt;zq-backtop&gt;</code></td><td>el-backtop</td><td><code>&lt;zq-affix&gt;</code></td><td>el-affix</td></tr>
    <tr><td><code>&lt;zq-space&gt;</code></td><td>el-space</td><td><code>&lt;zq-config-provider&gt;</code></td><td>el-config-provider</td></tr>
  </tbody>
</table>

::: tip 补充说明
代理组件列表会随 Element Plus 的版本更新同步扩展。如果需要某个组件但尚未代理，可以在项目的 `app.config.globalProperties` 中临时注册，或提 issue 到仓库。
:::
