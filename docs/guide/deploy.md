# 文档部署

文档站基于 VitePress，构建结果为**静态文件**，与 npm 组件包、Playground **完全解耦**。

## 在线地址

**https://crazily6617.github.io/zq-ui/**

由 GitHub Actions（`.github/workflows/docs.yml`）在 `main` 更新后自动构建并发布到 **GitHub Pages**。

## 本地构建与预览

```bash
pnpm docs:build
# 产物：docs/.vitepress/dist

pnpm docs:preview
```

## base 路径

配置见 `docs/.vitepress/config.ts` 的 `base`：

| 部署位置                                              | `base`              |
| ----------------------------------------------------- | ------------------- |
| GitHub Pages 项目站 `https://<user>.github.io/zq-ui/` | `'/zq-ui/'`（当前） |
| 自定义域名根 `https://ui.xxx.com/`                    | `'/'`               |

修改 `base` 后需重新 `docs:build`，并同步更新 README / 贡献文档中的链接。

## GitHub Pages 配置（网页，做一次即可）

1. 仓库 **Settings → Pages**
2. **Source** 选 **GitHub Actions**（不要选 Deploy from a branch）
3. 合并/推送 `main` 后，在 **Actions** 中查看 workflow **Deploy Docs** 是否成功
4. 约 1～2 分钟后打开：https://crazily6617.github.io/zq-ui/

若 404：确认 `base` 为 `'/zq-ui/'`，且 Pages source 为 Actions。

## 与组件发布的关系

| 产物             | 命令                       | 是否给业务用户    |
| ---------------- | -------------------------- | ----------------- |
| 文档站           | `pnpm docs:build` → Pages  | 是（浏览器访问）  |
| `zq-ui` / `zq-m` | 在 `packages/*` 下 publish | 是（npm install） |
| Playground       | `pnpm build` → 根 `dist/`  | 否（仅开发调试）  |

**不要**把 Playground 的 `dist/` 当作文档站部署。

## 质量 CI 与文档部署

- **CI**（`ci.yml` / job `quality`）：含 `docs:build` 校验，失败则不能合 main（若已开分支保护）
- **Deploy Docs**（`docs.yml`）：仅 `main` 推送成功后部署 Pages，与质量门禁分工不同
