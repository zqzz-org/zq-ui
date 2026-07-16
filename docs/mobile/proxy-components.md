# 移动端代理组件（zq-m）

与 PC 端相同思路：无自定义逻辑的 Vant 组件由 `createProxy` 自动注册为 **`zqm-xxx`**，完整透传 attrs / slots。

## 使用方式

把 Vant 标签前缀从 `van-` 换成 `zqm-`（API 与 Vant 一致）：

```vue
<zqm-button type="primary">按钮</zqm-button>
<zqm-field v-model="name" label="姓名" />
<zqm-cell title="单元格" is-link />
<zqm-tabbar v-model="active">
  <zqm-tabbar-item icon="home-o">首页</zqm-tabbar-item>
</zqm-tabbar>
```

## 已代理（节选）

安装 `@zqzz/zq-m` 后可用的标签包括（不完全列表）：

`zqm-button` · `zqm-cell` · `zqm-cell-group` · `zqm-field` · `zqm-form` · `zqm-checkbox` · `zqm-radio` · `zqm-switch` · `zqm-slider` · `zqm-rate` · `zqm-stepper`（若后续加入 map）· `zqm-search` · `zqm-picker` · `zqm-date-picker` · `zqm-time-picker` · `zqm-calendar` · `zqm-cascader` · `zqm-popup` · `zqm-dialog` · `zqm-action-sheet` · `zqm-toast`（函数式能力仍以 Vant API 为准）· `zqm-nav-bar` · `zqm-tabbar` · `zqm-tabs` · `zqm-tab` · `zqm-list` · `zqm-pull-refresh` · `zqm-swipe` · `zqm-grid` · `zqm-image` · `zqm-uploader` · `zqm-tag` · `zqm-badge` · `zqm-empty` · `zqm-skeleton` · `zqm-loading` · `zqm-progress` · `zqm-divider` · `zqm-space` · `zqm-config-provider` · …

完整名单以 [packages/zq-m/index.ts](https://github.com) 中 `vanComponentMap` 为准，会随封装进度更新本文。

## 从代理升级为显式封装

与 PC 一致：在 `packages/zq-m/components/` 新建 `zqm-xxx.vue` → 从 `vanComponentMap` 删除对应项 → 加入 `customComponents` 并 export。  
若组件在 `POPPER_COMPONENTS` 内，需手动复刻主题 class 注入（见 `theme/context.ts`）。

PC 端代理说明见 [PC 代理组件](/guide/proxy-components)。
