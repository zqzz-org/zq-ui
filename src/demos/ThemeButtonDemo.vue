<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'

interface ThemeInfo {
  key: string
  label: string
  color: string
}

const themes: readonly ThemeInfo[] = [
  { key: 'aiedu', label: 'AIEDU 通识平台', color: '#50b5a6' },
  { key: 'xk', label: 'XK 信息科技', color: '#007F92' },
  { key: 'qedu', label: 'QEDU 素养', color: '#229065' },
  { key: 'aistudy', label: 'AIStudy 学习平台', color: '#022B9A' },
]

function themeClass(key: string): string {
  return `zq-theme-${key}`
}
</script>

<template>
  <section class="pg-content">
    <h2>主题 × 按钮矩阵</h2>
    <p class="desc">
      每个区域通过局部 <code>class="zq-theme-xxx"</code> 展示各主题主色在透传 EP 属性上的表现。
    </p>

    <div class="theme-matrix">
      <div class="theme-matrix__header">
        <span class="theme-matrix__dot" :style="{ background: '#409eff' }" />
        <h3>Default（无主题）</h3>
        <code>Element Plus 默认</code>
      </div>

      <table class="matrix-table">
        <thead>
          <tr>
            <th>状态</th>
            <th>Default</th>
            <th>Gradient</th>
            <th>Soft</th>
            <th>Crisp</th>
            <th>Ring</th>
            <th>Ghost</th>
            <th>Reveal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>基础变体</td>
            <td><zq-button type="primary">Default</zq-button></td>
            <td><zq-button variant="gradient" type="primary">Gradient</zq-button></td>
            <td><zq-button variant="soft">Soft</zq-button></td>
            <td><zq-button variant="crisp">Crisp</zq-button></td>
            <td><zq-button variant="ring">Ring</zq-button></td>
            <td><zq-button variant="ghost">Ghost</zq-button></td>
            <td><zq-button variant="reveal">Reveal</zq-button></td>
          </tr>
          <tr>
            <td>Plain</td>
            <td><zq-button type="primary" plain>Plain</zq-button></td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Round</td>
            <td><zq-button type="primary" round>Default</zq-button></td>
            <td><zq-button variant="gradient" type="primary" round>Gradient</zq-button></td>
            <td><zq-button variant="soft" round>Soft</zq-button></td>
            <td><zq-button variant="crisp" round>Crisp</zq-button></td>
            <td><zq-button variant="ring" round>Ring</zq-button></td>
            <td><zq-button variant="ghost" round>Ghost</zq-button></td>
            <td><zq-button variant="reveal" round>Reveal</zq-button></td>
          </tr>
          <tr>
            <td>Circle</td>
            <td><zq-button type="primary" :icon="Edit" circle /></td>
            <td><zq-button variant="gradient" type="primary" :icon="Edit" circle /></td>
            <td><zq-button variant="soft" :icon="Edit" circle /></td>
            <td><zq-button variant="crisp" :icon="Edit" circle /></td>
            <td><zq-button variant="ring" :icon="Edit" circle /></td>
            <td><zq-button variant="ghost" :icon="Edit" circle /></td>
            <td><zq-button variant="reveal" :icon="Edit" circle /></td>
          </tr>
          <tr>
            <td>Disabled</td>
            <td><zq-button type="primary" disabled>Default</zq-button></td>
            <td><zq-button variant="gradient" type="primary" disabled>Gradient</zq-button></td>
            <td><zq-button variant="soft" disabled>Soft</zq-button></td>
            <td><zq-button variant="crisp" disabled>Crisp</zq-button></td>
            <td><zq-button variant="ring" disabled>Ring</zq-button></td>
            <td><zq-button variant="ghost" disabled>Ghost</zq-button></td>
            <td><zq-button variant="reveal" disabled>Reveal</zq-button></td>
          </tr>
          <tr>
            <td>Link</td>
            <td><zq-button type="primary" link>Link</zq-button></td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Dashed</td>
            <td><zq-button type="primary" dashed>Dashed</zq-button></td>
            <td>—</td>
            <td><zq-button variant="soft" dashed>Soft</zq-button></td>
            <td><zq-button variant="crisp" dashed>Crisp</zq-button></td>
            <td><zq-button variant="ring" dashed>Ring</zq-button></td>
            <td><zq-button variant="ghost" dashed>Ghost</zq-button></td>
            <td><zq-button variant="reveal" dashed>Reveal</zq-button></td>
          </tr>
          <tr>
            <td>success</td>
            <td><zq-button type="success">Default</zq-button></td>
            <td><zq-button variant="gradient" type="success">Gradient</zq-button></td>
            <td><zq-button variant="soft" type="success">Soft</zq-button></td>
            <td><zq-button variant="crisp" type="success">Crisp</zq-button></td>
            <td><zq-button variant="ring" type="success">Ring</zq-button></td>
            <td><zq-button variant="ghost" type="success">Ghost</zq-button></td>
            <td><zq-button variant="reveal" type="success">Reveal</zq-button></td>
          </tr>
          <tr>
            <td>warning</td>
            <td><zq-button type="warning">Default</zq-button></td>
            <td><zq-button variant="gradient" type="warning">Gradient</zq-button></td>
            <td><zq-button variant="soft" type="warning">Soft</zq-button></td>
            <td><zq-button variant="crisp" type="warning">Crisp</zq-button></td>
            <td><zq-button variant="ring" type="warning">Ring</zq-button></td>
            <td><zq-button variant="ghost" type="warning">Ghost</zq-button></td>
            <td><zq-button variant="reveal" type="warning">Reveal</zq-button></td>
          </tr>
          <tr>
            <td>danger</td>
            <td><zq-button type="danger">Default</zq-button></td>
            <td><zq-button variant="gradient" type="danger">Gradient</zq-button></td>
            <td><zq-button variant="soft" type="danger">Soft</zq-button></td>
            <td><zq-button variant="crisp" type="danger">Crisp</zq-button></td>
            <td><zq-button variant="ring" type="danger">Ring</zq-button></td>
            <td><zq-button variant="ghost" type="danger">Ghost</zq-button></td>
            <td><zq-button variant="reveal" type="danger">Reveal</zq-button></td>
          </tr>
          <tr>
            <td>info</td>
            <td><zq-button type="info">Default</zq-button></td>
            <td><zq-button variant="gradient" type="info">Gradient</zq-button></td>
            <td><zq-button variant="soft" type="info">Soft</zq-button></td>
            <td><zq-button variant="crisp" type="info">Crisp</zq-button></td>
            <td><zq-button variant="ring" type="info">Ring</zq-button></td>
            <td><zq-button variant="ghost" type="info">Ghost</zq-button></td>
            <td><zq-button variant="reveal" type="info">Reveal</zq-button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-for="theme in themes" :key="theme.key" :class="['theme-matrix', themeClass(theme.key)]">
      <div class="theme-matrix__header">
        <span class="theme-matrix__dot" :style="{ background: theme.color }" />
        <h3>{{ theme.label }}</h3>
        <code>zq-theme-{{ theme.key }}</code>
      </div>

      <table class="matrix-table">
        <thead>
          <tr>
            <th>状态</th>
            <th>Default</th>
            <th>Gradient</th>
            <th>Soft</th>
            <th>Crisp</th>
            <th>Ring</th>
            <th>Ghost</th>
            <th>Reveal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>基础变体</td>
            <td><zq-button type="primary">Default</zq-button></td>
            <td><zq-button variant="gradient" type="primary">Gradient</zq-button></td>
            <td><zq-button variant="soft">Soft</zq-button></td>
            <td><zq-button variant="crisp">Crisp</zq-button></td>
            <td><zq-button variant="ring">Ring</zq-button></td>
            <td><zq-button variant="ghost">Ghost</zq-button></td>
            <td><zq-button variant="reveal">Reveal</zq-button></td>
          </tr>
          <tr>
            <td>Plain</td>
            <td><zq-button type="primary" plain>Plain</zq-button></td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Round</td>
            <td><zq-button type="primary" round>Default</zq-button></td>
            <td><zq-button variant="gradient" type="primary" round>Gradient</zq-button></td>
            <td><zq-button variant="soft" round>Soft</zq-button></td>
            <td><zq-button variant="crisp" round>Crisp</zq-button></td>
            <td><zq-button variant="ring" round>Ring</zq-button></td>
            <td><zq-button variant="ghost" round>Ghost</zq-button></td>
            <td><zq-button variant="reveal" round>Reveal</zq-button></td>
          </tr>
          <tr>
            <td>Circle</td>
            <td><zq-button type="primary" :icon="Edit" circle /></td>
            <td><zq-button variant="gradient" type="primary" :icon="Edit" circle /></td>
            <td><zq-button variant="soft" :icon="Edit" circle /></td>
            <td><zq-button variant="crisp" :icon="Edit" circle /></td>
            <td><zq-button variant="ring" :icon="Edit" circle /></td>
            <td><zq-button variant="ghost" :icon="Edit" circle /></td>
            <td><zq-button variant="reveal" :icon="Edit" circle /></td>
          </tr>
          <tr>
            <td>Disabled</td>
            <td><zq-button type="primary" disabled>Default</zq-button></td>
            <td><zq-button variant="gradient" type="primary" disabled>Gradient</zq-button></td>
            <td><zq-button variant="soft" disabled>Soft</zq-button></td>
            <td><zq-button variant="crisp" disabled>Crisp</zq-button></td>
            <td><zq-button variant="ring" disabled>Ring</zq-button></td>
            <td><zq-button variant="ghost" disabled>Ghost</zq-button></td>
            <td><zq-button variant="reveal" disabled>Reveal</zq-button></td>
          </tr>
          <tr>
            <td>Link</td>
            <td><zq-button type="primary" link>Link</zq-button></td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Dashed</td>
            <td><zq-button type="primary" dashed>Dashed</zq-button></td>
            <td>—</td>
            <td><zq-button variant="soft" dashed>Soft</zq-button></td>
            <td><zq-button variant="crisp" dashed>Crisp</zq-button></td>
            <td><zq-button variant="ring" dashed>Ring</zq-button></td>
            <td><zq-button variant="ghost" dashed>Ghost</zq-button></td>
            <td><zq-button variant="reveal" dashed>Reveal</zq-button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.desc {
  color: var(--el-text-color-secondary);
  margin-bottom: 20px;
  font-size: 13px;
}

.desc code {
  font-size: 12px;
}

.theme-matrix {
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid var(--el-color-primary-light-7);
  background: var(--el-color-primary-light-9);
  margin-bottom: 16px;
}

.theme-matrix__header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.theme-matrix__header h3 {
  margin: 0;
  font-size: 15px;
  color: var(--el-color-primary);
}

.theme-matrix__header code {
  font-size: 11px;
  color: var(--el-text-color-secondary);
  background: var(--el-fill-color);
  padding: 1px 6px;
  border-radius: 4px;
}

.theme-matrix__dot {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  flex-shrink: 0;
}

.matrix-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.matrix-table th,
.matrix-table td {
  padding: 10px 12px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid var(--el-color-primary-light-8);
  background: var(--el-fill-color);
}

.matrix-table th {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  font-weight: 600;
  font-size: 12px;
}

.matrix-table tbody tr:hover {
  background: var(--el-fill-color);
}

.matrix-table td:first-child {
  color: var(--el-text-color-secondary);
  font-size: 12px;
  white-space: nowrap;
  width: 80px;
}

.matrix-table td:not(:first-child) {
  min-width: 90px;
}
</style>
