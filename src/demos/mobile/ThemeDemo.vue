<script setup lang="ts">
import { shallowRef } from 'vue'
import type { ZqmThemeName } from '@zq-m/theme'

const active = shallowRef(0)
const fieldValue = shallowRef('AIEDU')

const themes: readonly { name: ZqmThemeName; label: string }[] = [
  { name: 'aiedu', label: '通识' },
  { name: 'xk', label: '信息科技' },
  { name: 'qedu', label: '素养' },
  { name: 'aistudy', label: '学习平台' },
]
</script>

<template>
  <section class="m-demo">
    <h2>移动主题</h2>
    <p class="m-desc">
      使用 <code>zqm-theme-provider</code> 局部切主题；主色写入 <code>--van-primary-color</code>。
    </p>

    <div class="m-theme-grid">
      <zqm-theme-provider v-for="t in themes" :key="t.name" :theme="t.name" class="m-theme-card">
        <div class="m-theme-card__title">{{ t.label }}</div>
        <zqm-button type="primary" block size="small">主按钮</zqm-button>
        <zqm-tag type="primary" style="margin-top: 8px">{{ t.name }}</zqm-tag>
      </zqm-theme-provider>
    </div>

    <zqm-theme-provider theme="aiedu" class="m-block">
      <h3>AIEDU 作用域</h3>
      <zqm-field v-model="fieldValue" label="名称" placeholder="请输入" />
      <zqm-tabs v-model:active="active">
        <zqm-tab title="标签 1">内容 1</zqm-tab>
        <zqm-tab title="标签 2">内容 2</zqm-tab>
      </zqm-tabs>
    </zqm-theme-provider>
  </section>
</template>

<style scoped>
.m-demo h2 {
  margin: 0 0 6px;
  font-size: 18px;
}
.m-desc {
  margin: 0 0 14px;
  font-size: 12px;
  color: #888;
  line-height: 1.5;
}
.m-desc code {
  font-size: 11px;
  background: #f0f0f0;
  padding: 0 4px;
  border-radius: 3px;
}
.m-theme-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}
.m-theme-card {
  padding: 10px;
  border-radius: 8px;
  background: var(--zqm-color-brand-soft, #f7f8fa);
  border: 1px solid color-mix(in srgb, var(--van-primary-color) 25%, #eee);
}
.m-theme-card__title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--van-primary-color);
}
.m-block {
  padding: 12px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #ebedf0;
}
.m-block h3 {
  margin: 0 0 10px;
  font-size: 14px;
  color: var(--van-primary-color);
}
</style>
