---
outline: false
---

# Table 表格

::: tip 规划中
Table 通过自动代理机制透传 `el-table`，暂无自定义扩展。如需查看完整 API，请参考 [Element Plus Table 文档](https://element-plus.org/zh-CN/component/table.html)。
:::

## 基础用法

```vue
<zq-table :data="tableData" stripe>
  <zq-table-column prop="name" label="名称" />
  <zq-table-column prop="value" label="数值" />
</zq-table>
```
