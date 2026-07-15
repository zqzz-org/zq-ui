# ZQ UI Workspace

基于 Vue 3 的 **monorepo**：PC 组件库 [`zq-ui`](./packages/zq-ui)（Element Plus）与移动端组件库 [`zq-m`](./packages/zq-m)（Vant）平行维护。

| 包      | 标签      | 基础 UI      | 主题属性         |
| ------- | --------- | ------------ | ---------------- |
| `zq-ui` | `<zq-*>`  | Element Plus | `data-zq-theme`  |
| `zq-m`  | `<zqm-*>` | Vant 4       | `data-zqm-theme` |

业务可只装一端，也可同项目双装；路由/页面如何拆分由业务侧决定。

## 文档（给使用者）

- **在线地址（占位，部署后替换）**：[https://ui.example.com](https://ui.example.com)
- 本地开发：`pnpm docs:dev`
- 构建静态站：`pnpm docs:build` → 产物目录 **`docs/.vitepress/dist`**
- 本地预览产物：`pnpm docs:preview`

文档站与 npm 包**解耦**，可单独部署到 Nginx / OSS / Pages。  
若挂在子路径，修改 `docs/.vitepress/config.ts` 的 `base`（如 `'/zq-ui/'`）后重新构建。详见文档站内 [文档部署](./docs/guide/deploy.md)。

## Playground（仅维护者）

```bash
pnpm dev          # http://localhost:4000
# /pc/*  PC 组件调试
# /m/*   移动端手机框调试
```

Playground **不会**打进 `zq-ui` / `zq-m` 的 npm 包，也不作为对外文档站点。

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
pnpm add zq-ui element-plus@~2.13.7

# 移动
pnpm add zq-m vant
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
