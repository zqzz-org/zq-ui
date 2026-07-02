---
name: playground
description: Playground 开发工具结构——App.vue Shell + config 注册表 + demos/ 动态加载
metadata:
  type: project
---

Playground 是组件开发调试工具，三层结构：

```
src/
├── App.vue                  # Shell：顶栏 + 侧边栏 + <component :is="activeDemo">
├── config/
│   └── playground.ts        # 组件注册表（唯一入口）
└── demos/
    ├── ButtonDemo.vue       # 按钮测试页（自包含：子标签 + 数据 + 模板）
    └── ProxyDemo.vue        # 自动代理验证
```

### 设计原则
- **App.vue 只做布局壳**，不写任何组件测试逻辑
- **每个 Demo 文件自包含**：自己的子标签切换、测试数据、模板
- **新增组件只改 playground.ts**：加一行 `ComponentEntry` + 新建一个 `demos/XxxDemo.vue`
- **共享样式在 App.vue 全局 `<style>`** 中（`.pg-*`、`.demo-block`、`.matrix-table` 等），各 Demo 直接用 class 不重复写

### App.vue 核心逻辑
```ts
import { computed } from 'vue'
import { components } from './config/playground'

const activeKey = ref('button')
const activeDemo = computed(() => components.find(c => c.key === activeKey.value)?.component)
```

模板用 `<component :is="activeDemo" />` 动态渲染当前选中的 Demo 组件。

### 注册表格式（playground.ts）
```ts
export interface ComponentEntry {
  key: string       // 侧边栏选中标识
  name: string      // 显示名称
  icon: string      // 侧边栏缩写图标（单字母）
  tag: string       // 状态标签
  component: Component  // Demo 组件
}
```

**Why:** 避免 App.vue 随组件数量线性膨胀成巨型文件。每个 Demo 独立维护，互不干扰。

**How to apply:** 新增组件测试时，新建 `demos/XxxDemo.vue`，在 `playground.ts` 加一行注册，不修改 App.vue。
