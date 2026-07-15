---
name: commands
description: pnpm 命令参考——dev / build / test / lint / typecheck / docs
metadata:
  type: reference
---

所有操作使用 **pnpm**（非 npm / yarn）。

```bash
pnpm dev            # 启动 Playground 开发服务器（localhost:4000）
pnpm build          # 类型检查 + 构建 Playground
pnpm docs:dev       # 启动 VitePress 文档开发服务器
pnpm docs:build     # 构建 VitePress 文档
pnpm lint           # ESLint 检查（自动修复）
pnpm format         # Prettier 格式化
pnpm test           # Vitest（watch 模式）
pnpm test:run       # Vitest（单次运行）
pnpm typecheck      # vue-tsc --noEmit 类型检查
```

**Why:** pnpm 是项目统一包管理器，比 npm 更快、节省磁盘、workspace 支持更好。所有 `npm install` / `npm run` 类命令必须替换为 `pnpm`。

**How to apply:** 任何安装依赖、运行脚本的操作都用 `pnpm`。`pnpm add <pkg>` 添加依赖，不要使用 npm 或 yarn。
