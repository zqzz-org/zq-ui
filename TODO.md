# TODO

## 发布流程

- [ ] 确认发布目标
  - [ ] 公共 npm
  - [ ] 私有 npm registry
  - [ ] Verdaccio 自建 npm 仓库
  - [ ] GitLab / GitHub Packages

- [ ] 调整包信息
  - [ ] 将 `packages/zq-ui/package.json` 的 `name` 改为团队 scope，例如 `@zq/zq-ui`
  - [ ] 确认 `version` 版本号策略
  - [ ] 补充 `files` 字段，限制发布内容
  - [ ] 确认 `peerDependencies` 中 `vue` 与 `element-plus` 的版本范围
  - [ ] 确认是否继续源码分发，或增加 `dist` 构建产物

- [ ] 补充发布配置
  - [ ] 为私有仓库配置 `.npmrc`
  - [ ] 为包配置 `publishConfig.registry`
  - [ ] 明确 access 策略，公开包使用 `--access public`
  - [ ] 准备 npm token 或 registry 登录账号

- [ ] 增加发布前检查
  - [ ] `pnpm typecheck`
  - [ ] `pnpm test:run`
  - [ ] `pnpm build`
  - [ ] `pnpm docs:build`
  - [ ] `npm pack --dry-run`

- [ ] 发布首个版本
  - [ ] 更新 changelog 或 release note
  - [ ] 打 tag，例如 `v0.0.1`
  - [ ] 执行 `npm publish`
  - [ ] 在测试项目中安装并验证

- [ ] 补充 CI/CD
  - [ ] PR 阶段执行类型检查、测试、构建、文档构建
  - [ ] tag 阶段自动发布 npm 包
  - [ ] 发布后自动生成 GitHub / GitLab Release

## 接入验证

- [ ] 在独立 Vue 3 项目中安装 `@zq/zq-ui`
- [ ] 验证全局注册 `app.use(ZQUI)`
- [ ] 验证按域名自动主题
- [ ] 验证强制指定主题 `theme: 'finance'`
- [ ] 验证暗色模式下主题色阶
- [ ] 验证常用代理组件与 `zq-button`

## 后续组件库能力

- [ ] 继续完善组件封装逻辑
- [ ] 补充组件文档与 Playground demo
- [ ] 补充更多单元测试
- [ ] 评估是否提供按需导入能力
- [ ] 评估是否提供独立主题包
- [ ] 评估是否提供 CLI 或 preset 简化业务项目接入
