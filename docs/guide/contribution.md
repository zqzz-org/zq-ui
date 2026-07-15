# 贡献指南

本文档面向希望参与本 monorepo（`zq-ui` + `zq-m`）开发的贡献者，涵盖提交流程、质量门禁和开发环境配置。

质量门禁只有两层：**本地 Husky** + **GitHub Actions CI**。已不再使用 Jenkins。

## 质量门禁总览

| 层级              | 触发时机         | 内容                                                           | 能否绕过                          |
| ----------------- | ---------------- | -------------------------------------------------------------- | --------------------------------- |
| 本地 `pre-commit` | `git commit`     | `pnpm lint-staged`（ESLint + Prettier，仅暂存文件）            | `--no-verify`                     |
| 本地 `pre-push`   | `git push`       | `pnpm typecheck` + `pnpm test:run`                             | `--no-verify`                     |
| 远程 CI           | PR / push `main` | format + lint + typecheck + test + build + docs + pack dry-run | 分支保护开启后**不能**合入红灯 PR |

本地 hook 负责快速反馈；**合入 `main` 以 GitHub CI 为准**。

## 本地提交前检查（Husky）

项目使用 Husky + lint-staged：

- `pre-commit`：`pnpm lint-staged`
- `pre-push`：`pnpm typecheck` && `pnpm test:run`

克隆后执行一次 `pnpm install`（会跑 `prepare` → husky）。

## 本地完整验证

常规改动：

```bash
pnpm typecheck
pnpm test:run
```

涉及 Playground / 样式 / 文档时：

```bash
pnpm build
pnpm docs:build
```

一键对齐 CI 的核心检查：

```bash
pnpm quality:check
# 等价于 format:check + lint:check + typecheck + test:run
```

发布前建议再跑：

```bash
pnpm build
pnpm docs:build
pnpm pack:dry-run
```

## GitHub Actions CI

配置文件：`.github/workflows/ci.yml`  
Job 名称：**`quality`**（分支保护里要勾选这个检查）。

触发：

- 所有 **Pull Request**
- 推送到 **`main`**

步骤（顺序）：

1. `pnpm install --frozen-lockfile`
2. `pnpm format:check`
3. `pnpm lint:check`
4. `pnpm typecheck`
5. `pnpm test:run`
6. `pnpm build`（Playground）
7. `pnpm docs:build`
8. `pnpm pack:dry-run`（`zq-ui` 发包预检）

CI 中设置 `HUSKY=0`，不在流水线里跑 git hook。

## GitHub 仓库必配（网页操作）

把代码推到 **一个** monorepo 仓库后，在 GitHub 上完成：

### 1. 分支保护 / Ruleset（`main`）

路径示例：`Settings` → `Rules` → `Rulesets`（或 Branch protection）

对 `main` 建议：

1. **Require a pull request before merging**（禁止直接 push main，推荐）
2. **Require status checks to pass**
   - 勾选 **`quality`**（来自 workflow job 名）
   - 可选：Require branches to be up to date
3. **Block force pushes**
4. **Restrict deletions**
5. 尽量 **Do not allow bypassing**（管理员也不随便绕过）

配置完成后：**CI 红灯无法 Merge**，这才是硬门禁。

### 2. 工作流权限

`Settings` → `Actions` → `General`：允许运行 Actions（默认即可）。

### 3. 可选

- Required reviewers
- CODEOWNERS
- Dependabot
- GitHub Pages 部署文档（`docs/.vitepress/dist`）

## 推荐开发流程

```text
1. 从 main 拉功能分支
2. 本地改代码 → commit（pre-commit）→ push（pre-push）
3. 开 PR → 等 CI job「quality」变绿
4. Review 通过后 Merge（分支保护保证红灯合不了）
```

## VSCode 配置

项目提供 `.vscode/extensions.json` 与 `.vscode/settings.json`。

推荐扩展：Vue Official、ESLint、Prettier、EditorConfig、Vitest。  
保存时自动 Prettier，并触发 ESLint 修复。
