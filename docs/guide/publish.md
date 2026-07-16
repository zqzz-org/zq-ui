# 发布到 npm

本 monorepo **只发布**两个包：

| 目录             | npm 包名      | 说明               |
| ---------------- | ------------- | ------------------ |
| `packages/zq-ui` | `@zqzz/zq-ui` | PC（Element Plus） |
| `packages/zq-m`  | `@zqzz/zq-m`  | 移动（Vant）       |

根目录 `zq-ui-workspace` 为 `private: true`，**不要**对根目录执行 `npm publish`。

公网已存在无 scope 的 `zq-ui@1.0.0`（他人包），故使用 **`@zqzz` scope**。

## 包内容（files 白名单）

仅包含：

- `index.ts`
- `components/`（不含测试时：测试在 `__tests__` 与 `components/**/__tests__`，不在 `files` 内）
- `styles/`
- `theme/`

Playground（`src/`）、文档（`docs/`）、测试文件**不会**进 tarball。

## 发布前检查

```bash
pnpm quality:check
pnpm build
pnpm docs:build
pnpm pack:dry-run
```

确认 dry-run 列表中**没有** `__tests__`。

## 账号与组织（需人工）

1. [npmjs.com](https://www.npmjs.com) 登录并开启 2FA
2. 创建 npm 组织 **`zqzz`**（若尚未创建），并把发布账号加成成员
3. 本机：

```bash
npm login
npm whoami
```

4. 确认 scope 包可公开发布（`publishConfig.access: public` 已写在 package.json）

## 发布命令

```bash
# 分别发布
pnpm publish:zq-ui
pnpm publish:zq-m

# 或一次两个
pnpm publish:packages
```

等价于在各包目录：

```bash
pnpm --filter @zqzz/zq-ui publish --access public
pnpm --filter @zqzz/zq-m publish --access public
```

每次发布前在对应 `package.json` 中**提升 version**（npm 禁止覆盖已发布版本）。

## 业务安装

```bash
pnpm add @zqzz/zq-ui element-plus@~2.13.7
pnpm add @zqzz/zq-m vant
```

## 与 CI / 文档

- CI 的 `pack:dry-run` 只做内容预检，**不会**自动 publish
- 文档站仍由 GitHub Pages 部署，与 npm 无关
