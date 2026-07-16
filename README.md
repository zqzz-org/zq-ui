# ZQ UI Workspace

基于 Vue 3 的 **monorepo**：PC 组件库 [`@zqzz/zq-ui`](./packages/zq-ui)（Element Plus）与移动端组件库 [`@zqzz/zq-m`](./packages/zq-m)（Vant）平行维护。

| 包            | 标签      | 基础 UI      | 主题属性         |
| ------------- | --------- | ------------ | ---------------- |
| `@zqzz/zq-ui` | `<zq-*>`  | Element Plus | `data-zq-theme`  |
| `@zqzz/zq-m`  | `<zqm-*>` | Vant 4       | `data-zqm-theme` |

业务可只装一端，也可同项目双装；路由/页面如何拆分由业务侧决定。

## 文档（给使用者）

- **在线文档**：[https://crazily6617.github.io/zq-ui](https://crazily6617.github.io/zq-ui)
- 本地开发：`pnpm docs:dev`
- 构建静态站：`pnpm docs:build` → 产物目录 **`docs/.vitepress/dist`**
- 本地预览产物：`pnpm docs:preview`

文档站与 npm 包**解耦**。默认通过 **GitHub Pages** 发布（`base: '/zq-ui/'`）。  
详见 [文档部署](./docs/guide/deploy.md)。

## Playground（仅维护者）

```bash
pnpm dev          # http://localhost:4000
# /pc/*  PC 组件调试
# /m/*   移动端手机框调试
```

Playground **不会**打进 `@zqzz/zq-ui` / `@zqzz/zq-m` 的 npm 包，也不作为对外文档站点。

## 常用命令

```bash
pnpm install
pnpm typecheck
pnpm test:run
pnpm build          # playground 构建（可选）
pnpm docs:build     # 文档静态站
pnpm lint
pnpm format
```

## 安装组件库（业务项目）

```bash
# PC
pnpm add @zqzz/zq-ui element-plus@~2.13.7

# 移动
pnpm add @zqzz/zq-m vant
```

引入方式见文档 [快速开始](./docs/guide/getting-started.md)。

## 仓库结构

```text
packages/zq-ui/     # PC 组件库（源码分发）
packages/zq-m/      # 移动组件库（源码分发）
src/                # Playground
docs/               # VitePress 文档
```

## 本地质量检查

使用 Husky：`pre-commit`（lint-staged）、`pre-push`（typecheck + test）。
手动：`pnpm quality:check`。详见 [贡献指南](./docs/guide/contribution.md)。

## License

MIT
