# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## 命令

```bash
pnpm dev            # 启动 Playground 开发服务器（localhost:3000）
pnpm build          # 类型检查 + 构建 Playground
pnpm docs:dev       # 启动 VitePress 文档开发服务器
pnpm docs:build     # 构建 VitePress 文档
pnpm lint           # ESLint 检查（自动修复）
pnpm format         # Prettier 格式化
pnpm test           # Vitest
pnpm test:run       # Vitest（单次运行）
pnpm typecheck      # vue-tsc --noEmit 类型检查
```

## 验证流程

每次修改代码后**必须**执行完整验证链，全部通过才能宣称"完成"：

```bash
pnpm typecheck && pnpm test:run && pnpm build && pnpm docs:build
```

## 架构

ZQ-UI 是基于 Element Plus（`^2.13.7`）二次封装的 Vue 3 组件库，在完全透传 EP 所有属性、事件、插槽的基础上扩展团队定制主题和交互能力。

三层结构：

```text
packages/zq-ui/          ← 组件库（源码分发，无构建步骤）
src/                     ← Vite Playground，开发时调试组件
docs/                    ← VitePress 文档站
```

### 组件库（`packages/zq-ui/`）

- **无构建步骤** — 直接分发 `.ts`/`.vue`/`.css` 源文件，由消费方的打包工具处理
- `element-plus` 和 `vue` 为 **peerDependencies**
- `index.ts` 导出各个组件 + `install()` 方法支持 `app.use()`
- 新增组件：在 `components/` 下加 `.vue` 文件，在 `index.ts` 的 `components` 对象里注册一行 + `export` 一行

### 组件封装模式（以 `zq-button.vue` 为例）

模板只包裹一个 `<el-button>`，做两件事：

1. **Slot 转发** — `v-for` 遍历 `useSlots()`，动态 `#[name]` 转发所有插槽
2. **Attrs 转发** — `forwardedBindings` 计算属性：
   - 从 `props` 中拆出自定义属性（`variant`、`debounce`、`throttle`），其余 EP 属性原样透传
   - 从 `useAttrs()` 中拆出 `onClick`，按需包一层防抖 / 节流逻辑后放回
   - 其他事件（`onDblclick`、`onMouseenter` 等）和 HTML 属性直接透传

自定义 props（通过 `interface ZqButtonProps extends Partial<ButtonProps>`）：

- `variant?: 'gradient' | 'crisp' | 'soft' | 'ring'` — 对应 CSS class `zq-btn--{variant}`

### Variant 命名规范

采取**预设式命名**：每个 variant 值是一个短、唯一、好记的预设名，只描述视觉模式、不描述颜色（颜色归 theme/type）。

- `gradient` — 渐变背景，白色文字，无边框
- `crisp` — 白底主色描边，跟随主题主色
- `soft` — 浅主色填充，悬浮 / 点击显示主色边框
- `ring` — 继承 EP 默认实色填充，叠加白色描边

新增风格时挑一个辨识度高的词作为新 variant，颜色交给 EP 的 `type`，不要把颜色写进 variant 名（避免 `danger-outlined` 这类组合爆炸）。同视觉家族需要多个细分时用 `家族-特征`（如未来 `outlined-dashed`），而非 `style1/style2` 编号。

### 主题体系

**文件结构：**

```text
styles/
├── tokens/base.css              ← :root 基础 token（字号、阴影、间距、过渡、中性色、语义别名）
├── themes/
│   ├── index.ts                 ← CSS 导入聚合
│   ├── aiedu.css                ← 通识平台 #50b5a6
│   ├── xk.css                   ← 信息科技 #007F92
│   ├── qedu.css                 ← 素养 #229065
│   └── aistudy.css              ← 学习平台 #022B9A
├── components/button/
│   ├── index.css                ← 聚合入口
│   ├── base.css                 ← 共享禁用态
│   └── variants/
│       ├── gradient.css          ← zq-btn--gradient
│       ├── crisp.css             ← zq-btn--crisp
│       ├── soft.css              ← zq-btn--soft
│       └── ring.css              ← zq-btn--ring
└── index.ts                     ← 样式入口（按 tokens → components 顺序引入）
```

**设计原则：**

- 每个主题文件自包含：色值（`--el-color-primary-*`）+ EP 组件变量映射（`--el-menu-*` 等）+ gradient + `--zq-*` 别名，全部在同一个选择器块内
- CSS 变量延迟解析：EP 组件变量写成 `var(--el-color-primary)`，主题切换时自动拿到新值
- 选择器覆盖两种场景：`[data-zq-theme='xxx']`（全页属性）+ `.zq-theme-xxx`（局部 class 作用域）
- 消费方必须把 `element-plus/dist/index.css` 放在 `zq-ui/styles` **之前**引入

**TS 层（`theme.ts`）：**

- `ZqThemeName` 联合类型：`'default' | 'aiedu' | 'xk' | 'qedu' | 'aistudy'`
- `zqThemeOptions` — 内置主题展示配置（label + name）
- `defaultZqThemeHostRules` — 默认域名匹配规则
- `applyZqTheme(theme, target)` — 将主题写入元素的 `data-zq-theme` 属性
- `applyZqThemeByHost(options)` — 按域名解析 + 写入
- `resolveZqThemeByHost(options)` — 纯逻辑：根据 hostname 匹配规则返回主题名

**新增主题步骤：**

1. 复制 `styles/themes/aiedu.css` → 新文件，改色值
2. 在 `styles/themes/index.ts` 加一行 `import`
3. 在 `theme.ts` 的 `ZqThemeName`、`zqThemeOptions`、`defaultZqThemeHostRules` 各加一条
4. 更新 `__tests__/theme.test.ts` 的期望数组

### Playground（`src/App.vue`）

左右布局：左侧组件列表 + 右侧 `<component :is="activeDemo" />` 动态渲染。

组件注册在 `src/config/playground.ts` 的 `components` 数组中，每个条目包含 `key` / `name` / `icon` / `tag` / `component`。新增 demo 只需：

1. 在 `src/demos/` 下创建 `{Name}Demo.vue`
2. 在 `playground.ts` 追加一条，无需修改 App.vue

### VitePress 文档

自定义主题入口 `docs/.vitepress/theme/index.ts` 继承 DefaultTheme，通过 `enhanceApp` 注册 Element Plus 和 ZQ-UI，使 markdown 里可以直接写 `<zq-button>`（配合 `<ClientOnly>` 包裹）。宽屏全适配：`--vp-layout-max-width: 100%`，所有内容区 `max-width: none`。

### 关键约束

- 包管理：**pnpm**（非 npm / yarn）
- Vue：`^3.5.0`
- Element Plus：`^2.13.7`
- `variant` 包含 `gradient`、`crisp`、`soft`、`ring`，EP 原生的 `dashed` 不做二次封装
- Variant 颜色跟随 `type` 变化：variant 控制渲染方式（渐变 / 描边 / 浅色 / 白环），type 控制颜色系别（primary/success/warning/danger/info）
- 每次修改代码后**必须**做 TS 类型校验（`vue-tsc --noEmit`）+ 跑测试（`vitest run`）
- 禁止使用 `any`，尽量不写类型断言（`as`），优先靠泛型和类型推导
- **新增 variant 或功能后必须同步更新**：`docs/components/button.md`（文档示例 + API 表格）、Playground demo（`src/demos/`）、主题矩阵（`ThemeButtonDemo.vue`）、测试用例
