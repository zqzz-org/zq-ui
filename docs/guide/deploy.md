# 文档部署

文档站基于 VitePress，构建结果为**静态文件**，与 npm 组件包、Playground **完全解耦**。

## 构建

```bash
pnpm docs:build
# 产物目录：docs/.vitepress/dist
```

本地预览产物：

```bash
pnpm docs:preview
```

## base 路径

在 [docs/.vitepress/config.ts](../.vitepress/config.ts) 中配置 `base`：

| 部署位置                         | `base`                    |
| -------------------------------- | ------------------------- |
| 域名根 `https://ui.example.com/` | `'/'`（默认）             |
| 子路径 `https://xxx.com/zq-ui/`  | `'/zq-ui/'`（须首尾 `/`） |

修改 `base` 后需重新 `docs:build`。

## 发布到静态托管

将 `docs/.vitepress/dist` 上传至：

- Nginx / 内网静态机
- 对象存储 + CDN
- GitHub / GitLab Pages

示例（Nginx）：

```nginx
server {
  listen 80;
  server_name ui.example.com;
  root /var/www/zq-docs;
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

## 与组件发布的关系

| 产物             | 命令                       | 是否给业务用户    |
| ---------------- | -------------------------- | ----------------- |
| 文档站           | `pnpm docs:build`          | 是（浏览器访问）  |
| `zq-ui` / `zq-m` | 在 `packages/*` 下 publish | 是（npm install） |
| Playground       | `pnpm build` → 根 `dist/`  | 否（仅开发调试）  |

**不要**把 Playground 的 `dist/` 当作文档站部署。

## 文档地址

正式地址占位：**https://ui.example.com**

部署完成后请同步替换：

- 本页与 [快速开始](./getting-started)
- 根 README
- `docs/.vitepress/config.ts` 页脚
