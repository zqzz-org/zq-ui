# 更新日志

## 开发中

- 新增 xk（信息科技）、qedu（素养）、aistudy（学习平台）三套内置主题。
- 移除 admin、finance 主题，精简为 default + aiedu + xk + qedu + aistudy。
- 主题文件改为自包含模式：EP 组件变量映射下沉到各主题文件。
- 重构文档站结构：新增贡献指南、代理组件列表独立页面。

## v0.1.0

- 首个开发版本。
- 基于 Element Plus 2.13.7 的组件代理体系，覆盖 45+ 个组件。
- `zq-button` 自定义封装：`variant` 变体（gradient / soft）、`debounce` 防抖、`throttle` 节流。
- 主题体系：CSS 变量延迟解析，内置主题 + 域名自动匹配。
- VitePress 文档站 + Playground 调试环境。
