<template>
  <!-- 子标签 -->
  <nav class="pg-subtabs">
    <button
      v-for="tab in buttonTabs"
      :key="tab.key"
      :class="['pg-subtab', { active: activeButtonTab === tab.key }]"
      @click="activeButtonTab = tab.key"
    >
      {{ tab.label }}
    </button>
  </nav>

  <!-- 变体样式 -->
  <section v-show="activeButtonTab === 'variant'" class="pg-content">
    <h2>变体 × 类型组合</h2>
    <p class="desc">
      验证 <code>variant</code>（gradient / soft）与 Element Plus 原生
      <code>type</code> 的自由组合。
    </p>
    <div v-for="v in variants" :key="v.key" class="demo-block">
      <h3>{{ v.label }}</h3>
      <div class="demo-row">
        <zq-button :variant="v.key">默认</zq-button>
        <zq-button type="primary" :variant="v.key">Primary</zq-button>
        <zq-button type="success" :variant="v.key">Success</zq-button>
        <zq-button type="warning" :variant="v.key">Warning</zq-button>
        <zq-button type="danger" :variant="v.key">Danger</zq-button>
        <zq-button type="info" :variant="v.key">Info</zq-button>
        <zq-button :variant="v.key" disabled>Disabled</zq-button>
      </div>
    </div>
    <div class="demo-block">
      <h3>无 variant（原生对照）</h3>
      <div class="demo-row">
        <zq-button>默认</zq-button>
        <zq-button type="primary">Primary</zq-button>
        <zq-button type="success">Success</zq-button>
        <zq-button type="warning">Warning</zq-button>
        <zq-button type="danger">Danger</zq-button>
        <zq-button type="info">Info</zq-button>
        <zq-button disabled>Disabled</zq-button>
      </div>
    </div>
  </section>

  <!-- 尺寸形状 -->
  <section v-show="activeButtonTab === 'size'" class="pg-content">
    <h2>尺寸 & 形状</h2>
    <p class="desc">
      验证 <code>size</code>（large / default / small）和
      <code>round</code> / <code>circle</code> / <code>loading</code> 在各 variant 下的表现。
    </p>
    <div v-for="v in variants" :key="v.key" class="demo-block">
      <h3>{{ v.label }}</h3>
      <div class="demo-row">
        <zq-button :variant="v.key" size="large">Large</zq-button>
        <zq-button :variant="v.key">Default</zq-button>
        <zq-button :variant="v.key" size="small">Small</zq-button>
      </div>
      <div class="demo-row" style="margin-top:8px">
        <zq-button :variant="v.key" round>圆角</zq-button>
        <zq-button :variant="v.key" circle>圆</zq-button>
        <zq-button :variant="v.key" loading>加载</zq-button>
      </div>
    </div>
  </section>

  <!-- 透传测试 -->
  <section v-show="activeButtonTab === 'passthrough'" class="pg-content">
    <h2>属性 / 事件 / 插槽透传</h2>
    <p class="desc">
      验证未声明为自定义 props 的所有属性、事件、插槽均原样交给
      <code>&lt;el-button&gt;</code>。
    </p>
    <div class="demo-block">
      <h3>图标（prop + slot）</h3>
      <div class="demo-row">
        <zq-button type="primary" :icon="Search">搜索</zq-button>
        <zq-button type="success" variant="soft">
          <el-icon style="margin-right:6px"><Check /></el-icon>
          插槽图标
        </zq-button>
        <zq-button variant="gradient" :icon="Edit" circle />
      </div>
    </div>
    <div class="demo-block">
      <h3>事件透传</h3>
      <div class="demo-row">
        <zq-button type="primary"
          @mouseenter="eventLog = 'mouseenter'"
          @mouseleave="eventLog = 'mouseleave'"
        >悬停测试</zq-button>
        <zq-button variant="soft"
          @dblclick="eventLog = 'dblclick!'"
          @contextmenu.prevent="eventLog = 'contextmenu'"
        >双击 / 右键</zq-button>
        <zq-button size="small" @click="eventLog = ''">清除</zq-button>
      </div>
      <p class="hint" style="margin-top:4px">
        事件日志：<code>{{ eventLog || '（无事件）' }}</code>
      </p>
    </div>
    <div class="demo-block">
      <h3>原生 HTML 属性</h3>
      <div class="demo-row">
        <zq-button type="primary" autofocus>autofocus</zq-button>
        <zq-button type="primary" name="submit">name</zq-button>
        <zq-button type="primary" draggable="true">draggable</zq-button>
      </div>
    </div>
  </section>

  <!-- 全量矩阵 -->
  <section v-show="activeButtonTab === 'matrix'" class="pg-content">
    <h2>全量矩阵（type × variant）</h2>
    <p class="desc">一张表覆盖所有交叉组合。</p>
    <div class="matrix-wrap">
      <table class="matrix-table">
        <thead>
          <tr>
            <th></th>
            <th v-for="t in types" :key="t">{{ t }}</th>
            <th>Disabled</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in [...variants, { key: '', label: '无 variant' }]" :key="v.key || 'native'">
            <td class="matrix-label">{{ v.label }}</td>
            <td v-for="t in types" :key="t">
              <zq-button
                :variant="v.key || undefined"
                :type="t === 'default' ? undefined : t"
                size="small"
              >{{ t === 'default' ? '默认' : t }}</zq-button>
            </td>
            <td>
              <zq-button :variant="v.key || undefined" size="small" disabled>Disabled</zq-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Check, Edit } from '@element-plus/icons-vue'

const buttonTabs = [
  { key: 'variant', label: '变体样式' },
  { key: 'size', label: '尺寸形状' },
  { key: 'passthrough', label: '透传测试' },
  { key: 'matrix', label: '全量矩阵' },
]
const activeButtonTab = ref('variant')

const variants = [
  { key: 'gradient' as const, label: 'Gradient（渐变）' },
  { key: 'soft' as const, label: 'Soft（浅色）' },
]
const types = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const

const eventLog = ref('')
</script>
