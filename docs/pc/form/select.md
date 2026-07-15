---
outline: false
---

# Select 选择器

::: tip 规划中
Select 通过自动代理机制透传 `el-select`，暂无自定义扩展。如需查看完整 API，请参考 [Element Plus Select 文档](https://element-plus.org/zh-CN/component/select.html)。
:::

## 基础用法

```vue
<zq-select v-model="value" placeholder="请选择">
  <zq-option label="选项一" value="1" />
  <zq-option label="选项二" value="2" />
</zq-select>
```
